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
  
  hammerManager = new Hammer.Manager(swipeableElement);
  
  // スワイプ検出設定
  const swipe = new Hammer.Swipe({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 10,
    velocity: 0.3
  });
  
  hammerManager.add(swipe);
  
  // スワイプイベントのリスナー
  hammerManager.on('swipeleft swiperight', function(e) {
    const questionData = getQuestion(currentQuestion);
    if (!questionData) return;
    
    // 選択を記録
    if (e.type === 'swipeleft') {
      handleAnswer('A');
      swipeableElement.classList.add('swipe-to-left');
    } else if (e.type === 'swiperight') {
      handleAnswer('B');
      swipeableElement.classList.add('swipe-to-right');
    }
    
    // アニメーション後に次の質問へ
    setTimeout(() => {
      swipeableElement.classList.remove('swipe-to-left', 'swipe-to-right');
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
    
    // ボタンのテキストも更新
    document.getElementById('select-a-btn').textContent = questionData.optionA;
    document.getElementById('select-b-btn').textContent = questionData.optionB;
    
    updateProgress();
  }
}

/**
 * プログレスバーを更新
 */
function updateProgress() {
  const progressBar = document.querySelector('.progress-inner');
  const progressText = document.querySelector('.progress-text');
  const progressPercentage = (currentQuestion - 1) / QUESTIONS.length * 100;
  
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${currentQuestion}/${QUESTIONS.length}`;
}

/**
 * クリックでの選択を処理
 */
function initClickSelection() {
  document.getElementById('select-a-btn').addEventListener('click', function() {
    this.classList.add('btn-clicked');
    setTimeout(() => this.classList.remove('btn-clicked'), 300);
    handleAnswer('A');
    showNextQuestion();
  });
  
  document.getElementById('select-b-btn').addEventListener('click', function() {
    this.classList.add('btn-clicked');
    setTimeout(() => this.classList.remove('btn-clicked'), 300);
    handleAnswer('B');
    showNextQuestion();
  });
} 