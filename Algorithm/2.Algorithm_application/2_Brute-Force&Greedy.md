# Brute-Force & Greedy

## 학습 목표

* 재귀적 알고리즘의 특성을 이해하고 이를 구현하기 위한 재귀 호출에 대해 학습한다.
* 완전 검색의 개념을 이해하고 완전 검색을 통한 문제 해결 방법에 대해 학습한다.
* 조합적 문제(Combinatorial Problems)에 대한 완전 검색 방법에 대해 이해한다.
  * 순열, 조합, 부분집합을 생성하는 알고리즘을 학습한다.
* 탐욕 알고리즘 기법의 개념과 주요 특성을 이해한다.



## 반복(Iteration)과 재귀(Recursion)

* 반복과 재귀는 유사한 작업을 수행할 수 있다.
* 반복은 수행하는 작업이 완료될 때까지 계속 반복
  * 루프(for, while 구조)
* 재귀는 주어진 문제의 해를 구하기 위해 동일하면서 더 작은 문제의 해를 이용하는 방법
  * 하나의 큰 문제를 해결할 수 있는(해결하기 쉬운) 더 작은 문제로 쪼개고 결과들을 결합한다.
  * 재귀 함수로 구현

### 1. 반복 구조

* 초기화(Loop Initialization)
  * 반복되는 명령문을 실행하기 전에 조건 검사에 사용할 변수의 초기값 설정
* 조건 검사(Check control expression)
* 반복할 명령문 실행(Action)
* 업데이트(Loop update)
  * 무한 루브(Infinite loop)가 되지 않게 조건이 거짓(false)이 되게 한다.



### 2. 재귀적 알고리즘

* 재귀적 정의는 두 부분으로 나뉜다.
* 하나 또는 그 이상의 기본 경우(basis case or rule)
  * 집합에 포함되어 있는 원소로 induction을 생성하기 위한 시드(seed)역할
* 하나 또는 그 이상의 유도된 경우(inductive case or rule)
  * 새로운 집합의 원소를 생성하기 위해 결합되어지는 방법



### 3. 재귀 함수(Recursive function)

* 함수 내부에서 직접 혹은 간접적으로 자기 자신을 호출하는 함수
* 일반적으로 재귀적 정의를 이용해서 재귀 함수를 구현한다.
* 따라서, 기본 부분(basis part)와 유도 파트(inductive part)로 구성된다.
* 재귀적 프로그래을 작성하는 것은 반복 구조에 비해 간결하고 이해하기 쉽다.
  * 그러나 재귀에 대해 익숙하지 않은 개발자들은 어렵다고 느낀다.
* 함수 호출은 프로그램 메모리 구조에서 스택을 사용한다. 따라서 재귀 호출은 반복적인 스택의 사용을 의미하며 메모리 및 속도에서 성능저하가 발생한다.



### 4. 반복 또는 재귀?

* 해결할 문제를 고려해서 반복이나 재귀의 방법을 선택
* 재귀는 문제 해결을 위한 알고리즘 설계가 간단하고 자연스럽다.
  * 추상 자료형(List, Tree 등)의 알고리즘은 재귀적 구현이 간단하고 자연스러운 경우가 많다.
* 일반적으로 재귀적 알고리즘은 반복(Iterative) 알고리즘보다 더 많은 메모리와 연산을 필요로 한다.
* **입력 값 n이 커질 수록 재귀 알고리즘은 반복에 비해 비효율적일 수 있다.**

|                    | 재귀                                               | 반복                  |
| ------------------ | -------------------------------------------------- | --------------------- |
| **종료**           | 재귀 함수 호출이 종료되는 베이스 케이스(base case) | 반복문의 종료 조건    |
| **수행 시간**      | (상대적) 느림                                      | 빠름                  |
| **메모리 공간**    | (상대적) 많이 사용                                 | 적게 사용             |
| **소스 코드 길이** | 짧고 간결                                          | 길다                  |
| **소스 코드 형태** | 선택 구조(if...else)                               | 반복 구조(for, while) |
| **무한 반복시**    | 스택 오버플로우                                    | CPU를 반복해서 점유   |



## 완전 검색 기법

* brute-force는 문제를 해결하기 위한 간단하고 쉬운 접근법이다.
* brute-force 방법은 대부분의 문제에 적용 가능한다.
* 문제에 포함된 자료(요소, 인스턴스)의 크기가 작다면 유용하다.
* 학술적 또는 교육적 목적을 위해 알고리즘을 효율성을 판단하기 위한 척도로 사용된다.
* 모든 경우의 수를 생성하고 테스트하기 때문에 수행 속도는 느리지만, 해답을 찾아내지 못할 확률이 작다.
* 이를 기반으로 그리디 기법이나 동적 계획법을 이용해서 효율적인 알고리즘을 찾을 수 있다.
* **우선 완전 검색으로 접근하여 해답을 도출한 후, 성능 개선을 위해 다른 알고리즘을 사용하고 해답을 확인하는 것이 바람직**하다.



## 조합적 문제

### 1. 순열(Permutation)

* 서로 다른 것들 중 몇 개를 뽑아서 한 줄로 나열하는 것
* 서로 다른 n개 중 r개를 택하는 순열은 `nPr`로 표현한다.
* `nPr = n * (n - 1) * (n - 2) * ... * (n - r + 1)`
* 다수의 알고리즘 문제들은 순서화된 요소들의 집합에서 최선의 방법을 찾는 것과 관련이 있다.
* n개의 요소들에 대해서 n!개의 순열들이 존재한다.

#### 재귀 호출을 통한 순열 생성

```python
def perm(n, k):
    if n == k:
        print(arr)
    else:
        for i in range(k, n):
            arr[k], arr[i] = arr[i], arr[k]
            perm(n, k + 1)
            arr[k], arr[i] = arr[i], arr[k]
```

```python
def perm2(n, k):
	if n == k:
        print(t)
    else:
        for i in range(n):
            if not visited[i]:
                t[k] = arr[i]
                visited[i] = 1
                perm2(n, k + 1)
                visited[i] = 0
```



### 2. 부분집합

* 집합에 포함된 원소들을 선택하는 것이다.
* 다수의 중요 알고리즘들이 원소들의 그룹에서 최적의 부분집합을 찾는 것이다.
  * 예) 배낭 짐싸기(knapsack)
* N개의 원소를 포함한 집합
  * 자기 자신과 공집합을 포함한 모든 부분집합(power set)의 개수는 2^N개
  * 원소의 수가 증가하면 부분집합의 개수는 지수적으로 증가

* 바이너리 카운팅을 통한 사전적 순서(Lexicographical Order)
  * 부분집합을 생성하기 위한 가장 자연스러운 방법이다.
  * 바이너리 카운팅(Binary Counting)은 사전적 순서로 생성하기 위한 가장 간단한 방법이다.

```python
for i in range(1 << n):
	for j in range(n):
		if i & (1 << j):
			print(arr[j], end=' ')
    print()
```



### 3. 조합

* 서로 다른 n개의 원소 중 r개를 순서 없이 골라낸 것을 조합(Combination)이라고 부른다.
* 조합의 수식
  * nCr = n! / (n-r)!r!
  * nCr = n-1Cr-1 + n-1Cr, nC0 = 1(재귀적 표현)



## 탐욕 알고리즘

* 탐욕 알고리즘은 최적해를 구하는 데 사용되는 근시안적인 방법
* 일반적으로 머리 속에 떠오로는 생각을 검증 없이 바로 구현하면 Greedy 접근이 된다.
* 여러 경우 중 하나를 선택할 때마다 그 순간에 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 해답에 도달하낟.
* 각 선택 시점에서 이루어지는 결정은 지역적으로는 최적이지만, 이를 통해 최종적인 해답을 만들었다고 하여 **그것이 최적이라는 보장은 없다.**
* 일단, 한 번 선택된 것은 번복하지 않는다. 이런 특성 때문에 대부분의 탐욕 알고리즘들은 단순하며, 또한 제한적인 문제들에 적용된다.
* 최적화 문제(optimization)란 가능한 해들 중에서 가장 좋은(최대 또는 최소) 해를 찾는 문제이다.

### 1. 탐욕 알고리즘 동작 과정

* 해 선택
  * 현재 상태에서 부분 문제의 최적 해를 구한 뒤, 이를 부분해 집합(Solution Set)에 추가한다.
* 실행 가능성 검사
  * 새로운 부분 해 집합이 실행가능한지를 확인한다. 곧, 문제의 제약 조건을 위반하지 않는 지를 검사한다.
* 해 검사
  * 새로운 부분 해 집합이 문제의 해가 되는지를 확인한다. 아직 전체 문제의 해가 완성되지 않았다면 1의 해 선택부터 다시 시작한다.