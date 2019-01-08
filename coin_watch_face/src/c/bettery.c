#include <pebble.h>
#include "common.h"


static void handle_battery(BatteryChargeState charge_state) {
  static char battery_text[] = "100%";

  if (charge_state.is_charging) {
	    snprintf(battery_text, sizeof(battery_text), "CG");
		  text_layer_set_text(s_battery_layer, battery_text);
	  
//	layer_set_hidden((Layer *)s_battery_layer,true);
//	  layer_set_hidden((Layer *)batt_layer,false);
//    snprintf(battery_text, sizeof(battery_text), "CG");
  } 
	
	else {
//		layer_set_hidden((Layer *)s_battery_layer,false);
//		  layer_set_hidden((Layer *)batt_layer,true);
		
    snprintf(battery_text, sizeof(battery_text), "%d%%", charge_state.charge_percent);
		  text_layer_set_text(s_battery_layer, battery_text);
}
  }
