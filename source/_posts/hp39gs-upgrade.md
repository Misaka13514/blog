---
title: 将 HP 39gs 升级为 HP 48gII
date: 2020-07-11 11:10:00
tags:
- Calculator
- Graphing Calculator
- HP
- CAS
- Hardware
- ROM
categories: 技术向
mathjax: true
---

HP 39gs是HP于2006年发布的HP-39系列中的一个图形计算器

<!-- more -->

| HP 39gs | 信息 |
| --- | --- |
| CPU | SAMSUNG S3C2410A ARM920T 75Mhz（可调至203Mhz+）|
| RAM | 256KB |
| 屏幕 | 131×64 单色LCD 可调对比度|
| 通信 | Mini USB / RS232 / IrDA |
| 供电 | 4×AAA + CR2032 |
| 尺寸 | 9.4×3.1×18.7 cm |
| 重量 | 248g |
| 输入 | 线性 Algebraic |
| Aplet语言 | RPL |
| Program语言 | HP Basic |
| CAS | 无 |
| 其他 | 有蜂鸣器 |

{% note info %}
HP 39gs 售价非常低廉（通常低于50人民币/台），但它运算功能差，速度慢，不建议用于日常计算使用。如果想要购买建议先使用模拟器体验。
{% endnote %}

## HP 39gs使用体验

2019年底我购买了HP 39gs，这是我接触到的第一台图形编程计算器。

没有HP计算器也想体验一下？

可以使用[Emu48 for Android](https://play.google.com/store/apps/details?id=org.emulator.forty.eight)等模拟器。

### 操作

它使用线性输入，所以拿到手后我很快就学会了如何使用它。

不足的是字母等需要按ALPHA后输入的键标识位于实体键下方，需要适应。

### 计算及绘图

计算只能是小数或是通过小数化成的分数，部分计算甚至不及我的`CASIO fx-82ES + A`函数计算器。

> 计算$\sqrt{2}+\sqrt{2}$

得不到$2\sqrt{2}$

将只能得到近似结果`2.82842712474`

如果在分数模式下就会得到`1217471/430441`(精度11)、`478/169`(精度4)

绘图画简单的函数还是OK的

- 可以同时画多条
- 有几种坐标方式可选
- 可以求根、极值、面积、切线角度

### 其他程序

游戏非常多

我能想到的经典的几个：超级马里奥、贪吃蛇、BABAL、俄罗斯方块、扫雷

[【百元科技神器-03】如何玩坏一个图形计算器（](https://www.bilibili.com/video/BV1Dx411G7ZH) by [Jimmy Tian](https://www.jimmytian.com/)

群友编写的程序也很多，如中文阅读器、电子琴、摩尔斯电码、各种音乐、时钟、五子棋...

[hpcalc](https://www.hpcalc.org/)上也有很多程序

我认为比较重要的一个程序是[时钟调节器](https://github.com/Arnie97/clock-tuner)，降频可以省电或是减缓游戏速度，升频可以是作图和计算更快速。

## HP 39gs改造

{% note warning %}
需要有一定的电子知识和集成电路焊接技术。有一定的危险性。若您对自己的操作技术没有把握，请勿尝试，以免受伤或是计算器受损。必要的话请找人帮忙改。
{% endnote %}

### 拆开HP 39gs

![先取下屏幕前的贴纸](open.webp)

旋下两颗十字螺丝，打开电池盖，部分批次的计算器可能还有两颗螺丝也须取下。

打开后盖（由卡扣固定），小心不要弄断电池盒或蜂鸣器的连接线。

![打开后如图(因为我已做部分改造 会有少许不同)](opened.webp)

### 供电改造

HP 39gs采用4节AAA电池供电(1.5V×4=6V)，但它实在有些太费电了，4节全新电池1周-1个月就需要更换。

一种解决方法是使用Mini USB和移动电源为HP 39gs供电。实在不是很方便，我决定为HP 39gs安装锂电池。

![材料：锂电池充电+保护板 DC升压板 锂电池](power.webp)

- 锂电池充电+保护板
  我用的是带有Type-C接口的(也能选用Micro-B)，比Mini USB更通用
- DC升压板
  锂电池没有找到6V的，使用它由3.7V升压至6V给计算器供电

  如果不使用它也可以点亮计算器，只是计算器会判定电量低，开机就会有提示出现

  如果使用7.4V电池给计算器供电可能会导致花屏
- 锂电池
  HP 39gs 内部空间较大 要使用尺寸合适的

小心调节升压板的电位器使它输出6V

接线：

```text
电池+ -- B+ , OUT+ -- VIN+ , VOUT+ -- 计算器+
电池- -- B- , OUT- -- VIN- , VOUT- -- 计算器-
```

全部塞到计算器里固定好

![一堆胶带](battery.webp)

~~别打我~~

### 升级到HP 48gII

> 更换HP 39gs的ROM芯片为更大容量的芯片并刷入HP 48gII计算器的操作系统后，HP 39gs就会获得HP 48gII计算器的全部功能。——由cncalc计算器论坛的nbzwt研究发现

{% note info %}
HP 39gs的按键功能在升级后会变为HP 48gII的按键功能，不再与按键标记对应。需要使用键盘贴等重新标记按键

如果不想更换按键位置，可以考虑升级到HP 40gs
{% endnote %}

我使用的芯片是`SST39VF1601-70-4I-EKE`，购买时可以让卖家烧写好系统，就不需要自己用JTAG烧写了。

![HP 39gs的芯片 购买的芯片](chip.webp)

取下主板上的电磁屏蔽纸，使用烙铁或风枪更换图示芯片，注意方向，能否成功基本看焊接技术。

![芯片位置及朝向](replace.webp)

开机后应该就是HP 48gII的操作界面了

安装计算器，贴键盘贴。键盘贴可以自制，也能在网上购买

![买来的键盘贴](key.webp)

## HP 48gII使用体验

HP 48gII除了和HP 39gs在按键上不同外，软件上也有许多的变化。

![改机后查看版本](version.webp)

### 计算

得益于HP 48gII带有[CAS](https://calcwiki.org/%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%BB%A3%E6%95%B0%E7%B3%BB%E7%BB%9F)功能(Erable-based)，在速度、精度上得到了较HP 39gs较大的提升。

HP 48gII除了使用线性Algebraic输入，也能使用EQW自然书写。另外还支持大部分HP计算器都支持的[RPN](https://calcwiki.org/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)输入方式。

### 其他软件

HP 48gII游戏体验我认为不如HP 39gs，游戏较少（但ROM自带俄罗斯方块彩蛋），频率调节不便...

ROM自带有时钟，可以用于查看时间日期。

编程语言使用[RPL](https://calcwiki.org/RPL)或Algebraic RPL。

### 连接PC

在Windows上，HP 48gII使用conn4x。原先HP 39gs使用的conn3x将不能继续用于连接HP 48gII，传输时一般使用`Xmodem Server`

## 更多请见

- [HP 39gs升级48gII](https://www.cncalc.org/thread-11475-1-1.html)
- [计算器百科](https://calcwiki.org)
- [cncalc](https://www.cncalc.org)
- [hpcalc](https://www.hpcalc.org/)
- [登月50年：计算器与计算器游戏发展简史](https://zhuanlan.zhihu.com/p/148392866)
