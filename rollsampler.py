import random, os
def roll(dice):
  b=[]
  b=[]
  for i in dice.split('d'): 
    a.append(i)
  for i in range(int(a[0])):
    b.append(random.randint(1,int(a[1])))
  os.system("truncate -s 0 output.txt")
  with open("output.txt", "a") as c:
    print(b, file=c)
