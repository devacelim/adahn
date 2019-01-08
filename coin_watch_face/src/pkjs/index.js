

function sendMessage(values){
	

Pebble.sendAppMessage(values,
  function(e) {
 //   console.log('info sent to Pebble successfully!');
  },
  function(e) {
	 //    console.log('Error sending weather info to Pebble!');
	//  getCoinInfo();
 	console.log("Error sending weather info to Pebble!");
  }
);
	
	
}

function err(e){
	
	var d = new Date();
	var h=d.getHours();
	var m=d.getMinutes();
	var values={};
	if ( h < 10)
		h = "0"+h;
	if ( m < 10)
		m = "0"+m;

	values.DT = h+":"+m;
	//values.BTCKP = '=';
	//values.ETHKP = '=';
	values.BITBTC= e;
	values.BITETH = '=';
	values.COINBTC = '=';
	values.COINETH = '=';
	values.COINBCH='=';
	values.ALM='0';
	values.STAKE='=';
	sendMessage(values);
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
	xhr.timeout = 3000;
	
//   xhr.onload = function () {
//     callback(this.responseText);
//   };
	xhr.onreadystatechange = function(e) {
		
    if (xhr.readyState == 4 && xhr.status == 200) {
		var response = JSON.parse(xhr.responseText);
      if (response !== undefined && !response.error) {
         callback(this.responseText);
      } else {
        err('ERR');
      }
    } else if (xhr.status == 404 || xhr.status == 500) {
      err('404|505');
	}
  };
	
	xhr.onerror = function(e){
		err('Error'); 
		
	};
	xhr.ontimeout = function (e) {
		 err('Timeout');
	};
 
	
  xhr.open(type, url);
  xhr.send();
};


function getCoinInfo() {

  var url = 'https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc';
  var values={};
  var bitbtc="-";
  var biteth="-";
  var coinbtc="-";
  var coineth="-";
var coinbch='-';
//	var stake="-";
  var alm=false;
  var d = new Date();
  var h=d.getHours();
  var m=d.getMinutes();
  if ( h < 10)
	h = "0"+h;
  if ( m < 10)
	m = "0"+m;

  xhrRequest(url, 'GET', 
    function(responseText) {
    
      var json = JSON.parse(responseText);

	  try{
		  bitbtc = parseFloat(json.result.Last);
		  
		  url = 'https://bittrex.com/api/v1.1/public/getticker?market=usdt-eth';
		  
		  xhrRequest(url, 'GET', 
			function(responseText) {

			  var json = JSON.parse(responseText);
	 		 biteth = parseFloat(json.result.Last);
				 url = 'https://api.coinone.co.kr/ticker?currency=';
		   xhrRequest(url, 'GET', 
			function(responseText) {

			  var json = JSON.parse(responseText);
				
				
				coinbtc = parseFloat(json.btc.last);
				coineth = parseFloat(json.eth.last);
				coinbch = parseFloat(json.qtum.last);
				
				  url = 'http://lovevirus.ipdisk.co.kr:3000/api/v1/alarms/chkAlarms?eth='+json.eth.last+'&btc='+json.btc.last+'&qtum='+json.qtum.last;
				 xhrRequest(url, 'GET', 
					function(responseText) {

					  var json = JSON.parse(responseText);
						alm = json.alm;
					//	console.log(alm);
						
						values.DT = h+":"+m;
					//	values.BTCKP = 0;
					//	values.ETHKP = 0;
						values.BITBTC = bitbtc.toFixed(2);
						values.BITETH = biteth.toFixed(2);
						values.COINBTC = formatNumber(coinbtc);
						values.COINETH = formatNumber(coineth);
						values.COINBCH = formatNumber(coinbch);
						values.ALM=alm ? '1' : '0';
						
						url = 'http://lovevirus.ipdisk.co.kr:3000/api/v1/qtum/getwatch';
				 xhrRequest(url, 'GET', 
					function(responseText) {

					  var json = JSON.parse(responseText);
						
						values.STAKE = json.staking + ' | ' + json.stake + ' | '+json.remaintime+'H | '+json.balance; 
						
						sendMessage(values);
						
					})


						


						
// 						 url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDKRW%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
// 				   xhrRequest(url, 'GET', 
// 					function(responseText) {

// 					  var json = JSON.parse(responseText);


// 						var rate = json.query.results.rate.Rate;

						
						
						
// 					});
						

					});
				
				
				
				

				
				});

			
			});
		 
		  
	  }
	  catch(e){
		   err('=');
			
	   }
			
	

    }      
  );
}

Pebble.addEventListener('ready', function(e) {

  //console.log(e.type);
	getCoinInfo();
	//getAjax();	
  // Fetch saved symbol from local storage (using
  // standard localStorage webAPI)

});

// Set callback for appmessage events
Pebble.addEventListener('appmessage', function(e) {

	getCoinInfo();
  
});
