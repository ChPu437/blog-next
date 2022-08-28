---
title: 幻16 2022安装EndeavourOS(ArchLinux)指北
comment: true
cc: true
pinned: false
hidden: false
date: 2022-08-20 20:54:41
updated: 2022-08-28 19:08:00
summary: 一些遇到的问题和解决方案
tags:
	- Endeavour OS
	- Linux
	- 幻16
	- 笔记本
---

# 为什么装Endeavour OS

~~省事~~

主要是EndeavourOS比较接近上游（把Endeavour的源和软件一删就是ArchLinux），而且还自带安装器和安装n卡驱动的小脚本，只需在安装后做一些小配置，安装起来比较方便。

毕竟n卡驱动是出了名的臭，而且在Arch里格外难以配置~~林纳斯中指.jpg~~

# 安装配置的过程

## 安装中

使用安装器安装即可，桌面环境我选择的是KDE。

注意安装时**不要急着删除Windows11**，我们后面还得用下它。

## 安装后

### 卸载i卡驱动

由于i卡在Linux内核中本来就有驱动（`i915`），且实际操作中`xf86-video-intel`会导致KDE显示错误，影响正常使用，所以我们直接卸载这个安装时自动被选中的驱动然后开启`i915`即可。

注：如果你是直接安装的ArchLinux那么不要安装`xf86-video-intel`即可。

```shell
sudo pacman -Rsc xf86-video-intel
```

### 禁用n卡开源驱动

`nouveau`在幻16上会导致无法正常开机，所以需要禁用，然后直接使用英伟达提供的私有驱动。

在`/etc/modprobe/`下新建`blacklist-nouveau.conf`（或者其他你喜欢的名字），内容如下：

```shell
blacklist nouveau
options nouveau modeset=0
```

### 安装n卡闭源驱动

EndeavourOS为我们提供了脚本方便这一过程。
```shell
$ nvidia-inst -p # -p为同时安装nvidia-prime
```

### 开启核显165hz显示

这是一个很迷惑的问题。

首先我参考了[ArchLinuxWiki上指出的一种解决方案](https://unix.stackexchange.com/questions/680356/i915-driver-stuck-at-40hz-on-165hz-screen)，但是并没有生效。

然后我进行了以下操作：

1. 升级了Linux内核

2. 在Windows中用奥创中心开启了独显直连

3. 在Linux下将刷新率调整至165hz

4. 回到Windows关闭独显直连

5. 返回Linux

然后我就发现核显也出现165hz刷新率的选项了……

但是，由于这个问题本质是`i915`驱动没有及时更新导致的，加之我又升级了内核，我并不能确定2~5的操作一定是解决了问题。

如果有人安装后在关闭独显直连的状态下没有进行上述操作就发现核显支持165hz模式，烦请在评论区告诉我。

### 安装ROG控制中心以调节模式

我假设你已经成功安装了`paru`或其他的AUR helper。

只需在AUR上安装`rog-control-center`即可。

这玩意是`asusctl`的一个有GUI前端版本，所以不用困惑为啥它俩是冲突的。

最好把可选依赖的`acpi_call`也装上。

### 配置扬声器

应该是驱动的问题，安装后你会发现音量大小是无法控制的，而且在`alsa`中调节音量只会让声音在下面的低音喇叭和上面的高音喇叭之间移动。

在KDE中调整为四声道后，发现可以以分别调节每个声道的音量的方式来间接控制低音和高音喇叭的音量，但是不好使（音量调到最低或最高后几个声道的音量又会一致，导致实际播放音量不受控）

参考[Github上的幻14安装ArchLinux教程](https://github.com/asus-zephyrus/archinstall#fixing-audio-on-linux)，我安装了`easyeffect`，然后发现只要在其启动后把输出源切换至`Easyeffect Sink`就可以正常控制音量。

所以，临时的解决方案是把这玩意当作后台服务开机启动即可（上面那篇文章有讲）。