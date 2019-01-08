import MySQLdb 

con = MySQLdb.connect('localhost', 'root', 'lovevirus1!', 'homeIoT')
cur = con.cursor(MySQLdb.cursors.DictCursor)
query = "select * from test"
cur.execute(query) 
results = cur.fetchall() 
for row in results: 
	print row


