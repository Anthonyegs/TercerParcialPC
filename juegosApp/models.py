from django.db import models

# Create your models here.


class Juego(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=200)
    foto = models.CharField(max_length=200)
