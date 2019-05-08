# Django-Rest API + Javascript-Vue

* Django의 rest_framework를 이용하여 API 서버를 구성한 후 Javascript의 Vue를 통해 해당 API 데이터를 받아 처리하는 간단한 Quest

## Django-Rest API 구성

### (1) 환경 설정

````bash
mkdir MEMO
cd MEMO

pyenv virtualenv 3.6.7 memo-venv
pyenv local memo-venv
pip install django==2.1.8
pip install djangorestframework
pip install django-rest-swagger

django-admin startproject quest .
python manage.py startapp memos
````

* quest/settings.py

```python
INSTALLED_APPS = [
    'memos',
    'rest_framework',
    'rest_framework_swagger',
]
```



### (2) Model 생성

* memos/models.py

```python
class Memo(models.Model):
    content = models.TextField()
```

* 마이그레이션

```bash
python manage.py makemigrations
python manage.py migrate
```



### (3) url 설정

* quest/urls.py

```python
from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('musics.urls')),
]
```

* memos/urls.py

```python
from django.urls import path

urlpatterns = [
    path('memos/', views.memos_list, name='memos_list'),
    path('docs/', get_swagger_view('API')),
]
```



### (4) serializer 생성

* memos/serializers.py

```python
from rest_framework import serializers
from .models import Memo

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = ['id', 'content',]
```



### (5) view 설정

```python
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Memo
from .serializers import MemoSerializer

@api_view(['GET', 'POST'])
def memos_list(request):
    if request.method == 'POST':
        serializer = MemoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        memos = Memo.objects.all()
        serializer = MemoSerializer(memos, many=True)
        return Response(serializer.data)
```



## Javascript-Vue 구성

* index.html
  * vue.js와 axios를 import 한다.

```html
<body>
  <div id="main">
    <h1>Sticky Notes</h1>
    <textarea v-model="content"></textarea>
    <button v-on:click="writeMemo()">Write!</button>
    <div id="memo-container">
      <div class="memo" v-for="memo in memos">
        <div class="memo-delete-button" v-on:click="deleteMemo(memo)"></div>
        {{ memo.content }}
      </div>
    </div>
  </div>
  <script>
    const app = new Vue({
      el: '#main',
      data: {
        url: 'https://insta-hoik92.c9users.io/api/v1/memos/',
        content: '',
        memos: [],
      },
      methods: {
        writeMemo: function () {
          const data = {
            content: this.content
          }
          axios.post(this.url, data)
            .then(response => {
              this.memos.push(response.data)
            })
          this.content = ''
        },
        deleteMemo: function (memo) {
          axios.delete(this.url + `${memo.id}/delete/`)
            .then(response => {
              const idx = this.memos.indexOf(memo)
              this.memos.splice(idx, 1)
            })
        }
      },
      created: async function () {
        const response = await axios.get(this.url)
        const data = response.data
        data.forEach(d => {
          this.memos.push(d)
        })
      },
    })
  </script>
</body>
```



## django-cors-headers

* 위와 같이 API 서버를 구성하고 Vue 객체를 통해 해당 API에 접근하려고 하면 에러가 발생한다.

```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/memos/' from origin 'http://localhost:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

* 이는 Cross Domain 이슈가 발생했기 때문이다.
  * Ajax 통신(Asynchronous Javascript XML)을 통한 데이터 송수신 과정에서 발생하는 대부분의 오류는 Cross Domain 이슈이다.
  * 이를 해결하기 위한 django 패키지가 django-cors-header 패키지이다.

```bash
pip install django-cors-headers
```

* quest/settings.py
  * 패키지를 설치한 후 적용하면 위의 CORS 에러를 해결할 수 있다.

```python
INSTALLED_APPS = [
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
```



