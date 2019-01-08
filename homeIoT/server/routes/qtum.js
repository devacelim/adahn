import express from 'express';
import {exec} from 'child_process';
 

const router = express.Router();
 
router.get('/getstakinginfo', (req,res) => {

	run_cmd('qtum-cli getstakinginfo',function(ret){
		try{
			var json = JSON.parse(ret)
			var obj={}
			obj.enabled = json.enabled ? "True" : "False"
			obj.staking = json.staking ? "True" : "False"
			obj.search_interval = json['search-interval']
			obj.weight = json.weight
			obj.netstakeweight = json.netstakeweight
			obj.expectedtime = json.expectedtime
			obj.remaintime = parseFloat((json.expectedtime - json['search-interval']) / 3600).toFixed(1)

			run_cmd('qtum-cli getwalletinfo',function(ret){
				
				json = JSON.parse(ret)
				
				obj.balance = json.balance
				obj.stake = parseFloat(json.stake).toFixed(1)
				obj.unconfirmed_balance = json.unconfirmed_balance
				obj.immature_balance = json.immature_balance
				obj.unlocked_until = json.unlocked_until
				//res.send(obj)	

				if ( obj.stake == '0.0')
				{
					obj.confirm = '-'
					res.send(obj)	
				}
				else
				{
					run_cmd('qtum-cli listtransactions',function(ret){
						
						try{
							json = JSON.parse(ret)
							obj.confirm = json[json.length-1].confirmations
							res.send(obj)
						
						}
						catch(e)
						{
							obj.confirm = '-'
							res.send(obj)	
						}
						
					
					})	
				}
			
			})	

				
		}
		catch(e){
			res.send(ret)
		}
	})	

    
});
 


router.get('/getwatch', (req,res) => {
	
		run_cmd('qtum-cli getwalletinfo',function(ret){
			
				var json = JSON.parse(ret)
				var obj={}
				obj.balance = parseFloat(json.balance).toFixed(3)
				obj.stake = parseFloat(json.stake).toFixed(1)
			

				run_cmd('qtum-cli getstakinginfo',function(ret){
					json = JSON.parse(ret)

					if ( json.staking == true)
						obj.staking = 'T'
					else
						obj.staking='F'

					obj.remaintime = parseFloat((json.expectedtime - json['search-interval']) / 3600).toFixed(1)

					if ( obj.stake == '0.0')
					{
						obj.confirm = '-'
						res.send(obj)
					}
					else
					{
						run_cmd('qtum-cli listtransactions',function(ret){
							
							try{
								json = JSON.parse(ret)
								obj.confirm = json[json.length-1].confirmations
								res.send(obj)
							
							}
							catch(e)
							{
								obj.confirm = '-'
								res.send(obj)	
							}
							
						
						})	
					}



					//res.send(obj)	
				})


				
			
		})	
	
		
});

function run_cmd(cmd,callback){
    exec(cmd,function(err,stdout,stderr){
		if ( err)
			callback(stderr)
		else
        	callback(stdout)
    })
}

 
export default router;
