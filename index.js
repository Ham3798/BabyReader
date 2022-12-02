const { application } = require('express');
const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.use('/source', express.static(__dirname + "/source"));

// app.route('/sample')

// .get((req, res) => {
//     res.send('정보 조회');
// })

// .post((req, res) => {
//     res.send('정보 추가');
// })

// .put((req, res) => {
//     res.send('정보 수정');
// })

// .delete((req, res) => {
//     res.send('정보 삭제');
// });