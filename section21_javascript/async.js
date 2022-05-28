
const fs = require('fs');

function readFile(){
    let fileData;
    // 비동기에는 콜백함수가 붙기 때문에 콜백함수 안에 파라미터값(error, fileData)을 전달하여 그 안에서 돌려야함.
    fileData = fs.readFile('./section21_javascript/data.txt',function(error, fileData){
        console.log(fileData.toString());
        console.log('파일 파싱 끝');
    });
        
    //console.log(fileData.toString());
    console.log('hi there!');
}

readFile();


