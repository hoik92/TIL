# Python Chatbot 2일차

2일차 git 사용하기

## I. git

### git 생성

1. git bash 실행

2. ```
   mkdir TIL
   git init
   git status
   ```

   git 생성

3. ```
   git add README.md
   git commit -m "first commit"
   git remote add origin https://github.com/hoik92/TIL.git
   git push origin master
   ```

   git commit, push

4. ```
   git remote remove origin
   ```

   git push 경로가 잘못된 경우 경로 삭제



## II. bs4, requests, webbrowser, json

### (1) naver_trend

```python
# 1. requests 로 naver.com 요청을 보내서
# 2. 응답 받은 문서를 저장하고
# 3. BeautifulSoup 로 정보를 찾기 좋게 만들고
# 4. 우리가 원하는 정보를 뽑아온다.
# 5. webbrowser 를 통해 트렌드 1위 단어를 검색한 페이지를 열어주는 코드

import webbrowser
import requests
import bs4

url = "https://www.naver.com"
search_url = "https://search.naver.com/search.naver?query="

response = requests.get(url).text
doc = bs4.BeautifulSoup(response, 'html.parser')

result = doc.select_one('.ah_k')
# 검색어 1위를 가지는 클래스 id

print(result.text)

webbrowser.open(search_url + result.text)
```

```python
# 6. 실시간 검색어 1~20위 단어를 검색한 페이지를 열어주는 코드

result = doc.select('.ah_k')
for i in range(20):
    print(result[i].text)
    webbrowser.open(search_url + result[i].text)
```

### (2) naver_webtoon

```python
# naver webtoon 화요일 웹툰 긁어오기

import bs4
import requests

a = requests.get("https://m.comic.naver.com/webtoon/weekday.nhn?week=tue").text

doc = bs4.BeautifulSoup(a, 'html.parser')

result = doc.select('.toon_name')
img = doc.select('.im_br')

names = []
imgs = []
for i in result:
    names.append(i.text)
    print(i.text)
for i in img:
    imgs.append(i.select_one('img')["src"])
    print(i.select_one('img')["src"])

# f = open('./a.txt', 'a+')
# for name in names:
#     f.write(name + '\n')
# 받아온 웹툰 제목을 텍스트파일로 저장

print(len(names))
print(len(imgs))
```

### (3) bithumb

```python
# Bithumb에서 코인 이름과 가격 가져오기

import bs4
import requests

a = requests.get("https://www.bithumb.com/").text
doc = bs4.BeautifulSoup(a, 'html.parser')

result = doc.select('.coin_list tr td p a strong')
result2 = doc.select('.sort_real')

for i in range(len(result)):
    print(result[i].text + result2[i].text)
```

### (4) lotto

```python
# 1. 나눔로또 api를 통해 우승 번호를 가져온다.
# 2. random으로 생성된 번호와 우승 번호를 비교해서 나의 등수를 알려준다.
# - 1등 : 6개
# - 2등 : 5개 + 보너스 번호
# - 3등 : 5개
# - 4등 : 4개
# - 5등 : 3개

import random
import requests
import json

url = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=837"
res = requests.get(url).text
dic_res = json.loads(res)

# ## My Answer #########################################
# count = 0
# baaam = 0

# real_lotto = []
# for i in range(1,7):
#     real_lotto.append(dic_res['drwtNo{0}'.format(i)])

# while(baaam == 0):
#     lotto = sorted(random.sample(range(1,46), 6))

#     correct = 0
#     bonus = 0
#     for x in lotto:
#         for y in real_lotto:
#             if x == y:
#                 correct = correct + 1
#     for x in lotto:
#         if x == dic_res['bnusNo']:
#             bonus = bonus + 1

#     # print(lotto)
#     # print(real_lotto)
#     # print("맞은 개수 : {0}".format(correct))

#     if correct == 6:
#         # print("1등")
#         baaam = baaam + 1
#     elif correct == 5:
#         if bonus == 1:
#             # print("2등")
#             # baaam = baaam + 1
#             pass
#         else:
#             # print("3등")
#             # baaam = baaam + 1
#             pass
#     elif correct == 4:
#         # print("4등")
#         # baaam = baaam + 1
#         pass
#     elif correct == 3:
#         # print("5등")
#         # baaam = baaam + 1
#         pass
#     else:
#         # print("꽝")
#         # baaam = baaam + 1
#         pass
#     count = count + 1

# # print("꽝 개수 : {0}".format(baaam))
# print(count)
# ########################################################

lotto = json.loads(res)

winner = []

for i in range(1,7):
    winner.append(lotto[f"drwtNo{i}"])

def pickLotto():
    picked = sorted(random.sample(range(1,46), 6))
    matched = len(set(winner) & set(picked))

    if matched == 6:
        print("1등입니다.")
    elif matched == 5:
        print("3등입니다.")
    elif matched == 4:
        print("4등입니다.")
    elif matched == 3:
        print("5등입니다.")
    else:
        print("꽝입니다.")

for i in range(1000):
    pickLotto()
```

### (5) telegram

```python
import requests
from time import sleep
from bs4 import BeautifulSoup as bs

# url = f"https://api.telegram.org/bot{key}/"

# key = "<token>" # 환경 변수를 이용해 사용

# user_id = "<id>" # 환경 변수를 이용해 사용



search_url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=nba+%EC%9D%BC%EC%A0%95&oquery=nba&tqi=UtAYQlpVuFRsstR%2Biulssssstbl-389057"
res = requests.get(search_url).text
doc = bs(res, 'html.parser')

result_time = doc.select('.bg_none')
result_time_txt = []
result_lteam = doc.select('.l_team span')
result_lteam_txt = []
result_rteam = doc.select('.r_team span')
result_rteam_txt = []
result_score = doc.select('.score')
result_score_txt = []

for i in result_time:
    result_time_txt.append(i.text)

for i in result_lteam:
    result_lteam_txt.append(i.select_one('a')["title"])

for i in result_rteam:
    result_rteam_txt.append(i.select_one('a')["title"])

for i in result_score:
    result_score_txt.append(i.text)

for i in range(len(result_lteam_txt)):
    msg = result_time_txt[i] + " " + result_lteam_txt[i] + " " + result_score_txt[i] + " " + result_rteam_txt[i]
    url = f"https://api.telegram.org/bot<token>/sendMessage?chat_id=<id>&text={msg}"
    requests.get(url)
```

