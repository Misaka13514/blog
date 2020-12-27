---
title: 删除 Win10 中不再使用的或重复的网络
date: 2020-12-24 22:17:15
tags:
- Windows
- Windows 10
- Network
categories: 笔记
author: <a href="https://nekosc.com/technology/win_ssid_number.html" target="_blank" rel="external noopenner nofollow">零件</a> 欠陥電気使用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" rel="noopener" target="_blank" data-pjax-state=""><i class="fab fa-fw fa-creative-commons"></i>BY-NC-SA 4.0</a>许可协议转载并修改增加了部分内容
---

Win 8 及 Win 10 重置路由器（或更换）后，再次连接路由器（还是原SSID的情况下）鼠标悬停右下角网络图标，显示的网络名称后边会跟一个数字，比如 `SSID 2` 或 `网络 2`，那么如何删除这个数字呢？
<!-- more -->

这个问题有多种方法可以解决

{% note info %}
删除配置后，如果再次连接需要输入密码
{% endnote %}

{% note warning %}
如果你曾经连接过很多网络，可能会有很多数据，一定要看清楚再删除！

在操作过程中可能需要`Administrator`权限
{% endnote %}

## 使用「设置」应用

在开始菜单中打开设置，进入`网络和Internet`，选择`Wi-Fi`

![Wi-Fi](Settings-Network.png)

点击管理已保存的网络，找到需要删除的网络配置删除即可

![管理已保存的网络](Settings-Network-Forget.png)

## 使用命令行

如果你正在远程操作一台服务器或是习惯命令行的操作方式，这种方法会更快捷。

右键`Windows徽标`（快捷键：`Win`+`X`），选择`命令提示符（管理员）`或`Powershell（管理员）`

输入：

```shell
netsh wlan show profiles #显示网络配置
netsh wlan show all      #我 全 都 要
```

![显示网络配置](netsh-show.png)

> `Profiles on interface *Wi-Fi*`

其中的`*Wi-Fi*`是网络接口名称，不同设备可能显示结果不同

找到要删除的配置名称`*Network*`

使用以下命令删除

```shell
netsh wlan delete profile name="*Network*" interface="*Wi-Fi*"
```

![删除网络配置](netsh-delete.png)

显示已删除，再次查看网络配置，发现删除成功

## 使用「注册表编辑器」

以上方法可能并不能成功找到所有的配置，而使用「注册表编辑器」是一个彻底的方法。

右键`Windows徽标`（快捷键：`Win`+`X`），选择`运行`
（快捷键：`Win`+`R`）

输入`regedit`打开注册表编辑器，找到如下路径:

```text
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Profiles
```

删除掉相关的注册子键，如图所示:

![注册子键](regedit.png)

然后在控制面板（`Win`+`R`, control）中禁用再启用网卡即可。

## 参考资料

- [Remove the “2” after the SSID on Windows 8.0
](https://superuser.com/questions/850438/remove-the-2-after-the-ssid-on-windows-8-0)
