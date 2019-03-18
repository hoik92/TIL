# Tree

## 트리

* 비선형 구조
* 원소들 간에 1:n 관계를 가지는 자료구조
* 원소들 간에 계층관계를 가지는 계층형 자료구조
* 상위 원소에서 하위 원소로 내려가면서 확장되는 트리(나무)모양의 구조
  * 노드 중 최상위 노드를 루트(root)라 한다.
  * 나머지 노드들은 n(>=0)개의 분리 집합 T1, ..., TN으로 분리될 수 있다.
  * 이들은 각각 하나의 트리가 되며(재귀적 정의) 루트의 부 트리(subtree)라 한다.



### 용어 정리

- 노드(node) - 트리의 원소
- 간선(edge) - 노드를 연결하는 선. 부모 노드와 자식 노드를 연결
- 루트 노드(root node) - 트리의 시작 노드
- 형제 노드(sibling node) - 같은 부모 노드의 자식 노드들
- 조상 노드 - 간선을 따라 루트 노드까지 이르는 경로에 있는 모든 노드들
- 서브 트리(subtree) - 부모 노드와 연결된 간선을 끊었을 때 생성되는 트리
- 자손 노드 - 서브 트리에 있는 하위 레벨의 노드들
- 차수(degree)
  - 노드의 차수 - 노드에 연결된 자식 노드의 수
  - 트리의 차수 - 트리에 있는 노드의 차수 중에서 가장 큰 값
- 높이
  - 노드의 높이 - 루트에서 노드에 이르는 간선의 수. 노드의 레벨
  - 트리의 높이 - 트리에 있는 노드의 높이 중에서 가장 큰 값. 최대 레벨



### 이진 트리

* 모든 노드들이 2개의 서브트리를 갖는 특별한 형태의 트리
* 각 노드가 자식 노드를 최대한 2개까지만 가질 수 있는 트리
* 레벨 i에서의 노드의 최대 개수는 2^i 개
* 높이가 h인 이진 트리가 가질 수 있는 노드의 최소 개수는 (h + 1)개가 되며, 최대 개수는 (2^(h+1) - 1)개가 된다.

#### 포화 이진 트리(Full Binary Tree)

* 모든 레벨에 노드가 포화상태로 차 있는 이진 트리

#### 완전 이진 트리(Complete Binary Tree)

* 포화 이진 트리에서 노드 번호 1번부터 n번까지 빈 자리가 없는 이진 트리

#### 편향 이진 트리(Skewed Binary Tree)

* 높이 h에 대한 최소 개수의 노드를 가지면서 한쪽 방향의 자식 노드만을 가진 이진 트리



### 순회(traversal)

* 트리의 각 노드를 중복되지 않게 전부 방문하는 것
* 전위 순회(preorder traversal) : VLR
  * 부모 노드 방문 후, 자식 노드를 좌, 우 순서로 방문한다.
* 중위 순회(inorder traversal) : LVR
  * 왼쪽 자식 노드, 부모 노드, 오른쪽 자식 노드 순으로 방문한다.
* 후위 순회(postorder traversal) : LRV
  * 자식 노드를 좌우 순서로 방문한 후, 부모 노드를 방문한다.

#### 전위 순회(preorder traversal)

```python
def preorder(T):
	if T:
		visit(T)
		preorder(T.left)
		preorder(T.right)
```

#### 중위 순회(inorder traversal)

```python
def inorder(T):
	in T:
		inorder(T.left)
		visit(T)
		inorder(T.right)
```

#### 후위 순회(postorder traversal)

```python
def postorder(T):
	if T:
		postorder(T.left)
		postorder(T.right)
		visit(T)
```

