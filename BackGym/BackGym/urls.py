"""
URL configuration for BackGym project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from appgym.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('members/', MemberView.as_view(), name='members-view'),
    path('employees/', EmployeeView.as_view(), name='employees-view'),
    path('members/<int:id>/', MemberUpdateView.as_view(), name='member-update'),  # Ruta para actualizar
    path('members/<int:id>/delete/', MemberDeleteView.as_view(), name='member-delete'),  # Ruta para eliminar
    path('employees/<int:id>/', EmployeeDeleteView.as_view(), name='employee-delete'),
]
