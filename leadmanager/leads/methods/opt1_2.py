def optimize(w, A, N):
    totalDamage = 0
    areas = []
    S = len(A)
    L = len(w)

    for j in range(L):
        areas.append({
            'hits': 0,
            'damage': 0
        })

    while N > 0:
        for j in range(L):
            areaDamage = 0
            for i in range(S):
                areaDamage += A[i] * w[j][i]
            areas[j]['damage'] = areaDamage
        maxArea = max(areas, key=lambda a: a['damage'])
        maxArea['hits'] += 1
        for i in range(S):
            A[i] *= 1 - w[areas.index(maxArea)][i]
        totalDamage += maxArea['damage']
        N -= 1

    x = ''
    for area in areas:
        x += str(area['hits'])

    return {'x' : x, 'total' : round(totalDamage, 2)}