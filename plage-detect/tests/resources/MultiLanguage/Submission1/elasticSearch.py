from elasticsearch import Elasticsearch, helpers, client 
from src.indexing.indexConfig import settings
from itertools import islice
import math

class elastic:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.elastic = Elasticsearch([{'host': host, 'port': port}])

    def createElastic(self, index, settings):
        try:
            if not self.elastic.indices.exists(index):
                self.elastic.indices.create(index=index, body=settings, ignore=400)
            created = True
        except Exception as ex:
            print(str(ex))
            created = False
        finally:
            return created


    def storeRecords(self, index, body):
        n = len(body)
        for i in range(math.ceil(n/1000)):
            items = list(islice(body, i*1000, (i+1)*1000))
            actions = [
                {
                    "_index": index,
                    "_id": items[key],
                    "content": body[items[key]]
                }
                for key in range(len(items))
            ]
            print('Indexed %d: %d' % (i*1000, (i+1)*1000))
            try:
                helpers.bulk(client=self.elastic, actions=actions)
            except Exception as ex:
                print('Error in indexing data')
                print(str(ex))

if __name__ == "__main__":
    elastic = elastic('localhost', 9200)
    created = elastic.createElastic('ap89', settings)

    elastic.storeRecords('ap89',{"57123":"hello"})

    # elastic.printRecords('ap89')
