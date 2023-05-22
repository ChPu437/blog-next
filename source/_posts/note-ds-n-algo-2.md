---
title: 数据结构与算法 课堂笔记 2：栈(Stack)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-06 09:49:02
updated: 2023-03-06 09:49:02
summary:
tags:
---
# Defination
Usually a **LIFO(last-in-first-out)** list.
# ADT
Value:\
	A sequence of items that belong to some data type `ITEM_TYPE`.

Operations for stack s:
1. **Boolean** `IsEmpty()`\
Postcondition: If the stack is empty, return true, otherwise return false
2. **Boolean** `IsFull()`\
Postcondition: If the stack is full, return true, otherwise return false
3. **ITEM_TYPE** `Pop() /*take away the top one and return its value*/` \
Precondition: s is not empty\
Postcondition: The top item in s is removed from the sequence and returned
4. **ITEM_TYPE** `top() /*return the top item’s value*/` \
Precondition: s is not empty\
Postcondition: The value of the top item in s is returned
5. **Void** `Push(ITEM_TYPE e) /*add one item on top of the stack*/` \
Precondition: s is not full\
Postcondition: e is added to the sequence as the top one

# Implementation
## Dynamic Array
### Memory Allocation
* Double `capacity` when $size = capacity$
* Half `capacity` when $size \le capacity / 4$
> Why $capacity / 4$ rather than $capacity / 2$?\
> Avoid repeated allocation of memory while operating insert/delete when$size = capacity$
### Copying
* Point to old memory
* Allocate new space to `data`
* Copy old value to `data`
* Delete old array
## Linked List
* Stack nodes link to the node beneath it
* The bottom of the stack always links to `nullptr`
# Application
* Maze
* Balancing symbols (e.g. bracket checker)
* Evaluation of postfix expression

Question:
Working principle of `delete[]`
(`delete[]` a array in middle will throw an error, probably a ub)
