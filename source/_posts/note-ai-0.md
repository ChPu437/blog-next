---
title: AI导论 课程笔记
comment: false
cc: true
pinned: false
hidden: false
date: 2024-02-20 09:48:07
updated: 2024-02-20 09:48:07
summary:
tags:
    - 笔记
    - 计算机科学
    - 人工智能
    - 大学课程
---

> 由于中间有很长一段时间在课上做ICS-PA去了，笔记中间断线了许多
> ~~虽然这课确实比较水没讲啥就是~~

## Agent

### Introduction

Agent: anything that can be viewed as perceiving its envivronment through sensors and acting upon that environment through actuators.

Rational agent: select an action to maximize given performance measure based on the percept sequence and built-in knowledge
    * Different from omniscience
    * Different from perfect

Designing agents: PEAS
    * **P**erformance measure
    * **E**nvironment
    * **A**ctuators
    * **S**ensors

### Type of Environment

**Fully observable**: Everything the agent needs to make decision is accesible via its sensors.
    vs. **partially observable**, when not fully accesible, the agent needs to make informed guesses.
In decision theory: perfect information vs. imperfect information.

**Deterministic**: agent does the change of world state.
    * The decision only depends on the agent decision and current state. 
    vs. **stochastic**: the change of the world state beyond the control of agent (in some aspects).
    * Need to make guesses about the world change.

**Episodic**: current decision doesn't depends on previous action.
    vs. **sequential**: current choice will affect future decision.

**Static**: the environment won't change chronologically.
    vs. **dynamic**: the environment changes upon time.
    vs. **semidynamic**: the environment doesn't change, but the agents performance score(e.g. the performance measure) will change with the passage of time.

**Discrete**: the percepts and actions is limited, dinstinct and clearly defined.
    vs. **continuous**: the percepts and actions is limited in a range.

**Single agent**: only one agent in the environment.
    vs. **multiagent**: multiple agent working together.

### Type of Agent

1. Simple reflex agents
    percepts -> condtion-based action rules -> actions    
    * Actions only depend on current percept.
    * Drawback: may develop deadloop.
2. Reflex agents with state/model
    * Know how world evolves.

3. Goal-based agents
    * Goal as the performance measure.
    * Know what it will be like if it does some action.

4. Utility-based agents
    * Consider the problem as Utilities beyond a simple goal.

* **Learning agents**
    * All the four agents above can be seen as a learning agents(if they get the ability to learn). 
    * Has a problem generator, suggests exploring new actions when trying to solve new upcoming problems.

--- 

* State space graph: each state exists only once
* Seaarch Tree: same state can be in multiple nodes

Evaluating search algo:
1. completeness
2. time complexity -> can be evaluated by counting total nodes generated
3. space complexity
4. optimality

---

# Aritificial Intelligence Beyond Classical Search

## Local Search

### Hill-Climbing Algorithm
### Simulated Annealing
### Local Beam Search
### Genetic Algorithms

---

# Constraint Satisfaction Problem

---

# Logical Agent

---

# Probability

---

茅庐川菜
湖区旁边市井川菜
陈麻婆豆腐
四牌楼外有鸡蛋灌饼 蓁巷里

---

# Desicion Tree

信息熵

# Regression and Classification

## Linear Regression (线性回归)

parameter: 函数中要学习测定的变量

线性回归: 针对parameter而言

部分情况可以通过换元将问题转换到线性回归

loss function: 表示损失(精度)

e.g. square error function $\frac{1}{2m}\sum{m}{i=1}(h(x^{(i)}) - y^{(i)})^2$

通常的目标是最小化损失

### Gradient Descent Algorithm (梯度下降法) 

一个学习算法至少有两部分组成:
1. 损失函数
2. 优化算法

## Regularization (正则化)

## Logistic Regression (逻辑回归)

---

# Aritificial Nerual Networks

Input: $x_n$

Parameters: $\omega_n$

Output: $a$ 

Activation function: $a = \sigma (\omega^T x + b)$

## Procedure

1. Feed forward
2. Back propagation

## Convolution Nerual Network (CNN)

kernel: 卷积核，是一个滤波器，在原有的图片上滑动并做卷积得到新的特征点阵

# Transformer


