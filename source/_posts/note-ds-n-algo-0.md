---
title: 数据结构与算法 课堂笔记 0：Abstract Data Type
comment: true
cc: true
pinned: false
hidden: true
date: 2023-02-27 09:49:39
updated: 2023-02-27 09:49:39
summary:
tags:
	- 笔记
	- ADT
	- 数据结构与算法
	- C++
---

# Abstract Data Type

> When one search for a tool, he needn't know how the tool have been implemented but only to know how to use and what he can get.

**ADT** is a package of the declarations of a data type and the operations that are meaningful to it.

We encapsulate the data type and the operations and hide them from the user.

That is to say, ADTs are **implementation independent**.

ADT consists:
1. Definition of values
	1. Definition
	2. Condition (optional)
2. Definition of operations
	1. Header (type and name of the function)
	2. Precondition (opt.)
	3. Postcondition

# Data Abstraction

Data abstraction is an important method is program design.

Algorithms can be designed in terms of the ADT.

(There should be a table of phase to solve a problem)

# Miscellaneous

## Passing Arguments

1. Pass by Value
```C++
int Square(int x);
```

2. Pass by Reference
```C++
int Square(int *x);
// actually, this one may create a new pointer variable
```
&nbsp;&nbsp; or
```C++
int Square(int &x);
```

Question: the security of `const &`?
