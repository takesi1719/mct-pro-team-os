# MCT Pro Team Coaching OS v6

팀 15명 + S/R 리그 혼합(3,5,6,7,8월) + 팀라이딩 + 웰니스 자동 + 채팅 코칭

## 기능
- 팀 대시보드 15명 CTL/TSB/HRV 자동
- 레이스 캘린더 편집 (날짜, S/R, 거리, 코스타입)
- 팀라이딩 일정 추가/편집/참석 체크, 자동 생성
- 개인 코칭: 슬라이더(주간시간, 최대시간, 강도, 피로도), 요일 체크박스 7개, S/R 토글, 파워프로필 입력, 채팅으로 조정
- 코스 분석: S/R 거리별 맞춤 전략
- Intervals.icu API 프록시: /api/intervals?athleteId=ID&endpoint=wellness|profile|events

## 배포
Vercel에서 Environment Variables에 INTERVALS_API_KEY 설정

## 업데이트
index.html만 교체하면 localStorage 데이터 유지됨. 버전 마이그레이션 내장.
