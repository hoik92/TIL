# 데이터베이스 관계

* 1:1
  * 혼인 관계
  * 개인 - 주민번호
* 1:N - 1에서 N에 대한 정보를 가지고 있는 것보다 N에서 1에 대한 정보를 가지고 있는 것이 좋다.
  * 1 to many
  * has_many, belongs_to
  * 학급, 학생
  * 게시글, 댓글
  * 유저, 게시글
  * 영화, 리뷰
* M:N
  * many_to_many
  * 수강신청(수업, 학생)
* 관계없음



## 1:N

* models.py

```python
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.TextField()
    content = models.TextField()
    
    def __repr__(self):
        return f"<{self.id}, {self.title}: {self.content}>"
        
    def __str__(self):
        return f"<{self.id}, {self.title}: {self.content}>"
        
class Comment(models.Model):
    content = models.TextField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")
```

* articles/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('new/', views.new, name="new"),
    path('create/', views.create, name="create"),
    path('<int:article_id>/', views.detail, name="detail"),
    path('<int:article_id>/edit/', views.edit, name="edit"),
    path('<int:article_id>/update/', views.update, name="update"),
    path('<int:article_id>/delete/', views.delete, name="delete"),
    path('<int:article_id>/comment/', views.comment, name="comment"),
]
```

* views.py

```python
def comment(request, article_id):
    # 댓글을 작성한다.
    content = request.POST.get('content')
    comment = Comment(content=content, article_id=article_id)
    comment.save()
    return redirect('detail', article_id)
```

* detail.html

```html
<h1>{{article.title}}</h1>
<h2>{{article.content}}</h2>

<a href="{% url 'index' %}">글 목록</a>
<a href="{% url 'edit' article.id %}">글 수정</a>
<a href="{% url 'delete' article.id %}">글 삭제</a>

<hr>

<h3>댓글</h3>
<form action="{% url 'comment' article.id%}" method="POST">
    <input type="text" name="content"/>
    <input type="submit" value="Submit"/>
    {% csrf_token %}
</form>

<ul>
    <!--{% for comment in comments %}-->
    <!--<li>{{comment.content}}</li>-->
    <!--{% endfor %}-->
    {% for comment in article.comments.all reversed %}
    <li>{{comment.content}}</li>
    {% endfor %}
</ul>
```



## M:N

### 기본 구조

* models.py
  * 두 데이터 테이블을 연결하기 위해 pivot 테이블을 만들어 서로 연결시킨다.

```python
class Student(models.Model):
    name = models.CharField(max_length=30)
    student_id = models.IntegerField()
    
    # 더미 데이터를 자동으로 넣어주는 친구
    @classmethod
    def dummy(cls, n):
        for i in range(n):
            cls.objects.create(name=fake.name(), student_id=random.randint(2000, 2020))
    
    def __str__(self):
        return f"{self.student_id}: {self.name}"
        
    

class Lecture(models.Model):
    title = models.CharField(max_length=100)
    
    
class Enrollment(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.student.name}님이 {self.lecture.title}과목을 수강하였습니다."
```

* python shell

```python
# Student 데이터와 Lecture 데이터 생성
Student.dummy(10)
Lecture.objects.create(title="알고리즘")
Lecture.objects.create(title="자료구조")
Lecture.objects.create(title="데이터베이스")
Lecture.objects.create(title="운영체제")
Lecture.objects.create(title="인공지능")

# Student와 Lecture를 연결
Enrollent.objects.create(student_id=1, lecture_id=1)
Enrollent.objects.create(student_id=1, lecture_id=2)
Enrollent.objects.create(student_id=1, lecture_id=3)
Enrollent.objects.create(student_id=1, lecture_id=4)
Enrollent.objects.create(student_id=1, lecture_id=5)

# Student에서 Lecture에 접근
student = Student.objects.first()
student.enrollment_set.all()

# Student가 가진 모든 Lecture의 title에 접근
[i.lecture.title for i in student.enrollment_set.all()]
```



### django ORM 활용

* models.py
  * django orm의 ManyToManyField를 활용하여 M:N 관계 구현

```python
class Client(models.Model):
    name = models.CharField(max_length=30)
    
    # class Meta:
    #     ordering = ('name',)
    @classmethod
    def dummy(cls, n):
        for i in range(n):
            cls.objects.create(name=fake.name())
            
    def __str__(self):
        return self.name
    
    
class Resort(models.Model):
    name = models.CharField(max_length=30)
    clients = models.ManyToManyField(Client, related_name='resorts')
    
    @classmethod
    def dummy(cls, n):
        for i in range(n):
            cls.objects.create(name=fake.company())
            
    def __str__(self):
        return self.name
```

* python shell

```python
# Client 데이터와 Resort 데이터 생성
Client.dummy(5)
Resort.dummy(5)

# Resort와 Client를 연결
resort = Resort.objects.first()
resort.clients.add(Client.objects.get(id=1))
resort.clients.add(Client.objects.get(id=2))
resort.clients.add(Client.objects.get(id=3))
resort.clients.add(Client.objects.get(id=4))
resort.clients.add(Client.objects.get(id=5))

# Resort에서 Client에 접근
resort.clients.all()
# Client에서 Resort에 접근
client = Client.objects.first()
client.resorts.all()
```

