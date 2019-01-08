#-*- coding: utf-8 -*-
from django.http import JsonResponse
import errorCode
import logging

log = logging.getLogger('django')


class AppMiddleWare(object):


	def process_request(self,request):

	
		log.info('middleware call!')

		pass


	def process_exception(self, request, exception):
		
		msg = errorCode.getErrorMessage(str(exception))

		if msg == None:
			msg='not defined error code'

		log.error('CODE : ' + str(exception)+', MESSAGE : '+msg)
		return JsonResponse({'code':str(exception),'msg':msg})

	# def process_response(self,request,response):

	# 	print request.path.startswith('/static/')
	# 	if request.path.startswith('/static/'):
	# 		response['Cache-Control'] = 'must-revalidate, no-cache'
	# 		print response
	# 	return response