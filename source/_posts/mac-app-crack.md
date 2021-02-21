---
title: 破解macOS应用程序(Inklet)
date: 2020-04-30 10:55:38
tags:
  - macOS
  - Hack
  - Reverse
categories: 技术向
---

[Inklet](https://tenonedesign.com/inklet.php) 是一个可以把笔记本触摸板变成简易数位板的 macOS 应用程序

<!-- more -->

软件售价 $19.98, 软件加~~没什么用的~~笔售价 $24.98
[Demo 版下载](https://tenonedesign.com/apps/inklet/inklet.php)
Demo 版有连续使用时间等限制

上网课我需要用到, 所以我就在网上找了个 v2.1.1 的破解版用

发现官方更新到了 v2.2.0, 但是网上找不到此版本破解版/激活码

那就自己动手吧, ~~先棒读:~~**仅供学习交流使用，严禁用于商业用途，请于 24 小时内删除。请支持正版**

## 工具准备

- brew

- vim
  不会用的话用 [Hex Friend](http://ridiculousfish.com/hexfiend/)

- otx

  ```bash
  brew cask install otx
  ```

可选工具:

- [class-dump](http://stevenygard.com/projects/class-dump/)

- gdb

  ```bash
  brew install gdb
  ```

- Hopper Disassembler

## 开始破解

程序的二进制文件位于`/Applications/Inklet.app/Contents/MacOS/Inklet`

### 反汇编程序

- 使用 otx

  ```bash
  otx /Applications/Inklet.app/Contents/MacOS/Inklet > ~/Desktop/inklet.asm
  ```

  打开`inklet.asm`

- 使用 class-dump

  ```bash
  class-dump -H /Applications/Inklet.app/Contents/MacOS/Inklet -o ~/classdump
  ```

### 找到返回注册信息程序的对应位置

我先查找了`license`

```bash
class-dump -f license  /Applications/Inklet.app/Contents/MacOS/Inklet
```

> ```bash
> @interface InkletWelcomeLicense : InkletWelcomeBase
> - (long long)licenseUpgradeState;
>
> @interface InkletRegisterPreferences : NSPreferencesModule
> - (BOOL)licenseState;
> - (BOOL)unlicensedWithPreviousLicense;
> ```

在`inklet.asm`中:

> ```x86asm
> -(BOOL)[InkletRegisterPreferences licenseState]:
>     +0  000000010002856f  55                        pushq         %rbp
>     +1  0000000100028570  4889e5                    movq          %rsp,                         %rbp
>     +4  0000000100028573  488b0516060500            movq          0x50616(%rip),                %rax
>    +11  000000010002857a  0fbe0407                  movsbl        (%rdi,%rax),                  %eax
>    +15  000000010002857e  5d                        popq          %rbp
>    +16  000000010002857f  c3                        retq
> ```

猜测是`InkletRegisterPreferences`中的`(BOOL)licenseState`返回注册状态, 所以只需要让它的值一直返回 True 就很可能破解成功

### 修改程序

持续返回 True 的程序的机器码来自[这里](https://freemandealer.github.io/2015/10/10/hacking-osx-app/#%E5%87%86%E5%A4%87%E6%AF%92%E8%8D%AF)
省事很多 ww

#### 使用 gdb 动态测试

```bash
gdb inklet
> b *0x000000010002856f   #InkletRegisterPreferences函数开始地址
> r
> set *0x0000000100028573 = 0x000001b8
> set *0x0000000100028577 = 0x0fc35d00
> set *0x000000010002857b = 0x0000441f
> disas 0x000000010002856f, +10
> continue
```

测试成功, 原来的时间限制已经解锁了

#### 修改二进制文件

```bash
vim /Applications/Inklet.app/Contents/MacOS/Inklet
:%!xxd
```

找到`554889e5488b05160605000fbe04075d`
改为`554889e5b8010000005dc30f1f440000`

如果修改后打不开那就给它[签个名](/2020/fix-macOS-10-15-4-damage/)试试?(我这直接就能打开了)

## 技术总结

收集信息和探索：对二进制文件展开成人类可读的形式后，使用关键词进行搜索，定位阻碍我们流畅使用该应用的函数。这一步耗时最长，需要仔细摆弄软件获得灵感，并且直接决定能否成功。一般搜索关键词如 activate、purchase、register、trial 之类，也可以结合具体应用和想要的效果选取。例如对于弹窗的应用，不一定非要“破解”，只要能屏蔽广告就行，那么可以使用 dialog、window 之类的关键词搜索。这个阶段使用的工具主要目的是为了把 binary format 妆换成 human-readable format，工具例如：hopper、otx、class-dump 都可以满足，class-dump 信息清晰一些。

如果上一步定位了目标函数，则需要弄清这个函数的输入输出，并撰写编译自己后面用来替换的函数。比如目标函数通过判断用户身份返回是否合法，合法 true 不合法 false。那么我们就建立一个 C 文件写一个永远返回 true 的函数编译出二进制。如果一个目标是一个返回 void 的弹窗函数，那么我们就让这个函数调用后立马 return，跳过后面花里胡哨的广告展示逻辑。这个阶段用到的工具是 C 语言编译器，如 gcc。

找到目标函数的虚拟内存地址。工具: hopper 或 otx 都可以满足。

通过上面的内存地址获取代码在二进制文件中的位置。工具： offset 脚本。

使用自己的函数逻辑替换二进制文件 offset 处原逻辑。工具：vim && xxds

测试是否成功。不成功重复上述步骤，或者 google 高阶破解技巧，或者放弃。

转自[技术总结 by Zhengyu Zhang](https://freemandealer.github.io/2015/10/10/hacking-osx-app/#%E6%8A%80%E6%9C%AF%E6%80%BB%E7%BB%93)

## 参考文章

- [记录一次 OSX 软件破解](https://freemandealer.github.io/2015/10/10/hacking-osx-app/)
- [一个数字的魔法——破解 Mac 上 198 元的 Paw](https://bestswifter.com/app-crack/)

如果没有这些文章, 这次破解将会变得非常耗时且难以成功, 感谢!
