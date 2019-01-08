import mysql from 'mysql'

var pool = mysql.createPool({
	connecitonLimit : 20,
	host:'adahn.asuscomm.com',
	port:5002,
	user:'adahn',
	password:'lovevirus1!',
	database:'worked'
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


exports.isUser = function (user,callback){

	var query = `select user_id,user_phone,user_name,user_dept,user_email,user_position from users where user_id='${user.id}' and user_pwd=password(${user.pwd})`

	// console.log(query)
	mysqlQuery(query,callback)


}



exports.getUser = function (callback){

	var query = `select user_id,user_name from users`

	// console.log(query)
	mysqlQuery(query,callback)


}


exports.modiUser = function(user,callback){

    var query=''
    if ( user.user_pwd =="" || user.user_pwd==undefined){
        query=`update users set user_name='${user.user_name}', user_dept='${user.user_dept}', user_position='${user.user_position}',
                              user_phone='${user.user_phone}', user_email='${user.user_email}' where user_id='${user.user_id}'`
    }
    else {
         query=`update users set user_name='${user.user_name}', user_dept='${user.user_dept}', user_position='${user.user_position}',
                              user_phone='${user.user_phone}', user_email='${user.user_email}', user_pwd=password(${user.user_pwd}) where user_id='${user.user_id}'`
    }

    // console.log(query)

    mysqlQuery(query,callback)
}



exports.addUser = function(user,callback){
    var query = `insert into users (user_id,user_name,user_pwd,user_dept,user_position,user_phone,user_email,reg_date)
                    values('${user.user_id}','${user.user_name}',password(${user.user_pwd}),
                    '${user.user_dept}','${user.user_position}','${user.user_phone}','${user.user_email}',now())`
    // console.log(query)

    mysqlQuery(query,callback)
}



exports.regWork = function(work,callback){
    var query = `insert into worked_list (company_name,company_emp,confirm,contents,expire_date,expire_apm,filename,writer,reg_date)
                    values('${work.company_name}','${work.company_emp}','${work.confirm}',
                    '${work.contents}','${work.expire_date}','${work.apm}','${work.filename}','${work.writer}',now())`
    // console.log(query)

    mysqlQuery(query,callback)
}


exports.getWork = function(param,callback){

    let addConditiion=' '
    if ( param.condi )
    {
        if ( param.condi.split('-')[0] =='t')
            addConditiion+=`where ${param.condi.split('-')[1]} like '%${param.value}%'`
        else
            addConditiion+=`where ${param.condi.split('-')[1]} between '${param.start}' and '${param.end} 23:59:59'`


    }

    let orderCondi=''
    if ( param.order){
        if ( param.orderby == 'expire_date')
            orderCondi=`expire_date,expire_apm ${param.order}`
        else
            orderCondi=`${param.orderby} ${param.order}`
    }
    else
    {
        orderCondi='reg_date desc'
    }
    if ( param.position=='팀원')
    {
        var query = `
          select t3.* ,t4.cnt from ( 
            select t1.*,t2.user_name as confirm_name
            from
            (select a.id, 
                DATE_FORMAT(a.reg_date ,"%Y-%m-%d %T") as reg_date,
                b.user_name as writer_name,
                a.writer as writer_id,
                a.company_name,
                a.company_emp,
                a.contents,
                a.filename,
                a.confirm as confirm_id,
                DATE_FORMAT(a.handle_date ,"%Y-%m-%d %T") as handle_date,
                DATE_FORMAT(a.expire_date ,"%Y-%m-%d") as expire_date,
                a.expire_apm,
                DATE_FORMAT(a.complete_date ,"%Y-%m-%d %T") as complete_date
             from worked_list a join users b on a.writer = b.user_id where a.del_yn='n' and (a.confirm='${param.viewer}' or a.writer='${param.viewer}')) t1 join users t2 on t1.confirm_id = t2.user_id
        order by ${orderCondi} limit ${param.limit}  offset ${param.page*5} ) t3 
        left outer join (select count(*) as cnt,worked_id from comment_list group by worked_id) t4 on t3.id = t4.worked_id ${addConditiion}`

    }
    else{
        var query = `
          select t3.* ,t4.cnt from (
            select t1.*,t2.user_name as confirm_name
            from
            (select a.id, 
                DATE_FORMAT(a.reg_date ,"%Y-%m-%d %T") as reg_date,
                b.user_name as writer_name,
                a.writer as writer_id,
                a.company_name,
                a.company_emp,
                a.contents,
                a.filename,
                a.confirm as confirm_id,
                DATE_FORMAT(a.handle_date ,"%Y-%m-%d %T") as handle_date,
                DATE_FORMAT(a.expire_date ,"%Y-%m-%d") as expire_date,
                a.expire_apm,
                DATE_FORMAT(a.complete_date ,"%Y-%m-%d %T") as complete_date
             from worked_list a join users b on a.writer = b.user_id where a.del_yn='n') t1 join users t2 on t1.confirm_id = t2.user_id
        order by ${orderCondi} limit ${param.limit}  offset ${param.page*5} )t3 
        left outer join (select count(*) as cnt,worked_id from comment_list group by worked_id) t4 on t3.id = t4.worked_id ${addConditiion} `
    }


    // var query = `select * from worked_list`
    // console.log(query)

    mysqlQuery(query,callback)
}



exports.getAllWorksCount = function(param,callback){

     let addConditiion=' '
    if ( param.condi )
    {
        if ( param.condi.split('-')[0] =='t')
            addConditiion+=`where ${param.condi.split('-')[1]} like '%${param.value}%'`
        else
            addConditiion+=`where ${param.condi.split('-')[1]} between '${param.start}' and '${param.end} 23:59:59'`


    }
    if ( param.position=='팀원')
    {
        var query = `
        select count(*) as cnt from (
         select t3.*  from ( 
            select t1.*,t2.user_name as confirm_name
            from
            (select a.id, 
                DATE_FORMAT(a.reg_date ,"%Y-%m-%d %T") as reg_date,
                b.user_name as writer_name,
                a.writer as writer_id,
                a.company_name,
                a.company_emp,
                a.contents,
                a.filename,
                a.confirm as confirm_id,
                DATE_FORMAT(a.handle_date ,"%Y-%m-%d %T") as handle_date,
                DATE_FORMAT(a.expire_date ,"%Y-%m-%d %T") as expire_date,
                DATE_FORMAT(a.complete_date ,"%Y-%m-%d %T") as complete_date
             from worked_list a join users b on a.writer = b.user_id where a.del_yn='n' and (a.confirm='${param.viewer}' or a.writer='${param.viewer}')) t1 join users t2 on t1.confirm_id = t2.user_id) t3 
       ) t ${addConditiion} `



    }
    else{
        var query = `
          select count(*) as cnt from (
           select t3.* from (
            select t1.*,t2.user_name as confirm_name
            from
            (select a.id, 
                DATE_FORMAT(a.reg_date ,"%Y-%m-%d %T") as reg_date,
                b.user_name as writer_name,
                a.writer as writer_id,
                a.company_name,
                a.company_emp,
                a.contents,
                a.filename,
                a.confirm as confirm_id,
                DATE_FORMAT(a.handle_date ,"%Y-%m-%d %T") as handle_date,
                DATE_FORMAT(a.expire_date ,"%Y-%m-%d %T") as expire_date,
                DATE_FORMAT(a.complete_date ,"%Y-%m-%d %T") as complete_date
             from worked_list a join users b on a.writer = b.user_id where a.del_yn='n') t1 join users t2 on t1.confirm_id = t2.user_id)t3
             ) t ${addConditiion}
              
        
`
    }

    // var query = `select * from worked_list`
    // console.log(query)

    mysqlQuery(query,callback)
}


exports.deleteWork = function(id,callback){

    var query = `update worked_list set del_yn='y' where id=${id}`
    // var query = `select * from worked_list`
    // console.log(query)

    mysqlQuery(query,callback)
}

exports.confirmWork = function(id,callback){

    var query = `update worked_list set handle_date=now() where id=${id}`
    // var query = `select * from worked_list`
    // console.log(query)

    mysqlQuery(query,callback)
}


exports.completeWork = function(id,callback){

    var query = `update worked_list set complete_date=now() where id=${id}`
    // var query = `select * from worked_list`
    // console.log(query)

    mysqlQuery(query,callback)
}





exports.regComment = function(comment,callback){
    var query = `insert into comment_list (worked_id,writer,comment,comment_date)
                    values(${comment.id},'${comment.writer}','${comment.comment}',now())`
    // console.log(query)

    mysqlQuery(query,callback)
}



exports.getComment = function(id,callback){

    var query=`
    select a.id,
        a.worked_id,
        a.comment,
        a.writer as writer_id,
        b.user_name as writer_name,
        DATE_FORMAT(a.comment_date ,"%Y-%m-%d %T") as comment_date
        from comment_list a join users b on a.writer = b.user_id
        where worked_id=${id}
        order by comment_date
   `
    // var query = `select * from comment_list where worked_id=${id}`
    // console.log(query)

    mysqlQuery(query,callback)
}




