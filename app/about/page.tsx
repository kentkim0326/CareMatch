'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function AboutPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');

  // 디아더는 일인 개발사다. 없는 사람을 팀으로 세우지 않는다.
  const team = [
    { emoji:'😊', ko:'김형섭 (Kent Kim)', ja:'キム・ヒョンソプ (Kent Kim)',
      koRole:'디아더 대표 · 기획과 개발을 혼자 합니다',
      jaRole:'Deother 代表 · 企画と開発を一人で行っています' },
  ];

  // 지나간 일과 앞으로 할 일을 섞지 않는다. done:false 는 아직 하지 않은 것이다.
  const milestones = [
    { year:'2026.04', done:true,  ko:'CareMatch 기획 · 시안 제작', ja:'CareMatch企画・デザイン試作' },
    { year:'2026.04', done:true,  ko:'AI 케어헬스 문진 화면 구현', ja:'AIケアヘルス問診画面の実装' },
    { year:'2026.06', done:true,  ko:'글로벌 피우다프로젝트 출품', ja:'グローバル・ピウダプロジェクト出品' },
    { year:'계획',    done:false, ko:'한일 파트너 기관 협의', ja:'日韓パートナー機関との協議' },
    { year:'계획',    done:false, ko:'신분증 인증 · 범죄경력 조회 연동', ja:'身分証認証・犯罪歴照会の連携' },
    { year:'계획',    done:false, ko:'베타 서비스 출시 (서울·도쿄)', ja:'ベータサービス開始（ソウル・東京）' },
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
          <p className={styles.fTitle}>{lang==='ko'?'진행 상황과 계획':'進捗と計画'}</p>
          {milestones.map((m,i)=>(
            <div key={i} className={styles.notifyItem}>
              <div className={styles.notifyDot} style={{background: m.done?'#14b8a6':'#6b7280'}} />
              <div style={{flex:1}}>
                <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'2px'}}>
                  {m.done ? m.year : (lang==='ko'?'계획':'計画')}
                </div>
                <div style={{fontSize:'13px',color: m.done?'var(--text)':'var(--muted)'}}>
                  {lang==='ko'?m.ko:m.ja}{m.done ? '' : (lang==='ko'?' (예정)':'（予定）')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 팀 */}
        <div className={styles.fCard} style={{marginBottom:'1rem'}}>
          <p className={styles.fTitle}>{lang==='ko'?'만든 사람':'制作者'}</p>
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
          <div style={{fontSize:'11.5px',color:'var(--muted)',marginTop:'10px',lineHeight:1.6}}>
            {lang==='ko'
              ? '한일 돌봄 현장과 복지 제도를 아는 분들과 함께 만들고 싶습니다.'
              : '日韓の介護現場と福祉制度をご存じの方と一緒に作りたいと考えています。'}
          </div>
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

