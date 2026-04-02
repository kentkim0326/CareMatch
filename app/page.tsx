'use client'
import { useState, useCallback } from 'react'
import { content, carers, type Lang } from './i18n'
import styles from './page.module.css'
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <div style={{height:'420px',background:'#1a2235',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'#8892a4',fontSize:'14px'}}>🗺️ 지도 불러오는 중...</div>
})

type Step = 'emoji' | 'schedule' | 'verify' | 'done'
type AppView = 'home' | 'register' | 'match' | 'map' | 'reputation' | 'notify'

interface Profile {
  emoji: string; nickname: string; role: string; lang: string
  selDates: Set<string>; selWeekdays: Set<number>; selTimes: Set<string>
}

const EMOJIS = ['🧑‍⚕️','👩‍⚕️','🧑‍🎓','🧑‍💼','🦊','🐻','🐼','🦁','🐯','🐺','🦝','🐨']
const WD_KO = ['일','월','화','수','목','금','토']
const WD_JA = ['日','月','火','水','木','金','土']
const TIMES_KO = ['새벽 0-6시','오전 6-9시','오전 9-12시','오후 12-15시','오후 15-18시','저녁 18-21시','야간 21-24시','종일 가능']
const TIMES_JA = ['深夜 0-6時','早朝 6-9時','午前 9-12時','昼 12-15時','午後 15-18時','夜 18-21時','深夜 21-24時','終日可能']
const SPECS_KO = ['치매케어','재활보조','방문목욕','말벗동행','투약관리','병원동행','식사보조','야간돌봄']
const SPECS_JA = ['認知症ケア','リハビリ','訪問入浴','話し相手','服薬管理','通院同行','食事介助','夜間介護']
const FILTER_KEYS = ['all','dementia','night','bilingual']

const MOCK = [
  { emoji:'🦊', nick:'하늘여우', sub:'서울 강남구 · 경력 5년', tags:['치매케어','오전 9-12시','日本語OK'], score:98 },
  { emoji:'🐼', nick:'달빛판다', sub:'오사카 나니와구 · 경력 3년', tags:['재활보조','오전 9-12시','한국어OK'], score:91 },
  { emoji:'🦁', nick:'든든사자', sub:'서울 송파구 · 경력 1년', tags:['말벗동행','병원동행','오전가능'], score:87 },
]

function Calendar({ selDates, selWeekdays, onDate, onWd, lang }:
  { selDates:Set<string>; selWeekdays:Set<number>; onDate:(d:string)=>void; onWd:(w:number)=>void; lang:Lang }) {
  const [vy, setVy] = useState(new Date().getFullYear())
  const [vm, setVm] = useState(new Date().getMonth())
  const WD = lang === 'ja' ? WD_JA : WD_KO
  const today = new Date(); today.setHours(0,0,0,0)
  const chg = (d:number) => { let m=vm+d,y=vy; if(m>11){m=0;y++} if(m<0){m=11;y--} setVm(m);setVy(y) }
  const first = new Date(vy,vm,1).getDay()
  const dim = new Date(vy,vm+1,0).getDate()
  const pmd = new Date(vy,vm,0).getDate()

  return (
    <div className={styles.cal}>
      <div className={styles.wdRow}>
        {WD.map((w,i) => (
          <button key={i} className={`${styles.wdBtn} ${i===0?styles.wdSun:i===6?styles.wdSat:''} ${selWeekdays.has(i)?styles.wdOn:''}`} onClick={()=>onWd(i)}>{w}</button>
        ))}
      </div>
      <div className={styles.calNav}>
        <button className={styles.calNavBtn} onClick={()=>chg(-1)}>◀</button>
        <span className={styles.calTitle}>{vy}년 {vm+1}월</span>
        <button className={styles.calNavBtn} onClick={()=>chg(1)}>▶</button>
      </div>
      <div className={styles.calWds}>
        {WD.map((w,i) => <div key={i} className={`${styles.calWd} ${i===0?styles.calWdSun:i===6?styles.calWdSat:''}`}>{w}</div>)}
      </div>
      <div className={styles.calGrid}>
        {Array.from({length:first},(_,i) => (
          <div key={'p'+i} className={`${styles.calDay} ${styles.calOther}`}>{pmd-first+1+i}</div>
        ))}
        {Array.from({length:dim},(_,i) => {
          const d=i+1, dt=new Date(vy,vm,d); dt.setHours(0,0,0,0)
          const ds=`${vy}-${vm+1}-${d}`, wd=dt.getDay(), past=dt<today
          return (
            <div key={d} className={`${styles.calDay} ${past?styles.calDis:''} ${wd===0?styles.calSun:''} ${wd===6?styles.calSat:''} ${selDates.has(ds)?styles.calSel:''} ${selWeekdays.has(wd)&&!selDates.has(ds)?styles.calWdMark:''}`}
              onClick={()=>!past&&onDate(ds)}>{d}</div>
          )
        })}
        {Array.from({length:(7-(first+dim)%7)%7},(_,i) => (
          <div key={'n'+i} className={`${styles.calDay} ${styles.calOther}`}>{i+1}</div>
        ))}
      </div>
      {(selDates.size>0||selWeekdays.size>0) && (
        <div className={styles.calSum}>
          <div className={styles.calSumLabel}>{lang==='ja'?'選択中':'선택됨'}</div>
          <div className={styles.chipRow}>
            {[...selWeekdays].sort().map(w=><span key={w} className={`${styles.chip} ${styles.chipBlue}`}>매주 {WD[w]}</span>)}
            {[...selDates].sort().map(ds=>{ const [,m,d]=ds.split('-'); const w=new Date(+ds.split('-')[0],+m-1,+d).getDay(); return <span key={ds} className={`${styles.chip} ${w===0?styles.chipRed:w===6?styles.chipBlue:styles.chipTeal}`}>{m}/{d}({WD[w]})</span> })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko')
  const [view, setView] = useState<AppView>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState<Step>('emoji')
  const [matchDone, setMatchDone] = useState(false)
  const [selCarer, setSelCarer] = useState<typeof MOCK[0]|null>(null)
  const [mapCarer, setMapCarer] = useState<any>(null)
  const [stars, setStars] = useState(0)
  const [reviewDone, setReviewDone] = useState(false)
  const [notes, setNotes] = useState(['🦊 하늘여우님과 매칭이 완료됐습니다!','케어 포인트 +100P 적립!','새 리뷰 ★★★★★','신원 인증 완료 ✓'])
  const [pts, setPts] = useState(850)
  const [filter, setFilter] = useState('all')
  const [profile, setProfile] = useState<Profile>({ emoji:'🧑‍⚕️', nickname:'', role:'돌봄 파트너', lang:'한국어', selDates:new Set(), selWeekdays:new Set(), selTimes:new Set() })

  const t = content[lang]
  const TIMES = lang==='ja' ? TIMES_JA : TIMES_KO
  const SPECS = lang==='ja' ? SPECS_JA : SPECS_KO

  const onDate = useCallback((d:string) => setProfile(p=>{ const s=new Set(p.selDates); s.has(d)?s.delete(d):s.add(d); return {...p,selDates:s} }), [])
  const onWd = useCallback((w:number) => setProfile(p=>{ const s=new Set(p.selWeekdays); s.has(w)?s.delete(w):s.add(w); return {...p,selWeekdays:s} }), [])
  const onTime = (t:string) => setProfile(p=>{ const s=new Set(p.selTimes); s.has(t)?s.delete(t):s.add(t); return {...p,selTimes:s} })

  const filtered = carers.filter(c=>c.filters.includes(filter))
  const go = (v:AppView) => { setView(v); setMenuOpen(false) }

  return (
    <div className={lang==='ja'?`${styles.root} ${styles.rootJa}`:styles.root}>

      <nav className={styles.nav}>
        <a className={styles.logo} onClick={()=>go('home')} style={{cursor:'pointer'}}>Care<span>Match</span></a>
        <div className={`${styles.navLinks} ${menuOpen?styles.navOpen:''}`}>
          {(['register','match','map','reputation','notify'] as AppView[]).map((v,i) => (
            <a key={v} onClick={()=>go(v)} style={{cursor:'pointer'}}>{[t.nav.find,t.nav.register,lang==='ja'?'地図':'지도',t.nav.community,t.nav.about][i]}</a>
          ))}
        </div>
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button className={lang==='ko'?styles.langOn:styles.langOff} onClick={()=>{setLang('ko');setMenuOpen(false)}}>한국어</button>
            <button className={lang==='ja'?styles.langOn:styles.langOff} onClick={()=>{setLang('ja');setMenuOpen(false)}}>日本語</button>
          </div>
          <button className={styles.hamburger} onClick={()=>setMenuOpen(v=>!v)}><span/><span/><span/></button>
        </div>
      </nav>

      {view==='home' && <>
        <section className={styles.hero}>
          <div className={styles.heroBg}/><div className={styles.heroGrid}/>
          <div className={styles.heroInner}>
            <span className={styles.badge}>{t.badge}</span>
            <h1 className={styles.heroTitle}>{t.hero.title.map((l,i)=><span key={i}>{l}<br/></span>)}<em className={styles.heroSub}>{t.hero.sub}</em></h1>
            <p className={styles.heroDesc}>{t.hero.desc.split('\n').map((l,i)=><span key={i}>{l}{i<2&&<br/>}</span>)}</p>
            <div className={styles.heroCtaRow}>
              <button className={styles.btnPrimary} onClick={()=>go('register')}>{t.hero.cta1}</button>
              <button className={styles.btnOutline} onClick={()=>go('register')}>{t.hero.cta2}</button>
            </div>
            <div className={styles.heroFlags}><span>🇰🇷</span><span className={styles.flagDivider}>↔</span><span>🇯🇵</span></div>
          </div>
        </section>
        <div className={styles.statsBar}>
          {[{v:t.stats.count,l:t.stats.countLabel},{v:t.stats.satisfaction,l:t.stats.satisfactionLabel},{v:t.stats.region,l:t.stats.regionLabel},{v:t.stats.response,l:t.stats.responseLabel}].map((s,i)=>(
            <div key={i} className={styles.statItem}><strong>{s.v}</strong><span>{s.l}</span></div>
          ))}
        </div>
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{t.how.label}</p>
            <h2 className={styles.sectionTitle}>{t.how.title}</h2>
            <div className={styles.stepsGrid}>
              {t.how.steps.map((s,i)=>(
                <div key={i} className={styles.stepCard}><div className={styles.stepNum}>0{i+1}</div><div className={styles.stepIcon}>{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{t.cross.label}</p>
            <h2 className={styles.sectionTitleWhite}>{t.cross.title.split('\n').map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</h2>
            <p className={styles.crossDesc}>{t.cross.desc}</p>
            <div className={styles.scenarioGrid}>
              {t.cross.scenarios.map((s,i)=>(
                <div key={i} className={styles.scenarioCard}><div className={styles.scenarioFlag}>{s.flag}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{t.community.label}</p>
            <h2 className={styles.sectionTitle}>{t.community.title.split('\n').map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</h2>
            <p className={styles.communityDesc}>{t.community.desc}</p>
            <div className={styles.pointsGrid}>{t.community.points.map((p,i)=><div key={i} className={styles.pointItem}><div className={styles.pointDot}/><span>{p}</span></div>)}</div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.sectionTeal}`}>
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{t.safety.label}</p>
            <h2 className={styles.sectionTitleWhite}>{t.safety.title}</h2>
            <div className={styles.safetyGrid}>
              {t.safety.items.map((item,i)=>(
                <div key={i} className={styles.safetyCard}><div className={styles.safetyIcon}>{['🔒','🪪','⚖️','🤖'][i]}</div><h3>{item.title}</h3><p>{item.desc}</p></div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{t.mission.label}</p>
            <h2 className={styles.sectionTitle}>{t.mission.title}</h2>
            <div className={styles.biGrid}>
              <div className={styles.biCard}><div className={styles.biFlag}>🇰🇷 한국어</div><p>{t.mission.ko}</p></div>
              <div className={`${styles.biCard} ${styles.biCardJa}`}><div className={styles.biFlag}>🇯🇵 日本語</div><p>{t.mission.ja}</p></div>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>Care<span>Match</span></div>
            <p className={styles.footerTagline}>{t.footer.tagline}</p>
            <div className={styles.footerLinks}>
              <a href="https://github.com/kentkim0326/CareMatch" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>·</span><a href="#">{lang==='ko'?'기획안':'企画書'}</a>
              <span>·</span><a href="mailto:ictcoc@kfict.or.kr">{lang==='ko'?'문의':'お問い合わせ'}</a>
            </div>
            <p className={styles.footerCopy}>© 2026 CareMatch. Built with ❤️ for Korea &amp; Japan.</p>
          </div>
        </footer>
      </>}

      {view==='register' && (
        <div className={styles.appView}>
          <div className={styles.appHdr}><button className={styles.backBtn} onClick={()=>{go('home');setStep('emoji')}}>← {lang==='ja'?'ホーム':'홈'}</button><h2 className={styles.appTitle}>{lang==='ja'?'登録':'등록하기'}</h2><div className={styles.dots}>{(['emoji','schedule','verify','done'] as Step[]).map((s,i)=><div key={i} className={`${styles.dot} ${step===s?styles.dotOn:''}`}/>)}</div></div>
          <div className={styles.formWrap}>
            {step==='emoji' && <>
              <div className={styles.fCard}>
                <h3 className={styles.fTitle}>{lang==='ja'?'キャラクター選択':'내 캐릭터 선택'}</h3>
                <p className={styles.fDesc}>{lang==='ja'?'本名の代わりに絵文字で活動。個人情報完全保護！':'본명 대신 이모지 캐릭터로 활동. 개인정보 완전 보호!'}</p>
                <div className={styles.emojiGrid}>{EMOJIS.map(e=><div key={e} className={`${styles.emojiOpt} ${profile.emoji===e?styles.emojiSel:''}`} onClick={()=>setProfile(p=>({...p,emoji:e}))}>{e}</div>)}</div>
              </div>
              <div className={styles.fCard}>
                <h3 className={styles.fTitle}>{lang==='ja'?'基本情報':'기본 정보'}</h3>
                <div className={styles.fRow}><label>{lang==='ja'?'ニックネーム':'닉네임 (별명)'}</label><input type="text" placeholder={lang==='ja'?'例: あたたかいクマ':'예: 따뜻한곰돌이'} value={profile.nickname} onChange={e=>setProfile(p=>({...p,nickname:e.target.value}))}/></div>
                <div className={styles.fRow}><label>{lang==='ja'?'役割':'역할'}</label><select value={profile.role} onChange={e=>setProfile(p=>({...p,role:e.target.value}))}><option>{lang==='ja'?'介護パートナー':'돌봄 파트너'}</option><option>{lang==='ja'?'高齢者・ご家族':'노인·가족'}</option></select></div>
                <div className={styles.fRow}><label>{lang==='ja'?'活動言語':'활동 언어'}</label><select><option>한국어</option><option>日本語</option><option>한국어 + 日本語</option></select></div>
                <button className={styles.btnPrimary} style={{marginTop:'1rem'}} onClick={()=>setStep('schedule')}>{lang==='ja'?'次へ →':'다음 단계 →'}</button>
              </div>
            </>}
            {step==='schedule' && <>
              <div className={styles.fCard}>
                <h3 className={styles.fTitle}>{lang==='ja'?'スケジュール設定':'가능한 일정 선택'}</h3>
                <p className={styles.fDesc}>{lang==='ja'?'曜日クリック=毎週繰り返し、日付クリック=特定日':'요일 클릭 = 매주 반복 · 날짜 클릭 = 특정 날짜'}</p>
                <Calendar selDates={profile.selDates} selWeekdays={profile.selWeekdays} onDate={onDate} onWd={onWd} lang={lang}/>
              </div>
              <div className={styles.fCard}>
                <h3 className={styles.fTitle}>{lang==='ja'?'可能な時間帯':'가능한 시간대'}</h3>
                <div className={styles.slotGrid}>{TIMES.map(t=><div key={t} className={`${styles.slot} ${profile.selTimes.has(t)?styles.slotOn:''}`} onClick={()=>onTime(t)}>{t}</div>)}</div>
                <h3 className={styles.fTitle} style={{marginTop:'1.2rem'}}>{lang==='ja'?'専門分野':'전문 분야'}</h3>
                <div className={styles.slotGrid}>{SPECS.map(s=><div key={s} className={`${styles.slot} ${profile.selTimes.has(s)?styles.slotOn:''}`} onClick={()=>onTime(s)}>{s}</div>)}</div>
                <div className={styles.btnRow}><button className={styles.btnOutline} onClick={()=>setStep('emoji')}>{lang==='ja'?'← 戻る':'← 이전'}</button><button className={styles.btnPrimary} onClick={()=>setStep('verify')}>{lang==='ja'?'次へ →':'다음 →'}</button></div>
              </div>
            </>}
            {step==='verify' && (
              <div className={styles.fCard}>
                <h3 className={styles.fTitle}>{lang==='ja'?'本人確認':'신원 인증'}</h3>
                <div className={styles.infoBox}>🔒 {lang==='ja'?'本名・写真は絶対非公開。内部検証のみに使用。':'본명·사진은 절대 비공개. 내부 검증에만 사용.'}</div>
                <div className={styles.fRow}><label>{lang==='ja'?'身分証':'신분증'}</label><select><option>{lang==='ja'?'運転免許証':'주민등록증'}</option><option>{lang==='ja'?'パスポート':'여권'}</option><option>在留カード</option></select></div>
                <div className={styles.fRow}><label>{lang==='ja'?'犯罪歴照会':'범죄경력조회'}</label><select><option>{lang==='ja'?'同意します（必須）':'동의합니다 (필수)'}</option></select></div>
                <div className={styles.btnRow}><button className={styles.btnOutline} onClick={()=>setStep('schedule')}>← {lang==='ja'?'戻る':'이전'}</button><button className={styles.btnPrimary} onClick={()=>{setStep('done');setNotes(n=>[`${profile.emoji} ${profile.nickname||'새멤버'} 등록 완료!`,...n])}}>{lang==='ja'?'登録完了！':'등록 완료!'}</button></div>
              </div>
            )}
            {step==='done' && (
              <div className={styles.doneWrap}>
                <div className={styles.doneCard}>
                  <div className={styles.doneEmoji}>{profile.emoji}</div>
                  <h3>{profile.nickname||(lang==='ja'?'新しいメンバー':'새로운 멤버')}</h3>
                  <p>{lang==='ja'?'登録完了！AIマッチングを開始します。':'등록 완료! AI 매칭을 시작합니다.'}</p>
                  <div className={styles.ptsBadge}><span>{lang==='ja'?'ケアポイント':'케어 포인트'}</span><strong>50 P <em>{lang==='ja'?'登録ボーナス':'가입 보너스'}!</em></strong></div>
                  <button className={styles.btnPrimary} onClick={()=>go('match')}>{lang==='ja'?'マッチング開始 →':'매칭 시작하기 →'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view==='match' && (
        <div className={styles.appView}>
          <div className={styles.appHdr}><button className={styles.backBtn} onClick={()=>go('home')}>← {lang==='ja'?'ホーム':'홈'}</button><h2 className={styles.appTitle}>{lang==='ja'?'AIマッチング':'AI 매칭'}</h2></div>
          <div className={styles.formWrap}>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'希望日程':'원하는 일정'}</h3>
              <Calendar selDates={profile.selDates} selWeekdays={profile.selWeekdays} onDate={onDate} onWd={onWd} lang={lang}/>
              <h3 className={styles.fTitle} style={{marginTop:'1rem'}}>{lang==='ja'?'希望時間帯':'원하는 시간대'}</h3>
              <div className={styles.slotGrid}>{TIMES.map(t=><div key={t} className={`${styles.slot} ${profile.selTimes.has(t)?styles.slotOn:''}`} onClick={()=>onTime(t)}>{t}</div>)}</div>
              <div className={styles.filterRow}>{(lang==='ko'?['전체','치매 전문','야간 가능','이중언어']:['すべて','認知症専門','夜間可','バイリンガル']).map((f,i)=><button key={i} className={filter===FILTER_KEYS[i]?styles.filterOn:styles.filterBtn} onClick={()=>setFilter(FILTER_KEYS[i])}>{f}</button>)}</div>
              <button className={styles.btnPrimary} onClick={()=>setMatchDone(true)}>{lang==='ja'?'🤖 AIマッチング開始':'🤖 AI 매칭 시작'}</button>
            </div>
            {matchDone && <div className={styles.fCard}>
              <div className={styles.successBanner}>🎉 {lang==='ja'?`${filtered.length}名発見！`:`${filtered.length}명 매칭!`}</div>
              {filtered.map(c=>(
                <div key={c.id} className={styles.matchCard} onClick={()=>setSelCarer(MOCK.find(m=>m.score===c.score)||MOCK[0])}>
                  <div className={styles.carerAvatar} style={{background:c.color}}>{c.emoji}</div>
                  <div className={styles.carerInfo}>
                    <div className={styles.carerName}>{lang==='ko'?c.name.ko:c.name.ja}</div>
                    <div className={styles.carerSub}>{lang==='ko'?c.sub.ko:c.sub.ja}</div>
                    <div className={styles.carerTags}>{c.tags.map((tag,i)=><span key={i} className={styles.tag}>{tag}</span>)}</div>
                  </div>
                  <div className={styles.matchScore}>{c.score}%</div>
                </div>
              ))}
            </div>}
            {selCarer && <div className={styles.fCard}>
              <div style={{textAlign:'center',marginBottom:'1rem'}}>
                <div style={{fontSize:'3rem'}}>{selCarer.emoji}</div>
                <h3 style={{fontSize:'16px',fontWeight:500,color:'var(--text)'}}>{selCarer.nick}</h3>
                <p style={{fontSize:'12px',color:'var(--muted)'}}>{selCarer.sub}</p>
              </div>
              <div className={styles.repBars}>
                {[['신뢰도','95'],['친절도','92'],['전문성','88'],['시간약속','98']].map(([l,v])=>(
                  <div key={l} className={styles.repBar}><span className={styles.repLabel}>{l}</span><div className={styles.barBg}><div className={styles.barFill} style={{width:v+'%'}}/></div><span className={styles.repVal}>{(parseInt(v)/10).toFixed(1)}</span></div>
                ))}
              </div>
              <div className={styles.infoBox}>🔒 {lang==='ja'?'本名・連絡先はマッチング後に暗号化チャンネルでのみ共有':'본명·연락처는 매칭 확정 후 암호화 채널로만 공유'}</div>
              <div className={styles.btnRow}><button className={styles.btnOutline} onClick={()=>setSelCarer(null)}>{lang==='ja'?'閉じる':'닫기'}</button><button className={styles.btnPrimary} onClick={()=>{setNotes(n=>[`${selCarer.emoji} ${selCarer.nick} 매칭 요청 전송!`,...n]);setSelCarer(null);go('notify')}}>{lang==='ja'?'マッチングリクエスト':'매칭 요청 보내기'}</button></div>
            </div>}
          </div>
        </div>
      )}

      
      {view==='map' && (
        <div className={styles.appView}>
          <div className={styles.appHdr}>
            <button className={styles.backBtn} onClick={()=>go('home')}>← {lang==='ja'?'ホーム':'홈'}</button>
            <h2 className={styles.appTitle}>{lang==='ja'?'地図で探す':'지도에서 찾기'}</h2>
          </div>
          <div className={styles.formWrap}>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'🗺️ 서울·오사카 돌봄사 지도':'🗺️ 서울 · 오사카 돌봄사 지도'}</h3>
              <p className={styles.fDesc}>{lang==='ja'?'マーカーをクリックすると詳細が表示されます。赤=ソウル、青緑=大阪':'마커를 클릭하면 상세 정보가 표시됩니다. 빨강=서울, 청록=오사카'}</p>
              <div style={{display:'flex',gap:'12px',marginBottom:'12px',flexWrap:'wrap'}}>
                <span style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',color:'var(--muted)'}}>
                  <span style={{width:'12px',height:'12px',borderRadius:'50%',background:'#e94560',display:'inline-block'}}/>
                  {lang==='ja'?'ソウル':'서울'} ({lang==='ja'?'5名':'5명'})
                </span>
                <span style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'12px',color:'var(--muted)'}}>
                  <span style={{width:'12px',height:'12px',borderRadius:'50%',background:'#14b8a6',display:'inline-block'}}/>
                  {lang==='ja'?'大阪':'오사카'} ({lang==='ja'?'3名':'3명'})
                </span>
              </div>
              <MapView lang={lang} onSelect={(c:any)=>setMapCarer(c)} />
            </div>
            {mapCarer && (
              <div className={styles.fCard}>
                <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'1rem'}}>
                  <div style={{fontSize:'3rem'}}>{mapCarer.emoji}</div>
                  <div>
                    <h3 style={{fontSize:'16px',fontWeight:500,color:'var(--text)',marginBottom:'3px'}}>{mapCarer.nick}</h3>
                    <p style={{fontSize:'13px',color:'var(--muted)'}}>{mapCarer.sub}</p>
                    <div style={{display:'flex',gap:'5px',marginTop:'5px',flexWrap:'wrap'}}>
                      {mapCarer.tags.map((tag:string,i:number)=><span key={i} className={styles.tag}>{tag}</span>)}
                    </div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:'1.5rem',fontWeight:700,color:mapCarer.city==='seoul'?'#e94560':'#14b8a6'}}>{mapCarer.score}%</div>
                </div>
                <div className={styles.repBars}>
                  {[['신뢰도','95'],['친절도','92'],['전문성','88'],['시간약속','97']].map(([l,v])=>(
                    <div key={l} className={styles.repBar}><span className={styles.repLabel}>{l}</span><div className={styles.barBg}><div className={styles.barFill} style={{width:v+'%'}}/></div><span className={styles.repVal}>{(parseInt(v)/10).toFixed(1)}</span></div>
                  ))}
                </div>
                <div className={styles.infoBox}>
                  🗺️ {mapCarer.city==='seoul'?(lang==='ja'?'ソウル担当エリア':'서울 담당 지역'):(lang==='ja'?'大阪担当エリア':'오사카 담당 지역')} · 🔒 {lang==='ja'?'本名非公開':'본명 비공개'}
                </div>
                <div className={styles.btnRow}>
                  <button className={styles.btnOutline} onClick={()=>setMapCarer(null)}>{lang==='ja'?'閉じる':'닫기'}</button>
                  <button className={styles.btnPrimary} onClick={()=>{setNotes((n:string[])=>[`${mapCarer.emoji} ${mapCarer.nick} 매칭 요청 전송!`,...n]);setMapCarer(null);go('notify')}}>{lang==='ja'?'マッチングリクエスト':'매칭 요청 보내기'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view==='reputation' && (
        <div className={styles.appView}>
          <div className={styles.appHdr}><button className={styles.backBtn} onClick={()=>go('home')}>← {lang==='ja'?'ホーム':'홈'}</button><h2 className={styles.appTitle}>{lang==='ja'?'評判照会':'평판 조회'}</h2></div>
          <div className={styles.formWrap}>
            <div className={styles.fCard}>
              <div className={styles.repProfile}>
                <div style={{fontSize:'3.5rem'}}>🦊</div>
                <div><h3 style={{fontSize:'16px',fontWeight:500,color:'var(--text)'}}>하늘여우</h3><p style={{fontSize:'12px',color:'var(--muted)'}}>{lang==='ja'?'登録2年 · 142回':'등록 2년 · 142회'}</p><div className={styles.stars}>★★★★★</div><p style={{fontSize:'12px',color:'var(--muted)'}}>4.9 / 5.0 (87{lang==='ja'?'件':'개'})</p></div>
                <div className={styles.repBadges}><span className={`${styles.bdg} ${styles.bdgGreen}`}>✓ {lang==='ja'?'本人確認':'신원인증'}</span><span className={`${styles.bdg} ${styles.bdgBlue}`}>✓ {lang==='ja'?'犯罪歴':'범죄조회'}</span></div>
              </div>
              <div className={styles.repBars} style={{marginTop:'1rem'}}>
                {[['신뢰도','96'],['친절도','94'],['전문성','90'],['시간약속','98'],['언어소통','92']].map(([l,v])=>(
                  <div key={l} className={styles.repBar}><span className={styles.repLabel}>{l}</span><div className={styles.barBg}><div className={styles.barFill} style={{width:v+'%'}}/></div><span className={styles.repVal}>{(parseInt(v)/10).toFixed(1)}</span></div>
                ))}
              </div>
            </div>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'最近のレビュー':'최근 리뷰'}</h3>
              {[{e:'🐻',n:'따뜻한곰돌이',s:'★★★★★',t:'어머니 치매 케어를 맡겨봤는데 정말 전문적이었어요. 일본어로도 소통이 됐고 믿고 맡길 수 있는 분!'},{e:'🦝',n:'너구리아빠',s:'★★★★☆',t:'시간 약속을 정말 잘 지켜요. 父が喜んでいました。またお願いしたいです。'}].map((r,i)=>(
                <div key={i} className={styles.review}><div className={styles.reviewTop}><span style={{fontSize:'1.2rem'}}>{r.e}</span><span className={styles.reviewNick}>{r.n}</span><span className={styles.stars}>{r.s}</span></div><p className={styles.reviewText}>{r.t}</p></div>
              ))}
            </div>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'レビュー投稿':'리뷰 작성'} (+50P)</h3>
              <div className={styles.starRow}>{[1,2,3,4,5].map(n=><span key={n} className={styles.starBtn} style={{color:n<=stars?'#f59e0b':'var(--muted)'}} onClick={()=>setStars(n)}>{n<=stars?'★':'☆'}</span>)}</div>
              <div className={styles.fRow}><textarea rows={3} placeholder={lang==='ja'?'正直な感想。ニックネームのみ表示。':'솔직한 후기. 닉네임으로만 표시됩니다.'}/></div>
              <button className={styles.btnPrimary} onClick={()=>{setPts(p=>p+50);setReviewDone(true)}}>{reviewDone?(lang==='ja'?'✓ 投稿完了！':'✓ 완료!'):(lang==='ja'?'レビュー投稿 (+50P)':'리뷰 등록 (+50P)')}</button>
            </div>
          </div>
        </div>
      )}

      {view==='notify' && (
        <div className={styles.appView}>
          <div className={styles.appHdr}><button className={styles.backBtn} onClick={()=>go('home')}>← {lang==='ja'?'ホーム':'홈'}</button><h2 className={styles.appTitle}>{lang==='ja'?'通知センター':'알림 센터'}</h2></div>
          <div className={styles.formWrap}>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'通知':'알림'}</h3>
              {notes.map((n,i)=><div key={i} className={styles.notifyItem}><div className={styles.notifyDot} style={{background:i===0?'#e94560':i===1?'#14b8a6':'#378add'}}/><span className={styles.notifyText}>{n}</span></div>)}
            </div>
            <div className={styles.fCard}>
              <h3 className={styles.fTitle}>{lang==='ja'?'ケアポイント':'케어 포인트'}</h3>
              <div className={styles.ptsGrid}>
                <div className={styles.ptsStat}><span>{lang==='ja'?'累計':'누적'}</span><strong>{pts} P</strong></div>
                <div className={styles.ptsStat}><span>{lang==='ja'?'今月':'이번 달'}</span><strong>+350 P</strong></div>
                <div className={styles.ptsStat}><span>{lang==='ja'?'活動':'활동'}</span><strong>8 {lang==='ja'?'回':'회'}</strong></div>
                <div className={styles.ptsStat}><span>{lang==='ja'?'認証書':'인증서'}</span><strong style={{color:'#14b8a6'}}>{lang==='ja'?'発行可':'발급가능'}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
