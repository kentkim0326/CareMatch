'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function PointsPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');

  const history = [
    { pts:'+50', ko:'돌봄사 등록 완료', ja:'介護士登録完了', color:'#14b8a6' },
    { pts:'+30', ko:'첫 돌봄 활동 (3시간)', ja:'初回介護活動（3時間）', color:'#14b8a6' },
    { pts:'+20', ko:'이용자 후기 작성', ja:'利用者レビュー投稿', color:'#14b8a6' },
    { pts:'+10', ko:'프로필 완성도 100%', ja:'プロフィール完成度100%', color:'#14b8a6' },
    { pts:'-20', ko:'쿠폰 사용 (스타벅스)', ja:'クーポン使用（スターバックス）', color:'#e94560' },
  ];

  const benefits = [
    { icon:'🏢', ko:'대기업 채용 우대', ja:'大手企業採用優遇', koD:'케어포인트 500pts 이상 시 서류 전형 우대', jaD:'500pts以上で書類選考優遇' },
    { icon:'🎓', ko:'대학 입학 가산점', ja:'大学入学加点', koD:'협약 대학 입학 시 케어포인트 가산점 반영', jaD:'協定大学入学時にケアポイント加点反映' },
    { icon:'📜', ko:'자동 봉사 인증서', ja:'自動ボランティア証明書', koD:'활동 즉시 생기부·포트폴리오용 인증서 발급', jaD:'活動後すぐに証明書発行' },
    { icon:'✈️', ko:'한일 여행 지원', ja:'日韓旅行支援', koD:'1000pts 이상 시 한일 교류 프로그램 참가 우대', jaD:'1000pts以上で日韓交流プログラム優遇' },
    { icon:'☕', ko:'파트너사 할인', ja:'パートナー割引', koD:'스타벅스·편의점·교통카드 포인트 전환', jaD:'スタバ・コンビニ・交通系ポイント交換' },
    { icon:'🌐', ko:'ESG 인증', ja:'ESG認証', koD:'기업 CSR 실적 자동 연동', jaD:'企業CSR実績自動連動' },
  ];

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Care<span>Match</span></a>
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button className={lang==='ko'?styles.langOn:styles.langOff} onClick={()=>setLang('ko')}>한국어</button>
            <button className={lang==='ja'?styles.langOn:styles.langOff} onClick={()=>setLang('ja')}>日本語</button>
          </div>
        </div>
      </nav>

      <div className={styles.appHdr}>
        <a href="/"><button className={styles.backBtn}>← {lang==='ko'?'홈':'ホーム'}</button></a>
        <span className={styles.appTitle}>{lang==='ko'?'케어포인트':'ケアポイント'}</span>
      </div>

      <div className={styles.formWrap}>
        {/* 내 포인트 */}
        <div className={styles.doneCard} style={{marginBottom:'1rem',textAlign:'center'}}>
          <div className={styles.doneEmoji}>⭐</div>
          <h3 style={{color:'#fff',marginBottom:'4px'}}>{lang==='ko'?'내 케어포인트':'マイケアポイント'}</h3>
          <div style={{fontSize:'3rem',fontWeight:700,color:'#14b8a6',margin:'0.5rem 0'}}>90 pts</div>
          <p style={{fontSize:'13px',color:'var(--muted)'}}>
            {lang==='ko'?'다음 혜택까지 410pts 남았어요':'次の特典まで410pts残っています'}
          </p>
          <div style={{background:'var(--bg4)',borderRadius:'8px',height:'8px',margin:'1rem 0',overflow:'hidden'}}>
            <div style={{width:'9%',height:'100%',background:'#14b8a6',borderRadius:'8px'}} />
          </div>
        </div>

        {/* 통계 */}
        <div className={styles.ptsGrid} style={{marginBottom:'1rem'}}>
          {[
            {val:'90',  label: lang==='ko'?'보유 포인트':'保有ポイント'},
            {val:'110', label: lang==='ko'?'누적 획득':'累積獲得'},
            {val:'20',  label: lang==='ko'?'사용':'使用'},
            {val:'3',   label: lang==='ko'?'활동 횟수':'活動回数'},
          ].map(s=>(
            <div key={s.label} className={styles.ptsStat}>
              <span>{s.label}</span>
              <strong>{s.val}</strong>
            </div>
          ))}
        </div>

        {/* 포인트 내역 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <p className={styles.fTitle}>{lang==='ko'?'포인트 내역':'ポイント履歴'}</p>
          {history.map((h,i)=>(
            <div key={i} className={styles.notifyItem}>
              <div className={styles.notifyDot} style={{background:h.color}} />
              <div style={{flex:1,fontSize:'13px',color:'var(--text)'}}>{lang==='ko'?h.ko:h.ja}</div>
              <div style={{fontSize:'14px',fontWeight:700,color:h.color}}>{h.pts}</div>
            </div>
          ))}
        </div>

        {/* 혜택 */}
        <p className={styles.fTitle} style={{marginBottom:'12px'}}>{lang==='ko'?'포인트 혜택':'ポイント特典'}</p>
        <div className={styles.safetyGrid}>
          {benefits.map(b=>(
            <div key={b.icon} className={styles.safetyCard}>
              <div className={styles.safetyIcon}>{b.icon}</div>
              <h3>{lang==='ko'?b.ko:b.ja}</h3>
              <p>{lang==='ko'?b.koD:b.jaD}</p>
            </div>
          ))}
        </div>

        <div className={styles.btnRow} style={{marginTop:'1.5rem'}}>
          <a href="/register" style={{flex:1}}>
            <button className={styles.btnPrimary} style={{width:'100%'}}>
              {lang==='ko'?'지금 활동 시작하기 →':'今すぐ活動を始める →'}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

