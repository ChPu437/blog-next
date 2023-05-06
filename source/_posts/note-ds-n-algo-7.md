---
title: 数据结构与算法 课堂笔记 7：二叉堆(Binary Heap)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-04-03 10:24:47
updated: 2023-04-03 10:24:47
summary:
tags:
---
# Defination
A non-empty binary tree is a min-heap if:
1. The key associated with the root is less than or equal to the keys associated with either of the sub-trees (if any).
2. Both of the sub-trees (if any) are also binary min-heaps.
> Examples of Binary Heap:
> * Leftish Heap
> * Skew Heap
# Operations
1. `top()`
2. `pop()`
3. `push()`
# Implementation
* `pop()`\
	To maintain the heap as a complete binary tree, we do as follow:
	1. Delete the top node.
	2. Put the last node (the node with the biggest index) to the root.
	3. Percolate the node down with the smallest of its new children.
		* Stop when both children are larger than it.
* `push()`\
	Put the new node as the child of an arbitrary node(e.g. a leaf node), then percolate it.

