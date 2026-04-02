export type Lang = 'ko' | 'ja'

export const content: Record<Lang, {
  nav: { find: string; register: string; about: string; community: string }
  badge: string
  hero: { title: string[]; sub: string; desc: string; cta1: string; cta2: string }
  stats: { count: string; countLabel: string; satisfaction: string; satisfactionLabel: string; region: string; regionLabel: string; response: string; responseLabel: string }
  how: { label: string; title: string; steps: { icon: string; title: string; desc: string }[] }
  match: { label: string; title: string; location: string; filters: string[] }
  cross: { label: string; title: string; desc: string; scenarios: { flag: string; title: string; desc: string }[] }
  community: { label: string; title: string; desc: string; points: string[] }
  safety: { label: string; title: string; items: { title: string; desc: string }[] }
  mission: { label: string; title: string; ko: string; ja: string }
  footer: { tagline: string }
}> = {
  ko: {
    nav: { find: '돌봄사 찾기', register: '등록하기', about: '소개', community: '케어포인트' },
    badge: '🏆 2026 글로벌 피우다프로젝트 출품작',
    hero: {
      title: ['신뢰할 수 있는 돌봄,', '가장 가까운 곳에서'],
      sub: '信頼できるケア、最も近い場所で',
      desc: '노인 돌봄 제공자와 가족을 연결하는 한일 공동 매칭 플랫폼.\nAI 기반 매칭으로 최적의 돌봄 파트너를 찾고,\n케어 포인트로 커리어와 미래를 함께 쌓아가세요.',
      cta1: '돌봄 파트너 찾기',
      cta2: '돌봄사로 등록하기',
    },
    stats: { count: '1,240+', countLabel: '등록 돌봄사', satisfaction: '98%', satisfactionLabel: '가족 만족도', region: '한·일', regionLabel: '서비스 지역', response: '24/7', responseLabel: '긴급 대응' },
    how: {
      label: '이용 방법',
      title: '4단계로 완성되는 돌봄 매칭',
      steps: [
        { icon: '📋', title: '니즈 등록', desc: '어르신의 상태, 필요 서비스, 원하는 시간을 입력하세요.' },
        { icon: '🤖', title: 'AI 매칭 분석', desc: '위치·전문성·리뷰·언어 능력을 고려해 최적 돌봄사를 추천합니다.' },
        { icon: '🤝', title: '연결 및 시작', desc: '프로필 확인 후 채팅 상담을 거쳐 안전하게 돌봄을 시작하세요.' },
        { icon: '⭐', title: '포인트 적립', desc: '활동마다 케어 포인트가 쌓이고 커리어 혜택으로 이어집니다.' },
      ],
    },
    match: {
      label: '실시간 매칭',
      title: '내 주변 돌봄 파트너',
      location: '📍 서울 강남구 · 오사카 나니와구',
      filters: ['전체', '치매 전문', '야간 가능', '일본어 가능'],
    },
    cross: {
      label: '한일 크로스컬처',
      title: '돌봄으로 연결되는\n한일 청년 교류',
      desc: '일본어·한국어를 배우고 싶은 청년에게 가장 실용적인 언어 학습 환경. 검증된 돌봄 활동을 통해 자연스럽게 현지 문화와 언어를 익히고, 글로벌 커리어의 발판을 만드세요.',
      scenarios: [
        { flag: '🇰🇷→🇯🇵', title: '한국 청년 × 일본 노인', desc: '오사카에서 일본어로 돌봄 활동 → 언어 성장 + 포인트 + 현지 경험' },
        { flag: '🇯🇵→🇰🇷', title: '일본 청년 × 한국 노인', desc: '서울에서 한국어로 돌봄 활동 → K-culture 체험 + 한국 취업 네트워크' },
        { flag: '🤝', title: '한일 협력 돌봄', desc: '두 나라 청년이 같은 현장에서 협력 → 자연스러운 언어 교환 + 문화 이해' },
        { flag: '🌐', title: '글로벌 커뮤니티', desc: '평판 쌓인 양국 청년들의 프리미엄 신뢰 네트워크 형성' },
      ],
    },
    community: {
      label: '케어 포인트 시스템',
      title: '돌봄 활동이\n커리어가 됩니다',
      desc: '단순 봉사가 아닙니다. 케어 포인트는 취업·입시·생활 혜택으로 직접 연결되는 실질적인 자산입니다.',
      points: [
        '대기업·중견기업 채용 시 케어포인트 우대',
        '봉사 시간 자동 인증서 발급 (생기부·포트폴리오)',
        '대학·대학원 입학 가산점 연동',
        '파트너사 쿠폰·할인·한일 여행 지원',
        'CSR 실적 자동화 (기업 ESG 지표 연동)',
        '한일 공동 봉사 인증서 발급',
      ],
    },
    safety: {
      label: '안전 시스템',
      title: '양방향 신뢰 설계',
      items: [
        { title: '닉네임 공개', desc: '서비스 내 본명 비공개, 개인정보 완전 보호' },
        { title: '신원 검증', desc: '신분증 인증 + 범죄경력조회 API 연동' },
        { title: '노인 상호 평가', desc: '돌봄사도 노인을 평가, 문제 행동 누적 기록' },
        { title: 'AI 분쟁 감지', desc: '이상 신호 자동 감지 + 운영자 즉시 개입' },
      ],
    },
    mission: {
      label: '한 · 일 공동',
      title: '두 나라, 하나의 돌봄 철학',
      ko: '케어매치는 고령화 사회에서 발생하는 돌봄 공백을 해소하기 위해 만들어졌습니다. 신뢰할 수 있는 돌봄 파트너를 가족처럼 연결하고, 어르신이 익숙한 환경에서 행복하게 생활할 수 있도록 지원합니다.',
      ja: 'ケアマッチは、高齢化社会における介護の空白を埋めるために作られました。信頼できる介護パートナーを家族のようにつなぎ、ご高齢の方が慣れ親しんだ環境で幸せに暮らせるよう支援します。',
    },
    footer: { tagline: '2026 글로벌 피우다프로젝트 출품 · 수도권' },
  },

  ja: {
    nav: { find: '介護士を探す', register: '登録する', about: '概要', community: 'ポイント' },
    badge: '🏆 2026 グローバル ピウダプロジェクト 出品作',
    hero: {
      title: ['信頼できるケア、', '最も近い場所で'],
      sub: '신뢰할 수 있는 돌봄, 가장 가까운 곳에서',
      desc: '高齢者の介護提供者とご家族をつなぐ日韓共同マッチングプラットフォーム。\nAIマッチングで最適な介護パートナーを見つけ、\nケアポイントでキャリアと未来を積み上げましょう。',
      cta1: '介護パートナーを探す',
      cta2: '介護士として登録',
    },
    stats: { count: '1,240+', countLabel: '登録介護士', satisfaction: '98%', satisfactionLabel: 'ご家族満足度', region: '日·韓', regionLabel: 'サービス地域', response: '24/7', responseLabel: '緊急対応' },
    how: {
      label: 'ご利用方法',
      title: '4ステップで完成する介護マッチング',
      steps: [
        { icon: '📋', title: 'ニーズ登録', desc: 'ご高齢の方の状態、必要なサービス、ご希望の時間を入力してください。' },
        { icon: '🤖', title: 'AIマッチング', desc: '場所・専門性・レビュー・言語能力を考慮して最適な介護士を推薦します。' },
        { icon: '🤝', title: '接続 & 開始', desc: 'プロフィール確認後、チャット相談を経て安心して介護を開始してください。' },
        { icon: '⭐', title: 'ポイント積立', desc: '活動ごとにケアポイントが貯まり、キャリア特典につながります。' },
      ],
    },
    match: {
      label: 'リアルタイムマッチング',
      title: '近くの介護パートナー',
      location: '📍 ソウル 江南区 · 大阪市 浪速区',
      filters: ['すべて', '認知症専門', '夜間可', '韓国語可'],
    },
    cross: {
      label: '日韓クロスカルチャー',
      title: '介護でつながる\n日韓青年交流',
      desc: '韓国語・日本語を学びたい若者に、最も実用的な語学学習環境を提供します。認証済みの介護活動を通じて自然に現地の文化と言語を習得し、グローバルキャリアの足がかりを作りましょう。',
      scenarios: [
        { flag: '🇰🇷→🇯🇵', title: '韓国の若者 × 日本の高齢者', desc: '大阪で日本語で介護活動 → 語学成長 + ポイント + 現地体験' },
        { flag: '🇯🇵→🇰🇷', title: '日本の若者 × 韓国の高齢者', desc: 'ソウルで韓国語で介護活動 → K-culture体験 + 韓国就職ネットワーク' },
        { flag: '🤝', title: '日韓協力介護', desc: '両国の若者が同じ現場で協力 → 自然な言語交換 + 文化理解' },
        { flag: '🌐', title: 'グローバルコミュニティ', desc: '実績を積んだ両国の若者によるプレミアム信頼ネットワーク' },
      ],
    },
    community: {
      label: 'ケアポイントシステム',
      title: '介護活動が\nキャリアになります',
      desc: '単なるボランティアではありません。ケアポイントは就職・入試・生活特典に直接つながる実質的な資産です。',
      points: [
        '大企業・中堅企業採用時のケアポイント優遇',
        'ボランティア時間の自動証明書発行（就活ポートフォリオ）',
        '大学・大学院入学加点連動',
        'パートナー企業クーポン・日韓旅行支援',
        'CSR実績の自動化（企業ESG指標連動）',
        '日韓共同ボランティア認証書発行',
      ],
    },
    safety: {
      label: '安全システム',
      title: '双方向信頼設計',
      items: [
        { title: 'ニックネーム公開', desc: 'サービス内で本名非公開、個人情報完全保護' },
        { title: '本人確認', desc: '身分証認証 + 犯罪歴照会API連動' },
        { title: '高齢者相互評価', desc: '介護士も高齢者を評価、問題行動の累積記録' },
        { title: 'AI紛争検知', desc: '異常シグナル自動検知 + 運営者即時介入' },
      ],
    },
    mission: {
      label: '日 · 韓 共同',
      title: '二つの国、一つの介護哲学',
      ko: '케어매치는 고령화 사회에서 발생하는 돌봄 공백을 해소하기 위해 만들어졌습니다. 신뢰할 수 있는 돌봄 파트너를 가족처럼 연결하고, 어르신이 익숙한 환경에서 행복하게 생활할 수 있도록 지원합니다.',
      ja: 'ケアマッチは、高齢化社会における介護の空白を埋めるために作られました。信頼できる介護パートナーを家族のようにつなぎ、ご高齢の方が慣れ親しんだ環境で幸せに暮らせるよう支援します。',
    },
    footer: { tagline: '2026 グローバル ピウダプロジェクト 出品 · 首都圏' },
  },
}

export const carers = [
  { id: 1, emoji: '👩‍⚕️', color: '#e9456018',
    name: { ko: '김수연 · 경력 8년', ja: '金秀妍 · 経歴8年' },
    sub: { ko: '서울 강남구 · 치매 전문 · 한/일 이중언어', ja: 'ソウル江南区 · 認知症専門 · 日韓バイリンガル' },
    tags: ['치매케어 / 認知症', '야간가능 / 夜間可', '日本語OK'],
    score: 98, filters: ['all', 'dementia', 'night', 'bilingual'] },
  { id: 2, emoji: '👨‍⚕️', color: '#f5a62318',
    name: { ko: '田中 健太 · 경력 5년', ja: '田中 健太 · 経歴5年' },
    sub: { ko: '오사카 나니와구 · 치매 전문 · 한국어 가능', ja: '大阪市 浪速区 · 認知症専門 · 韓国語可' },
    tags: ['認知症ケア / 치매', '夜間可 / 야간가능', '한국어OK'],
    score: 94, filters: ['all', 'dementia', 'night', 'bilingual'] },
  { id: 3, emoji: '👩‍⚕️', color: '#1d9e7518',
    name: { ko: '박지현 · 경력 12년', ja: 'パク・ジヒョン · 経歴12年' },
    sub: { ko: '서울 송파구 · 재활 전문 · 주간 전담', ja: 'ソウル松坡区 · リハビリ専門 · 日中専任' },
    tags: ['재활케어 / リハビリ', '방문목욕 / 訪問入浴', '주간전담 / 日中専任'],
    score: 91, filters: ['all'] },
]
