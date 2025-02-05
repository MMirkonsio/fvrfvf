# Generated by Django 5.0.4 on 2024-07-26 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('gender', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')], max_length=1)),
                ('position', models.CharField(choices=[('Jefe', 'Jefe'), ('Recepcionista', 'Recepcionista'), ('Entrenador', 'Entrenador'), ('Limpieza', 'Limpieza'), ('Empleado Común', 'Empleado Común')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('gender', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')], max_length=1)),
                ('membership_type', models.CharField(choices=[('Basico', 'Básico'), ('Premium', 'Premium'), ('VIP', 'VIP')], max_length=10)),
                ('membership_status', models.CharField(choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo'), ('Suspendido', 'Suspendido')], max_length=10)),
            ],
        ),
    ]
