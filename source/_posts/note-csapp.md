---
title: 计算机系统导论 学习笔记
comment: false
cc: true
pinned: false
hidden: true
date: 2023-03-07 10:44:57
updated: 2023-03-07 10:44:57
summary:
tags:
---

浮点数的舍入：四舍五入，遇$0.5$向偶数取整

## READ/WRITE Operations
### Concept
* name
* value
### Operation
* **READ**(name)
* **WRITE**(name, value)
## Memory
### word size
x86 -> 4 byte\
x64 -> 8 byte\
sizeof(dword) = sizeof(word) * 2
word size -> address of virtual memory

字用于表示地址\
虚拟地址存放在寄存器中\
地址空间和内存容量并行发展

比如$32$位机的字长为$4$字节\
最大支持分配给单个程序的内存为 $2^{4 * 8} / 1024^3 = 4GB$\
而$64$位机能达到$2^{8*8} / 1024^3 = 17179869184GB$

* `fix this bug`

## 小端法和大端法
### 小端法
高位字节->低位地址空间
### 大端法
### 双端法？

系统按照数据类型确定读取的字节数
内存溢出的时候会发生截断
eg. int 0x123456789 在小端法系统里会被存储为 0x23456789

* 避免用有符号整形量存储指针（负数指针）

程序 -> 虚拟内存空间 -> 操作系统 -> 物理内存空间

程序运行时空间的分配

程序在操作系统中的存储？

多线程 -> 通信效率？


