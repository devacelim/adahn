#-*- coding: utf-8 -*-
from django.conf.urls import include, url, patterns
from django.conf import settings

urlpatterns = [

	
	#url(r'^catalog/', include('catalog.urls')),
	
	url(r'', include('location.urls')),



	
]


handler400 = 'errPage.views.bad_request'
handler403 = 'errPage.views.permission_denied'
handler404 = 'errPage.views.page_not_found'
handler500 = 'errPage.views.server_error'
