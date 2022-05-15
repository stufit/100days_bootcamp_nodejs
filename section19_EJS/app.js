const path = require('path');
const fs = require('fs');
const express = require('express');
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

app.get('/confirm',(req,res)=>{
    res.render('confirm')
});

app.get('/about',(req,res)=>{
    res.render('about')
});


app.listen(3000);
