import traceback


def optimize(w, A, N, count):
    try:
        x = [[0 for i in range(len(A))] for j in range(len(w))]
        used = []
        F = [];
        for step in range(N):
            maxsA = []
            delts = []
            t = -1
            for j in range(len(w)):
                t += 1
                if j in used:
                    maxsA.append((0,0))
                    delts.append(0)
                    continue
                nextA = []
                Sum = 0
                for i in range(len(A)):
                    P = 1
                    for k in range(len(w)):
                        if P == 0: break
                        if k != t and k not in used:
                            P *= 1 - w[k][i]
                    lost = A[i] * w[t][i] * P
                    nextA.append((A[i] * w[t][i] + lost, lost))
                    Sum += lost
                maxA = max(nextA, key=lambda x: x[0])
                maxsA.append((round(maxA[0], 2), nextA.index(maxA)))
                delts.append(round(maxA[0] - Sum, 2))

            
            selectedK = delts.index(max(delts))
            F.append((max(delts), selectedK))
            selectedL = maxsA[selectedK][1]
            x[selectedK][selectedL] += 1

            count[selectedK] -= 1
            if count[selectedK] <= 0:
                used.append(selectedK)
                
                
            A[selectedL] *= 1 - w[selectedK][selectedL]
        return {
            'x': x,
            'F': F
        }
    except BaseException: return traceback.format_exc()
