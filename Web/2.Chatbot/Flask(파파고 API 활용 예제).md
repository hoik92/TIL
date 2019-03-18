### 2. Flask(파파고 API 활용 예제)

- `sudo pip3 install flask`

#### (1) app.py

```python
from flask import Flask, render_template, request
import requests
import os
app = Flask(__name__)

naver_id=os.getenv('PAPAGO_ID')
naver_secret=os.getenv("PAPAGO_SECRET")

url = "https://openapi.naver.com/v1/papago/n2mt"

headers = {
    "X-Naver-Client-Id": naver_id,
    "X-Naver-Client-Secret": naver_secret
}


@app.route("/") # 주문받을(요청받을) 서비스
def index(): # 해당하는 주문(요청)에 대한 결과
    return render_template("index.html")
    
@app.route("/show") # index에서 날려준 단어를 받아 그대로 출력한다.
def show():
    keyword = request.args.get("keyword")
    
    data = {
        "source": "en",
        "target": "ko",
        "text": keyword
    }
    
    res = requests.post(url, headers=headers, data=data)
    result = res.json().get("message").get("result").get("translatedText")
    
    return render_template("show.html", keyword=keyword, result=result)
```

#### (2) index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>번역기</title>
</head>
<body>
    <h1>단어를 입력해주세요.</h1>
    <form action="/show">
        <input type="text" name="keyword"/>
        <input type="submit" value="번역"/>
    </form>
</body>
</html>
```

#### (3) show.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>번역기</title>
</head>
<body>
    <h2>입력한 단어 : {{ keyword }}</h2>
    <h2>번역한 단어 : {{ result }}</h2>
</body>
</html>
```

