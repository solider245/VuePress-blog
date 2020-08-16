---
title : 如何在Python中实现树？
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-17 05:59:57 +0800
categories:
 -
tags:
 -
---
[[toc]]

## 原始問題

>我正在尝试构建通用树。

>Python中是否有任何内置数据结构可以实现它？

## 最佳答案

## 任意树

我推荐 [https://pypi.python.org/pypi/anytree](https://pypi.python.org/pypi/anytree) （我是作者）

### 例

```py
from anytree import Node, RenderTree

udo = Node("Udo")
marc = Node("Marc", parent=udo)
lian = Node("Lian", parent=marc)
dan = Node("Dan", parent=udo)
jet = Node("Jet", parent=dan)
jan = Node("Jan", parent=dan)
joe = Node("Joe", parent=dan)

print(udo)
Node('/Udo')
print(joe)
Node('/Udo/Dan/Joe')

for pre, fill, node in RenderTree(udo):
    print("%s%s" % (pre, node.name))
Udo
├── Marc
│   └── Lian
└── Dan
    ├── Jet
    ├── Jan
    └── Joe

print(dan.children)
(Node('/Udo/Dan/Jet'), Node('/Udo/Dan/Jan'), Node('/Udo/Dan/Joe'))
```

### 特征

[anytree](http://anytree.readthedocs.io/en/latest/) 还具有强大的API，具有：

*   简单的树创建
*   简单的树修改
*   预序树迭代
*   后树迭代
*   解析相对和绝对节点路径
*   从一个节点到另一个节点。
*   树渲染（请参见上面的示例）
*   节点附加/分离联播

```
⏭ If you are still in a hurry and or don't care about implementing your own Python data tree from scratch you can skip the following section.
```

实施艰难的道路：从头开始
------------

让我们首先处理递归问题，即我的意思是，一棵树可以通过在根以下的任何级别添加节点来生长，让我们首先生长之前的一棵树，以了解需要的东西：

```
**\# Dictionary (once more this is a forest of 3 trees:)**Families = {  
            'Peter':  
                   {'Paul':{'Dog','Toucan'} ,  
                    'Patty': {'Turtle'}},  
            'Jim':  
                   {'Tommy':{'Hamster'},  
                    'Timmy':{'Hamster'},  
                    'Tammy':{'Hamster'}},  
            'Carlos':  
                   {'Diego':'Cat','Ferret','Fox'}}  
            }**for Parent, Children in Families.items():**  
        print(f"{Parent} has {len(Children)} kid(s):" )  
        print(f" {', and '.join(\[str(Child) for Child in \[\*Children\]\])}")  
 **for Child, pets in Children.items():**  
            print(f"  {Child} has {len(pets)} pet(s):")  
            print(f"    {', and '.join(\[str(pet) for pet in \[\*pets\]\])}")**OUTPUT:**Peter has 2 kid(s):  
 Paul, and Patty  
  Paul has 2 pet(s):  
    Dog, and Toucan  
  Patty has 1 pet(s):  
    Turtle  
Jim has 3 kid(s):  
 Tommy, and Timmy, and Tammy  
  Tommy has 1 pet(s):  
    Hamster  
  Timmy has 1 pet(s):  
    Hamster  
  Tammy has 1 pet(s):  
    Hamster  
Carlos has 1 kid(s):  
 Diego  
  Diego has 3 pet(s):  
    Cat, and Fox, and Ferret
```

级别问题的一种解决方案是嵌套更多词典或列表，并添加相同数量的循环以读取所述词典，我们将尽快实现该过程的自动化，但是您可能想知道我们如何在树上进行操作，即我们可以在任何级别添加或删除内容：

```
  
**\- Removing (**Let's say a Hamster pandemic hit Jim's house and Diego's Fox escaped ):**\# Within a loop:**for Parent, Children in Families.items():  
    for Child, pets in Children.items():  
        for pet in pets:  
 **if pet == 'Hamster':**  
 **Families\[Parent\]\[Child\] = {}****\# Directly Updating:****Families\['Carlos'\]\['Diego'\]**  =  {'Cat','Ferret'}**\- Addition can work in the same way:** Families\[Parent\]\[Child\] = {'Snake'}  
Families\['Carlos'\]\['Diego'\]  =  {'Cat','Ferret', 'Fox'}You could also use any other Dictionary or iterable method to suit your needs, if for instance you wanted to delete whole branch or family tree:del Families\['Peter'\] \['Paul’\]  
_#or_  
del Families\['Peter’\]
```

现在开始将所有内容移入类以供重用：

```
"""Barebones minimal general Tree & Node, using lists, but can also use dictionaries if you need key value pairs"""**class Tree():**  
    def \_\_init\_\_(self,root):  
        self.root = root  
        self.children = \[\]  
    def addNode(self,obj):  
        self.children.append(obj)**class Node():**  
    def \_\_init\_\_(self, data):  
        self.data = data  
        self.children = \[\]  
    def addNode(self,obj):  
        self.children.append(obj)**USAGE:**FunCorp =  Tree('Head Honcho') **\# Create a tree and add root data.**  
print(FunCorp.root) **\# ask the Tree for it's root.**\>> Head Honcho**\# Add children to root:**FunCorp.addNode(Node('VP of Stuff'))  
FunCorp.addNode(Node('VP of Shenanigans'))  
FunCorp.addNode(Node('VP of Hootenanny'))**\# Get children of root:**print(f'C suite: {", ".join(str(child.data) for child in FunCorp.children)}')\>> C suite: VP of Stuff, VP of Shenanigans, VP of Hootenanny\# **Add Node to the first child of the Tree:**FunCorp.children\[0\].addNode(Node('General manager of Fun'))**\# Get the first child of the first child of the Tree:**print(f'The position under {FunCorp.children\[0\].data} is: {FunCorp.children\[0\].children\[0\].data}')\>> The position under VP of Stuff is: General manager of Fun
```

这是一个最小的实现，您需要向树或节点类添加方法以使其更加用户友好或实现特定功能，可以用作其他功能模板的此类功能之一是向树询问所有它是节点：

```
"""Barebones general Tree & Node"""  
class Tree():  
    def \_\_init\_\_(self,root):  
        self.root = root  
        self.children = \[\]  
 **self.Nodes = \[\]**  
    def addNode(self,obj):  
        self.children.append(obj) **def getAllNodes(self):  
        self.Nodes.append(self.root)  
        for child in self.children:  
            self.Nodes.append(child.data)  
        for child in self.children:  
            if child.getChildNodes(self.Nodes) != None:  
                child.getChildNodes(self.Nodes)  
        print(\*self.Nodes, sep = "\\n")  
        print('Tree Size:' + str(len(self.Nodes)))**class Node():  
    def \_\_init\_\_(self, data):  
        self.data = data  
        self.children = \[\]  
    def addNode(self,obj):  
        self.children.append(obj)  
 **def getChildNodes(self,Tree):  
        for child in self.children:  
            if child.children:  
                child.getChildNodes(Tree)  
                Tree.append(child.data)  
            else:  
                Tree.append(child.data)**\# Add a bunch of nodesFunCorp =  Tree('Head Honcho')  
FunCorp.addNode(Node('VP of Stuff'))  
FunCorp.addNode(Node('VP of Shenanigans'))  
FunCorp.addNode(Node('VP of Hootenanny'))  
FunCorp.children\[0\].addNode(Node('General manager of Fun'))  
FunCorp.children\[1\].addNode(Node('General manager Shindings'))  
FunCorp.children\[0\].children\[0\].addNode(Node('Sub manager of Fun'))  
FunCorp.children\[0\].children\[0\].children\[0\].addNode(Node('Employee of the month'))\# Get all nodes (unordered):  
**FunCorp.getAllNodes()**\>>  
Head Honcho  
VP of Stuff  
VP of Shenanigans  
VP of Hootenanny  
Employee of the month  
Sub manager of Fun  
General manager of Fun  
General manager Shindings  
Tree Size:8
```

当然，您可以添加或微调更多方法（_例如_，_对键值对进行排序和添加_）以及从头开始实现树的方法（_请参阅此以获取更多想法_）：

[

如何在Python中实现树？
--------------

### 我正在尝试构建通用树。Python中是否有任何内置数据结构可以实现它？

#### stackoverflow.com



](https://stackoverflow.com/questions/2358045/how-can-i-implement-a-tree-in-python)