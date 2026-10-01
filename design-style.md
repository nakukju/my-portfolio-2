# 스타일 B — 에디토리얼 (매거진풍)

## 기본 설정
- 폰트: Pretendard 단일 (세리프 폰트 사용 안 함. 큰 타이틀도 Pretendard 800으로 처리)
- 컨텐츠 폭: 1320px, 좌우 여백 60px (다른 스타일보다 넉넉함)
- 그리드 시스템 없음 — 섹션마다 `flex` 또는 2~3단 `grid`를 개별 지정

## 색상 (변수로 선언)
```
--cream:#f3ece2    기본 배경
--ink:#171512      본문 글자
--gold:#b5893f     진한 강조 (버튼, 라벨)
--gold-soft:#c9a76b 은은한 강조 (보조 텍스트, 배지)
--dark:#141210     어두운 섹션 배경 (Works, Board, Footer)
--line:rgba(23,21,18,.14)
```

## 컴포넌트 패턴
- **거대한 마스트헤드**: `font-size: clamp(70px,11vw,160px)`, `font-weight:800`, 가운데 정렬. 페이지 최상단에 "PORTFOLIO" 단어 하나만 이 크기로.
- **라벨(eyebrow)**: `font-size:13px`, `font-weight:800`, `letter-spacing:.2em`(자간을 넓게), 색은 `--gold`. 모든 섹션 제목 위에 붙임.
- **Works 카드**: 이미지 꽉 채운 배경(`position:absolute;inset:0`) 위에 `linear-gradient(180deg, transparent 40%, rgba(10,9,7,.82))` 오버레이를 씌워서 하단에 흰 글씨 제목이 자연스럽게 겹쳐 보이게 함.
- **밑줄형 입력창**: Contact 폼은 박스가 아니라 `border:0; border-bottom:1.5px solid var(--line)`만 있는 밑줄 스타일.
- **Board 배지**: `background:var(--gold-soft)`, 글자색은 `--dark`(어두운 배경 위에서도 선명하게), `border-radius:2px`(거의 직각).

## 섹션 순서, 배경, 여백
| 순서 | 섹션 | 배경 | 상하 padding |
|---|---|---|---|
| 1 | Hero | cream | 위 50px, 아래는 hero-copy 안쪽 여백으로 처리 |
| 2 | Works | **dark** | 100px |
| 3 | Mid(Skill/Process 있던 자리 → 지금은 Info/경력+인용구) | cream | 100px |
| 4 | Skill(별도 섹션) | cream | 위 40px / 아래 120px (비대칭 — 위는 좁게, 아래는 넓게) |
| 5 | Board | **dark** | 100px |
| 6 | Contact | cream | 100px |
| 7 | Footer | **dark** | — |

**밝은(cream) 섹션과 어두운(dark) 섹션이 번갈아 나오는 리듬이 이 스타일의 핵심**입니다. 섹션을 추가하거나 순서를 바꿀 때도 이 교차를 유지해야 합니다.

## 이런 사람에게 어울림
완성도 있고 고급스러운 인상을 주고 싶은 사람. 사진 비중이 크고 타이포그래피로 임팩트를 주고 싶을 때.

## 수정 시 지켜야 할 것
- 세리프 폰트를 다시 넣지 않기 (Pretendard만)
- 밝은/어두운 섹션 교차 순서를 유지하기
- 자간(letter-spacing)을 넓게 쓰는 라벨 스타일을 다른 곳에도 일관되게 적용하기
