# 2월 2주차

## I. ORM(Object-Relational Mapping)

### 1. Flask-SQLAlchemy

* `sudo pip3 install flask-sqlalchemy` 명령어로 flask-sqlalchemy 설치

1. 기본틀

```python
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db_flask.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

db.init_app(app)

class Movie(db.Model):
    __tablename__ = "movies"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False, unique=True)
    score = db.Column(db.Float, nullable=False)
    
db.create_all()
```

2. 레코드 입력

```python
m = Movie(title='아쿠아맨', score=4.0)
db.session.add(m)
db.session.commit()
```

3. 레코드 SELECT

```python
# Movie 내의 모든 레코드 선택
movies = Movie.query.all()

# id = 3인 레코드 선택
movie = Movie.query.get(3)

# title = '아쿠아맨'인 모든 레코드 선택
movie = Movie.query.filter_by(title='아쿠아맨').all()
# title = '아쿠아맨'인 하나의 레코드 선택
movie = Movie.query.filter_by(title='아쿠아맨').first()

# title = '아쿠아맨'인 레코드의 개수
count = Movie.query.filter_by(title='아쿠아맨').count()
```

4. 레코드 UPDATE

```python
# id = 3인 레코드의 score 변경
movie = Movie.query.get(3)
movie.score = 4.5
```

5. 레코드 DELETE

```python
# id = 3인 레코드 삭제
movie = Movie.query.get(3)
db.session.delete(movie)
db.session.commit()
```

6. 레코드 정렬

```python
# title 순으로 정렬
movies = Movie.query.order_by(Movie.title).all()
# title 내림차순으로 정렬
movies = Movie.query.order_by(Movie.title.desc()).all()
```

