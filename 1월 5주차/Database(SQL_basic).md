# 1월 5주차

## I. 데이터 베이스

### 1. 데이터베이스

* 체계화된 데이터의 모임
* 여러 사람이 공유하고 CRUD Operation을 용이하게 할 목적으로 통합 관리되는 정보의 집합

### 2. RDBMS

* 관계형 데이터베이스 관리 시스템(관계형 데이터베이스는 쉽게 생각해서 GUI 없는 Excel)
* 대표적인 오픈소스 - MySQL, SQLite, PostgreSQL

### 3. SQLite

* 서버가 아닌 응용 프로그램에 넣어 사용하는 비교적 가벼운 데이터베이스
* 구글 안드로이드 운영체제에 기본적으로 탑재된 데이터베이스

### 4. 기본 용어 정리

* 스키마(schema) - 데이터베이스에서 자료의 구조, 표현방법, 관계 등을 정의한 구조

예)

| column | datatype |
| ------ | -------- |
| id     | INT      |
| age    | INT      |
| phone  | TEXT     |
| email  | TEXT     |

* 테이블(table) - 쉽게 생각해서 Excel의 sheet

* 열(column) - 각 열에는 고유한 데이터 형식이 지정됨(INTEGER, TEXT, NULL 등)
* 행(row), 레코드 - 한 행에 테이블의 데이터가 저장됨
* PK(Primary Key, 기본키) - 각 행(레코드)의 고유값, 반드시 설정해야하며 데이터베이스 관리 및 관계 설정 시 주요하게 활용됨

## II. SQL 기초

### 1. SQL(Structured Query Language) 개념

* 관계형 데이터베이스 관리시스템(RDBMS)의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어
* RDBMS에서 자료의 검색과 관리, 데이터베이스 스키마 생성과 수정, 데이터베이스 객체 접근 조정 관리를 위해 고안됨

|                                                          | 개념                                                         | 예시                                        |
| -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| DDL - 데이터 정의 언어<br />(Data Definition Language)   | 데이터를 정의하기 위한 언어<br />관계형 데이터베이스 구조(테이블, 스키마)를 정의하기 위한 명령어 | CREATE<br />DROP<br />ALTER                 |
| DML - 데이터 조작 언어<br />(Data Manipulation Language) | 데이터를 저장, 수정, 삭제, 조회 등을 하기 위한 언어          | INSERT<br />UPDATE<br />DELETE<br />SELECT  |
| DCL - 데이터 제어 언어<br />(Data Control Language)      | 데이터베이스 사용자의 권한 제어를 위해 사용되는 언어         | GRANT<br />REVOKE<br />COMMIT<br />ROLLBACK |

### 2. Hello, DB!

```sqlite
$ sqlite3
sqlite> .exit
```

CSV 파일을 가지고 와서 database로 만들어보자!

```squlite
splite> .mode csv
splite> .import hellodb.csv hellodb
sqlite> .tables
sqlite> SELECT * FROM hellodb;
```

* SELECT문은 데이터베이스에서 특정한 테이블을 반환한다.

조금 더 예쁘게 보자!

```sqlite
sqlite> .headers on
sqlite> .mode column
sqlite> SELECT * FROM hellodb;
```

### 3. DB, Table 생성

1. database 생성

```sqlite
$ sqlite3 tutorial.sqlite3
sqlite> .databases
```

2. Table 생성

```squlite
sqlite> CREATE TABLE classmates (
   ...> id INTEGER PRIMARY KEY,
   ...> name TEXT
   ...> );
```

3. Datatype

* SQLite은 동적 데이터 타입으로, 기본적으로 affinity에 맞게 들어간다.
* BOOLEAN은 정수 0, 1로 저장된다.

| Afiinity |                                                              |
| -------- | ------------------------------------------------------------ |
| INTEGER  | TINYINT(1byte), SMALLINT(2bytes), MEDIUMINT(3bytes), INT(4bytes), BIGINT(8bytes), UNSIGNED BIG INT |
| TEXT     | CHARACTER(20), VARCHAR(255), TEXT                            |
| REAL     | REAL, DOUBLE, FLOAT                                          |
| NUMERIC  | NUMERIC, DECIMAL, DATE, DATETIME                             |
| BLOB     | no datatype specified                                        |

4. Table 및 schema 조회

```squlte
sqlite> .tables
sqlite> .schema classmates
```

5. Table 삭제(DROP)

```sqlite
DROP TABLE classmates
```

### 4. 데이터 추가, 읽기, 수정, 삭제(Create, Read, Update, Delete)

일단 Table을 만들자.

```sqlite
sqlite> CREATE TABLE celebs (
   ...> id INTEGER PRIMARY KEY,
   ...> name TEXT,
   ...> age INTEGER
   ...> );
```

* 정보들은 공백으로 비워두는 것이 좋지 않으므로 다음과 같이 만드는 것이 좋다.

```sqlite
sqlite> CREATE TABLE celebs (
   ...> id INTEGER PRIMARY KEY AUTOINCREMENT,
   ...> name TEXT NOT NULL,
   ...> age INTEGER NOT NULL
   ...> );
```


1. data 추가 (INSERT)

```sqlite
sqlite> INSERT INTO celebs (id, name, age)
   ...> VALUES (1, 'Justin Bieber', 22);
```

* 모든 열에 데이터를 넣을 때에는 column을 명시할 필요가 없다.

```sqlite
sqlite> INSERT INTO celebs
   ...> VALUES (1, 'Justin Bieber', 22);
   
sqlite> INSERT INTO celebs
   ...> VALUES (2, 'Beyonce Knowles', 33);
   
sqlite> INSERT INTO celebs
   ...> VALUES (3, 'Jeremy Lin', 26);
   
sqlite> INSERT INTO celebs
   ...> VALUES (4, 'Taylor Swift', 26);
```

2. data 가져오기 (SELECT)

```sqlite
sqlite> SELECT * FROM celebs;
sqlite> SELECT name FROM celebs;
```

* 위에서부터 특정 개수의 data만 가져올 때

```sqlite
sqlite> SELECT * FROM celebs LIMIT 3;
```

* 특정 위치의 data 부터 특정 개수를 가져올 때

```sqlite
sqlite> SELECT * FROM celebs LIMIT 3 OFFSET 2;
```

* 특정한 값만 가져올 때

```sqlite
sqlite> SELECT * FROM celebs
   ...> WHERE age=22;
```

3. data 삭제 (DELETE)

* 특정 table에 특정한 레코드를 삭제할 수 있다.
* 중복이 불가능한(UNIQUE한) 값인 id를 기준으로 하자!

```sqlite
sqlite> DELETE FROM celebs
   ...> WHERE id=3;
```

4. data 수정 (UPDATE)

```sqlite
sqlite> UPDATE celebs
   ...> SET age = 30
   ...> WHERE id = 1;
```

5. column 추가 (ALTER)

* data type이 TEXT인 twitter_handle 이름을 가진 column 추가

```sqlite
sqlite> ALTER TABLE celebs
   ...> ADD COLUMN twitter_handle TEXT;
```

### 5. WHERE, expression

1. WHERE

```sqlite
sqlite> SELECT * FROM celebs
   ...> WHERE age > 25;
```

2. expression (COUNT)

```sqlite
sqlite> SELECT COUNT(*) FROM celebs;
```

3. expression (AVG, SUM, MIN, MAX)

```sqlite
sqlite> SELECT name, AVG(age) FROM celebs;
```

4. expression (LIKE)

* 정확한 값에 대한 비교가 아닌, 패턴을 확인하여 해당하는 값을 반환한다.

```sqlite
sqlite> SELECT * FROM celebs WHERE age LIKE '2%';
```

| LIKE |        |                                              |
| ---- | ------ | -------------------------------------------- |
| %    | 2%     | 2로 시작하는 값                              |
|      | %2     | 2로 끝나는 값                                |
|      | %2%    | 2가 들어가는 값                              |
| _    | _2%    | 아무값이나 들어가고 두번째가 2로 시작하는 값 |
|      | 1___   | 1로 시작하고 4자리인 값                      |
|      | 2_% _% | 2로 시작하고 적어도 3자리인 값               |

5. expression (ORDER)

```sqlite
sqlite> SELECT * FROM celebs ORDER BY age ASC;
sqlite> SELECT * FROM celebs ORDER BY age DESC;
```

