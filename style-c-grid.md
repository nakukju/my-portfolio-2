# 스타일 C — 카드형 (벤토 그리드)

## 기본 설정
- 폰트: Pretendard 단일
- 컨텐츠 폭: 1360px
- 그리드: 12컬럼 (`repeat(12,1fr)`), 각 콘텐츠 블록은 이 12칸 안에서 `grid-column: span N`으로 폭을 정함

## 색상 (변수로 선언)
```
--bg:#f3f1ec       전체 배경 (부드러운 회색)
--ink:#161513      제목 글자
--ink-soft:#6b675f  본문/보조 글자
--line:#e6e2d9      구분선
--card:#ffffff      카드 배경(흰색)
--pill-bg:#e9e5db   알약 라벨 배경
```

## 컴포넌트 패턴 — 카드가 핵심
```css
.card{
  background:#ffffff;
  border-radius:22px;
  box-shadow:0 2px 10px rgba(22,21,19,.05);
  padding:40px; /* --sp5 */
}
```
**모든 콘텐츠 블록(About 사진, Info, 경력, Skill 칩, 프로젝트, Board, Contact 폼)을 예외 없이 이 `.card` 클래스로 감쌉니다.** border-radius(22px)와 box-shadow 값을 낮추면 다른 스타일과 구분이 안 되니 그대로 유지합니다.

- **알약 라벨**: `border-radius:999px`, 배경 `--pill-bg`, 섹션 제목 위에 항상 붙임. (예: `PORTFOLIO`, `ABOUT`, `SKILL`)
- **프로젝트 카드**: `grid-column: span 4`로 지정 (⚠️ `grid-column: 1 / span 4`처럼 시작 위치를 고정하면 안 됨 — 3개 카드가 전부 1번 칸에서 시작해 세로로 쌓이는 버그가 실제로 있었음). `span`만 쓰면 자동으로 옆으로 배치됨.
- **버튼**: `border-radius:999px`, 채운 버전(`--ink` 배경)과 흰 배경+그림자 버전(`.btn-ghost`) 두 가지.
- **원형 화살표**: 프로젝트 카드 우하단, `width/height:34px`, `border-radius:50%`, 배경은 `--bg`(카드보다 한 톤 어둡게).

## 섹션 순서
헤더 → Visual(카드로 감싼 이미지) → About(사진 카드+텍스트 카드, 그 아래 Info 카드+경력 카드) → Skill(카드 6개, 벤토 그리드) → Project(카드 3개) → Board(카드 1개 안에 목록) → Contact(카드 1개 안에 문구+폼) → Footer(카드 형태의 얇은 바)

## 이런 사람에게 어울림
정보를 구획별로 깔끔하게 정돈해서 보여주고 싶은 사람. 부드럽고 친근한 인상을 원할 때.

## 수정 시 지켜야 할 것
- 카드의 `border-radius`(22px)와 그림자 값을 임의로 낮추지 않기
- 프로젝트 카드 grid-column 값에 시작 위치를 넣지 않기 (`span 4`만, `1/span 4` 금지)
- 알약 라벨 없이 섹션 제목만 덜렁 넣지 않기 — 라벨이 이 스타일의 시그니처
