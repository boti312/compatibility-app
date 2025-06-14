/**
 * ビジネスタイプの定義
 */
const BUSINESS_TYPES = {
  ANALYST: {
    id: 'analyst',
    name: 'アナリスト型',
    color: '#E53935', // 赤色
    description: '論理的で分析力が高く、データに基づいた意思決定を好みます。',
    strengths: ['データ分析', '論理的思考', '問題解決能力'],
    gatheringSpot: '会議室A'
  },
  LEADER: {
    id: 'leader',
    name: 'リーダー型',
    color: '#1E88E5', // 青色
    description: '目標達成に向けて組織をまとめ、周囲を巻き込むのが得意です。',
    strengths: ['目標設定', '交渉力', 'プロジェクト管理'],
    gatheringSpot: '会議室B'
  },
  SUPPORTER: {
    id: 'supporter',
    name: 'サポーター型',
    color: '#43A047', // 緑色
    description: '協調性があり、チームの調和を大切にします。人間関係構築に優れています。',
    strengths: ['コミュニケーション', '共感力', 'チームワーク'],
    gatheringSpot: '休憩スペース'
  },
  INNOVATOR: {
    id: 'innovator',
    name: 'イノベーター型',
    color: '#FFB300', // オレンジ色
    description: '創造的で新しいアイデアを生み出すのが得意です。変化を恐れない柔軟性があります。',
    strengths: ['創造性', '柔軟性', '発想力'],
    gatheringSpot: 'オープンスペース'
  }
};

/**
 * スコア計算用のポイント配分
 */
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