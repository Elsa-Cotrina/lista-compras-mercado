from rest_framework.views import APIView
from rest_framework.response import Response

from .models import  Producto
from .serializers import  ProductoSerializer

class IndexView(APIView):

    def get(self,request):
        context = {
            'status':True,
            'content': 'api rest activo'
        }
        return Response(context)

class  ProductoView(APIView):

    def post(self,request):
        serializer =  ProductoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

    def get(self,request):
        queryset =  Producto.objects.all()
        serializer =  ProductoSerializer(queryset,many= True)

        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

from django.http import Http404
from rest_framework import status

class  ProductoDetailView(APIView):

    def get_object(self,pk):
        try:
            return  Producto.objects.get(pk=pk)
        except  Producto.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        obj_producto = self.get_object(pk)
        serializer =  ProductoSerializer(obj_producto)

        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)

    def put(self,request,pk):
        obj_producto = self.get_object(pk)
        serializer = ProductoSerializer(obj_producto,data=request.data)

        if serializer.is_valid():
            serializer.save()
            context = {
                'status': True,
                'content': serializer.data
            }
            return Response(context)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        obj_producto = self.get_object(pk)
        obj_producto_del = obj_producto
        serializer = ProductoSerializer(obj_producto)

        context = {
            'status': True,
            'content': serializer.data
        }
        obj_producto.delete()
        return Response(context)

    def patch(self,request,pk):
        obj_producto = self.get_object(pk)
        obj_producto.estado = request.data['estado']
        obj_producto.save()

        serializer = ProductoSerializer(obj_producto)

        context = {
            'status': True,
            'content': serializer.data
        }
        return Response(context)