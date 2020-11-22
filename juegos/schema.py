import graphene
import juegosApp.schema


class Query(juegosApp.schema.Query, graphene.ObjectType):
    pass


class Mutation(juegosApp.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
