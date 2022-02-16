---
title: Tauri hello_world
date: 2021-08-10 14:29:38
summary: Tauri 的 Hello world 程序，对应版本 1.0.0-beta8
tags:
comment:
cc: true
---

# 前言

自打发现 Tauri 这个东西以后，就想拿它练练手，结果发现搜遍全网连个正经的`hello_world`都没有，不是官网上那个前端拿`svetle.js`写的 api 示例，就是几个**真的就是在`div`里写了个 hello world 就完事了的**，好不容易找找个正经的吧，结果又是老版本的，新版本语法变动编译都过不了，再加上官网的介绍比较凌乱~~其实纯粹就是我没好好看~~，经过了几个小时的摸爬滚打（雾），我终于写出一个我认为还算说得过去的`hello_world`。

最起码，它用到了`invoke`这个东西，也没`invoke`也没`event`鬼知道你到底咋调用 rust 函数的 -_-#

阅读本文时请先注意 Tauri 的版本，根据官网介绍由于 Tauri 目前处于开发阶段，所以不同版本 API 可能有变动，如果有时间，我会尽量保证这篇文章中的示例程序可以在最新版 Tauri 中使用。（按理说这些基本操作应该不会有太大变化）

环境设置可以直接参考官网介绍，以下直接上代码。

# 代码

## tauri.conf.json

```javascript
{
	...
	"build": {
		...
		"withGlobalTauri": true
	}
	...
}
```

## index.html

```html
<!--main window-->
<!DOCTYPE html>

<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
	<div id="greetText">What's your name?</div>
	<input id="nameInput" type="text" />
	<button id="greetbutton" onclick="greetbutton_clicked();">Say "Hello"</button>

	<div>push the button, and it should give some respond</div>
</body>

<script>
	async function greetbutton_clicked() {
		// you shuold add "withGlobalTauri": true to the build section of
		// tauri.conf.json to use window.__TAURI__.*
		// but use tauri like this will have less security with your program,
		// see https://tauri.studio/en/docs/api/config#build.withGlobalTauri for detail.
		document.getElementById("greetText").innerText = await window.__TAURI__.invoke("greet", { name: document.getElementById("nameInput").value });
		// the args invoked to rust funcs should be packed in json object.
	}
</script>

</html>
```

## main.rs

```rust
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn greet(name: String) -> String {
  format!("Hello, {}", name).into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

如上。