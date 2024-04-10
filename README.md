# Nuber Eats Frontend

[풀스택 우버 이츠 클론코딩](https://nomadcoders.co/nuber-eats)

구경해보시궜어요 -> 🚀 [Click](https://nuber-eats-frontend-kys.netlify.app/)

사용법은 아래에서 확인 ⬇️

<img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaAEnSs5uzpCA0HEkz57f3h-Hg_obmozn4gLIBYS2YV3I_s4GaiwDj5BirnpjPfbFPDlPVVXg-wn4H4uJpMqzGl0GJzlLHn42Y=w1920-h911-v0" />

- ReactJS (using [CRA](https://create-react-app.dev/)) with Typescript
- [React Router(v6)](https://reactrouter.com/)
  - Routing
- [GraphQL](https://graphql.org/)
  - API query language
- [Apollo Client](https://www.apollographql.com/docs/react/)
  - State management
  - Fetching data with GraphQL
- [React Hook Form](https://www.react-hook-form.com/)
  - Validation
- [TailwindCSS](https://tailwindcss.com/)
  - Styling
- Google Maps
- Testing
  - (Unit) Jest
  - (Unit) React Testing Library
  - (E2E) Cypress

### Install Packages

`npm install`

### Run code

`npm run start`

### How to use

1.  브라우저 3개 필요 (e.g. chrome, chrome(secret), edge, safari, firefox, etc.)
2.  각 브라우저에서 로그인
<div style="margin:0 2rem 2rem;" >

| Role   | Email               | Pw    |
| ------ | ------------------- | ----- |
| 고객   | user<hh>@eats.com   | 12345 |
| 점주   | owner<hh>@eats.com  | 12345 |
| 배달원 | driver<hh>@eats.com | 12345 |
|        |                     |

</div>

3.  주문 ~ 배달완료
<div style="margin:0 2rem 2rem;">

| Step | 고객                                                                                                                                                     | 점주                                                                 | 배달원               |
| :--: | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------- |
|  1   | 레스토랑 선택 <br /> -> [Start Order] <br /> -> 메뉴카드에서 [Add] <br /> -> [Confirm Order] <br /> -> [OK] <br /> -> 주문서 페이지 (주문상태 `Pending`) | 고객이 선택한 <br />레스토랑 상세 페이지 (주문 정보 subscription 함) | 지도 페이지          |
|  2   |                                                                                                                                                          | 주문이 들어오면 주문 페이지로 이동 <br /> -> [주문 수락] 클릭        |
|  3   | 주문상태 `Cooking` 으로 변경                                                                                                                             |                                                                      |
|  4   |                                                                                                                                                          | [조리 완료] 클릭                                                     |
|  5   | 주문상태 `Cooked` 로 변경                                                                                                                                |                                                                      | [배달접수] 버튼 생성 |
|  6   |                                                                                                                                                          |                                                                      | [배달접수] 클릭      |
|  7   | 주문서에 배달원 이메일 표시                                                                                                                              | 주문서에 배달원 이메일 표시                                          |                      |
|  8   |                                                                                                                                                          |                                                                      | [픽업] 클릭          |
|  9   | 주문상태 `PickedUp` 으로 변경                                                                                                                            | 주문상태 `PickedUp` 으로 변경                                        |                      |
|  10  |                                                                                                                                                          |                                                                      | [배달완료] 클릭      |
|  11  | 주문상태 `Delivered` 로 변경                                                                                                                             | 주문상태 `Delivered` 로 변경                                         |                      |
|      |                                                                                                                                                          |                                                                      |                      |

</div>
