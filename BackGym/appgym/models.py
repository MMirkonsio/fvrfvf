from django.db import models

class Member(models.Model):
    GENDER_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]
    
    MEMBERSHIP_TYPE_CHOICES = [
        ('Basico', 'Básico'),
        ('Premium', 'Premium'),
        ('VIP', 'VIP'),
    ]
    
    MEMBERSHIP_STATUS_CHOICES = [
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
        ('Suspendido', 'Suspendido'),
    ]
    
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)  # Ajustado para formatos internacionales
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    membership_type = models.CharField(max_length=10, choices=MEMBERSHIP_TYPE_CHOICES)
    membership_status = models.CharField(max_length=10, choices=MEMBERSHIP_STATUS_CHOICES)
    
    def __str__(self):
        return f"{self.name} ({self.phone})"


class Employee(models.Model):
    GENDER_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]
    
    POSITION_CHOICES = [
        ('Jefe', 'Jefe'),
        ('Recepcionista', 'Recepcionista'),
        ('Entrenador', 'Entrenador'),
        ('Limpieza', 'Limpieza'),
        ('Empleado Común', 'Empleado Común'),
    ]
    
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)  # Ajustado para formatos internacionales
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    
    def __str__(self):
        return f"{self.name} ({self.position})"
