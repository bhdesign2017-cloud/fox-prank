# 狐狸心理測驗整人網站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個以 iPhone 直式操作為優先、包含五題狐狸心理測驗、逃跑結果按鈕、兩階段反轉與真實性格結果的可部署單頁網站。

**Architecture:** 使用 React + TypeScript + Vite 建立單一路由狀態機。題庫、計分、逃跑位置計算與文案資料各自獨立；React 元件只負責呈現與事件協調，純函式以 Vitest 驗證，完整流程以 Testing Library 驗證。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Testing Library、CSS Modules 或單一全域 CSS、Pointer Events、Web Vibration API、靜態網站部署。

**Spec:** `docs/superpowers/specs/2026-09-19-fox-prank-iphone-design.md`

## Execution Status

- Tasks 1–7: completed and verified on 2026-09-19.
- Task 8 local delivery: completed; 22 tests pass, production build succeeds, and iPhone 390×844 / 393×852 browser QA has no overflow or console errors.
- Task 8 public deployment: intentionally pending explicit user authorization.
- Git integration: not applicable; this new project is not a Git repository and no commit was requested.

## Global Constraints

- 專案根目錄固定為 `D:\APP\fox-prank-iphone`。
- 單一路由、無登入、無後端、無外部資料庫、無分析追蹤。
- 主要驗證尺寸為 390 x 844 與 393 x 852。
- 前 7 次查看結果嘗試必定逃跑，第 8 次起必須可完成。
- 長按驗證第一次在 99% 失敗，第二次必須成功。
- 使用 `100dvh` 與 `env(safe-area-inset-*)`；互動區至少 44 x 44 px。
- 尊重 `prefers-reduced-motion`；鍵盤使用者必須可完成流程。
- 音效預設關閉，本版不加入背景音樂。
- 不使用多力多滋商標、包裝，不仿造 iOS 系統警告，不索取個資。
- 未取得使用者另行授權前，不執行 `git commit`、push 或部署到其他既有站點。

## File Map

- `package.json`：開發、測試與建置指令及相依套件。
- `vite.config.ts`、`tsconfig*.json`、`index.html`：Vite 與 TypeScript 基礎設定。
- `src/main.tsx`：React 掛載入口。
- `src/App.tsx`：六階段狀態機與畫面切換。
- `src/styles.css`：設計 tokens、排版、手機安全區、元件狀態與動畫。
- `src/domain/types.ts`：狐狸、題目與應用狀態型別。
- `src/domain/quizData.ts`：五題、五種結果、嘲諷文案。
- `src/domain/scoring.ts`：決定狐狸類型的純函式。
- `src/domain/escape.ts`：安全範圍內的按鈕座標計算。
- `src/components/IntroScreen.tsx`：開場。
- `src/components/QuizScreen.tsx`：逐題作答與進度。
- `src/components/EscapeScreen.tsx`：逃跑按鈕與嘲諷升級。
- `src/components/FakeAnalysisScreen.tsx`：99% 假分析。
- `src/components/HoldScreen.tsx`：兩次長按驗證。
- `src/components/ResultScreen.tsx`：真實結果、隱藏稱號與複製連結。
- `src/hooks/useReducedMotion.ts`：動態效果偏好。
- `src/hooks/usePressHold.ts`：可取消、可重試的長按控制。
- `src/assets/fox-*.png`：兩張原創透明背景狐狸插畫，另保留非載入用高解析原圖。
- `src/**/*.test.ts(x)`：純函式與互動流程測試。

---

### Task 1: 建立可測試的 React 專案骨架

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: `npm run dev`、`npm test`、`npm run build`；預設匯出 `App(): JSX.Element`。

- [ ] **Step 1: 設定 Sites portable execution profile**

Run from `D:\APP\fox-prank-iphone`:

```powershell
node C:\Users\a0981\.codex\plugins\cache\openai-curated-remote\sites\0.1.65\scripts\configure-execution-profile.mjs
```

Expected: `.sites-runtime/execution-profile.json` 顯示 portable；若資料夾尚非相容 starter，`configured` 可為 false，後續仍保留自行建立的 Vite 設定。

- [ ] **Step 2: 建立 package 設定**

`package.json` 使用以下 scripts 與套件：

```json
{
  "name": "fox-prank-iphone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "test": "vitest run",
    "test:watch": "vitest",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 3: 建立最小失敗測試**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';

it('顯示狐狸測驗開場', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: '測出你是哪種狐狸？' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '開始測驗' })).toBeInTheDocument();
});
```

- [ ] **Step 4: 安裝相依套件並確認測試失敗**

Run:

```powershell
npm install
npm test -- src/App.test.tsx
```

Expected: FAIL，因 `App` 尚未顯示指定標題與按鈕。

- [ ] **Step 5: 建立最小 App 與測試環境**

`src/App.tsx`：

```tsx
export default function App() {
  return <main><h1>測出你是哪種狐狸？</h1><button>開始測驗</button></main>;
}
```

在 `vite.config.ts` 設定 React plugin、`test.environment = 'jsdom'` 與 `setupFiles = './src/test/setup.ts'`；在 setup 匯入 `@testing-library/jest-dom/vitest`。

- [ ] **Step 6: 驗證骨架**

Run:

```powershell
npm test -- src/App.test.tsx
npm run build
```

Expected: 測試 PASS；`dist/index.html` 生成。

- [ ] **Step 7: 建立人工檢查點**

列出本任務新增檔案與測試結果，不執行 commit。

---

### Task 2: 題庫、結果資料與穩定計分

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/quizData.ts`
- Create: `src/domain/scoring.ts`
- Test: `src/domain/scoring.test.ts`

**Interfaces:**
- Produces: `FoxKind = 'sleepy' | 'gamer' | 'snack' | 'social' | 'adventure'`。
- Produces: `scoreQuiz(answers: Answer[]): FoxKind`。
- Produces: `questions: Question[]`、`foxResults: Record<FoxKind, FoxResult>`、`taunts: string[]`。

- [ ] **Step 1: 定義型別與失敗測試**

```ts
export type FoxKind = 'sleepy' | 'gamer' | 'snack' | 'social' | 'adventure';
export type Answer = { questionId: string; optionIndex: number; fox: FoxKind };
export type Question = { id: string; prompt: string; options: { label: string; fox: FoxKind }[] };
export type FoxResult = { title: string; tagline: string; traits: [string, string, string]; roast: string; image: string };
```

測試必須涵蓋：單一類型最高分、五類同分時最後兩題優先、空答案回傳 `sleepy`、相同答案結果穩定。

- [ ] **Step 2: 執行測試確認失敗**

Run: `npm test -- src/domain/scoring.test.ts`

Expected: FAIL，因 `scoreQuiz` 尚不存在。

- [ ] **Step 3: 實作穩定計分**

```ts
export function scoreQuiz(answers: Answer[]): FoxKind {
  if (answers.length === 0) return 'sleepy';
  const order: FoxKind[] = ['sleepy', 'gamer', 'snack', 'social', 'adventure'];
  const scores = Object.fromEntries(order.map(kind => [kind, 0])) as Record<FoxKind, number>;
  answers.forEach(answer => { scores[answer.fox] += 1; });
  const max = Math.max(...Object.values(scores));
  const tied = order.filter(kind => scores[kind] === max);
  const recentWinner = [...answers].reverse().find(answer => tied.includes(answer.fox));
  return recentWinner?.fox ?? tied[0];
}
```

- [ ] **Step 4: 填入完整中文資料**

五題固定為：週末醒來第一件事、手機只剩 10% 電、便利商店選擇、朋友臨時揪出門、遇到卡關。每題四個答案，五類至少在四題出現；`taunts` 固定使用規格中的七句。

- [ ] **Step 5: 驗證資料與計分**

Run: `npm test -- src/domain/scoring.test.ts`

Expected: 所有計分測試 PASS，且 `questions` 長度為 5、每題選項長度為 4。

- [ ] **Step 6: 建立人工檢查點**

輸出五題與五種結果標題供快速校對，不執行 commit。

---

### Task 3: 開場與五題測驗流程

**Files:**
- Create: `src/components/IntroScreen.tsx`
- Create: `src/components/QuizScreen.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `questions`、`Answer`、`scoreQuiz`。
- Produces: `AppStage = 'intro' | 'quiz' | 'escape' | 'fake-analysis' | 'hold' | 'result'`。
- Produces: `QuizScreen({ onComplete }: { onComplete(answers: Answer[]): void })`。

- [ ] **Step 1: 擴充失敗測試**

測試依序點擊「開始測驗」與五個可識別答案，斷言進度從 `第 1 題，共 5 題` 到 `第 5 題，共 5 題`，最後出現「狐狸 DNA 已解析」。再測快速雙擊同一答案只前進一題。

- [ ] **Step 2: 執行測試確認失敗**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL，因測驗畫面尚不存在。

- [ ] **Step 3: 實作狀態機與元件**

`App` 保存 `stage`、`answers`、`resultKind`；`QuizScreen` 保存目前題號與 transition lock。選項觸發後先鎖定按鈕，使用 180ms 切換；測試環境可透過 fake timers 前進。

核心事件簽名：

```tsx
const handleQuizComplete = (nextAnswers: Answer[]) => {
  setAnswers(nextAnswers);
  setResultKind(scoreQuiz(nextAnswers));
  setStage('escape');
};
```

- [ ] **Step 4: 驗證五題流程**

Run: `npm test -- src/App.test.tsx`

Expected: 所有開場與五題流程測試 PASS。

- [ ] **Step 5: 建立人工檢查點**

以鍵盤 Tab、Enter 實走五題，確認焦點順序與 disabled 狀態，不執行 commit。

---

### Task 4: 安全範圍內的逃跑按鈕

**Files:**
- Create: `src/domain/escape.ts`
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/components/EscapeScreen.tsx`
- Modify: `src/App.tsx`
- Test: `src/domain/escape.test.ts`
- Test: `src/components/EscapeScreen.test.tsx`

**Interfaces:**
- Produces: `getEscapePosition(bounds: Rect, button: Size, previous: Point, seed: number): Point`。
- Produces: `EscapeScreen({ onCaught }: { onCaught(): void })`。
- Consumes: `taunts` 與 `prefers-reduced-motion`。

- [ ] **Step 1: 寫座標與互動失敗測試**

測試座標在 `x >= 16`、`y >= 120`、`x + width <= viewportWidth - 16`、`y + height <= viewportHeight - bottomSafeArea - 16`；測試前七次 pointer down 不呼叫 `onCaught`，第八次 click 呼叫一次；鍵盤 click 可在一次確認後完成。

- [ ] **Step 2: 執行測試確認失敗**

Run:

```powershell
npm test -- src/domain/escape.test.ts src/components/EscapeScreen.test.tsx
```

Expected: FAIL，因座標函式與元件尚不存在。

- [ ] **Step 3: 實作可重現的安全座標函式**

```ts
export function getEscapePosition(bounds: Rect, button: Size, previous: Point, seed: number): Point {
  const margin = 16;
  const minY = Math.max(bounds.top + margin, 120);
  const maxX = Math.max(margin, bounds.width - button.width - margin);
  const maxY = Math.max(minY, bounds.height - bounds.bottomInset - button.height - margin);
  const wave = (Math.sin(seed * 999) + 1) / 2;
  const zig = (Math.cos(seed * 577) + 1) / 2;
  const next = { x: Math.round(margin + wave * (maxX - margin)), y: Math.round(minY + zig * (maxY - minY)) };
  return Math.hypot(next.x - previous.x, next.y - previous.y) < 90
    ? { x: maxX - next.x + margin, y: maxY - next.y + minY }
    : next;
}
```

- [ ] **Step 4: 實作 pointer 與鍵盤分流**

Pointer 第 1 至 7 次在 `onPointerDown` 呼叫 `preventDefault()`、遞增失敗次數、更新座標與嘲諷；第 8 次不再搬移，讓後續 click 完成。`event.detail === 0` 視為鍵盤觸發：第一次顯示「鍵盤狐狸很聰明，再按一次確認」，第二次完成。

震動僅在 `typeof navigator.vibrate === 'function'` 時呼叫 `navigator.vibrate(18)`；減少動態效果時增加 `data-reduced-motion` 並停用 transform transition。

- [ ] **Step 5: 驗證逃跑機制**

Run:

```powershell
npm test -- src/domain/escape.test.ts src/components/EscapeScreen.test.tsx
npm test
```

Expected: 前七次無法完成、第八次可完成；座標測試與全套測試 PASS。

- [ ] **Step 6: 建立人工檢查點**

在 390 x 844 viewport 嘗試八次，記錄每次按鈕座標並確認無任何位置超出畫面，不執行 commit。

---

### Task 5: 99% 假分析與兩次長按驗證

**Files:**
- Create: `src/components/FakeAnalysisScreen.tsx`
- Create: `src/hooks/usePressHold.ts`
- Create: `src/components/HoldScreen.tsx`
- Modify: `src/App.tsx`
- Test: `src/hooks/usePressHold.test.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `usePressHold({ duration, onComplete }): { progress, bind, reset }`。
- Produces: `FakeAnalysisScreen({ onDone }: { onDone(): void })`。
- Produces: `HoldScreen({ onComplete }: { onComplete(): void })`。

- [ ] **Step 1: 寫計時與完整流程失敗測試**

使用 fake timers：假分析在 1600ms 走到 99%，再於 900ms 後顯示「結果被狐狸叼走了」；第一次持續按壓 3000ms 顯示「你放太早了。狐狸說的。」且不完成；第二次持續按壓 3000ms 呼叫完成。另測 pointer cancel 會歸零。

- [ ] **Step 2: 執行測試確認失敗**

Run:

```powershell
npm test -- src/hooks/usePressHold.test.tsx src/App.test.tsx
```

Expected: FAIL，因分析與長按流程尚不存在。

- [ ] **Step 3: 實作可取消的長按 hook**

`pointerdown` 記錄開始時間並啟動 `requestAnimationFrame`；`pointerup`、`pointercancel`、`pointerleave` 清除 frame。進度到 100 時只呼叫一次 `onComplete`，cleanup 必須在 unmount 時執行。

- [ ] **Step 4: 實作兩段畫面**

`FakeAnalysisScreen` 使用 `role="progressbar"`、`aria-valuenow`；`HoldScreen` 維護 `attempt`，第一次 hook 完成時把視覺進度改為 99 並顯示失敗文案，第二次呼叫父層 `onComplete`。

- [ ] **Step 5: 驗證分析與長按流程**

Run:

```powershell
npm test -- src/hooks/usePressHold.test.tsx src/App.test.tsx
npm test
```

Expected: 計時、取消、第一次失敗與第二次成功全部 PASS。

- [ ] **Step 6: 建立人工檢查點**

以真實觸控或瀏覽器觸控模擬確認手指移出控制項會取消，且畫面沒有被長按選字，不執行 commit。

---

### Task 6: 真實結果、複製連結與重新測驗

**Files:**
- Create: `src/components/ResultScreen.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/ResultScreen.test.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `FoxResult` 與 `resultKind`。
- Produces: `ResultScreen({ result, onRestart }: { result: FoxResult; onRestart(): void })`。

- [ ] **Step 1: 寫結果頁失敗測試**

斷言顯示真實狐狸標題、三項 traits、幽默 roast 與「容易相信按鈕的被耍狐狸」。mock `navigator.clipboard.writeText` 驗證複製成功訊息；拒絕 Promise 時顯示可手動選取的網址。點擊「再測一次」後回到開場且舊答案清空。

- [ ] **Step 2: 執行測試確認失敗**

Run: `npm test -- src/components/ResultScreen.test.tsx src/App.test.tsx`

Expected: FAIL，因結果元件尚不存在。

- [ ] **Step 3: 實作結果與複製 fallback**

```ts
async function copyLink() {
  const url = window.location.href.split('#')[0];
  try {
    await navigator.clipboard.writeText(url);
    setCopyState('copied');
  } catch {
    setManualUrl(url);
    setCopyState('manual');
  }
}
```

Restart 必須一次重設 `stage`、`answers`、`resultKind` 與所有 attempt state。

- [ ] **Step 4: 驗證結果流程**

Run:

```powershell
npm test -- src/components/ResultScreen.test.tsx src/App.test.tsx
npm test
```

Expected: 結果、複製 fallback、重新測驗與全套測試 PASS。

- [ ] **Step 5: 建立人工檢查點**

逐一以五種 result fixture 開啟結果元件，確認每種標題、traits 與 roast 都不溢出，不執行 commit。

---

### Task 7: 原創狐狸圖像與完整視覺系統

**Files:**
- Create: `src/assets/fox-hero.png`
- Create: `src/assets/fox-results.png`
- Create: `src/styles.css`
- Modify: `src/main.tsx`
- Modify: `src/domain/quizData.ts`
- Modify: `src/components/*.tsx`

**Interfaces:**
- Consumes: `FoxResult.imagePosition` 對應結果合照中的角色位置。
- Produces: `--cream`、`--fox-orange`、`--ink`、`--acid`、`--berry` 等 CSS tokens。

- [ ] **Step 1: 以 imagegen 產生原創狐狸角色圖**

每張圖使用相同基礎規格，分開呼叫以確保角色清楚：

```text
Use case: illustration-story
Asset type: mobile web character sticker
Primary request: 原創可愛狐狸角色，全身，粗線條貼紙插畫，具有鮮明表情與略欠揍的幽默感
Style/medium: hand-drawn editorial sticker illustration, crisp ink outlines, subtle paper grain
Composition/framing: centered single character, generous transparent padding, readable at 240px
Color palette: fox orange, cream, dark espresso, one accent color
Constraints: genuinely transparent background; no text; no logo; no watermark; consistent character proportions across the set
Avoid: gradients, 3D render, photorealism, copyrighted character design
```

採用兩張合格素材：抱著手機露出神秘笑容的開場狐狸，以及五隻等距站立的角色合照（戴睡帽抱枕、戴耳機拿掌機、抱著無品牌三角玉米片、拿兩支手機熱情揮手、背小包拿迷你指南針）。合照角色順序固定，用 CSS 位移聚焦目前結果。奔跑狐狸輸出未符合透明背景要求，因此不採用且不重生；假分析階段重用開場狐狸做位移動畫。

- [ ] **Step 2: 檢查並移入專案**

逐張確認透明背景、無文字、無商標、主體完整後，複製到 `src/assets/` 的固定檔名。若需重生，只針對單張問題調整 prompt。

- [ ] **Step 3: 實作設計 tokens 與排版**

```css
:root {
  --cream: #fff4d7;
  --fox-orange: #f56d31;
  --ink: #281c18;
  --acid: #d8ef63;
  --berry: #c83f5a;
  --paper: #fffaf0;
  font-family: "Arial Rounded MT Bold", "Noto Sans TC", system-ui, sans-serif;
  color: var(--ink);
  background: var(--cream);
}
```

主容器使用 `min-height: 100dvh`、四側 safe-area padding；標題使用 clamp 但不超過兩行；選項與主要按鈕保持 52px 以上高度。背景以 CSS 點陣、手繪線條與色塊營造層次，不新增無意義卡片容器。

- [ ] **Step 4: 實作動效與減少動態效果**

只保留角色呼吸、題目切換、按鈕逃跑、進度條與結果揭露五種動效；所有動畫在 `prefers-reduced-motion: reduce` 下縮短至 1ms 或停用位移。

- [ ] **Step 5: 驗證圖片與 CSS**

Run:

```powershell
npm test
npm run build
```

Expected: 所有採用資產被 Vite 正確打包，測試與 build PASS；`dist/assets` 含兩張圖片。

- [ ] **Step 6: 建立人工檢查點**

在 390 x 844、393 x 852 與 430 x 932 檢視每個 stage，確認無水平捲動、內容不被安全區遮擋、文字與插畫層級清楚，不執行 commit。

---

### Task 8: 完整驗證、瀏覽器 QA 與交付

**Files:**
- Create: `README.md`
- Create or update: `.openai/hosting.json`（僅在 Sites 註冊或部署流程需要時）

**Interfaces:**
- Produces: 可重現的本機啟動說明、通過的靜態 build、可分享的部署網址。

- [ ] **Step 1: 撰寫本機說明**

README 必須包含：`npm install`、`npm run dev`、`npm test`、`npm run build`，以及測驗不收集資料、重新整理會重置的說明。

- [ ] **Step 2: 執行完整自動驗證**

Run:

```powershell
npm test
npm run build
```

Expected: 退出碼 0；無 failing tests；`dist/` 生成。

- [ ] **Step 3: 啟動本機預覽**

Run: `npm run dev`

Expected: Vite 提供可連線的 localhost URL，主控台無錯誤。

- [ ] **Step 4: iPhone 尺寸逐段 QA**

在 390 x 844 與 393 x 852 依序檢查：開場、五題、七次逃跑、第八次命中、99% 假分析、第一次長按失敗、第二次成功、結果、複製、重新測驗。確認不會誤捲動、縮放、選字、越界或被 browser chrome 遮擋。

- [ ] **Step 5: 無障礙 QA**

以鍵盤完成全流程；切換減少動態效果；確認 progressbar、heading、button accessible names、焦點可見與文字對比。

- [ ] **Step 6: 修正 QA 發現的問題並重新驗證**

每項修正後重跑受影響測試，最後再跑 `npm test` 與 `npm run build`；不得以關閉測試或移除無障礙屬性迴避失敗。

- [ ] **Step 7: 部署與交付**

依 Sites hosting 流程建立此新站的私有部署，保存 `.openai/hosting.json`，再以實際部署 URL 重跑手機流程。若部署需要額外帳號連線或權限，停在已通過本機 build 的狀態並向使用者說明唯一缺口。

- [ ] **Step 8: 最終報告**

列出專案路徑、預覽或部署網址、測試數量、build 結果、原創圖像檔名與任何瀏覽器差異。未經使用者授權不執行 commit 或 push。
