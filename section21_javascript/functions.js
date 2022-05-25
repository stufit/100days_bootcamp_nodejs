// [1] 만약 파라미터값이 비어있으면 userName='user'이므로 해당 값이 자동으로 선언
function greetUser(greetingPrefix,userName='user'){
    //console.log('hi',userName);
    console.log(greetingPrefix+'//'+userName)
}

greetUser('kylee');
// 파라미터값에 특정값 선언해주면 함수 호출시에 빈 값이여도 undefined가 아닌 선언값이 리턴됨.
greetUser();


// [2-1] 해당 함수는 만약 num3이 없다면 num3이 undefined 이므로 덧셈을 하면 nan 이 뜨기 때문에, num3=0 처럼 지정해줘야 하지만 이것은 아직 불안정함
function sumUp(num1, num2, num3=0){
    return num1 + num2 + num3
}
console.log(sumUp(1,2))

// [2-2] 2-1보다는 배열을 선언해줘보자
function sumUp2(numbers){
    let result = 0;
    for(const number of numbers){
        result += number; // result = result + number
    }
    return result;
}
console.log(sumUp2([1,2,3]))

// [2-3-1] 2-2에서는 콘솔에서 배열을 넣었지만, 해당 함수에서는 ...(세점 연산자)을 파라미터로 지정하면 알아서 배열로 인식함
function sumUp3(...numbers){
    let result = 0;
    for(const number of numbers){
        result += number;
    }
    return result;
}
console.log(sumUp3(3,4,5,7,2)) // 배열로 안넣고 , 넣어도 배열로 인식

// [2-3-2] 만약 input data가 배열일 경우에는 파라미터 값에다가도 세점 연산자를 사용한다.
// 세점 연산자는 스프레드 형식이기 때문에 배열을 풀어주는 역할을 하기 때문이다.
const inputNumbers = [1,5,7,2,66,4,3];
console.log(sumUp3(inputNumbers)) // input data가 배열이기 때문에 더할 수 없음
console.log(sumUp3(...inputNumbers)) // 세점 연산자로 스프레드 해주기 때문에 정상적으로 더해짐.