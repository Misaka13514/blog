---
title: 修复macOS 10.15.4下部分软件「意外退出」
date: 2020-03-26 08:50:58
tags:
- macOS
- Catalina
categories: 技术向
---
受影响的大多是破解软件,因为Apple在新系统中删除了TNT的证书
<!-- more -->

## 准备Xcode IDE的命令行工具

即 `Command Line Tools`
如果你已安装`Command Line Tools`或`Xcode`可以直接转到[给软件签名](#给软件签名)
如果有问题可以参考:

> [Installation notes for macOS Catalina (v10.15)](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md)

### 终端安装

打开`终端`,输入以下命令:

```bash
xcode-select --install
```

弹出安装窗口后选择`继续安装`

### 下载安装

打开[Apple Developer](https://developer.apple.com/download/more/)下载`Command Line Tools for Xcode`后安装
(可能需要登录Apple ID)

### 在App Store安装完整Xcode

不推荐,会占用很多磁盘空间
下载安装[这个App](https://apps.apple.com/cn/app/xcode/id497799835)

## 给软件签名

### 在终端中手动签名

打开`终端`,输入以下命令:

```bash
sudo codesign --force --deep --sign - /PATH-TO-APP
```

当然你可以可以先输入:

```bash
sudo codesign --force --deep --sign -
```

(最后再打一个空格)

再打开`访达`,前往`应用程序`(⇧⌘A),将「意外退出」的软件拖入终端
回车↩,自信输入本地用户密码,再回车↩

* 如果看到输出为:

  ```text
  /PATH-TO-APP : replacing existing signature
  ```

  则成功

* 如果输出为:

  ```text
  /PATH-TO-APP : replacing existing signature
  /PATH-TO-APP : resource fork,Finder information,or similar detritus not allowed
  ```

  在`终端`执行

  ```bash
  xattr -cr /PATH-TO-APP
  ```

  再次执行

  ```bash
  sudo codesign --force --deep --sign - /PATH-TO-APP
  ```

### 使用`CodeSigner`给软件签名

懒得写,咕咕咕

## 仍然无法解决

可以试试关闭[`SIP`](https://en.wikipedia.org/wiki/System_Integrity_Protection)
再不行就坐等应用更新吧

### 10.15.4 目前不可用 APP

* Notability <= 4.2.1
* Paste <= 2.5.6 ( 官方版本 >=2.6.2 可用 )
