const express = require('express');
const mongodb = require('mongodb');
// mongodb의 id를 사용하기 위해서는 해당 변수 선언
const ObjectId = mongodb.ObjectId;
const db = require('../data/database');

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async(req, res)=> {
  //const posts = await db.getDb().collection('posts').find({},{title:1, summary:1,'author.name':1}).toArray();
  // 위의 구문은 mongo shell에서 작성할 때 사용되므로 nodejs에서는 아래와 같이 작업한다.(위의 것도 작동되기는함.)
  // nodejs에서는 find({}).project({}) 로 사용됨.
  const posts = await db.getDb().collection('posts')
  .find({})
  .project({title:1, summary:1,'author.name':1}).toArray();
  console.log(posts)
  res.render('posts-list',{posts:posts});
});

router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();
  //console.log(authors)
  res.render('create-post',{authors:authors});
});

router.post('/posts', async (req,res)=>{
  // trim()을 붙이지 않으면 다음과 같은 에러가 발생함.
  // BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer
  const authorId = new ObjectId(req.body.author.trim());
  const author = await db.getDb().collection('authors').findOne({_id: authorId});

  const newPost = {
    title : req.body.title,
    summary : req.body.summary,
    body : req.body.content,
    date : new Date(),
    author : {
      id : authorId,
      name : author.name,
      email : author.email

    }
  };

  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});

router.get('/posts/:id', async(req,res)=>{
  const postId = req.params.id;
  const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(postId)},{summary:0});
  
  if(!post){
    return res.status(404).render('404');
  }

  post.humanReadableDate = post.date.toLocaleDateString('en-US',{
    weekday: 'long',
    year : 'numeric',
    month : 'long',
    day : 'numeric',
  });
  post.date = post.date.toISOString();

  res.render('post-detail',{post:post})

});

router.get('/posts/:id/edit', async(req,res)=>{
  const postId = req.params.id;
  const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(postId)},{title:1,summary:1,body:1});
  if(!post){
    return res.status(404).render('404');
  }

  res.render('update-post',{post:post});

});

router.post('/posts/:id/edit', async(req,res)=>{
  const postId = new ObjectId(req.params.id);
  const result = await db.getDb().collection('posts').updateOne({_id : postId},{$set :{
    title : req.body.title,
    summary : req.body.summary,
    body : req.body.content,
    //date : new Date()   게시물이 업데이트 될 때 업데이트 시간도 새로 정의하여 업데이트 가능
  }});

  res.redirect('/posts');
});

router.post('/posts/:id/delete', async(req,res)=>{
  const postId = new ObjectId(req.params.id);
  const result = await db.getDb().collection('posts').deleteOne({_id : postId});
  res.redirect('/posts');
})



module.exports = router;