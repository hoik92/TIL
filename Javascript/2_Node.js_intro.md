# Node.js

* Node.js®는 [Chrome V8 JavaScript 엔진]으로 빌드된 JavaScript 런타임입니다.
* node를 django라고 생각해..

## 1. Node.js 설치

* https://nodejs.org/ko/ 에서 Node.js를 다운로드 받아 설치한다.

* command

```bash
node --version
npm --version
```



## 2. 환경 설정

* command

```bash
npm init
npm install lodash
```



## 3. 시작

생성한 js 파일을 command에서 `node FILE.js`로 실행

### (1)

* 위에서 환경을 구성한 디렉토리에 1.menu.js 파일 생성
* 1.menu.js

```javascript
var _ = require('lodash') // lodash를 import
var menus = ['짜장면', '짬뽕', '볶음밥'] // Array 배열
var pick = _.sample(menus)
console.log(pick)
```

* command

```bash
node 1.menu.js
```

### (2)

* 2.menu-with-photo.js

```javascript
var _ = require('lodash')
var menus = ['짜장면', '짬뽕', '볶음밥']
var pick = _.sample(menus)
var object = {
    짜장면:'http://ojsfile.ohmynews.com/STD_IMG_FILE/2016/1214/IE002069160_STD.jpg',
    짬뽕:'https://png.pngtree.com/element_origin_min_pic/00/00/11/095823383855d7e.jpg',
    볶음밥:'http://food.chosun.com/site/data/img_dir/2012/08/08/2012080802054_0.jpg',
}
console.log(`오늘의 메뉴는 ${pick}입니다.`)
console.log(object[pick])
// console.log(object.pick) // object 안의 key 값에 pick이 없기 때문에 접근이 불가능
```

### (3)

* 3.lottery.js

```js
var _ = require('lodash')
var numbers = _.range(1, 46)
var picks = _.sampleSize(numbers, 6)
console.log(`행운의 번호는 ${picks}`)
```

### (4)

* 4.min.js

```js
// TODO: 매개변수를 받아서 최소값을 반환
function getMin(a, b) {
    if (a > b) {
        return b
    }
    return a
}
var min1 = getMit(2, 3)
console.log(min1)

function getMinFromArray(numbers) { // lowerCamelCase
    var min = Infinity
    for (num of numbers) {
        // min = (조건) ? true 일 때 : false 일 때
        min = min > num ? num : min
    }
    return min
}

var min2 = getMinFromArray([1, 2, 3, 4, 5])
console.log(min2)
```

### (5)

* 5.arrow-function.js

```js
function sum1(a, b) {
    return a + b
}

// lambda
const sum2 = function(a, b) {
    this // 실행 시점의 객체를 바라보게 됨
    return a + b
}

const sum3 = (a, b) => {
    this // 선언 시점의 객체를 바라보게 됨
    return a + b
}

const sum4 = (a, b) => a + b

console.log(sum1(1, 2))
console.log(sum2(1, 2))
console.log(sum3(1, 2))
console.log(sum4(1, 2))
```

### (6)

* 6.lottery-match.js

```js
const _ = require('lodash')

// TODO:
const luckNumbers = [29, 32, 44, 24, 2, 41]

// 랜덤으로 생성한 6개의 숫자가
// luckNumbers 와 얼마나 매칭되는지 카운트를 반환하는 함수
const numbers = _.sampleSize(_.range(1, 46), 6)
const match = (numbers, luckNumbers) => {
    let count = 0
    for (number of numbers) {
        if (luckNumbers.includes(number)) {
            count++
        }
    }
    return count
}
console.log(match(numbers, luckNumbers))
```

