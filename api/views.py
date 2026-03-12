from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from django.contrib.auth.models import User
from .models import Doctor, Patient, Appointment, SystemLog, HospitalSetting, Announcement, Profile
from .serializers import (
    DoctorSerializer, PatientSerializer, AppointmentSerializer, 
    SystemLogSerializer, HospitalSettingSerializer, AnnouncementSerializer, 
    UserSerializer, ProfileSerializer
)
from django.contrib.auth import authenticate, login

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            # For simplicity in this demo, we'll just return user info and role
            # In a real app, use Token or Session
            profile, created = Profile.objects.get_or_create(user=user)
            return Response({
                "id": user.id,
                "username": user.username,
                "role": profile.role,
                "token": "mock-token-123" # Mocked for session state
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class SystemLogViewSet(viewsets.ModelViewSet):
    queryset = SystemLog.objects.all().order_by('-timestamp')
    serializer_class = SystemLogSerializer

class HospitalSettingViewSet(viewsets.ModelViewSet):
    queryset = HospitalSetting.objects.all()
    serializer_class = HospitalSettingSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-created_at')
    serializer_class = AnnouncementSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SystemHealthView(APIView):
    def get(self, request):
        # Dynamically calculate some "health" stats
        import os
        from django.conf import settings
        
        db_path = settings.DATABASES['default']['NAME']
        db_size_bytes = os.path.getsize(db_path) if os.path.exists(db_path) else 0
        db_size_gb = round(db_size_bytes / (1024 * 1024 * 1024), 2)
        
        return Response({
            "database_size": f"{db_size_gb} GB",
            "database_limit": "100 GB",
            "api_uptime": "99.9%",  # In a real app, this would be fetched from a monitoring tool
            "system_status": "Healthy",
            "active_connections": 12 # Mocked for demo
        })
