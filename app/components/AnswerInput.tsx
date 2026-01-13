interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  borderColor?: "purple" | "blue" | "green";
}

export function AnswerInput({
  value,
  onChange,
  onKeyPress,
  disabled = false,
  placeholder = "请输入德语单词...",
  borderColor = "purple",
}: AnswerInputProps) {
  const borderColorClasses = {
    purple: "focus:border-purple-500",
    blue: "focus:border-blue-500",
    green: "focus:border-green-500",
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full text-center text-3xl font-bold border-2 border-gray-300 rounded-xl py-4 px-6 focus:outline-none ${borderColorClasses[borderColor]} disabled:bg-gray-50 text-gray-900 disabled:text-gray-500`}
      autoFocus
    />
  );
}
