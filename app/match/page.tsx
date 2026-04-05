'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function MatchPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');
  const [connected, setConnected] = useState<number[]>([]);

  const carers = [
    { id:1, emoji:'🌸', score:98, name: lang==='ko'?'김○○ 님':'キム○○ さん',
      sub: lang==='ko'?'서울 · 10년 경력 · 한·일 가능':'ソウル · 10年経験 · 韓日対応',
      tags: lang==='ko'?['치매 전문','이중언어','야간 가능']:['認知症専門','バイリンガル','夜間対応'],
      review: lang==='ko'?'어머니가 일본 분인데 정말 잘 소통해주셨어요.':'母が日本人ですがとても上手にコミュニケーションしてくれました。' },
    { id:2, emoji:'🍀', score:96, name: lang==='ko'?'이○○ 님':'イ○○ さん',
      sub: lang==='ko'?'경기 · 7년 경력 · 한국어':'京畿 · 7年経験 · 韓国語',
      tags: lang==='ko'?['거동 보조','재활 보조','주간']:['移動介助','リハビリ補助','日中'],
      review: '' },
    { id:3, emoji:'⭐', score:99, name: lang==='ko'?'박○○ 님':'パク○○ さん',
      sub: lang==='ko'?'서울 · 15년 경력 · 한·일 가능':'ソウル · 15年経験 · 韓日対応',
      tags: lang==='ko'?['야간 케어','응급 대응','이중언어']:['夜間ケア','緊急対応','バイリンガル'],
      review: lang==='ko'?'야간에 갑작스러운 상황도 침착하게 대처해 주셨어요.':'夜間の突然の状況にも冷静に対処していただきました。' },
    { id:4, emoji:'🌿', score:94, name: lang==='ko'?'최○○ 님':'チェ○○ さん',
      sub: lang==='ko'?'부산 · 8년 경력 · 한국어':'釜山 · 8年経験 · 韓国語',
      tags: lang==='ko'?['치매 전문','말벗·정서','주간']:['認知症専門','傾聴サポート','日中'],
      review: '' },
    { id:5, emoji:'🎵', score:97, name: lang==='ko'?'田中○○ 님':'田中○○ さん',
      sub: lang==='ko'?'도쿄 · 12년 경력 · 한·일 가능':'東京 · 12年経験 · 韓日対応',
      tags: lang==='ko'?['이중언어','야간 가능','병원 동행']:['バイリンガル','夜間対応','通院同行'],
      review: lang==='ko'?'한국어로 부드럽게 대화해 주셔서 어르신이 편안해하셨어요.':'韓国語で穏やかに話しかけてくださり、利用者の方が安心されていました。' },
    { id:6, emoji:'🌊', score:93, name: lang==='ko'?'정○○ 님':'チョン○○ さん',
      sub: lang==='ko'?'인천 · 5년 경력 · 한국어':'仁川 · 5年経験 · 韓国語',
      tags: lang==='ko'?['가사 지원','식사 보조','주간']:['家事支援','食事介助','日中'],
      review: '' },
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
        <span className={styles.appTitle}>{lang==='ko'?'돌봄사 찾기':'介護士を探す'}</span>
      </div>

      <div className={styles.formWrap}>
        <div className={styles.successBanner}>
          {lang==='ko'
            ?'검증된 돌봄사만 매칭됩니다 — 신분증 인증 + 범죄경력 조회 완료'
            :'認証済み介護士のみマッチング — 身分証認証 + 犯罪歴照会済み'}
        </div>

        {carers.map(c => {
          const isConn = connected.includes(c.id);
          return (
            <div key={c.id} className={styles.matchCard}>
              <div className={styles.carerAvatar} style={{background:'rgba(233,69,96,0.12)'}}>
                {c.emoji}
              </div>
              <div className={styles.carerInfo}>
                <div className={styles.carerName}>{c.name}</div>
                <div className={styles.carerSub}>{c.sub}</div>
                <div className={styles.carerTags}>
                  {c.tags.map(t=><span key={t} className={styles.tag}>{t}</span>)}
                </div>
                {c.review && (
                  <div style={{fontSize:'12px',color:'var(--muted)',marginTop:'6px',lineHeight:1.6}}>
                    💬 {c.review}
                  </div>
                )}
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'8px',flexShrink:0}}>
                <span className={styles.matchScore}>{c.score}%</span>
                <button
                  onClick={()=>setConnected(p=>isConn?p.filter(x=>x!==c.id):[...p,c.id])}
                  style={{
                    padding:'6px 12px',borderRadius:'8px',fontSize:'12px',fontWeight:500,
                    border:isConn?'none':'1px solid var(--accent)',
                    background:isConn?'rgba(20,184,166,0.15)':'transparent',
                    color:isConn?'#14b8a6':'var(--accent)',
                    cursor:'pointer',whiteSpace:'nowrap',
                  }}
                >
                  {isConn
                    ?(lang==='ko'?'요청 완료 ✓':'リクエスト完了 ✓')
                    :(lang==='ko'?'연결 요청':'接続リクエスト')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
