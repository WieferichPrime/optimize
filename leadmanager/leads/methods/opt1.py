import numpy as np


def optimize(w, A, N):
    totalDamage = []
    targets = list(map(lambda a: {'A': a, 'hits': 0}, A))
    x = [0 for a in A]
    for i in range(len(targets)):
        targets[i]['A'] *= w[i]

    while N > 0:
        maxDamage = max(targets, key=lambda a: a['A'])

        totalDamage.append(float(maxDamage['A']))
        maxDamage['A'] *= 1 - w[targets.index(maxDamage)]
        maxDamage['hits'] += 1
        N -= 1
    return {'x': list(map(lambda target: target['hits'], targets)), 'F': [(round(sum(a), 2) , i) for i, a in enumerate(np.array_split(totalDamage, 5))]}