---
title: 程序设计与计算思维 笔记
hidden: true
date: 2022-8-20
updated: 2022-11-28
---
switch checks all cases without break(may cause problem)
```C++
a = 0
switch(a) {
	case 0:
		a = 1;
	case 1:
		a = 2;
	...
}
```

`while(){}` Checks first and then runs if the expression is true
`do{}while()` **Runs once** and then checks if the expression is true
`for(exp1;exp2;exp3)` Runs exp1 once, then check if exp2 is true, and run exp3 when one loop ends.

函数传参的时候使用堆栈存放参数（先进后出，默认参数先后顺序的原因）
传参传指针也是形参，传入的是一个指向所传值的指针，可以改变所传值的值，但是改变该指针的地址不会对原地址上的所传值造成任何影响
数组作为参数传递时，只能地址传递，而且所传为数组首地址
但是可以把数组包在结构体里值传递(？)
大型局部数组用static防止多次创建销毁影响速度

经典错误:
1. 无效引用
```C++
int * func(...) {
	int a;
	...
	return &a;
}
```
`func`调用后，`a`离开作用域已经被销毁，传回的地址是无效地址
2. 内存泄漏
```C++
int & func(...) {
	int* a = new int[10];
	...
	return a;
}
```
`a`离开作用域被销毁，传回无效地址，同时`a`原先指向的空间没有释放，导致内存泄漏

函数指针 高阶函数
```C++
int f(int x) {
	return x;
}

int main() {
	int (*p)(int x) = f;

	int a = 1;

	f(a);
	(*p)(a);
}
```
eg. `std::sort() 中 cmp`

11/17/2022

面向数据编程

`<cstring> strtok()`

算法的三要素：
1. 正确性
2. 有穷性
3. 规范性

浮点型转整型时只留整数部分
cout或printf等输出时四舍五入

11/21/2022
实体：计算机上能找到的东西
cpp主要的实体：变量、函数、类
cpp中一个名字只可以标识一个实体
cpp可以一处定义，多处声明
函数重载时重载的函数被编译成两个不同的名字

数组的类型和数组大小[i]有关

`int (*f(int, int))(int, int)`的理解
`int (*f(int(*p)(int, int)))(int, int, double)`
```C++
using pfun = int (*)(int, int);
int (*f(pfun p))(int, int, double);
```

变量的声明
`extern int a;`
必须具有全局特性（全局变量或在命名空间里, eg: main()）

cpp名字的查找优先于类型检查

```
int fun(int a, int b);
int fun(double a, double b);

int main() {
	fun(2, 3);
}
```
此时调用第**一**个fun

```
int fun(int a, int b);
int fun(double a, double b);

int main() {
	int fun(double a, double b);
	fun(2, 3);
}
```
此时调用第**二**个fun

Lambda表达式
```C++
int main() {
	auto f = []() {return 4;};
	// [] 内为捕获的变量，不可跨函数，() 内为Lambda表达式的形参，{} 为表达式体
	std::cout << f() << std::endl;
	return 0;
}
```

区分初始化和赋值
eg.
```C++
int dd = 3, t = 2;
int &ref = dd; // 初始化
ref = t; // 赋值
```
cpp中`const`和引用必须初始化，`const`类不能赋值

cpp中函数调用时，由实参对形参进行初始化，返回也为初始化


变量类型
1. 临时变量（自动变量）	初始化时存在，离开所在语句时销毁
2. 全局静态变量	初始化时（程序运行时）开始存在，直到程序结束时销毁
3. 局部静态变量	第一次初始化时申请空间，直到程序结束销毁
4. 局部变量	 初始化时开始存在，离开作用域时销毁
5. 堆变量	`new`时存在，直到`delete`时销毁

静态变量只初始化一次，下一次运行时初始化语句**不会运行**，所以需要赋值的时候必须单独写赋值语句

11/24/2022
({基本元素}, {元素间的关系})

计算机的思考模式：对一个小方法的重复使用
如何理解“小方法”？如何理解“重复使用”？

数据波动效应

类：抽象数据类型（ADT）

```C++
class Op{ // 对象的描述
  private:
	char* name
};

Op a; // 对象的实例
```

构造函数可以重载

每一个`class`都应该有构造函数和析构函数，若没有定义编译器会自动加上一个空的构造函数和析构函数

11/28/2022

cpp中部分二元运算符没有规定操作顺序（如`+`），这时产生ub，由编译器决定运算顺序
比如，应该避免写出`++j + j`这样的代码，否则可能在不同编译器上得到不同的结果

`continue` 跳转到离其最近的循环的末尾（`for`中`expr3`依旧会执行）

`return` 跳转到当前函数的 `}` 左边（它和函数体结束之间还包含一些回收代码）

`throw` 抛出异常，既可以抛出值，又可以抛出类型，比如：
```C++
int add1(int a, int b);
int add2(int a, int b, int c);

void fun(int a) {
	switch(a) {
	case 1:
		throw add1;
		break;
	case 2:
		throw add2;
		break;
	}
}

int main() {
	try {
		fun(1);
	} catch(int (*p)(int a, int b)) {
		std::cout << p(1, 2) << std::endl;
	} catch(int (*p))(int a, int b, int c) {
		std::cout << p(1, 2, 3) << std::endl;
	}
	return 0;
}
```

`auto`和`decltype`
```C++
#include <iostream>

int main() {
	int a;

	auto *p = &a; // 编译器自动推断类型
	decltype(a) *q = &a; // 使用 a 的类型

	return 0;
}
```

12/01/2022

构造函数：参数化列表与const与&
参数化列表可以和正常方式混合使用

重载的运算符不可以在构造函数里使用

`=`的重载应返回引用（考虑`(s = t) = "tttt"`）

友元
```C++
class A {
  public:
	...
  friend:
	void fun(A x);
	...
  private:
	int val;
	...
};

void fun(A x) {
	std::cout x.val;
}
```
