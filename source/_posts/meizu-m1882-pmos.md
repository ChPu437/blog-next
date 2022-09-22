---
title: 尝试在魅族16th移植PostmarketOS
comment: true
cc: true
pinned: false
hidden: false
date: 2022-06-21 17:26:22
updated: 2022-09-22 19:50:00
summary: 进展和遇到的一些坑
tags:
  - 手机
  - 骁龙845
  - Linux
  - 折腾
---

# 前言

很早以前就想尝试在手机上运行完全体的Linux了，曾经尝试过使用Linux Deploy等基于`chroot`的App，但是都满足不了我的需求。

跑一个真正完整的Linux发行版才是Linux用户的浪漫(逃)

然后误打误撞的就找到了[PostmarketOS](https://postmarketos.org/)这个项目，它是一个致力为移动产品提供一个基于Alpine Linux的系统的项目。

虽然对我经常使用ArchLinux，但是对Linux内核本身并不怎么了解，至于嵌入式和移动平台的Linux移植更是一窍不通。

但是，巧就巧在，魅族16上使用的骁龙845是有`mainline-linux`支持的 XD，同时得益于PostmarketOS活跃和庞大的社区，我成功在我的小16上启动了主线Linux内核并进入了PostmarketOS的rootfs。

（注：以下内容可以看作是[这篇维基](https://wiki.postmarketos.org/wiki/Meizu_16th_(meizu-m1882))以及[SDM845 Mianlining Guide](https://wiki.postmarketos.org/wiki/SDM845_Mainlining)的翻译）

# 状态

## 当前进展

可以启动Linux内核并生成一个framebuffer。

## 已知问题

1. 除了屏幕（仅显示）和电源键，你能想到的一切外围设备都用不了。
2. SoC上的所有协处理器和GPU都无法使用。
3. 生成的framebuffer刷新率很低，肉眼估计一秒只有1帧。

以上三个问题的产生大概都是因为我不会写dts以及没有安装合适的驱动，希望有大佬能来关照关照这个项目QwQ

# 安装方法

## 开发环境配置

PostmarketOS的开发环境配置具体参照[PostmarketOS官方Wiki(英文)](https://wiki.postmarketos.org/wiki/Porting_to_a_new_device)，直至"Kernel package一节"[^1]。

除此之外，还需要在本地机上安装交叉编译器，如Ubuntu中包名为`aarch64-linux-gnu-gcc`。

## 主线内核编译


### 克隆内核

```bash
cd $HOME
mkdir -p pmos && cd pmos
git clone https://gitlab.com/sdm845-mainline/pmtools tools # 一些工具脚本
git clone https://gitlab.com/sdm845-mainline/linux linux # Linux内核
```

### 创建dts

```bash
cd $HOME/pmos/linux/
cd arch/arm64/boot/dts/qcom/

```

# 相关链接

WIP

[^1]: 选择手机型号时选择`oneplus-fajita`(一加6t)即可。此处只是用来构建`initramfs`和`rootfs`，目前状况下没啥大影响。