'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function MapPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');
  const [filter, setFilter] = useState('all');

  const spots = [
    { id:1, emoji:'🏠', ko:'서울 강남구', ja:'ソウル江南区', koSub:'돌봄사 142명 활동 중', jaSub:'介護士142名活動中', color:'#e94560' },
    { id:2, emoji:'🏠', ko:'서울 마포구', ja:'ソウル麻浦区', koSub:'돌봄사 98명 활동 중',  jaSub:'介護士98名活動中',  color:'#e94560' },
    { id:3, emoji:'🏠', ko:'경기 수원시', ja:'京畿水原市',   koSub:'돌봄사 76명 활동 중',  jaSub:'介護士76名活動中',  color:'#e94560' },
    { id:4, emoji:'🏯', ko:'도쿄 신주쿠', ja:'東京新宿区',   koSub:'돌봄사 203명 활동 중', jaSub:'介護士203名活動中', color:'#14b8a6' },
    { id:5, emoji:'🏯', ko:'오사카 난바', ja:'大阪難波',     koSub:'돌봄사 157명 활동 중', jaSub:'介護士157名活動中', color:'#14b8a6' },
    { id:6, emoji:'🏠', ko:'부산 해운대', ja:'釜山海雲台',   koSub:'돌봄사 64명 활동 중',  jaSub:'介護士64名活動中',  color:'#e94560' },
  ];

  const filtered = filter === 'kr' ? spots.filter((_,i)=>i<3||i===5)
    : filter === 'jp' ? spots.filter((_,i)=>i===3||i===4)
    : spots;

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
        <span className={styles.appTitle}>{lang==='ko'?'🗺️ 활동 지도':'🗺️ 活動マップ'}</span>
      </div>

      <div className={styles.formWrap}>
        {/* 통계 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px',marginBottom:'1.5rem'}}>
          {[
            {val:'740+', label: lang==='ko'?'한국 활동':'韓国活動'},
            {val:'360+', label: lang==='ko'?'일본 활동':'日本活動'},
            {val:'12',   label: lang==='ko'?'도시':'都市'},
          ].map(s=>(
            <div key={s.label} className={styles.ptsStat}>
              <span>{s.label}</span>
              <strong>{s.val}</strong>
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className={styles.filterRow} style={{marginBottom:'1rem'}}>
          {[
            {key:'all', ko:'전체', ja:'すべて'},
            {key:'kr',  ko:'🇰🇷 한국', ja:'🇰🇷 韓国'},
            {key:'jp',  ko:'🇯🇵 일본', ja:'🇯🇵 日本'},
          ].map(f=>(
            <button key={f.key}
              className={filter===f.key?styles.filterOn:styles.filterBtn}
              onClick={()=>setFilter(f.key)}>
              {lang==='ko'?f.ko:f.ja}
            </button>
          ))}
        </div>

        {/* 지도 시각화 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <div style={{
            background:'var(--bg4)',borderRadius:'12px',padding:'1.5rem',
            display:'flex',alignItems:'center',justifyContent:'center',
            minHeight:'200px',position:'relative',overflow:'hidden'
          }}>
            <div style={{position:'absolute',inset:0,opacity:0.06,
              backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
              backgroundSize:'30px 30px'}} />
            <div style={{display:'flex',gap:'2rem',flexWrap:'wrap',justifyContent:'center',position:'relative',zIndex:1}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:'2rem',marginBottom:'8px'}}>🇰🇷</div>
                <div style={{fontSize:'13px',color:'var(--muted)'}}>Korea</div>
                <div style={{fontSize:'11px',color:'#e94560',marginTop:'4px'}}>740+ {lang==='ko'?'돌봄사':'介護士'}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',color:'var(--muted)',fontSize:'1.5rem'}}>↔</div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:'2rem',marginBottom:'8px'}}>🇯🇵</div>
                <div style={{fontSize:'13px',color:'var(--muted)'}}>Japan</div>
                <div style={{fontSize:'11px',color:'#14b8a6',marginTop:'4px'}}>360+ {lang==='ko'?'돌봄사':'介護士'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 지역 목록 */}
        {filtered.map(s=>(
          <div key={s.id} className={styles.matchCard}>
            <div className={styles.carerAvatar} style={{background:`${s.color}22`,fontSize:'1.5rem'}}>
              {s.emoji}
            </div>
            <div className={styles.carerInfo}>
              <div className={styles.carerName}>{lang==='ko'?s.ko:s.ja}</div>
              <div className={styles.carerSub}>{lang==='ko'?s.koSub:s.jaSub}</div>
            </div>
            <a href="/match">
              <button style={{
                padding:'6px 12px',borderRadius:'8px',fontSize:'12px',
                border:'1px solid var(--accent)',background:'transparent',
                color:'var(--accent)',cursor:'pointer',whiteSpace:'nowrap'
              }}>{lang==='ko'?'돌봄사 보기':'介護士を見る'}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

