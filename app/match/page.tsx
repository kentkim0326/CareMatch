'use client';

import { useState } from 'react';
import styles from '../page.module.css';

const EMOJIS = ['😊','🌸','🍀','⭐','🦋','🌙','🐣','🌿','🎵','🌊','🍁','🦊'];

export default function RegisterPage() {
  const [lang, setLang] = useState<'ko'|'ja'>('ko');
  const [step, setStep] = useState(0);
  const [avatar, setAvatar] = useState(0);
  const [nick, setNick] = useState('');
  const [age, setAge] = useState('');
  const [selLangs, setSelLangs] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [wdays, setWdays] = useState<number[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [intro, setIntro] = useState('');

  const toggle = <T,>(arr: T[], val: T, set: (a:T[])=>void) =>
    set(arr.includes(val)?arr.filter(x=>x!==val):[...arr,val]);

  const ages   = lang==='ko'?['20대','30대','40대','50대','60대+']:['20代','30代','40代','50代','60代+'];
  const langs  = ['한국어','日本語','English'];
  const regs   = lang==='ko'
    ?['서울','경기','부산','대구','인천','광주','대전','울산','제주','도쿄','오사카','교토']
    :['ソウル','京畿','釜山','大邱','仁川','光州','大田','蔚山','済州','東京','大阪','京都'];
  const wdayLabels = lang==='ko'?['월','화','수','목','금','토','일']:['月','火','水','木','金','土','日'];
  const slotLabels = lang==='ko'?['06-09시','09-12시','12-15시','15-18시','18-21시','야간']:['06-09時','09-12時','12-15時','15-18時','18-21時','夜間'];
  const skillList  = lang==='ko'
    ?['치매 케어','거동 보조','식사 보조','투약 관리','재활 보조','말벗·정서','가사 지원','목욕 보조','병원 동행','야간 케어','이중언어','응급 대응']
    :['認知症ケア','移動介助','食事介助','服薬管理','リハビリ補助','傾聴サポート','家事支援','入浴介助','通院同行','夜間ケア','バイリンガル','緊急対応'];

  const canNext = [
    !!(nick.trim() && age && selLangs.length>0),
    regions.length>0,
    wdays.length>0 && slots.length>0,
    skills.length>0,
  ][step];

  if (step === 4) return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Care<span>Match</span></a>
      </nav>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <div className={styles.doneEmoji}>{EMOJIS[avatar]}</div>
          <h3>{lang==='ko'?'등록이 완료되었습니다!':'登録が完了しました！'}</h3>
          <p>{lang==='ko'?'검토 후 24시간 내 승인 알림을 드립니다.':'審査後、24時間以内に承認通知をお送りします。'}</p>
          <div className={styles.ptsBadge}>
            <span>{lang==='ko'?'케어포인트':'ケアポイント'}</span>
            <strong>+50 pts</strong>
            <em>{lang==='ko'?'+50 케어포인트 지급 예정':'+50 ケアポイント付与予定'}</em>
          </div>
          <div className={styles.btnRow}>
            <a href="/match"><button className={styles.btnPrimary}>{lang==='ko'?'매칭 보러 가기 →':'マッチングを見る →'}</button></a>
            <a href="/"><button className={styles.btnOutline}>{lang==='ko'?'홈으로':'ホームへ'}</button></a>
          </div>
        </div>
      </div>
    </div>
  );

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
        {step>0
          ?<button className={styles.backBtn} onClick={()=>setStep(s=>s-1)}>← {lang==='ko'?'뒤로':'戻る'}</button>
          :<a href="/"><button className={styles.backBtn}>← {lang==='ko'?'홈':'ホーム'}</button></a>}
        <span className={styles.appTitle}>{lang==='ko'?'돌봄사 등록':'介護士登録'} {step+1}/4</span>
        <div className={styles.dots}>
          {[0,1,2,3].map(i=>(
            <div key={i} className={`${styles.dot} ${i<=step?styles.dotOn:''}`} />
          ))}
        </div>
      </div>

      <div className={styles.formWrap}>
        {step===0 && <>
          <div className={styles.fCard}>
            <p className={styles.fTitle}>{lang==='ko'?'프로필 아이콘 선택':'プロフィールアイコン選択'}</p>
            <div className={styles.emojiGrid}>
              {EMOJIS.map((e,i)=>(
                <button key={i} className={`${styles.emojiOpt} ${avatar===i?styles.emojiSel:''}`} onClick={()=>setAvatar(i)}>{e}</button>
              ))}
            </div>
          </div>
          <div className={styles.fCard}>
            <div className={styles.fRow}>
              <label>{lang==='ko'?'닉네임':'ニックネーム'}</label>
              <input value={nick} onChange={e=>setNick(e.target.value)}
                placeholder={lang==='ko'?'서비스 내 표시될 이름':'サービス内で表示される名前'} maxLength={12} />
            </div>
            <div className={styles.fRow}>
              <label>{lang==='ko'?'연령대':'年齢層'}</label>
              <div className={styles.filterRow}>
                {ages.map(a=>(
                  <button key={a} className={age===a?styles.filterOn:styles.filterBtn} onClick={()=>setAge(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div className={styles.fRow}>
              <label>{lang==='ko'?'구사 언어':'話せる言語'}</label>
              <div className={styles.filterRow}>
                {langs.map(l=>(
                  <button key={l} className={selLangs.includes(l)?styles.filterOn:styles.filterBtn}
                    onClick={()=>toggle(selLangs,l,setSelLangs)}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </>}

        {step===1 && (
          <div className={styles.fCard}>
            <p className={styles.fTitle}>{lang==='ko'?'활동 지역':'活動地域'}</p>
            <p className={styles.fDesc}>{lang==='ko'?'활동 가능한 지역을 모두 선택하세요':'活動可能な地域をすべて選択してください'}</p>
            <div className={styles.filterRow} style={{flexWrap:'wrap'}}>
              {regs.map(r=>(
                <button key={r} className={regions.includes(r)?styles.filterOn:styles.filterBtn}
                  onClick={()=>toggle(regions,r,setRegions)}>{r}</button>
              ))}
            </div>
            {regions.length>0 && (
              <div className={styles.infoBox}>{lang==='ko'?`선택: ${regions.join(', ')}`:`選択: ${regions.join(', ')}`}</div>
            )}
          </div>
        )}

        {step===2 && <>
          <div className={styles.fCard}>
            <p className={styles.fTitle}>{lang==='ko'?'활동 가능 요일':'活動可能な曜日'}</p>
            <div className={styles.wdRow}>
              {wdayLabels.map((d,i)=>(
                <button key={i}
                  className={`${styles.wdBtn} ${i===0?styles.wdSun:''} ${i===6?styles.wdSat:''} ${wdays.includes(i)?styles.wdOn:''}`}
                  onClick={()=>toggle(wdays,i,setWdays)}>{d}</button>
              ))}
            </div>
          </div>
          <div className={styles.fCard}>
            <p className={styles.fTitle}>{lang==='ko'?'활동 가능 시간대':'活動可能な時間帯'}</p>
            <div className={styles.slotGrid}>
              {slotLabels.map(s=>(
                <button key={s} className={`${styles.slot} ${slots.includes(s)?styles.slotOn:''}`}
                  onClick={()=>toggle(slots,s,setSlots)}>{s}</button>
              ))}
            </div>
          </div>
        </>}

        {step===3 && <>
          <div className={styles.fCard}>
            <p className={styles.fTitle}>{lang==='ko'?'전문 케어 분야':'専門ケア分野'}</p>
            <div className={styles.filterRow} style={{flexWrap:'wrap'}}>
              {skillList.map(s=>(
                <button key={s} className={skills.includes(s)?styles.filterOn:styles.filterBtn}
                  onClick={()=>toggle(skills,s,setSkills)}>{s}</button>
              ))}
            </div>
          </div>
          <div className={styles.fCard}>
            <div className={styles.fRow}>
              <label>{lang==='ko'?'자기소개':'自己紹介'}</label>
              <textarea value={intro} onChange={e=>setIntro(e.target.value)}
                placeholder={lang==='ko'?'어르신을 돌보는 마음가짐이나 경력을 짧게 적어주세요.':'ご高齢の方へのケアの姿勢や経歴を簡単にご記入ください。'}
                rows={4} maxLength={200} />
            </div>
            <p style={{fontSize:'12px',color:'var(--muted)',textAlign:'right'}}>{intro.length}/200</p>
          </div>
        </>}

        <div className={styles.btnRow}>
          <button className={styles.btnPrimary} disabled={!canNext} onClick={()=>setStep(s=>s+1)}>
            {step===3?(lang==='ko'?'등록 완료':'登録完了'):(lang==='ko'?'다음':'次へ')}
          </button>
        </div>
      </div>
    </div>
  );
}
