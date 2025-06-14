/**
 * スワイプ機能の実装
 */
let hammerManager;
let currentQuestion = 1;
const answers = {}; // ユーザーの回答を保存するオブジェクト

/**
 * Hammer.jsを使ったスワイプ機能の初期化
 */
function initSwipe() {
  const swipeableElement = document.getElementById('question-container');
  if (!swipeableElement) return;
  
  const leftOverlay = document.getElementById('swipe-left-overlay');
  const rightOverlay = document.getElementById('swipe-right-overlay');
  
  hammerManager = new Hammer.Manager(swipeableElement);
  
  // パン（ドラッグ）検出の設定
  const pan = new Hammer.Pan({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 0
  });
  
  // スワイプ検出設定
  const swipe = new Hammer.Swipe({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 10,
    velocity: 0.3
  });
  
  // 認識器を追加
  hammerManager.add([pan]);
  hammerManager.add([swipe]);
  
  // スワイプが優先されるよう設定
  hammerManager.get('swipe').recognizeWith(hammerManager.get('pan'));
  
  // パンイベント（ドラッグ中）のリスナー
  hammerManager.on('panmove', function(e) {
    // 右にスワイプ中（選択肢B方向）
    if (e.deltaX > 20) {
      rightOverlay.classList.add('swipe-active');
      leftOverlay.classList.remove('swipe-active');
    } 
    // 左にスワイプ中（選択肢A方向）
    else if (e.deltaX < -20) {
      leftOverlay.classList.add('swipe-active');
      rightOverlay.classList.remove('swipe-active');
    } 
    // 中央付近
    else {
      leftOverlay.classList.remove('swipe-active');
      rightOverlay.classList.remove('swipe-active');
    }
  });
  
  // パン終了時のリスナー
  hammerManager.on('panend', function() {
    // オーバーレイを非表示
    leftOverlay.classList.remove('swipe-active');
    rightOverlay.classList.remove('swipe-active');
  });
  
  // スワイプイベントのリスナー
  hammerManager.on('swipeleft swiperight', function(e) {
    const questionData = getQuestion(currentQuestion);
    if (!questionData) return;
    
    // 選択を記録
    if (e.type === 'swipeleft') {
      handleAnswer('A');
      swipeableElement.classList.add('swipe-to-left');
      leftOverlay.classList.add('swipe-active');
    } else if (e.type === 'swiperight') {
      handleAnswer('B');
      swipeableElement.classList.add('swipe-to-right');
      rightOverlay.classList.add('swipe-active');
    }
    
    // アニメーション後に次の質問へ
    setTimeout(() => {
      swipeableElement.classList.remove('swipe-to-left', 'swipe-to-right');
      leftOverlay.classList.remove('swipe-active');
      rightOverlay.classList.remove('swipe-active');
      showNextQuestion();
      
      // 新しい質問表示のアニメーション
      if (e.type === 'swipeleft') {
        swipeableElement.classList.add('swipe-from-right');
      } else {
        swipeableElement.classList.add('swipe-from-left');
      }
      
      // アニメーションクラスをクリア
      setTimeout(() => {
        swipeableElement.classList.remove('swipe-from-right', 'swipe-from-left');
      }, 300);
    }, 300);
  });
  
  // 選択肢のタップイベントも設定
  initOptionTaps();
}

/**
 * 選択肢のタップイベントを初期化
 */
function initOptionTaps() {
  // 選択肢Aのタップイベント
  const optionA = document.querySelector('.option-a');
  if (optionA) {
    optionA.addEventListener('click', function() {
      this.classList.add('option-selected');
      setTimeout(() => this.classList.remove('option-selected'), 300);
      
      // 選択を記録
      handleAnswer('A');
      
      // アニメーション後に次の質問へ
      setTimeout(() => {
        showNextQuestion();
      }, 400);
    });
  }
  
  // 選択肢Bのタップイベント
  const optionB = document.querySelector('.option-b');
  if (optionB) {
    optionB.addEventListener('click', function() {
      this.classList.add('option-selected');
      setTimeout(() => this.classList.remove('option-selected'), 300);
      
      // 選択を記録
      handleAnswer('B');
      
      // アニメーション後に次の質問へ
      setTimeout(() => {
        showNextQuestion();
      }, 400);
    });
  }
}

/**
 * 回答を処理する
 * @param {String} answer - 'A'か'B'の回答
 */
function handleAnswer(answer) {
  answers[currentQuestion] = answer;
  updateProgress();
}

/**
 * 次の質問を表示、または結果画面へ遷移
 */
function showNextQuestion() {
  currentQuestion++;
  
  if (currentQuestion > QUESTIONS.length) {
    // 全質問回答済みなら結果画面へ
    showResult();
    return;
  }
  
  // 次の質問を表示
  const questionData = getQuestion(currentQuestion);
  if (questionData) {
    document.getElementById('question-title').textContent = `質問 ${questionData.id}`;
    document.getElementById('question-content').textContent = questionData.question;
    document.getElementById('option-a-text').textContent = questionData.optionA;
    document.getElementById('option-b-text').textContent = questionData.optionB;
    
    updateProgress();
  }
}

/**
 * プログレスバーを更新
 */
function updateProgress() {
  const progressBar = document.querySelector('.progress-inner');
  const progressText = document.querySelector('.progress-text');
  const progressPercentage = (currentQuestion) / QUESTIONS.length * 100;
  
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${currentQuestion}/${QUESTIONS.length}`;
} 