from json import JSONDecoder
import json
import traceback
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from leads.methods.optimization_2_1 import optimize
# Create your views here.

def removeId(elem):
    elem.pop('id')
    return elem

def methodinfo(request): 
    try:
        A = json.loads(request.body)['table_1']['rows'][0]
        A.pop('id')
        A = list(map(lambda a: int(a), A.values()))
        W = list(map(lambda row: list(map(lambda a: float(a), row.values())), map(removeId, json.loads(request.body)['table_2']['rows'])))
        count = [int(row.pop()) for row in W]
        print(count)
        result = optimize(W, A, sum(count), count)
        return JsonResponse(result)
    except BaseException:
        return HttpResponse(content=traceback.format_exc())

    
