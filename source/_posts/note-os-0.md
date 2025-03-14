---
title: 操作系统 课堂笔记
comment: false
cc: true
pinned: false
hidden: false
date: 2024-02-19 13:54:56
updated: 2024-02-26 3:54:56
summary:
tags:
    - 笔记
    - 计算机科学
    - 操作系统
    - 大学课程
---

> 中间有一段时间在搞ICSPA，笔记会有些空缺

Operating systems are **interupt driven**

---

DMA: one intr triggered per block rather than per byte
    * Used for hi-speed device. e.g. network interface.
    * No DMA between hard disk and memory since the former one is rather slow.

---

Computer organization: the physical components
Computer architechture: 

---

Asymmetric multiprocessing: each processor is assigned to a specific task.
Symmetric multiprocessing: each processor performs all tasks.

---

(strong? refer to slides)coupled system:
    * Always on one board
    * High performance.

Loosely-coupled systems:
    * Usually sharing storage via SAN(storage area network)
    * High availability when system failure

--- 

Process: a program in execution.

Diagram of Process State [pdf03, 14]
No "new" state in modern systems:
    * Long-term scheduling during new state to ready state.
    * No long-term scheduling in modern systems.
    * Some linux system will "use" new state to do sth else, not strictly a new state.

short-term sched: Ready->Running-> CPU<->OS
mid-term sched: Swapped out->Swapped in
* all happen in kernel, **not** user space

--- 

Process list

Process control block (PCB) -> Context

--- 

Protection->Dual mode and syscall

Time Sharing->Context switch

---

interrupt: user register -> kernel stack, implicitly saved by hardware

OS switch: kernel register -> PCB (Explicitly saved by OS, somewhere in memory)

--- 

Fork: Refer to *CSAPP note*.

PID is stored somewhere in PCB.

`exec()` returns in somewhere in the program executed.
    * All the resource being used by caller will be transferred to callee.

`abort()` call stops a child process.

zombie: no parent is waiting
orphan: parent terminated w/o invoking `wait()`

--- 

Interprocess communication:
    * message-passing model
        * managed by kernel
        * communicate through exchanging messages
    * shared-memory model
        * managed by user
        * processes involved in communication uses a shared memory space
        * r/w to the shared space to communicate

---

Message passing:

Direct communication:
    * Symmetric: `send(P, message)` `receive(Q, message)`
    * Asymmetric: `send(P, message)` `receive(id, message)` -> receive message from any process
Indirect communication:
    * process P -> "mailbox" A -> process Q

Blocking: synchronous
Non-blocking: asynchronous
    * Rendezvous: **both** send and revceive are **blocking**

---
    
Socket

Remote Procedure Call(RPC)

Pipes

---

Thread

Parallelism: A system can perform more than one task simulately
Concurrency: More than one process can make progress in the same time

`pthread_create()`
`pthread_join()`

Kernel Threads
User Threads

---

* *Gantt Chart*

## Common Scheduling Criteria
CPU utilization
Throughput
Turnaround time
Waiting time -> waiting in **ready** queue
* Response time -> to user waiting for interaction

## Simple Scheduling Algorithms
1. FCFS (First Come, First Served), or FIFO
    * Convoy effect
2. SJF (Shortest Job First)
    * A special case of general **priority-scheduling** algorithm.
    * Minimium number indicates the highest priority in common.
    * Starvation
        * Solution: Aging -> increase priority as time porgresses.
3. HRRN (Highest Response Ratio Next)
    $response_ratio =  1 + \frac{waiting_time}{estimated_run_time}$
4. Preemptive SJF (or Shortest Time-to-Completion First, STCF, SRTF)
    * Bad in response time.
5. RR (Round-Robin)
    * Runs a job for a time slice (sometimes called a scheduling quantum) and then switches to the next job in the running queue.
    * Good in response time, but poor in performance.
    * Costly in context switch.

* Incorporating I/O

Real-world situation:
1. Not gaining perfect knowledge about the process.
    * Make prediction about the length of incoming CPU burst.
2. Tradeoff between performance and fairness.
    * Hybird scheduling algorithm, divide jobs into different queue (e.g., foreground and background)
    * Different queue may have different goal, e.g., foreground jobs needs more fairness so can use algorithm like RR.
    * Then we need another scheme to scheduling between the queues.

* Multilevel Feedback Queue (MLFQ)
    * Optimize turnaround time
    * Minimize response time
    Start from MLQ:
        * Rules:
        1. P(A) > P(B), A runs.
        2. P(A) == P(B), runs in round-robin.
    For MLFQ: priority can be changed over time.
    For new coming job in MLFQ: highest priority, since it can never be runnned if its priority is lower than current job.

## More Scheduling Algorithm
1. Lottery Scheduling
    Proportional-share: try guarantee each job can obtain a certain proportion of CPU time.
    * This will cause waste when one job does nothing in its execution time.
    So we hold a lottery to determine which process should run next:
    *(Refer to page 5, slide Chapter_5_contd)*
    * No global state
2. Stride Scheduling
    Run the job with lowest progress first, the time period is its stride value.
    * Drawback: if one process starts after some jobs have run for a period of time, it will stuck the scheduler for a long time.
3. Thread Scheduling
    *(Refer to page 11, slide Chapter_5_contd)*
4. Multiple-Processor Scheduling
    *(Refer to page 13, slide Chapter_5_contd)*
5. Real-Time CPU Schdeduling
    *(Refer to page 18, slide Chapter_5_contd)*

---

# Process Synchronization

# Mutex

# Condition Variables

---

# Main Memory

## Fragmentation

internal fragmentation vs. external fragmentation

internal: 分配给当前进程但是没有用完，其他进程也无法使用（在heap和stack之间）

external: 分配时有空闲空间，但是无法使用

## Segmentation (分段)

## Translation Lookaside Buffer (TLB)

### issue with context switch
To support context switch:
method#1: flush the TLB every context switch (can be poor in performance and wasting in space)
method#2: use an address space identifier(ASID) to indicate which process every entry belongs to in the entries of TLB.

### Shared Pages

in some cases a single physical page can be shared between processes to refer to different virtual address

### TLB Replacement Policy

TBD in futrue course

### Effective Access Time (EAT)

Slide08, Page45 (not covered in exam)

### Page Size Issue

we need small/large page to tackle with:
* fragmentation (small page)
* table size/page faults (large page)
* I/O overhead (large page)
* locality/resolution (small page)
* TLB reach/TLB size(large page)

## Hybird Paging (segmentation and paging)

## Muilt-level Paging

Advantages:
1. Lower space consumption
2. Easier to manage memory when carefully constructed

Disadvantages:
1. Time-space trade off
2. Complexity

## Hashed Page Tables

## Clustered Page Tables

## Inverted Page Tables

* not a per-process DS

## Demand Paging

## Copy On Write

## Memory-Mapping

* mapping disk files to memory to reduce IO overhead

## Allocating Kernel Memory

### Buddy Allocator

*Slide09, Page68*

### Slab Allocator

*Slide09, Page70*

# Mass-Storage Structure

## Disk Scheduling

### Algorithmns

1. FCFS
2. SSTF
3. SCAN 
4. C-SCAN
5. LOOK 
6. C-LOOK
7. SPTF

## Redundant Arrays of Independent Disks (RAIDs)

### RAID0

Stripe blocks across Disks
* Actually NOT a RAID at all

### RAID1

Makes more than one copy for each block; each copy should on seperate disks to tolerate disk failure

Common arrangement: RAID-10 (RAID1 first and then RAID0 on every copy)

### RAID4

For each stripe of data, add a single parity block that stores the redundant information for that stripe of blocks

### RAID5

Based on RAID4, rotate the parity blocks across drives

# File System Interfaces

# Log-Structured File System

# Flash-based SSDs

SSDs supports:
1. read(page)
2. erase(**block**)
3. program(page)


