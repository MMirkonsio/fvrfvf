from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Member, Employee
from .serializer import MemberSerializer, EmployeeSerializer
from rest_framework import status

class MemberView(APIView):
    def get(self, request):
        members = Member.objects.all()
        member_serializer = MemberSerializer(members, many=True)
        return Response({"Members": member_serializer.data})
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class EmployeeView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        employee_serializer = EmployeeSerializer(employees, many=True)
        return Response({"Employees": employee_serializer.data})
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class MemberDeleteView(APIView):
    def delete(self, request, id):
        try:
            member = Member.objects.get(id=id)
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Member.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class EmployeeDeleteView(APIView):
    def delete(self, request, id):
        try:
            employee = Employee.objects.get(id=id)
            employee.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class MemberUpdateView(APIView):
    def get_object(self, id):
        try:
            return Member.objects.get(id=id)
        except Member.DoesNotExist:
            return None

    def put(self, request, id):
        member = self.get_object(id)
        if member is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = MemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)