 #include "DHT11.h"
 
// pin 5 is DHT11
// pin 4 is HCSR505
 int pin=5;
 DHT11 dht11(pin);

void setup()  {   
Serial.begin(9600);   
 pinMode(4,INPUT);   
 digitalWrite(4,LOW); }

void loop()  {     
  
if(digitalRead(4)==HIGH) 
 {       
 Serial.println("Somebody is here.");      
}     
 else  {       
 Serial.println("Nobody.");      
}     

 int err;
   float temp,humi;

     // 에러가 발생하지 않으면 값을 발생하면 에러값을 출력
   if((err = (dht11.read(humi,temp))==0))
   {
      Serial.print("temperature : ");
      Serial.print(temp);
      Serial.print(" ");
      Serial.print("humidity : ");
      Serial.print(humi);

      Serial.println();

   }
   else
   {
      Serial.print("err : ");
      Serial.print(err);
      Serial.println();
   }

delay(2000);
 
 }  
