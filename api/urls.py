from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DoctorViewSet, PatientViewSet, AppointmentViewSet,
    SystemLogViewSet, HospitalSettingViewSet, AnnouncementViewSet,
    UserViewSet, SystemHealthView, LoginView
)

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'logs', SystemLogViewSet)
router.register(r'settings', HospitalSettingViewSet)
router.register(r'announcements', AnnouncementViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('system-health/', SystemHealthView.as_view(), name='system-health'),
]
