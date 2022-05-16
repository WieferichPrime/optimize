def optimize(w, A, n, N):
    total = 0
    def step12():
        for i in range(len(targets)):
            colW = []
            for j in range(len(w)):
                colW.append(w[j][i])
            maxW = max(colW)
            maxIndex = colW.index(maxW)
            targets[i]['w'] = maxIndex
            targets[i]['A'] *= maxW

    targets = [{'A': a} for a in A]
    x = [[0 for i in range(len(targets))] for j in range(len(w))]
    step12()
    while n > 0:
        maxDamage = max(targets, key=lambda a: a['A'])
        x[maxDamage['w']][targets.index(maxDamage)] += 1
        total += float(maxDamage['A'])
        maxDamage['A'] *= 1 - w[maxDamage['w']][targets.index(maxDamage)]
        n -= 1
        if n == 0: break
        if N[maxDamage['w']] > 0:
            N[maxDamage['w']] -= 1
        else:
            step12()

    res = ''
    for row in x:
        for cell in row:
            res += f'{cell}\t'
        res += '\n'
    return {'x': res, 'F': round(total, 2)}







