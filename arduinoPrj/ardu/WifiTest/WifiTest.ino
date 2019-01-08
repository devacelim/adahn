#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

const char* ssid = "LoveVirus2.4Ghz";
const char* password = "dnjswjd1!";
 
void setup() {
  Serial.begin(9600);
  delay(10);
 
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
 
  // Print the IP address
  Serial.print("WIFI IP : ");
  Serial.print(WiFi.localIP());
  Serial.println("");

   HTTPClient http;
  http.begin("http://lovevirus.ipdisk.co.kr:3000/api/v1/posts/test");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  //String postMessage = String("{'data' : 'yourapistring here', 'Title' : 'Test', 'Body' : 'Test'}");
  String postMessage="adahn=apitest&foo=bar";
  int httpCode = http.POST(postMessage);
  Serial.print("http result:");
  Serial.println(httpCode);
  http.writeToStream(&Serial);
  http.end();
}
 
void loop() {
  // Check if a client has connected


}
