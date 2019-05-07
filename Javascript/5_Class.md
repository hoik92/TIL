# Class

* js에서 객체지향을 구현한다.
* js는 원래 class를 지원하지 않았으나, ES6부터 객체지향을 위해 지원하게 되었고, 이를 function 객체로 구현했다.
* 인스턴스 타입은 object이며, object는 모든 class 최상위에 존재하는 class이다.

## 1. 선언, 호출

* 자료형 없이 변수를 선언하여 default값 지정 가능
* 생성자에 js object 형식의 데이터를 인자로 넘겨준다.

### (1) 선언

```js
class Car {
    title = 'default'
	
	// 생성자, option이라는 object를 넘겨서 속성을 초기화
	constructor (option) {
    	this.title = option.title
	}

	drive () {
    	return 'Vroom'
	}
}
```

### (2) 호출

```js
// object로 인자를 넘겨준다.
const car = new Car({title: 'A6'})

console.log(car.title) // A6
console.log(car.drive()) // Vroom
console.log(typeof car) // object
```



## 2. 상속

* extends 키워드로 상속

```js
class Audi extends Car {
    // 자료형 선언 없이 변수 선언
    color = 'red'

    constructor (option) {
        super(option) // 부모 클래스의 생성자 실행
        this.color = option.color
    }

    honk () {
        return 'Baam'
    }

	// method overriding
    drive () {
        return 'Vrooooooooooom'
    }
}

const audi = new Audi({title: 'A5', color: 'Black'})

console.log(audi)
console.log(audi.drive())
console.log('Before ', audi.honk()) // Baam

// class 외부에서 함수 재정의 가능
audi.honk = () => {
    return 'Baaaaaaaaaaaaam'
}

console.log('After ', audi.honk()) // Baaaaaaaaaaaaam
```



## 3. prototype

* class 자체에 접근하는 방법
* class의 원본을 변경하는 용도로 사용할 수 있다.

```js
Audi.prototype.drive = () => {} // 모든 인스턴드를 바꾼다. 프로토타입 자체를 바꾼다.
Audi.prototype.color = 'blue'
```



## 4. instanceof

* instance가 어떤 class에 속하는지 확인한다.

```js
console.log(car instanceof Car) // true
console.log(car instanceof Audi) // false, Audi가 Car를 상속받았지만, car는 Audi와 관련이 없다.
console.log(audi instanceof Car) // true, 상속받은 객체는 상속하는 객체에 포함된다.
```

