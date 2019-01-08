import express from 'express';
 
import mysqlConn from '../util/mysqlConn';

const router = express.Router();
 
router.get('/getList', (req,res) => {

	 mysqlConn.getAlarmList(function(result){
	
		res.send(result)	
	})

    
});
 
router.post('/addAlarms', (req,res) => {

	var params = req.body;



	mysqlConn.addAlarms(params,function(result){
		res.send(result);
	})

	

});

router.post('/delAlarms', (req,res) => {

	var params = req.body;



	mysqlConn.delAlarms(params,function(result){
		res.send(result);
	})

	

});


router.get('/chkAlarms', (req,res) => {

	var params = req.query;

	var alm=false;
	var d = new Date();
	var hours = d.getHours();
	var night=true;

	if (hours >= 7 && hours <23)
		night = false;
	


	 mysqlConn.getAlarmList(function(result){
	
		for(var i=0;i<result.length;i++)
		{
			
			if ( result[i].night == 'N' && night )
				continue
				
			var coin = result[i].coin;
		
		
			if( result[i].sign=='>' && (parseInt(params[coin]) >= result[i].price)  )
			{

				alm=true
				mysqlConn.delAlarms({delId:result[i].id},function(result){
					
				})
				
				break;

			}
			else if ( result[i].sign=='<' && (parseInt(params[coin]) <= result[i].price)  )
			{
				alm=true
				mysqlConn.delAlarms({delId:result[i].id},function(result){
				
				})
				break;
			
			}


			
			
			
			
		}

		res.send({"alm":alm});
	})



	


});



 
export default router;
