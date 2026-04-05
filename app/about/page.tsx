'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function AboutPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');

  const team = [
    { emoji:'😊', ko:'김○○', ja:'キム○○', koRole:'CEO · 한일 복지 전문가', jaRole:'CEO · 日韓福祉専門家' },
    { emoji:'🌿', ko:'이○○', ja:'イ○○',   koRole:'CTO · 풀스택 개발자',   jaRole:'CTO · フルスタック開発者' },
    { emoji:'🌸', ko:'田中○○', ja:'田中○○', koRole:'COO · 일본 사업 총괄', jaRole:'COO · 日本事業統括' },
  ];

  const milestones = [
    { year:'2024.03', ko:'CareMatch 아이디어 구상', ja:'CareMatchアイデア構想' },
    { year:'2024.09', ko:'한일 파트너십 체결', ja:'日韓パートナーシップ締結' },
    { year:'2025.01', ko:'베타 서비스 출시 (서울·도쿄)', ja:'ベータサービス開始（ソウル・東京）' },
    { year:'2025.06', ko:'돌봄사 500명 돌파', ja:'介護士500名突破' },
    { year:'2026.04', ko:'AI 케어헬스 기능 출시', ja:'AIケアヘルス機能リリース' },
    { year:'2026.06', ko:'청년기업가대회 출품', ja:'青年起業家大会出品' },
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
        <span className={styles.appTitle}>{lang==='ko'?'CareMatch 소개':'CareMatch 紹介'}</span>
      </div>

      <div className={styles.formWrap}>
        {/* 미션 */}
        <div className={styles.fCard} style={{marginBottom:'1rem',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🤝</div>
          <h2 style={{color:'#fff',fontSize:'1.4rem',marginBottom:'0.8rem',fontFamily:'var(--font-serif)'}}>
            {lang==='ko'?'돌봄으로 연결되는 한일 사회':'ケアでつながる日韓社会'}
          </h2>
          <p style={{color:'var(--muted)',lineHeight:1.8,fontSize:'0.9rem'}}>
            {lang==='ko'
              ?'CareMatch는 한국과 일본의 독거노인 돌봄 공백을 해결하고, 양국 청년에게 의미 있는 기회를 제공하기 위해 만들어졌습니다. AI 기술로 최적의 매칭을 실현하고, 케어 포인트로 돌봄 활동을 커리어로 연결합니다.'
              :'CareMatchは、韓国と日本の一人暮らし高齢者の介護空白を解消し、両国の若者に意義ある機会を提供するために作られました。AI技術で最適なマッチングを実現し、ケアポイントで介護活動をキャリアにつなげます。'}
          </p>
        </div>

        {/* 문제 정의 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <p className={styles.fTitle}>{lang==='ko'?'우리가 해결하는 문제':'私たちが解決する問題'}</p>
          <div className={styles.safetyGrid}>
            {[
              { icon:'👴', ko:'독거노인 200만+', ja:'一人暮らし高齢者200万+', koD:'한국 독거노인 200만 명, 돌봄 공백 심각', jaD:'韓国の一人暮らし高齢者200万人、介護空白深刻' },
              { icon:'🏥', ko:'지방 의료 공백', ja:'地方医療空白', koD:'의사 70%가 수도권 집중, 지방 노인 의료 소외', jaD:'医師の70%が首都圏集中、地方高齢者が医療から疎外' },
              { icon:'🌏', ko:'한일 고령화', ja:'日韓高齢化', koD:'일본 독거노인 700만+, 세계 최고령 사회', jaD:'日本の一人暮らし高齢者700万+、世界最高齢社会' },
              { icon:'💼', ko:'청년 취업난', ja:'若者の就職難', koD:'양국 청년 실업 심각, 의미있는 경력 기회 부족', jaD:'両国の若者失業深刻、意義あるキャリア機会不足' },
            ].map(p=>(
              <div key={p.icon} className={styles.safetyCard}>
                <div className={styles.safetyIcon}>{p.icon}</div>
                <h3>{lang==='ko'?p.ko:p.ja}</h3>
                <p>{lang==='ko'?p.koD:p.jaD}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 마일스톤 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <p className={styles.fTitle}>{lang==='ko'?'성장 히스토리':'成長ヒストリー'}</p>
          {milestones.map((m,i)=>(
            <div key={i} className={styles.notifyItem}>
              <div className={styles.notifyDot} style={{background: i===milestones.length-1?'#e94560':'#14b8a6'}} />
              <div style={{flex:1}}>
                <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'2px'}}>{m.year}</div>
                <div style={{fontSize:'13px',color:'var(--text)'}}>{lang==='ko'?m.ko:m.ja}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 팀 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <p className={styles.fTitle}>{lang==='ko'?'팀':'チーム'}</p>
          {team.map((t,i)=>(
            <div key={i} className={styles.matchCard}>
              <div className={styles.carerAvatar} style={{background:'rgba(233,69,96,0.12)',fontSize:'1.5rem'}}>
                {t.emoji}
              </div>
              <div className={styles.carerInfo}>
                <div className={styles.carerName}>{lang==='ko'?t.ko:t.ja}</div>
                <div className={styles.carerSub}>{lang==='ko'?t.koRole:t.jaRole}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.btnRow}>
          <a href="/register" style={{flex:1}}>
            <button className={styles.btnPrimary} style={{width:'100%'}}>
              {lang==='ko'?'돌봄사로 참여하기 →':'介護士として参加する →'}
            </button>
          </a>
          <a href="/match" style={{flex:1}}>
            <button className={styles.btnOutline} style={{width:'100%'}}>
              {lang==='ko'?'돌봄사 찾기':'介護士を探す'}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

