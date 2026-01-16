import { useState, useEffect, useCallback } from "react";
import { Check, ChevronDown, X, Layers } from "lucide-react";
import {
  getSelectedUnits,
  setSelectedUnits,
  toggleUnitSelection,
} from "../utils/storageManager";

interface Unit {
  id: number;
  name: string;
  wordCount: number;
}

interface UnitSelectorProps {
  units: Unit[];
  onChange?: (selectedUnits: number[] | null) => void;
}

export function UnitSelector({ units, onChange }: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number[] | null>(null);

  useEffect(() => {
    setSelected(getSelectedUnits());
  }, []);

  // 阻止滚动穿透
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleToggle = useCallback((unitId: number) => {
    const newSelected = toggleUnitSelection(unitId);
    setSelected(newSelected);
    onChange?.(newSelected);
  }, [onChange]);

  const handleSelectAll = useCallback(() => {
    setSelectedUnits(null);
    setSelected(null);
    onChange?.(null);
  }, [onChange]);

  const handleSelectNone = useCallback(() => {
    // 取消全选，只保留第一个单元
    if (units.length > 0) {
      setSelectedUnits([units[0].id]);
      setSelected([units[0].id]);
      onChange?.([units[0].id]);
    }
  }, [units, onChange]);

  const selectedCount = selected?.length || units.length;
  const isAllSelected = !selected || selected.length === 0;
  const totalWords = isAllSelected
    ? units.reduce((sum, u) => sum + u.wordCount, 0)
    : units
        .filter((u) => selected?.includes(u.id))
        .reduce((sum, u) => sum + u.wordCount, 0);

  const displayText = isAllSelected
    ? "全部单元"
    : selected?.length === 1
    ? `单元 ${selected[0]}`
    : `${selected?.length} 个单元`;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium cursor-pointer active:scale-95 transition-transform"
      >
        <Layers className="w-4 h-4" />
        <span>{displayText}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sheet */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl transform transition-transform duration-300 ease-out animate-slide-up"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                选择学习范围
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer active:scale-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 px-5 pb-4">
              <button
                onClick={handleSelectAll}
                className={`flex-1 py-3 rounded-xl font-medium cursor-pointer active:scale-95 transition-all ${
                  isAllSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                全选
              </button>
              <button
                onClick={handleSelectNone}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-medium cursor-pointer active:scale-95 transition-transform"
              >
                重置
              </button>
            </div>

            {/* Unit List */}
            <div className="max-h-[50vh] overflow-y-auto overscroll-contain px-3">
              <div className="space-y-1 pb-2">
                {units.map((unit) => {
                  const isSelected = isAllSelected || selected?.includes(unit.id);
                  return (
                    <button
                      key={unit.id}
                      onClick={() => handleToggle(unit.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer active:scale-[0.98] transition-all ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "bg-transparent active:bg-gray-50 dark:active:bg-gray-800"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 text-left">
                        <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          {unit.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {unit.wordCount} 个单词
                        </div>
                      </div>

                      {/* Badge for selected */}
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  已选 {selectedCount} 个单元
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  共 {totalWords} 个单词
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold cursor-pointer active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25"
              >
                确认选择
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
