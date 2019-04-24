# HTTP 기초

## REST API, RESTful Architecture

### 1. 웹 서비스의 기초

* 웹 서비스는 요청(정보를 원하는 사람, request)과 응답(정보를 주는 사람, response)으로 이루어진다.
* 주소(URL)를 통해 요청을 보내고 이에 맞는 문서(HTML, XML, JSON 등)로 응답한다.



### 2. HTTP(Hypertext Transfer Protocol)

* 문서를 전송하기 위한 프로토콜(규약)

#### HTTP 기본 속성

* Stateless
  * 상태 정보가 저장되지 않음. 즉, 요청 사이에는 연결고리가 없음.
  * 클라이언트가 서버와 상호작용하기 위해서 HTTP 쿠키를 만들고, 상태가 있는 세션을 활용할 수 있도록 보완
* Connectless
  * 서버에 요청을 하고 응답을 한 이후에 연결은 끊어짐.

#### HTTP 메서드

* GET
  * 지정 리소스의 표시를 요청하며, 오직 데이터를 받기만 함.
* POST
  * 클라이언트 데이터를 서버로 보냄.
* PUT/PATCH
  * 서버로 보낸 데이터를 저장/지정 리소스의 부분만을 수정
* DELETE
  * 지정 리소스를 삭제



### 3. REST(Representational State Transfer) API

#### REST 중심 규칙

* URI는 정보의 자원을 표현해야 한다.
* 자원에 대한 행위는 HTTP Method로 표현한다.
  * 우리는 웹 서비스를 통해 CRUD 동작을 수행한다.
  * 따라서 CRUD 동작을 HTTP Method로 구분하고 URI는 CRUD 동작을 수행할 정보의 자원만을 표현한다.
  * 쉽게 표현하면 동사(Create, Read, Update, Delete)는 HTTP Method로 구분하고, URL에는 동작들이 수행될 목표만 표시한다.

