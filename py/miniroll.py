import random
def dieRoll(dice):
  inputList=[]
  outputList=[]
  for i in dice.split('d'): 
    inputList.append(i)
  for i in range(int(inputList[0])):
    outputList.append(random.randint(1,int(inputList[1])))
  return outputList
