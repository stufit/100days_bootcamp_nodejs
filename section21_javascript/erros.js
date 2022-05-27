
const fs = require('fs');
// [1] try-catch : 전체적으로 발생할 수 있는 에러쪽에 try 와 catch를 걸어주면 에러 발생 시, catch 부문이 실행되며 동기식으로 진행된다.
function readFile(){
    try {
    // fs는 node.js 모듈이므로 에러가 발생.
    const fileData = fs.readFileSync('test.json');
    } catch{
        console.log('에러 발생!');
    }
    console.log('hi there!');
}

readFile();

// 그렇다면 이렇게 유용한 try-catch는 모든 코드에 왜 래핑하지 않는것일까나?
// 1. 실제로 어플리케이션들을 충돌시켜야함. 그렇게되면 오류를 빨리 찾아낼 수 없음.
