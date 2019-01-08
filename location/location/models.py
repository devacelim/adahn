#-*- coding: utf-8 -*-
import util.dbConn as dbConn


def getTest():

	data = dbConn.fetchQuery('select * from test')

	return data
	

