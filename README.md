# Today I Learned

## 1일 1commit
매일 적어도 1줄의 코드를 커밋한다.

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