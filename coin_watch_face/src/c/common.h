#include <pebble.h>


static Window *s_main_window;
static TextLayer *s_time_layer;
static TextLayer *s_day_layer;
static TextLayer *s_battery_layer;
static TextLayer *s_step_layer;
static TextLayer *s_btc_layer;
static TextLayer *s_eth_layer;
static TextLayer *s_coin_dt_layer;
static TextLayer *s_stake_layer;

static BitmapLayer *bluet_layer;
static BitmapLayer *alm_layer;
//static BitmapLayer *batt_layer;

static Layer *top_border_layer;

static Layer *bottom_border_layer;

static bool bt_conn;
static bool step_success;
