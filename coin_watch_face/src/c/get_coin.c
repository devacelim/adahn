#include <pebble.h>
#include "get_coin.h"
#include "common.h"


bool get_coin_info(){
	
	DictionaryIterator *iter;
  app_message_outbox_begin(&iter);
	
	if (!iter) {
    // Error creating outbound message
	//APP_LOG(APP_LOG_LEVEL_ERROR, "ITER ERR!");
	static char btc[10];
	snprintf(btc, sizeof(btc), "%s","ITER ERR!");
	text_layer_set_text(s_coin_dt_layer,"");
    text_layer_set_text(s_btc_layer, btc);
	text_layer_set_text(s_eth_layer, "");
    return false;
  }
	  
	 // Add a key-value pair
	
	const int dummy_val = 1;
    dict_write_int(iter, 1, &dummy_val, sizeof(int), true);
	

	
	dict_write_end(iter);
  app_message_outbox_send();
//  app_message_outbox_release();
  return true;
}



