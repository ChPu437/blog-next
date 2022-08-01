---
title: 安装AltStore于“Installing AltStore”无响应的一种原因
comment: true
cc: true
pinned: false
hidden: false
date: 2022-08-01 11:42:17
updated: 2022-08-01 11:42:17
summary: Windows害人不浅
tags:
	- iOS
	- iPadOS
	- Windows
	- AltStore
	- 解决方案
---

系统环境：Windows11 + iPadOS 15.6

如题，我尝试在iPad上安装AltStore时，前面的操作一切正常，但是直到开始安装时，提示了“Installing AltStore”后就再也没有反应了。

经过一系列实验与搜索，发现可能是因为我起了个**中文用户名**，导致进行某一步操作时**路径上带有中文**，然后锅了。

于是新建了一个**英文用户名**的账户重新操作，一切正常……

我猜测大概是Windows那个遗留的编码问题导致的。

由于关于AltStore的讨论大多发生在英文网站上，所以许多反应相同症状的人最后的解决方法并没有解决我的问题。

所以Linux或MacOS这些默认UTF-8编码的系统应该不存在这个问题，不过因为没有设备，我没有进一步测试。

微软这一步棋下错，遗留的问题影响了20多年……

希望有朝一日Windows也能全局默认UTF-8（逃