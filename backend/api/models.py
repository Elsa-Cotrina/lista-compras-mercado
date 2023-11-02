from django.db import models

#Create your models here.
   
class Producto(models.Model):
    ESTADO_CHOICES = (
        ('comprado','comprado'),
        ('no comprado','no comprado')
    )
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField(default=0)
    descripcion = models.TextField(max_length=200)
    estado = models.CharField(max_length=100,choices=ESTADO_CHOICES)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre