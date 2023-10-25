---
title: note-icspa
comment: false
cc: true
pinned: false
hidden: false
date: 2023-09-24 13:15:51
updated: 2023-09-24 13:15:51
summary:
tags:
---

`monitor`负责将客户程序读入客户计算机。

`init_monitor()`

`init_isa()`：
    * 将内置客户程序读入内存
        * 用`uint8_t`模拟内存地址
        * 读入位置：`RESET_VECTOR`（于`nemu/include/memory/paddr.h`）
    * 初始化寄存器
        * `restart()`
        * 用结构体`CPU_state`模拟寄存器（于`nemu/src/isa/$ISA/include/isa-def.h`）
        * 在`nemu/src/cpu/cpu-exec.c`定义全局变量`cpu`保存寄存器
        > x86的物理内存是从0开始编址的, 但对于一些ISA来说却不是这样, 例如mips32和riscv32的物理地址均`0x80000000`开始. 因此对于mips32和riscv32, 其`CONFIG_MBASE`将会被定义成`0x80000000`. 将来CPU访问内存时, 我们会将CPU将要访问的内存地址映射到pmem中的相应偏移位置, 这是通过`nemu/src/memory/paddr.c`中的`guest_to_host()`函数实现的. 例如如果mips32的CPU打算访问内存地址`0x80000000`, 我们会让它最终访问`pmem[0]`, 从而可以正确访问客户程序的第一条指令. 这种机制有一个专门的名字, 叫地址映射

* 在`cmd_c()`函数中, 调用`cpu_exec()`的时候传入了参数`-1`, 你知道这是什么意思吗?
`cpu_exec()`支持的参数是64位无符号整型，其将这一参数再传递给`execute()`函数，表示最大可运行的指令数，这里给一个极大值（有符号强制转换无符号）用以表示我们不断运行指令直到客户程序结束。

* 优美地退出
退出时发生错误的原因：
`nemu-main.c`中主函数退出时返回`is_exit_status_bad()`（定义于`src/utils/state.c`）检测的返回状态是否正常的值，当`nemu_state.state`为`NEMU_END`（客户程序程序正常结束）且`nemu_state.halt_ret`为假（不是因为断电返回）时，或`nemu_state.state`为为`NEMU_QUIT`时才会返回`0`，而`src/monitor/sdb/sdb.c`中在`q`退出NEMU时没有重设`nemu_state.state`，故被视为异常退出。
解决方式：
在`cmd_q()`函数中加入一行`nemu_state.state = NEMU_QUIT;`。

* 关于内置客户程序运行后`x 1 0x80000000`输出`0x0`
单步运行到这里打印内存没有问题，怀疑是后面覆盖掉了这个内存
第一句语句`lui t0 524288`524288转换为16进制是80000，lui将这个数加载到寄存器t0的高位（末位为0不变）
第二句语句`sw zero 0(t0)`将零寄存器（自然是全零）的值保存到`0(t0)`（计算后为`0x80000000`）

* `wp_pool`为什么加`static`
本地化变量，防止外部的意外访问/修改

# RISC-V ISA
* 如何解决立即数的位数问题
通过`lui`（在高20位存数）和`addi`（在低12位做加法）两条指令同时运用，我们可以表示32位下的任意数字。

* 静态指令和动态指令
在程序分析领域中, 静态指令是指程序代码中的指令, 动态指令是指程序运行过程中的指令. 例如对于以下指令序列
```
100: jmp 102
101: add
102: xor
```
`jmp`指令的下一条静态指令是`add`指令, 而下一条动态指令则是`xor`指令.

`SEXT`：对立即数进行符号扩展，故一般只在最高位出现的部分使用
