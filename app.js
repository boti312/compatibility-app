/**
 * メインアプリケーションのコード
 */
document.addEventListener('DOMContentLoaded', function() {
  // 設定ファイルからテキストを適用
  applyConfigText();
  
  // 初期表示は開始画面
  showScreen('start-screen');
  
  // 初期質問のセットアップ
  setupFirstQuestion();
  
  // イベントリスナー設定
  setupEventListeners();
  
  // スワイプ機能の初期化
  initSwipe();
});

/**
 * 設定ファイルからテキストを適用する
 */
function applyConfigText() {
  // スタート画面
  document.getElementById('app-title').textContent = APP_CONFIG.title;
  document.getElementById('app-subtitle').textContent = APP_CONFIG.subtitle;
  document.getElementById('app-description').textContent = APP_CONFIG.description;
  document.getElementById('start-btn-text').textContent = APP_CONFIG.startButtonText;
  
  // スワイプヒント
  document.getElementById('swipe-hint-text').innerHTML = '<i class="fas fa-hand-point-right"></i> ' + APP_CONFIG.swipeHint;
  
  // 選択肢ラベル
  document.getElementById('choice-a-label').textContent = APP_CONFIG.choiceALabel;
  document.getElementById('choice-b-label').textContent = APP_CONFIG.choiceBLabel;
  
  // 結果画面
  document.getElementById('result-title').textContent = APP_CONFIG.resultTitle;
  document.getElementById('result-instruction').textContent = APP_CONFIG.resultInstruction;
  document.getElementById('restart-btn-text').textContent = APP_CONFIG.restartButtonText;
}

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
  }
}

/**
 * 質問と回答のオブジェクトを返す
 * @param {Number} id - 質問ID
 * @returns {Object} 質問オブジェクト
 */
function getQuestion(id) {
  return QUESTIONS.find(q => q.id === id) || null;
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
 * 診断結果の計算
 * @param {Object} answers - 回答オブジェクト {1: 'A', 2: 'B', ...}
 * @returns {String} 最も点数の高いタイプのID
 */
function calculateResultType(answers) {
  // スコア初期化
  const scores = {
    analyst: 0,
    leader: 0,
    supporter: 0,
    innovator: 0
  };
  
  // 各回答に応じてスコアを加算
  Object.entries(answers).forEach(([questionNumber, answer]) => {
    const key = `${answer}${questionNumber}`;
    if (TYPE_SCORE_MAP[key]) {
      Object.entries(TYPE_SCORE_MAP[key]).forEach(([type, score]) => {
        scores[type] += score;
      });
    }
  });
  
  // 最大スコアのタイプを取得
  let maxScore = 0;
  let resultType = '';
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultType = type;
    }
  });
  
  return resultType;
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
  
  // 集合場所のテキストを設定
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