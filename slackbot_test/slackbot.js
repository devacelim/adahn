var fs = require('fs');
var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token =  'xoxb-108862259927-XS5lI6jBBiDdu6VmlrmMnNVH'


var rtm = new RtmClient(bot_token,{logLevel: 'error'});
var web = new WebClient(bot_token, {logLevel: 'error'});

var CMDCHAR='?'

var CMD_LIST=['work','home']

rtm.start();

// Wait Connection
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {

  // Get the user's name
  var user = rtm.dataStore.getUserById(rtm.activeUserId);

  // Get the team's name
  var team = rtm.dataStore.getTeamById(rtm.activeTeamId);

  // Get Channel's ID (#general)
  var channel = rtm.dataStore.getChannelByName('#general').id;




  console.log('Connected to ' + team.name + ' as ' + user.name);

  msg = {'attachments':[{
  			'fallback':user.name+' is LOG-IN!',
  			'pretext':'*Connected to ' + team.name + '(#general)' +' as ' + user.name+'*',
  			'text':'Adahnbot Usage : ' + CMDCHAR + '{'+CMD_LIST+'}\nAdahnbot Help : ' + CMDCHAR + 'help',
  			'color':'#36a64f',
  			'mrkdwn_in':['pretext']
			}],
  		'as_user':true
  		}


  // Welcome Message
  web.chat.postMessage(channel,'',msg)

})

// Message Listener
rtm.on(RTM_EVENTS.MESSAGE, function (message) {

	var text = message.text
	var channel = message.channel
  	

	ret = text_filter(text)
	
	if (ret==-1)
		return
	else if ( ret==0 )
	{
		msg = {'attachments':[{
			'fallback':'HELP MESSAGE!',
  			'text':'Adahnbot Usage : ' + CMDCHAR + '{'+CMD_LIST+'}\nAdahnbot Help : ' + CMDCHAR + 'help\n',
  			'color':'#36a64f',
			}],
  			'as_user':true
  		}


		web.chat.postMessage(channel,'',msg)
	}
	else
		return

});



function text_filter(text)
{

	var cmd = text.split(CMDCHAR)

	
	if (text.substr(0,1) != CMDCHAR)
		return -1
	if (cmd[1] == "help")
		return 0
	

 	if (CMD_LIST.indexOf(cmd[1]) != -1)
 	{
 		
 		console.log(cmd[1] + ' is call')
 		return 1
 	}		
 	else
 		return 0


}