#-*- coding: utf-8 -*-

from django.db import connection

import logging

log = logging.getLogger(__name__)

def fetchQuery(query):

	try:
		cursor = connection.cursor()
		cursor.execute(query)
		log.debug("EXCUTE QUERY : " + query)
	except Exception as e:
		log.error(e)
		raise Exception('ERR_101')

	columns = [col[0] for col in cursor.description]
	return [
		dict(zip(columns, row))

		for row in cursor.fetchall()
	]

