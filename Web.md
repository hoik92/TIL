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
* HTML 내부에 CSS 포함시키기
* 외부에 있는 CSS 파일을 로드하기

Selector

* `h1{color:blue; font-size:15px;}`
  * h1- selector, color- property, blue- value
* 프로퍼티 값의 단위
  * 크기 단위(px, %, em(배수 단위, 기준이 상속의 영향으로 바뀔 수 있음), rem(기준이 html로 고정), viewport)
  * 색상 표현 단위(rgb(r, g, b), rgba(r, g, b, a), #hex)
    * 참고 - `https://www.color-hex.com/`

class

id



## IV. Box model

content : 실제 내용이 위치

padding

border

margin : 바깥 여백



#### display

1. block

- 항상 새로운 라인에서 시작한다.
- 화면 크기 전체의 가로폭을 차지한다. (width: 100%)
- block 레벨 요소 내에 inline 레벨 요소를 포함할 수 있다.
- div, h1~h6, p, ol, ul, li, hr, table, form

2. inline

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다.
- content의 너비만큼 가로폭을 차지한다.
- width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 없다.
- 상, 하 여백은 line-height로 지정한다.
- span, a, strong, img, br, input, 

3. inline-block

* block과 inline 레벨 요소의 특징을 모두 갖는다.
* inline 레벨 요소처럼 한 줄에 표시되면서 block에서의 width, height, margin(top, bottom) 프로퍼티를 지정할 수 있다.

4. none

* 해당 요소를 화면에 표시하지 않는다.

#### visibility

1. visible
2. hidden

* 해당 요소를 안보이게 한다. (기둥 뒤에 공간 있어요.)

#### Font & Text

1. font-size
2. font-family
3. letter-spacing
4. text-align
5. white-space

#### Position

요소의 위치를 정의

1. static(기본위치)

* 기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치
* 부모요소 내에 자식 요소로서 존재할 때는 부모 요소의 위치를 기준으로 배치된다.

2. relative(상대위치)

* 기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동

3. absolute(절대위치)

* 부모 요소 또는 가장 가까이 있는 조상요소(static 제외)를 기준으로 좌표 프로퍼티(top, bottom, left, right)만큼 이동한다.
* relative, absolute, fixed 프로퍼티가 선언되어 있는 부모 또는 조상 요소를 기준으로 위치가 결정된다.

4. fixed(고정위치)

* 부모 요소와 관계없이 브라우저의 viewport를 기준으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동시킨다.
* 스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다.



## V. Bootstrap

CDN 활용을 통해 Bootstrap에 작성된 CSS, JS를 활용하자.

Content Delivery(Distribution) Network : 컨텐츠(CSS, JS, Image, Text 등)를 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템



####  %% CSS의 구체화(상세정도) 순서

1. !important 형님
2. inline tag
3. #id
4. .class
5. tag 이름
6. 글로벌

#### %% CSS의 선언 순서

1. 무조건 뒤에 정의된 친구가 적용