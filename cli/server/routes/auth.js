import express from 'express';
 
import mysqlConn from '../util/mysqlConn';

const router = express.Router();

router.post('/getLogin', (req,res) => {


	var param = req.body;

	// console.log(param);

	// res.send({'code':'ok','data':[]})

	 mysqlConn.isUser(param,function(result){

	     // console.log(result)
         if ( result.length==0)
            res.send({'code':'ok','data':{'auth':0,'data':result}})
         else
		    res.send({'code':'ok','data':{'auth':1,'data':result}})
	})


});


router.post('/modiUser', (req,res) => {


	var param = req.body;

	// console.log(param);

	// res.send({'code':'ok','data':[]})

	 mysqlConn.modiUser(param,function(result){

	      // console.log(result)


         res.send({'code':'ok','data':{'data':result}})

	})


});



router.post('/userAdd', (req,res) => {


	var param = req.body;

	// console.log(param);

	// res.send({'code':'ok','data':[]})

	 mysqlConn.addUser(param,function(result){

	      // console.log(result)


         if ( result.affectedRows==1)
            res.send({'code':'ok','data':{'dup':0,'data':[]}})
         else
             res.send({'code':'ok','data':{'dup':1,'data':[]}})

	})


});


router.get('/getUser', (req,res) => {




	 mysqlConn.getUser(function(result){


		res.send({'code':'ok','data':{'data':result}})

	})


});



 
export default router;
