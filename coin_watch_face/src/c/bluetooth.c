#include <pebble.h>
#include "common.h"
#include "get_coin.h"

static void handle_bluetooth(bool connected) {
  
	if (connected)
	{
		layer_set_hidden((Layer *)bluet_layer,false);
		
		if ( bt_conn==false)
			get_coin_info();
		
		bt_conn=true;
	}
	else
	{
		layer_set_hidden((Layer *)bluet_layer,true);
	
		bt_conn=false;

	}


}

static void handle_bluetooth_kit(bool connected){

	if (connected)
	{
		if ( bt_conn==false)
			get_coin_info();
		
		bt_conn=true;
	}
	else
	{
		bt_conn=false;	
	}
	
}