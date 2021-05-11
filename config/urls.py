from django.contrib import admin
from django.urls import path
from django.conf.urls import include, re_path
from django.views.static import serve
# from config.settings import STATIC_ROOT\
#     # , MEDIA_ROOT


urlpatterns = [
    path('api/admin_hy2uy3gu3ehbvgyets/', admin.site.urls),
    path('api/rest-auth/', include(("HouseeApp.auth.urls", "HouseeApp"), namespace="auth_urls")),
    path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/notifications/', include(("NotificationsApp.urls", "NotificationsApp"), namespace="notificationsApp")),
    path('api/users/', include(("HouseeApp.urls", "HouseeApp"), namespace="users")),

    path('api/landlords/', include(("LandlordApp.urls", "LandlordApp"), namespace="landlords")),
    path('api/tenants/', include(("TenantApp.urls", "TenantApp"), namespace="tenants")),
    path('api/agents/', include(("AgentApp.urls", "AgentApp"), namespace="agents")),

    # re_path('static/(?P<path>.*)', serve, {'document_root': STATIC_ROOT}),
    # re_path('media/(?P<path>.*)', serve, {'document_root': MEDIA_ROOT}),
    # path('advanced_filters/', include('advanced_filters.urls'))
]
admin.site.site_header = 'Housee Admin'
