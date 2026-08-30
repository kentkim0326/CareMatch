import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareMatch | 한일 노인돌봄 매칭 플랫폼 / 日韓高齢者介護マッチング',
  description: '신뢰할 수 있는 돌봄 파트너를 연결하는 한일 공동 매칭 서비스 | 信頼できる介護パートナーをつなぐ日韓共同マッチングサービス',
  keywords: ['노인돌봄', '케어매칭', '돌봄서비스', '高齢者介護', 'ケアマッチング', '介護サービス', 'CareMatch'],
  openGraph: {
    title: 'CareMatch | 한일 노인돌봄 매칭',
    description: 'AI 기반 한일 노인돌봄 매칭 & 청년 크로스컬처 플랫폼',
    type: 'website',
  },
}

// 이 서비스는 아직 운영되지 않는다. 화면의 인물·숫자·후기는 전부 예시다.
// 그 사실을 모든 페이지 맨 위에 밝힌다 — 시안이 서비스인 척하지 않기 위해서다.
function DemoBanner() {
  return (
    <div style={{
      background: '#7c2d12', color: '#fed7aa',
      fontSize: '12.5px', lineHeight: 1.55,
      padding: '9px 16px', textAlign: 'center',
      borderBottom: '1px solid #9a3412',
    }}>
      <b style={{ color: '#fff' }}>시연용 화면입니다 / デモ画面です</b><br />
      아직 운영되지 않는 아이디어 제안 단계이며, 화면의 인물·숫자·후기는 모두 예시입니다.<br />
      まだ運営されていない企画段階で、画面の人物・数値・レビューはすべて例示です。
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body><DemoBanner />{children}</body>
    </html>
  )
}
