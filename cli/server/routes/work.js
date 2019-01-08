import express from 'express';
import multer  from 'multer';
import mysqlConn from '../util/mysqlConn';

const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })

router.post('/regWork', upload.single('file'), (req,res) => {


	var param = req.body;

	// console.log(param);

	 mysqlConn.regWork(param,function(result){

	     // console.log(result)

		    res.send({'code':'ok','data':{'data':result}})
	})


});

router.get('/getWork', (req,res) => {


	var params = req.query;

	// console.log(params);

	 mysqlConn.getWork(params,function(work_list){

	      // console.log(work_list)



          mysqlConn.getAllWorksCount(params,function(cnt) {

                res.send({'code':'ok','data':{'count':cnt[0].cnt,'data':work_list}})
          })



	})


});



router.post('/delWork', (req,res) => {


	var param = req.body;

	// console.log(params);

	 mysqlConn.deleteWork(param.id,function(result){

	     // console.log(result)
        res.send({'code':'ok','data':{'data':result}})


	})


});


router.post('/confirmWork', (req,res) => {


	var param = req.body;

	// console.log(params);

	 mysqlConn.confirmWork(param.id,function(result){

	     // console.log(result)
        res.send({'code':'ok','data':{'data':result}})


	})


});


router.post('/completeWork', (req,res) => {


	var param = req.body;

	// console.log(params);

	 mysqlConn.completeWork(param.id,function(result){

	     // console.log(result)
        res.send({'code':'ok','data':{'data':result}})


	})


});


router.post('/regComment', (req,res) => {


	var param = req.body;

	// console.log(params);

	 mysqlConn.regComment(param,function(result){

	     // console.log(result)
        res.send({'code':'ok','data':{'data':result}})


	})


});



router.get('/getComment', (req,res) => {


	var params = req.query;

	// console.log(params);

	 mysqlConn.getComment(params.id,function(result){

	     // console.log(result)
        res.send({'code':'ok','data':{'data':result}})


	})


});


 
export default router;
