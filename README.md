# MCT Pro Team OS v8.0 FINAL COMPLETE

## 파일 구성
- index.html : 전체 프론트 (대시보드/레이스/팀라이딩/개인코칭/코스분석 전부 포함)
- api/intervals.js : Vercel 서버리스 - CommonJS 버전, 500 에러 fix
- vercel.json : /api/* 는 그대로, 나머지는 index.html로

## 배포
1. 이 폴더 그대로 GitHub takesi1719/mct-pro-team-os 에 덮어쓰기 (main 브랜치)
2. Vercel Settings > Environment Variables > INTERVALS_API_KEY 있는지 확인 (네 Intervals.icu API키)
3. 1분 후 https://mct-pro-team-os-enor.vercel.app/ 접속
4. F12 콘솔에서 localStorage.clear() 한번 실행 후 새로고침 (옛날 꼬인 데이터 제거)

## 기능
- + 선수 추가 (ID만 넣으면 FTP/몸무게/파워 자동) / 삭제 fix
- 새로고침 유지 (mct_v8_* 키)
- 웰니스 없는 라이더 공란 처리
- 파워 커브 자동 (5s/1min/5min/20min)
- FTP/몸무게 맘대로 안 바뀜 (100-600W, 35-120kg, diff 체크)
- 워크아웃 존2만 아님 + 리스케줄링 (못 타는 날 다음날로 이동)
- 레이스 캘린더 인라인 편집 / 팀라이딩 편집
- 개인 코칭 채팅 최적화 복구 + AI 워크아웃 생성기
- API 500 에러 fix (module.exports)

## 테스트
선수 추가 > Intervals ID i12345 (FTP 있는 선수) > FTP 비워두고 생성 > 자동으로 FTP 들어오는지 확인
