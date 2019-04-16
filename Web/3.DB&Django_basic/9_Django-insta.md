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



## 댓글 기능

* posts/models.py
  * Comment 모델 생성

```python
...
class Comment(models.Model):
    content = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.content
```

* posts/urls.py
  * 요청 받을 url 설정

```python
urlpatterns = [
    ...
    path('<int:post_id>/comment/create/', views.comment_create, name="comment_create"),
    path('<int:post_id>/comment/<int:comment_id>/delete/', views.comment_delete, name="comment_delete"),
]
```

* posts/views.py
  * 댓글 생성과 삭제 메소드 작성

```python
def list(request):
    posts = Post.objects.all()
    form = CommentForm()
    return render(request, 'posts/list.html', {'posts': posts, 'form': form})
    
@login_required
def comment_create(request, post_id):
    form = CommentForm(request.POST)
    post = get_object_or_404(Post, id=post_id)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.post = post
        comment.user = request.user
        comment.save()
    return redirect('posts:list')
    
def comment_delete(request, post_id, comment_id):
    comment = Comment.objects.get(id=comment_id)
    if request.user == comment.user:
        comment.delete()
    return redirect('posts:list')
```

* posts/templates/posts/list.html
  * 댓글 form 및 모든 댓글을 보여주는 화면 추가

```html
<div class="card-body">
  <!-- Comment에 대한 ModelForm -->
  <form action="{% url 'posts:comment_create' post.id %}" method="POST">
    <!-- bootstrap_form -->
    {% csrf_token %}
    <div class="row">
      <div class="col-10">
        {% bootstrap_form form %}
      </div>
      <div class="col-2 d-flex align-items-center">
        <button type="submit" class="btn btn-info">등록</button>
      </div>
    </div>
  </form>
  <!-- 해당 글에 작성된 댓글을 모두 출력 -->
  {% for comment in post.comment_set.all %}
    <div class="row">
      <div class="col-10">
        <strong>{{ comment.user }}</strong>
        <p>{{ comment.content }}</p>
      </div>
      {% if request.user == comment.user %}
        <a href="{% url 'posts:comment_delete' post.id comment.id %}">
          <button class="btn btn-danger">삭제</button>
        </a>
      {% endif %}
    </div>
  {% endfor %}
</div>
```



## 회원 정보 변경

* accounts/forms.py
  * UserChangeForm을 상속받아 Customizing

```python
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth import get_user_model

class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = get_user_model()
		fields = ('username', 'email', 'first_name', 'last_name',)
```

* accounts/urls.py
  * 회원 정보 변경 페이지의 url 지정

```python
...
urlpatterns = [
    ...
    path('update/', views.update, name="update"),
]
```

* accounts/views.py
  * 회원 정보 변경 url 요청 시 응답할 메소드

```python
from .forms import CustomUserChangeForm
...

def update(request):
	if request.method == "POST":
		user_chage_form = CustomUserChangeForm(request.POST, instance=request.user)
        if user_change_form.is_valid():
            user = user_change_form.save()
            return redirect('people', user.username)
	else:
		user_change_form = CustomUserChangeForm(instance=request.user)
		context = {
            'user_change_form': user_change_form,
		}
		return render(request, 'accounts/update.html', context)
```

* accounts/templates/accounts/update.html
  * 회원 정보 페이지 생성

```html
{% extends 'base.html' %}

{% load bootstrap4 %}

{% block body %}
  <h1 class="text-center">회원 정보 변경</h1>
  <form method="POST">
    {% csrf_token %}
    {% bootstrap_form user_change_form %}
    <button type="submit" class="btn btn-primary">수정</button>
  </form>
{% endblock %}
```



## 회원 탈퇴

* accounts/urls.py
  * 회원 탈퇴 페이지의 url 지정

```python
...
urlpattners = [
    ...
    path('delete/', views.delete, name="delete"),
]
```

* accounts/views.py
  * 회원 탈퇴 메소드

```python
def delete(request):
	if request.method == "POST":
		request.user.delete()
		return redirect('posts:list')
	return render(request, 'accounts/delete.html')
```

* accounts/templates/accounts/delete.html
  * 회원 탈퇴 확인 페이지

```html
{% extends 'base.html' %}

{% block body %}
  <form method="POST">
    {% csrf_token %}
    <p>정말로 탈퇴하시겠습니까 ㅠㅠ</p>
    <button class="btn btn-danger" type="submit">미안하다</button>
  </form>
{% endblock %}
```



## 비밀번호 변경

* accounts/urls.py
  * 비밀번호 변경 페이지의 url 지정

```python
...
urlpatterns = [
    ...
    path('password/', views.password, name="password")
]
```

* accounts/views.py
  * 비밀번호 변경 메소드

```python
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash

def password(request):
	if request.method == "POST":
		password_change_form = PasswordChangeForm(request.user, request.POST)
        if password_change_form.is_valid():
            user = password_change_form.save()
            update_session_auth_hash(request, user)
            return redirect('people', user.username)
	else:
        password_change_form = PasswordChangeForm(request.user)
        context = {
            'password_chage_form': password_change_form,
        }
        return render(request, 'accounts/password.html', context)
```

* accounts/templates/accounts/password.html
  * 비밀번호 변경 페이지

```html
{% extends 'base.html' %}

{% load bootstrap4 %}

{% block body %}
  <h1 class="text-center">비밀번호 변경</h1>
  <form method="POST">
    {% csrf_token %}
    {% bootstrap_form password_change_form %}
    <button type="submit" class="btn btn-primary">수정</button>
  </form>
{% endblock %}
```



