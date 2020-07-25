---
title: 玩Arduino开发板
date: 2020-06-13 10:19:21
tags:
- Arduino
- esp8266
- AVR
- Atmel
categories: 摸鱼
---

在学校科技节比赛中稍稍玩了会Arduino

<!-- more -->

以前在淘宝买过一个摇摇棒套件，用的单片机是Atmel的AT89S52，大致的原理是当晃动开关连通后延时控制发光二极管的亮暗，达到显示文字/图案的效果，按按钮可以切换存储的多套文字/图案。电路是卖家设计的，程序给了个模版。

修改程序先用字模软件生成阴码/阳码，放到程序中后用Keil软件通过ISP串口烧写。

相较于那个套件，这次比赛中使用的Arduino开发版就显得简单些了。

## 关于比赛

### 介绍

设计一个十字路口，搭建交通灯系统，可以有自己的创新

### 材料

硬件：

* Arduino MEGA 2560 开发板
* Arduino MEGA 2560 扩展板
* TM1637 数码管
* LED灯
* 杜邦线
* esp8266 (自己加的)

软件：

* [Mixly](http://mixly.org/) For Windows
* 代码模版
* 连接教程、效果示例视频
* [Arduino](https://www.arduino.cc/) (要什么Mixly，Arduino不香吗)

## 部分代码实现及介绍

### Arduino MEGA 2560

```arduino
#include <TM1637.h>            //使用Grove4Display的库
TM1637 digit1(CLK,DIO);        //设置数码管管脚
digit1.init();                 //初始化数码管digit1
digit1.set(BRIGHT_TYPICAL);    //数码管设置亮度
digit1.display(0-3,0-9);       //使某位显示数字
pinMode(R/Y/G, OUTPUT);        //设置输出管脚
digitalWrite(R/Y/G,HIGH/LOW);  //使R/Y/G 亮/暗
Serial.begin(115200);          //使用串口通信 速率115200
```

基本就这些，再加几个判断和循环就没问题

### Esp8266

```arduino
#include <ESP8266WiFi.h>
#define APSSID "SSID"          //设置无线接入点名称
#define APPSK "password"       //设置无线接入点密码
#include <ESP8266WebServer.h>
ESP8266WebServer server(80);   //Web服务器在80端口运行
Serial.begin(115200);          //使用串口通信 速率115200

//设置Web服务器路径及相应内容
server.on("/", []() {
server.send(200, "text/html", "<h1>Traffic Light</h1><br /><a href=\"/ns\">Turn N-S to green</a><br /><a href=\"/we\">Turn W-E to green</a><br />");
});

server.on("/ns", []() {
server.send(200, "text/plain", "N-S turned to green");
Serial.print("NS");
});

server.on("/we", []() {
server.send(200, "text/plain", "W-E turned to green");
Serial.print("WE");
});

server.begin();                //启动Web服务器
server.handleClient();
```

它在这次的作品中通过串口与Arduino MEGA 2560建立数据连接，通过Wi-Fi与控制端建立数据连接，起到无线控制的作用。

![Arduino MEGA 2560 连接 esp8266](ESP.webp)

P.S.:为什么我会买这块Esp8266呢？

Jimmy Tian在他的视频中介绍过它：

[【百元科技神器-01】如何「黑」掉你学校的指纹考勤机？](https://www.bilibili.com/video/BV1sx411m7xq) by [Jimmy Tian](https://www.jimmytian.com/)

我觉得比较有意思、价格也很亲民就买了(NodeMcu版本的便于开发，如果仅买一小块Esp8266也能用)

~~年轻人的第一块Wi-Fi模块~~

体验了一下这个固件，对于2.4Ghz的Wi-Fi来说deauth攻击的效果明显、且便于携带隐藏，但esp8266不支持工作在5Ghz，退一步讲就算它支持5Ghz，原先的攻击方式起不了作用，目前似乎也没有对5Ghz较为有效的deauth攻击方式

## 写在后面

![Arduino Uno](UNO.webp)

在另一个比赛中摸过Arduino Uno、PS 2手柄及接收模块，也是挺好玩的

以前玩的比赛我都用的是[能力风暴](http://www.abilix.com/)的机器人，这次玩的Arduino能实现的功能要比它多，但相对的编写调试甚至于上传程序，Arduino都要比它麻烦一些
