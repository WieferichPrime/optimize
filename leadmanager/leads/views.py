from json import JSONDecoder
import json
import traceback
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from leads.methods.optimization_2_1 import optimize as opt3
from leads.methods.opt2 import optimize as opt2
from leads.methods.opt1 import optimize as opt1
from leads.methods.three_index import optimize as opt4
# Create your views here.

def removeId(elem):
    elem.pop('id')
    return elem

def methodinfo(request): 
    try:
        task = json.loads(request.body)['task']
        tables = json.loads(request.body)['tables']
        A = tables['table_1']['rows'][0]
        A.pop('id')
        A = list(map(lambda a: int(a), A.values()))
        if (task == 1 or task == 2):
            W = list(map(lambda row: list(map(lambda a: float(a), row.values())), map(removeId, tables['table_2']['rows'])))
            count = [int(row.pop()) for row in W]
        if (task == 3):
            N = []
            for (tableName, tableData) in tables.items():
                if tableName.find('obj_') != -1:
                    N.append(list(map(lambda row: list(map(lambda a: float(a), row.values())), map(removeId, tableData['rows']))))
            result = opt4(A, N);
            return JsonResponse(result)
        elif (task == 2):
            result = opt3(W, A, sum(count), count)
            return JsonResponse(result)
        elif (task == 1):
            result = opt2(W, A, sum(count))
            return JsonResponse(result)
        elif (task == 0):
            W = list(map(lambda row: list(map(lambda a: float(a), row.values())), map(removeId, tables['table_2']['rows'])))[0]
            count = int(W.pop())
            result = opt1(W, A, count)
            return JsonResponse(result)
        else:
            return task
    except BaseException:
        return HttpResponse(content=traceback.format_exc())

    
