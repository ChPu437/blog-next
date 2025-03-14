---
title: CF8D Two Friends 题解
comment: true
cc: true
pinned: false
hidden: false
date: 2022-12-15 07:52:52
updated: 2022-12-15 07:52:52
summary: 二分 + 计算几何
tags:
	- ACM
	- OI
	- CodeForces
	- 二分
	- 计算几何
---

# 题面
## 题面原文
[CodeForces](https://codeforces.com/problemset/problem/8/D)\
注意：如果你是在洛谷上看的题面的话，那个翻译两个人走的路径**写反了**(而且人名也不对……)
## 大意翻译
Alan和Bob现在在$A$点，Alan要先经过$C$点再走到$B$点，而Bob要走到$B$点(对于Bob来说$C$点可过可不过)，且要求Alan走过的路程减去他能走的最短路径长度不超过$t_1$，Bob走过的路程减去他能走的最短路径长度不超过$t_2$.\
求两人能经过的**从起点开始的**共同路径的最长长度.(即不考虑分离后再走到一起的路程)
### 输入格式
第一行为两个整数，分别为$t_1$和$t_2$.\
第二至四行分别为$A$、$B$、$C$点的坐标.\
所有坐标均为绝对值不大于$100$的整数，且点与点不重合.
### 输出格式
一行一个浮点数，表示Alan和Bob能经过的从起点开始的最长公共路径长.\
答案至少精确到小数点后四位.
# 解题思路
当可以走完一并全程时，则一并走完全程，并“浪费”掉没有用完的路程，即：
$$
\left(AC + BC\right) - AB \le t_2\ 时\\
ans = \min{\left(AC + BC + t_1, AB + t_2\right)}
$$
考虑不能一起走完全程的情况：

假设两人第一次分离的点为$O$点，容易想到最优的路径中两点间的路径一定是直线.\
如下图：\
![图一](1.jpg =50%x50%)
考虑两个人需要走过的路径长：
$$
Alan：AO + OB + BC\\
Bob：AO + OC
$$
考虑两个路径需要满足的约束条件：
$$
\left(AO + OB + BC\right) - (AB + BC) \le t_1\\
\left(AO + OC\right) - AC \le t_2
$$
整理可得
$$
OB \le t_1 + AB - AO \\
OC \le t_2 + AC - AO
$$
由于$t_1 + AB$和$t_2 + AC$为常数，可知$AO$(即共同路径)越长时，$OB$、$OC$所能取的最长长度越短.\
两式取等号，分别以$AO$、$BO$、$CO$于$A$、$B$、$C$点作圆，可得
![图二](2.jpg =50%x50%)
这三个圆内能取到的位置表示对于该点来说合法的$O$点位置，当三个圆有公共区域时，可知此时是一个符合题目要求的情况，同时，答案($AO$长度)满足线性性，故只需二分$AO$的长度，然后判断三个圆有没有公共区域即可.

那么怎么求三个圆的公共区域呢？

首先考虑两个圆的关系：相切、相交、一个圆包含另一个圆(不包括内切)、相离.\
显然只有前三种才可能有三圆的公共区域.\
对于相切的情况，由于只有一个交点，只需要判断这个交点在不在第三个圆内即可.\
![图三](3.jpg =50%x50%)
对于一个圆包含另一个圆的情况，只需要判断第三个圆和较小的圆有无公共区域即可.\
![图四](4.jpg =70%x70%)
对于两圆相交的情况，则判断两个交点中是否有交点在第三个圆内(或上).\
![图五](5.jpg =60%x60%)
注意以上判断过程，除包含这一情况外，余下都是基于点与圆的位置关系的，故判断过程对于每两个圆都需要进行一次，也就是一共要进行三回，否则可能出现以下的合法但没有被判断出来的情况：\
![图六](6.jpg =60%x60%)


# 完整代码

```C++
#include <iostream>
#include <cmath>
#include <iomanip>

using std::cin;

const double EPS = 1e-11; // 至少 1e-11

struct circle {
	double x, y, r; // 标准方程
	double D, E, F;
};

double t1, t2;
double disABS, disACS, disBCS; // 全部为平方
double disAB, disAC, disBC;

bool Check(const double& mid, circle A, circle B, circle C);
bool CheckCircle(circle A, circle B, circle C);
double GetDisS(const circle& X, const circle& Y);

int main() {
	circle A, B, C;

	cin >> t1 >> t2;
	cin >> A.x >> A.y;
	cin >> B.x >> B.y;
	cin >> C.x >> C.y;

	// 计算距离
	disABS = GetDisS(A, B), disAB = sqrt(disABS);
	disACS = GetDisS(A, C), disAC = sqrt(disACS);
	disBCS = GetDisS(B, C), disBC = sqrt(disBCS);

	if ((disAC + disBC) - (disAB + t2) <= EPS) { // 可以一起走完全程的情况
		std::cout << std::fixed << std::setprecision(4) << std::min(disAC + disBC + t1, disAB + t2) << std::endl;
	} else { // 中间分开的情况
		// 下面二分 AO 长度
		double l = 0, r = disAB + t2;

		while (r - l > EPS) {
			double mid = (l + r) / 2.0;
			if (Check(mid, A, B, C)) {
				l = mid;
			} else {
				r = mid;
			}
		}

		std::cout << std::fixed << std::setprecision(4) << l << std::endl;
	}

	return 0;
}

bool Check(const double& mid, circle A, circle B, circle C) {
	A.r = mid, B.r = t2 + disAB - mid, C.r = t1 + disAC - mid;
	bool flag = false;
	flag |= CheckCircle(A, B, C);
	flag |= CheckCircle(B, C, A);
	flag |= CheckCircle(A, C, B);
	return flag;
}

bool CheckCircle(circle A, circle B, circle C) {
	double disABS = GetDisS(A, B), disAB = sqrt(disABS);
	double disACS = GetDisS(A, C), disAC = sqrt(disACS);
	double disBCS = GetDisS(B, C), disBC = sqrt(disBCS);

	if (A.r + B.r - disAB <= -EPS) { // 相离
		return false;
	} else if (A.r + disAB - B.r <= EPS) { // A 含于 B
		return disAC - (A.r + C.r) <= EPS;
	} else if (B.r + disAB - A.r <= EPS) { // B 含于 A
		return disBC - (B.r + C.r) <= EPS;
	} else { // 相交
			 // 先求 A B 交点, 然后求离 C 最近的交点是否在 C 内
		A.D = -2.0 * A.x, A.E = -2.0 * A.y, A.F = pow(A.x, 2) + pow(A.y, 2) - pow(A.r, 2);
		B.D = -2.0 * B.x, B.E = -2.0 * B.y, B.F = pow(B.x, 2) + pow(B.y, 2) - pow(B.r, 2);
		double D = A.D - B.D, E = A.E - B.E, F = A.F - B.F; // 交点弦 Dx + Ey + F = 0

		circle M, N;

		// if (E > EPS) {
		if (fabs(E) > EPS) {		// E 可能小于 0, 呃呃
			D = -D / E, F = -F / E; // 化为 y = -D/Ex - F/E;
			double a, b, c;			// 代入 A 得 ax^2 + bx + c = 0
			a = 1 + pow(D, 2);
			b = A.D + 2.0 * D * F + A.E * D;
			c = pow(F, 2) + A.E * F + A.F;
			// 求根公式求交点
			M.x = (-b + sqrt(fabs(pow(b, 2) - 4.0 * a * c))) * 0.5 / a;
			M.y = D * M.x + F;
			N.x = (-b - sqrt(fabs(pow(b, 2) - 4.0 * a * c))) * 0.5 / a;
			N.y = D * N.x + F;
		} else { // 交点弦垂直于 x 轴的情况
			M.x = N.x = -F / D;
			M.y = sqrt(fabs(pow(A.r, 2) - pow(A.x - M.x, 2))) + A.y;
			N.y = sqrt(fabs(pow(A.r, 2) - pow(A.x - M.x, 2))) - A.y;
		}
		double disCM = sqrt(GetDisS(C, M));
		double disCN = sqrt(GetDisS(C, N));

		return std::min(disCM, disCN) - C.r <= EPS;
	}
}

double GetDisS(const circle& X, const circle& Y) {
	return pow(X.x - Y.x, 2) + pow(X.y - Y.y, 2);
}
```
# 注意事项

1. 精度问题\
因为我这份程序计算交点就是用求根公式爆算的，所以掉精比较严重，精度开到$10^{-11}$才能正常通过.\
另外，答案只要求四位小数，好像是因为标程也只能跑到这个精度……
2. 小细节
	1. 对浮点数数值大小进行判断时，注意区分**绝对值为$0$**和**值小于$0$**
	2. 注意二分边界：左边界为$0$，右边界为$AB + t_2$(不能一起走完全程时一定有$AB + t_2 \lt AC + CB + t_1$)
	3. 一定注意用`double`，不要习惯性敲`int`上去……
