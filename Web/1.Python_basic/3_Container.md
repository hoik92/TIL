# 1월 2주차

## I. 문자열 메소드 활용하기

### 1. 변형

`.capitalize()` : 앞글자를 대문자로 만들어 반환한다.

```python
a = "hI! Everyone, I'm kim"
a.capitalize()
```

`.title()` : 어포스트로피나 공백을 이후를 대문자로 만들어 반환한다.

```python
a.title()
```

`.upper()` : 모두 대문자로 만들어 반환한다.

```python
a.upper()
```

`lower()` : 모두 소문자로 만들어 반환한다.

```python
a.lower()
```

`swapcase()` : 대<->소문자로 변경하여 반환한다.

```python
a.swapcase()
```

`.join(iterable)` : 특정한 문자열로 만들어 반환한다.

```python
a = " ".join(["hello", "my", "name", "is", "john"])
a.split()
```

`.replace(old, new, (count))` : 바꿀 대상 글자를 새로운 글자로 바꿔서 반환한다.

count를 지정하면 해당 갯수만큼만 시행한다.

```python
s1 = 'yay!'
# a => _
print(s1.replace('a', '_'))
s2 = 'woooooooow'
# oooooooo => oooo
print(s2.replace('o', '', 4))
```

`.strip([chars])` : 특정한 문자들을 지정하면, 양쪽을 제거하거나 왼쪽을 제거하거나(lstrip) 오른쪽을 제거한다(rstrip)

지정하지 않으면 공백을 제거한다.

```python
'                       hello my name is john                    '.strip()
```

```python
'                       hello my name is john                    '.lstrip()
```

```python
'                       hello my name is john                    '.rstrip()
```

### 2. 탐색 및 검증

`.fine(x)` : x의 첫 번째 위치를 반환한다. 없으면 -1을 반환한다.

```python
"ssafy".find('z')
```

`.index(x)` : x의 첫 번째 위치를 반환한다. 없으면 오류가 발생한다.

```python
"ssafy".index('a')
"ssafy".index('z')
```

`.isalpha()`

`.isdecimal()`

`.isdigit()`

`.isnumeric()`

`.isspace()`

`.issuper()`

`.istitle()`

`.islower()`

`.split()` : 문자열을 특정한 단위로 나누어 리스트로 반환한다.

```python
"hello world".split()
```



## II. 리스트 메소드 활용하기

### 1. 값 추가 및 삭제

`.append(x)` : 리스트에 값을 추가할 수 있다.

```python
caffe = ['starbucks', 'tomntoms', 'hollys']
caffe.append('w cafe')
print(caffe)
```

```python
# append를 사용하지 않고 list에 추가
caffe[len(caffe):] = ['w cafe']
caffe += ['w cafe']
```

`.extend(iterable)` : 리스트에 iterable(list, range, tuple, string*유의*) 값을 붙일 수 있다.

```python
caffe.extend(['coffe bean', '빽다방', '커피니', '던킨 도넛', '크리스피 크림'])
print(caffe)
```

`.insert(i, x)` : 정해진 위치 i에 값을 추가한다.

```python
caffe.insert(0, 'hi')
caffe.insert(len(caffe), 'bye')
caffe.insert(10000000, 'where')
# 길이를 넘어서는 인덱스는 무조건 마지막에 하나만 붙는다.
```

`.remove(x)` : 리스트에서 값이 x인 것을 삭제한다.

```python
numbers = [1, 2, 3, 1, 2]
numbers.remove(1)
print(numbers)
```

`.pop(i)` : 정해진 위치 `i`에 있는 값을 삭제하며, 그 항목을 반환한다.

`i`가 지정되지 않으면 마지막 항목을 삭제하고 되돌려준다.

```python
a = [1, 2, 3, 4, 5, 6]
print(a.pop(0))
```

### 2. 탐색 및 정렬

`.index(x)` : 원하는 값을 찾아 index 값을 반환한다.

```python
a = [1, 2, 3, 4, 5]
a.index(3)
# 값이 존재하지 않으면 오류가 발생한다.
```

`.count(x)` : 원하는 값의 갯수를 확인할 수 있다.

```python
a = [1, 2, 5, 1, 5, 1]
a.count(1)
```

```python
# 따라서 원하는 값을 모두 삭제하려면 다음과 같이 할 수 있다.
a = [1, 2, 1, 3, 4]
for i in range(a.count(1)):
    a.remove(1)
print(a)
```

`.sort()` : 정렬한다.

sorted()와는 다르게 원본 list를 변형시키고, None을 리턴한다.

```python
import random
lotto = random.sample(range(1, 46), 6)

print(sorted(lotto))
print(lotto)
lotto.sort()
print(lotto)
```

`.reverse()` : 반대로 뒤집는다.(정렬 아님)

```python
classroom = ['Tom', 'David', 'Justin']
print(list(reversed(classroom)))
print(classroom)
classroom.reverse()
print(classroom)
```

### 3. 복사

```python
original_list = [1, 2, 3]
new_list = original_list
print(id(original_list))
print(id(new_list))
```

```python
new_list = original_list[:]
print(id(original_list))
print(id(new_list))
```

```python
student = {"name": "john", "age": "34"}
new_student = student.copy()
print(new_student is student)
```

- 파이썬에서 모든 변수는 객체의 주소를 가지고 있을 뿐이다.

`num = [1, 2, 3]`

- 위와 같이 변수를 생성하면 new_student라는 객체를 생성하고, 변수에는 객체의 주소가 저장된다.
- 변경가능한(mutable) 자료형과 변경불가능한(immutable) 자료형은 서로 다르게 동작한다.

따라서, 복사를 하고 싶을 때에는 다음과 같이 해야한다.

```python
a = [1, 2, 3]
b = a[:]
b[0] = 5
print(a)

a = [1, 2, 3]
b = list(a)
b[0] = 5
print(a)
```

- 하지만, 이렇게 하는 것도 일부 상황에만 서로 다른 얕은 복사(shallow copy)다.
- 만일 중첩된 상황에서 복사를 하고 싶다면, 깊은 복사(deep copy)를 해야한다.
- 즉, 내부에 있는 모든 객체까지 새롭게 값이 변경된다.

```python
import copy
a = [1, 2, [1, 2]]
b = copy.deepcopy(a)
b[2][0] = 3
print(a)
```

### 4. 삭제

리스트의 모든 항목을 삭제한다.

```python
numbers = list(range(1, 46))
numbers.clear()
print(numbers)
```



## III. List Comprehension

List를 만들 수 있는 간단한 방법이 있다.

### 1. 사전 준비

> 다음의 리스트를 만들어보세요.

1. 1~10까지의 숫자 중 짝수만 담긴 리스트 `even_list`
2. 1~10까지의 숫자로 만든 세제곱 담긴 리스트 `cubic_list`

```python
even_list = []
for i in range(1, 11):
    if i % 2 == 0:
        even_list.append(i)
        
cubic_list = []
for i in range(1, 11):
    cubic_list.append(i ** 3)
```

```python
even_list = [x * 2 for x in range(1, 6)]
```

```python
cubic_list = [i ** 3 for i in range(1, 11)]
```

### 2. 활용법

여러개의 `for` 혹은 `if`문을 중첩적으로 사용 가능하다.

### 3. 연습 문제

#### 짝짓기 - 곱집합

> 주어진 두 list의 가능한 모든 조합을 담은 `pair` 리스트를 만들어주세요.

1. 반복문 활용
2. list comprehension 활용

---

```python
girls = ['jane', 'iu', 'mary']
boys = ['justin', 'david', 'kim']
```

```python
# 1
girls = ['jane', 'iu', 'mary']
boys = ['justin', 'david', 'kim']

couple = []
for girl in girls:
    for boy in boys:
        couple.append((girl, boy))
print(couple)
```

```python
# 2
girls = ['jane', 'iu', 'mary']
boys = ['justin', 'david', 'kim']

couple = [(girl, boy) for girl in girls for girl in girls]
print(couple)
```

#### 피타고라스 정리

> 주어진 조건(x < y < z < 50) 내에서 피타고라스 방정식의 해를 찾아보세요.

1. 반복문 활용
2. list comprehension 활용

```python
# 1
ans = []
for x in range(1, 50):
    for y in range(x + 1, 50):
        for z in range(y + 1, 50):
            if x ** 2 + y ** 2 == z ** 2:
                ans.append((x, y, z))
print(ans)
```

```python
# 2
ans = [(x, y, z) for x in range(1, 50) for y in range(x, 50) for z in range(y, 50) if x ** 2 + y ** 2 == z **2]
print(ans)
```

#### 모음 제거하기

> 다음의 문장에서 모음(a, e, i, o, u)를 모두 제거하시오.

1. list comprehension만 사용해보세요.

```python
    words = 'Life is too short, you need python!'
```

```python
words = 'Life is too short, you need python!'
ans = ''.join([i for i in words if i not in 'aeiou'])
print(ans)
```

