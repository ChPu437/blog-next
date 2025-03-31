---
title: 编译imx8mp的yocto项目错误记录
comment: false
cc: true
pinned: false
hidden: false
date: 2025-03-17 14:56:26
updated: 2025-03-17 14:56:26
summary:
tags:
---

1. 使用bitbake时，出现访问权限问题
    * `sudo apparmor_parser -R /etc/apparmor.d/unprivileged_userns`
2. 编译libxcrypto时失败
    * https://lists.openembedded.org/g/openembedded-core/topic/kirkstone_patch_libxcrypt/100370051
3. 编译vulkan-loader时出现错误
    * 远程仓库头偏移，将master设置为main
4. 编译opengl时出现错误
    * 虚拟机内存不足，增加虚拟机内存至16g