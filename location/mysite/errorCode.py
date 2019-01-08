#-*- coding: utf-8 -*-
ERRORS={
	
	# 1XX : DB Exception
	'ERR_101' : 'Mysql Query Error'

	
}


def getErrorMessage(code):

	return ERRORS.get(code)