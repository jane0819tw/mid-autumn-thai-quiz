/* =========================================================
   中秋節泰語生存力測驗  script.js
   ▼ 需要修改的內容都集中在 CONFIG，其他程式不必動 ▼
   ========================================================= */
const CONFIG = {
  brandName: '泰時刻',                 // 出現在首頁與分享圖上方
  youtubeId: 'N9x-wOhMJO8',                       // Bar-B-Q Plaza 廣告的 YouTube 影片 ID（網址 v= 後面那串）

  /* 首頁暖身物品
     羅馬拼音採 thai2english.com 的標注方式（ป=bp、ต=dt、โ-=oh、แ-=ae、เธอ=ter） */
  items: {
    moon:     { thai: 'พระจันทร์',          roman: 'prá-jan',             zh: '月亮' },
    rabbit:   { thai: 'กระต่าย',            roman: 'grà-dtàai',           zh: '兔子' },
    skewer:   { thai: 'หมูปิ้ง',             roman: 'mŏo bpîng',           zh: '豬肉串' },
    mooncake: { thai: 'ขนมไหว้พระจันทร์',    roman: 'kà-nŏm wâai prá-jan', zh: '月餅' },
    pomelo:   { thai: 'ส้มโอ',              roman: 'sôm-oh',              zh: '柚子' },
  },

  /* 題目：answer 為正確選項的索引（A=0、B=1、C=2）
     speak（選填）：填入泰文後，題目上方會出現「播放題目語音」按鈕
     optionFeedback（選填）：選到特定錯誤選項時，解析區額外顯示的回饋 */
  questions: [
    {
      prompt: '中秋烤肉如果懶得自己生火，直接去夜市買泰國國民美食「烤豬肉串」最快！請問你剛剛在首頁點擊的「烤豬肉串」，泰文是哪個？',
      options: ['หมูกระทะ (mŏo grà-tá)', 'หมูปิ้ง (mŏo bpîng)', 'ไก่ย่าง (gài yâang)'],
      answer: 1,
      explanation: '正確答案是 (B)！豬肉是 หมู，烤是 ปิ้ง。(A) หมูกระทะ 是「泰式銅盤烤肉」；(C) ไก่ย่าง 是「烤雞」。去夜市別點錯囉！',
    },
    {
      prompt: '泰國也有月餅，而且有榴槤口味！如果你不敢吃榴槤，想吃清爽的「柚子」，該選哪一個？',
      options: ['ส้มโอ (sôm-oh)', 'มะม่วง (má-mûang)', 'แตงโม (dtaeng-moh)'],
      answer: 0,
      explanation: '正確答案是 (A)！柚子是 ส้มโอ。前面的 ส้ม 單獨拿出來是「橘子」！(B) มะม่วง 是芒果，(C) แตงโม 是西瓜。',
    },
    {
      prompt: '吃飽喝足想感嘆「今晚的月亮好圓啊！」，泰文正確的語法順序應該怎麼排？',
      options: [
        '很 มาก (mâak) ＋ 圓 กลม (glom) ＋ 月亮 พระจันทร์ (prá-jan)',
        '圓 กลม (glom) ＋ 月亮 พระจันทร์ (prá-jan) ＋ 很 มาก (mâak)',
        '月亮 พระจันทร์ (prá-jan) ＋ 圓 กลม (glom) ＋ 很 มาก (mâak)',
      ],
      answer: 2,
      explanation: '正確答案是 (C)！泰文語法形容詞和副詞都要放在名詞後面。所以「月亮很圓」的邏輯是「月亮 (พระจันทร์) ➔ 圓 (กลม) ➔ 很 (มาก)」。',
    },
    {
      prompt: '泰文的「月餅」叫做 ขนมไหว้พระจันทร์ (kà-nŏm wâai prá-jan)，這個字是由三個單字拼起來的，直譯超級直白！請問它字面上的意思是？',
      options: ['拜月亮的點心', '圓圓甜甜的餅', '兔子搗的麻糬'],
      answer: 0,
      explanation: '正確答案是 (A)！ขนม＝點心／ไหว้＝拜／พระจันทร์＝月亮。三個字組合「拜月亮的點心」，就是月餅啦！',
    },
    {
      prompt: '中秋夜跟泰國曖昧對象一起吃烤豬肉串 (หมูปิ้ง / mŏo bpîng)。你想展現超強撩人技巧，用這個單字玩「泰式土味情話」，請問該怎麼說最撩？',
      options: [
        'ชอบหมูปิ้งไหม (chôp mŏo bpîng mǎi)',
        'กินหมูปิ้งแล้วปิ๊งเธอ (gin mŏo bpîng láew bpíng ter)',
        'หมูปิ้งอร่อยกว่าเธอ (mŏo bpîng à-ròi gwàa ter)',
      ],
      answer: 1,
      explanation: '正確解答是 (B)！ปิ๊ง (bpíng) 有「心動」的意思。吃 หมูปิ้ง (烤豬肉串) 然後 ปิ๊ง (心動) เธอ (你)，完美雙關語！',
      optionFeedback: {
        0: '這句太保守啦！若對方答喜歡，可順勢反撩：「แต่ฉันชอบเธอนะ (但我喜歡你喔)」，霸氣得分！',
        2: '憑實力單身！快補上一句：「แต่เธอหวานกว่าหมูปิ้ง (但妳比烤豬肉串還要甜)」，瞬間救回氣氛！',
      },
    },
  ],

  /* 結果分級：依答對題數 */
  /* 賣場連結（頁面右上角） */
  storeUrl: 'https://thaiskr.com/store/products',

  /* 每個程度推薦 2 個商品：先顯示「隨機商品」，再顯示這個固定商品
     image：商品圖路徑，以 index.html 所在位置為起點
       例：images/AE_0002.jpg → 專案資料夾/images/AE_0002.jpg
       也可以直接貼完整網址（https://...）
       找不到圖片或留空時，會自動顯示預留的圖片框 */
  fixedProduct: {
    name: '數位版【泰劇常見詞｜泰文子音母音卡】',
    url: 'https://tally.so/r/obo7AO',
    image: 'images/AE_0002.jpg',
    desc: '透過有趣學習內容，跨越泰語學習關卡✨ 🔥新增泰劇相關片段 ✅泰劇高頻單字短句 🗣️泰國人真人語氣音檔 ✅斷句輔助 🆕AI口說評測  ',
    coupon: 'AUTUMN100',          // 只有這個固定商品有折扣碼，留空則不顯示
    couponLabel: '🌕 中秋節優惠',
    couponNote: '9/30 前有效',
  },

  /* 結果分級：依答對題數；products 會隨機抽一個 */
  results: {
    burnt: {
      shareTitle: '【泰語烤焦肉片：黑到看不出原形】',
      copy: '我的泰文實力就像烤焦的肉片……黑成一片、看不出原形！不過別灰心，刮掉焦的那層還是能吃，一步一步來!',
      products: [
        {
          name: '漢泰小詞典',
          url: 'https://thaiskr.com/store/products/BB_0001',
          image: 'images/BB_0001.jpg',
          desc: '4cm*5cm大小的單字口袋書，收錄50個章節，包含超過2800個單字。這本書涵蓋網路詞語、娛樂、成語等特色章節，便攜型設計，讓泰語與你不離身!',
        },
        {
          name: '1000個給小孩的中文單字書籍',
          url: 'https://thaiskr.com/store/products/BB_0005',
          image: 'images/BB_0005.jpg',
          desc: '1000 個生活單字搭配可愛插圖與中泰對照，看圖就能記單字。',
        },
        {
          name: '[中]從電影學泰語句型手札',
          url: 'https://thaiskr.com/store/products/AA_0001',
          image: 'images/AA_0001.jpg',
          desc: '從電影台詞整理出的泰語句型筆記，搭配中文解說。邊回味經典畫面邊學最自然的說法，入門不再只是背單字。',
        },
      ],
    },
    half: {
      shareTitle: '【半熟烤肉串：剝一半的泰文柚子】',
      copy: '外表看起來懂一點，內在還沒熟透……就像剝到一半的柚子，再加把勁把會話和句型補齊，馬上就能熟到流油！',
      products: [
        {
          name: '1000句會話聊超嗨系列',
          url: 'https://thaiskr.com/store/products/BB_0006',
          image: 'images/BB_0006.jpg',
          desc: '系列包含「邀外國朋友聊天」、「旅遊」、「日常生活」、「工作」不同主題，適合作為模仿泰國人說話語氣的素材。',
        },
        {
          name: '用中文問答系列',
          url: 'https://thaiskr.com/store/products/BB_0007',
          image: 'images/BB_0007.jpg',
          desc: '包含500句實用問答，書中有畫黃色的單字，可以用書中提供的單字列表替換練習，拓展單字量。',
        },
      ],
    },
    full: {
      shareTitle: '【泰文滿月圓：月亮代表我的泰文】',
      copy: '你的實力像滿月毫無破綻……連土味情話都難不倒你！是時候挑戰泰國原文讀物，讓泰文更上一層樓。',
      products: [
        {
          name: '我在暴雨中寫下這封信，然後在彩虹出現的那天寄給妳🌈',
          url: 'https://thaiskr.com/store/products/BC_0014',
          image: 'images/BC_0014.jpg',
          desc: '文字溫柔細膩的泰文作品，適合想從「看得懂」進化到「讀得有感覺」、感受泰文抒情之美的你。',
        },
        {
          name: 'Quotes to you',
          url: 'https://thaiskr.com/store/products/BC_0006',
          image: 'images/BC_0006.jpg',
          desc: '一句一句短短的療癒語錄，每天讀一句，練閱讀也練語感。',
        },
        {
          name: 'Bangkok Shophouses',
          url: 'https://thaiskr.com/store/products/BA_0001',
          image: 'images/BA_0001.jpg',
          desc: '書中探索了泰國曼谷街屋（Shophouses）的歷史與文化，全書收錄了精美的鉛筆素描、水墨及水彩畫，細膩捕捉了這些代表性建築的獨特風貌。',
        },
        {
          name: '從泰國美食學泰文：44張學習泰語閃卡',
          url: 'https://thaiskr.com/store/products/BC_0012',
          image: 'images/BC_0012.jpg',
          desc: '44 張泰國美食主題閃卡，每張美食卡都有泰文面與英文面。泰文面上印有食物名稱、可能包含成分的描述，此外，還標示了食物的類別、口味，以及可以在哪裡找到該食物。',
        },
      ],
    },
  },
};

/* =========================================================
   插圖：用 SVG 畫場景（首頁可互動版本 + 分享圖靜態版本）
   ========================================================= */
/* ---------- 兔子（mood：normal 一般 / unsure 冒冷汗 / cry 落淚 / happy 開心） ---------- */
function rabbitSVG(x, y, flip, extra = '', mood = 'normal') {
  const s = flip ? -1 : 1;
  const ink = 'stroke="#2b2340" stroke-width="1.8" fill="none" stroke-linecap="round"';
  const dotEyes = `
    <ellipse cx="-9" cy="-68" rx="3" ry="3.8" fill="#2b2340"/>
    <ellipse cx="9" cy="-68" rx="3" ry="3.8" fill="#2b2340"/>
    <circle cx="-8" cy="-69.5" r="1.1" fill="#fff"/>
    <circle cx="10" cy="-69.5" r="1.1" fill="#fff"/>`;
  const faces = {
    normal: `${dotEyes}
      <path d="M0 -58.5 q-3 4 -6 1 M0 -58.5 q3 4 6 1" ${ink}/>`,
    unsure: `${dotEyes}
      <path d="M-4 -55 q2 -2 4 0 q2 2 4 0" ${ink}/>
      <path d="M21 -88 q-5 8 0 11 q5 -3 0 -11 z" fill="#8fd3ff"/>`,
    cry: `
      <path d="M-13 -70 l8 2 M13 -70 l-8 2" ${ink}/>
      <rect x="-11" y="-66" width="4" height="16" rx="2" fill="#8fd3ff"/>
      <rect x="7" y="-66" width="4" height="16" rx="2" fill="#8fd3ff"/>
      <path d="M-18 -52 q-3 6 0 8 q3 -2 0 -8 z" fill="#8fd3ff"/>
      <path d="M18 -48 q-3 6 0 8 q3 -2 0 -8 z" fill="#8fd3ff"/>
      <path d="M-5 -53 q5 -5 10 0" ${ink}/>`,
    happy: `
      <path d="M-13 -66 q4 -6 8 0 M5 -66 q4 -6 8 0" stroke="#2b2340" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M-5 -58 q5 9 10 0 z" fill="#d9536b"/>`,
  };
  return `
  <g transform="translate(${x} ${y}) scale(${s} 1)">
    <ellipse cx="0" cy="4" rx="30" ry="6" fill="#000" opacity=".22"/>
    <ellipse cx="-10" cy="-98" rx="9" ry="28" fill="#fffaf0" transform="rotate(${mood === 'cry' ? -40 : -12} -10 -80)"/>
    <ellipse cx="-10" cy="-96" rx="4.5" ry="19" fill="#ffc2cf" transform="rotate(${mood === 'cry' ? -40 : -12} -10 -80)"/>
    <ellipse cx="12" cy="-100" rx="9" ry="28" fill="#fffaf0" transform="rotate(${mood === 'cry' ? 44 : 16} 12 -82)"/>
    <ellipse cx="12" cy="-98" rx="4.5" ry="19" fill="#ffc2cf" transform="rotate(${mood === 'cry' ? 44 : 16} 12 -82)"/>
    <ellipse cx="0" cy="-28" rx="28" ry="32" fill="#fffaf0"/>
    <ellipse cx="0" cy="-22" rx="15" ry="19" fill="#ffffff"/>
    <ellipse cx="-13" cy="2" rx="11" ry="6" fill="#efe4cf"/>
    <ellipse cx="13" cy="2" rx="11" ry="6" fill="#efe4cf"/>
    <circle cx="0" cy="-66" r="25" fill="#fffaf0"/>
    <ellipse cx="-16" cy="-58" rx="5" ry="3" fill="#ffb3c1" opacity=".85"/>
    <ellipse cx="16" cy="-58" rx="5" ry="3" fill="#ffb3c1" opacity=".85"/>
    <path d="M-2.6 -61.5 L2.6 -61.5 L0 -58.5 Z" fill="#ff8fa3"/>
    ${faces[mood] || faces.normal}
    ${extra}
  </g>`;
}

/* ---------- 肉塊（cooked 烤熟 / burnt 烤焦 / half 半熟） ---------- */
function meatSVG(x, y, w, h, meat) {
  if (meat === 'burnt') {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 3}" fill="#2e2522"/>
            <rect x="${x + 2}" y="${y + 2}" width="${w / 3}" height="2" rx="1" fill="#4d3d35"/>`;
  }
  if (meat === 'half') {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 3}" fill="#f4aaa0"/>
            <rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h}" rx="${h / 3}" fill="#b5652f"/>
            <rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h / 3}" rx="${h / 6}" fill="#dc8a4d"/>`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 3}" fill="#b5652f"/>
          <rect x="${x}" y="${y}" width="${w}" height="${h / 3}" rx="${h / 6}" fill="#dc8a4d"/>`;
}

/* 兔子手上的一串肉 */
function handSkewer(meat, tf) {
  return `<g transform="${tf}">
    <line x1="0" y1="0" x2="40" y2="0" stroke="#c9a06a" stroke-width="2.4" stroke-linecap="round"/>
    ${meatSVG(12, -5, 10, 10, meat)}${meatSVG(25, -5, 10, 10, meat)}
  </g>`;
}

/* ---------- 烤肉架 ---------- */
function grillSVG(meat, hs = '') {
  let skewers = '';
  [236, 246].forEach(yy => {
    skewers += `<line x1="120" y1="${yy}" x2="240" y2="${yy}" stroke="#c9a06a" stroke-width="2.5" stroke-linecap="round"/>`;
    for (let i = 0; i < 5; i++) {
      const cx = 140 + i * 20 + (yy === 246 ? 6 : 0);
      skewers += meatSVG(cx - 8, yy - 6, 16, 12, meat);
    }
  });
  const smoke = meat === 'burnt'
    ? `<g fill="#5b5f78" opacity=".85">
         <circle cx="160" cy="208" r="12"/><circle cx="176" cy="196" r="15"/><circle cx="196" cy="204" r="13"/>
         <circle cx="186" cy="178" r="11"/><circle cx="168" cy="184" r="9"/><circle cx="204" cy="186" r="8"/>
       </g>
       <path d="M150 232 q4 -12 8 -4 q3 -10 7 -2 M200 232 q4 -12 8 -4 q3 -10 7 -2" stroke="#ff7a2f" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<path class="smoke" d="M160 218 q-6 -10 0 -20 q6 -10 0 -20" stroke="#dfe3ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
       <path class="smoke s2" d="M182 216 q-6 -10 0 -20 q6 -10 0 -20" stroke="#dfe3ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
       <path class="smoke s3" d="M204 218 q-6 -10 0 -20 q6 -10 0 -20" stroke="#dfe3ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>`;
  return `
    ${smoke}
    <line x1="132" y1="288" x2="122" y2="324" stroke="#3b4063" stroke-width="5" stroke-linecap="round"/>
    <line x1="228" y1="288" x2="238" y2="324" stroke="#3b4063" stroke-width="5" stroke-linecap="round"/>
    <path d="M112 254 H248 L236 290 H124 Z" fill="#3b4063"/>
    <rect class="coal" x="120" y="250" width="120" height="9" rx="3" fill="#ff7a2f"/>
    <path d="M120 252 H240" stroke="#2a2e4d" stroke-width="1.5"/>
    <g ${hs}>
      <rect x="114" y="224" width="132" height="32" fill="transparent"/>
      ${skewers}
      <rect class="hs-ring" x="114" y="224" width="132" height="32" rx="8" fill="none" stroke="none"/>
    </g>`;
}

/* ---------- 桌上的月餅與柚子 ---------- */
function mooncakeSVG(x) {
  return `
    <rect x="${x - 23}" y="336" width="46" height="16" rx="6" fill="#c9803a"/>
    <ellipse cx="${x}" cy="336" rx="23" ry="7.5" fill="#e3a458"/>
    <ellipse cx="${x}" cy="336" rx="13" ry="4" fill="none" stroke="#b86d28" stroke-width="1.5"/>
    <circle cx="${x}" cy="336" r="1.8" fill="#b86d28"/>`;
}
function pomeloSVG(x, peel = 'open') {
  if (peel === 'half') {   // 剝一半的柚子
    return `
      <circle cx="${x}" cy="334" r="18" fill="#a9d45f"/>
      <path d="M${x - 15} 325 Q${x} 310 ${x + 15} 325 Q${x} 333 ${x - 15} 325 Z" fill="#ffe0c0"/>
      <path d="M${x - 4} 318 V330 M${x + 5} 318 V330" stroke="#f1c69e" stroke-width="1"/>
      <path d="M${x + 14} 324 L${x + 32} 314 Q${x + 28} 327 ${x + 17} 331 Z" fill="#a9d45f"/>
      <path d="M${x + 14} 324 L${x + 32} 314" stroke="#fff4dc" stroke-width="1.5"/>`;
  }
  return `
    <path d="M${x - 22} 336 A22 20 0 0 0 ${x + 22} 336 Z" fill="#a9d45f"/>
    <path d="M${x - 22} 336 L${x - 30} 322 Q${x - 22} 326 ${x - 16} 334 Z" fill="#a9d45f"/>
    <path d="M${x + 22} 336 L${x + 31} 321 Q${x + 23} 326 ${x + 16} 334 Z" fill="#a9d45f"/>
    <ellipse cx="${x - 8}" cy="330" rx="7" ry="10" fill="#ffe0c0"/>
    <ellipse cx="${x + 8}" cy="330" rx="7" ry="10" fill="#ffd3ae"/>
    <ellipse cx="${x}" cy="326" rx="7" ry="11" fill="#ffe8cf"/>
    <path d="M${x} 316 q2 -6 7 -7" stroke="#6b8f2f" stroke-width="2" fill="none" stroke-linecap="round"/>`;
}

/* ---------- 共用背景 ---------- */
function backdropSVG(withStars, hsMoon = '') {
  let stars = '';
  if (withStars) {
    [[30,30],[70,60],[120,22],[160,70],[200,34],[40,120],[110,110],[340,150],[20,200],[330,210]]
      .forEach(([x, y], i) => { stars += `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.2 : 1.8}" fill="#fff" opacity=".8"/>`; });
  }
  return `${stars}
  <g ${hsMoon}>
    <circle cx="282" cy="78" r="64" fill="#ffe6a3" opacity=".08"/>
    <circle cx="282" cy="78" r="52" fill="#ffe6a3" opacity=".16"/>
    <circle cx="282" cy="78" r="41" fill="#ffe6a3"/>
    <circle cx="268" cy="68" r="7" fill="#f3d17f"/>
    <circle cx="294" cy="92" r="9" fill="#f3d17f"/>
    <circle cx="298" cy="62" r="4" fill="#f3d17f"/>
    <circle class="hs-ring" cx="282" cy="78" r="46" fill="none" stroke="none"/>
  </g>
  <path d="M0 312 Q180 288 360 312 V400 H0 Z" fill="#1b2147"/>`;
}
const tableSVG = `
  <rect x="192" y="352" width="160" height="10" rx="3" fill="#8b5a2b"/>
  <rect x="202" y="362" width="7" height="34" fill="#6e4520"/>
  <rect x="336" y="362" width="7" height="34" fill="#6e4520"/>`;

/* ---------- 場景
   variant：landing 首頁（可點擊）/ burnt 0 題 / half 1~4 題 / full 全對 ---------- */
function sceneSVG(interactive, variant = 'landing') {
  const hs = (key, label) => interactive
    ? `class="hotspot" data-key="${key}" tabindex="0" role="button" aria-label="${label}"`
    : '';
  const open = (label) => `<svg viewBox="0 0 360 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">`;

  if (variant === 'full') {
    const heart = (x, y, sc) => `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 4 C-6 -2 -10 -8 -5 -11 C-2 -13 0 -10 0 -8 C0 -10 2 -13 5 -11 C10 -8 6 -2 0 4 Z" fill="#ff9fb4"/>`;
    // 內側手互勾、外側手拿烤肉串與柚子
    const innerArm = `<ellipse cx="27" cy="-34" rx="15" ry="7" fill="#fffaf0" stroke="#e3d6bd" stroke-width="1.2" transform="rotate(12 27 -34)"/>`;
    const leftOuter = `<ellipse cx="-24" cy="-44" rx="13" ry="7" fill="#fffaf0" transform="rotate(50 -24 -44)"/>
      ${handSkewer('cooked', 'translate(-30 -54) rotate(-115)')}`;
    const rightOuter = `<ellipse cx="-24" cy="-44" rx="13" ry="7" fill="#fffaf0" transform="rotate(50 -24 -44)"/>
      <ellipse cx="-34" cy="-60" rx="7" ry="10" fill="#ffe0c0" transform="rotate(-20 -34 -60)"/>
      <ellipse cx="-33" cy="-60" rx="3" ry="6" fill="#ffd3ae" transform="rotate(-20 -34 -60)"/>`;
    return `${open('兩隻兔子手勾手，開心地吃烤肉串和柚子')}
      ${backdropSVG(true)}
      <g transform="translate(-58 100) scale(.72)">${grillSVG('cooked')}</g>
      ${tableSVG}
      ${mooncakeSVG(300)}
      ${pomeloSVG(254, 'open')}
      ${heart(180, 196, 1.4)}${heart(160, 178, 1)}${heart(202, 172, .9)}
      ${rabbitSVG(150, 330, false, leftOuter + innerArm, 'happy')}
      ${rabbitSVG(212, 330, true, rightOuter + innerArm, 'happy')}
    </svg>`;
  }

  const mood = { landing: 'normal', burnt: 'cry', half: 'unsure' }[variant] || 'normal';
  const meat = { landing: 'cooked', burnt: 'burnt', half: 'half' }[variant] || 'cooked';
  const label = {
    landing: '月光下，兩隻兔子在烤肉架前烤豬肉串，桌上有月餅和柚子',
    burnt: '肉串全烤焦了，兩隻兔子傷心落淚',
    half: '肉串烤到半熟，柚子只剝了一半，兔子冒冷汗',
  }[variant];

  const fanArm = `
    <ellipse cx="24" cy="-36" rx="13" ry="7" fill="#fffaf0" transform="rotate(-25 24 -36)"/>
    <g transform="translate(38 -46) rotate(-35)">
      <rect x="-1.5" y="0" width="3" height="16" fill="#8b5a2b"/>
      <circle cx="0" cy="-8" r="11" fill="#ff8a3d"/>
      <path d="M-7 -8 H7 M0 -15 V-1" stroke="#ffb27a" stroke-width="1.2"/>
    </g>`;
  const skewerArm = `
    <ellipse cx="22" cy="-44" rx="13" ry="7" fill="#fffaf0" transform="rotate(-50 22 -44)"/>
    ${handSkewer(meat, 'translate(30 -56) rotate(-60)')}`;

  return `${open(label)}
    ${backdropSVG(!interactive, hs('moon', '月亮，點擊聽發音'))}
    ${grillSVG(meat, hs('skewer', '豬肉串，點擊聽發音'))}
    <g ${hs('rabbit', '兔子，點擊聽發音')}>
      ${rabbitSVG(76, 318, false, fanArm, mood)}
      ${rabbitSVG(286, 318, true, skewerArm, mood)}
      <rect class="hs-ring" x="40" y="186" width="286" height="140" rx="16" fill="none" stroke="none"/>
    </g>
    ${tableSVG}
    <g ${hs('mooncake', '月餅，點擊聽發音')}>
      ${mooncakeSVG(237)}
      <rect class="hs-ring" x="208" y="322" width="58" height="34" rx="8" fill="none" stroke="none"/>
    </g>
    <g ${hs('pomelo', '柚子，點擊聽發音')}>
      ${pomeloSVG(306, variant === 'half' ? 'half' : 'open')}
      <rect class="hs-ring" x="272" y="306" width="68" height="50" rx="8" fill="none" stroke="none"/>
    </g>
  </svg>`;
}

/* =========================================================
   工具
   ========================================================= */
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const $ = sel => document.querySelector(sel);
const state = { index: 0, score: 0, picks: [], found: new Set() };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('is-active', s.id === id));
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* =========================================================
   語音（Web Speech API, th-TH）
   ========================================================= */
let thaiVoice = null;
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  const th = voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith('th'));
  thaiVoice = th.find(v => /google/i.test(v.name)) || th[0] || null;
  $('#tts-note').hidden = !(voices.length && !thaiVoice);
}
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
  if (!('speechSynthesis' in window)) { toast('此瀏覽器不支援語音播放'); return; }
  speechSynthesis.cancel();
  // Chrome 在 cancel 後立刻 speak 偶爾會失效，稍微延遲
  setTimeout(() => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'th-TH';
    if (thaiVoice) u.voice = thaiVoice;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }, 60);
}

/* =========================================================
   頁面一：首頁互動
   ========================================================= */
function initLanding() {
  document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = CONFIG.brandName; });
  $('#store-link').href = CONFIG.storeUrl;
  $('#scene').innerHTML = sceneSVG(true);

  // 星星
  const sky = $('#sky');
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('i');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 70 + '%';
    s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
    if (Math.random() < 0.2) { s.style.width = s.style.height = '3px'; }
    sky.appendChild(s);
  }

  // 下方文字按鈕（也可點）
  const chips = $('#chips');
  Object.entries(CONFIG.items).forEach(([key, it]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.key = key;
    b.textContent = it.zh;
    b.addEventListener('click', () => activateItem(key));
    chips.appendChild(b);
  });

  document.querySelectorAll('.hotspot').forEach(g => {
    g.addEventListener('click', () => activateItem(g.dataset.key));
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateItem(g.dataset.key); }
    });
  });

  $('#btn-start').addEventListener('click', startQuiz);
}

let bubbleTimer;
function activateItem(key) {
  const it = CONFIG.items[key];
  const g = document.querySelector(`.hotspot[data-key="${key}"]`);
  if (!it || !g) return;

  // 微動畫
  g.classList.remove('bounce');
  void g.getBoundingClientRect();
  g.classList.add('bounce');

  // 提示框：定位在物品上方
  const wrap = $('#scene-wrap').getBoundingClientRect();
  const r = g.getBoundingClientRect();
  const bubble = $('#bubble');
  $('#bubble-thai').textContent = it.thai;
  $('#bubble-roman').textContent = it.roman;
  $('#bubble-zh').textContent = it.zh;
  bubble.hidden = false;
  bubble.style.animation = 'none'; void bubble.offsetWidth; bubble.style.animation = '';
  const half = Math.min(bubble.offsetWidth / 2, wrap.width / 2);
  let x = r.left + r.width / 2 - wrap.left;
  x = Math.max(half + 4, Math.min(wrap.width - half - 4, x));
  const y = Math.max(bubble.offsetHeight + 4, r.top - wrap.top - 6);
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => { bubble.hidden = true; }, 2800);

  speak(it.thai);

  state.found.add(key);
  $('#found-count').textContent = state.found.size;
  document.querySelector(`.chip[data-key="${key}"]`)?.classList.add('found');
}

/* =========================================================
   頁面二：測驗
   ========================================================= */
function startQuiz() {
  clearResult();
  state.pickProduct = null;
  state.index = 0; state.score = 0; state.picks = [];
  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const total = CONFIG.questions.length;
  const q = CONFIG.questions[state.index];
  const pct = (state.index / total) * 100;

  $('#quiz-count').textContent = `第 ${state.index + 1} / ${total} 題`;
  $('#progress-fill').style.width = pct + '%';
  $('#progress-rabbit').style.left = pct + '%';
  $('#progress').setAttribute('aria-valuenow', state.index);
  $('#progress').setAttribute('aria-valuemax', total);

  const listen = $('#btn-listen');
  listen.hidden = !q.speak;
  listen.onclick = () => speak(q.speak);

  $('#quiz-prompt').textContent = q.prompt;

  const box = $('#options');
  box.innerHTML = '';
  q.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'option';
    b.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span><span class="opt-text">${escapeHTML(opt)}</span>`;
    b.addEventListener('click', () => pickOption(i, b));
    box.appendChild(b);
  });

  // 重置作答回饋
  $('#feedback').hidden = true;

  if (q.speak) setTimeout(() => speak(q.speak), 350);
}

function pickOption(i, btn) {
  const q = CONFIG.questions[state.index];
  const total = CONFIG.questions.length;
  const ok = i === q.answer;
  const opts = document.querySelectorAll('.option');

  opts.forEach(b => { b.disabled = true; });
  opts[q.answer].classList.add('correct');
  if (!ok) btn.classList.add('wrong');
  state.picks[state.index] = i;
  if (ok) state.score++;

  // 進度條前進
  const pct = ((state.index + 1) / total) * 100;
  $('#progress-fill').style.width = pct + '%';
  $('#progress-rabbit').style.left = pct + '%';

  // 當下顯示對錯
  const verdict = $('#verdict');
  verdict.className = 'verdict ' + (ok ? 'is-ok' : 'is-ng');
  verdict.textContent = ok
    ? '✓ 答對了！'
    : `✗ 答錯了，正確答案是 (${LETTERS[q.answer]})`;

  // 解析內容（含特定選項的額外回饋）
  const extra = !ok && q.optionFeedback && q.optionFeedback[i];
  $('#explain').innerHTML = `<p>${escapeHTML(q.explanation)}</p>` +
    (extra ? `<p class="rv-extra">💬 ${escapeHTML(extra)}</p>` : '');

  $('#btn-next').textContent = state.index + 1 < total ? '下一題' : '看我的結果';
  $('#feedback').hidden = false;
  $('#feedback').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  state.index++;
  if (state.index < CONFIG.questions.length) renderQuestion();
  else showResult();
}

/* =========================================================
   頁面三：結果
   ========================================================= */
function tierOf(score, total) {
  if (score === 0) return 'burnt';
  if (score === total) return 'full';
  return 'half';
}

function showResult() {
  const total = CONFIG.questions.length;
  const tierKey = tierOf(state.score, total);
  const tier = CONFIG.results[tierKey];
  $('#progress-fill').style.width = '100%';

  // A. 影片
  const video = $('#video');
  video.innerHTML = CONFIG.youtubeId
    ? `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(CONFIG.youtubeId)}" title="Bar-B-Q Plaza 泰國搞笑烤肉廣告" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : `<div class="video-empty">影片準備中，請在 script.js 的 CONFIG.youtubeId 填入影片 ID</div>`;

  // B-1. 分享圖（只有分數、稱號、兔子插圖）
  artReady = svgToPng(sceneSVG(false, tierKey), 1080)
    .then(png => { $('#sc-art').src = png; })
    .catch(() => { $('#sc-art').src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sceneSVG(false, tierKey)); });
  $('#sc-score').textContent = state.score;
  $('#sc-total').textContent = '/' + total;
  $('#sc-title').textContent = tier.shareTitle;

  // B-2. 導購
  $('#shop-copy').textContent = tier.copy;
  // 隨機抽一個該程度的商品（重新整理頁面時沿用同一個）
  if (state.pickProduct == null || state.pickProduct >= tier.products.length) {
    state.pickProduct = Math.floor(Math.random() * tier.products.length);
  }
  renderProducts([
    { ...tier.products[state.pickProduct], tag: '適合你現在的程度' },
    { ...CONFIG.fixedProduct, tag: '每個程度都推薦' },
  ]);

  // 存下結果：萬一手機存圖後重新載入頁面，也會回到這個結果頁
  saveResult();

  showScreen('screen-result');
}

/* ---------- 推薦商品卡 ---------- */
function renderProducts(list) {
  $('#products').innerHTML = list.map(p => `
    <li class="product">
      <a class="product-img" href="${escapeHTML(p.url)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
        ${p.image
          ? `<img src="${escapeHTML(p.image)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'product-img-empty',textContent:'商品圖'}))" />`
          : `<span class="product-img-empty">商品圖</span>`}
      </a>
      <div class="product-body">
        <p class="product-tag">${escapeHTML(p.tag)}</p>
        <h3 class="product-name">${escapeHTML(p.name)}</h3>
        <p class="product-desc">${escapeHTML(p.desc)}</p>
        ${p.coupon ? `<p class="product-coupon">
          <span class="pc-label">${escapeHTML(p.couponLabel || '折扣碼')}</span>
          <code class="pc-code">${escapeHTML(p.coupon)}</code>
          ${p.couponNote ? `<span class="pc-note">${escapeHTML(p.couponNote)}</span>` : ''}
        </p>` : ''}
        <a class="btn btn-gold btn-sm product-btn" href="${escapeHTML(p.url)}" target="_blank" rel="noopener">前往購買</a>
      </div>
    </li>`).join('');
}

/* ---------- 結果暫存（sessionStorage，只存在這個分頁） ---------- */
const RESULT_KEY = 'moonQuizResult';
function saveResult() {
  try {
    sessionStorage.setItem(RESULT_KEY, JSON.stringify({ score: state.score, picks: state.picks, pickProduct: state.pickProduct }));
    history.replaceState(null, '', '#result');
  } catch (e) {}
}
function clearResult() {
  try { sessionStorage.removeItem(RESULT_KEY); history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
}
function restoreResult() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(RESULT_KEY) || 'null');
    if (location.hash === '#result' && saved && saved.picks.length === CONFIG.questions.length) {
      state.score = saved.score;
      state.picks = saved.picks;
      state.pickProduct = saved.pickProduct;
      state.index = CONFIG.questions.length;
      showResult();
      return true;
    }
  } catch (e) {}
  return false;
}

/* ---------- 分享圖產生 ---------- */
let shareBlob = null;
let shareURL = '';
let artReady = Promise.resolve();

/* html2canvas 無法穩定繪製 SVG 圖片（手機 Safari 常整張空白），先自己轉成 PNG */
function svgToPng(svg, width) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const h = Math.round(width * 400 / 360);   // 插圖 viewBox 360×400
      const c = document.createElement('canvas');
      c.width = width; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, width, h);
      try { resolve(c.toDataURL('image/png')); } catch (e) { reject(e); }
    };
    img.onerror = reject;
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
}

const isInAppBrowser = /Instagram|FBAN|FBAV|Line\/|Threads/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function canShareFile() {
  if (!shareBlob || !navigator.canShare) return false;
  return navigator.canShare({ files: [new File([shareBlob], 'mid-autumn-thai.png', { type: 'image/png' })] });
}

async function makeShareImage() {
  const btn = $('#btn-share');
  const card = $('#share-card');
  if (typeof html2canvas !== 'function') { toast('圖片工具載入失敗，請重新整理'); return; }

  btn.disabled = true;
  const label = btn.textContent;
  btn.textContent = '圖片製作中…';
  try {
    await artReady;
    if (document.fonts?.ready) await document.fonts.ready;
    const img = $('#sc-art');
    if (img.decode) { try { await img.decode(); } catch (e) {} }

    const rect = card.getBoundingClientRect();
    const canvas = await html2canvas(card, {
      scale: 1080 / rect.width,          // 輸出 1080×1920，剛好是 IG 限動尺寸
      backgroundColor: '#141a3d',
      useCORS: true,
      logging: false,
      // 修正頁面捲動後截圖位移、被切掉的問題
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      // 下載的圖改成直角，避免四個角露出底色
      onclone: doc => { doc.getElementById('share-card').style.borderRadius = '0'; },
    });

    shareBlob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    if (shareURL) URL.revokeObjectURL(shareURL);
    shareURL = URL.createObjectURL(shareBlob);
    $('#modal-img').src = shareURL;
    $('#btn-native-share').hidden = !canShareFile();

    $('#modal').hidden = false;
    $('#btn-close').focus();
  } catch (err) {
    console.error(err);
    toast('圖片製作失敗，可以直接截圖分享喔');
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}

/* 下載：一律留在結果頁，不跳離網頁
   手機先試系統分享面板 → 再試直接下載 → 最後開新分頁讓使用者長按儲存 */
const isMobile = /Android|iPad|iPhone|iPod|Mobile/i.test(navigator.userAgent) || isIOS;
const supportsDownloadAttr = 'download' in document.createElement('a');

async function downloadImage() {
  if (!shareBlob) return;

  // 手機優先用系統分享面板（iPhone 選「儲存影像」、Android 選「下載」），成功就結束
  if (isMobile && canShareFile()) {
    const shared = await nativeShare();
    if (shared) return;
  }

  // 一般瀏覽器：直接觸發下載，頁面不變
  if (supportsDownloadAttr && !isInAppBrowser) {
    try {
      const a = document.createElement('a');
      a.href = shareURL;
      a.download = '中秋泰語生存力.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast('圖片已儲存！看看下方的推薦書單 👇');
      return;
    } catch (e) { /* 失敗就往下一個方式 */ }
  }

  // 最後手段：把圖片開在新分頁，長按即可存檔，原本的結果頁仍然留著
  const win = window.open(shareURL, '_blank');
  toast(win ? '請在新分頁長按圖片儲存 📲' : '請長按上方圖片儲存 📲');
}

async function nativeShare() {
  if (!shareBlob) return false;
  const file = new File([shareBlob], 'mid-autumn-thai.png', { type: 'image/png' });
  try {
    await navigator.share({ files: [file], title: '中秋泰語生存力測驗', text: `我答對了 ${state.score}/${CONFIG.questions.length} 題！你呢？` });
    return true;                       // 使用者取消也算完成，不再跳其他視窗
  } catch (e) {
    return e && e.name === 'AbortError';
  }
}

/* 關閉彈窗後，帶使用者看到購書區 */
function closeModal() {
  if ($('#modal').hidden) return;
  $('#modal').hidden = true;
  $('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =========================================================
   事件綁定
   ========================================================= */
function initResultEvents() {
  $('#btn-next').addEventListener('click', nextQuestion);
  $('#btn-share').addEventListener('click', makeShareImage);
  $('#btn-native-share').addEventListener('click', nativeShare);
  $('#btn-download').addEventListener('click', downloadImage);
  $('#btn-close').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  $('#btn-restart').addEventListener('click', () => { clearResult(); showScreen('screen-landing'); });
}

initLanding();
initResultEvents();
restoreResult();
