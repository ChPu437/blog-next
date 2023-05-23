---
title: note-ds-n-algo-12 advanced data structure
comment: false
cc: true
pinned: false
hidden: true
date: 2023-05-22 09:59:37
updated: 2023-05-22 09:59:37
summary:
tags:
---
# Red-Black Tree
## Pre-Defination
Null path: a path in binary tree from root that the last node is node full node
## Rules of RB Trees
1. Root must be black.
2. If a node is red, its children must be black.
3. Each null path must have the same number of black nodes.
> Theorem:
> 1. Every red node must be either:
>	* A full node (with two black children), or
>	* A leaf node
> 2. If a node P has exactly one child:
>	* The one child must be red
>	* The one child must be a leaf node, and
>	* That node P must be black

# Multiway Search Tree (3-Way Tree As Example)

# B+ Tree
## Use Scenario
* Hard drive accesses are slow
* Reduce the number of accesses to hard drives as much as possible
