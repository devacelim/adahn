from django.http import JsonResponse
from . import models
from django.views.decorators.http import require_http_methods



@require_http_methods(["GET"])
def getTest(request):

	
	data = models.getTest()
	
	ret = {'code':'SUCCESS','data':data}

	return JsonResponse(ret)

@require_http_methods(["GET"])
def getError(request):

	raise Exception('ERR_102')		
	# try:
	# 	print "try some.."
	# 	raise Exception('ERR_101')		

	# except Exception as e:
	# 	raise Exception(e)

	
@require_http_methods(["POST"])
def postTest(request):

	reqData = request.POST	


	data = models.getTest()

	
	ret = {'code':'SUCCESS','data':data}

	return JsonResponse(ret)
