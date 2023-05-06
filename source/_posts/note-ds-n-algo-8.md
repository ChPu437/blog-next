---
title: 数据结构与算法 课堂笔记 8：AVL树(AVL Tree)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-04-17 10:41:40
updated: 2023-04-17 10:41:40
summary:
tags:
---

# AVL Tree
* Named after Adelson-Velskii and Landis.
## Requirements
1. The difference in the heights between the two sub-trees of a node are **at most** $1$;
2. All of the sub-trees are AVL Tree.

> If multiple unbalanced nodes are found on one path, we only need to fixed the unbalanced condition of the **deepest** node to make all nodes on the path balanced.
## Implementation
### Basic Structure
```C++
struct Node
{
   Node(item x):data(x), height(1),
               lSon(NULL), rSon(NULL){}
   item data;
   int height;  // height of subtree rooted at this
                // node (maxDepth)
   Node* lSon;
   Node* rSon;
};

int h(Node* t){
   return t==NULL ? 0 : t->height;
}

int max(int x, int y){
   return x>=y ? x : y;
}
```
### Insertion
* Consider `insert(u)`: only nodes along the path from root to the point of insertion may be unbalanced.

We have 4 cases for insertion at subtree(u), where u is the deepest unbalanced node:
1. Insert on the left sub-tree of left-subtree(LL)
2. (LR)
3. (RL)
4. (RR)
<br><br>

For case $1$:
1. Rotate u's left son (name it as x) to where u at, and u now becomes x's right son.
2. make x's former right son as u's left son.

And for case $4$, just do reversely.
<br><br>
For case $2$:
1. Rotate u's left son (name it as x), make x's right son to where x at, and x now become its right son's left son.
2. Now, the condition trasformed to case $1$.

And for case $3$, do reversely.
<br><br>
**Caution**:
1. Not all insertion causes inbalance! No rotation is needed to perform when no inbalance occurs!
2. Remember to update `height` when rotation completes!
### Deletion
From bottom to top, fix all new occured inbalance using the same way as inserion.
(Every time an inbalance at the bottom fixed, it can cause a new inbalance at ancestor.)

## Complexity
### Insertion
Worst case: the only unbalanced node is the root.

This will force a check from the leaf to the top.

So the complexity is $O(h),\ h$ is the height of the AVL tree.

And since AVL tree is always maintained balanced, the complexity of a signle operation is opproximately $O(\log{n})$.
### Deletion
$O(\log n)$

Worst case $O(n)$
