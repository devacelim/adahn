
const int pinNum=13;
void setup()
{
  pinMode(pinNum,OUTPUT);
   Serial.begin(9600);
}
q`
void loop()
{
  
     Serial.println("Hello adahn");
     
     while( Serial.available() > 0)
     {
       int num = Serial.parseInt();
       Serial.print(num);
        Serial.println(" recived"); 
       blink(num);
     }
     delay(1000);
  
}

void blink(int n)
{
  for(int i=0;i<n;i++)
  {
   digitalWrite(pinNum,HIGH);
   delay(100);
    digitalWrite(pinNum,LOW);
   delay(100) ;
  }
  
}
