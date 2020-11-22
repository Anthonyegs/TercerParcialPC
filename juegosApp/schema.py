import graphene
from graphene_django import DjangoObjectType
from .models import Juego


class JuegoType(DjangoObjectType):
    class Meta:
        model = Juego


class Query(graphene.ObjectType):
    juegos = graphene.List(JuegoType)

    def resolve_juegos(self, info, **kwargs):
        return Juego.objects.all()


class JuegoInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    descripcion = graphene.String()
    foto = graphene.String()


class CreateJuego(graphene.Mutation):
    class Arguments:
        input = JuegoInput(required=True)

    ok = graphene.Boolean()
    juego = graphene.Field(JuegoType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        juego_instance = Juego(nombre=input.nombre,
                               descripcion=input.descripcion, foto=input.foto)
        juego_instance.save()
        return CreateJuego(ok=ok, juego=juego_instance)


class UpdateJuego(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = JuegoInput(required=True)

    ok = graphene.Boolean()
    juego = graphene.Field(JuegoType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        juego_instance = Juego.objects.get(pk=id)
        if juego_instance:
            ok = True
            juego_instance.nombre = input.nombre
            juego_instance.descripcion = input.descripcion
            juego_instance.foto = input.foto
            juego_instance.save()
            return UpdateJuego(ok=ok, juego=juego_instance)
        return UpdateJuego(ok=ok, juego=None)


class Mutation(graphene.ObjectType):
    create_juego = CreateJuego.Field()
    update_juego = UpdateJuego.Field()
