---
title: 数据结构与算法 课堂笔记 9：伸展树(Splay Tree)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-04-24 09:47:21
updated: 2023-04-24 09:47:21
summary:
tags:
---
# Features
* Blind adjusting version of AVL trees
* Amortized time for all operations is $O(\log n)$
	* Worst case $O(n)$
* Runs faster than AVL tree due to the "locality" of program (程序的局部性)
# Principle
Force update the nodes in path while accessing, rather than do that when finding inbalance.
# Operations
## Splay
You'll need to splay from the node you accessed all the way to the root.
### Cases
Node being accessed is:
1. Root\
	Do nothing.
2. Child of root (gets only parent)\
	Rotate once:
	1. When accessing the left son, rotate right.
	2. When accessing the right son, rotate left.
3. Have parent and grand-parent\
	When accessing LR/RL grandchild, rotate **down-top twice** like AVL LR/RL (Zig-Zag)\
	When accessing LL/RR grandchild, rotate **top-down twice** like AVL LL/RR (Zig-**Zig**)\
	E.g. for node $g\rightarrow p\rightarrow n$\
	When accessing node $n$, first rotate $g$ and $p$, then rotate $p$ and $n$.
* All the rotation here occurs regardless of the depth(we don't care about that)
* If you cannot remember which direction to rotate, just treat unimportant subtrees as node, and try to rotate to the more balanced direction.

## Splitting
`Split(T, x)` Split $T$ into two non-intersect parts $L$ and $R$ ($x$ may be not in $T$), and nodes in $L$ are less than $x$, nodes in $R$ are greater than $x$.
* We can splay the requied node to the root to do a split.

## Insert
Split the tree into two parts and make $x$ as the new root and $L$ $R$ as its child.

## Delete
Splay the required node to the root and delete it (can be done using split), then join the two subtrees left.
