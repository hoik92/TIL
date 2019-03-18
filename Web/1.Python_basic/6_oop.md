# 1월 2주차

## I. 시작하기 전에

<wikipedia - 객체지향 프로그래밍>

> 객체 지향 프로그래밍(영어: Object-Oriented Programming, OOP)은 컴퓨터 프 로그래밍의 패러다임의 하나이다. 객체 지향 프로그래밍은 컴퓨터 프로그램을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 "객체"들의 모임으로 파악하고자 하는 것이다. 각각의 객체는 메시지를 주고받고, 데이터를 처리할 수 있다.
>
> 명령형 프로그래밍인 절차지향 프로그래밍에서 발전된 형태를 나타내며, 기본 구성요소는 다음과 같다.

- 클래스(Class) - 같은 종류(또는 문제 해결을 위한)의 집단에 속하는 속성(attribute)과 행위(behavior)를 정의한 것으로 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라고 할 수 있다. 클래스는 프로그래머가 아니지만 해결해야 할 문제가 속하는 영역에 종사하는 사람이라면 사용할 수 있고, 다른 클래스 또는 외부 요소와 독립적으로 디자인하여야 한다.

- 인스턴스 - 클래스의 인스턴스(실제로 메모리상에 할당된 것)이다. 객체는 자신 고유의 속성(attribute)을 가지며 클래스에서 정의한 행위(behavior)를 수행할 수 있다. 객체의 행위는 클래스에 정의된 행위에 대한 정의를 공유함으로써 메모리를 경제적으로 사용한다.

- 메서드(Method) - 클래스로부터 생성된 객체를 사용하는 방법으로서 객체에 명령을 내리는 것이라 할 수 있다. 메서드는 한 객체의 속성을 조작하는 데 사용된다.



## II. 클래스 및 인스턴스

### 1. 클래스 객체

```python
class ClassName:
```

- 선언과 동시에 클래스 객체가 생성됨.
- 또한, 선언된 공간은 지역 스코프로 사용된다.
- 정의된 어트리뷰트 중 변수는 멤버 변수로 불리운다.
- 정의된 함수(`def`)는 메서드로 불리운다.

### 2. 인스턴스 객체

- 인스턴스 객체는 `ClassName()`을 호출함으로써 선언된다.
- 인스턴스 객체와 클래스 객체는 서로 다른 이름 공간을 가지고 있다.
- 인스턴스 -> 클래스 -> 전역 순으로 탐색을 한다.

```python
# 클래스 Person의 iu라는 인스턴스를 만들어봅시다. 
class Person:
    def __init__(self, input_name):
        self.name = input_name
        # 어트리뷰트(attribute) (속성)
        
    def hello(self):
        print(f"hello, i'm {self.name}")
        # 메소드(method) (행동)
        
iu = Person('iu')
iu.hello()
# iu.name -> 속성(어트리뷰트)
# iu.hello() -> 행동(메소드)
```

- 파이썬 출력의 비밀 : repr, str

```python
class Person:
    name = '홍길동'
    def sayhello(self):
        print(f'hello, {self.name}')
    
    # repr 호출시 없으면 호출 x : for 개발자 (객체 인식 공식 문자)
    # 주피터 노트북으로 [1, 2, 3] 블록을 실행하면 나오는 것
    
    # str 호출시 없으면 repr 호출 : for 사용자
    # print() 호출시 나오는 것
    
    def __repr__(self):
        return f'<Person object: {self.name}>'
    
    def __str__(self):
        return f'Person\n 이름 : {self.name}'
```



## III. OOP with Python

### 1. 용어 정리

```python
class Person:                      #=> 클래스 정의(선언) : 클래스 객체 생성
    name = '홍길동'                  #=> 클래스 변수(데이터 어트리뷰트)
    def greeting(self):            #=> 멤버 메서드(메서드)
        print(f'{self.name}')
iu = Person()       # 인스턴스 객체 생성
daniel = Person()   # 인스턴스 객체 생성
iu.name             # 데이터 어트리뷰트 호출
iu.greeting()       # 메서드 호출
```

- 클래스와 인스턴스간의 관계를 확인해보자.

```python
isinstance(iu, Person)
# True
```

### 2. `self` : 인스턴스 객체 자기자신

- C++ 혹은 자바에서의 this 키워드와 동일함.
- 특별한 상황을 제외하고는 무조건 메서드에서 `self`를 첫번째 인자로 설정한다.
- 메서드는 인스턴스 객체가 함수의 첫번째 인자로 전달되도록 되어있다.

```python
# iu를 다시 인사시켜봅시다.
iu.greeting()

# 다르게 인사를 시킬 수도 있습니다.
# 실제로 이렇게 호출이 되는 것과 동일하기에 반드시 self로서 인스턴스 자기자신을 표현해야합니다.
Person.greeting(iu)
```

### 3. 클래스-인스턴스간의 이름공간

- 클래스를 정의하면, 클래스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스를 만들게 되면, 인스턴스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스의 어트리뷰트가 변경되면, 변경된 데이터를 인스턴스 객체 이름 공간에 저장한다.
- 즉, 인스턴스에서 특정한 어트리뷰트에 접근하게 되면 인스턴스 -> 클래스 순으로 탐색을 한다.

### 4. 생성자 / 소멸자

- 생성자는 인스턴스 객체가 생성될 때 호출되는 함수이며, 소멸자는 객체가 소멸되는 과정에서 호출되는 함수이다.

```python
def __init__(self):
    print('생성될 때 자동으로 호출되는 메서드입니다.')

def __del__(self):
    print('소멸될 때 자동으로 호출되는 메서드입니다.')
__someting__
```

위의 형식처럼 양쪽에 언더스코어가 있는 메서드를 스페셜 메서드 혹은 매직 메서드라고 불린다.

```python
#  생성시켜봅시다.
p1 = Person() # 응애

# 소멸시켜봅시다.
del p1 # ㅂㅇ
```

- 생성자 역시 메소드이기 때문에 추가적인 인자를 받을 수 있다.

```python
# 생성자에서 이름을 추가적으로 받아서 출력해봅시다.
class Person:
    def __init__(self, name):
        print(f"응애응애, {name}")
        
# 홍길동이라는 이름을 가진 hong 을 만들어봅시다.
hong = Person("홍길동") # 응애응애, 홍길동
```

### 4. 클래스 변수 / 인스턴스 변수

```python
class Person:
    population = 0              # 클래스 변수 : 모든 인스턴스가 공유함.

    def __init__(self, name):   
        self.name = name        # 인스턴스 변수 : 인스턴스별로 각각 가지는 변수
        Person.population += 1
```

```python
# 본인의 이름을 가진 인스턴스를 만들어봅시다.
john = Person('john')

# 이름을 출력해봅시다.
print(john.name)
```

```python
# 옆자리 친구의 이름을 가진 인스턴스를 만들어봅시다.
hyunho = Person('hyunho')

# 이름을 출력해봅시다.
print(hyunho.name)
```

```python
# population을 출력해봅시다.
print(Person.population)
# 물론, 인스턴스도 접근 가능합니다. 왜일까요?!
print(john.population)
print(hyunho.population)
```

### 5. 정적 메소드 / 클래스 메소드, 멤버 메소드 / 인스턴스 메소드

정적 메소드 / 클래스 메소드 : 모든 인스턴스가 공유하는 메소드(~= 클래스 변수)

멤버 메소드 / 인스턴스 메소드 : 특정 인스턴스에만 속한 메소드(~=인스턴스 변수)

- 메소드 호출을 인스턴스가 아닌 클래스가 할 수 있도록 구성할 수 있다.
- 이때 활용되는게 정적 메소드 혹은 클래스 메소드이다.
- 정적 메소드는 객체(인스턴스)가 전달되지 않은 형태이며, 클래스 메소드는 인자로 클래스를 넘겨준다.
- 인스턴스 메소드는 인자로 **인스턴스**를 넘겨준다.

```python
class Person:
    population = 0
    
    def __init__(self, name): # 인스턴스 메소드
        self.name = name
        Person.population += 1
        
    def greeting(self): # 인스턴스 메소드
        print(f"{self.name}입니다. 안녕하세요")
        
    @staticmethod # 클래스의 데이터를 쓰지 않는 순수한 메소드들
    def info(): # 정적 메소드
        print("사람입니다.")
        
    @classmethod # 클래스의 데이터를 사용하는 메소드들
    def count(cls): # 클래스 메소드
        print(f"현재 인구수는 {cls.population}명 입니다.")
        
me = Person("john")
me.greeting() # john입니다. 안녕하세요
Person.greeting(me) # john입니다. 안녕하세요
Person.info() # 사람입니다.
Person.count() # 현재 인구수는 1명 입니다.
```

### 6. 연산자 오버라이딩(중복 정의)

- 파이썬에 기본적으로 정의된 연산자를 직접적으로 정의하여 활용할 수 있다.
- 몇가지만 소개하고 활용해보자.

```python
+  __add__   
-  __sub__
*  __mul__
<  __lt__
<= __le__
== __eq__
!= __ne__
>= __ge__
>  __gt__
```

```python
class Person:
    population = 0
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Person.population += 1
        
    def greeting(self):
        print(f'{self.name}입니다. 만나서 반가워요')
        
    def __gt__(self, other):
        if self.age > other.age:
            return '왼쪽이 나이 더 많아'
        else:
            return '오른쪽이 나이 더 많아'
        
    def __eq__(self, other):
        if self.name == other.name:
            return '이름이 같네요'
        else:
            return '이름이 다르네요'
```

```python
# 연산자를 호출해봅시다.
p1 = Person('아저씨', 40)
p2 = Person('아저씨', 49)
p3 = Person('아주머니', 38)

p1 > p2 # 왼쪽이 나이 더 많아
p1 == p2 # 이름이 같네요
p2 == p3 # 이름이 다르네요
```

### 7. 상속

#### (1) 기초

- 클래스에서 가장 큰 특징은 '상속' 기능을 가지고 있다는 것이다.
- 부모 클래스의 모든 속성이 자식 클래스에게 상속 되므로 코드재사용성이 높아진다.

```python
# 인사만 할 수 있는 간단한 사람 클래스를 만들어봅시다.
class Person:
    def __init__(self, name):
        self.name = name
        
    def greeting(self):
        print(f'{self.name} 입니다.')
```

```python
# 사람 클래스를 상속받아 학생 클래스를 만들어봅시다.
class Student(Person):
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
```

```python
# 학생을 만들어봅시다.
s1 = Student('민교', '12311')

# 부모 클래스에 정의를 했음에도 메소드를 호출 할 수 있습니다.
s1.greeting() # 민교 입니다.
```

- 이처럼 상속은 공통된 속성이나 메소드를 부모 클래스에 정의하고, 이를 상속받아 다양한 형태의 사람들을 만들 수 있다.

```python
# 진짜 상속관계인지 확인해봅시다.
issubclass(Person, Student) # False
issubclass(Student, Person) # True
```

#### (2) super()

- 자식 클래스에 메서드를 추가 구현할 수 있다.
- 부모 클래스의 내용을 사용하고자 할 때, `super()`를 사용할 수 있다.

```python
class Person:
    def __init__(self, name, age, number, email):
        self.name = name
        self.age = age
        self.number = number
        self.email = email 
        
    def greeting(self):
        print(f'안녕, {self.name}')
        
class Student(Person):
    def __init__(self, name, age, number, email, student_id):
        self.name = name
        self.age = age
        self.number = number
        self.email = email 
        self.student_id = student_id
        
p1 = Person('홍길동', 200, '0101231234', 'hong@gildong')
s1 = Student('학생', 20, '12312312', 'student@naver.com', '190000')
```

- 위의 코드를 보면, 상속을 했음에도 불구하고 동일한 코드가 반복된다.

```python
# 이를 수정해봅시다.
class Person:
    def __init__(self, name, age, number, email):
        self.name = name
        self.age = age
        self.number = number
        self.email = email 
        
    def greeting(self):
        print(f'안녕, 난 {self.name}')
        
class Student(Person):
    def __init__(self, name, age, number, email, student_id):
        super().__init__(name, age, number, email)
        self.student_id = student_id
        
p1 = Person('홍길동', 200, '0101231234', 'hong@gildong')
s1 = Student('학생', 20, '12312312', 'student@naver.com', '190000')
s1.greeting() # 안녕, 난 학생
```

#### (3) 메소드 오버라이딩

- 메소드를 재정의할 수도 있다.

```python
# 학생은 공손하게 이야기를 해봅시다.
class Student(Person):
    def __init__(self, name, age, number, email, student_id):
        super().__init__(name, age, number, email)
        self.student_id = student_id
        
    def greeting(self):
        print(f'안녕하세요, {self.name}입니다.')
        
s1 = Student('학생', 20, '12312312', 'student@naver.com', '190000')
s1.greeting() # 안녕하세요, 학생입니다.
```

#### (4) 상속관계에서의 이름공간

- 기존에 인스턴스 -> 클래스순으로 이름 공간을 탐색해나가는 과정에서 상속관계에 있으면 아래와 같이 확장된다.
- 인스턴스 -> 자식 클래스 -> 부모 클래스 -> 전역