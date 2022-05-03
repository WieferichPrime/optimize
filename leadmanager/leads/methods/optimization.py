def addEvents(self):
    self.calculateBtn.clicked.connect(self.calculate)


def calculate(self):
    w = [[float(char) for char in row.strip().split(' ')] for row in self.inputW.toPlainText().split('\n')]
    if self.selectMod.currentText() == 'Однородный ресурс':
        res = opt2(w, [int(char) for char in self.inputA.text().split(' ')], int(self.inputN.text()))
    elif self.selectMod.currentText() == 'Неоднородный ресурс':
        res = opt1(w, [int(char) for char in self.inputA.text().split(' ')], int(self.inputN.text()))
    for i in range(len(res)):
        res[i] = ' '.join([str(char) for char in res[i]])
    self.fieldX.setPlainText('\n'.join(res))