# Stack

## 계산기

* 문자열로 된 계산식이 주어질 때, 스택을 이용하여 이 계산식의 값을 계산할 수 있다.
* 문자열 수식 계산의 일반적 방법
  * 중위 표기법의 수식을 후위 표기법으로 변경한다. (스택 이용) (A+B => AB+)
  * 후위 표기법의 수식을 스택을 이용하여 계산한다.

```python
s = '(6+5*(2-8)/2)'

stack = [None] * 100
top = -1
result = []

def push(n):
    global top
    top += 1
    stack[top] = n

def pop():
    global top
    result = stack[top]
    stack[top] = None
    top -= 1
    return result

def prior(n):
    if n == '*' or n == '/':
        return 5
    elif n == '+' or n == '-':
        return 4
    elif n == '(':
        return 3
    elif n == ')':
        return 2
    else:
        return 1

for i in s:
    if top == -1 and prior(i) >= 3:
        push(i)
    elif prior(i) == 1:
        result.append(i)
    elif prior(i) == 3:
        push(i)
    elif prior(i) == 2:
        while prior(stack[top]) != 3:
            result.append(pop())
        pop()
    elif prior(i) > prior(stack[top]):
        push(i)
    elif prior(i) <= prior(stack[top]):
        while prior(i) <= prior(stack[top]):
            result.append(pop())
        push(i)
while top != -1:
    result.append(pop())

print(result)
```



## 백트래킹

* 백트래킹(Backtracking) 기법은 해를 찾는 도중에 '막히면' (즉, 해가 아니면) 되돌아가서 다시 해를 찾아가는 기법이다.
* 백트래킹 기법은 최적화(optimization) 문제와 결정(decision) 문제를 해결할 수 있다.
* 결정 문제 : 문제의 조건을 만족하는 해가 존재하는지의 여부를 'yes' 또는 'no'가 답하는 문제
  * 미로 찾기
  * n-Queen 문제
  * Map coloring
  * 부분 집합의 합(Subset Sum) 문제 등
* 백트래킹과 깊이우선탐색(DFS)과의 차이
  * 가지치기를 통해 시도의 횟수를 줄임(prunning)
* 백트래킹 기법
  * 어떤 노드의 유망성을 점검한 후에 유망(promising)하지 않다고 결정되면(prunning) 그 노드의 부모로 되돌아가(backtracking) 다음 자식 노드로 감
* 백트래킹 절차
  * 상태 공간 트리의 깊이 우선 검색을 실시한다.
  * 각 노드가 유망한지를 점검한다.
  * 만일 그 노드가 유망하지 않다면, 그 노드의 부모 노드로 돌아가서 검색을 계속한다.
* 백트래킹으로 부분집합 구하기

```python
def backtrack(a, k, N):
    c = [0] * 2
    
    if k == N:
        process_solution(a, k)
    else:
        k += 1
        ncandidates = construct_candidates(a, k, N, c)
        for i in range(ncandidates):
            a[k] = c[i]
            backtrack(a, k, N)
          	
def construct_candidates(a, k, N, c):
    c[0] = 1
    c[1] = 0
    return 2

def process_solution(a, k):
    for i in range(len(a)):
        if a[i]:
            print(i, end=' ')
    print()
    
a = [0] * 100
backtrack(a, 0, 3)
```



## 분할 정복 알고리즘

* 설계 전략
  * 분할(Divide) : 해결할 문제를 여러 개의 작은 부분으로 나눈다.
  * 정복(Conquer) : 나눈 작은 문제를 각각 해결한다.
  * 통합(Combine) : (필요하다면) 해결된 해답을 모은다.
* Merge sort

```python
def merge_sort(A):
    N = len(A)
    if N <= 1:
        return A
    
    left = merge_sort(A[:N // 2])
    right = merge_sort(A[N // 2:])
    
    return merge(left, right)

def merge(left, right):
    i, j, k = 0, 0, 0
    sorted_list = [0] * (len(left) + len(right))
    
    while len(left) > i and len(right) > j:
        if left[i] > right[j]:
            sorted_list[k] = right[j]
            j += 1
        else:
            sorted_list[k] = left[i]
            i += 1
        k += 1
        
    while len(left) > i:
        sorted_list[k] = left[i]
        i += 1
        k += 1
    while len(right) > j:
        sorted_list[k] = right[j]
        j += 1
        k += 1
        
    return sorted_list

print(merge_sort([8, 7, 6, 5, 4, 3, 2, 1]))
```

