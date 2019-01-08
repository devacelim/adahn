#include <pebble.h>
#include "common.h"

static void handle_health(HealthEventType event, void *context) {
  static char s_value_buffer[]="99999 STEP";
//static char s_value_buffer[]="99999 STEP\n(12.2 Km | 1234 Cal)";
  if (event == HealthEventMovementUpdate) {
    // display the step count
	
	if ( (int)health_service_sum_today(HealthMetricStepCount) >=10000 && step_success==false)
	{
		step_success=true;
		vibes_long_pulse();
	}
	snprintf(s_value_buffer, sizeof(s_value_buffer), "%d STEP", (int)health_service_sum_today(HealthMetricStepCount));  
    //snprintf(s_value_buffer, sizeof(s_value_buffer), "%d STEP\n(%d.%d Km | %d Cal)", (int)health_service_sum_today(HealthMetricStepCount), (int)(health_service_sum_today(HealthMetricWalkedDistanceMeters )/1000),(int)(health_service_sum_today(HealthMetricWalkedDistanceMeters )%1000)/100, (int)(health_service_sum_today(HealthMetricActiveKCalories)));
	 // snprintf(s_value_buffer, sizeof(s_value_buffer), "99999 S (12.2 K/1234 C)");
    text_layer_set_text(s_step_layer, s_value_buffer);
  }
}