# Django

## 게시판

* 프로젝트 생성

```bash
mkdir BOARD
cd BOARD
pyenv virtualenv 3.6.7 board-venv
pyenv local board-venv

pip install django ipython django_extensions
django-admin startproject board
python manage.py startapp articles
```

* settings.py

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions'
    'articles',
]
```

* views.py

```python
# views.py
def home(request):
    return render(request, 'articles.index.html')
```

* urls.py

```python
# urls.py
from django.contrib import admin
from django.urls import path
from articles import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home)
]
```

* models.py

```python
# models.py
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.TextField()
    content = models.TextField()
    
    def __repr__(self):
        return f"<{self.id}, {self.title}: {self.content}"
        
    def __str__(self):
        return f"<{self.id}, {self.title}: {self.content}"
```

* command

```bash
python manage.py makemigrations
python manage.py splmigrate articles 0001
python manage.py migrate
```



## 표준 CRUD

1. R

* `/articles/` : list page
* `/articles/1` : detail page

2. C

* `/articles/new` : new page(작성)
* `/articles/create` : create page(DB 저장)

3. U

* `/articles/1/edit` : edit page
* `/articles/1/update` : update page

4. D

* `/articles/1/delete` : delete page



## 게시판 페이지 작성

* board/urls.py

```python
# board/urls.py
from django.contrib import admin
from django.urls import path, include
from articles import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')),
]
```

* articles/urls.py

```python
# articles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('new/', views.new),
    path('create/', views.create),
    path('<int:article_id>/', views.detail),
    path('<int:article_id>/edit/', views.edit),
    path('<int:article_id>/update/', views.update),
    path('<int:article_id>/delete/', views.delete),
]
```

* views.py
  * 기존의 templates 폴더 안에 생성하던 html 파일을 templates/articles 폴더 안에 생성한다.

```python
from django.shortcuts import render, redirect
from .models import Article

# Create your views here.
def index(request):
    # DB에 저장된 모든 Article을 불러와 보여줌
    articles = Article.objects.order_by('-id').all()
    context = {
        'articles': articles
    }
    return render(request, 'articles/index.html', context)

def new(request):
    return render(request, 'articles/new.html')
    
def create(request):
    # DB에 저장
    title = request.POST.get('title')
    content = request.POST.get('content')
    article = Article(title=title, content=content)
    article.save()
    return redirect('/articles/')

def detail(request, article_id):
    # id를 통해 해당하는 글을 찾아 보여줌
    article = Article.objects.get(id=article_id)
    context = {
        'article': article
    }
    return render(request, 'articles/detail.html', context)

def edit(request, article_id):
    article = Article.objects.get(id=article_id)
    context = {
        'article': article
    }
    return render(request, 'articles/edit.html', context)
    
def update(request, article_id):
    title = request.POST.get('title')
    content = request.POST.get('content')
    
    article = Article.objects.get(id=article_id)
    article.title = title
    article.content = content
    article.save()
    return redirect(f'/articles/{article_id}')

def delete(request, article_id):
    article = Article.objects.get(id=article_id)
    article.delete()
    return redirect('/articles/')
```

* index.html

```html
<h1>게시판입니다.</h1>
<a href="/articles/new/">새 글 쓰기</a>

<table>
    <tr>
        <th>번호</th>
        <th>제목</th>
    </tr>
    {% for article in articles %}
    <tr>
        <td>{{article.id}}</td>
        <td><a href="/articles/{{article.id}}/">{{article.title}}</a></td>
    </tr>
    {% endfor %}
</table>
```

* new.html

```html
<h1>게시글 작성</h1>
<form action="/articles/create/" method="POST">
    제목 : <input type="text" name="title"/>
    내용 : <input type="text" name="content"/>
    <input type="submit" value="Submit"/>
    {% csrf_token %}
</form>
```

* detail.html

```html
<h1>{{article.title}}</h1>
<h2>{{article.content}}</h2>

<a href="/articles/">글 목록</a>
<a href="/articles/{{article.id}}/edit/">글 수정</a>
<a href="/articles/{{article.id}}/delete/">글 삭제</a>
```

* edit.html

```html
<h1>게시글 수정</h1>
<form action="/articles/{{article.id}}/update/" method="POST">
    제목 : <input type="text" name="title" value="{{article.title}}"/>
    내용 : <input type="text" name="content" value="{{article.content}}"/>
    <input type="submit" value="Submit"/>
    {% csrf_token %}
</form>
```



## Django 스러운 url 코딩

* 바로 위의 edit.html을 보자

```html
<h1>게시글 수정</h1>
<form action="/articles/{{article.id}}/update/" method="POST">
    제목 : <input type="text" name="title" value="{{article.title}}"/>
    내용 : <input type="text" name="content" value="{{article.content}}"/>
    <input type="submit" value="Submit"/>
    {% csrf_token %}
</form>
```

* `form` 태그의 `action` 을 직접 타이핑 했다. 이를 조금 더 django 스럽게 바꾸면

  * articles/urls.py

  ```python
  # articles/urls.py
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
  ]
  ```

  * edit.html

  ```html
  <h1>게시글 수정</h1>
  <form action="{% url 'update' article.id %}" method="POST">
      제목 : <input type="text" name="title" value="{{article.title}}"/>
      내용 : <input type="text" name="content" value="{{article.content}}"/>
      <input type="submit" value="Submit"/>
      {% csrf_token %}
  </form>
  ```

  * views.py

  ```python
  # views.py
  def update(request, article_id):
      title = request.POST.get('title')
      content = request.POST.get('content')
      
      article = Article.objects.get(id=article_id)
      article.title = title
      article.content = content
      article.save()
      return redirect('detail', article_id)
  ```

  

​                                                                                                                                                                       

​                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   