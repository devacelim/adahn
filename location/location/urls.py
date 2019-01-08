#-*- coding: utf-8 -*-
from django.conf.urls import url
from . import views
from . import logics

urlpatterns = [
	

	# VIEW URL
    url(r'^$', views.index),

	# url(r'^profile/(?P<type>\w+)/$', views.profile),    

	# url(r'^table/$', views.table_spec),    

    # # API URL
    # url(r'^api/hello',logics.getTest),

    # url(r'^api/error',logics.getError),

    # url(r'^api/post',logics.postTest),
    
]
