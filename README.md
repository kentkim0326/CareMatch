# CareMatch 🤝

**한일 노인돌봄 매칭 & 청년 크로스컬처 플랫폼**
**日韓高齢者介護マッチング & 青年クロスカルチャープラットフォーム**

> 2026 글로벌 피우다프로젝트 출품작 (수도권)


---

## 🚀 Vercel 배포 방법

### 1단계: GitHub 업로드

```bash
git init
git add .
git commit -m "feat: initial CareMatch landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carematch.git
git push -u origin main
```

### 2단계: Vercel 연결

1. [vercel.com](https://vercel.com) 접속 → **New Project**
2. GitHub 저장소 선택: `carematch`
3. Framework: **Next.js** (자동 감지)
4. **Deploy** 클릭

배포 완료 → `carematch.vercel.app` 자동 생성 🎉

---

## 💻 로컬 개발

```bash
npm install
npm run dev
# http://localhost:3000
```

---

## 📁 프로젝트 구조

```
carematch/
├── app/
│   ├── layout.tsx       # 루트 레이아웃 + 메타데이터
│   ├── page.tsx         # 메인 랜딩 페이지
│   ├── page.module.css  # 스타일
│   ├── globals.css      # 전역 CSS 변수
│   └── i18n.ts          # 한국어/일본어 콘텐츠
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 🌏 주요 기능

- **한국어 ↔ 일본어** 실시간 전환
- **AI 매칭 데모** (필터: 전체 / 치매 전문 / 야간 가능 / 이중언어)
- **케어 포인트 시스템** 시각화
- **크로스컬처 시나리오** 4가지
- **양방향 안전 시스템** 소개
- **반응형** 모바일 완전 지원

---

## 🏆 대회 정보

- **주최**: 과학기술정보통신부
- **주제**: 한국·일본 노인돌봄 문제 해결 ICT솔루션
- **신청 마감**: 2026년 5월 17일
- **수도권 접수**: ictcoc@kfict.or.kr

