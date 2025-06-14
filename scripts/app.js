/**
 * メインアプリケーションのコード
 */
document.addEventListener('DOMContentLoaded', function() {
  // 初期表示は開始画面
  showScreen('start-screen');
  
  // 初期質問のセットアップ
  setupFirstQuestion();
  
  // イベントリスナー設定
  setupEventListeners();
  
  // スワイプとタップの初期化
  initSwipe();
  initClickSelection();
});

/**
 * 最初の質問をセットアップ
 */
function setupFirstQuestion() {
  const questionData = getQuestion(1);
  if (questionData) {
    document.getElementById('question-title').textContent = `質問 ${questionData.id}`;
    document.getElementById('question-content').textContent = questionData.question;
    document.getElementById('option-a-text').textContent = questionData.optionA;
    document.getElementById('option-b-text').textContent = questionData.optionB;
    
    // ボタンのテキストも更新
    document.getElementById('select-a-btn').textContent = questionData.optionA;
    document.getElementById('select-b-btn').textContent = questionData.optionB;
  }
}

/**
 * イベントリスナーをセットアップ
 */
function setupEventListeners() {
  // スタートボタン
  document.getElementById('start-btn').addEventListener('click', function() {
    hideScreen('start-screen');
    showScreen('question-screen');
  });
  
  // 再スタートボタン
  document.getElementById('restart-btn').addEventListener('click', function() {
    // 状態をリセット
    currentQuestion = 1;
    Object.keys(answers).forEach(key => delete answers[key]);
    
    // 最初の質問に戻す
    setupFirstQuestion();
    updateProgress();
    
    // 開始画面に戻る
    hideScreen('result-screen');
    showScreen('start-screen');
  });
}

/**
 * 特定の画面を表示
 * @param {String} screenId - 画面のID
 */
function showScreen(screenId) {
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
  }
}

/**
 * 特定の画面を非表示
 * @param {String} screenId - 画面のID
 */
function hideScreen(screenId) {
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.remove('active');
  }
}

/**
 * 結果画面を表示
 */
function showResult() {
  // ビジネスタイプを計算
  const resultType = calculateResultType(answers);
  let typeObject;
  
  // 対応するタイプ情報を取得
  Object.values(BUSINESS_TYPES).forEach(type => {
    if (type.id === resultType) {
      typeObject = type;
    }
  });
  
  if (!typeObject) {
    typeObject = BUSINESS_TYPES.ANALYST; // デフォルト
  }
  
  // 結果表示を更新
  document.getElementById('result-type-name').textContent = typeObject.name;
  document.getElementById('result-color').style.backgroundColor = typeObject.color;
  document.getElementById('gathering-spot').textContent = typeObject.gatheringSpot;
  
  // 画面を切り替え
  hideScreen('question-screen');
  showScreen('result-screen');
  
  // コンソールに詳細をログ (デバッグ用)
  console.log('診断結果:', typeObject);
  console.log('回答詳細:', answers);
}

/**
 * 画面方向変更時のレイアウト調整
 */
window.addEventListener('resize', function() {
  // 必要に応じてレイアウト調整処理を追加
}); 