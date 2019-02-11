# Stack

## 스택(stack)

### 1. 스택

* 물건을 쌓아 올리듯 자료를 쌓아 올린 형태의 자료구조이다.
* 스택에 저장된 자료는 선형 구조를 갖는다.
  * 선형 구조 : 자료 간의 관계가 1대1
  * 비선형 구조 : 자료 간의 관계가 1대N(예 : 트리)
* 스택에 자료를 삽입하거나 스택에서 자료를 꺼낼 수 있다.
* 마지막에 삽입한 자료를 가장 먼저 꺼낸다. 후입선출(Last-In-First-Out, LIFO)

### 2. 스택의 구현

* 자료 구조
  * 자료를 선형으로 저장할 저장소(예 : 배열)
  * 스택에서 마지막 삽입된 원소의 위치를 top이라 부른다.
* 연산
  * 삽입(push)
  * 삭제(pop)
  * 스택이 공백인지 아닌지 확인(isEmpty)
  * 스택의 top에 있는 item(원소)을 반환하는 연산(peek)

```python
stack = [0] * N
top = -1

def push(item):
	top += 1
	stack[top] = item
	
def pop():
	if top == -1:
		return
	else:
		t = stack[top]
		top -= 1
		return t
```

### 3. 스택 구현 고려 사항

* 1차원 배열을 사용하여 구현할 경우 구현이 용이하지만 스택의 크기를 변경하기 어렵다.
* 이를 해결하기 위해 저장소를 동적으로 할당하여 구현하는 방법이 있다. 구현이 복잡하지만 메모리를 효율적으로 사용할 수 있다.

### 4. Function call

* 프로그램에서의 함수 호출과 복귀에 따른 수행 순서를 관리
  * 가장 마지막에 호출된 함수가 가장 먼저 실행을 완료하고 복귀하는 후입선출 구조(스택)
  * 함수 호출이 발생하면 호출 함수 수행에 필요한 지역변수, 매개변수 및 수행 후 복귀할 주소 등의 정보를 스택 프레임에 저장하여 시스템 스택에 삽입
  * 함수의 실행이 끝나면 시스템 스택의 top 원소(스택 프레임)를 삭제(pop)하면서 프레임에 저장되어 있던 복귀주소를 확인하고 복귀
  * 함수 호출과 복귀에 따라 이 과정을 반복하여 전체 프로그램 수행이 종료되면 시스템 스택은 공백 스택이 된다.



## 재귀

### 1. 재귀호출

* 자기 자신을 호출하여 순환 수행되는 것
* 작업의 특성에 따라 일반적인 호출방식보다 재귀호출방식을 사용하여 함수를 만들면 프로그램의 크기를 줄이고 간단하게 작성
* 재귀 호출의 예 : factorial

```python
def factorial(n):
	if n == 1:
		return n
	else:
		return n * factorial(n-1)
```

* 재귀 호출의 예 : fibonacci

```python
def fibo(n):
	if n < 2:
		return n
	else:
		return fibo(n-1) + fibo(n-2)
```

### 2. Memoization

* 앞의 예에서 피보나치 수를 구하는 함수를 재귀함수로 구현한 알고리즘은 "엄청난 중복 호출이 존재한다."
* 메모이제이션(memoization)은 프로그램을 실행할 때 이전에 계산한 값을 메모리에 저장해서 매번 다시 계산하지 않도록 하여 전체적인 실행속도를 빠르게 하는 기술이다.
* memoization(메모리에 넣기) != memorization(기억하기)
* Memoization 예 : fibonacci

```python
def fibo_m(n):
	memo = [0] * N
	memo[0], memo[1] = 0, 1
	if n < 2 or memo[n]:
		return memo[n]
	else:
		memo[n] = fibo_m(n-1) + fibo_m(n-2)
	return memo[n]
```



## 3. DP(Dynamic Programming)

* 동적 계획(Dynamic Programming) 알고리즘은 그리디 알고리즘과 같이 최적화 문제를 해결하는 알고리즘이다.
* 먼저 입력 크기가 작은 부분 문제들을 모두 해결한 후에 그 해들을 이용하여 보다 큰 크기의 부분 문제들을 해결하고, 최종적으로 원래 주어진 입력의 문제를 해결하는 알고리즘이다.
* DP 예 : fibonacci

```python
def fibo_dp(n):
	f = [0] * N
	for i in range(2, n+1):
		f[i] = f[i-1] + f[i-2]
	return f[n]
```

### 1. DP의 구현 방식

* recursive 방식 : fibo_m()
* iterative 방식 : fibo_dp()



## DFS(Depth First Search, 깊이 우선 탐색)

* 비선형구조인 그래프 구조는 그래프로 표현된 모든 자료를 빠짐없이 검색하는 것이 중요함

* 표현법

  * 인접 행렬
  * 인접 리스트

* 순회

  * DFS : stack, visited
  * BFS : Q

* 시작 정점의 한 방향으로 갈 수 있는 경로가 있는 곳까지 깊이 탐색해 가다가 더 이상 갈 곳이 없게 되면, 가장 마지막에 만났떤 갈림길 간선이 있는 정점으로 되돌아와서 다른 방향의 정점으로 탐색을 계속 반복하여 결국 모든 정점을 방문하는 순회방법(후입선출 구조의 스택 사용)

  * 시작 정점 v를 결정하여 방문한다.
  * 정점 v에 인접한 정점 중에서
    * 방문하지 않은 정점 w가 있으면, 정점 v를 스택에 push하고 정점 w를 방문한다. 그리고 w를 v로 하여 다시 반복한다.
    * 방문하지 않은 정점이 없으면, 탐색의 방향을 바꾸기 위해서 스택을 pop하여 받은 가장 마지막 방문 정점을 v로 하여 다시 반복한다.
  * 스택이 공백이 될 때까지 위를 반복한다.

  ```
  visited[], stack[] 초기화
  DFS(v)
  	v 방문;
  	visited[v] <- true;
  	do {
          if (v의 인접 정점 중 방문 안 한 w 찾기)
          	push(v);
          while(w) {
              w 방문;
              visited[w] <- true;
              push(w);
              v <- w;
              v의 인접 정점 중 방문 안 한 w 찾기
          }
          v <- pop(stack);
  	} while(v)
  end DFS()
  ```

  