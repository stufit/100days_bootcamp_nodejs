const fs = require('fs');
const path = require('path');

// .. 을 추가하여 상위 디렉토리로 이동
const filePath = path.join(__dirname,'..','data','restaurants.json');

function getStoredRestaurants(){

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function storeRestaurants(storableRestaurants){
    fs.writeFileSync(filePath,JSON.stringify(storableRestaurants));
}

// key값 : 다른 파일에서 해당 함수를 참조할 때 사용되는 변수명(내 마음대로 선언 가능)
// value값 : 실제 사용되는 함수명
module.exports = {
    getStoredRestaurants : getStoredRestaurants,
    storeRestaurants     : storeRestaurants
};