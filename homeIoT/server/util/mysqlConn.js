import mysql from 'mysql'

var pool = mysql.createPool({
	connecitonLimit : 10,
	host:'adahn.asuscomm.com',
	port:5002,
	user:'adahn',
	password:'lovevirus1!',
	database:'homeIoT'
});

function mysqlQuery(query,callback){
	
	pool.getConnection(function(err,con){

		
		if (err)
			return callback({"message":err.code})

		con.query(query,function(err,results){

			con.release();

			if (err)
				return callback({"message":err.code})
			
			callback(results)
		});

	});

}


exports.getAlarmList = function (callback){

	var query = "select * from alarms"

	mysqlQuery(query,callback)


}

exports.addAlarms = function(params,callback){

	var query = "insert into alarms (coin,price,sign,night) \
				values('"+params.coin+"','"+params.price+"','"+params.sign+"','"+params.night+"')"

	mysqlQuery(query,callback)
}

exports.delAlarms = function(params,callback){

	var query = "delete from alarms where id='"+params.delId+"'"
	

	mysqlQuery(query,callback)
}

// 온/습도 저장
exports.insertTempHumi = function(params,callback){

	var query = 'insert into TEMP_HUMI (roomNum,temp,humi,chkDt) \
				 values (\''+params.roomNum+'\','+params.temp+','+params.humi+',now());'


	mysqlQuery(query,callback)

}

// 모션 저장
exports.insertMotion = function(roomNum,callback){

	var query='insert into MOTION (roomNum,chkDt) \
		 		values (\''+roomNum+'\',now());'


	mysqlQuery(query,callback)

}


// 대시보드 메인 온/습도 가져오기
exports.getDashboardTempHumiData = function(callback){


	var query= '(select roomNum,temp,humi,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from TEMP_HUMI where roomNum=1 order by chkDt desc limit 1) \
				union \
				(select roomNum,temp,humi,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from TEMP_HUMI where roomNum=2 order by chkDt desc limit 1) \
				union \
				(select roomNum,temp,humi,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from TEMP_HUMI where roomNum=3 order by chkDt desc limit 1);'

	mysqlQuery(query,callback)

}

// 대시보드 메인 모션 10개 가져오기
exports.getDashboardMotionData = function(callback){


	var query= '(select roomNum,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from MOTION where roomNum=1 order by chkDt desc limit 10) \
				union \
				(select roomNum,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from MOTION where roomNum=2 order by chkDt desc limit 10) \
				union \
				(select roomNum,date_format(chkDt,\'%Y-%m-%d %H:%i:%s\') as chkDt from MOTION where roomNum=3 order by chkDt desc limit 10)'

	mysqlQuery(query,callback)

}
