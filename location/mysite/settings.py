#-*- coding: utf-8 -*-
import os
from configurations import Configuration
from django.template.base import add_to_builtins

class Common(Configuration):

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SECRET_KEY = 'ysvw7k2=bogzqxkyy@r$n8-#*waj#uj-+a8d1s0clbv1pqzsxm'
    add_to_builtins('cachebuster.templatetags.cachebuster')
    # Application definition

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'errPage',
        'util',
         'location',
       
        'cachebuster'

    )

    MIDDLEWARE_CLASSES = (
         # Custorm Middleware
        'mysite.appMiddleWare.AppMiddleWare',

        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
      #  'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'django.middleware.security.SecurityMiddleware'

       
    )

    ROOT_URLCONF = 'mysite.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [  'errPage/templates'],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ]
                
            },
        },
    ]

    WSGI_APPLICATION = 'mysite.wsgi.application'

    TIME_ZONE = 'Asia/Seoul'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True


    STATIC_URL = '/static/'
    STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

    LANGUAGE_CODE = 'ko-kr'

    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {                        
            'verbose': {
                'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
                'datefmt' : "%Y-%m-%d %H:%M:%S"
            },
            'simple': {
                'format': '%(levelname)s %(message)s'
            },
        },
        'handlers': {
            'file': {
                'level': 'DEBUG',
                'class': 'logging.handlers.TimedRotatingFileHandler',
                'filename': 'log/app.log',       
                'formatter': 'verbose',
                'when':'d',
                'interval':1,
                #'class': 'logging.handlers.RotatingFileHandler'
                #'maxBytes':1024*1024*10, # 10MB,
                'backupCount':1
            }
        },
        'loggers': {
            'django': {
                'handlers':['file'],
                'propagate': True,
                'level':'INFO',
            },
            'util':{
                'handlers':['file'],
                'level':'DEBUG',
            },

            'catalog':{
                'handlers':['file'],
                'level':'DEBUG',
            },
                                        
        }
    }



class Local(Common):
   
    DEBUG = True

    # DATABASES = {
    #     'default': {
    #         'ENGINE': 'django.db.backends.mysql',
    #         'NAME': 'django',
    #         'USER': 'adahn',
    #         'PASSWORD': 'lovevirus1!',
    #         'HOST': 'lovevirus.ipdisk.co.kr',
    #         'PORT': '5002',
    #     }
    # }

    # DATABASE_OPTIONS = {'charset': 'utf8'}


class Dev(Common):
    DEBUG = True
    # DATABASES = {
    #     'default': {
    #         'ENGINE': 'django.db.backends.mysql',
    #         'NAME': 'naru_dev',
    #         'USER': 'naru_dev',
    #         'PASSWORD': 'naruadmin',
    #         'HOST': '150.6.13.99',
    #         'PORT': '3306',
    #     }
    # }
    # DATABASE_OPTIONS = {'charset': 'utf8'}
    ALLOWED_HOSTS = ['*']



class Prod(Common):
    DEBUG =  False
    #STATIC_URL = '/static/'
    #STATIC_ROOT = '/var/www/static_myproject'
    #STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
    ALLOWED_HOSTS = ['*']


    
