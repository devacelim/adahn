import express from 'express';
 
import {getTest} from '../util/mysqlConn';

const router = express.Router();
 
router.get('/', (req,res) => {

	var ret = getTest(function(result){
		res.send(result)	
	})

    
});
 
router.post('/test', (req,res) => {

	var param = req.body;

	console.log(param);

	res.send(param);

});
 
export default router;
