from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Patient, Appointment, SystemLog, HospitalSetting, Announcement, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['role']

class DoctorSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user.profile.role', read_only=True)
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user.profile.role', read_only=True)
    class Meta:
        model = Patient
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.ReadOnlyField(source='doctor.name')
    patient_name = serializers.ReadOnlyField(source='patient.name')

    class Meta:
        model = Appointment
        fields = '__all__'

class SystemLogSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = SystemLog
        fields = '__all__'

class HospitalSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalSetting
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

