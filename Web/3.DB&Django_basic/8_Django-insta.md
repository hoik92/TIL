# Django-insta

* 해당 프로젝트는 `https://github.com/hoik92/insta` 참고

## django의 modelform 사용

* forms.py

```python
from django import forms
from .models import Post

# Post라는 모델을 조작할 수 있는 PostModelForm 정의
class PostModelForm(forms.ModelForm):
    # 1. 어떤 input 필드를 가지는지
    content = forms.CharField(label="content", widget=forms.Textarea(attrs={
        'placeholder': '오늘은 무엇을 하셨나요?',
    }))
    # 2. 해당 input 필드의 속성을 추가 & 어떤 모델을 조작할지
    class Meta:
        model = Post
        fields = ['content']
```

* command

```bash
> pip install django-bootstrap4
```

* create.html

```html
{% extends 'base.html' %}

{% load bootstrap4 %}

{% block body %}
<form method="POST">
  <!-- 모델 폼 -->
  {% bootstrap_form form %}
</form>
{% endblock %}
```

* settings.py

```python
INSTALLED_APPS = [
    'bootstrap4',
    ...,
]
```



## image 업로드

* command
  * 이미지 업로드를 위한 패키지 다운로드

```bash
> pip install pillow
```

* posts/models.py
  * 이미지 필드 추가

```python
class Post(models.Model):
    content = models.CharField(max_length=150)
    image = models.ImageField(blank=True)
    
    def __str__(self):
        return f"{self.id}: {self.content}"
```

* posts/templates/posts/create.html
  * 파일을 보내기 위해 form 태그에 enctype 추가

```html
<form method="POST" enctype="multipart/form-data">
    ...
</form>
```

* posts/views.py
  * 파일을 받기 위해 받아올 데이터 추가

```python
def create(request):
	...
	form = PostModelForm(request.POST, request.FILES)
	...
```

* instagram/settings.py
  * 이미지를 저장할 경로 지정

```python
...
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

* instagram/urls.py
  * 이미지에 접근할 url 저장 경로 지정

```python
...
from django.conf import settings
from django.conf.urls.static import static

...

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```



## user와 post의 1:N 매칭

* posts/models.py
  * Post 모델에 user ForeignKey 설정

```python
...
from django.conf import settings

class Post(models.Model):
	...
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
```

