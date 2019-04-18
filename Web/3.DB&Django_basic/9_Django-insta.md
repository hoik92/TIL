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



## 좋아요 기능(user와 post의 M:N 매칭)

* posts/models.py
  * Post 모델에 like_users ManyToManyField 생성

```python
...
class Post(models.Model):
	...
	like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_posts", blank=True)
```

* posts/urls.py
  * 좋아요 버튼 누를 경우 동작할 url

```python
...
urlpatterns = [
    ...
    path('<int:post_id>/like/', views.like, name="like"),
]
```

* posts/views.py
  * 좋아요 버튼 누를 경우 동작할 메소드

```python
from django.contrib.auth.decorators import login_required
...

@login_required
def like(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user in post.like_users.all():
        post.like_users.remove(request.user)
    else:
        post.like_users.add(request.user)
    return redirect('posts:list')
```

* posts/templates/posts/list.html
  * 좋아요 버튼 등 추가

```html
...
<div class="card-body">
  <a href="{% url 'posts:like' post.id %}">
    <!-- 해당 유저가 like를 했으면 -->
    {% if user in post.like_users.all %}
      <i class="fas fa-heart"></i>
    <!-- 아니면 -->
    {% else %}
      <i class="far fa-heart"></i>
    {% endif %}
  </a>
  <p class="card-text">
    {{ post.like_users.count }}명이 좋아합니다.
  </p>
</div>
...
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



## user와 profile의 1:1 매칭

* accounts/models.py
  * Profile 모델

```python
...
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    nickname = models.CharField(max_length=40, blank=True)
```

* accounts/forms.py
  * ProfileForm 생성

```python
from .models import Profile
...
class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('description', 'nickname')
```

* accounts/views.py
  * update에 ProfileForm 추가

```python
from .forms import ProfileForm
...
def update(request):
	if request.method == "POST":
		user_change_form = CustomUserChangeForm(request.POST, instance=request.user)
		profile_form = ProfileForm(request.POST, instance=request.user.profile)
		if user_change_form.is_valid() and profile_form.is_valid():
			user = user_change_form.save()
			profile_form.save()
			return redirect('people', user.username)
	else:
		user_change_form = CustomUserChangeForm()
		profile, created = Profile.objects.get_or_create(user=request.user)
		profile_form = ProfileForm()
		context = {
            'user_change_form': user_change_form,
            'profile_form': profile_form,
		}
		return render(request, 'accounts/update.html', context)
```

* accounts/templates/accounts/update.html
  * profile_form 추가

```html
...
<form method="POST">
  ...
  {% bootstrap_form user_change_form %}
  {% bootstrap_form profile_form %}
  ...
```



## 팔로우 기능

* accounts/models.py
  * django의 User모델을 상속받아 재정의

```python
from django.contrib.auth.models import AbstractUser
...
class User(AbstractUser):
    follows = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followers")
```

* accounts/urls.py
  * 팔로우 할 경우 url

```python
...
urlpatterns = [
    ...
    path('<int:user_id>/follow/', views.follow, name="follow"),
]
```

* accounts/views.py
  * 팔로우 기능 구현

```python
...
def follow(request, user_id):
    person = get_object_or_404(get_user_model(), id=user_id)
    
    if request.user != person:
    # 현재 유저가 해당 유저를 팔로우하고 있었으면
        if request.user in person.followers.all():
        # 언팔로우
            person.followers.remove(request.user)
        # 아니면
        else:
        # 팔로우
            person.followers.add(request.user)
    return redirect('people', person.username)
```

* accounts/templates/accounts/people.html
  * 팔로우 버튼 추가

```html
<h1>{{ person.username }}
  {% if user != person %}
    <!-- 만약 현재 접속한 유저가 해당 페이지의 유저를 팔로우 한 경우 -->
    {% if user in person.followers.all %}
      <a class="btn btn-outline-primary ml-3" href="{% url 'accounts:follow' person.id %}">
        언팔로우
      </a>
    {% else %}
      <a class="btn btn-primary ml-3" href="{% url 'accounts:follow' person.id %}">
        팔로우
      </a>
    {% endif %}
  {% endif %}
</h1>
```



## 팔로우한 사람의 Post만 보기

* posts/views.py
  * list 페이지 수정

```python
from django.db.models.query_utils import Q
...
@login_required
def list(request):
    posts = Post.objects.filter(Q(user_id__in=request.user.follows.all()) | Q(user_id=request.user))
    print(posts.query)
    form = CommentForm()
    return render(request, 'posts/list.html', {'posts': posts, 'form': form})
```



## 프로필 사진 업로드

* accounts/models.py
  * Profile 모델에 ImageField 추가

```python
...
class Profile(models.Model):
	...
	image = models.ImageField(blank=True)
```

* accounts/forms.py
  * ProfileForm이 보여줄 필드에 image 필드 추가

```python
...
class ProfileForm(forms.ModelForm):
	class Meta:
		model = Profile
		fields = ('description', 'nickname', 'image',)
```

* accounts/views.py
  * 이미지 파일을 받아 DB에 저장

```python
...
def update(request):
    if request.method == "POST":
		...
		profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
		...
```

* accounts/templates/accounts/update.html
  * 이미지 파일을 추가하기 위해 enctype 설정

```html
...
<form method="POST" enctype="multipart/form-data">
  ...
```

* accounts/templates/accounts/people.html
  * 프로필 사진을 보여줌

```html
{% extends 'base.html' %}

{% block body %}
<div class="container">
  <div class="row mb-5">
    <div class="col-4 d-flex">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <img src={% if person.profile.image %}"{{ person.profile.image.url }}"{% else %}"https://i.stack.imgur.com/34AD2.jpg"{% endif %} width="150rem" style="border-radius: 50%; image-size: contain;" alt="">
      </div>
    </div>
  ...
```

