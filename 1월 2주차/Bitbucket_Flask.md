# 1월 2주차

## I. Git

### 1. Bitbucket

git project management tool? like github

* 장점 - 무료로 소수 group의 private repository 생성이 가능하다.

### 2. Github와 Bitbucket 병용하기

- `git remote add [저장소의 별명] [저장소의 주소]`
- 가장 중심이 되는 저장소의 이름을 **origin**이라고 한다.

### 3. Git project

1. 팀장이 repository 생성
2. Settings 에서 팀원을 초대
3. 팀원이 초대 승낙
4. 팀원이 clone 후 수정
5. 팀원이 add, commit, push
6. 팀장이 pull 후 수정
7. 팀장이 add, commit, push
8. 팀원이 pull 후 수정 
9. 반복

### 4. Branch

* `git branch` : 현재 존재하고 있는 세계들
* `git branch <name>` : name 세계의 브랜치 생성
* `git checkout <name>` : name 브랜치로 이동
* `git merge <name>` : 인수할 브랜치 위치에서 name 브랜치를 인수



## II. C9

### 1. linux 기본 명령

* `cd` : change directory
* `ls` : 현재 directory에 존재하는 directory, file 이름 출력
* `pwd` : print working directory
* `echo`
  * `echo 'print'` : print 출력
  * `echo $NAME` : NAME 이라는 변수에 저장된 값 출력
  * `echo 'hello' > a.txt` : a.txt 파일에 hello를 write
  * `echo 'world' >> a.txt` : a.txt 파일에 world를 append
* `c9 .bashrc` : c9에서 .bashrc 파일 열기
  * `alias gs="git status"` : git status 라는 명령어를 gs로 줄임
* `source ~/.bashrc` : .bashrc 파일을 재설정(변경 사항을 적용)
* `cat .bashrc` : command window에 .bashrc 파일 내용 출력
* `man cat` : cat 명령어에 대한 설명
* `rm a.txt` : 현재 디렉토리의 a.txt 파일을 삭제
* `touch a.txt` : a. txt 파일의 생성일자를 현재 시간으로 변경(존재하지 않는 파일이면 생성)
* `mkdir empty` : empty 폴더 생성
* `rm -r empty` : empty 폴더 삭제
* `tree` : 현재 directory를 기준으로 하위 파일 및 폴더의 구조 출력
* `mv`
  * `mv templates/app.py .` : templates 폴더 내의 app.py 파일을 현재 폴더로 이동
  * `mv *.html templates/` : 현재 폴더의 모든 html 파일을 templates 폴더로 이동
  * `mv app.py main.py` : app.py 파일 이름을 main.py로 변경
* `cp app.py templates/` : app.py 파일을 templates 폴더에 복사
* `cp -r templates/ views` : templates 폴더의 내용을 views 폴더에 복사
