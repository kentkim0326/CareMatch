'use client'
import { useState } from 'react'
import { content, carers, type Lang } from './i18n'
import styles from './page.module.css'

const FILTER_KEYS = ['all', 'dementia', 'night', 'bilingual']

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko')
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[lang]
  const filtered = carers.filter(c => c.filters.includes(filter))

  return (
    <div className={lang === 'ja' ? `${styles.root} ${styles.rootJa}` : styles.root}>

      {/* ── NAV ─────────────────────────────── */}
      <nav className={styles.nav}>
        <a href="#" className={styles.logo}>Care<span>Match</span></a>
        <div className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#how" onClick={() => setMenuOpen(false)}>{t.nav.find}</a>
          <a href="#match" onClick={() => setMenuOpen(false)}>{t.nav.register}</a>
          <a href="#community" onClick={() => setMenuOpen(false)}>{t.nav.community}</a>
          <a href="#mission" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
        </div>
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button className={lang === 'ko' ? styles.langOn : styles.langOff} onClick={() => { setLang('ko'); setMenuOpen(false) }}>한국어</button>
            <button className={lang === 'ja' ? styles.langOn : styles.langOff} onClick={() => { setLang('ja'); setMenuOpen(false) }}>日本語</button>
          </div>
          <button className={styles.hamburger} onClick={() => setMenuOpen(v => !v)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <span className={styles.badge}>{t.badge}</span>
          <h1 className={styles.heroTitle}>
            {t.hero.title.map((line, i) => <span key={i}>{line}<br /></span>)}
            <em className={styles.heroSub}>{t.hero.sub}</em>
          </h1>
          <p className={styles.heroDesc}>
            {t.hero.desc.split('\n').map((l, i) => <span key={i}>{l}{i < 2 && <br />}</span>)}
          </p>
          <div className={styles.heroCtaRow}>
            <button className={styles.btnPrimary}>{t.hero.cta1}</button>
            <button className={styles.btnOutline}>{t.hero.cta2}</button>
          </div>
          <div className={styles.heroFlags}>
            <span>🇰🇷</span><span className={styles.flagDivider}>↔</span><span>🇯🇵</span>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      <div className={styles.statsBar}>
        {[
          { v: t.stats.count, l: t.stats.countLabel },
          { v: t.stats.satisfaction, l: t.stats.satisfactionLabel },
          { v: t.stats.region, l: t.stats.regionLabel },
          { v: t.stats.response, l: t.stats.responseLabel },
        ].map((s, i) => (
          <div key={i} className={styles.statItem}>
            <strong>{s.v}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section id="how" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.how.label}</p>
          <h2 className={styles.sectionTitle}>{t.how.title}</h2>
          <div className={styles.stepsGrid}>
            {t.how.steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>0{i + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATCH DEMO ─────────────────────── */}
      <section id="match" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.match.label}</p>
          <h2 className={styles.sectionTitle}>{t.match.title}</h2>
          <div className={styles.matchBox}>
            <div className={styles.matchTop}>
              <span className={styles.matchLoc}>{t.match.location}</span>
              <span className={styles.matchCount}>{filtered.length}{lang === 'ko' ? '명 매칭됨' : '名マッチ済'}</span>
            </div>
            <div className={styles.filterRow}>
              {t.match.filters.map((f, i) => (
                <button
                  key={i}
                  className={filter === FILTER_KEYS[i] ? styles.filterOn : styles.filterBtn}
                  onClick={() => setFilter(FILTER_KEYS[i])}
                >{f}</button>
              ))}
            </div>
            <div className={styles.carerList}>
              {filtered.map(c => (
                <div key={c.id} className={styles.carerCard}>
                  <div className={styles.carerAvatar} style={{ background: c.color }}>{c.emoji}</div>
                  <div className={styles.carerInfo}>
                    <div className={styles.carerName}>{lang === 'ko' ? c.name.ko : c.name.ja}</div>
                    <div className={styles.carerSub}>{lang === 'ko' ? c.sub.ko : c.sub.ja}</div>
                    <div className={styles.carerTags}>{c.tags.map((tag, i) => <span key={i} className={styles.tag}>{tag}</span>)}</div>
                  </div>
                  <div className={styles.matchScore}>{c.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CROSS CULTURE ─────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.cross.label}</p>
          <h2 className={styles.sectionTitleWhite}>
            {t.cross.title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
          <p className={styles.crossDesc}>{t.cross.desc}</p>
          <div className={styles.scenarioGrid}>
            {t.cross.scenarios.map((s, i) => (
              <div key={i} className={styles.scenarioCard}>
                <div className={styles.scenarioFlag}>{s.flag}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY / POINTS ─────────────── */}
      <section id="community" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.community.label}</p>
          <h2 className={styles.sectionTitle}>
            {t.community.title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
          <p className={styles.communityDesc}>{t.community.desc}</p>
          <div className={styles.pointsGrid}>
            {t.community.points.map((point, i) => (
              <div key={i} className={styles.pointItem}>
                <div className={styles.pointDot} />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className={styles.pointVisual}>
            <div className={styles.pointCenter}>
              <div className={styles.pointCenterLabel}>{lang === 'ko' ? '케어\n포인트' : 'ケア\nポイント'}</div>
            </div>
            {[
              lang === 'ko' ? '채용 우대' : '採用優遇',
              lang === 'ko' ? '봉사 인증' : 'ボランティア認証',
              lang === 'ko' ? '입학 가산점' : '入学加点',
              lang === 'ko' ? '기업 ESG' : '企業ESG',
              lang === 'ko' ? '여행 지원' : '旅行支援',
              lang === 'ko' ? '커뮤니티' : 'コミュニティ',
            ].map((item, i) => (
              <div key={i} className={styles.pointOrbit} style={{ '--i': i, '--total': 6 } as React.CSSProperties}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ─────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionTeal}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.safety.label}</p>
          <h2 className={styles.sectionTitleWhite}>{t.safety.title}</h2>
          <div className={styles.safetyGrid}>
            {t.safety.items.map((item, i) => (
              <div key={i} className={styles.safetyCard}>
                <div className={styles.safetyIcon}>{['🔒', '🪪', '⚖️', '🤖'][i]}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / BILINGUAL ─────────────── */}
      <section id="mission" className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>{t.mission.label}</p>
          <h2 className={styles.sectionTitle}>{t.mission.title}</h2>
          <div className={styles.biGrid}>
            <div className={styles.biCard}>
              <div className={styles.biFlag}>🇰🇷 한국어</div>
              <p>{t.mission.ko}</p>
            </div>
            <div className={`${styles.biCard} ${styles.biCardJa}`}>
              <div className={styles.biFlag}>🇯🇵 日本語</div>
              <p>{t.mission.ja}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>Care<span>Match</span></div>
          <p className={styles.footerTagline}>{t.footer.tagline}</p>
          <div className={styles.footerLinks}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>·</span>
            <a href="#">{lang === 'ko' ? '기획안' : '企画書'}</a>
            <span>·</span>
            <a href="mailto:ictcoc@kfict.or.kr">{lang === 'ko' ? '문의' : 'お問い合わせ'}</a>
          </div>
          <p className={styles.footerCopy}>© 2026 CareMatch. Built with ❤️ for Korea & Japan.</p>
        </div>
      </footer>
    </div>
  )
}
