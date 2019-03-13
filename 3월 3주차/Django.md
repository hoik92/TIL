# Django

* `python manage.py startapp board` : board 앱 생성
* urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('board/', include('board.urls')),
]
```

* board/models.py

```python
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200, default='')
    content = models.TextField(default='')
    like = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.id}: {self.title[:20]}"


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=100, default='')

    def __str__(self):
        return f"{self.article.title}: {self.content[:20]}"
```

* board/urls.py

```python
from django.urls import path
from . import views

app_name = 'board'

urlpatterns = [
    path('', views.article_list, name='article_list'),
    path('<int:article_id>/', views.article_detail, name='article_detail'),
    path('new/', views.new_article, name='new_article'),
    path('create/', views.create_article, name='create_article'),
]
```

* board/views.py

```python
from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Comment
from IPython import embed
# Create your views here.


def article_list(request):
    articles = Article.objects.all().order_by('-id')
    context = {
        'articles': articles,
    }
    return render(request, 'board/list.html', context)

def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    context = {
        'article': article
    }
    return render(request, 'board/detail.html', context)

def new_article(request):
    return render(request, 'board/new.html')

def create_article(request):
    article = Article()
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('board:article_detail', article.id)
```



### embed()

* 파이썬에서 디버깅 시 유용하게 활용
  * `from IPthon import embed`
  * 작성한 코드 중간에 `embed()` 라는 코드를 삽입
  * 이후에 코드를 실행하면 `embed()` 라는 코드가 실행되기 이전의 코드는 수행된 상태로 코드 수행이 멈추며 IPython이 실행됨
  * 실행된 IPython에서 command line으로 현재까지 진행된 사항 등을 디버깅할 수 있음
  * IPython을 종료하면 이후의 코드가 수행됨



### get_object_or_404

* django orm을 사용할 때 활용
  * views.py에 `from django.shortcuts import get_object_or_404`
  * `article = Article.objects.get(id=article_id)`
  * 위의 명령을 수행할 때, `article_id`가 존재하지 않는 요청이 들어오면 해당하는 object를 찾을 수 없기 때문에 500에러 발생(서버 에러)
  * 사실 서버 잘못이 아닌 잘못된 요청을 보낸 클라이언트 잘못이므로 이를 404에러로 바꾸어주기 위해 사용
  * `article = get_object_or_404(Article, id=article_id)`



### REST

* REST는 Representational State Transfer의 약자로서 웹의 장점을 최대한 활용할 수 있는 아키텍처
* HTTP URL(Uniform Resource Locator)을 통해 자원(Resource)을 명시하고, HTTP Method(GET, POST, PATCH, DELETE)를 통해 자원에 대한 CRUD Operation을 적용하는 것
* 예)
  * `.../articles/1` 이라는 URL을 GET 방식으로 요청할 경우
    * DB에 저장된 내용 중 1번에 해당하는 데이터를 보여주는 페이지를 응답
  * `.../articles/1` 이라는 URL을 PATCH 방식으로 요청할 경우
    * DB에 저장된 내용 중 1번에 해당하는 데이터를 update
  * `.../articles/1` 이라는 URL을 DELETE 방식으로 요청할 경우
    * DB에 저장된 내용 중 1번에 해당하는 데이터를 삭제
* 위 처럼 자원만을 표현한 URL이 같아도 요청 방식에 따라 서버의 응답이 달라짐