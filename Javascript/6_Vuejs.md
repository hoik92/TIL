# Vue.js

* bootstrap처럼 CDN으로 사용 가능
  * 상용(배포) 버전 - 속도가 빠르고 용량이 최적화 되었지만, 사람이 읽을 수 없을 정도로 압축되어 있다. 배포할때만 쓴다.
  * 개발 버전 - 사람이 읽을 수 있는 개발용 코드 버전

* CDN을 맨 밑에 선언하는 이유
  * html문서는 위에서부터 읽는다.
  * script를 load하는 속도가 느리기 때문에, 맨 위에 선언하면 페이지에 아무것도 안 쓰여진 상태로 지속될 수 있다.
  * 그래서 맨 밑에 선언하여 일단 모든 페이지를 render하고 이후에 javascript를 load한다.

## 1. Vue.js를 사용하는 이유

### (1) SPA

* Single Page App - 하나의 페이지에서 CRUD가 가능
* declarative programming이 가능하다.

### (2) imperative, declarative

####  imperative programming

* 명령적(절차적) 프로그래밍
* how to, 어떻게 동작하는지 하나하나의 step을 모두 정의하는 방식
* 컴퓨터적인 사고 logic
  * ex) 집에 가라: 걸어서 => 지하철 타고 => 버스로 갈아타고 => 집으로 걸어서 => 문열고 도착
* 명령적은 이해하기 어렵기 때문에 더욱 인간적이고, 자연스러운 프로그래밍 패러다임이 필요
  * ex) OOP, ORM

#### declarative programming

* 선언적 프로그래밍
* what, 무엇을 할지만 생각. detail을 고민하지 않고 목표로 하는 행동을 수행
* 일반적인 사고 logic
  * ex) 집에 가라: 집에 간다!

아무리 생각해도 declarative programming이 편하다.

그러니까 js가 수행하는 모든 로직과 (비동기적인)처리를 직접하는게 아니라 Vue.js한테 시킨다.



## 2. Vue 선언

* script문서에 Vue 객체를 생성하여 시작
* Vue 객체에 우리가 무엇을 할지 정의하여 html파일에 적용하면, Vue 객체가 알아서 모든 비동기처리를 수행
* vue.js를 배운다 = Vue 객체에 어떤 인자를 전달하는지 배운다!
* 우리는 무엇을  할 것인지만 잘 정의하면 된다.

### (1) 요소

* 주어, 목적어, 동사라는 구조로 생각

#### el

* 주어, Vue 객체를 적용할 html element(id, class ...)를 선언한다.
* 내가 생성하는 Vue 객체를 el에서 정의된 element에 적용(mount)한다.

#### data

* 목적어, html에 표현할, 혹은 html에서 조작할 data를 object로 선언한다.
* Vue 객체가 이런 data를 조작하고 표현할 것이다.

#### methods

* 동사, 조작할 행위를 function으로 정의한다.
* 주의 - arrow function은 불가! Vue 내부의 this를 파괴한다.

```html
<script>
    let app = new Vue({
        // 주어
        el: '#app',
        // 목적어
        data: {
            msg: 'hello world!',
            age: 28,
        },
        // 동사
        methods: {
            plus: function () {
                this.age += 1
            }
        }
    })
</script>
```



## 3. html에서 data 사용

* Vue 객체에서 정의한 data를 html 문서에서 사용
* html 문서는 최대한 간단하게, 대부분의 data 렌더를 vue.js가 하도록 작성한다.

### (1) data 출력

```html
<div id="app">
    <h1>{{ msg }}</h1> <!-- msg 데이터를 출력 -->
</div>
```

### (2) html tag로 적용

* `v-`: vue.js에게 명령을 시키겠다.
* tag 내부의 v-html 속성에 data 선언

```html
<span v-html="msg"></span>
```

* v-html 속성: 전달받은 data에 해당하는 tag 적용
* 작동방식: vue.js가 v-html 태그를 찾아서 html 문서로 rendering

### (3) iteration

* list, object를 순회하며 요소에 접근
* html 문서에서 index 접근 가능
* v-for 속성에서 iteration문 선언

```js
// Vue 내부
data: {
    // 배열 선언
    todos: ['빨래 돌리기', 'Vue.js 배우기', 'Javascript 복습', 'dodge-note 개발'],
    posts: [{ // object 선언
        id: 1,
        content: '1번글',
        checked: false
    }, {
        id: 2,
        content: '2번글',
        checked: false
    }, {
        id: 3,
        content: '3번글',
        checked: true
    }],
},
```

```html
<!-- index 접근 -->
<ul>
    <li>{{ todos[0] }}</li>
    <li>{{ todos[1] }}</li>
    <li>{{ todos[2] }}</li>
    <li>{{ todos[3] }}</li>
</ul>

<!-- iteration -->
<ul>
    <li v-for="td in todos">{{ td }}</li>
</ul>
```

* dictionary 요소 순회시 value 값을 반환한다.

```html
<!-- 2중 iteration -->
<ol v-for="post in posts">
    <!-- 각 post의 element의 value 값 반환 -->
    <li v-for="p in post">{{ p }}</li>
</ol>
```

### (4) 조건문

* v-if 속성에 조건 작성

```html
<p v-if="post.checked">
    {{ post }} <!-- post.checked가 true면 post 출력 -->
</p>
```

* iteration과 조건문 중첩 사용 가능

```html
<ol>
    <li v-for="post in posts" v-if="post.checked">
    	<ul>
            <li v-for="c in post">{{ c }}</li>
        </ul>
    </li>
</ol>
```

### (5) console 창에서 사용

* el, data에 속한 데이터는 $el, $data를 통해 접근
* methods는 바로 접근 가능

```js
app.$data.age
app.$data.msg
app.plus()
```



## 4. MVVM 구조

* JS에서 Model, Controller, View 각 파트가 동작하는 구조
* django의 MTV 패턴과 유사

### (1) django와 비교

| Vue.js                       | django       |
| ---------------------------- | ------------ |
| **M**odel                    | **M**odel    |
| **V**iew                     | **T**emplate |
| **V**iew **M**odel(Vue 객체) | **V**iew     |

* django에서 views.py(View)에 기능을 정의했듯이 vue.js에서는 Vue 객체(View Model)에 기능을 정의한다.

### (2) View Model의 역할

* 실시간으로 데이터를 처리하고 View로 넘긴다.

#### form

* form tag의 목적 - input을 보내는 용도
* django에서는 input에 데이터를 보내는 순간 데이터를 처리하고 새로운 페이지로 이동하여 출력한다.
* vue.js는 실시간으로 input에 담긴 데이터를 받아 처리하고 즉시 출력한다.

#### v-model

* 입력 데이터를 변수에 동적으로 binding

```html
<body>
    <div id="app">
        <h1>{{ header }}</h1>
        <h2>{{ subHeader }}</h2>
        <p>{{ content }}</p>
        
        <!-- 입력을 content에 동적으로 바인딩. 들어오면 바로바로 연결 -->
        <!-- input에 값을 입력하는 순간 content의 값이 실시간으로 변한다. -->
        <input v-model="content">   
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        let app = new Vue({
            el: '#app',

            data: {
                header: 'Todo App',
                subHeader: '이것은 Todo app 입니다.',
                content: '할일을 입력해주세요',
            },
        })
    </script>
</body>
```

