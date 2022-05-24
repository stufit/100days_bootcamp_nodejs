const path = require('path');
const express = require('express');
const app = express();
// 라우트 설정
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');



// set 은 익스프레스 앱에 대한 특정 옵션을 설정할 수 있는 메서드이다.
app.set('views',path.join(__dirname,'views')); // views는 우리가 만들어놓은 폴더명이다.
app.set('view engine', 'ejs');

// 정적 파일을 public폴더에 집어넣는다.
app.use(express.static('public'));

// json형태로 받아온다.
app.use(express.urlencoded({extended:false}));


// 라우트 설정
app.use('/',defaultRoutes);
app.use('/',restaurantRoutes);



// 404 에러
app.use((req,res)=>{
    res.render('404');
});

// 전역에 미들웨어를 선언하기 때문에 꼭 4개의 파라미터를 받아야함(next())
app.use((err,req,res,next)=>{
    res.status(500).render('500');
    next();
});




app.listen(3000);
