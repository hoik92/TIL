# Django + Heroku

* INSTAGRAM 프로젝트 참고

## 1. Heroku 환경 설정

* command

```bash
pip install django-heroku
pip install gunicorn
```

* instagram/settings.py

```python
import django_heroku
...
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

django_heroku.settings(local())
```

* runtime.txt

```
python-3.6.7
```

* command

```bash
pip freeze > requirements.txt
```

* Procfile

```
web: gunicorn instagram.wsgi
```

* command

```bash
heroku-login

heroku-create

git push heroku master

heroku run python manage.py migrate

heroku run python manage.py createsuperuser
```

