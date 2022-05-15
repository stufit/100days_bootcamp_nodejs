const express = require('express');
const app = express();

// 모든 요청에 적용되며, 자바스크립트 객체로 변환해준다.
app.use(express.urlencoded({extended : false}));



app.get('/currenttime',(req,res)=>{
    res.send('<h1>'+ new Date().toISOString()+'</h1>');
}); // localhost:3000/currenttime

app.get('/',(req,res)=>{
    res.send('<form action="/store-user" method="POST"><label>이관영</label><input type="text" name="username"><button>submit</button></form>');
});

app.post('/store-user',(req,res)=>{
    const userName = req.body.username
    console.log(userName)
    res.redirect('/')
})

app.listen(3000)




