---
title: 数据结构与算法 课堂笔记 6：树(Tree)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-27 09:50:37
updated: 2023-04-03 09:50:37
summary:
tags:
---
# Definations
## Degree
Number of subtrees of a node
* In graph theory, degree also includes its parent
## Leaf
A node of zero degree
## Branch node
non-terminal node (**Caution**: also include root when the size of the tree greater than 1!)
## Path
1. Direction: from parent to child
2. Length: edge count of the path
## Height
The maximum level(depth) of the tree

# Binary Tree
## Complete Binary Tree
1. Except the bottom level, all levels are full-filled
2. The index of the nodes are continous from $1$ to $n$
* Distinguish it from full binary tree
## Array Representation
* Just as what we have used in segment tree.

When index starts from zero, we get:
1. $LeftSon(i) = i * 2 + 1$
2. $RightSon(i) = i * 2 + 2$
3. $Parent(i) = \lfloor\frac{i - 1}{2}\rfloor$
4. If $i$ is odd, it is a left child node.
## Linked List Representation
* Use linked list to store data and pointer to both child.
## Traversing
A binary tree can be reconstructed when given its inoreder and preorder/postorder sequence. **However**, this cannot be done when given preorder and postorder sequence.

# Binary Search Tree
Take the first value inputted as the root.\
Then, for all the value left, do as follow from the root:
1. If it is smaller than current node, compare it with current node's left child son
2. If it is greater than current node, compare it with current node's right child son
3. Repeat 1 and 2 till we come to the leaf and insert the value as a child of the leaf, or we find the node with the same value.
## Deleting a Node
* **Case 1**: leaf node\
	just delete it
* **Case 2**: node with a child\
	delete the node and link its child directly to its parent
* **Case 3**: node with 2 children\
	delete the node, and rotate its closest succeessor (or precessor)to its parent, then link another subtree to that node.

# Balanced Binary Tree
For the worst case of the previous algorithm, when the values are sorted, it will form a link and the complexity can be up to $n^2$.

# Application
## Sorting an Array with BST
* For the same reason as above, the complexity can be up to $O(n^2)$.
## Merge Two BSTs
### Solution 1
1. Apply inorder to each BST to get two sorted arrays.
2. Merge them into a bigger array like two-way merge sorting.

Complexity:\
&nbsp;&nbsp;Time: $O(N + M)$\
&nbsp;&nbsp;Space: $O(N + M + (N + M))$
### Solution 2
Idea:
1. Any element on the left side of the root is always smaller than the
root.
2. To merge the two tree nodes, we can compare the two nodes of both the trees while adding into the result array simultaneously.
3. The comparisons that will be required to construct the result array will only be from those nodes which lie in the path from the root to the current node.
4. We can create two stacks for each tree and will maintain the
stack as the smallest element on the top.
* Monotonic Stack
1. Create two stacks, `stack1` and `stack2`
2. Iterate until `tree1` is not `NULL` or `tree2` is not `NULL` or `stack1` is not empty or `stack2` is not empty.
3. For each iteration:
	1. Push all the left nodes of `tree1` inside `stack1`
	2. Push all the left nodes of `tree2` inside `stack2`
	3. Compare the top of both the stacks, put the smaller one in the result while popping it out from the respective stack and move to its right child

Complexity:\
&nbsp;&nbsp;Time: $O(N + M)$\
&nbsp;&nbsp;Space: $O(N + M + HeightOf(Tree1) + HeightOf(Tree2))$

