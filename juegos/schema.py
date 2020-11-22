import graphene
import juegosApp.schema


class Query(juegosApp.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
