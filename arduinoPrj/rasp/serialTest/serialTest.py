import serial


port = "/dev/ttyUSB0"
serialFromArduino = serial.Serial(port,9600)
serialFromArduino.flushInput()
a=1
while 1:
	input = serialFromArduino.readline()
	print input[:-1]
	if a==1:
		serialFromArduino.write('10')
	a+=1


