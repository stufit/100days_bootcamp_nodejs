function greetUser(greetingPrefix,userName='user'){
    //console.log('hi',userName);
    console.log(greetingPrefix+'//'+userName)
}

greetUser('kylee');
// 파라미터값에 특정값 선언해주면 함수 호출시에 빈 값이여도 undefined가 아닌 선언값이 리턴됨.
greetUser();