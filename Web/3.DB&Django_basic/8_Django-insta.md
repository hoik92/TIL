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

