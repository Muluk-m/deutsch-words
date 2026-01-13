/**
 * 批量获取德语单词音标并更新 words.json
 * 使用方法: node scripts/fetchPhonetics.js
 * 
 * 注意：需要先安装依赖: npm install
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WORDS_FILE = join(__dirname, '../public/words.json');
const DELAY_MS = 200; // API 调用间隔，避免请求过快

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 清理单词（去掉冠词和复数信息）
function cleanWord(word) {
  return word
    .replace(/^(der|die|das)\s+/, '')
    .replace(/,.*$/, '')
    .replace(/\(.*?\)/g, '')
    .trim();
}

// 使用 https 模块获取 HTML（更可靠）
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({ ok: res.statusCode === 200, status: res.statusCode, text: data });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 获取单个单词的音标
async function fetchPhonetic(word) {
  const cleanedWord = cleanWord(word);
  
  try {
    const url = `https://de.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(cleanedWord)}`;
    const response = await fetchHTML(url);

    if (!response.ok) {
      console.log(`  ⚠️  API 返回错误: ${response.status} - ${cleanedWord}`);
      return null;
    }

    const html = response.text;
    
    // 使用 jsdom 解析 HTML（与前端 DOMParser 一致）
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // 查找所有 class="ipa" 的元素
    const ipas = Array.from(doc.querySelectorAll('.ipa'))
      .map(el => el.textContent?.trim())
      .filter(Boolean);
    
    if (ipas.length > 0 && ipas[0]) {
      let ipa = ipas[0];
      // 确保音标前后都有斜杠
      if (!ipa.startsWith('/')) {
        ipa = '/' + ipa;
      }
      if (!ipa.endsWith('/')) {
        ipa = ipa + '/';
      }
      
      return ipa;
    }
    
    return null;
  } catch (error) {
    console.log(`  ❌ 获取失败: ${cleanedWord} - ${error.message}`);
    return null;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始批量获取音标...\n');
  
  // 读取 words.json
  const wordsData = JSON.parse(readFileSync(WORDS_FILE, 'utf-8'));
  console.log(`📚 共 ${wordsData.length} 个单词\n`);
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  // 逐个处理单词
  for (let i = 0; i < wordsData.length; i++) {
    const wordObj = wordsData[i];
    const progress = `[${i + 1}/${wordsData.length}]`;
    
    // 如果已经有音标，跳过
    if (wordObj.phonetic) {
      console.log(`${progress} ⏭️  跳过（已有音标）: ${wordObj.word}`);
      skipCount++;
      continue;
    }
    
    console.log(`${progress} 🔍 获取: ${wordObj.word}`);
    
    const phonetic = await fetchPhonetic(wordObj.word);
    
    if (phonetic) {
      wordObj.phonetic = phonetic;
      console.log(`${progress} ✅ 成功: ${wordObj.word} -> ${phonetic}`);
      successCount++;
    } else {
      console.log(`${progress} ⚠️  未找到: ${wordObj.word}`);
      failCount++;
    }
    
    // 每处理 10 个单词保存一次（防止中断丢失数据）
    if ((i + 1) % 10 === 0) {
      writeFileSync(WORDS_FILE, JSON.stringify(wordsData, null, 2));
      console.log(`\n💾 已保存进度 (${i + 1}/${wordsData.length})\n`);
    }
    
    // 延迟，避免请求过快
    await delay(DELAY_MS);
  }
  
  // 最终保存
  writeFileSync(WORDS_FILE, JSON.stringify(wordsData, null, 2));
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ 批量获取完成！');
  console.log(`✅ 成功: ${successCount}`);
  console.log(`⏭️  跳过: ${skipCount}`);
  console.log(`⚠️  失败: ${failCount}`);
  console.log(`📊 总计: ${wordsData.length}`);
  console.log('='.repeat(50));
}

main().catch(console.error);

