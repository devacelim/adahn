
import express from 'express';
 
import mysqlConn from '../util/mysqlConn';

const router = express.Router();



// 대시보드 첫화면 데이터 가져오기
// 현재 각 방 온습도, 모션 현황(10개)
router.get('/main',(req,res) => {


	mysqlConn.getDashboardTempHumiData(function(result1){


		mysqlConn.getDashboardMotionData(function(result2){

			var room1 = new Object();
			var room2 = new Object();
			var room3 = new Object();

			for(var i=0;i<result1.length;i++)
			{
				if (result1[i].roomNum =="1")
					room1 = result1[i]
				else if (result1[i].roomNum =="2")
					room2 = result1[i]
				else 
					room3 = result1[i]
			}

			var room1_motion=[];
			var room2_motion=[];
			var room3_motion=[];
			for(var i=0;i<result2.length;i++)
			{
				if (result2[i].roomNum =="1")
					room1_motion.push(result2[i].chkDt)
				else if (result2[i].roomNum =="2")
					room2_motion.push(result2[i].chkDt)
				else 
					room3_motion.push(result2[i].chkDt)
			}

			room1.motion = room1_motion
			room2.motion = room2_motion
			room3.motion = room3_motion

			res.send({'room1':room1,'room2':room2,'room3':room3})	
		})

		
	})



});


 
router.post('/sendValues', (req,res) => {

	// params.roomNum
	// param.temp 
	// param.humi
	// param.motion
	var params = req.body;;


	mysqlConn.insertTempHumi(params,function(result){

		if(params.motion =='Y')
		{
			mysqlConn.insertMotion(params.roomNum,function(result){

				if( result.message=="")
					res.send("ok");
				else
					res.send(result.message)
			})
		}
		else
		{
			if( result.message=="")
				res.send("ok");
			else
				res.send(result.message)
		}
	})


});
 
export default router;
