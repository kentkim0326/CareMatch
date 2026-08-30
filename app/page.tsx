'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Lang = 'ko' | 'ja';

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`${styles.root} ${lang === 'ja' ? styles.rootJa : ''}`}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Care<span>Match</span></a>
        <div className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="/match">{lang === 'ko' ? '돌봄사 찾기' : '介護士を探す'}</a>
          <a href="/register">{lang === 'ko' ? '등록하기' : '登録する'}</a>
           <a href="/map">{lang === 'ko' ? '🗺️ 지도' : '🗺️ 地図'}</a>
          <a href="/points">{lang === 'ko' ? '케어포인트' : 'ケアポイント'}</a>
          <a href="/about">{lang === 'ko' ? '소개' : '紹介'}</a>
          <a href="/health" style={{color:'#14b8a6', fontWeight:500}}>
            {lang === 'ko' ? '케어헬스' : 'ケアヘルス'}
          </a>
        </div>
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button
              className={lang === 'ko' ? styles.langOn : styles.langOff}
              onClick={() => setLang('ko')}
            >한국어</button>
            <button
              className={lang === 'ja' ? styles.langOn : styles.langOff}
              onClick={() => setLang('ja')}
            >日本語</button>
          </div>
          <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>
            🏆 {lang === 'ko' ? '2026 글로벌 피우다프로젝트 출품작' : '2026 グローバルピウダプロジェクト出品作'}
          </div>
          <h1 className={styles.heroTitle}>
            {lang === 'ko' ? '신뢰할 수 있는 돌봄,' : '信頼できるケア、'}<br />
            {lang === 'ko' ? '가장 가까운 곳에서' : '最も近い場所で'}
            <span className={styles.heroSub}>
              {lang === 'ko' ? '信頼できるケア、最も近い場所で' : '신뢰할 수 있는 돌봄, 가장 가까운 곳에서'}
            </span>
          </h1>
          <p className={styles.heroDesc}>
            {lang === 'ko'
              ? '노인 돌봄 제공자와 가족을 연결하는 한일 공동 매칭 플랫폼.\nAI 기반 매칭으로 최적의 돌봄 파트너를 찾고,\n케어 포인트로 커리어와 미래를 함께 쌓아가세요.'
              : '高齢者介護プロバイダーと家族をつなぐ日韓共同マッチングプラットフォーム。\nAIマッチングで最適なケアパートナーを見つけ、\nケアポイントでキャリアと未来を一緒に築きましょう。'}
          </p>
          <div className={styles.heroCtaRow}>
            <a href="/match" style={{flex:1}}>
              <button className={styles.btnPrimary} style={{width:'100%'}}>
                {lang === 'ko' ? '돌봄 파트너 찾기' : '介護パートナーを探す'}
              </button>
            </a>
            <a href="/register" style={{flex:1}}>
              <button className={styles.btnOutline} style={{width:'100%'}}>
                {lang === 'ko' ? '돌봄사로 등록하기' : '介護士として登録する'}
              </button>
            </a>
          </div>
          <div className={styles.heroFlags}>
            <span>🇰🇷</span>
            <span className={styles.flagDivider}>↔</span>
            <span>🇯🇵</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.statsBar}>
        {[
          { val: '1,240+', label: lang === 'ko' ? '등록 돌봄사' : '登録介護士' },
          { val: '98%',    label: lang === 'ko' ? '가족 만족도' : 'ご家族満足度' },
          { val: lang === 'ko' ? '한·일' : '韓·日', label: lang === 'ko' ? '서비스 지역' : 'サービスエリア' },
          { val: '24/7',   label: lang === 'ko' ? '긴급 대응' : '緊急対応' },
        ].map(s => (
          <div key={s.label} className={styles.statItem}>
            <strong>{s.val}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      {/* 위 숫자는 달성한 실적이 아니라 서비스가 지향하는 목표다. */}
      <div style={{
        textAlign:'center', fontSize:'11.5px', color:'var(--muted)',
        padding:'8px 16px', lineHeight:1.6,
      }}>
        {lang === 'ko'
          ? '※ 위 숫자는 달성한 실적이 아니라 서비스가 지향하는 목표입니다.'
          : '※ 上記の数値は達成した実績ではなく、サービスが目指す目標です。'}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{lang === 'ko' ? '이용 방법' : 'ご利用方法'}</p>
          <h2 className={styles.sectionTitle}>
            {lang === 'ko' ? '4단계로 완성되는 돌봄 매칭' : '4ステップで完成する介護マッチング'}
          </h2>
          <div className={styles.stepsGrid}>
            {[
              { num:'01', icon:'📋', ko:'니즈 등록', ja:'ニーズ登録',
                koD:'어르신의 상태, 필요 서비스, 원하는 시간을 입력하세요.',
                jaD:'ご高齢の方の状態、必要なサービス、希望時間を入力してください。' },
              { num:'02', icon:'🤖', ko:'AI 매칭 분석', ja:'AIマッチング分析',
                koD:'위치·전문성·리뷰·언어 능력을 고려해 최적 돌봄사를 추천합니다.',
                jaD:'位置・専門性・レビュー・語学力を考慮して最適な介護士を推薦します。' },
              { num:'03', icon:'🤝', ko:'연결 및 시작', ja:'接続と開始',
                koD:'프로필 확인 후 채팅 상담을 거쳐 안전하게 돌봄을 시작하세요.',
                jaD:'プロフィール確認後、チャット相談を経て安全にケアを開始してください。' },
              { num:'04', icon:'⭐', ko:'포인트 적립', ja:'ポイント積立',
                koD:'활동마다 케어 포인트가 쌓이고 커리어 혜택으로 이어집니다.',
                jaD:'活動ごとにケアポイントが貯まり、キャリア特典につながります。' },
            ].map(s => (
              <div key={s.num} className={styles.stepCard}>
                <span className={styles.stepNum}>{s.num}</span>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h3>{lang === 'ko' ? s.ko : s.ja}</h3>
                <p>{lang === 'ko' ? s.koD : s.jaD}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI 케어헬스 배너 ── */}
      <section className={`${styles.section} ${styles.sectionTeal}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>NEW</p>
          <h2 className={styles.sectionTitleWhite}>
            {lang === 'ko' ? 'AI 케어헬스' : 'AIケアヘルス'}
          </h2>
          <p className={styles.crossDesc}>
            {lang === 'ko'
              ? '증상을 입력하면 AI가 경중을 판단하고 돌봄사에게 자동으로 알림을 보냅니다. 지방 의료 공백 문제를 해결하는 CareMatch의 새 기능.'
              : '症状を入力するとAIが重症度を判断し、介護士に自動通知します。地方の医療空白問題を解決するCareMatchの新機能。'}
          </p>
          <a href="/health">
            <button className={styles.btnPrimary} style={{maxWidth:'200px'}}>
              {lang === 'ko' ? '지금 체크하기 →' : '今すぐチェック →'}
            </button>
          </a>
        </div>
      </section>

      {/* ── CROSS CULTURE ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{lang === 'ko' ? '한일 크로스컬처' : '日韓クロスカルチャー'}</p>
          <h2 className={styles.sectionTitle}>
            {lang === 'ko' ? '돌봄으로 연결되는 한일 청년 교류' : '介護でつながる日韓青年交流'}
          </h2>
          <p className={styles.crossDesc}>
            {lang === 'ko'
              ? '일본어·한국어를 배우고 싶은 청년에게 가장 실용적인 언어 학습 환경. 검증된 돌봄 활동을 통해 자연스럽게 현지 문화와 언어를 익히고, 글로벌 커리어의 발판을 만드세요.'
              : '日本語・韓国語を学びたい若者に最も実用的な語学学習環境。認定された介護活動を通じて自然に現地の文化と言語を身につけ、グローバルキャリアの足掛かりを作りましょう。'}
          </p>
          <div className={styles.scenarioGrid}>
            {[
              { flag:'🇰🇷→🇯🇵', ko:'한국 청년 × 일본 노인', ja:'韓国の若者 × 日本の高齢者',
                koD:'오사카에서 일본어로 돌봄 활동 → 언어 성장 + 포인트 + 현지 경험',
                jaD:'大阪で日本語で介護活動 → 言語成長 + ポイント + 現地経験' },
              { flag:'🇯🇵→🇰🇷', ko:'일본 청년 × 한국 노인', ja:'日本の若者 × 韓国の高齢者',
                koD:'서울에서 한국어로 돌봄 활동 → K-culture 체험 + 한국 취업 네트워크',
                jaD:'ソウルで韓国語で介護活動 → K-culture体験 + 韓国就職ネットワーク' },
              { flag:'🤝', ko:'한일 협력 돌봄', ja:'日韓協力介護',
                koD:'두 나라 청년이 같은 현장에서 협력 → 자연스러운 언어 교환 + 문화 이해',
                jaD:'両国の若者が同じ現場で協力 → 自然な言語交換 + 文化理解' },
              { flag:'🌐', ko:'글로벌 커뮤니티', ja:'グローバルコミュニティ',
                koD:'평판 쌓인 양국 청년들의 프리미엄 신뢰 네트워크 형성',
                jaD:'実績のある両国の若者のプレミアム信頼ネットワーク形成' },
            ].map(c => (
              <div key={c.flag} className={styles.scenarioCard}>
                <div className={styles.scenarioFlag}>{c.flag}</div>
                <h3>{lang === 'ko' ? c.ko : c.ja}</h3>
                <p>{lang === 'ko' ? c.koD : c.jaD}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARE POINTS ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{lang === 'ko' ? '케어 포인트 시스템' : 'ケアポイントシステム'}</p>
          <h2 className={styles.sectionTitle}>
            {lang === 'ko' ? '돌봄 활동이 커리어가 됩니다' : '介護活動がキャリアになります'}
          </h2>
          <p className={styles.communityDesc}>
            {lang === 'ko'
              ? '단순 봉사가 아닙니다. 케어 포인트는 취업·입시·생활 혜택으로 직접 연결되는 실질적인 자산입니다.'
              : '単なるボランティアではありません。ケアポイントは就職・入試・生活特典に直接つながる実質的な資産です。'}
          </p>
          <div className={styles.pointsGrid}>
            {(lang === 'ko' ? [
              '대기업·중견기업 채용 시 케어포인트 우대',
              '봉사 시간 자동 인증서 발급 (생기부·포트폴리오)',
              '대학·대학원 입학 가산점 연동',
              '파트너사 쿠폰·할인·한일 여행 지원',
              'CSR 실적 자동화 (기업 ESG 지표 연동)',
              '한일 공동 봉사 인증서 발급',
            ] : [
              '大手・中堅企業採用時にケアポイント優遇',
              'ボランティア時間の自動証明書発行',
              '大学・大学院入学加点連動',
              'パートナー企業クーポン・割引・日韓旅行支援',
              'CSR実績自動化（企業ESG指標連動）',
              '日韓共同ボランティア認定書発行',
            ]).map(item => (
              <div key={item} className={styles.pointItem}>
                <div className={styles.pointDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{lang === 'ko' ? '안전 시스템' : '安全システム'}</p>
          <h2 className={styles.sectionTitle}>
            {lang === 'ko' ? '양방향 신뢰 설계' : '双方向の信頼設計'}
          </h2>
          <div className={styles.safetyGrid}>
            {[
              { icon:'🔒', ko:'닉네임 공개',    ja:'ニックネーム公開',
                koD:'서비스 내 본명 비공개, 개인정보 완전 보호',
                jaD:'サービス内で本名非公開、個人情報完全保護' },
              { icon:'🪪', ko:'신원 검증',      ja:'本人確認',
                koD:'신분증 인증 + 범죄경력조회 API 연동',
                jaD:'身分証認証 + 犯罪歴照会API連動' },
              { icon:'⚖️', ko:'노인 상호 평가', ja:'高齢者相互評価',
                koD:'돌봄사도 노인을 평가, 문제 행동 누적 기록',
                jaD:'介護士も高齢者を評価、問題行動の累積記録' },
              { icon:'🤖', ko:'AI 분쟁 감지',  ja:'AI紛争検知',
                koD:'이상 신호 자동 감지 + 운영자 즉시 개입',
                jaD:'異常シグナル自動検知 + オペレーター即時介入' },
            ].map(s => (
              <div key={s.icon} className={styles.safetyCard}>
                <div className={styles.safetyIcon}>{s.icon}</div>
                <h3>{lang === 'ko' ? s.ko : s.ja}</h3>
                <p>{lang === 'ko' ? s.koD : s.jaD}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BILINGUAL ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{lang === 'ko' ? '한 · 일 공동' : '韓 · 日 共同'}</p>
          <h2 className={styles.sectionTitle}>
            {lang === 'ko' ? '두 나라, 하나의 돌봄 철학' : '二つの国、一つの介護哲学'}
          </h2>
          <div className={styles.biGrid}>
            <div className={styles.biCard}>
              <p className={styles.biFlag}>🇰🇷 한국어</p>
              <p>케어매치는 고령화 사회에서 발생하는 돌봄 공백을 해소하기 위해 만들어졌습니다. 신뢰할 수 있는 돌봄 파트너를 가족처럼 연결하고, 어르신이 익숙한 환경에서 행복하게 생활할 수 있도록 지원합니다.</p>
            </div>
            <div className={`${styles.biCard} ${styles.biCardJa}`}>
              <p className={styles.biFlag}>🇯🇵 日本語</p>
              <p>ケアマッチは、高齢化社会における介護の空白を埋めるために作られました。信頼できる介護パートナーを家族のようにつなぎ、ご高齢の方が慣れ親しんだ環境で幸せに暮らせるよう支援します。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerLogo}>Care<span>Match</span></p>
          <p className={styles.footerTagline}>2026 글로벌 피우다프로젝트 출품 · 수도권</p>
          <div className={styles.footerLinks}>
            <a href="https://github.com/kentkim0326/CareMatch" target="_blank" rel="noreferrer">GitHub</a>
            <span>·</span>
            <a href="#">{lang === 'ko' ? '기획안' : '企画書'}</a>
            <span>·</span>
            <a href="mailto:ictcoc@kfict.or.kr">{lang === 'ko' ? '문의' : 'お問い合わせ'}</a>
          </div>
          <p className={styles.footerCopy}>© 2026 CareMatch. Built with ❤️ for Korea &amp; Japan.</p>
        </div>
      </footer>

    </div>
  );
}
