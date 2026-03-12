from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Doctor', 'Doctor'),
        ('Patient', 'Patient'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Patient')

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile', null=True, blank=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile', null=True, blank=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    contact = models.CharField(max_length=15)
    address = models.TextField()
    medical_history = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')

    def __str__(self):
        return f"{self.patient.name} with {self.doctor.name} on {self.date}"

class SystemLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} by {self.user} at {self.timestamp}"

class HospitalSetting(models.Model):
    key = models.CharField(max_length=50, unique=True)
    value = models.TextField()
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.key

class Announcement(models.Model):
    TYPE_CHOICES = [
        ('Staff', 'Staff Announcement'),
        ('Emergency', 'Emergency Alert'),
    ]
    title = models.CharField(max_length=200)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='Staff')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
