# Ajax

## 1. XMLHttpRequest

- python에서 requests 객체를 이용하여 웹 문서를 주고 받듯이 javascript에서는 XMLHttpRequest를 통해 기본적인 CRUD operation을 수행할 수 있다.

### (1) GET

- GETtest.js

```js
// fake REST API test site
const URL = "https://jsonplaceholder.typicode.com/"

const XHR = new XMLHttpRequest()

// GET method로 URL의 정보를 가져옴
XHR.open('GET', URL + 'posts/1')
XHR.send()
// 가져온 정보가 load되면 function을 수행
XHR.addEventListener('load', function(e){
    // 발생한 이벤트의 응답을 가져와 저장(그냥 string(json))
    const result = e.target.response
    console.log(result)
    // 받아온 정보를 object로 변환
    const jsObject = JSON.parse(result)
    console.log(jsObject)
    // object를 string으로 변환
    const jsonString = JSON.stringify(jsObject)
    console.log(jsonString)
})
```

- 응답 받은 정보를 javascript로 처리하기 위해 `JSON.parse()`를 이용해 `object`로 변환하여 처리하고, `object`를 담아 요청을 보내기 위해 `JSON.stringify()`를 이용해 `string`으로 변환

### (2) POST

- POSTtest.js

```js
const URL = "https://jsonplaceholder.typicode.com/"

const XHR = new XMLHttpRequest()
// POST method
XHR.open('POST', URL + 'posts')
// Header 정보를 세팅
XHR.setRequestHeader(
    'Content-Type',
    'application/json;charset=UTF-8'
)
// 보낼 데이터 object 생성
const data = {
    userId: 1,
    title: '제목이다',
    body: 'ㅈㄱㄴ'
}
// object 데이터를 string(json)으로 변환하여 POST 요청을 보냄
XHR.send(JSON.stringify(data))

XHR.addEventListener('load', function(e){
    const result = e.target.response
    console.log(result)
    console.log(JSON.parse(result))
    console.log(JSON.stringify(JSON.parse(result)))
})
```



## 2. Giphy-Search

Giphy API를 이용하여 gif 파일을 보여주는 페이지를 만든다.

* index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Giphy Search Engine</title>
    <link rel="stylesheet" href="./main.css">
</head>
<body>
    <!-- 검색 결과 중 랜덤으로 하나를 보여주는 태그 -->
    <div id="result-tv" class="container container-padding50 js-container">
    </div>
    <!-- 검색할 수 있는 input과 button -->
    <div class="container container-padding50">
        <input id="js-userinput" type="text" class="container-textinput">
        <button id="js-go" class="container-button">Go!</button>
    </div>
    <!-- 검색 결과를 보여주는 태그 -->
    <div id="result-area" class="container container-padding50 js-container">
    </div>
    <script src="main.js"></script>
</body>
</html>
```

* main.js

```js
const input = document.querySelector('#js-userinput')
const button = document.querySelector('#js-go')
const resultArea = document.querySelector('#result-area')
const resultTv = document.querySelector('#result-tv')

const API_KEY = {MY_API_KEY}
// 1. input 안의 값을 잡는다.
input.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
        const keyword = input.value
        searchAndPush(keyword)
    }
})

button.addEventListener('click', event => {
    const keyword = input.value
    searchAndPush(keyword)
})

// 2. Giphy API를 통해 data를 받아서 가공한다.
// https://developers.giphy.com/
const searchAndPush = (keyword) => {
    resultArea.innerHTML = null
    const URL = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`

    const GiphyAJAXCall = new XMLHttpRequest()
    GiphyAJAXCall.open('GET', URL)
    GiphyAJAXCall.send()

    GiphyAJAXCall.addEventListener('load', event => {
        const rawData = event.target.response
        const parsedData = JSON.parse(rawData)
        for (const data of parsedData.data) {
            pushToDom(data.images.fixed_height.url)
        }

        const index = Math.floor(Math.random() * parsedData.data.length)
        pushToDomTv(parsedData.data[index].images.original.url)
    })
}

// 3. GIF 파일들을 HTML(DOM)에 밀어넣는다.
const pushToDom = (data) => {
    const gif = document.createElement('img') // <img/>
    gif.src = data // <img src="${data}"/>
    resultArea.insertBefore(gif, resultArea.firstChild)
    // resultArea.appendChild(gif)
    // resultArea.innerHTML += `<img src="${data}"/>`
}

// 4. 검색 결과 중 하나를 랜덤으로 보여주는 tv를 만든다.
const pushToDomTv = (data) => {
    const gif = document.createElement('img') // <img/>
    gif.src = data // <img src="${data}"/>
    resultTv.innerHTML = `<img src="${data}" height="400px"/>`
}
```

