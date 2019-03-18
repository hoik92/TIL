# python 기초

## 1. 조건문

지금까지의 코드는 위에서부터 아래로 순차적으로 명령을 수행하는 프로그램을 작성하였다.

제어문(Control of Flow)은 크게 반복문과 조건문으로 나눌 수 있고, 이는 순서도(Flow chart)로 표현이 가능하다.

### I. 조건문 문법

1. `if` 문은 반드시 일정한 참/거짓을 판단할 수 있는 `조건식`과 함께 사용이 되어야한다. `if <조건식>:`

2-1. `<조건식>`이 참인 경우 `:` 이후의 문장을 수행한다.

2-2. `<조건식>`이 거짓인 경우 `else:` 이후의 문장을 수행한다.

- 이때 반드시 **들여쓰기를** 유의해야한다. 파이썬에서는 코드 블록을 자바나 C언어의 `{}`와 달리 `들여쓰기`로 판단하기 때문이다.
- 앞으로 우리는 `PEP-8`에서 권장하는 `4spaces`를 사용할 것이다.

```python
num = int(input("점수를 입력하세요 : "))

print(num)
if num % 2:
    print("홀수입니다.")
else:
    print("짝수입니다.")
```

### II. 복수 조건문

2개 이상의 조건문을 활용할 경우 `elif <조건식>:`을 활용한다.

```python
score = int(input("점수를 입력하세요 : "))

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")
```

### III. 조건 표현식(Conditional Expression)

**활용법**

```
true_value if <조건식> else false_value
```

와 같이 표현식을 작성할 수 있다. 이는 보통 다른 언어에서 활용되는 삼항연산자와 동일하다.

```python
num = 2
result = "홀수입니다." if num % 2 else "짝수입니다."
print(result)
```



## 2. 반복문

### I. while 문

`while`문은 조건식이 참(True)인 경우 반복적으로 코드를 실행한다. 

**while 문은 종료조건을 반드시 설정해주어야 한다.**

`while`문 역시 `<조건식>`이후에 `:`이 반드시 필요하며,

이후 오는 코드 블록은 `4spaces`로 **들여쓰기**를 해야 한다.

```python
# 1부터 1000까지 자연수 중 3의 배수의 합
total = 0
index = 1
while index <= 1000:
    if index % 3 == 0:
        total += index
    index += 1
print(total)
```



### II. for 문

`for`문은 정해진 범위 내(시퀀스)에서 순차적으로 코드를 실행한다.

```
for variable in sequence:
    code line1
    code line2
```

`for`문은 `sequence`를 순차적으로 **variable**에 값을 바인딩하며, 코드 블록을 시행한다.

```python
# 1부터 1000까지의 자연수 중 5의 배수에 해당되는 자연수들의 총합
num = 0
for i in range(1, 1001):
    if i % 5 == 0:
        num += i
print(num)
```

```python
# 1~30까지의 숫자 중에 홀수만 담긴 리스트
odd = []

for i in range(1, 31):
    if i % 2:
        odd.append(i)
print(odd)
```

