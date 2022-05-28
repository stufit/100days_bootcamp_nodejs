const mysql = require('mysql2/promise');

// db 연결을 위한 createConnection 함수를 제공하지만, 해당 부분에서는 연결 풀을 제공하는 createPool 함수를 이용함.
// createPool은 로컬 개발 및 간단한 웹사이트에서는 유용하지 않지만, 동시에 많은 요청을 처리해야되는 상황에서는 개별마다 connection을 만드는 것보다 훨씬 유용하다.
// createPool은 자동으로 사용 및 관리되기 때문이다.
const pool =  mysql.createPool({
    host: '127.0.0.1',
    database: 'udemy',
    user: 'root',
    password: 'aksgml123'
});


module.exports = pool;