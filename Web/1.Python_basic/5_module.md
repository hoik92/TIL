# 1월 2주차

## I. 모듈 활용 기초

python에는 기본적으로 제공되는 모듈들이 있다.

[표준 라이브러리](https://docs.python.org/ko/3/library/index.html)에서 제공되는 모듈을 확인해보자!

여기 있는 모든 내용을 외울 필요도 없고, 이런 것이 있다만 확인해보자.

우리가 사용했던 `random` 역시도 표준라이브러리에서 제공되고 있는 모듈이며, 난수를 발생시키는 모듈이다.

```python
# 로또 번호 추천을 해보세요!
import random
lotto = random.sample(range(1, 46), 6)
print(lotto)
```



`import`

- 모듈을 활용하기 위해서는 반드시 `import`문을 통해 내장 모듈을 이름 공간으로 가져와야 한다.



`from` 모듈명 `import` 어트리뷰트 : 특정한 함수 혹은 어트리뷰트만 활용하고 싶을 때, 위와 같이 작성한다.

```python
from bs4 import BeautifulSoup
```

```python
from random import sample
sample([1,2,3], 2)
```



`from` 모듈명 `import` `*` : 해당하는 모듈 내의 모든 변수, 함수, 클래스를 가져온다.

```python
from random import *

print(sample([1,2,3,4], 2))
print(choice([1,2,3,4]))
print(randint(1, 10))
```



`from` 모듈명 `import` 어트리뷰트 `as` : 내가 지정하는 이름을 붙여 가져올 수 있다.

```python
from random import choice as c
c([1,2,3,4])
```



## II. 숫자 관련 함수

이외에도 분수(frctions), 십진(decimal), 통계(statistics)등이 있다.

### 1. 수학 관련 함수(math)

다음의 기본 함수는 `import` 없이 활용 가능하다.

`sum`, `max`, `min`, `abs`, `pow`, `round`, `divmod`

- 활용할 수 있는 상수는 다음과 같다.

```python
import math
print(math.pi)
print(math.e)
```

- 활용할 수 있는 연산 관련 함수는 다음과 같다.

| 함수                | 비고                            |
| ------------------- | ------------------------------- |
| math.ceil(x)        | 소수점 올림                     |
| math.floor(x)       | 소수점 내림                     |
| math.trunc(x)       | 소수점 버림                     |
| math.copysign(x, y) | y의 부호를 x에 적용한 값        |
| math.fabs(x)        | float 절대값 - 복소수 오류 발생 |
| math.factorial(x)   | 팩토리얼 계산 값                |
| math.fmod(x, y)     | float 나머지 계산               |
| math.fsum(iterable) | float 합                        |
| math.modf(x)        | 소수부 정수부 분리              |

- 로그, 지수 연산은 다음과 같습니다.

| 함수                | 비고                  |
| ------------------- | --------------------- |
| math.pow(x,y)       | x의 y승 결과          |
| math.sqrt(x)        | x의 제곱근의 결과     |
| math.exp(x)         | e^x 결과              |
| math.log(x[, base]) | 밑을 base로 하는 logx |

- 삼각함수는 다음과 같습니다.

```
sin, cos, tan
asin, acos, atan, 
sinh, cosh, tanh,
ashinh, acosh, atanh
```



## III. 날짜 관련 모듈

### 1. datetime

```python
# 1970년 1월 1일부터 1초씩 증가합니다.
# 오늘을 출력해봅시다.
import datetime

print(datetime.datetime.now())
print(datetime.datetime.today())

# UTC기준시도 출력가능합니다.
print(datetime.datetime.utcnow())
```

- 시간 형식지정

| 형식 지시자(directive) | 의미                   |
| ---------------------- | ---------------------- |
| %y                     | 연도표기(00~99)        |
| %Y                     | 연도표기(전체)         |
| %b                     | 월 이름(축약)          |
| %B                     | 월 이름(전체)          |
| %m                     | 월 숫자(01~12)         |
| %d                     | 일(01~31)              |
| %H                     | 24시간 기준(00~23)     |
| %I                     | 12시간 기준(01~12)     |
| %M                     | 분(00~59)              |
| %S                     | 초(00~61)              |
| %p                     | 오전/오후              |
| %a                     | 요일(축약)             |
| %A                     | 요일(전체)             |
| %w                     | 요일(숫자 : 일요일(0)) |
| %j                     | 1월 1일부터 누적 날짜  |

| 속성/메소드 | 내용                 |
| ----------- | -------------------- |
| .year       | 년                   |
| .month      | 월                   |
| .day        | 일                   |
| .hour       | 시                   |
| .minute     | 분                   |
| .second     | 초                   |
| .weekday()  | 월요일을 0부터 6까지 |

- 특정한 날짜 만들기

```python
datetime.datetime(year, month, day, hour, minute, second, microsecond)
```

```python
# 크리스마스를 만들어봅시다.
christmas = datetime.datetime(2019, 12, 25)
print(christmas)

# 예쁘게 출력해봅시다.
christmas.strftime('year: %Y month: %m day: %d')
```

### 2. timedelta

```python
from datetime import timedelta

ago = timedelta(days=-3)
print(now + ago)

# 오늘부터 1일일때, 100일 뒤는?
print(now + timedelta(days=100))

# 크리스마스부터 지금까지 얼마나 지났을까?
christmas = datetime.datetime(2018, 12, 25)
now = datetime.datetime.now()
print(christmas - now)
```

