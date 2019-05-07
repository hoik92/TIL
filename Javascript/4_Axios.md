# Axios

* http 요청을 보내는 javascript 모듈
* Axios github에서 CDN으로 받아 html 문서에 선언한 후 사용할 수 있다.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <!-- CDN 선언 -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>

<body>
    <div class="img-box"></div>
    <script src="./useAxios.js"></script>
</body>
</html>
```



## 1. get

* http GET 요청을 보내는 기능
* 비동기 함수이므로 `then catch` 또는 `async await` 방식으로 결과를 추출할 수 있다.

* useAxios.js(then catch)

```js
const url = 'https://dog.ceo/api/breeds/image/random'

axios.get(url)
    .then(response => {
        // resolve된 결과에서 image url 추출
        const imageUrl = response.data.message
        // img-box 선택
        const imageBox = document.querySelector('.img-box')
        // img 태그 하나 생성하여
        const image = document.createElement('img')
        // src에 imageUrl 붙여넣고
        image.src = imageUrl
        // img-box 안에 넣는다
        imageBox.appendChild(image)
    })
```

* useAxios.js(async await)

```js
const url = 'https://dog.ceo/api/breeds/image/random'

const getImageUrl = async () => {
    const response = await axios.get(url)
    const imageUrl = response.data.message
    const imageBox = document.querySelector('.img-box')
    const image = document.createElement('img')
    image.src = imageUrl

    imageBox.appendChild(image)
}

getImageUrl()
```

