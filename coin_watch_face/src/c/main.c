#include <pebble.h>
#include "common.h"
#include "bettery.c"
#include "time.c"
#include "bluetooth.c"
#include "health.c"
#include "coin.c"

const int inbox_size = 110;
const int outbox_size = 1;

static void top_border_update_proc(Layer *layer, GContext *ctx) {
 const GRect bounds = layer_get_bounds(layer);
  // y relative to layer's bounds to support clipping after some vertical scrolling
  const int16_t yy = 4;

  graphics_context_set_stroke_color(ctx, GColorWhite);
	graphics_context_set_stroke_width (ctx,2);
	
  graphics_draw_line(ctx, GPoint(0, yy), GPoint(bounds.size.w, yy));
}

static void bottom_border_update_proc(Layer *layer, GContext *ctx) {
 const GRect bounds = layer_get_bounds(layer);
  // y relative to layer's bounds to support clipping after some vertical scrolling
  const int16_t yy = 4;

  graphics_context_set_stroke_color(ctx, GColorWhite);
	graphics_context_set_stroke_width (ctx,2);
	
  graphics_draw_line(ctx, GPoint(0, yy), GPoint(bounds.size.w, yy));
}



static void main_window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
	
  GRect bounds = layer_get_frame(window_layer);
	
	
  bluet_layer = bitmap_layer_create(GRect(0, 0, 24, 24));
  GBitmap *bluet_bmp = gbitmap_create_with_resource (RESOURCE_ID_BT_CONN );
  bitmap_layer_set_bitmap(bluet_layer, bluet_bmp);
  handle_bluetooth(connection_service_peek_pebble_app_connection());

	alm_layer = bitmap_layer_create(GRect(20, 0, 24, 24));
  GBitmap *alm_bmp = gbitmap_create_with_resource (RESOURCE_ID_ALM_DANGER );
  bitmap_layer_set_bitmap(alm_layer, alm_bmp);
	layer_set_hidden((Layer *)alm_layer,true);

  s_battery_layer = text_layer_create(GRect(bounds.size.w-35,0 , 35, 24));
  text_layer_set_text_color(s_battery_layer, GColorWhite);
  text_layer_set_background_color(s_battery_layer, GColorClear);
  text_layer_set_font(s_battery_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18));
  text_layer_set_text_alignment(s_battery_layer, GTextAlignmentCenter);
  text_layer_set_text(s_battery_layer, "100%");
	
 // batt_layer = bitmap_layer_create(GRect(bounds.size.w-35,0 , 35, 24));
 // GBitmap *batt_bmp = gbitmap_create_with_resource (RESOURCE_ID_BT_CHARGE6);
 // bitmap_layer_set_bitmap(batt_layer, batt_bmp);

	
	
  top_border_layer = layer_create(GRect(0, 20, bounds.size.w, 20));
  layer_set_update_proc(top_border_layer, top_border_update_proc);
	

  s_day_layer = text_layer_create(GRect(0, 23, bounds.size.w, 26));
  text_layer_set_text_color(s_day_layer, GColorWhite);
  text_layer_set_background_color(s_day_layer, GColorClear);
  text_layer_set_font(s_day_layer, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD  ));
  text_layer_set_text_alignment(s_day_layer, GTextAlignmentCenter);

  s_time_layer = text_layer_create(GRect(0, 46, bounds.size.w, 30));
  text_layer_set_text_color(s_time_layer, GColorWhite);
  text_layer_set_background_color(s_time_layer, GColorClear);
  text_layer_set_font(s_time_layer, fonts_get_system_font(FONT_KEY_BITHAM_30_BLACK ));
  text_layer_set_text_alignment(s_time_layer, GTextAlignmentCenter);
	


  s_step_layer = text_layer_create(GRect(0,78 ,bounds.size.w,20));
  text_layer_set_text_color(s_step_layer, GColorWhite);
  text_layer_set_background_color(s_step_layer, GColorClear);
  text_layer_set_font(s_step_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD ));
  text_layer_set_text_alignment(s_step_layer, GTextAlignmentCenter);

	 bottom_border_layer = layer_create(GRect(0, 100, bounds.size.w, 20));
  layer_set_update_proc(bottom_border_layer, bottom_border_update_proc);
	
	
	  s_stake_layer = text_layer_create(GRect(0,120 ,bounds.size.w,14));
  text_layer_set_text_color(s_stake_layer, GColorWhite);
  text_layer_set_background_color(s_stake_layer, GColorClear);
  text_layer_set_font(s_stake_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD));
  text_layer_set_text_alignment(s_stake_layer, GTextAlignmentCenter);
	//  text_layer_set_text(s_stake_layer, "100%");
	
	
  s_coin_dt_layer = text_layer_create(GRect(0,105 ,bounds.size.w,14));
  text_layer_set_text_color(s_coin_dt_layer, GColorWhite);
  text_layer_set_background_color(s_coin_dt_layer, GColorClear);
  text_layer_set_font(s_coin_dt_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD));
  text_layer_set_text_alignment(s_coin_dt_layer, GTextAlignmentRight);

	
  s_btc_layer = text_layer_create(GRect(0,135 ,bounds.size.w,14));
  text_layer_set_text_color(s_btc_layer, GColorWhite);
  text_layer_set_background_color(s_btc_layer, GColorClear);
  text_layer_set_font(s_btc_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD ));
  text_layer_set_text_alignment(s_btc_layer, GTextAlignmentCenter);
	
  s_eth_layer = text_layer_create(GRect(0,150 ,bounds.size.w,14));
  text_layer_set_text_color(s_eth_layer, GColorWhite);
  text_layer_set_background_color(s_eth_layer, GColorClear);
  text_layer_set_font(s_eth_layer, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD ));
  text_layer_set_text_alignment(s_eth_layer, GTextAlignmentCenter);

	
	
  time_t now = time(NULL);
  struct tm *current_time = localtime(&now);
  handle_second_tick(current_time, SECOND_UNIT);
  
  tick_timer_service_subscribe(SECOND_UNIT, handle_second_tick);
  
  battery_state_service_subscribe(handle_battery);
	
  if ( health_service_events_subscribe(handle_health, NULL) )
	  handle_health(HealthEventMovementUpdate,NULL);
  else
    APP_LOG(APP_LOG_LEVEL_ERROR, "Health not available!");
  	

  connection_service_subscribe((ConnectionHandlers) {
    .pebble_app_connection_handler = handle_bluetooth,
	.pebblekit_connection_handler = handle_bluetooth_kit
  });

  layer_add_child(window_layer, text_layer_get_layer(s_time_layer));
  layer_add_child(window_layer, text_layer_get_layer(s_day_layer));

  layer_add_child(window_layer, text_layer_get_layer(s_battery_layer));
  layer_add_child(window_layer, bitmap_layer_get_layer(bluet_layer));
	
	layer_add_child(window_layer, text_layer_get_layer(s_stake_layer));
 layer_add_child(window_layer, text_layer_get_layer(s_step_layer));
layer_add_child(window_layer, text_layer_get_layer(s_btc_layer));
layer_add_child(window_layer, text_layer_get_layer(s_eth_layer));
	layer_add_child(window_layer, text_layer_get_layer(s_coin_dt_layer));
  layer_add_child(window_layer, bitmap_layer_get_layer(alm_layer));
  layer_add_child(window_layer,top_border_layer);
layer_add_child(window_layer,bottom_border_layer);
  handle_battery(battery_state_service_peek());
	
	
//	get_coin_info();
}

static void main_window_unload(Window *window) {
  tick_timer_service_unsubscribe();

  battery_state_service_unsubscribe();
	
  health_service_events_unsubscribe();
	
  connection_service_unsubscribe();
  text_layer_destroy(s_time_layer);
  text_layer_destroy(s_day_layer);
	  text_layer_destroy(s_step_layer);
	text_layer_destroy(s_stake_layer);
	  text_layer_destroy(s_btc_layer);
	 text_layer_destroy(s_eth_layer);
  text_layer_destroy(s_battery_layer);
  bitmap_layer_destroy(bluet_layer);
	text_layer_destroy(s_coin_dt_layer);
  bitmap_layer_destroy(alm_layer);
  layer_destroy(top_border_layer);
	 layer_destroy(bottom_border_layer);
	
	app_message_deregister_callbacks();
}

static void init() {
  s_main_window = window_create();
	step_success=false;
  window_set_background_color(s_main_window, GColorBlack  );
  window_set_window_handlers(s_main_window, (WindowHandlers) {
    .load = main_window_load,
    .unload = main_window_unload,
  });
  window_stack_push(s_main_window, true);
}

static void deinit() {
  window_destroy(s_main_window);
}

int main(void) {
	app_message_register_inbox_received(inbox_received_callback);
app_message_register_inbox_dropped(inbox_dropped_callback);
app_message_register_outbox_failed(outbox_failed_callback);

	app_message_open(inbox_size, outbox_size);
	
  init();
	
  app_event_loop();
  deinit();
}