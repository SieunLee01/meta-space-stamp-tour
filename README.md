# META SPACE — Enter the Next Space
QR 스탬프 투어용 졸전 웹사이트 프로토타입

## 핵심 구조
관람객이 각 전시 부스의 QR을 스캔하면 같은 웹사이트로 들어오되,
URL의 `?booth=01` 값으로 어떤 부스를 발견했는지 구분합니다.

예:
- `https://YOUR-DOMAIN.com/?booth=01`
- `https://YOUR-DOMAIN.com/?booth=02`
- `https://YOUR-DOMAIN.com/?booth=03`
- `https://YOUR-DOMAIN.com/?booth=04`

웹사이트는 브라우저의 localStorage에 수집 기록을 저장합니다.
따라서 별도의 서버/DB 없이도 같은 휴대폰에서 스탬프 투어가 가능합니다.

## 실행
1. 폴더 전체를 VS Code로 엽니다.
2. `index.html`을 Live Server 등으로 실행합니다.
3. 브라우저 주소 뒤에 `?booth=01`을 붙여 QR 진입을 테스트합니다.

## 실제 전시 적용
1. 실제 캐릭터 PNG를 `assets`에 넣습니다.
2. `app.js`의 SPACE 정보를 실제 부스 이름으로 수정합니다.
3. 사이트를 Netlify / Vercel / GitHub Pages 등에 배포합니다.
4. 배포된 최종 주소를 기준으로 부스별 QR을 만듭니다.
5. 각 부스에 해당 QR을 출력합니다.

## 중요
이 프로토타입은 "QR 자체를 웹사이트가 카메라로 읽는 방식"이 아니라,
"휴대폰 카메라로 QR을 스캔 → 해당 부스 URL로 이동 → URL의 booth 번호를 읽어 캐릭터 해금"
방식입니다. 전시에서는 이 방식이 훨씬 단순하고 안정적입니다.
