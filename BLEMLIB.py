import random, os
def roll(dice):
  blemLibRollOne=[]
  blemLibRollTwo=[]
  for i in dice.split('d'): 
    blemLibRollOne.append(i)
  for i in range(int(blemLibRollOne[0])):
    blemLibRollTwo.append(random.randint(1,int(blemLibRollOne[1])))
  os.system("truncate -s 0 rolloutput.blemlib.txt")
  with open("rolloutput.blemlib.txt", "a") as blemLibOutput:
    print(blemLibRollTwo, file=blemLibOutput)
