# Python Chatbot 4일차

## I. fake search 만들기

```python
# app.py
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Fake Search</h1>
    <!--<h2>네이버 검색</h2>-->
    <img width="150" height="70" src="http://cafefiles.naver.net/20150105_296/daegu14219_1420436827127okJnQ_PNG/NAVER%28%B3%D7%C0%CC%B9%F6%29.png">
    <form action="https://search.naver.com/search.naver">
        <input type="text" name="query">
        <input type="submit" value="검색">
    </form>
    <!--<h2>구글 검색</h2>-->
    <img width="150" height="70" src="">
    <form action="https://www.google.com/search">
        <input type="text" name="q">
        <input type="submit" value="검색">
    </form>
    <!--<h2>다음 검색</h2>-->
    <img width="150" height="70" src="https://search1.kakaocdn.net/argon/0x200_85_hr/38hnyCh0f0m">
    <form action="https://search.daum.net/search">
        <input type="text" name="q">
        <input type="submit" value="검색">
    </form>
</body>
</html>
```

## II. vonvon 만들기

```python
# app.py
from flask import Flask, render_template, request
from faker import Faker

app = Flask(__name__)
fake = Faker('ko_KR')

pl = []

@app.route('/')
def index():
    return render_template('index.html')
    
# '/' : 사용자의 이름을 입력 받습니다.
@app.route('/js')
def js():
    return render_template('jeonsaeng.html')
    
# '/pastlife' : 사용자의 (랜덤으로 생성된) 전생/직업을 보여준다.
@app.route('/pastlife')
def pastlife():
    job = fake.job()
    name = request.args.get('name')
    
    if name in pl:
        pass
    else:
        pl[name] = job
    return render_template('pastlife.html', name=name, job=pl[name])
```

```html
<!-- jeonsaeng.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            text-align:center;
            margin-top:200px;
        }
    </style>
</head>
<body>
    <h1>당신의 이름을 입력하세요.</h1>
    <form action='/pastlife'>
        <input type="text" name="name">
        <input type="submit">
    </form>
</body>
</html>
```

```html
<!-- pastlife.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            text-align:center;
            margin-top:200px;
        }
    </style>
</head>
<body>
    <h1>{{ name }}의 전생은</h1>
    <h2>{{ job }}입니다.</h2>
</body>
</html>
```

## III. fake 궁합 만들기

```python
from flask import Flask, render_template, request
import random
import csv

app = Flask(__name__)

pl = {}
fish = []

@app.route('/')
def index():
    # 두 사람의 이름을 입력 받는다.
    return render_template('index.html')

@app.route('/match')
def match():
    # 1. fake 궁합을 알려주고,
    # 2. 우리만 알 수 있게 저장한다.
    #   - fish 리스트에 append 통해 저장한다.
    # 3. match.html에는 두 사람의 이름과 random으로 생성된 50~100사이의 수를 함께 보여준다.
    #   - XX님과 YY님의 궁합은 ZZ%입니다.
    my_name = request.args.get('me')
    your_name = request.args.get('you')
    match = random.randint(50,100)
    # fish.append([my_name,your_name])
    
    # CSV 파일을 통한 데이터 영구 저장
    with open('name_list.csv', 'a', encoding='utf-8') as f:
        name_list = csv.writer(f)
        name_list.writerow([my_name, your_name])
    # with = open한 파일을 임시적으로 제어하고 제어가 끝나면 자동으로 닫아준다.
    
    return render_template('match.html', me=my_name, you=your_name, match=match)

@app.route('/admin')
def admin():
    # 낚인 사람들의 명단
    #   - template에서 반복(for)을 써서,
    #   - fish에 들어가 있는 데이터를 모두 보여준다.
    
    data = []
    
    with open('name_list.csv', 'r', encoding='utf-8') as f:
        for name in f:
            data.append(name)
    
    return render_template('admin.html', name_list=data)
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>궁합을 알려드려요.</h1>
    <form action="/match">
        당신의 이름 : <input type="text" name="me">
        그분의 이름 : <input type="text" name="you">
        <input type="submit">
    </form>
</body>
</html>
```

```html
<!-- match.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{me}}님과 {{you}}님의 궁합은 {{match}}%입니다.</h1>
</body>
</html>
```

```html
<!-- admin.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {% for i in name_list %}
        <p>{{i}}</p>
    {% endfor %}
</body>
</html>
```

