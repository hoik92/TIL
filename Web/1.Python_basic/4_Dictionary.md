# 1월 2주차

## I. 딕셔너리 메소드 활용

### 1. 추가 및 삭제

`.pop(key (, default))` : key가 딕셔너리에 있으면 제거하고 그 값을 돌려준다. 그렇지 않으면 default를 반환한다.

```python
my_dict = {'apple': '사과', 'banana': '바나나'}
my_dict.pop('apple')
my_dict.pop('melon', 0)
```

default가 없는 상태에서 딕셔너리에 없으면 KeyError가 발생한다.

`.update()` : 값을 제공하는 key, value로 덮어쓴다.

```python
my_dict = {'apple': '사과', 'banana': '바나나', 'melon': '멜론'}
my_dict.update({'apple': '사과아'})
my_dict.update({'pineapple': '파인애플'})
print(my_dict)
```

`.get(key (, default))` : key를 통해 value를 가져온다.

절대로 KeyError가 발생하지 않습니다. default는 기본적으로 None이다.

```python
my_dict = {'apple': '사과', 'banana': '바나나', 'melon': '멜론'}
my_dict.get('pineapple')
my_dict.get('apple')
my_dict.get('pineapple', 0)
```

### 2. dictionary comprehension

dictionary도 comprehension을 활용하여 만들 수 있다.

```python
cubic = {x: x**3 for x in range(1, 8)}
print(cubic)
```

```python
cubic = {x**3 for x in range(1, 8)}
print(cubic)
# key: value pair가 아닐 경우 set이 생성된다.
```

```python
# 다음의 딕셔너리에서 미세먼지 농도가 80 초과 지역만 뽑아 봅시다.
# 예) {'경기': 82, '부산': 90}
dusts = {'서울': 72, '경기': 82, '대전': 29, '중국': 200}

# comprehension 미사용
new_dict = {}
for key, value in dusts.items():
    if value > 80:
        new_dict[key] = value
print(new_dict)

# comprehension 사용
{key: value for key, value in dusts.items() if  value > 80}
```

### 3. 정리 `map()`, `zip()`, `filter()`

`map()` :

- Iterable의 모든 원소에 function을 적용한 후 그 결과를 돌려준다.
- 대표적으로 iterable한 타입 - list, dict, set, str, bytes, tuple, range
- return은 map_object 형태로 된다.
- function은 사용자 정의 함수도 가능하다.

```python
a = [1, 2, 3]
# 위의 코드를 문자열 '123'으로 만들어봅시다.
''.join(map(str, a))
# '123'

''.join([str(x) for x in a])
# '123'

a = ['1', '2', '3']
# 위의 코드를 [1, 2, 3]으로 만들어봅시다.
list(map(int, a))
# [1, 2, 3]

[int(x) for x in a]
# [1, 2, 3]
```

`zip(*iterables)` :

- 복수 iterable한 것들을 모아준다.
- 결과는 튜플의 모음으로 구성된 zip object를 반환한다.

```python
girls = ['jane', 'iu', 'mary']
boys = ['justin', 'david', 'kim']
list(zip(girls, boys))
# [('jane', 'justin'), ('iu', 'david'), ('mary', 'kim')]
```

```python
a = '123'
b = '567'

for digit_a, digit_b in zip(a, b):
    print(digit_a, digit_b)
```

- zip은 반드시 길이가 같을 때 사용해야한다. 가장 짧은 것을 기준으로 구성한다.

```python
num1 = [1, 2, 3]
num2 = ['1', '2']
list(zip(num1, num2))
# [(1, '1'), (2, '2')]
```

`filter(function, iterable)` : iterable에서 function의 반환된 결과가 참인 것들만 구성하여 반환한다.

```python
# 짝수인지 판단하는 함수를 작성해봅시다.
def even(n):
    return not n % 2
    
a = [1, 2, 3]
list(filter(even, a)) # [2]

# 다음의 list comprehension과 동일하다.
[x for x in [1, 2, 3] if even(x)] # [2]

# 다음의 list comprehension과 동일하다.
[x for x in [1, 2, 3] if not x % 2 ] # [2]
```



## II. 세트 메소드 활용

### 1. 추가 및 삭제

`.add(elem)` : elem을 세트에 추가한다.

```python
a = {1, 2, 3, 4}
a.add(5)
a.add(5)
print(a)
# {1, 2, 3, 4, 5}
```

`update(*others)` : 여러가지의 값을 순차적으로 추가한다.

여기서 반드시 iterable한 값을 넣어야한다.

```python
a = {1, 2, 3}
a.update({5, 5, 5, 2}, {7, 9})
print(a)
# {1, 2, 3, 5, 7, 9}
```

`remove(elem)` : elem을 세트에서 삭제하고, 없으면 KeyError가 발생한다.

`discard(elem)` : x를 세트에서 삭제하고 없어도 에러가 발생하지 않는다.

`pop()` : 임의의 원소를 제거해 반환한다.