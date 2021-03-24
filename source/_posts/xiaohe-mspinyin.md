---
title: 在微软拼音中快速添加双拼方案
date: 2021-01-21 18:47:22
tags:
  - Windows
  - Windows 10
  - Microsoft pinyin
  - Double Pinyin
  - flyPY
  - Keyboard
  - Input Method
categories: 技术向
---

[小鹤双拼](https://www.flypy.com/pin.html)是双拼输入法中的一种键盘方案。在 macOS 自带输入法、Gboard、搜狗输入法等输入法中都内置了这种方案。但是在 Win10 的微软拼音中，并没有内置这种方案，那么如何添加这种方案呢？<!-- 这个开头绝对受上一篇影响了 -->

<!-- more -->

![macOS中选择使用小鹤双拼](macos.png)

macOS 内置的输入法虽然不能自定义双拼键位，但含有我正在使用的小鹤双拼方案。

## 在「设置」应用中逐个添加

![双拼方案](Settings.png)

Win10 安装微软拼音输入法后默认只含有这些双拼方案：

- 微软双拼
- 智能 ABC
- 自然码

打开「设置」，进入`时间和语言`，在`区域和语言`中点击`中文`-`选项`，添加`微软拼音`输入法（如果未出现），随后点击`选项`-`常规`，将`拼音设置`修改为`双拼`。在下方创建自定义双拼方案并逐个绑定键位。如果不清楚键位可以看图对应设置。

![小鹤双拼方案](layout.png)

## 使用「注册表编辑器」修改对应注册表

右键`Windows徽标`，选择`运行`（快捷键：`Win`+`R`）

输入`regedit`打开注册表编辑器，跳转到以下路径:

```text
HKEY_CURRENT_USER\SOFTWARE\Microsoft\InputMethod\Settings\CHS
```

{% note info %}
默认情况：

- 你没有设置其他自定义双拼方案
  > 如果有，请对应序号修改键名称
- 你已安装并使用简体中文输入法
  {% endnote %}

新建字符串值`UserDefinedDoublePinyinScheme0`，并将值设置为`小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt`

接下来去「设置」中将小鹤双拼设为默认，也可以直接继续修改注册表，最终注册表可能是这样：

| 名称 | 类型 | 数据 |
| -- | -- | -- |
| UserDefinedDoublePinyinScheme0 | REG_SZ    | 小鹤双拼*2*^\*iuvdjhcwfg^xmlnpbksqszxkrltvyovt |
| Enable Double Pinyin           | REG_DWORD | 00000001                                       |
| DoublePinyinScheme             | REG_DWORD | 0000000a                                       |

![注册表中设置完成的数据](Registry.png)

## 直接导入注册表

{% note info %}
默认情况：

- 你没有设置其他自定义双拼方案
  > 如果有，可能会被覆盖
- 你已安装并使用简体中文输入法
  {% endnote %}

懒人专用，[点此下载](xiaohe.reg)并导入

文件内容：

```reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\SOFTWARE\Microsoft\InputMethod\Settings\CHS]
"Enable Double Pinyin"=dword:00000001
"UserDefinedDoublePinyinScheme0"="小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt"
"DoublePinyinScheme"=dword:0000000a
```

{% note warning %}
无论何时，在导入注册表前

- 检查该文件，确保该文件可信
- 了解这将带给系统的修改并造成的影响
  {% endnote %}
