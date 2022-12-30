---
title: 程序设计与计算思维 笔记
hidden: true
date: 2022-8-20
updated: 2022-12-22
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

重载的运算符在实例被构造后生效，不可以在构造函数里使用

`=`的重载应返回引用（考虑`(s = t) = "tttt"`）

流控制运算重载
```C++
istream& operator>>(istream& in, String& x){
	in >> x.str;
	return in;
}
```

友元
```C++
class A {
  public:
	...
  friend void fun(A x);
	...
  private:
	int val;
	...
};

void fun(A x) {
	std::cout x.val;
}
```

12/5/2022

`#pragma once`：该

左值和右值
右值利用值属性，左值利用空间属性
右值只能放在赋值运算右侧

右值引用
`int&& i = 2;`
`&`为左值引用，左值引用不能绑定右值，反之亦然
右值引用变量本身也是一个左值

const 顶层 底层
`const int i`顶层，此时`i`是常量
`const int &i`底层，此时认为`i`引用的值是常量
后者可以直接绑定右值（算是左值引用的特例）

因为`const int x`和`int x`作为形参时传入的无论是常量还是变量都是新建一个临时量进行运算（即无法控制所传量的类型），所以cpp不允许在重载运算符的时候传入这两种量，而只能传它们的引用（按照上面的规则能够做到控制类型，`const int& x`能传入`int`和`const int`和`constexpr int`而`int&`只能传入`int`）

cpp的类型转换：
`static_cast<T>()`强制类型转换
`const_cast<T>()`可以去掉转换前量的常量属性，例如：
```C++
int p = 3;
const int i = p;
int& m = const_cast<int&>(i);
m = 5;
std::cout << i << std::endl;
```
此时`i`输出为`5`

注意：不要强制类型转换常量表达式!
比如：
```C++
const int i = 3;
int& m = const_cast<int&>(i);
m = 5;
std::cout << i << std::endl;
```
此时输出为 3，因为编译器自动把所有的`i`转换成了`constexpr``3`
`dynamic_cast<>()`
`reinterpret_cast<>()`：强制转换时重新解析，所转换的只能是指针
将内存中所存的二进制值不转换直接解释为另外一个类型
比如`int`转换成`float`，
```C++
int* m = 3;
float* u = reinterpret_cast<float*>(m);
```
`*u`是一个二进制表示为`00000000 00000000 0000000 00000011`的`float`型，是一个很小的值~~总之不是3~~
这玩意不会掉精（因为不改变二进制值
* 在cpp中使用旧式的类型转换会优先匹配什么？

类的成员函数由`__thiscall`实现
`__thiscall`调用时传入一个隐藏参数`*this`指向调用这个函数的量
`__cdecl` `__stdcall` ……

类中函数的类型
1. 构造型
	1. 构造函数
	2. 赋值函数
	3. 析构函数
2. 行为型
	1. 运算符重载
	2. 类型转换函数
	……
3. 结构型：表示类和其他类的关系

静态成员变量：所有由该类生成的对象共享该变量（使用例：总实例个数计数器）
静态成员函数：没有`this`指针，隶属于类，但不属于类中任何一个变量

`public:` 类本身、函数、外部类和子类均可用
`protected:` 类本身和子类可用（以及友元函数）
`private:` 只有类本身可用（以及友元函数）

---
12/8/2022

[] -> 可省略\
红字 -> 关键字\
$ -> int\
. -> float\
? -> bool\
* -> char\

造 -> 声明变量\
堆 -> 声明数组\
叠 -> 声明结构体\
贴 -> 引用\
连 -> 指针\
令 名字 之 名字/序数 为 名字 // eg. 令 a 之 5 为 b\
令 名字[#] 为 名字 // eg. 令 a# 为 b\
升 -> typedef\
使 -> 赋值\
预 -> 类似于define？\
吃 -> input\
吐 -> print\
选 -> 类似于case\
复 -> 循环

---

### 基本对象关系

1. 嵌入（组合）

```C++
class Word {
	String name;
  public:
	Word();
}；
```

`String`此时是一个**嵌入对象**，`Word`是其**宿主对象**.

构造`Word`类型实例时，必须先构造`String`的实例`name`.

编译器会自动向宿主对象的构造函数中插入嵌入对象的默认构造函数.

2. 继承
3. 多态

### 构造函数的类型

1. 默认构造函数

2. 赋值重载函数

参数化列表：

使用构造函数构造实例时，若实例中含嵌入对象，则会产生临时对象，效率较低；而使用参数化列表初始化嵌入对象时不产生临时对象，效率更高

比如：
```C++
class Word {
	String name;
  public:
	Word();
}
```
则
```C++
Word::Word() : name(0) {
	...
}

```
优于
```
Word()::Word() {
	name = 0;
	...
}
```
前者相当于
```C++
name.String::String(0);
...
```
后者相当于
```C++
name.String::String();
String temp = String(0);
name.String::operator=(temp);
temp.String::~String();
...
```
同样的原因，引用类型的成员变量及成员常量也要用参数化列表初始化.

继承
```C++
class 派生类名 : [继承方式(private on default)] 基类名 {
	派生类新增成员
};
```
继承的时候基类的所有成员都会被遗传到派生类，但不一定能访问。
比如基类的`private`成员只能由派生类中由基类遗传而来的`public`和`protected`成员函数访问（`private`函数没法在派生类直接访问）

构造函数、析构函数和友元函数不能继承。

---

12/12/2022

基类的成员函数不能访问派生类的成员

在派生类外能否访问基类的成员取决于基类成员在派生类中新的封装类别（前提这个基类成员是public成员）

只能用子类对象类型给基类赋值，不能用基类给子类赋值

继承的时候子类函数的名字可以覆盖基类的名字
可以用`父类名::函数名`或者单写另一个函数调用父类的这一函数

---

12/15/2022

保护继承和私有继承在直接派生类（即一代遗传）中的作用相同.\
但是继续派生时产生的派生类中只有保护继承的量才能继续继承.

少用继承，多用嵌入

显式数据强制转换\
某种对象->基本内置类型
```C++
A::operator char*() const {

}

static_cast<char*>a;
```
基本内置类型或其他对象类型->某种对象类型：构造函数

为防止隐式类型转换，可以建立一个基类，其中将赋值构造函数及赋值运算重载设为私有(~是私有继承吗?~)并不予实现(这样就没有办法调用函数进行转换了)\
或者在构造函数前加`explict`关键词表示该构造函数只能用于初始化.（~不会，查一下~）

多继承及实例初始化

虚基类

纯虚函数、抽象类

```C++
class Base1 {
  public:
	virtual void display() = 0;
}
```
这里`display()`是一个纯虚函数
`= 0`表示此处不定义这个函数，函数的具体实现由派生类实现
```C++
class Base2 : public Base1 {
  public:
	virtual void display();
};

void Base2::display(){
	/* Do Something */
}

class derived : public Base2 {
  public:
	virtual void display();
}

void derived::display() {
	/* Do Something */
}

```
含有虚函数的类为抽象类，\
全为虚函数构成的类为纯抽象类.\
抽象类不能实例化.

### 多态

比如上面俩`display()`

通过基类指针只能调用基类的成员，如
```C++
class A {
  public:
	void f();
};

class B : public A {
  public:
	void f();
};

A2 a, *p;
B b;
p = &a; p->f();
p = &b; p->f();
```
这俩调用的都是`A`的`f()`函数.\
如何用同一个指针调用`A`和`B`的`f()`函数？

C++中采用虚函数机制！

比如上面的`Base2`和`derived`类：
```C++
Base2 *p, a;
derived b;
p = &a; p->display();
p = &b; p->display();
```
此时调用的分别是`Base2`和`derived`的`display()`

* 派生类中虚函数的声明可不加`virtual`，但是为了程序清晰一般都加.
* 类外定义虚函数时不加`virtual`.
* 派生类中重新定义虚函数时函数名、参数、返回类型全部与基类中的定义相同，否则会新建一个不同的虚函数.
* 如果派生类中只声明一个基类的虚函数但不定义，则自动继承基类的实现.

* 多态关系是一种同族纵向关系（继承也是这种），反映同族对象之间的行为特征遗传变异关系.
* 多态关系只用于成员函数.
* 多态关系只发生在**指针使用方式**和**引用使用方式**，此时，函数调用究竟调用哪个对象实例的同名函数取决于当时指针或引用所赋与的**实际实例**.
* 成员使用方式(.)**不产生多态效应**，此时调用的是量自身对应类型的成员函数.

### 动态关联
普通函数调用是将主调函数和被调函数耦合在一起，在程序编译时已经确定，属于静态绑定.\
如果主调函数调用的被调函数不能确定，则需采用动态关联(或称动态绑定).

具体的实现采用函数指针.

C++中虚函数的实现采用的就是虚表+函数指针的方法.

函数的重载(包括运算符的重载)也可以看成是对象的一种多态，是简单、静态的多态，是一种横向的重载，而动态多态可以理解为纵向的重载.

### 多态时的析构问题
使用基类指针新建派生类时，delete时只会调用基类的虚函数而不会调用派生类基函数.\
此时会造成内存泄漏.

解决方法：将析构函数改写为虚析构函数.

### 多态中的其他问题
* 多态不能和指针运算同时存在(大小不固定).
* 同样的，多态也不能和数组共存.

12/22/2022

基本流及文件流

程序控制I/O的几个层次
1. 程序
2. OS API
3. 文件系统
4. OS系统调用
5. 驱动程序
6. I/O设备

流是对数据传输过程的一种抽象\
传输的具体内容\
中间的控制\
源(流结果的消耗)->宿(流结果的叠加)

C++基本IO流类是一套类模板.\
iostream中通过**友元函数**的方式实现`<<`和`>>`的重载.\
iostream中预先定义了`ostream`类实例`cout`和`istream`类实例`cin`.\

文件流\
```C++
#include <fstream>

std::ifstream fin;
fin.open("someFile", std::ios::in);

// another way to construct a new instance
std::ofstream fout("someFile", std::ios::out);


fin.read(char*, sizeof(char*));
fin >> x;
fout.write(char*, sizeof(char*));
fout << x;

fin.close();
fout.close();
```

随机访问时读写位置的确定：
```C++
ios::beg
ios::cur
ios::end
```

异常处理

程序错误：语法错误、逻辑错误

```C++
someFunc{
	throw [expr];
}

main() {
	try {
		someFunc();
	} catch(someType [variable]) {
		doSomeThing();
	}
}
```
* throw发生时立即离开发生异常的函数，后面的语句不再执行（类似return）
* try-catch块的花括号不能省略
* `catch(...)`表示捕捉任何类型的异常信息（应该放到所有`catch`之后）
* `throw`后可以不加表达式，表示将异常交给“上级”处理
* 当异常传递到主函数中还未能被`catch`处理，则会自动隐式调用一个系统函数Terminate使程序终止运行
* 异常被catch到时会发生自动析构，避免局部变量未释放产生的内存泄露问题（那如果没有被catch到直接Terminate了呢）
