---
hidden: true
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

面向数据编程

`<cstring> strtok()`