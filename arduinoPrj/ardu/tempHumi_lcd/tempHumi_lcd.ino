
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <DHT11.h>

int pin=2;
DHT11 dht11(pin);

LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);  // Set the LCD I2C address
 
void setup() 
{
 
 
  lcd.begin(16,2);   
 
  
  lcd.backlight(); 
 
  
 
} 
 
void loop()   
{  
    int err;
  float temp,humi;
  
  if((err = (dht11.read(humi,temp))==0))
  {
    lcd.setCursor(0,0);
    lcd.print("temp = ");
    lcd.print(temp);
    lcd.setCursor(0,1);
    lcd.print("humi = ");
    lcd.print(humi);
    
    
  }
  else
  {
   
  }
  delay(DHT11_RETRY_DELAY);
}
