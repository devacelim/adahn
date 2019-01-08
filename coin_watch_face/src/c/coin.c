#include <pebble.h>
#include "common.h"
static char *translate_error(AppMessageResult result);

static void inbox_received_callback(DictionaryIterator *iterator, void *context) {
	

	static char btc[32];
	static char eth[32];
	static char dt[]="XXXXXXXX (dt : xx:xx)";
	static char stake[]="X | 0.0 | 0.0H | 1234.134";

	Tuple *bitbtc_tuple = dict_find(iterator, MESSAGE_KEY_BITBTC);
	Tuple *coinbtc_tuple = dict_find(iterator, MESSAGE_KEY_COINBTC);
	//Tuple *btc_kp = dict_find(iterator, MESSAGE_KEY_BTCKP);
	
	Tuple *biteth_tuple = dict_find(iterator, MESSAGE_KEY_BITETH);
	Tuple *coineth_tuple = dict_find(iterator, MESSAGE_KEY_COINETH);
	//Tuple *eth_kp = dict_find(iterator, MESSAGE_KEY_ETHKP);
	Tuple *dt_tuple = dict_find(iterator, MESSAGE_KEY_DT);
	
	Tuple *coinbch_tuple = dict_find(iterator, MESSAGE_KEY_COINBCH);
	
	Tuple *alm_tuple = dict_find(iterator, MESSAGE_KEY_ALM);
	
	Tuple *stake_tuple = dict_find(iterator,MESSAGE_KEY_STAKE);
  
	if ( !strcmp(alm_tuple->value->cstring,"1") )
	{
		layer_set_hidden((Layer *)alm_layer,false);
		vibes_long_pulse();
	}
	else
		layer_set_hidden((Layer *)alm_layer,true);
	
	
	snprintf(dt,sizeof(dt),"%s (dt : %s)",coinbch_tuple->value->cstring,dt_tuple->value->cstring);
    snprintf(btc, sizeof(btc), "%s | %s", bitbtc_tuple->value->cstring,coinbtc_tuple->value->cstring);
	snprintf(eth, sizeof(eth), "%s | %s", biteth_tuple->value->cstring,coineth_tuple->value->cstring);
	snprintf(stake,sizeof(stake),"%s",stake_tuple->value->cstring);
 
	text_layer_set_text(s_stake_layer,stake);
	text_layer_set_text(s_coin_dt_layer,dt);
    text_layer_set_text(s_btc_layer, btc);
	text_layer_set_text(s_eth_layer, eth);
	
	
	// APP_LOG(APP_LOG_LEVEL_DEBUG, "Message success!");
}


static void inbox_dropped_callback(AppMessageResult reason, void *context) {
 // APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped!");
static char btc[36];
//	APP_LOG(APP_LOG_LEVEL_DEBUG, "%s", translate_error(reason));
	snprintf(btc, sizeof(btc), "%s",translate_error(reason));
	text_layer_set_text(s_coin_dt_layer,"");
	text_layer_set_text(s_stake_layer,"");
    text_layer_set_text(s_btc_layer, btc);
	text_layer_set_text(s_eth_layer, "");
	
	
}

static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
//  APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed!");
	static char btc[36];
//	APP_LOG(APP_LOG_LEVEL_DEBUG, "%s", translate_error(reason));
	snprintf(btc, sizeof(btc), "%s",translate_error(reason));
	text_layer_set_text(s_coin_dt_layer,"");
	text_layer_set_text(s_stake_layer,"");
    text_layer_set_text(s_btc_layer, btc);
	text_layer_set_text(s_eth_layer, "");
}


static char *translate_error(AppMessageResult result) {
switch (result) {
case APP_MSG_OK: return "OK";
case APP_MSG_SEND_TIMEOUT: return "SEND_TIMEOUT";
case APP_MSG_SEND_REJECTED: return "SEND_REJECTED";
case APP_MSG_NOT_CONNECTED: return "NOT_CONNECTED";
case APP_MSG_APP_NOT_RUNNING: return "APP_NOT_RUNNING";
case APP_MSG_INVALID_ARGS: return "INVALID_ARGS";
case APP_MSG_BUSY: return "BUSY";
case APP_MSG_BUFFER_OVERFLOW: return "BUFFER_OVERFLOW";
case APP_MSG_ALREADY_RELEASED: return "ALREADY_RELEASED";
case APP_MSG_CALLBACK_ALREADY_REGISTERED: return "CALLBACK_ALREADY_REGISTERED";
case APP_MSG_CALLBACK_NOT_REGISTERED: return "CALLBACK_NOT_REGISTERED";
case APP_MSG_OUT_OF_MEMORY: return "OUT_OF_MEMORY";
case APP_MSG_CLOSED: return "MSG_CLOSED";
case APP_MSG_INTERNAL_ERROR: return "INTERNAL_ERROR";
default: return "UNKNOWN";
  }
}


