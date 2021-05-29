---
title: 修复 macOS 10.15.4 下部分软件「意外退出」
date: 2020-03-26 08:50:58
tags:
  - macOS
  - macOS Catalina
categories: 笔记
---

受影响的大多是破解软件,因为 Apple 在新系统中删除了 TNT 的证书

<!-- more -->

## 准备 Xcode IDE 的命令行工具

即 `Command Line Tools`
如果你已安装`Command Line Tools`或`Xcode`可以直接转到[给软件签名](#给软件签名)
如果有问题可以参考:

> [Installation notes for macOS Catalina (v10.15)](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md)

### 终端安装

打开`终端`,输入以下命令:

```sh
xcode-select --install
```

弹出安装窗口后选择`继续安装`

### 下载安装

打开[Apple Developer](https://developer.apple.com/download/more/)下载`Command Line Tools for Xcode`后安装
(可能需要登录 Apple ID)

### 在 App Store 安装完整 Xcode

不推荐,会占用很多磁盘空间
下载安装[这个 App](https://apps.apple.com/cn/app/xcode/id497799835)

## 给软件签名

### 在终端中手动签名

打开`终端`,输入以下命令:

```sh
sudo codesign --force --deep --sign - /PATH-TO-APP
```

当然你可以可以先输入:

```sh
sudo codesign --force --deep --sign -
```

(最后再打一个空格)

再打开`访达`,前往`应用程序`(⇧⌘A),将「意外退出」的软件拖入终端
回车 ↩,自信输入本地用户密码,再回车 ↩

- 如果看到输出为:

  ```text
  /PATH-TO-APP : replacing existing signature
  ```

  则成功

- 如果输出为:

  ```text
  /PATH-TO-APP : replacing existing signature
  /PATH-TO-APP : resource fork,Finder information,or similar detritus not allowed
  ```

  在`终端`执行

  ```sh
  xattr -cr /PATH-TO-APP
  ```

  再次执行

  ```sh
  sudo codesign --force --deep --sign - /PATH-TO-APP
  ```

### 使用`CodeSigner`给软件签名

懒得写,咕咕咕

## 仍然无法解决

可以试试关闭[`SIP`](https://en.wikipedia.org/wiki/System_Integrity_Protection)
再不行就坐等应用更新吧

### 10.15.4 目前不可用 APP

- Notability <= 4.2.1
- Paste <= 2.5.6 ( 官方版本 >=2.6.2 可用 )
