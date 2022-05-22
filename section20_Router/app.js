const path = require('path');
const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const app = express();

// set 은 익스프레스 앱에 대한 특정 옵션을 설정할 수 있는 메서드이다.
app.set('views',path.join(__dirname,'views')); // views는 우리가 만들어놓은 폴더명이다.
app.set('view engine', 'ejs');

// 정적 파일을 public폴더에 집어넣는다.
app.use(express.static('public'));

// json형태로 받아온다.
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/recommend',(req,res)=>{
    res.render('recommend');
});

app.post('/recommend',(req,res)=>{
    const restaurant = req.body;
    // npm i uuid 로 고유 아이디 할당.
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname,'data','restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);

    storeRestaurants.push(restaurant);

    fs.writeFileSync(filePath,JSON.stringify(storeRestaurants));

    res.redirect('/confirm');
})

app.get('/restaurants',(req,res)=>{
    const filePath = path.join(__dirname,'data','restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);
    res.render('restaurants',
    {numberOfRestaurants: storeRestaurants.length, 
     restaurants: storeRestaurants}); // render시 ejs로 보낼 객체를 선언할 수 있다.
});

app.get('/restaurants/:id',(req,res)=>{
    const restaurantId = req.params.id
    const filePath = path.join(__dirname,'data','restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);

    storeRestaurants.forEach(restaurant => {
        if (restaurant.id === restaurantId){
            // 노란색 restaurant는 foreach 의 restaurant를 뜻하며, 흰색 restaurant는 ejs로 보낼 키를 뜻함.
            return res.render('restaurant-detail',{rid : restaurantId,restaurant : restaurant});
        }
    });
    return res.render('404');
});

app.get('/confirm',(req,res)=>{
    res.render('confirm')
});

app.get('/about',(req,res)=>{
    res.render('about')
});

app.use((req,res)=>{
    res.render(404);
});

// 전역에 미들웨어를 선언하기 때문에 꼭 4개의 파라미터를 받아야함(next())
app.use((err,req,res,next)=>{
    res.render('500');
    next();
});

app.listen(3000);
