# Javascript

* Browser를 조작할 수 있게 하기 위해 만든 언어
* 다른 오픈소스 언어들과 다르게 여러 종류의 표현체가 있다.
  * Google Chrome : V8
  * FireFox : SpiderMonkey
  * Apple Safari : Nitro
  * Microsoft : Chakra

* 목적

  * Browser 조작(Browser Object Model, BOM) - window 객체

  ```javascript
  window.print()
  window.innerWidth
  ```

  * HTML 조작(Document Object Model, DOM) - document 객체

  ```javascript
  document.write('<h1>아무말</h1>')
  
  ptag = document.querySelector('p')
  ptag.innerText = '몰랑몰랑'
  ```

* 현재의 javascript 표준
  * ES6
  * ECMAScript 6, ECMAScript 2015
  * Javascript Harmony



## 1. 원시 자료형(Primitive Data Type)

* string
* number
* boolean
* null
* undefined
* (symbol)

원시 자료형을 제외한 모든 것이 객체(사용자 정의 자료형)다.(Object, Array, Function)



## 2. const, let(블록단위 스코프)

* const
  * 다시 설정이 필요하지 않을 때 사용
  * `const name = 'hoik'` 으로 선언한 후 `name = 'jang'` 으로 변경하면 오류 발생
* let
  * 다시 설정이 필요할 때 사용

* 두 키워드 모두 블록단위 스코프이기 때문에 해당 키워드로 선언된 변수 블록{}의 상위 블록에서는 그 변수로의 접근이 불가능하다.



## 3. 함수 정의

```javascript
// 1. function 키워드를 통해 함수를 정의
function sum1(a, b) {
    return a + b
}

// 2. 익명함수를 선언 => 변수에 할당(중요)
let sum2 = function(a, b) {
    return a + b
}

// 3. ES6 Arrow Function
let sum3 = (a, b) => {
    return a + b
}
let sum4 = (a, b) => a + b
```



## 4. String Interpolation

```javascript
const hello = function(name, age) {
    return `${name}의 나이는 ${age}살 입니다.`
}
```



## 5. 반복문

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}

let j = 0;
while (j < 10) {
    console.log(j);
    j++;
}

let menu = ['짜장면', '짬뽕', '쌈밥', '김밥']
// 1. for 문을 통해 배열을 순회
for (let i = 0; i < menu.length; i++) {
    console.log(menu[i])
}
// 2. forEach() 메서드를 통해 순회
menu.forEach(function(food){
    console.log(food)
})
```



## 6. HTML에 Javascript 넣기

* index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="basic.js"></script>
</body>
</html>
```

* basic.js

```javascript
document.write('<h1>아무말</h1>')
document.write('<p>아몰랑</p>')

ptag = document.querySelector('p')
ptag.innerText = 'Live Server 설치했다.'
```

script 태그 안의 scr는 html파일을 기준으로 js파일의 상대 경로를 넣어준다.



## 7. helper method

### (1) forEach()

```javascript
const posts = [
    {id: 1, title: '안녕'},
    {id: 2, title: '자바스크립트'},
    {id: 3, title: '브라우저 조작'},
]

// forEach를 통해 순회를 하여
// id가 2번인 post를 찾으세요
posts.forEach(function(post){
    if (post.id === 2) {
        console.log(post.title)
    }
})
```

#### ※ Type coercion(implicit type casting)

* `==` 를 이용하여 좌우값을 비교하면 강제적으로 형변환을 한 후 비교한다.
* 따라서 `===` 를 이용하여 강제적인 형변환을 하지 않도록 만든다.

```javascript
const images = [
    {height: 10, width: 30},
    {height: 20, width: 90},
    {height: 50, width: 40},
]

// images에 들어가 있는 이미지들의 넓이를 구해 area에 넣으세요.
const area = []
images.forEach(function(image){
    area.push(image.height * image.width)
})
console.log(area)
```

### (2) map()

```javascript
const numbers = [1,2,3,4,5,6]
let squaredNumbers = []

// 1. squaredNumbers는 numbers의 요소들을 제곱한 숫자들의 배열로 만든다.
squaredNumbers = numbers.map(function(number){
    // map 메소드에는 무조건 return이 있다.
    return number * number
})
console.log(squaredNumbers)
```

### (3) find

```javascript
let users = [
    {id: 1, username: 'tony'},
    {id: 2, username: 'steve'},
    {id: 3, username: 'thor'},
    {id: 4, username: 'tony'},
]

// username이 'tony'인 사람을 찾으세요.
const tony = users.find(function(user){
    return user.username === 'tony'
})
console.log(tony)
```

### (4) filter

```javascript
// username이 'tony'인 사람들을 찾으세요.
const tonys = users.filter(function(user){
    return user.username === 'tony'
})
console.log(tonys)
```

#### ※ reject

```javascript
// 해당하는 조건이 아닌 요소들만 리턴하는 함수를 정의
const reject = function(array, func) {
    // func는 우리가 reject하는 조건 함수
    return array.filter(function(instance){
        return !func(instance)
    })
}

const notTonys = reject(users, function(user){
    return user.username === 'tony'
})
console.log(notTonys)
```

### (5) every

```javascript
// users의 모든 username이 'tony'면 true, 하나라도 아니면 false를 리턴
const everyTony = users.every(function(user){
    return user.username === 'tony'
})
console.log(everyTony)
```

### (6) some

```javascript
// users의 username이 하나라도 'tony'면 true, 모두 아니면 false를 리턴
const someTony = users.some(function(user){
    return user.username === 'tony'
})
console.log(someTony)
```

