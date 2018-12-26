# Python Chatbot 3일차

* Computer Science 공부에 도움이 되는 MOOC
  * cs50
  * edx
  * coursera
  * udacity

## I. C9

### 1. URL의 의미

* https://www.naver.com : 누구에게 보낼지(요청 받는 사람의 주소)
* / : 가장 기본이 되는(root) 페이지를 요청
* /XXX : 무엇을 받을지
* ?XX : 이런 정보를 담아 보낼게(parameter)
  ?chat_id=129871985&text=hello
  * Ex) https://search.naver.com/search.naver?query=multicampus
    /search.naver : 네이버야 검색해줘
    ?query=XXX : 이런 단어를 담아 보낼게 == XXX를 검색해줘
* URL의 구성은 전부 문자열

### 2. Flask

#### (1) 기본 실행

1. https://c9.io 에서 로그인 후 Create a new Workspace

2. Blank template 선택 후 Create

3. flask 폴더에 app.py 파일 생성

   ```python
   from flask import Flask
   app = Flask(__name__)
   
   # root 페이지를 요청
   @app.route("/")
   def hello():
       return "Hello World!"
   ```

4. 터미널에서 flask 설치 후 실행

   ```
   sudo pip3 install flask
   flask run --host=0.0.0.0 --port=8080
   ```

#### (2) static routing

```python
# /name 페이지를 요청
@app.route("/name")
def name():
    return "My name is Hoik Jang"
```

#### (3) variable routing

```python
# /hello/XXX 페이지를 요청하여 XXX를 인자로 받아 동적으로 처리
# /hello/john => "hello john"
# /hello/ashley => "hello ashley"
@app.route("/hello/<name>")
def hi(name):
    return "hello " + name

# /cube/숫자 페이지를 요청
# /cube/2 ==> 8
# /cube/3 ==> 27
@app.route("/cube/<int:number>") # URL은 문자열이기 때문에 이를 정수형으로 변환
def cube(number):
    return str(number ** 3) # 세제곱을 한 후 다시 문자열로 변환하여 리턴
    
# /reverse/XXX 페이지를 요청    
# /reverse/hello => olleh
@app.route("/reverse/<word>") # word를 동적으로 routing
def reverse(word):
    return word[::-1] # word를 뒤집어서 리턴
    
# /palindrome/rececar => true
# /palindrome/hello => false
@app.route("/palindrome/<word>")
def pal(word):
    return str(word == word[::-1])
```

#### (4) send_file()

```python
# app.py
from flask import Flask, send_file
app = Flask(__name__)

# profile.html 파일을 보내서 라우팅
@app.route("/profile")
def profile():
    return send_file('profile.html')
```

```html
<!-- profile.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hoik Jang</title>
    <style>
        /* div {
            color: rgb(59, 189, 194)
        } */
        .text {
            color: rgb(19, 148, 94)
        }
        body {
            background-color: ghostwhite
        }
        #header {
            color: rgb(219, 140, 75)
        }
        table {
            background-color: dimgray
        }
    </style>
</head>
<body>
    <h1 id="header">Hoik's Page</h1>
    <div class="text">전자공학전공</div>
    <div class="text">ssafy 1기 수강생</div>
    <p class="text">컴알못</p>
    <table>
        <!-- tr : 행, td : 열 -->
        <tr>
            <td>나이</td>
            <td>27살</td>
        </tr>
        <tr>
            <td>전공</td>
            <td>전자공학</td>
        </tr>
        <tr>
            <td>혈액형</td>
            <td>B</td>
        </tr>
    </table>
    <!-- Unordered List -->
    <ul>
        <!-- List -->
        <li>치킨</li>
        <li>김치전</li>
        <li>만두</li>
    </ul>
    <!-- Ordered List -->
    <ol>
        <li>치킨</li>
        <li>김치전</li>
        <li>만두</li>
    </ol>
    <img src="" alt="Basketball">

    <div id="hoik" class="text">어...</div>
</body>
</html>
```

#### (5) render_template

```python
from flask import Flask, send_file, render_template
import random
app = Flask(__name__)

@app.route("/lotto")
def lotto():
    name = "Hoik Jang"
    result = str(sorted(random.sample(range(1,46), 6)))
    return render_template('lotto.html', lotto=result, name=name)
	# lotto.html 의 lotto에 result, name에 name을 저장하여 렌더링
```

```html
<!-- lotto.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>자동 생성 로또 코드</h1>
    <h2>{{ lotto }}</h2>
    <p>{{name}}</p>
</body>
</html>
```



## II. HTML

링크를 통해 다른 문서로 이동이 가능하고 태그를 이용해서 문서의 구조를 정의하는 언어

### 1. 기본 구성

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- 머리 : 상대적으로 덜 중요한 부분(문서에 대한 정보) -->
        <title>HTML 테스트</title>
        <meta charset="utf-8">
    </head>
    <body>
        <!-- 몸통 : 중요한 부분(주요 내용) -->
    
        <h1>
            <!-- # 가장 중요한 내용 -->
            HTML 테스트
        </h1>
        <h2>부제목</h2>
        <p>안녕하세요</p>
        <p>HyperText Markup Language</p>
        <a href="http://www.naver.com">이건 네이버로 가는 링크</a>
        <img src="image link">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/kXYiU_JCYtU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </body>
</html>
```

