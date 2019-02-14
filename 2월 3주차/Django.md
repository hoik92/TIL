# Django

### 기본 세팅

* c9을 통해 blank 프로젝트 생성
* terminal에 아래의 명령어 입력(pyenv, pyenv-virtualenv 설치)

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
exec "$SHELL"
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
exec "$SHELL"

pyenv install 3.6.7
pyenv global 3.6.7
```

* 프로젝트 진행할 폴더 생성(PRACTICE)
* 해당 폴더로 이동(cd PRACTICE)
* 가상 환경 설정

```bash
mkdir PRACTICE
cd PRACTICE
pyenv virtualenv 3.6.7 practice-venv
pyenv local practice-venv
pip install django
django-admin startproject practice .
```

* 서버의 url을 settings.py의 ALLOWED_HOSTS에 string 형태로 입력 후 저장

```python
# settings.py
ALLOWED_HOSTS = ['django-practice-hoik92.c9users.io']
```

* 서버 실행

```bash
python manage.py runserver $IP:$PORT
```

### Application 생성

```bash
python manage.py startapp pages
```

* settings.py의 INSTALLED_APPS 에 생성한 app의 이름을 추가

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pages',
]
```

* pages 폴더의 views.py에 아래의 코드 추가

```python
# views.py
def index(request):
    return render(request, 'index.html')
```

* practice 폴더의 urls.py 수정

```python
# urls.py
from django.contrib import admin
from django.urls import path
from pages import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index)
]
```

* pages 폴더에 templates 폴더 생성 후 안에 index.html 파일 생성

```html
<h1>First Django!!</h1>
```

* 서버 실행 후 페이지 확인



### Model 사용

* articles 이름의 app 생성

```
python manage.py startapp articles
```

* models.py 에서 데이터베이스 테이블 스키마 설정
  * id column은 알아서 생성해준다.

```python
# models.py
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.TextField()
    content = models.TextField()
    
    # 객체 호출시 출력되는 내용
    def __repr__(self):
        return f"제목: {self.title}, 내용: {self.content}"
    # print 함수로 호출시 출력되는 내용
    def __str__(self):
        return f"제목: {self.title}, 내용: {self.content}"
```

* command 에서 위의 내용을 migration

```bash
python manage.py makemigrations
```

* 데이터베이스에 해당 테이블을 생성

```bash
python manage.py migrate
```

* django 환경에서 runtime 으로 데이터 조작

```bash
python manage.py shell

from articles.models import Article
a = Article(title="happy", content="hacking")
a.save()
a = Article(title="title test", content="content test")
a.save()

Article.objects.first().title
Article.objects.first().content
Article.objects.all()
Article.objects.get(id=1)
Article.objects.filter(title="happy").all()
Article.objects.count()

a = Article.objects.get(id=1)
a.content = "wow"
a.save()
Article.objects.get(id=1)

Article.objects.order_by('id').all()
Article.objects.order_by('-id').all()
Article.objects.filter(id=2).delete()
```



### admin 페이지 생성

* command 에서 관리자 계정 생성

```
python manage.py createsuperuser

	사용자 이름: admin
	이메일 주소:
	Password: 12341234
	Password (again): 12341234
	
	Bypass password validation and create user anyway? [y/N]: y
```

* admin.py 에서 admin 페이지에 생성한 모델(DB 테이블) 등록

```python
# admin.py
from django.contrib import admin
from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content')
    
# Register your models here.
admin.site.register(Article, ArticleAdmin)
```

* `<django-url>/admin`페이지에서 관리자 계정으로 로그인하여 해당 모델이 등록되었는지 확인