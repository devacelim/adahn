#include <pebble.h>
#include "common.h"
#include "get_coin.h"


static void handle_second_tick(struct tm* tick_time, TimeUnits units_changed) {
  // Needs to be static because it's used by the system later.
  static char date_text[] = "YYYY-MM-DD XXX";
	
  static char time_text[] ="00:00";

// strftime(time_text, sizeof(time_text), "%T", tick_time);
  strftime(time_text, sizeof(time_text), "%R", tick_time);
  strftime(date_text, sizeof(date_text), "%F %a", tick_time);
  
  text_layer_set_text(s_time_layer, time_text);
  text_layer_set_text(s_day_layer, date_text);
	
  if(tick_time->tm_sec ==0)
	  get_coin_info();
	  
}

