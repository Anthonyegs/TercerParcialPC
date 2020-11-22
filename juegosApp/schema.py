import graphene
from graphene_django import DjangoObjectType
from .models import *


class JuegoType(DjangoObjectType):
    class Meta:
        model = Juego


class Query(graphene.ObjectType):
    juegos = graphene.List(JuegoType)

    def resolve_juegos(self, info, **kwargs):
        return Juego.objects.all()
