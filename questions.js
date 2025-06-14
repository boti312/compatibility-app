/**
 * 質問と選択肢の定義
 */
const QUESTIONS = [
  {
    id: 1,
    question: '業務に取り組むとき、あなたはどちらを重視しますか？',
    optionA: '詳細なデータと情報に基づいて判断する',
    optionB: '人の感情や人間関係を考慮して判断する'
  },
  {
    id: 2,
    question: '新しいプロジェクトでは、どちらの役割を担うことが多いですか？',
    optionA: '計画を立てて指示を出す',
    optionB: '新しいアイデアを提案する'
  },
  {
    id: 3,
    question: '困難な状況に直面したとき、あなたはどうする傾向がありますか？',
    optionA: '周囲の意見を聞き、調和を図る',
    optionB: '主導権を握り、解決策を見つける'
  },
  {
    id: 4,
    question: '仕事の進め方として、どちらが自分らしいですか？',
    optionA: '柔軟に対応し、状況に応じて変化する',
    optionB: '計画に沿って着実に進める'
  },
  {
    id: 5,
    question: '会議では、どのような役割を果たすことが多いですか？',
    optionA: '議論をリードし、決断を下す',
    optionB: '新たな視点や可能性を提案する'
  },
  {
    id: 6,
    question: '仕事の成果として、どちらをより重視しますか？',
    optionA: '正確さと完成度',
    optionB: '人間関係の構築と維持'
  }
];

/**
 * 質問と回答のオブジェクトを返す
 * @param {Number} id - 質問ID
 * @returns {Object} 質問オブジェクト
 */
function getQuestion(id) {
  return QUESTIONS.find(q => q.id === id) || null;
} 