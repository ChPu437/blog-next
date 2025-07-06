---
title: Windows下的Jekyll安装指南
comment: true
cc: true
pinned: false
hidden: false
date: 2025-07-06 00:49:03
updated: 2025-07-06 00:49:03
summary:
tags:
  - Windows
  - Jekyll
  - Ruby
---

> 注: 本文大致参考了[来自walterlv的这篇博文](https://blog.walterlv.com/post/setup-jekyll-in-windows.html), 在此致谢.

## 前置依赖

为了使用Jekyll，你需要先安装如下软件：

* Ruby，[官网下载链接](https://rubyinstaller.org/downloads/)，选择有DevKit的推荐版本（有箭头指明并标粗）即可。
* MSYS2，[清华源下载链接](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.exe)
  > 这是因为Ruby在Windows下的安装依赖MSYS2，虽然后续用到的RubyInstaller会自动尝试安装MSYS2，但是其网络要求比较高，这里我们先自行通过镜像站安装，可以减小后面的时间成本。

## 安装过程

### 安装前置依赖

下载Ruby和MSYS2的安装包后，先将这两个包全部安装。之后，在安装Ruby时，应该会弹出一个类似下面的窗口：

![RubyInstaller](https://blog.walterlv.com/static/posts/2018-03-04-12-14-41.png)

如果没有弹出，我们随后自行打开一个powershell窗口（如果是全局安装Ruby，请以管理员权限打开powershell），输入`ridk install`，亦可进入该界面。

在这个界面中，选择`3`，回车。

如果前面没有安装MSYS2，这里可能会因为网络问题导致下载非常之慢……

安装成功之后，请继续阅读下一节。

### 安装Jekyll

再打开一个新的powershell窗口（同样，如果是全局安装Ruby，请以管理员权限打开powershell），输入以下命令：

`gem install jekyll bundler`

安装成功之后，请继续阅读下一节。

## 测试使用

再打开一个新的powershell窗口（**不需要**管理员权限），切换到Jekyll站点根目录。如果是第一次使用，需要先下载项目依赖。输入：

`bundle install`

安装依赖之后，输入以下命令启动Jekyll站点：

`bundle exec jekyll serve`

如果没有产生错误，安装就完成了🎉

## Ruby跨版本升级问题

这里请参考[walterlv的原文](https://blog.walterlv.com/post/setup-jekyll-in-windows.html#ruby-%E8%B7%A8%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7%E7%9A%84%E5%9D%91)。