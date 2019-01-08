import express from 'express';
 
//import mysqlConn from '../util/mysqlConn';

const router = express.Router();
 import crypto from 'crypto';
 import request from 'request';
 //import json from 'json';


//var crypto = require('crypto');
//var request = require('request');

var ACCESS_TOKEN = 'ea33444c-eb4b-450c-9b80-2671cf703b54';
var SECRET_KEY = 'd54ee516-17ed-4fa6-b884-412c815405af';
var url = 'https://api.coinone.co.kr/v2/order/complete_orders/';
 

var total = {
    'qtum':null,
    'btc':null,
    'eth':null,
    'etc':null,
    'xrp':null,
    'bch':null


}
router.get('/getBalance', (req,res) => {


    var options = setHeader('qtum');
    request.post(options,function(error, response, body) {
    
    
        total.qtum = calc(JSON.parse(body).completeOrders,'qtum');

        options = setHeader('btc');
        request.post(options,function(error, response, body) {
            total.btc = calc(JSON.parse(body).completeOrders,'btc');

            options = setHeader('eth');
            request.post(options,function(error, response, body) {
                total.eth = calc(JSON.parse(body).completeOrders,'eth');

                options = setHeader('etc');
                request.post(options,function(error, response, body) {
                    total.etc = calc(JSON.parse(body).completeOrders,'etc');
                   //    console.log(JSON.parse(body).completeOrders)

                    options = setHeader('xrp');
                    request.post(options,function(error, response, body) {
                        total.xrp = calc(JSON.parse(body).completeOrders,'xrp');
                     

                        options = setHeader('bch');
                        request.post(options,function(error, response, body) {
                            total.bch = calc(JSON.parse(body).completeOrders,'bch');


                            request.get('https://api.coinone.co.kr/ticker?currency',function(err,response,body){
                                
                                var body = JSON.parse(body);
                                total.qtum.last = body.qtum.last;
                                total.qtum.totalPrice = parseInt(total.qtum.last) * total.qtum.totalBuyQty;

                                total.btc.last = body.btc.last;
                                total.btc.totalPrice = parseInt(total.btc.last) * total.btc.totalBuyQty;

                                total.eth.last = body.eth.last;
                                total.eth.totalPrice = parseInt(total.eth.last) * total.eth.totalBuyQty;

                                total.etc.last = body.etc.last;
                                total.etc.totalPrice = parseInt(total.etc.last) * total.etc.totalBuyQty;

                                total.bch.last = body.bch.last;
                                total.bch.totalPrice = parseInt(total.bch.last) * total.bch.totalBuyQty;

                                total.xrp.last = body.xrp.last;
                                total.xrp.totalPrice = parseInt(total.xrp.last) * total.xrp.totalBuyQty;

                                res.send(total);
                            })
                            
                        });

                    });

                   


                });


            });
            
        });
    

    });
    
  

    
});

function calc(res,coin){

    var buyPrice=0;
    var buy=0;
    var sell=0;


   // console.log(res);
    for(var i=res.length-1;i>=0;i--)
    {
       // console.log(res[i])
        if ( res[i].type == "bid")
        {
            var qty= parseFloat(res[i].qty) - parseFloat(res[i].fee);
            
            buy += qty;
            buyPrice += qty * parseInt(res[i].price); 
        }
        else
        {
            var qty= parseFloat(res[i].qty)
            sell += qty;

        }

        if (  (Math.floor( buy *10000 ) / 10000 ) == sell || buy < sell )
        {
            buy =0;
            sell=0;
            buyPrice=0;
        }
    }
 
    

    return {'totalBuyPrice':buyPrice,'totalBuyQty':buy,'avgBuyPrice':buyPrice/buy}

}
 

function setHeader(coin)
{
    var payload = {
    "access_token": ACCESS_TOKEN,
    "currency": coin,
    "nonce": Date.now()
    };

    payload = new Buffer(JSON.stringify(payload)).toString('base64');

    var signature = crypto
    .createHmac("sha512", SECRET_KEY.toUpperCase())
    .update(payload)
    .digest('hex');

    var headers = {
    'content-type':'application/json',
    'X-COINONE-PAYLOAD': payload,
    'X-COINONE-SIGNATURE': signature
    };

    return {
    url: url,
    headers: headers,
    body: payload
    };




}


 
export default router;
