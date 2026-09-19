import type { FoxKind, FoxResult, Question } from './types';

export const questions: Question[] = [
  {
    id: 'weekend',
    eyebrow: '週末求生題',
    prompt: '週末醒來的第一件事？',
    options: [
      { label: '翻面，這題晚點再答', fox: 'sleepy', emoji: '🛌' },
      { label: '領每日登入獎勵', fox: 'gamer', emoji: '🎮' },
      { label: '確認床邊還有沒有零食', fox: 'snack', emoji: '🍪' },
      { label: '隨便穿，先出去再說', fox: 'adventure', emoji: '🧭' },
    ],
  },
  {
    id: 'battery',
    eyebrow: '危機處理題',
    prompt: '手機只剩 10%，你會？',
    options: [
      { label: '借充電線，順便聊一小時', fox: 'social', emoji: '🗣️' },
      { label: '關掉全部 App，只留遊戲', fox: 'gamer', emoji: '🔋' },
      { label: '它累了，我也一起睡', fox: 'sleepy', emoji: '😴' },
      { label: '開省電，繼續往沒去過的地方走', fox: 'adventure', emoji: '🗺️' },
    ],
  },
  {
    id: 'store',
    eyebrow: '靈魂拷問題',
    prompt: '走進便利商店，你直奔哪區？',
    options: [
      { label: '洋芋片牆，先站著選口味', fox: 'snack', emoji: '🔺' },
      { label: '新品區，拍給朋友看', fox: 'social', emoji: '📸' },
      { label: '遊戲點數卡，只看不買也開心', fox: 'gamer', emoji: '🕹️' },
      { label: '冷藏櫃，找一瓶喝了會想睡的', fox: 'sleepy', emoji: '🥛' },
    ],
  },
  {
    id: 'invite',
    eyebrow: '友情壓力題',
    prompt: '朋友突然說：「半小時後出門！」',
    options: [
      { label: '好啊！還有誰？我來揪', fox: 'social', emoji: '🥳' },
      { label: '去哪不重要，沒去過就好', fox: 'adventure', emoji: '🚲' },
      { label: '可以，但路上要買餅乾', fox: 'snack', emoji: '🛒' },
      { label: '我這局打完。真的最後一局', fox: 'gamer', emoji: '⏳' },
    ],
  },
  {
    id: 'stuck',
    eyebrow: '狐狸本能題',
    prompt: '事情卡住時，你通常？',
    options: [
      { label: '換條路，搞不好更有趣', fox: 'adventure', emoji: '🛤️' },
      { label: '先躺五分鐘，醒來再說', fox: 'sleepy', emoji: '☁️' },
      { label: '丟群組，召喚懂的人', fox: 'social', emoji: '🦊' },
      { label: '咬一口脆的，腦袋才會動', fox: 'snack', emoji: '💥' },
    ],
  },
];

export const foxResults: Record<FoxKind, FoxResult> = {
  sleepy: {
    title: '睏睏狐狸',
    shortTitle: '睏睏',
    tagline: '你不是懶，你只是在節能模式。',
    traits: ['很會休息', '討厭被催', '對枕頭忠誠'],
    roast: '世界在燃燒，而你正在找枕頭比較涼的那一面。',
    accent: '#8a67c7',
    imagePosition: 0,
  },
  gamer: {
    title: '電動狐狸',
    shortTitle: '電動',
    tagline: '現實沒有存檔，所以你選擇先打遊戲。',
    traits: ['勝負欲滿格', '手速比嘴快', '擅長最後一局'],
    roast: '別人說人生是旅程，你比較在意能不能跳過過場動畫。',
    accent: '#3769e8',
    imagePosition: 1,
  },
  snack: {
    title: '多力多滋狐狸',
    shortTitle: '脆脆',
    tagline: '你的情緒很複雜，但解法通常很脆。',
    traits: ['零食雷達', '快樂直接', '手指總有粉'],
    roast: '你不是在吃餅乾，就是在思考下一包餅乾。',
    accent: '#f0472f',
    imagePosition: 2,
  },
  social: {
    title: '社交狐狸',
    shortTitle: '社交',
    tagline: '你的人生沒有路人，只有還沒聊過的朋友。',
    traits: ['群組發電機', '現場不冷場', '消息回超快'],
    roast: '你的手機不是沒電，是每個群組都被你聊到發燙。',
    accent: '#df3f77',
    imagePosition: 3,
  },
  adventure: {
    title: '探險狐狸',
    shortTitle: '探險',
    tagline: '只要地圖還有灰色，你就坐不住。',
    traits: ['說走就走', '迷路也開心', '行李永遠半滿'],
    roast: '你把「不知道會怎樣」理解成「那一定要去看看」。',
    accent: '#148260',
    imagePosition: 4,
  },
};

export const taunts = [
  '差一點。真的只差一個太平洋。',
  '你的手指還在載入嗎？',
  '狐狸都等到睡著了。',
  '需要幫你把按鈕放大到電視那麼大嗎？',
  '這支手機是不是不認識你？',
  '我開始替你感到尷尬了。',
  '好啦，這次真的不跑。大概。',
];
