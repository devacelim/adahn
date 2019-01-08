import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import transmission from 'transmission';
import Nightmare from 'nightmare';
import fs from 'fs';
//require('nightmare-inline-download')(Nightmare);

const router = express.Router();
const baseurl = 'http://www.torrentmi.com/'

 
router.get('/getList', (req,res) => {

	var cid = req.query.cid;
	var page = req.query.page
	var query =req.query.query

	var tlist=[]
	const nightmare = Nightmare({
	show: false,
	gotoTimeout: 1000*60,
	webPreferences: {
		partition: 'persist:derp'
		}
	})
	var url='https://www.torrentmap.com/bbs/board.php?bo_table='+cid+'&page='+page+'&sca=&sop=and&sfl=wr_subject&stx='+query
	nightmare.goto(url)
	.evaluate(()=>{
		return Array.from(document.querySelectorAll('.bo_tit > a:nth-child(2)')).map(element => {
			return {'link':element.href, 'text':element.innerText}
		})

	})
	.end()
	.then((list) => {
		res.send(list)
	})
	.catch(error => {
		console.error('Search failed:', error)
		res.send(error)
	 })
			



/*
// torrent mi

	var url = baseurl+'list.php?b_id='+cid+'&page='+page

	nightmare.goto(url)
	.evaluate(() => {
		return  Array.from(document.querySelectorAll('td > a')).map(element => {
			return {'link':element.href,'text':element.innerText}

		})

	})
	.then((list) => {
		
		res.send(list)

	})

*/
// torentmi


/*
	var url = baseurl+'list.php'
	var qs = {
		b_id:cid,
		mode:'list',
		sc:decodeURIComponent(query),
		x:0,
		y:0,
		page:page
	}
	
		request.get({url:url,headers:{"cookie":'uuoobe=on'},qs:qs},function(err,response,body){

			if(err)
				res.send(baseurl+" is offline")
			else
			{
				var $ = cheerio.load(body)
				
				$('a[class*="stitle"]').each(function() {

					var link = $(this);
				    tlist.push({"text":link.text(),"link":link.attr("href")})
	
				})

				res.send(tlist)
			}
		})

*/	


});


 
router.post('/downLoad', (req, res) => {

	var url = req.body.url

	

	//url = baseurl+url
	const nightmare = Nightmare({
		show: false,
		gotoTimeout: 1000*60,
		webPreferences: {
			partition: 'persist:derp'
			}
		})
/*
	nightmare
	.goto(url)
	.evaluate(()=>{
 		var cookies = document.cookie.split(';');
        var php='';
        for(var i=0;i<cookies.length;i++)
        {
            if ( cookies[i].indexOf('PHP') != -1)
                php = cookies[i]

        }
        return  {'href':document.querySelector(".view_file_download").href,'cookie':php}
	})
	.end()
	.then((info)=>{
		var options = {
			  url: info.href,
			    headers: {
					    'cookie': info.cookie
						  }
		};
		console.log(options)

		request(options)
		.on('error', function(err) {
			    console.log(err)
				res.send(err)
		  })
		.pipe(fs.createWriteStream('/home/pi/adahn/homeIoT/public/torrent/1.torrent'))
		.on('finish',function(){
			try{
				if ( fs.existsSync('/home/pi/adahn/homeIoT/public/torrent/1.torrent') ){
					var seed = 'http://adahn.asuscomm.com:3000/torrent/1.torrent';

					var trans = new transmission({
							port:9091,
							host:'adahn.asuscomm.com',
							username:'torrent',
							password:'lovevirus'
						})
						
					if (trans!=null)
					{
					

						trans.addUrl(seed, function(err, result) {
							if (err) {
								console.log(err)
							//	fs.unlinkSync('../public/torrent/1.torrent');
								res.send(err)
							}
						
							else
							{
								fs.unlinkSync('/home/pi/adahn/homeIoT/public/torrent/1.torrent');
								res.send('success')
							}
						});
					}
					else
					{
						fs.unlinkSync('/home/pi/adahn/homeIoT/public/torrent/1.torrent');
						res.send('torrentClient is not Connected')
					}



				}
				else
					res.send('file not found')

			}catch(err){
				console.log(err)
				res.send(err)
			}

		})

	
	})


		.catch(error => {
					console.error('Search failed:', error)
					res.send(error)
				 })
			
*/


	

// torrentmi

	nightmare.goto(url)
	.evaluate(() => {
		return document.querySelector('.view_file_download').href
	})
	.then((href) => {
			nightmare
				.header('Referer',url)
				.goto(href)
				.wait('.button')
				.evaluate(() => {return document.querySelector('input[name=key]').value })
				.end()
				.then((url) =>{
					var seed = 'http://file.filetender.net/down.php?link='+url
					console.log(seed)
					var trans = new transmission({
							port:9091,
							host:'adahn.asuscomm.com',
							username:'torrent',
							password:'lovevirus'
						})
						
					if (trans!=null)
					{
					

						trans.addUrl(seed, function(err, result) {
							if (err) {
								res.send(err)
							}
						
							else
								res.send('success')
						});
					}
					else
						res.send('torrentClient is not Connected')



				})
				.catch(error => {
					console.error('Search failed:', error)
					res.send(error)
				 })
			

	})

/*
	request.get({url:url,headers:{"cookie":'uuoobe=on'}},function(err,response,body){

		if(err)
			res.send(baseurl+" is offline")
		else
		{
		
			var $ = cheerio.load(body)
			var link = null;
			var seed=null;
			$('a[href*="http://www.filetender"]').each(function() {
				link = $(this).attr("href")
			})

			nightmare
				.header('Referer',url)
				.goto(link)
				.wait('.button')
				.evaluate(() => document.querySelector('.button').href.split('\'')[1])
				.end()
				.then((url) =>{
					var seed = 'http://file.filetender.com/Execdownload.php?link='+url
					var trans = new transmission({
							port:9091,
							host:'adahn.asuscomm.com',
							username:'torrent',
							password:'lovevirus'
						})
						
					if (trans!=null)
					{
					

						trans.addUrl(seed, function(err, result) {
							if (err) {
								res.send('addTorrent Failed')
							}
						
							else
								res.send('success')
						});
					}
					else
						res.send('torrentClient is not Connected')



				})
				.catch(error => {
					console.error('Search failed:', error)
					res.send('not Search button')
				 })
				*/

/*
			request.get({url:link,headers:{"Referer":url}},function(err,response,body){
				if (err)
					res.send(link+" is offline")
				else
				{
						

						var $ = cheerio.load(body)
						$('a[class="button"]').each(function() {
							seed = $(this).attr("href").split('\'')[1]
							
						})


						//seed = 'http://file.filetender.com/Execdownload.php?link=dGVudHw5NTE3MDh8'

						var trans = new transmission({
							port:9091,
							host:'adahn.asuscomm.com',
							username:'torrent',
							password:'lovevirus'
						})

						if (trans!=null)
						{
						

							trans.addUrl(seed, function(err, result) {
								if (err) {
									res.send('addTorrent Failed')
								}
							
								else
									res.send('success')
							});
						}
						else
							res.send('torrentClient is not Connected')




				}
				
			})
			*/
		


});

router.get('/status', (req, res) => {


	var trans = new transmission({
		port:9091,
		host:'lovevirus.ipdisk.co.kr',
		username:'torrent',
		password:'lovevirus'
	})

	var arr=[]
	if (trans!=null)
	{
	
		 trans.get(function(err, result){
	        if(err)
	        	res.send([{"name":"getTorrents Failed"}])
	        
	        else
	        {
	        	
	        	for (var i=0; i< result.torrents.length; i++){
	        		var obj={};
	        		obj['name']=result.torrents[i].name
	        		obj['downRate']=(result.torrents[i].rateDownload/1000/1000)+' MB/s';
	        		obj['percent'] = (result.torrents[i].percentDone*100).toFixed(2)+'%'
	        		obj['status']= getStatusType(result.torrents[i].status)
	      			arr.push(obj)

	      		}

	        	if(arr.length==0)
	        		res.send([{"name":"No Torrent Jobs"}])
	        	else
	        		res.send(arr)
	        }

	    })
    
 	}
	else
		res.send([{"name":"torrentClient is not Connected"}])



})

function getStatusType(type){
    if(type === 0){
        return 'STOPPED';
    } else if(type === 1){
        return 'CHECK_WAIT';
    } else if(type === 2){
        return 'CHECK';
    } else if(type === 3){
        return 'DOWNLOAD_WAIT';
    } else if(type === 4){
        return 'DOWNLOAD';
    } else if(type === 5){
        return 'SEED_WAIT';
    } else if(type === 6){
        return 'SEED';
    } else if(type === 7){
        return 'ISOLATED';
    }
}


 
export default router;
