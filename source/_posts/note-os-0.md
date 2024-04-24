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
