# Python 기초

## 1. 식별자

파이썬에서 식별자는 변수, 함수, 모듈, 클래스 등을 식별하는데 사용되는 이름이다.

* 식별자의 이름은 영문알파벳, _, 숫자로 구성된다.
* 첫 글자에 숫자가 올 수 없다.
* 대소문자를 구별한다.
* 아래의 예약어는 사용할 수 없다.

```
False, None, True, and, as, assert, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield
```

```python
import keyword
print(keyword.kwlist)
```



## 2. 주석

- 주석은 `#`으로 표현한다.

- `docstring`은 `"""`으로 표현한다.

  : 여러 줄의 주석을 작성할 수 있으며, 보통 함수/클래스 선언 다음에 해당하는 설명을 위해 활용한다.

```python
def mysum(a,b):
    """이것은 덧셈함수입니다.
    이 줄도 실행되지 않습니다."""
    return a+b

mysum.__doc__
```



## 3. 코드 라인

- 기본적으로 파이썬에서는 `;` 을 작성하지 않는다.
- 한 줄로 표기할 떄는 `;`를 작성하여 표기할 수 있다.

```python
print("hello"); print("world")
```

* 줄을 여러줄 작성할 때는 역슬래시`\`를 사용하여 아래와 같이 할 수 있다. 

```python
a=0
if a\
== 0:
    print(a)
```

- `[]` `{}` `()`는 `\` 없이도 가능하다.

```python
lunch = ["짜장면", "탕수육", 
         "깐풍기"]
```



## 4. 변수(variable) 및 자료형

```python
x = 1004
```

x 는 1004 이다(X), x 에 1004 를 저장한다(O)

* 변수는 `=`을 통해 할당(assignment) 된다.
* 해당 자료형을 확인하기 위해서는 `type()`을 활용한다.
* 해당 변수의 메모리 주소를 확인하기 위해서는 `id()`를 활용한다.

```python
print(x)
print(id(x))
type(x)
```

* 같은 값을 동시에 할당할 수 있다.

```python
w = t = 1004
```

- 다른 값을 동시에 할당할 수 있다.

```python
x, y = 1, 2
```

- 이를 활용하면 서로 값을 바꾸고 싶은 경우 아래와 같이 활용 가능하다.

```python
x, y = y, x
```

### I. 수치형(Numbers)

#### (1) int (정수)

모든 정수는 `int`로 표현된다.

파이썬 3.x 버전에서는 `long` 타입은 없고 모두 `int` 형으로 표기 된다.

10진수가 아닌 8진수 : `0o` / 2진수 : `0b`  / 16진수: `0x`로도 표현 가능하다.

#### (2) float (부동소수점, 실수)

실수는 `float`로 표현된다.

다만, 실수를 컴퓨터가 표현하는 과정에서 부동소수점을 사용하며, 항상 같은 값으로 일치되지 않는다. (floating point rounding error)

이는 컴퓨터가 2진수(비트)를 통해 숫자를 표현하는 과정에서 생기는 오류이며, 대부분의 경우는 중요하지 않으나 값을 같은지 비교하는 과정에서 문제가 발생할 수 있다.

* 처리방법 1-1. 절대값을 비교

```python
a = 0.1 * 3
b = 0.3
abs(a-b) <= 1e-10
```

* 처리방법 1-2. 절대값 비교를 내장된 float epsilon값과 비교

```python
import sys
abs(a-b) <= sys.float_info.epsilon
```

* 처리방법 2. math 모듈을 통해 근사한 값인지 비교

```python
import math
math.isclose(a,b)
```

#### (3) complex (복소수)

복소수는 허수부를 `j`로 표현한다.

```python
a = 3 + 4j
print(a.real)
print(a.imag)
print(a.conjugate())
```

### II. Bool

파이썬에는 `True`와 `False`로 이뤄진 `bool` 타입이 있다.

비교/논리 연산을 수행 등에서 활용된다.

다음은 `False`로 변환된다.

```
0, 0.0, (), [], {}, '', None
```

### III. None

파이썬에서는 값이 없음을 표현하기 위해 `None`타입이 존재한다.

### IV. 문자형 (String)

##### 기본 활용법

문자열은 Single quotes(`'`)나 Double quotes(`"`)을 활용하여 표현 가능하다.

단, 문자열을 묶을 때 동일한 문장부호를 활용해야하며, `PEP-8`에서는 **하나의 문장부호를 선택**하여 유지하도록 하고 있다. (Pick a rule and Stick to it)

* 문자열 안에 문장부호(`'`, `"`)가 활용될 경우 이스케이프 문자(`\`)를 사용한다.

```python
print('철수가 말했다. \'안녕?\'')
print('철수가 말했다. "안녕?"')
print("철수가 말했다. '안녕?'")
```

- 여러줄에 걸쳐있는 문장은 다음과 같이 표현 가능합니다.

```python
print("""
개행문자 없이
여러 줄을 그대로 출력할 수 있습니다.
""")
```

##### 이스케이프 문자열

문자열을 활용하는 경우 특수문자 혹은 조작을 하기 위하여 사용되는 것으로 `\`를 활용하여 이를 구분한다.

| 예약문자 | 내용(의미)      |
| -------- | --------------- |
| \n       | 줄바꿈          |
| \t       | 탭              |
| \r       | 캐리지리턴      |
| \0       | 널(Null)        |
| `\\`     | `\`             |
| '        | 단일인용부호(') |
| "        | 이중인용부호(") |

##### String interpolation

* %-formatting

```python
name = 'jang'
print("hello, %s" % name)
```

* str.format()

```python
print("hello, {}".format(name))
```

* f-string

```python
print(f"hello, {name}")
```

```python
import datetime
today = datetime.datetime.now()
print(f'오늘은 {today:%y}년 {today:%m}월 {today:%d}일 {today:%A}')
```



## 5. 연산자

### I. 산술 연산자

Python에서는 기본적인 사칙연산이 가능하다.

| 연산자 | 내용           |
| ------ | -------------- |
| +      | 덧셈           |
| -      | 뺄셈           |
| *      | 곱셈           |
| /      | 나눗셈         |
| //     | 몫             |
| %      | 나머지(modulo) |
| **     | 거듭제곱       |

```python
q, r = divmod(5, 2) # 5를 2로 나눈 몫과 나머지를 반환
```

* 양수/음수 표현도 가능하다.

```python
num = 4
print(-num)
```

### II. 비교 연산자

우리가 수학에서 배운 연산자와 동일하게 값을 비교할 수 있다.

| 연산자 | 내용     |
| ------ | -------- |
| a > b  | 초과     |
| a < b  | 미만     |
| a >= b | 이상     |
| a <= b | 이하     |
| a == b | 같음     |
| a != b | 같지않음 |

### III. 논리 연산자

| 연산자  | 내용                         |
| ------- | ---------------------------- |
| a and b | a와 b 모두 True시만 True     |
| a or b  | a 와 b 모두 False시만 False  |
| not a   | True -> False, False -> True |

우리가 보통 알고 있는 `&` `|`은 파이썬에서 비트 연산자이다.

- 파이썬에서 and는 a가 거짓이면 a를 리턴하고, 참이면 b를 리턴한다.
- 파이썬에서 or은 a가 참이면 a를 리턴하고, 거짓이면 b를 리턴한다.

### IV. 복합 연산자

복합 연산자는 연산과 대입이 함께 이뤄진다.

가장 많이 활용되는 경우는 반복문을 통해서 갯수를 카운트하거나 할 때 활용된다.

| 연산자  | 내용       |
| ------- | ---------- |
| a += b  | a = a + b  |
| a -= b  | a = a - b  |
| a *= b  | a = a * b  |
| a /= b  | a = a / b  |
| a //= b | a = a // b |
| a %= b  | a = a % b  |
| a **= b | a = a ** b |

### V. 기타 연산자

#### (1) Concatenation

숫자가 아닌 자료형은 `+` 연산자를 통해 합칠 수 있다.

```python
[1,2,4] + [5,6,7]
```

#### (2) Containment Test

`in` 연산자를 통해 속해있는지 여부를 확인할 수 있다.

```python
"a" in "apple"
```

#### (3) Identity

`is` 연산자를 통해 동일한 object인지 확인할 수 있다.

```python
a=1000006
b=1000006
print(a is b)
print(id(a), id(b))
```

#### (4) Indexing/Slicing

`[]`를 통한 값 접근 및 `[:]`을 통한 슬라이싱

### VI. 연산자 우선순위

1. `()`을 통한 grouping
2. Slicing
3. Indexing
4. 제곱연산자 **
5. 단항연산자 +, - (음수/양수 부호)
6. 산술연산자 *, /, %
7. 산술연산자 +, -
8. 비교연산자, `in`, `is`
9. `not`
10. `and`
11. `or`



## 6. 기초 형변환(Type conversion, Typecasting)

파이썬에서 데이터타입은 서로 변환할 수 있다.

### I. 암시적 형변환(Implicit Type Conversion)

사용자가 의도하지 않았지만, 파이썬 내부적으로 자동으로 형변환 하는 경우이다. 아래의 상황에서만 가능하다.

- bool
- Numbers (int, float, complex)

### II. 명시적 형변환(Explicit Type Conversion)

위의 상황을 제외하고는 모두 명시적으로 형 변환을 해주어야한다.

- string -> intger : 형식에 맞는 숫자만 가능
- integer -> string : 모두 가능

암시적 형변환이 되는 모든 경우도 명시적으로 형변환이 가능하다.

- `int()` : string, float를 int로 변환
- `float()` : string, int를 float로 변환
- `str()` : int, float, list, tuple, dictionary를 문자열로 변환

`list(), tuple()` 등은 다음 챕터에서 배울 예정이다.



## 7. 시퀀스(sequence) 자료형

`시퀀스`는 데이터의 순서대로 나열된 형식을 나타낸다.

**주의! 순서대로 나열된 것이 정렬되었다라는 뜻은 아니다.**

파이썬에서 기본적인 시퀀스 타입은 다음과 같다.

1. 리스트(list)
2. 튜플(tuple)
3. 레인지(range)
4. 문자열(string)
5. 바이너리(binary) : 따로 다루지는 않는다.

### I. list

**활용법**

```python
[value1, value2, value3]
```

리스트는 대괄호`[]` 를 통해 만들 수 있다.

값에 대한 접근은 `list[i]`를 통한다.

```python
students = ["kim", "lee", "park"]
```

### II. tuple

**활용법**

```python
(value1, value2)
```

튜플은 리스트와 유사하지만, `()`로 묶어서 표현한다.

그리고 tuple은 수정 불가능(immutable)하고, 읽을 수 밖에 없다.

직접 사용하는 것보다는 파이썬 내부에서 사용하고 있다.

```python
tuple_ex = (1, 2)
is_tuple = 1, 2
```

### III. range()

숫자의 시퀀스를 나타내기 위해 사용된다.

기본형 : `range(n)`

> 0부터 n-1까지 값을 가짐

범위 지정 : `range(n, m)`

> n부터 m-1까지 값을 가짐

범위 및 스텝 지정 : `range(n, m, s)`

> n부터 m-1까지 +s만큼 증가한다

```python
list(range(10))
list(range(3, 10))
list(range(0, 30, 3))
```

### IV. 시퀀스에서 활용할 수 있는 연산자/함수

| operation  | 설명                    |
| ---------- | ----------------------- |
| x in s     | containment test        |
| x not in s | containment test        |
| s1 + s2    | concatenation           |
| s * n      | n번만큼 반복하여 더하기 |
| s[i]       | indexing                |
| s[i:j]     | slicing                 |
| s[i:j:k]   | k간격으로 slicing       |
| len(s)     | 길이                    |
| min(s)     | 최솟값                  |
| max(s)     | 최댓값                  |
| s.count(x) | x의 갯수                |



## 8. set, dictionary

- `set`과 `dictionary`는 기본적으로 순서가 없다.

### I. set

세트는 수학에서의 집합과 동일하게 처리된다.

세트는 중괄호`{}`를 통해 만들며, 순서가 없고 중복된 값이 없다.

**활용법**

```python
{value1, value2, value3}
```

| 연산자/함수       | 설명   |
| ----------------- | ------ |
| a - b             | 차집합 |
| a \| b            | 합집합 |
| a & b             | 교집합 |
| a.union(b)        | 합집합 |
| a.intersection(b) | 교집합 |

```python
set_a = {1,2,3}
set_b = {3,6,9}
print(set_a - set_b)
print(set_a | set_b)
print(set_a & set_b)
print(set_a.union(set_b))
print(set_a.intersection(set_b))
```

- `set`을 활용하면 `list`의 중복된 값을 손쉽게 제거할 수 있다.

```python
l = [1, 2, 3, 1, 2, 1]
list(set(l))
```

### II. dictionary

**활용법**

```python
{Key1:Value1, Key2:Value2, Key3:Value3, ...}
```

- 딕셔너리는 `key`와 `value`가 쌍으로 이뤄져있으며, 궁극의 자료구조입니다.
- `{}`를 통해 만들며, `dict()`로 만들 수도 있습니다.
- `key`는 immutable한 모든 것이 가능하다. (불변값 : string, integer, float, boolean, tuple, range)
- `value`는 `list`, `dictionary`를 포함한 모든 것이 가능하다.