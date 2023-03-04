---
title: SDL2 学习笔记 0：介绍及Windows开发环境配置
comment: true
cc: true
pinned: false
hidden: true
date: 2023-01-01 16:57:49
updated: 2023-01-13 16:57:49
summary: 采用Visual Studio
tags:
	- SDL2
	- 游戏开发
	- Visual Studio
	- Windows
---

# 介绍

SDL（即Simple DirectMedia Layer）是一个旨在通过OpenGL及Direct3D为音频、键盘、鼠标、摇杆和图形设备提供低层级访问的**跨平台**开发库。该库被用于视频播放器、模拟器和许多游戏中（比如饥荒的开发中就使用了SDL）。

SDL使用C语言编写，原生有C++的支持，同时有到[多种语言的绑定](https://www.libsdl.org/languages.php)

SDL2.0采用[zlib开源协议](https://www.libsdl.org/license.php)进行分发。

# 环境配置

SDL官方只提供了动态版本的Windows平台的预编译库，也就是说最后生成的程序必须有对应的动态链接库如`SDL2.dll`、`SDL2main.dll`才能运行。如果需要静态版本的链接库，则需自行手动编译。SDL仓库上有[一篇关于此问题的介绍](https://github.com/libsdl-org/SDL/blob/main/docs/README-dynapi.md)。

下面介绍使用动态链接库的配置方法。

首先，需要在[官方github仓库](https://github.com/libsdl-org/SDL/releases)下载VS中使用的SDL2本体。比如使用SDL2.26.2版本，则下载`SDL2-devel-2.26.2-VC.zip`（当然，若你使用`mingw`，则下载`SDL2-devel-2.26.2-mingw.zip`）。

然后将其解压到一个你喜欢的位置（可以不与项目本身在同一路径）。

在VS中，右键解决方案管理器中的项目并选择属性，选择“所有配置”，避免产生Debug和Release重复配置的麻烦。

在“配置属性>C/C++”中，选择“附加包含目录”，新建`[SDL路径]\include`项。

![](1.png)

在“配置属性>链接器>所有选项”中，首先选择“附加库目录”，新建`[SDL路径]\lib\[x64/x86]`项；然后选择“附加依赖项”，新增`SDL2.lib`及`SDL2main.lib`，最后将“子系统”更改为`窗口(/SUBSYSTEM:WINDOWS)`。

![](2.png)

![](3.png)

最后，将`[SDL路径]\lib`中的`dll`库复制到项目的根目录即可（最终分发时，也需要包含这几个`dll`才能正常运行）。

如需包含SDL2的其他第三方组件同理。
