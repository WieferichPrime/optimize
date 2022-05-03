def optimize(w, A, N):
    totalDamage = 0
    targets = list(map(lambda a: {'A': a, 'hits': 0}, A))

    for i in range(len(targets)):
        targets[i]['A'] *= w[i]

    while N > 0:
        maxDamage = max(targets, key=lambda a: a['A'])
        totalDamage += float(maxDamage['A'])
        maxDamage['A'] *= 1 - w[targets.index(maxDamage)]
        maxDamage['hits'] += 1
        N -= 1
    res = ''
    for target in targets:
        res += f'{target["hits"]} '
    return {'x': res, 'total': round(totalDamage, 2)}