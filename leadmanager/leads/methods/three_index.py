from math import prod

# B = [50,20,20,10]
# A = [50,20,20,10]
# N = [
#     [
#         [0.8, 0.9 , 0.4],
#         [0.4, 0.9 , 0.9],
#         [0.8, 0.9, 0.2]
#     ],
#     [
#         [0.4, 0.7 , 0.6],
#         [0.9, 0.9 , 0.1],
#         [0.9, 0.2 , 0.8]
#     ],
#     [
#         [0.8, 0.2 , 0.8],
#         [0.5, 0.3 , 0.9],
#         [0.9, 0.2 , 0.8]
#     ],
#     [
#         [0.3, 0.3 , 0.5],
#         [0.2, 0.1 , 0.9],
#         [0.1, 0.4 , 0.5]
#     ],
# ]
def optimize(A, W):
    B = A.copy()
    t = 1
    L = len(W[0][0])
    S = len(A)
    a = [prod([prod(agent) for agent in target]) for target in W]
    delts = []
    x = [[0 for j in range(len(W[0]))] for i in range(L)]

    while t <= len(W[0]):
        delts = []
        for k in range(len(W[0])):
            for l in range(L):
                delta = 0
                for i in range(S):
                    delta += A[i] * W[i][k][l] * (1 + a[i] / prod(W[i][k]))
                delts.append(delta)
        indexMin = delts.index(min(delts))
        if indexMin > 0:
            k = int(indexMin / len(W[0]))
        l = indexMin % len(W[0])
        for i in range(S):
            A[i] = A[i] * W[i][k][l]
            a[i] = a[i]/prod(W[i][k])
        x[k][l] = 1
        t += 1
    res = 0
    for i in range(S):
        res += B[i] - A[i]
    return {
        'x': x,
        'F': [],
        'res': res
    }

