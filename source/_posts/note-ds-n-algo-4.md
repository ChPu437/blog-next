---
title: 数据结构与算法 课堂笔记 4：队列(Queue)和优先队列(Priority Queue)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-20 09:50:18
updated: 2023-03-20 09:50:18
summary:
tags:
---
# Defination
* Queue is a list with the restriction that insertions are performed at one end and deletions are performed at the other end of the list
* Also known as: First-in-first-out (**FIFO**) list

# ADT
Value:\
A sequence of items that belong to some data type `ITEM_TYPE`.

Operations of Queue q:
1. **Boolean** `IsEmpty()`\
Postcondition: If the queue is empty, return true, otherwise return false
2. **Boolean** `IsFull()`\
Postcondition: If the queue is full, return true, otherwise return false
3. **ITEM_TYPE** `Dequeue() /*take out the front one and return its value*/`\
Precondition: q is not empty\
Postcondition: The front item in q is removed from the sequence and returned
4. **Void** `Enqueue(ITEM_TYPE e) /*to append one item to the rear of the queue*/`\
Precondition: q is not full\
Postcondition: e is added to the sequence as the rear one

# Implementation
## Array
Use circulated array to minify allocating times, thus improving efficiency.
**Caution:** When using array circulated-ly, make sure `rear` pointer doesn't catch with `front`! In that case, `isEmpty()` will return `true`!
### Copying When `rear` $\lt$ `front` (2 Ways)
1. Move `front` to `size - 1` first, then copy `0` to `rear`
2. Copy `0` to `rear` as before, then copy `front` to `size - 1` to the end of the new array
## Linked List

# Application
* BFS (Breadth-first Search)
* Round Robin Schedule

# Priority Queue
* The elements in a stack or a FIFO queue are ordered based on thesequence in which they have been inserted.
* In a priority queue, the sequence in which elements are removed isbased on the priority of the elements.
