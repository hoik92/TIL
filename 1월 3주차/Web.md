# 1월 3주차

## I. 개요

1. Saas(Software as a service) : 서비스로서의 소프트웨어

2. Web(World Wide Web, WWW, W3)

* 팀 버너스 리 개발

3. Service

* 요청(request - client)과 응답(response - server)으로 이루어짐
* Web Service는 문서를 주고 받는 서비스
* 요청의 종류 - Get, Post

4. 웹 서비스를 만든다 = 서버 컴퓨터에서 응답을 주고 받을 프로그램을 만든다

5. IP : 8비트(0~255)까지의 숫자로 구성된 집합, 각자가 가지고 있는 주소와 동일

6. 도메인(Domain) : 네트워크상의 컴퓨터를 식별하는 호스트명

7. URL(Uniform Resource Locator) : 도메인 + 경로, 실제로 해당 서버에 저장된 자료의 위치

8. W3C(World Wide Web Consortium) : 웹 표준

* HTML(Hyper Text Markup Language) : 링크를 통해 문서를 주고 받는 방식의 마크업 언어
* HTTP(Hyper Text Transfer Protocol) : 하이퍼 텍스트를 주고 받는 방식
* CSS(Cascading Style Sheet)
* JavaScript

9. Bootstrap : CSS Framework



## II. HTML

1. HTML 파일 : HTML 언어로 작성된 문서

2. HTML 형식

```html
<!doctype html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
```

3. Tag 와 DOM(Document Object Model) Tree

   (1) Tag

   Self-closing element

   * 닫는 태그가 없는 태그도 존재한다.
   * `<img src='url'/>`

   속성(Attribute)

   * 태그에는 속성이 지정될 수 있다.
   * `<a href='google.com'/>` : href - 속성명, google.com - 속성값

   DOM 트리

   * 태그는 중첩되어 사용가능하다.(태그를 구조화하여 정리)

   시맨틱 태그 : 의미를 가지는 태그들을 활용하기 위한 노력

   * `<header>`

   * `<article>`

   * `<aside>`

   * `<footer`

   * `<nav>`

     

## III. CSS

HTML과 CSS의 연결

* HTML 요소의 style에 CSS 넣기
* style 태그 작성
* 외부에 있는 CSS 파일을 로드하기

Selector

* `h1{color:blue; font-size:15px;}`
  * h1이 selector
* 프로퍼티 값의 단위
  * 크기 단위(px, %, em(배수 단위, 기준이 상속의 영향으로 바뀔 수 있음), rem(기준이 html로 고정), viewport)
  * 색상 표기 단위

class

id



## IV. Box model

content : 실제 내용이 위치

padding

border

margin



## V. Bootstrap

CDN 활용을 통해 Bootstrap에 작성된 CSS, JS를 활용하자.

Content Delivery(Distribution) Network : 컨텐츠(CSS, JS, Image, Text 등)를 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템