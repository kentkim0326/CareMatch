'use client';

import { useState } from 'react';
import styles from './health.module.css';

type Lang = 'ko' | 'ja';
type Severity = 'low' | 'mid' | 'high';

interface AnalysisResult {
  severity: Severity;
  summary: string;
  actions: { icon: string; title: string; desc: string }[];
  caregiverNote: string;
}

const T = {
  ko: {
    nav: '케어헬스',
    steps: ['증상 선택', '기간', '복용약', '불편함 정도'],
    s1q: '어디가 불편하신가요?',
    s1sub: '해당하는 증상을 모두 선택하세요',
    s2q: '언제부터 그러셨나요?',
    s3q: '현재 복용 중인 약이 있나요?',
    s4q: '얼마나 불편하신가요?',
    next: '다음',
    analyze: 'AI 분석 받기',
    analyzing: 'AI가 분석 중입니다...',
    analyzingSub: '증상 패턴을 검토하고 있어요',
    s1chips: ['두통', '어지러움', '가슴 답답함', '복통', '관절 통증', '식욕 저하', '기침', '호흡 곤란', '발열', '피로감', '소화 불량', '수면 장애'],
    s2chips: ['오늘 처음', '2~3일 전', '1주일 이상', '한 달 이상'],
    s3chips: ['없음', '혈압약', '당뇨약', '심장약', '진통제', '기타'],
    s4chips: ['약간 불편', '꽤 불편', '매우 불편', '참기 힘듦'],
    summaryLabel: 'AI 분석 요약',
    actionsLabel: '권장 행동',
    caregiverLabel: '돌봄사에게 전달됨',
    retry: '다시 체크하기',
    sevLabels: { low: '경증 — 생활 관리 권장', mid: '중등증 — 진료 권장', high: '중증 — 빠른 진료 필요' },
  },
  ja: {
    nav: 'ケアヘルス',
    steps: ['症状選択', '期間', '服薬', 'つらさの程度'],
    s1q: 'どこか具合が悪いですか?',
    s1sub: '当てはまる症状をすべて選んでください',
    s2q: 'いつ頃から始まりましたか?',
    s3q: '現在、お薬を飲んでいますか?',
    s4q: 'どのくらいつらいですか?',
    next: '次へ',
    analyze: 'AI分析を受ける',
    analyzing: 'AIが分析中です...',
    analyzingSub: '症状パターンを確認しています',
    s1chips: ['頭痛', 'めまい', '胸の圧迫感', '腹痛', '関節痛', '食欲不振', '咳', '息切れ', '発熱', '疲労感', '消化不良', '不眠'],
    s2chips: ['今日初めて', '2〜3日前', '1週間以上', '1ヶ月以上'],
    s3chips: ['なし', '血圧の薬', '糖尿病の薬', '心臓の薬', '鎮痛剤', 'その他'],
    s4chips: ['少し不快', 'かなり不快', '非常に不快', '我慢できない'],
    summaryLabel: 'AI分析サマリー',
    actionsLabel: '推奨アクション',
    caregiverLabel: '介護士に通知済み',
    retry: 'もう一度チェック',
    sevLabels: { low: '軽症 — 生活管理を推奨', mid: '中等症 — 受診を推奨', high: '重症 — 早急な受診が必要' },
  },
};

export default function HealthPage() {
  const [lang, setLang] = useState<Lang>('ko');
  const [step, setStep] = useState(0);
  const [sel1, setSel1] = useState<string[]>([]);
  const [sel2, setSel2] = useState('');
  const [sel3, setSel3] = useState('');
  const [sel4, setSel4] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const t = T[lang];
  const progress = Math.round(((step + 1) / 5) * 100);

  const toggleSel1 = (v: string) =>
    setSel1(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const analyze = async () => {
    setLoading(true);
    setStep(4);
    try {
      const prompt = lang === 'ko'
        ? `노인 환자 증상 분석 요청입니다.\n증상: ${sel1.join(', ')}\n기간: ${sel2}\n복용약: ${sel3}\n불편함 정도: ${sel4}\n\n다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):\n{"severity":"low"|"mid"|"high","summary":"2문장 이내 분석","actions":[{"icon":"이모지","title":"행동명","desc":"간단 설명"}],"caregiverNote":"돌봄사에게 전달할 한 문장"}`
        : `高齢者患者の症状分析をお願いします。\n症状: ${sel1.join(', ')}\n期間: ${sel2}\n服薬: ${sel3}\nつらさ: ${sel4}\n\n以下のJSON形式のみで回答してください:\n{"severity":"low"|"mid"|"high","summary":"2文以内の分析","actions":[{"icon":"絵文字","title":"アクション名","desc":"簡単な説明"}],"caregiverNote":"介護士への一文メモ"}`;

      const res = await fetch('/api/health-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // fallback
      setResult(getFallback(sel1, sel2, sel4, lang));
    } finally {
      setLoading(false);
      setStep(5);
    }
  };

  const reset = () => {
    setStep(0); setSel1([]); setSel2(''); setSel3(''); setSel4(''); setResult(null);
  };

  return (
    <div className={styles.container}>
      {/* Lang toggle */}
      <div className={styles.langRow}>
        <button className={`${styles.langBtn} ${lang === 'ko' ? styles.langOn : ''}`} onClick={() => setLang('ko')}>한국어</button>
        <button className={`${styles.langBtn} ${lang === 'ja' ? styles.langOn : ''}`} onClick={() => setLang('ja')}>日本語</button>
      </div>

      {/* Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className={styles.card}>
          <p className={styles.stepLabel}>1 / 4</p>
          <h2 className={styles.qTitle}>{t.s1q}</h2>
          <p className={styles.qSub}>{t.s1sub}</p>
          <div className={styles.chipGrid}>
            {t.s1chips.map(c => (
              <button key={c} className={`${styles.chip} ${sel1.includes(c) ? styles.chipSel : ''}`} onClick={() => toggleSel1(c)}>{c}</button>
            ))}
          </div>
          <button className={styles.btnPrimary} disabled={sel1.length === 0} onClick={() => setStep(1)}>{t.next}</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className={styles.card}>
          <p className={styles.stepLabel}>2 / 4</p>
          <h2 className={styles.qTitle}>{t.s2q}</h2>
          <div className={styles.chipGrid}>
            {t.s2chips.map(c => (
              <button key={c} className={`${styles.chip} ${sel2 === c ? styles.chipSel : ''}`} onClick={() => setSel2(c)}>{c}</button>
            ))}
          </div>
          <button className={styles.btnPrimary} disabled={!sel2} onClick={() => setStep(2)}>{t.next}</button>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div className={styles.card}>
          <p className={styles.stepLabel}>3 / 4</p>
          <h2 className={styles.qTitle}>{t.s3q}</h2>
          <div className={styles.chipGrid}>
            {t.s3chips.map(c => (
              <button key={c} className={`${styles.chip} ${sel3 === c ? styles.chipSel : ''}`} onClick={() => setSel3(c)}>{c}</button>
            ))}
          </div>
          <button className={styles.btnPrimary} disabled={!sel3} onClick={() => setStep(3)}>{t.next}</button>
        </div>
      )}

      {/* Step 4 */}
      {step === 3 && (
        <div className={styles.card}>
          <p className={styles.stepLabel}>4 / 4</p>
          <h2 className={styles.qTitle}>{t.s4q}</h2>
          <div className={styles.chipGrid}>
            {t.s4chips.map(c => (
              <button key={c} className={`${styles.chip} ${sel4 === c ? styles.chipSel : ''}`} onClick={() => setSel4(c)}>{c}</button>
            ))}
          </div>
          <button className={styles.btnPrimary} disabled={!sel4} onClick={analyze}>{t.analyze}</button>
        </div>
      )}

      {/* Loading */}
      {step === 4 && loading && (
        <div className={`${styles.card} ${styles.centerCard}`}>
          <h2 className={styles.qTitle}>{t.analyzing}</h2>
          <p className={styles.qSub}>{t.analyzingSub}</p>
          <div className={styles.dots}>
            <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
          </div>
        </div>
      )}

      {/* Result */}
      {step === 5 && result && (
        <div className={styles.card}>
          <span className={`${styles.sevBadge} ${styles[`sev_${result.severity}`]}`}>
            {t.sevLabels[result.severity]}
          </span>
          <p className={styles.resultLabel}>{t.summaryLabel}</p>
          <p className={styles.resultText}>{result.summary}</p>
          <div className={styles.divider} />
          <p className={styles.resultLabel}>{t.actionsLabel}</p>
          {result.actions.map((a, i) => (
            <div key={i} className={styles.actionCard}>
              <span className={styles.actionIcon}>{a.icon}</span>
              <div>
                <p className={styles.actionTitle}>{a.title}</p>
                <p className={styles.actionDesc}>{a.desc}</p>
              </div>
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.caregiverNote}>
            <p className={styles.caregiverNoteTitle}>{t.caregiverLabel}</p>
            <p className={styles.caregiverNoteBody}>{result.caregiverNote}</p>
          </div>
          <button className={styles.btnSecondary} onClick={reset}>{t.retry}</button>
        </div>
      )}
    </div>
  );
}

function getFallback(symptoms: string[], duration: string, pain: string, lang: Lang): AnalysisResult {
  const severe = ['가슴 답답함', '호흡 곤란', '胸の圧迫感', '息切れ'];
  const hasSevere = symptoms.some(s => severe.includes(s));
  const highPain = pain.includes('매우') || pain.includes('참기') || pain.includes('非常') || pain.includes('我慢');
  const longDuration = duration.includes('1주일') || duration.includes('한 달') || duration.includes('1週間') || duration.includes('1ヶ月');

  let sev: Severity = 'low';
  if (hasSevere || (highPain && longDuration)) sev = 'high';
  else if (symptoms.length >= 3 || longDuration || highPain) sev = 'mid';

  const fallbacks = {
    ko: {
      low: { summary: '선택하신 증상들은 일상적인 피로나 가벼운 불편함으로 보입니다. 수분 섭취와 충분한 휴식을 권장드려요.', actions: [{ icon: '💧', title: '수분 섭취', desc: '하루 1.5L 이상' }, { icon: '🛏️', title: '충분한 휴식', desc: '무리한 활동 자제' }, { icon: '📋', title: '증상 기록', desc: '악화 시 돌봄사에게 알리기' }], caregiverNote: '어르신이 가벼운 불편함을 호소하고 있습니다. 방문 시 확인 부탁드립니다.' },
      mid: { summary: '복수의 증상이 며칠째 지속되고 있어 가까운 의원 방문을 권장합니다.', actions: [{ icon: '🏥', title: '가까운 의원 방문', desc: '2일 내 진료 권장' }, { icon: '📞', title: '원격 상담 연결', desc: 'CareMatch 제휴 의사 화상 상담' }, { icon: '💊', title: '복용약 확인', desc: '약과 증상 연관성 확인' }], caregiverNote: '증상이 지속되고 있습니다. 가까운 시일 내 진료 동행을 검토해주세요.' },
      high: { summary: '복합 증상과 높은 불편도가 감지되었습니다. 오늘 안에 진료를 받으시는 것이 좋겠습니다.', actions: [{ icon: '🚨', title: '오늘 진료 필요', desc: '응급실 또는 당일 진료' }, { icon: '📱', title: '돌봄사 즉시 연락', desc: '상태 공유 완료' }, { icon: '🚑', title: '119 연결', desc: '증상 악화 시 즉시 신고' }], caregiverNote: '[긴급] 복합 증상 감지. 즉시 연락 바랍니다.' },
    },
    ja: {
      low: { summary: '選択された症状は日常的な疲労や軽い不調と考えられます。水分補給と十分な休息をお勧めします。', actions: [{ icon: '💧', title: '水分補給', desc: '1日1.5L以上' }, { icon: '🛏️', title: '十分な休息', desc: '無理な活動を控える' }, { icon: '📋', title: '症状を記録', desc: '悪化したら介護士に知らせる' }], caregiverNote: 'ご利用者様が軽い不快感を訴えています。訪問時にご確認ください。' },
      mid: { summary: '複数の症状が数日続いているため、近くのクリニックへの受診をお勧めします。', actions: [{ icon: '🏥', title: 'クリニックへ受診', desc: '2日以内の受診を推奨' }, { icon: '📞', title: 'オンライン相談', desc: 'CareMatch提携医師とビデオ相談' }, { icon: '💊', title: '服薬確認', desc: '現在の薬と症状の関連を確認' }], caregiverNote: '症状が続いています。近日中の受診同行をご検討ください。' },
      high: { summary: '複合症状と高い不快度が検出されました。本日中に受診されることをお勧めします。', actions: [{ icon: '🚨', title: '本日受診が必要', desc: '救急または当日診察' }, { icon: '📱', title: '介護士へ即時連絡', desc: '状態を共有済み' }, { icon: '🚑', title: '119番通報', desc: '症状悪化時は直ちに通報' }], caregiverNote: '【緊急】複合症状を検知。至急ご連絡ください。' },
    },
  };

  return fallbacks[lang][sev] as AnalysisResult & { severity: Severity };
}
