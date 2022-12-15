---
title: ncurses 学习笔记
comment: true
cc: true
pinned: false
hidden: false
date: 2022-11-23 20:12:59
updated: 2022-12-01
summary:
tags:
	- ncurses
	- c
	- c++
	- TUI
---

## 参考资料

1. [https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)

## 介绍

### Hello World！

## 函数

### 初始化

### 输入

### 输出

### 窗口

### 样式

#### 字体

#### 颜色

#### 边框

### 杂项

## Spinnets

### 调整终端大小时重绘

```C++
int ch; // 注意终端的输入是大于char的范围的
while (1) {
	ch = getch();
	if(ch = KEY_RESIZE) {
		/* 重绘 */
	}
}

```
