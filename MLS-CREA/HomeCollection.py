import pymongo


class HomeCollection:

    def __init__(self, mongouri):
        myclient = pymongo.MongoClient(mongouri)
        database = myclient["<dbname>"]
        self.HomeCollection = database["homemodels"]

    def insert_one(self, document):
        self.HomeCollection.insert_one(document)

    def insert_many(self, documents):
        self.HomeCollection.insert_many(documents)

    def query(self, query_dict):
        """set query_dict to empty Dict to query all"""
        return self.HomeCollection.find(query_dict)

    def delete(self, query_dict):
        """delete all matching documents"""
        return self.HomeCollection.delete_many(query_dict)

    def update_many(self, query, new):
        return self.HomeCollection.update_many(query, new)

    def update_one(self, query, new):
        return self.HomeCollection.update_one(query, new)
