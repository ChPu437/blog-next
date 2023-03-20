---
title: 数据结构与算法 课堂笔记 5：哈希(Hash)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-20 09:50:21
updated: 2023-03-20 09:50:21
summary:
tags:
---
### A good hash function:
Fast computation, minimal collision.
## Collision Resolution
### Open Addressing
*General rule:* If collide, try other slots in a certain order.
#### Linear Probing
* If collide, try `slot_id + 1`,...
#### Quadratic Probing
* Try `slot_id + 1^2`,...
#### Double Hashing
* Try `slot_id + hash_2(x)`,...
### Separate Chaining
* Use linked list to link collided item.

## Rehashing
* When half full, rehash all the elements into a double-sized table
* $O(n)$

## Application
* Dictionary\
To establish a link from character to number.\
e.g. $A \rightarrow 055$\
Then hashing a word is actually hashing all the keys.

Question: Perfect Hashing
