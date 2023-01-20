---
title: SDL2 学习笔记 1：Hello world!
comment: true
cc: true
pinned: false
hidden: false
date: 2023-01-13 08:08:04
updated: 2023-01-20 08:08:04
summary:
tags:
	- SDL2
	- 游戏开发
	- C++
---

下面是一个使用C++的SDL2的Hello World程序，展示了一个简单的SDL2程序。

```C++
#include <SDL.h>

constexpr Uint16 WINDOW_WIDTH = 800;
constexpr Uint16 WINDOW_HEIGHT = 600;

SDL_Window* gWindow = nullptr;
SDL_Renderer* gRenderer = nullptr;

int main(int argc, char* argv[]) {
	// Init SDL
	if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_EVENTS) < 0) throw;

	// Create window and renderer
	gWindow = SDL_CreateWindow("Hello world!", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
		WINDOW_WIDTH, WINDOW_HEIGHT, SDL_WINDOW_SHOWN);
	if (gWindow == nullptr) throw;

	gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED);
	if (gRenderer == nullptr) throw;

	// Set draw color to white and fill the whole render target
	SDL_SetRenderDrawColor(gRenderer, 255, 255, 255, 255);
	SDL_RenderClear(gRenderer);

	// Set draw color to black and draw a filled rectangle
	SDL_SetRenderDrawColor(gRenderer, 0, 0, 0, 255);
	SDL_Rect rect = { 100, 100, 300, 300 };
	SDL_RenderFillRect(gRenderer, &rect);

	// Present the rendered buffer to the screen
	SDL_RenderPresent(gRenderer);

	// Detect for quit event
	SDL_Event e;
	while (true) {
		SDL_PollEvent(&e);
		if (e.type == SDL_QUIT) {
			break;
		}
	}

	// Free the memory used and quit SDL
	SDL_DestroyRenderer(gRenderer);
	SDL_DestroyWindow(gWindow);
	SDL_Quit();

	return 0;
}
```

## 解释
此处只对代码在干什么进行一个大致的描述，详细的解释分别在后面的笔记中说明。

这段代码会生成一个标题为"Hellow, world!"的窗口。

注意在使用SDL2官方提供的预编译库时主函数一定要加上`int, char*`两参数，否则会与库中主函数定义不一致无法正常链接。

首先，我们需要对SDL2进行初始化，即调用`SDL_Init()`并传入所需的功能模块的flag。

然后，任何一个SDL程序都需要一个窗口才能显示/运行，而这里的`SDL_Window`就是对"窗口"的一个抽象。

创建窗体时我们使用了`SDL_CreateWindow()`函数，其中各个参数分别代表窗体标题、窗体的坐标（以左上角为基准）、窗体的宽度与长度以及窗体flag。

这里`SDL_WINDOW_SHOWN`表示创建窗体后立即显示，其他另有一系列flag，此处不作过多介绍。

创建了窗体以后，我们需要通过一定的方法绘制我们需要的内容，在SDL2中有通过`surface`和通过`renderer`两种方法（`renderer`为SDL2新增）。

这里我们采用后者，于是调用函数新建一个`renderer`，`-1`表示初始化第一个支持后面所传入的渲染flag的渲染器（现在不用管它），而后面的flag表示启用加速。

然后，我们用白色填充了整个窗体，并在上面用黑色在(100, 100)的位置画了个边长300px的正方形。

而这些渲染都是在一个看不见的缓冲区上进行的，最后，我们调用`SDL_RenderPresent()`来把这些东西显示到屏幕上。

最后，我们通过一个循环获取事件，来使窗口保持显示并在接收到退出信号时正常退出。

---

相关代码也可以访问[我的Gtihub仓库](https://github.com/ChPu437/SDL2-learning/tree/master/00_hello-world)。
