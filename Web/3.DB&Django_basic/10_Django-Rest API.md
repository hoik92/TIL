# Django-Rest API

## Rest API 환경 설정

* rest_framework 및 rest_framework_swagger 설치

```bash
mkdir API
cd API/

pyenv virtualenv 3.6.7 api-venv
pyenv local api-venv
pip install django==2.1.8
pip install djangorestframework
pip install django-rest-swagger

django-admin startproject api .
python manage.py startapp musics
```

* api/settings.py

```python
INSTALLED_APPS = [
    'rest_framework',
	'rest_framework_swagger',
]
```



## Model 생성

* musics/models.py

```python
class Article(models.Model) :
    name = models.TextField()
  
class Music(models.Model) :
    title = models.TextField()
    artists = models.ForeignKey(Artist,on_delete=models.CASCADE)
  
class Comment(models.Model) :
    comment = models.TextField()
    music = models.ForeignKey(Music,on_delete=models.CASCADE)
```

* 마이그레이션

```bash
python manage.py makemigrations
python manage.py migrate
```



## url 설정

* api/urls.py

```python
from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('musics.urls')),
]
```

* musics/urls.py

```python
from django.urls import path
from rest_framework_swagger.views import get_swagger_view

urlpatterns = [
    path('music/', views.music_list, name='list'),
    path('music/<int:music_id>/', views.music_detail, name='detail'),
    path('docs/', get_swagger_view(title='API 문서')),
]
```



## serializer 생성

* musics/serializers.py

```python
from rest_framework import serializers
from .models import Music

class MusicSerializer(serializers.ModelSerializer):
	class Meta:
		model = Music
		fields = ['id', 'title', 'artist',]
```



## view 설정

* musics/views.py

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MusicSerializer
from .models import Music

# 허용할 HTTP Method
@api_view(['GET', 'POST'])
def music_list(request) :
    if request.method == 'POST':
        # 생성하기
        serializer = MusicSerializer(data=request.data)
        #raise_exection 검증 실패시 validation 통과 못함
        if serializer.is_valid(raise_exection=True) :
            serializer.save()
            return Response(serializer.data)
    else :
        musics = Music.object.all()
        # 시리얼 라이저 객체(json)를 반환해야 한다.
        serializer = MusicSerializer(musics,many=True)
        return Response(serializer.data)

@api_view(['GET'])
def music_detail(request,music_id):
    #1개의 특정한 music을 가져오는 코드
    music = get_object_or_404(Music, pk=music_id)
    # many는 여러개의 값을 반환할때 리스트로 변환하는 역할, 이거슨 1개만 반환하는 것이므로 False로 설정!
    serializer = MusicSerializer(musics, many=False)
    return Response(serializer.data)
```



