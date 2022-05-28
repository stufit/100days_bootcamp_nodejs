const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', (req,res)=>{
    res.redirect('/posts');
});

router.get('/posts', async(req,res)=>{
    const query = `
    SELECT posts.*, authors.name AS author_name FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
    `;
    const [posts] = await db.query(query); // 배열 비구조화(변수명은 마음대로 적용가능.)
    res.render('posts-list',{posts:posts});
});

router.get('/new-post',async(req,res)=>{
    // 쿼리를 실행하고, 해당 쿼리를 db로 보내는 내장 메소드이다.
    // db쿼리를 비동기처리함, 배열의 비구조화로 진행
    const [authors] = await db.query('SELECT * FROM authors'); 
    res.render('create-post',{authors:authors}); // key값은 templates에 노출될 값이며, value값은 실제 authors의 데이터값(비구조화한 authors)을 뜻한다.
});

router.post('/posts',async(req,res)=>{
    // create-post.ejs의 name값들(받아오는값)
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)',[data,]); //?는 그 뒤의 배열 요소를 받는다. 요소는 순서대로 들어옴.
    //db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?,?,?,?)',
    //[data[0],data[1],data[2],data[3]]); //?를 4개 모두 넣었을 시에는 뒤의 배열에 각각 배열길이에 해당하는 것도 따로 지정해야함.
    res.redirect('/posts');
});

router.get('/posts/:id', async(req,res)=>{
    const query = `
        SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
        inner join authors on posts.author_id = authors.id
        WHERE posts.id = ?
    `;
    const [posts] = await db.query(query,[req.params.id]);

    if (!posts || posts.length ===0){
        return res.status(404).render('404');
    }
     const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate : posts[0].date.toLocaleDateString('en-US',{
            weekday: 'long',
            year : 'numeric',
            month : 'long',
            day : 'numeric'
        }),
     };

    res.render('post-detail',{post:postData});
});

router.get('/posts/:id/edit',async(req,res)=>{
    const query =`
    SELECT * FROM posts WHERE id =?
    `;
    const [posts] = await db.query(query,[req.params.id]);
    if (!posts || posts.length ===0){
        return res.status(404).render('404');
    }

    res.render('update-post',{post: posts[0]});
})

module.exports = router;