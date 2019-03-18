# Array

## 2차원 배열

* 1차원 List를 묶어놓은 List
* 2차원 이상의 다차원 List는 차원에 따라 Index를 선언
* 2차원 List의 선언 : 세로길이(행의 개수), 가로길이(열의 개수)를 필요로 함
* Python 에서는 데이터 초기화를 통해 변수선언과 초기화가 가능함

### 1. 배열 순회

* n * m 배열의 nm개 모든 원소를 빠짐없이 조사하는 방법
* 행 우선 순회

```python
# i 행의 좌표
# j 열의 좌표
for i in range(len(Array)):
	for j in range(len(Array[i])):
		Array[i][j] # 필요한 연산 수행
```

* 열 우선 순회

```python
# i 행의 좌표
# j 열의 좌표
for j in range(len(Array[0])):
	for i in range(len(Array)):
		Array[i][j] # 필요한 연산 수행
```

* 지그재그 순회

```python
# i 행의 좌표
# j 열의 좌표
for i in range(len(Array)):
	for j in range(len(Array[0])):
		Array[i][j + (m-1-2*j) * (i%2)] # 필요한 연산 수행
```

### 2. 델타를 이용한 2차 배열 탐색

* 2차 배열의 한 좌표에서 4방향(혹은 8방향 등)의 인접 배열 요소를 탐색하는 방법

```
ary[0...n-1][0...n-1]
dx[] <- [0, 0, -1, 1] # 상하좌우
dy[] <- [-1, 1, 0, 0]

for x in range(len(ary)):
	for y in range(len(ary[x])):
		for i in range(4):
			testX <- x + dx[i]
			testY <- y + dy[i]
			test(ary[testX][testY])
```

### 3. 전치 행렬

```python
# i 행의 좌표
# j 열의 좌표
arr = [[1,2,3], [4,5,6], [7,8,9]] # 3*3 행렬

for i in range(3):
	for j in range(3):
		if i < j:
			arr[i][j], arr[j][i] = arr[j][i], arr[i][j]
```



## 부분집합의 합(Subset Sum), 부분집합 생성하기

* 완전검색 기법으로 부분집합 합 문제를 풀기 위해서는, 우선 집합의 모든 부분집합을 생성한 후에 각 부분집합의 합을 계산해야 한다.
* 주어진 집합의 부분집합을 생성하는 방법에 대해서 생각해보자.

### 1. 부분집합의 수

* 집합의 원소개 n개일 때, 공집합을 포함한 부분집합의 수는 2^n 개이다.
* 이는 각 원소를 부분집합에 포함시키거나 포함시키지 않는 2가지 경우를 모든 원소에 적용한 경우의 수와 같다.

```python
bit = [0, 0, 0, 0]
for i in range(2):
	bit[0] = i
	for j in range(2):
		bit[1] = j
		for k in range(2):
			bit[2] = k
			for l in range(2):
				bit[3] = l
				print(bit)
```

### 2. 비트 연산자

* `&` : 비트 단위로 AND 연산을 한다.
* `|` : 비트 단위로 OR 연산을 한다.
* `<<` : 피연산자의 비트 열을 왼쪽으로 이동시킨다.
  * 1 << n = 2^n
* `>>` : 피연산자의 비트 열을 오른쪽으로 이동시킨다.

```python
arr = [3, 6, 7, 1, 5, 4]

n = len(arr)

for i in range(1 << n):	# 1 << n : 부분집합의 개수
	for j in range(n):  # 원소의 수만큼 비트를 비교
		if i & (1 << j): # i의 j번째 비트가 1이면 j번째 원소 출력
			print(arr[j], end=' ')
	print()
print()
```



## 검색(Search)

* 저장되어 있는 자료 중에서 원하는 항목을 찾는 작업
* 검색의 종류
  * 순차 검색(sequential search)
  * 이진 검색(binary search)
  * 해쉬(hash)

### 1. 순차 검색(Sequential Search)

* 일렬로 되어 있는 자료를 순서대로 검색하는 방법
* 가장 간단하고 직관적인 검색 방법
* 순차구조로 구현된 자료구조에서 원하는 항목을 찾을 때 유용함
* 알고리즘이 단순하여 구현이 쉽지만, 검색 대상이 많은 경우 수행시간이 급격히 증가하여 비요휼적

1. 정렬되어 있지 않은 경우

* 시간복잡도 : O(n)

```
def sequentialSearch(a, n, key):
	i <- 0
	while i < n and a[i] != key:
		i <- i+1
	if i < n: return i
	else: return -1
```

2. 정렬되어 있는 경우

* 시간복잡도 : O(n)

```
def sequentialSearch2(a, n, key):
	i <- 0
	i <- i+1
	while i < n and a[i] < key:
		i <- i+1
	if i < n and a[i] == key: return i
	else: return -1
```

### 2. 이진 검색(Binary Search)

* 자료의 가운데에 있는 항목의 키 값과 비교하여 다음 검색의 위치를 결정하고 검색을 계속 진행하는 방법
* 목적 키를 찾을 때까지 이진 검색을 순환적으로 반복 수행함으로써 검색 범위를 반으로 줄여가면서 보다 빠르게 검색을 수행함
* 이진 검색을 하기 위해서는 자료가 정렬된 상태여야 한다.

```
def binarySearch(a, key):
	start <- 0 end <- length(a)-1
	while start <= end:
		middle = (start + end) // 2
		if a[middle] == key:
			return true
		elif a[middle] > key:
			end = middle - 1
		else: start = middle + 1
	return false
```

