# Python Chatbot 1일차

1일차 파이썬 기반 챗봇 만들기

[챗봇 플랫폼](https://s1.py.hphk.io)

![python](https://www.python.org/static/opengraph-icon-200x200.png)

## I. 기초 문법

### (1) 저장, 조건, 반복

#### 1. 개념

* 파이썬은 **dynamic typing language** ->  자료형 정의 X

 1. 숫자

    ``` python
    greeting = "hello world"
    ```

 2. 글자

 3. Boolean

* API(Application Programming Interface)

  사용자와 제공자가 서로 소통할 수 있도록 만든 약속

#### 2. 실습

```python
# 변수 활용하기
greeting = "안녕하십니까!!"
print(greeting)
print(greeting)
print(greeting)
print(greeting)
print(greeting)
```

```python
# 리스트 활용하기
import random

# menu 리스트를 만들어주세요.
menu = ["짜장면", "치킨", "피자", "족발", "탕수육", "WelStory"]

choice = random.choice(menu)
print(choice)
```

```python
# 반복문 활용하기
# List를 돌면서 프린트하기
names = ['강동주', '유태영', '전민호']
for i in names:
  print(i)
```

```python
# 외장 함수 random 활용하기
# 1. random 외장 함수 가져오기
import random

# 2. 1~45까지 숫자 numbers에 저장하기
numbers = range(1,46)

# 3. numbers에서 6개 뽑기
sample = sorted(random.sample(numbers, 6))
## .sort()는 원본을 파괴, sorted()는 원본을 그대로

# 4. 출력하기
print(sample)
```





## II. 개발 계명(Development Commandments)

### (1) 브라우저는 Chrome 이다.

### (2) 문서는 마크다운(.md) 이다.

### (3) 교과서는 공식문서 & 내가 정리한 마크다운이다.

>  마크다운 문서는 Typora를 사용한다.



## III. 컴퓨터 조작하기

### (1) import webbrowser

```python
import webbrowser

webbrowser.open("https://daum.net")
webbrowser.open_new("https://daum.net")
webbrowser.open_new_tab("https://daum.net")

search_url = "https://search.daum.net/search?q="
search_list = ["ssafy","samsung","sw","coding"]

for i in search_url:
    webbrowser.oepn(search_url + search_list)
    # search_list에 있는 단어를 모두 검색한 브라우저 실행
```

### (2) import requests

```python
import bs4
import requests

url = "https://finance.naver.com/sise/"

response = requests.get(url).text
# url주소의 내용을 text로 받음

doc = bs4.BeautifulSoup(response, 'html.parser')
# html 형식을 python이 읽기 좋게 파싱

result = doc.select_one('#KOSPI_now')

print(result.text)
# 코스피 지수 출력
```

### (3) import os

```python
import os

print(os.listdir('.'))
# 현재 디렉토리에 존재하는 파일 및 디렉토리를 리스트로 출력

os.chdir(r'C:\Users\student\chatbot\day1\list')
print(os.getcwd())
# 현재 경로 출력

# print(os.listdir('.'))

# os.rename('hello.txt', 'what_the.txt')

name_list = os.listdir('.')

for i in name_list:
    os.rename(i, "ssafy_" + i)
    # 현재 디렉토리에 존재하는 파일 및 디렉토리 리스트의 이름을 바꿈
    
# for i in name_list:
#     os.rename(i, i[6:])
## 리스트 이름의 앞 6글자를 지움
```

