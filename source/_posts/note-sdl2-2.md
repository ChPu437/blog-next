---
title: SDL2 学习笔记 2：窗口的创建与SDL2的初始化
comment: true
cc: true
pinned: false
hidden: true
date: 2023-03-16 08:08:07
updated: 2023-03-16 08:08:07
summary:
tags:
	- SDL2
	- 游戏开发
	- C++
---

## 初始化

SDL2采用了

那么，让我们回到上一次的Hello world代码。

观察代码，我们可以看到，在进入主函数时，我们首先执行了这一行代码：
```C++
if (SDL_Init(SDL_INIT_VIDEO | ))
```

## 创建窗口
