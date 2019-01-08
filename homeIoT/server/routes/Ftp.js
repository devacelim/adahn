import express from 'express';
import ftp from 'ftp';
import async from 'async';

const router = express.Router();

const baseDir='HDD2/Torrent/'

const host = 'adahn.asuscomm.com'
const user = 'torrent'
const pass = 'lovevirus'


router.get('/getList', (req,res) => {

	var c = new ftp();
	c.on('ready', function() {
  		
  		c.list(baseDir,function(err, list) {
    		if (err) res.send(err)
    		else
    		{
    			var arr=[]
    			for(var i=0;i<list.length;i++){

    				
    				if (list[i]['type']=='d')
    					continue

    				var obj={}

    				obj['name']=list[i]['name']
    				obj['size']=(list[i]['size']/1000/1000).toFixed(2) +'MB'
    				arr.push(obj)
    			}
    			c.end();	
    			res.send(arr)
    		}
      		
    });
  	   
  });

	c.on('error',function(err){
		res.send(err)
	});
  
	c.connect({'host':host,'user':user,'password':pass});

});


router.post('/deleteFile', (req,res) => {

	
	
	var files = req.body.file.split('||');
	var len = files.length
	var c = new ftp();

	c.connect({'host':host,'user':user,'password':pass});
	c.on('ready', function() {
	  	


		var i=0
		async.eachSeries(files,function(file,callback){

			
			c.delete(baseDir+file,function(err) {
		    	if(err) callback(err)
		    	else
		    	{
		    		i++
		    		callback()  
		  	   
		    	}
		    		
		    });

		  
		
		},function(err){
			
			c.end()

			if (err)
				res.send(err)
			else
				if ( i==len)
					res.send("success")
				else
					res.send("fail")

		});

	});	
	
	
	c.on('error',function(err){
		res.send(err)
	});



})


export default router;

