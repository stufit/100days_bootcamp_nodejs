const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

// 자동으로 연결pool됨.
async function connect(){
    const client =  await MongoClient.connect('mongodb://localhost:27017');
    // 해당 부분에서는 특정 db에 연결할 수 있다.
    database = client.db('blog');
}

function getDb(){
    if(!database){
        throw { message : '데이터베이스가 없습니다.'}
    };
    return database;
};

module.exports = {
    connectToDatabase: connect,
    getDb : getDb
};