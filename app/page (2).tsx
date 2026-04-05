'use client';

import { useState } from 'react';
import styles from '../page.module.css';

type Lang = 'ko' | 'ja';
type Filter = 'all' | 'dementia' | 'night' | 'bilingual';

const CARERS = [
  { id:1, emoji:'🌸', score:98, tags:['치매 전문','이중언어','야간 가능'],
    ko:{name:'김○○ 님', sub:'서울 · 10년 경력 · 한·일 가능', review:'어머니가 일본 분인데 정말 잘 소통해주셨어요.'},
    ja:{name:'キム○○ さん', sub:'ソウル · 10年経験 · 韓日対応', review:'母が日本人ですがとても上手にコミュニケーションしてくれました。'},
    filters:['all','dementia','bilingual'] as Filter[] },
  { id:2, emoji:'🍀', score:96, tags:['거동 보조','재활 보조','주간'],
    ko:{name:'이○○ 님', sub:'경기 · 7년 경력 · 한국어'},
    ja:{name:'イ○○ さん', sub:'京畿 · 7年経験 · 韓国語'},
    filters:['all'] as Filter[] },
  { id:3, emoji:'⭐', score:99, tags:['야간 케어','응급 대응','이중언어'],
    ko:{name:'박○○ 님', sub:'서울 · 15년 경력 · 한·일 가능', review:'야간에 갑작스러운 상황도 침착하게 대처해 주셨어요.'},
    ja:{name:'パク○○ さん', sub:'ソウル · 15年経験 · 韓日対応', review:'夜間の突然の状況にも冷静に対処していただきました。'},
    filters:['all','night','bilingual'] as Filter[] },
  { id:4, emoji:'🌿', score:94, tags:['치매 전문','말벗·정서','주간'],
    ko:{name:'최○○ 님', sub:'부산 · 8년 경력 · 한국어'},
    ja:{name:'チェ○○ さん', sub:'釜山 · 8年経験 · 韓国語'},
    filters:['all','dementia'] as Filter[] },
  { id:5, emoji:'🎵', score:97, tags:['이중언어','야간 가능','병원 동행'],
    ko:{name:'田中○○ 님', sub:'도쿄 · 12년 경력 · 한·일 가능', review:'한국어로 부드럽게 대화해 주셔서 어르신이 편안해하셨어요.'},
    ja:{name:'田中○○ さん', sub:'東京 · 12年経験 · 韓日対応', review:'韓国語で穏やかに話しかけてくださり、利用者の方が安心されていました。'},
    filters:['all','night','bilingual'] as Filter[] },
  { id:6, emoji:'🌊', score:93, tags:['가사 지원','식사 보조','주간'],
    ko:{name:'정○○ 님', sub:'인천 · 5년 경력 · 한국어'},
    ja:{name:'チョン○○ さん', sub:'仁川 · 5年経験 · 韓国語'},
    filters:['all'] as Filter[] },
];

const T = {
  ko: {
    title: '돌봄사 찾기',
    filters: { all:'전체', dementia:'치매 전문', night:'야간 가능', bilingual:'이중언어' },
    matchLabel: '매칭률',
    reviewLabel: '이용자 후기',
    connectBtn: '연결 요청',
    connected: '요청 완료 ✓',
    noResult: '조건에 맞는 돌봄사가 없습니다.',
    banner: '검증된 돌봄사만 매칭됩니다 — 신분증 인증 + 범죄경력 조회 완료',
  },
  ja: {
    title: '介護士を探す',
    filters: { all:'すべて', dementia:'認知症専門', night:'夜間対応', bilingual:'バイリンガル' },
    matchLabel: 'マッチ率',
    reviewLabel: 'ご利用者の口コミ',
    connectBtn: '接続リクエスト',
    connected: 'リクエスト完了 ✓',
    noResult: '条件に合う介護士がいません。',
    banner: '認証済み介護士のみマッチング — 身分証認証 + 犯罪歴照会済み',
  },
};

export default function MatchPage() {
  const [lang, setLang] = useState<Lang>('ko');
  const [filter, setFilter] = useState<Filter>('all');
  const [connected, setConnected] = useState<number[]>([]);

  const t = T[lang];
  const filtered = CARERS.filter(c => c.filters.includes(filter));

  return (
    <div className={`${styles.root} ${lang==='ja'?styles.rootJa:''}`}>
      {/* NAV */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Care<span>Match</span></a>
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button className={lang==='ko'?styles.langOn:styles.langOff} onClick={()=>setLang('ko')}>한국어</button>
            <button className={lang==='ja'?styles.langOn:styles.langOff} onClick={()=>setLang('ja')}>日本語</button>
          </div>
        </div>
      </nav>

      {/* APP HEADER */}
      <div className={styles.appHdr}>
        <a href="/"><button className={styles.backBtn}>← {lang==='ko'?'홈':'ホーム'}</button></a>
        <span className={styles.appTitle}>{t.title}</span>
      </div>

      <div className={styles.formWrap}>
        {/* 안전 배너 */}
        <div className={styles.successBanner}>{t.banner}</div>

        {/* 필터 */}
        <div className={styles.filterRow}>
          {(Object.entries(t.filters) as [Filter, string][]).map(([key, label]) => (
            <button key={key}
              className={filter===key ? styles.filterOn : styles.filterBtn}
              onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>

        {/* 카드 목록 */}
        {filtered.length === 0 && (
          <p style={{color:'var(--muted)', textAlign:'center', padding:'2rem'}}>{t.noResult}</p>
        )}
        {filtered.map(c => {
          const info = lang === 'ko' ? c.ko : c.ja;
          const isConnected = connected.includes(c.id);
          return (
            <div key={c.id} className={styles.matchCard}>
              <div className={styles.carerAvatar} style={{background:'rgba(233,69,96,0.12)'}}>
                {c.emoji}
              </div>
              <div className={styles.carerInfo}>
                <div className={styles.carerName}>{info.name}</div>
                <div className={styles.carerSub}>{info.sub}</div>
                <div className={styles.carerTags}>
                  {c.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
                {'review' in info && (
                  <div style={{fontSize:'12px', color:'var(--muted)', marginTop:'6px', lineHeight:1.6}}>
                    💬 {(info as typeof info & {review?:string}).review}
                  </div>
                )}
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'8px', flexShrink:0}}>
                <span className={styles.matchScore}>{c.score}%</span>
                <button
                  onClick={() => setConnected(p => isConnected ? p.filter(x=>x!==c.id) : [...p, c.id])}
                  style={{
                    padding:'6px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:500,
                    border: isConnected ? 'none' : '1px solid var(--accent)',
                    background: isConnected ? 'rgba(20,184,166,0.15)' : 'transparent',
                    color: isConnected ? '#14b8a6' : 'var(--accent)',
                    cursor:'pointer', whiteSpace:'nowrap',
                  }}
                >{isConnected ? t.connected : t.connectBtn}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
