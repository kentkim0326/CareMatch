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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
