import type { FoxKind, FoxResult, Question } from './types';

export const questions: Question[] = [
  {
    id: 'weekend',
    eyebrow: '週末求生題',
    prompt: '週末睡醒，你的第一件事是？',
    options: [
      { label: '翻個身繼續睡，天大的事睡醒再說！', fox: 'sleepy', emoji: '🛌' },
      { label: '打開遊戲，每日登入獎勵不能漏！', fox: 'gamer', emoji: '🎮' },
      { label: '摸摸床邊，看看還有沒有零食可以吃。', fox: 'snack', emoji: '🍪' },
      { label: '隨便套件衣服，出門晃晃去！', fox: 'adventure', emoji: '🧭' },
    ],
  },
  {
    id: 'battery',
    eyebrow: '危機處理題',
    prompt: '手機只剩 10% 的電，你會？',
    options: [
      { label: '跟朋友借充電線，順便聊個一小時。', fox: 'social', emoji: '🗣️' },
      { label: '關掉其他 App，遊戲可不能斷線！', fox: 'gamer', emoji: '🔋' },
      { label: '手機沒電了？那我也睡一下好了。', fox: 'sleepy', emoji: '😴' },
      { label: '開啟省電模式，繼續探索沒去過的地方！', fox: 'adventure', emoji: '🗺️' },
    ],
  },
  {
    id: 'store',
    eyebrow: '靈魂拷問題',
    prompt: '走進便利商店，你會直奔哪一區？',
    options: [
      { label: '洋芋片區！今天要吃哪個口味呢？', fox: 'snack', emoji: '🔺' },
      { label: '新品區！看到有趣的，馬上拍給朋友看。', fox: 'social', emoji: '📸' },
      { label: '遊戲點數卡區，不買也要看一下！', fox: 'gamer', emoji: '🕹️' },
      { label: '冷藏櫃，買瓶飲料，喝完回家睡覺。', fox: 'sleepy', emoji: '🥛' },
    ],
  },
  {
    id: 'invite',
    eyebrow: '友情壓力題',
    prompt: '朋友突然揪你：「半小時後出門！」',
    options: [
      { label: '好啊！還有誰？我再揪幾個人一起！', fox: 'social', emoji: '🥳' },
      { label: '好耶！去哪都行，最好是沒去過的地方。', fox: 'adventure', emoji: '🚲' },
      { label: '可以呀！但路上要先買包餅乾。', fox: 'snack', emoji: '🛒' },
      { label: '等我打完這局！真的，最後一局！', fox: 'gamer', emoji: '⏳' },
    ],
  },
  {
    id: 'stuck',
    eyebrow: '狐狸本能題',
    prompt: '遇到事情卡關，你通常會？',
    options: [
      { label: '換個方法試試，說不定有新發現！', fox: 'adventure', emoji: '🛤️' },
      { label: '先躺五分鐘，睡醒再來想辦法。', fox: 'sleepy', emoji: '☁️' },
      { label: '丟到群組求救，召喚大神來幫忙！', fox: 'social', emoji: '🦊' },
      { label: '先吃片餅乾，咔滋一下才有動力！', fox: 'snack', emoji: '💥' },
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
