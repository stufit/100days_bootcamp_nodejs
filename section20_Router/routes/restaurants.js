const express = require('express');
const resData = require('../util/restaurant-data');
const uuid = require('uuid');
const router  = express.Router();


router.get('/restaurants',(req,res)=>{
    let order = req.query.order;
    // query는 항상 access 가능하다. body는 post일때만 가능
    let nextOrder = 'desc';

    if (order !=='asc' && order !=='desc'){
        order = 'asc';
    }
    if(order ==='desc'){
        nextOrder = 'asc';
    }

    const storedRestaurants = resData.getStoredRestaurants();
    // 정렬(알파벳 순으로 정렬한다.)
    storedRestaurants.sort((resA,resB)=>{
        if (
            (order ==='asc' && resA.name > resB.name) ||
            (order ==='desc' && resA.name < resB.name)
        ) {
            return 1;
        } 
        return -1;
    });

    res.render('restaurants',
    {numberOfRestaurants: storedRestaurants.length, 
     restaurants: storedRestaurants,
     nextOrder : nextOrder
    }); // render시 ejs로 보낼 객체를 선언할 수 있다.
});

router.get('/restaurants/:id',(req,res)=>{
    const restaurantId = req.params.id
    // util에 있는 restaurant-data 참조
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.forEach(restaurant => {
        if (restaurant.id === restaurantId){
            // 노란색 restaurant는 foreach 의 restaurant를 뜻하며, 흰색 restaurant는 ejs로 보낼 키를 뜻함.
            return res.render('restaurant-detail',{rid : restaurantId,restaurant : restaurant});
        }
    });
    return res.status(404).render('404');
});

router.get('/recommend',(req,res)=>{
    res.render('recommend');
});

router.post('/recommend',(req,res)=>{
    const restaurant = req.body;
    // npm i uuid 로 고유 아이디 할당.
    restaurant.id = uuid.v4();
    // util 폴더에 filepath 관련 모듈 설정함.
    const restaurants = resData.getStoredRestaurants();

    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect('/confirm');
});

router.get('/confirm',(req,res)=>{
    res.render('confirm')
})

module.exports = router;