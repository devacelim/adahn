
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);  // Set the LCD I2C address
 
void setup() 
{
 
 
  lcd.begin(16,2);   
 
  for(int i = 0; i< 3; i++)
  {
    lcd.backlight();
    delay(250);
    lcd.noBacklight();
    delay(250);
  }
  lcd.backlight(); 
 
  lcd.setCursor(0,0);
  lcd.print("Hello, Adahn!");
  delay(1000);
  lcd.setCursor(0,1);
  lcd.print("I'm LCD!!!"); 
  delay(8000);  
 
 
} 
 
void loop()   
{
  
}
