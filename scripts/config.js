/**
 * 相性診断アプリの設定ファイル
 * このファイルを編集することで、アプリの表示内容を変更できます
 */

// アプリ全体の設定
const APP_CONFIG = {
  // タイトル設定
  title: "ビジネスタイプ診断",
  subtitle: "2025年2Qキックオフ",
  startButtonText: "診断スタート",
  
  // 説明文
  description: "あなたのビジネスタイプを診断します",
  
  // スワイプヒントの文言
  swipeHint: "カードを左右にスワイプして選択",
  
  // 選択肢のラベル
  choiceALabel: "選択 A",
  choiceBLabel: "選択 B",
  
  // 結果画面の設定
  resultTitle: "あなたのタイプは",
  resultInstruction: "ジョークアプリなので、診断結果は参考まで",
  resultGatheringTemplate: "同じ色のチームは{spot}に集合してください", // {spot}が集合場所に置き換えられます
  restartButtonText: "もう一度診断する"
};

// ビジネスタイプの定義
const BUSINESS_TYPES = {
  ANALYST: {
    id: 'analyst',
    name: 'アナリスト型',
    color: '#E53935', // 赤色
    description: '論理的で分析力が高く、データに基づいた意思決定を好みます。',
    strengths: ['データ分析', '論理的思考', '問題解決能力'],
    gatheringSpot: '左前方'
  },
  LEADER: {
    id: 'leader',
    name: 'リーダー型',
    color: '#1E88E5', // 青色
    description: '目標達成に向けて組織をまとめ、周囲を巻き込むのが得意です。',
    strengths: ['目標設定', '交渉力', 'プロジェクト管理'],
    gatheringSpot: '左後方'
  },
  SUPPORTER: {
    id: 'supporter',
    name: 'サポーター型',
    color: '#43A047', // 緑色
    description: '協調性があり、チームの調和を大切にします。人間関係構築に優れています。',
    strengths: ['コミュニケーション', '共感力', 'チームワーク'],
    gatheringSpot: '右前方'
  },
  INNOVATOR: {
    id: 'innovator',
    name: 'イノベーター型',
    color: '#FFB300', // オレンジ色
    description: '創造的で新しいアイデアを生み出すのが得意です。変化を恐れない柔軟性があります。',
    strengths: ['創造性', '柔軟性', '発想力'],
    gatheringSpot: '右後方'
  }
};

// 質問と選択肢の定義
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

// スコア計算用のポイント配分
const TYPE_SCORE_MAP = {
  A1: { analyst: 2, leader: 0, supporter: 0, innovator: 1 },
  B1: { analyst: 0, leader: 1, supporter: 2, innovator: 0 },
  A2: { analyst: 1, leader: 2, supporter: 0, innovator: 0 },
  B2: { analyst: 0, leader: 0, supporter: 1, innovator: 2 },
  A3: { analyst: 1, leader: 0, supporter: 2, innovator: 0 },
  B3: { analyst: 0, leader: 2, supporter: 0, innovator: 1 },
  A4: { analyst: 0, leader: 0, supporter: 1, innovator: 2 },
  B4: { analyst: 2, leader: 1, supporter: 0, innovator: 0 },
  A5: { analyst: 0, leader: 2, supporter: 1, innovator: 0 },
  B5: { analyst: 1, leader: 0, supporter: 0, innovator: 2 },
  A6: { analyst: 2, leader: 1, supporter: 0, innovator: 0 },
  B6: { analyst: 0, leader: 0, supporter: 2, innovator: 1 }
}; 
