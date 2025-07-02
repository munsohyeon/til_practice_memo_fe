# vue-practice-memo
1. cmd 창에서 vue 셋팅
2. npm create vue ( router,pina )
3. file 셋팅
4. sass, axios 셋팅

## httpService.js save메소드 부분
```js
class HttpService {
    async save(jsonBody) {
        // save 메소드 구현해주세요.
        // axios가 알아서 객체부분을 JSON으로 바꿔줌
        // post promise객체가 넘어온다.
        const res = await axios.post('/memo', jsonBody);
        return res.data;
    }
}
```
- `axios.post('/memo', jsonBody);`가 promise 객체로 넘겨준다
- `awaite`Respone 객체

## onMounted();
- Hook
- 함수, 메소드 호출 인자로 함수를 보내줘야함(콜백함수)

## item, jsonBody, params
item 객체 하나
params get 요청을 통해 전달되는 매개변수
axios가 params(인자)를 통해 객체가 알아서 쿼리스트링으로 바꿔준다 

## async/await 연관관계

## findAll();
// 검색 버튼을 누르면 findAll을 호출할 때
// 파라미터로 {search_text: '검색 키워드에 적힌 내용을 보내주시면 된다.'}
- 검색 버튼을 누르면 findAll함수를 호출 -> searchText 키를 가진 파라미터로 넘겨줘야함 -> 값은 검색키워드(사용자가 입력한 값이 되어야 함)

## v 바인드를 잊지마...
```js
// index.js
{
      path: '/memo/:id',
      component: () => import('@/views/Form.vue'),
    }
```
id앞에 콜론임...지발

## JSON
```js
JSON.stringify();
//객체를 JSON(문자열)으로
JSON.parse();
//JSON을 다시 객체로
```

## history 객체
- 브라우저에서 제공해주는 객체
- 브라우저의 히스토리 정보를 문서와 문서 상태 목록으로 저장하는 객체