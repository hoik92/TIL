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

