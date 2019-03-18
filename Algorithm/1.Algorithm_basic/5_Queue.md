# Queue

## 큐

* 스택과 마찬가지로 삽입과 삭제의 위치가 제한적인 자료구조
* 선입선출구조(FIFO : First In First Out)

### 1. 큐의 구조

* front : 저장된 원소 중 첫 번째 원소
* rear : 저장된 원소 중 마지막 원소
* enQueue : 큐의 뒤쪽에 원소를 삽입
* deQueue : 큐의 앞쪽에서 원소를 삭제하고 반환
* createQueue : 공백 상태의 큐를 생성
* isEmpty : 큐가 공백인지 확인
* isFull : 큐가 포화인지 확인
* Qpeek : 큐의 앞쪽에서 원소 삭제 없이 반환

### 2. 큐의 구현

1. 선형 큐

* 1차원 배열을 이용한 큐
* 상태 표현
  * 초기 상태 : front = rear = -1
  * 공백 상태 : front == rear
  * 포화 상태 : rear = n-1 (n : 배열의 크기)

```python
class LinearQueue:
    def __init__(self, N):
        self.front, self.rear = -1, -1
        self.N = N
        self.queue = [0] * self.N
        
    def isEmpty(self):
        return self.front == self.rear
    
    def isFull(self):
        return self.rear == self.N - 1
    
    def enQueue(self, item):
        if not self.isFull():
            self.rear += 1
            self.queue[self.rear] = item
    
    def deQueue(self):
        if not self.isEmpty():
            self.front += 1
            item = self.queue[self.front]
            self.queue[self.front] = 0
            return item
```

2. 원형 큐

* 1차원 배열을 사용하되, 논리적으로는 배열의 처음과 끝이 연결된 원형 형태의 큐
* 상태 표현
  * 초기 상태 : front = rear = 0
  * 공백 상태 : front = rear
  * 포화 상태 : front = (rear + 1) % (n + 1) (n : 배열의 크기)

```python
class CircularQueue:
    def __init__(self, N):
        self.front, self.rear = 0, 0
        self.N = N
        self.queue = [0] * (self.N + 1)
    
    def isEmpty(self):
        return self.front == self.rear
    
    def isFull(self):
        return self.front == (self.rear + 1) % (self.N + 1)
    
    def enQueue(self, item):
        if not self.isFull():
            self.rear = (self.rear + 1) % (self.N + 1)
            self.queue[self.rear] = item
    
    def deQueue(self):
        if not self.isEmpty():
            self.front = (self.front + 1) % (self.N + 1)
            item = self.queue[self.front]
            self.queue[self.front] = 0
            return item
```

3. 연결 큐

* 단순 연결 리스트(Singly Linked List)를 이용한 큐
* 상태 표현
  * 초기 상태 : front = rear = null
  * 공백 상태 : front = rear = null

```python
class Node:
    def __init__(self, item, next=None):
        self.item = item
        self.next = next

class LinkedQueue:
    def __init__(self):
        self.front, self.rear = None, None
    
    def isEmpty(self):
        return self.front == None
    
    def enQueue(self, item):
        new = Node(item)
        if self.isEmpty():
            self.front = new
        else:
            self.rear.next = new
        self.rear = new
    
    def deQueue(self):
        if not self.isEmpty():
            item = self.front.item
            self.front = self.front.next
            if self.isEmpty():
                self.rear = None
            return item
```

