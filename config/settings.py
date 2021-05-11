import os

# APP Settings
ENV = os.environ.get('ENV')
BASE_URI = os.environ.get('BASE_URI') or 'dev.housee.ai'
DEBUG = int(os.environ.get('DEBUG', default=0))
SECRET_KEY = os.environ.get('SECRET_KEY')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGINATION_PER_PAGE = 20
SITE_ID = 1

DEBUG404 = True
AUTH_USER_MODEL = 'HouseeApp.HouseeUser'
ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'
ACCOUNT_ADAPTER = 'HouseeApp.views.MyAccountAdapter'

# Application definition
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS').split(',')
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ('localhost:3000', BASE_URI)
CORS_ORIGIN_ALLOW_ALL = False
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False
CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'x-csrf-token',
    'content-value'
)
TOKEN_EXPIRED_AFTER_SECONDS = 86400 * 365

# THIRD PARTIES
ANYMAIL = {
    # (exact settings here depend on your ESP...)
    'SENDINBLUE_API_KEY': os.environ.get('SENDINBLUE_API_KEY'),
}
EMAIL_BACKEND = 'anymail.backends.sendinblue.EmailBackend'
DEFAULT_FROM_EMAIL = 'no-reply <noreply@{}>'.format(BASE_URI) # if you don't already have this in settings
SERVER_EMAIL = 'info@{}'.format(BASE_URI) # ditto (default from-email for Django errors)

FIREBASE_SERVER_KEY=os.environ.get('FIREBASE_SERVER_KEY')

# INFRASTRUCTURE
AWS_ACCESS_KEY_ID=os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY=os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_DEFAULT_ACL = None
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME')
AWS_QUERYSTRING_AUTH = False

# s3 static settings
STATIC_LOCATION = 'static'
AWS_S3_CUSTOM_DOMAIN = '{}.s3.amazonaws.com'.format(AWS_STORAGE_BUCKET_NAME)
STATIC_URL = 'https://{}/{}/'.format(AWS_S3_CUSTOM_DOMAIN, STATIC_LOCATION)
STATICFILES_STORAGE = 'AwsApp.s3.custom_storages.StaticStorage'
# s3 public media settings
PUBLIC_MEDIA_LOCATION = 'media'
MEDIA_URL = 'https://{}/{}/'.format(AWS_S3_CUSTOM_DOMAIN, PUBLIC_MEDIA_LOCATION)
DEFAULT_FILE_STORAGE = 'AwsApp.s3.custom_storages.PublicMediaStorage'
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' # adds static files to S3 when the collectstatic command is run.

# DATABASE
DATABASE_DETAILS = {
    'NAME': os.environ.get('RDS_DB_NAME'),
    'HOST': os.environ.get('RDS_HOSTNAME'),
    'PORT': os.environ.get('RDS_PORT'),
    'USER': os.environ.get('RDS_USERNAME'),
    'PASSWORD': os.environ.get('RDS_PASSWORD')
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        **DATABASE_DETAILS
    }
}

# TODO: READ ABOUT MEMCHACHED IN PRODUCTION
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'address',
    'rest_framework.authtoken',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_auth.registration',
    'anymail',
    # 'django_archive',
    # 'advanced_filters',
    # 'debug_toolbar',
    'storages',
    'CloudApp',
    'HouseeApp',
    'LandlordApp',
    'TenantApp',
    'AgentApp',
    'PublicApp',
    'OffersApp',
    'PaymentsApp',
    'NotificationsApp',
    'LoggerApp',
]

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}


MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
]

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'optional'
OLD_PASSWORD_FIELD_ENABLED = True
ACCOUNT_EMAIL_SUBJECT_PREFIX = ''
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
# ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = reverse_lazy('account_confirm_complete')
# ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = reverse_lazy('account_confirm_complete')

REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': [
       'rest_framework.authentication.TokenAuthentication',
   ],
   'DEFAULT_PERMISSION_CLASSES': [
       'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
       'rest_framework.permissions.AllowAny',
   ],
   'DEFAULT_RENDERER_CLASSES': [
       'rest_framework.renderers.JSONRenderer',
   ],
}
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'HouseeApp.serializers.serializers.UserSerializer',

    'PASSWORD_RESET_CONFIRM_SERIALIZER':
        'HouseeApp.serializers.auth_serializers.CustomPasswordResetConfirmSerializer',
    'PASSWORD_CHANGE_SERIALIZER': 'HouseeApp.serializers.auth_serializers.CustomPasswordChangeSerializer',
}
AUTHENTICATION_BACKENDS = [
   'django.contrib.auth.backends.RemoteUserBackend',
   'django.contrib.auth.backends.ModelBackend'
]
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'HouseeApp.serializers.auth_serializers.HouseeUserRegisterSerializer',
}
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Canada/Pacific'
COUNTRY_CODE = '+1'
TIME_INPUT_FORMATS = ['%H:%M']
USE_I18N = True
# USE_L10N = True
USE_TZ = True

USER_PK = 100000000
DB_TABLES = {
    'HouseeApp': {
        'HouseeUser': {
            'pk_start_with': USER_PK
        }
    },
    'LandlordApp': {
        'LandlordUser': {
            'pk_start_with': 1000000
        }
    },
    'TenantApp': {
        'TenantUser': {
            'pk_start_with': 10000000
        }
    },
    'AgentApp': {
        'AgentUser': {
            'pk_start_with': 100000
        }
    }
}