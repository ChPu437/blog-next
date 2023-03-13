---
title: 数据结构与算法 课堂笔记 3：算法复杂度(Program Complexities)
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-13 09:48:07
updated: 2023-03-13 09:48:07
summary:
tags:
---

## Asymptotic Analysis
### Worst case Analysis
* Gives us a gurantee about the upper bound
* In some cases, worst case occurs fairly often
### Average case Analysis
* Often as bad as worst case
### Best case Analysis
* Always happens on certain input
* Good only for showing bad lower bound

## Asymptotic Notation
### $O$-notation
* Provides an asymptotic upper bound of a function
* For a given function $g(n)$, we denote $Ο(g(n))$ (pronounced “big-oh” of $g$ of $n$) by the set of functions:
$$
Ο(g(n)) = \left\{f(n)\ |\ \exist c,\ n_0 \gt 0,\ 0 \le f(n) \le cg(n),\ \forall n \ge n_0\right\}
$$
### $\Omega$-notation
* Provides an asymptotic lower bound of a function
$$
\Omega(g(n)) = \left\{f(n)\ |\ \exist c,\ n_0 \gt 0,\ 0 \le cg(n) \le f(n),\ \forall n \ge n_0\right\}
$$
### $\Theta$-notation
* Provides an asymptotic tight bound of a function
$$
\Theta(g(n)) = \left\{f(n)\ |\ \exist c_1,\ c_2,\ n_0 \gt 0,\ 0 \le c_1g(n) \le f(n) \le c_2g(n),\ \forall n \ge n_0\right\}
$$

> Tip: $O$ and $o$ \
> $f(n) \le cg(n) \rightarrow f(n) \lt cg(n)$

## Calculating
Typically, we do like this when calculating asymptotic running time:
* Drop low-order terms
* Ignore leading constants

e.g.&nbsp;&nbsp;$T(n) = An^2 + Bn + C = O(n^2)$

