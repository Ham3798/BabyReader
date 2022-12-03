// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');
 
// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');
 
// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
 
// Session 미들웨어 불러오기
var expressSession = require('express-session');
 
// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');
 
// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require('cors');
const { json } = require('express');

// 익스프레스 객체 생성
var app = express();
 
// 기본 속성 설정
app.set('port', process.env.PORT || 3000);
 
// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))
 
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())
 
// public 폴더와 upload 폴더 오픈
app.use('/', express.static(__dirname + "/source"));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
 
// cookie-parser 설정
app.use(cookieParser());
 
// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));
 
// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속)지원
app.use(cors());
 
//multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser -> multer -> router
// 파일 제한 : 10개, 1G
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + Date.now())
    }
});
 
var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024*1024*1024
    }
});
 
// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();


router.route('/process/upload').post(upload.array('file',1),function(req,res){
    
    try{
        var files = req.files;
        
        console.dir('#==== 업로드된 첫번째 파일 정보 ====#');
        console.dir(req.files[0]);
        console.dir('#=====#');
        
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype= '',
            size = 0;
        
            if(Array.isArray(files)){
                console.log("배열에 들어있는 파일의 갯수 : %d",files.length);
                for(var index = 0; index < files.length; index++){
                    originalname = files[index].originalname;
                    filename = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                }
            }else{
                // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                
            }
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
       
        //클라이언트에 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<hr/>');
        res.write('<p>원본 파일 이름 : ' + originalname + '-> 저장 파일명 ' + filename + '</p>');
        res.write('<p>MIME TYPE : ' + mimetype + '</p>');
        res.write('<p>파일 크기 : ' + size + '</p>');
        res.end();

        var fs = require('fs');

        let bookdata = {
            originalname : originalname,
            filename : filename,
            mimetype : mimetype,
            size : size
        }

        
        var ip = require("ip");
        const JsonName = ip.address().replace(/\./g, '');
        const JsonPath = "./data/book/" + JsonName + '.json';
        const bookJson = JSON.stringify(bookdata);
        
        
        fs.open(JsonPath,'a+',function(err,fd){
            if(err) throw err;
            if(fd == '9'){
                console.log('file create.');
            }else{
                fs.readFile(JsonPath, 'utf8', function(err, data) {
                  console.log(data);
                });
            }
        });
        fs.appendFile(JsonPath, bookJson+"\n", 'utf8', function(error){
            console.log('write end')
        });
        
    }
    catch(err){
        console.dir(err.stack);
    }
});


router.get('/process/getInfo').get(function(req,res) {
    
  });

app.get('/process/getInfo', (req, res, next) => {
    var ip = require("ip");
    const JsonName = ip.address().replace(/\./g, '');
    const JsonPath = "./data/book/" + JsonName + '.json';

    console.log('JsonPath : ' + JsonPath);

    const fs = require('fs')
    if(fs.existsSync(JsonPath)) {
        const Json = fs.readFileSync(JsonPath);
        const Json_array = Json.toString().split("\n");
        var array = [];

        Json_array.forEach(curJson =>{
            if(curJson != "") {
                array.push(JSON.parse(curJson));
            }
        });
        console.log(JSON.stringify(array));
        res.send(JSON.stringify(array));
    }
});

app.listen(3000, () => {
    console.log(`server is running http://localhost:3000`);
});
app.use('/', router);