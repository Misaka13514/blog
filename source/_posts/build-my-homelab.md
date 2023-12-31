---
title: 搭建 HomeLab
date: 2023-08-15 08:00:00
tags:
  - OpenWRT
  - Router
  - HomeLab
  - NAS
  - PVE
  - HP
  - Linux
categories: 技术向
---

我原先使用的 NAS 是黑群晖 DS120j （Marvell ARMADA A3720 1.0GHz 2xCortex-A53 + 512M DDR3L + 8G eMMC + 1TB HDD），原本的使用场景是轻度 PT 做种 + 小范围私人共享。随着我的 VPS 上运行了越来越多服务（bind、wireguard、zerotier、bird、nginx、v2ray、nonebot、gocqhttp、nazurin、rsstt...），我的小鸡要被榨干了，而今年 QQ 对 gocqhttp 的风控也更严格了，就想要把境内服务全部迁移到境内。起初我在我的黑群晖 NAS 上尝试使用 docker，虽然可以用，但由于 CPU 性能低经常满载，机械硬盘速度慢，重启一次 QQ 机器人的 docker 容器至少要半小时，而且由于是 arm 架构，需要不同的 docker 映像。家里也没其它设备可以换地方跑，把家里的电视盒子全拆了都没找到有适配 linux 固件的。加上原先我对黑群晖的一些套件也不满意（而不能通过 docker 绕过），就打算组装一台 HomeLab。

<!-- more -->

## 硬件

家里有一台 Dell Inspiron 3847，家人有时需要用，有时内存会接触不良，擦一次能好一段时间，我嫌弃它太旧了，就没有去用它。

考虑到我几乎天天都在家（自宅警備員），所以就没有去选带 IPMI 的服务器主板。过去一年我家没停过电，所以也没有买 UPS。由于预算并不多，我也放弃了 RAID，在一番搜索后决定抄[这个](https://youtu.be/_kPUygKeWKY)捡垃圾。

|             硬件              | 来源 | 价格（CNY） |       备注       |
| :---------------------------: | :--: | :---------: | :--------------: |
|    HP EliteDesk 800 G4 TWR    | 闲鱼 |     329     | 机箱、主板、电源 |
|        Intel i3-9100T         | 闲鱼 |     333     |       CPU        |
| Samsung DDR4 2666MHz 16G \* 2 | 淘宝 |     558     |       内存       |
|         WD SN550 500G         | 拆机 |   约 200    |     NVMe SSD     |
|     Samsung 750 EVO 120G      | 拆机 |    约 50    |     SATA SSD     |
|    Seagate ST1000DM003 1TB    | 拆机 |   约 100    |       HDD        |
|   Realtek RTL8125BG 2.5GbE    | 淘宝 |     39      |       网卡       |
|           购买合计            |      |    1259     |                  |
|           拆机合计            |      |   约 350    |                  |

考虑到扩展性买了全高机箱的版本。买的 unbuffered ECC 内存，但是 ECC 似乎不工作。

硬盘分别是从我的笔记本、Dell Inspiron 3847、旧的 NAS 里拆的，空间有点小但我没有仓鼠症所以还算够用，晚点有需要再加硬盘。

750 EVO 原定作用是给机械硬盘当缓存，但我没计算固态硬盘的写入寿命，在开始运行的三个月内健康度掉了 30 后我把它拆掉了（感觉对性能影响不大）。

> [HP EliteDesk 800 G4 Tower Specifications](https://support.hp.com/us-en/document/c06051414)

![装机](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/build-my-homelab/installation.jpg)

## 软件

![TrueNAS SCALE](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/build-my-homelab/truenas.jpg)

我先尝试了 [TrueNAS SCALE](https://www.truenas.com/truenas-scale/)，我没有用过这个系统，预想中用它来做 NAS 的话可以免去虚拟化开销。在最初不清楚几个盘如何规划的情况下我重装了好几次，默认安装方案启动盘会有很多空间被浪费，我使用了[这个教程](https://www.reddit.com/r/truenas/comments/lgf75w/scalehowto_split_ssd_during_installation/)中提到的方法绕过了这个限制试用了一段时间，发现可配置项很多，如果自己一个人用的话应该玩法有很多。我最终没有使用这个系统的原因是对于小范围私人共享的场景，它并不是很合适。它没有普通用户界面、文件权限难以精细控制、WebDAV 鉴权不使用 PAM、WebDAV 和 SMB 似乎不能同时在相同的文件上启用。

我再考虑了 Arch 或 Debian 的 DIY 方案，但我认为我不会有足够精力去维护这样的系统，NixOS 的方案虽然 SHLUG 有人在用但我并不熟悉配置所以也放弃了。我需要的是一个面向网络控制的操作系统，根据网上的说法 VMware ESXi 对非服务器硬件支持不够好，最终我选择了 Proxmox VE。

PVE 的使用可以看 [MiaoTony 师傅的小窝](https://miaotony.xyz/2022/12/18/Server_HomeLab_1_PVEsetup/)，我会跳过配置过程的说明。

IOMMU 的部分同时适当参考了 [PCI passthrough via OVMF - ArchWiki](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF)

- [硬盘直通](https://foxi.buduanwang.vip/virtualization/1754.html/)，我采用了 SATA 控制器直通的方式。
- [显卡直通](https://3os.org/infrastructure/proxmox/gpu-passthrough/gpu-passthrough-to-vm/)，我试了可用，但我不喜欢维护媒体库，觉得挂载打开文件夹简单直接，就几乎不用显卡。

```sh
# ./iommu_check.sh
IOMMU Group 0:
        00:02.0 VGA compatible controller [0300]: Intel Corporation CoffeeLake-S GT2 [UHD Graphics 630] [8086:3e91]
IOMMU Group 1:
        00:00.0 Host bridge [0600]: Intel Corporation 8th Gen Core 4-core Desktop Processor Host Bridge/DRAM Registers [Coffee Lake S] [8086:3e1f] (rev 08)
IOMMU Group 2:
        00:12.0 Signal processing controller [1180]: Intel Corporation Cannon Lake PCH Thermal Controller [8086:a379] (rev 10)
IOMMU Group 3:
        00:14.0 USB controller [0c03]: Intel Corporation Cannon Lake PCH USB 3.1 xHCI Host Controller [8086:a36d] (rev 10)
        00:14.2 RAM memory [0500]: Intel Corporation Cannon Lake PCH Shared SRAM [8086:a36f] (rev 10)
IOMMU Group 4:
        00:17.0 SATA controller [0106]: Intel Corporation Cannon Lake PCH SATA AHCI Controller [8086:a352] (rev 10)
IOMMU Group 5:
        00:1b.0 PCI bridge [0604]: Intel Corporation Cannon Lake PCH PCI Express Root Port #21 [8086:a32c] (rev f0)
IOMMU Group 6:
        00:1c.0 PCI bridge [0604]: Intel Corporation Cannon Lake PCH PCI Express Root Port #7 [8086:a33e] (rev f0)
IOMMU Group 7:
        00:1f.0 ISA bridge [0601]: Intel Corporation Q370 Chipset LPC/eSPI Controller [8086:a306] (rev 10)
        00:1f.3 Audio device [0403]: Intel Corporation Cannon Lake PCH cAVS [8086:a348] (rev 10)
        00:1f.4 SMBus [0c05]: Intel Corporation Cannon Lake PCH SMBus Controller [8086:a323] (rev 10)
        00:1f.5 Serial bus controller [0c80]: Intel Corporation Cannon Lake PCH SPI Controller [8086:a324] (rev 10)
        00:1f.6 Ethernet controller [0200]: Intel Corporation Ethernet Connection (7) I219-LM [8086:15bb] (rev 10)
IOMMU Group 8:
        01:00.0 Non-Volatile memory controller [0108]: Sandisk Corp WD Green SN350 NVMe SSD 240GB (DRAM-less) [15b7:5019] (rev 01)
IOMMU Group 9:
        02:00.0 Ethernet controller [0200]: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller [10ec:8125] (rev 05)
```

![虚拟机](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/build-my-homelab/pve-vm.png)

常开虚拟机：

- 用 RR (arpl-i18n) 引导的黑群晖（可惜这个引导删库了）
- Debian LXC，用来跑 docker-compose 的一些服务

非常开虚拟机：

- Debian LXC，用来跑 MCSM 面板和 MC 服务器
- Arch LXC，装了 Xfce，用来跑不容易使用直链的离线下载（比如 Telegram Desktop）

实验用：

- NixOS，原来计划做第二桌面机器，搁置，显卡可以输出到 VGA
- Windows To Go，仅在插入外部系统盘时可以启动，原来计划做第二桌面机器，搁置，不知道为什么显卡不能输出到 VGA

![PVE](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/build-my-homelab/pve.png)

就我的日常使用场景来说性能是足够的

![DSM](https://cdn.jsdelivr.net/gh/Misaka13514/asset@main/blog/_posts/build-my-homelab/dsm.png)

## 服务

- qBittorrent PT 做种、RSS 追番
- Nonebot+go-cqhttp QQ 机器人
- acme.sh 证书续签，虽然安装证书的部分还没做到 100% 全自动安装
- syncplay 同步播放服务端
- v2ray 回国代理
- jitsi-meet 网页版会议，给同学用一些同学说 HTTP 能打开但是 UDP 连不上（另一些同学没问题），关了
- hentai@home 想要的 perk 都拿了，关了
- MC 服务器，没人玩，关了
- 一些自动签到脚本

以后也许想运行的服务

- OpenWebRX
- self-hosted ci runners
- 内网穿透服务器

~~All in boom~~

## 网络

我的笔记本有 2.5G 网口，但我家的路由器还只是 1G 的网口，升级路由器或再买交换机成本较高，就暂时插了一张 2.5G 的网卡，和板载网卡一起连到 PVE 的虚拟网桥，并开启转发，让 HomeLab 和笔记本共享一根超五类埋墙线。（主路由-(1G)-AP-(1G)-HomeLab-(2.5G)-笔记本）

板载 1G 网卡 I219-LM 有时会出现 `e1000e Detected Hardware Unit Hang`，使用网上的解决方法关闭 TSO GSO 后修复。

```sh
# cat /etc/network/interfaces
auto lo
iface lo inet loopback

iface eno1 inet manual
        post-up /usr/bin/logger -p debug -t ifup "Disabling segmentation offload for eno1" && /sbin/ethtool -K $IFACE tso off gso off && /usr/bin/logger -p debug -t ifup "Disabled offload for eno1"

iface enp2s0 inet manual

auto vmbr0
iface vmbr0 inet static
        address 192.168.10.50/24
        gateway 192.168.10.1
        bridge-ports eno1 enp2s0
        bridge-stp off
        bridge-fd 0
```

虽然除了测速我的实际使用过程中从没跑满这 2.5G 过（）

好的使用体验离不开好的路由。我家在用上海电信的宽带。有公网 IPv4 但是 IPv6 不通，因为家人要看 IPTV 所以光猫是路由模式。为了透明代理使用了[二级路由 AX3600 ShellClash](https://blog.atri.tk/2020/ax3600-ssh-clash/)。以前我内网用 IP，外网用 DDNS 的域名，端口转发规则要用电信的那个智障 APP 配置。

我想要路由器劫持 DNS 的同时有一些自定义规则的功能，但是发现 hosts 仅在 ShellClash 关闭时起作用，我也尝试了修改 Clash 配置文件但是没有成功。以前刷过 Openwrt QSDK 的固件但家人认为那个固件性能和信号不好。

之所以不使用 HomeLab 作为软路由主要是因为其体积过大，不适合放在弱电柜，还有我并不希望在我 HomeLab 创飞的时候没有在线文档可以看 ~~让全家和我的 HomeLab 陪葬（x）~~ 在看完网上的软路由测评后，我确认了 [NanoPi R2S](https://wiki.friendlyelec.com/wiki/index.php/NanoPi_R2S) 性能刚好够用、软件完善、价格在我可以接受的范围，就买了一个。

因为我还有其它的一些想法想实现，就将其作为了主路由（而不是旁路由）。AX3600 开启有线中继模式，作为带有无线功能的交换机，保证了内网访问 NAS 时大量数据传输不需要通过软路由来交换，刷了国际版固件养老。

修改前：

- 光猫（192.168.1.1/24）
  - IPTV
  - NAS
  - AX3600（192.168.31.1/24）
    - 笔记本
    - 手机及其它大部分设备

修改后：

- 光猫（192.168.1.1/24）
  - IPTV
  - NanoPi R2S（192.168.10.1/24）
    - AX3600（无线 AP）
      - 笔记本（无线）
      - 手机及其它大部分设备
      - NAS（虚拟网桥）
        - 笔记本（有线）

我选择了 [ImmortalWrt](https://github.com/immortalwrt/immortalwrt) 系统。

安装的软件有（虽然不是每个都用的上）：

```text
bash bird2 bird2c ca-certificates collectd-mod-ethstat collectd-mod-ipstatistics collectd-mod-irq collectd-mod-load collectd-mod-ping collectd-mod-sqm collectd-mod-thermal curl ddns-scripts ddns-scripts-cloudflare diffutils drill htop hysteria iftop losetup luci-app-ddns luci-app-passwall luci-app-statistics luci-app-upnp luci-app-wireguard luci-i18n-ddns-zh-cn luci-i18n-passwall-zh-cn luci-i18n-statistics-zh-cn luci-i18n-upnp-zh-cn luci-i18n-wireguard-zh-cn luci-proto-wireguard mtr ncdu openssh-sftp-server parted python3 resize2fs rsync screen tcpdump tree trojan-go vim-fuller wget wireguard-tools zerotier
```

我的需求是：对于常用用户应用，公网内网同域名 HTTPS 直接访问；对于管理员应用，公网使用 VPN 达到与内网近似或同等访问。

对于第一个需求 IPv4 和 IPv6 的配置方法很不相同（IPv6 不需要端口转发但是需要正确的 IP），因为我家还不通 IPv6 就只按照 IPv4 端口转发来配置。不是清楚双栈的配置方法，需要群友指导。

配置 DNS 和 Dnsmasq，公网使用通配符域名+DDNS，内网配置本地域名。[配置 HTTPS](https://openwrt.org/docs/guide-user/luci/getting_rid_of_luci_https_certificate_warnings#option_ainstalling_a_publicly_trusted_certificate)，acme.sh 配合 DNS 签三个月有效期的通配符证书。配置反向代理。虽然自用的话自签证书更方便，但我也要运行一部分公网服务，就用 acme 签了。

通过 zerotier 和 bird 接入了 DN42，此前没有在 DN42 中尝试过较为复杂的内网，在实践中体验到了 IPv6 的不同之处（按我传统的思维笔记本能连通路由器，路由器能连通 DN42 中某个地址->我能连通 DN42 中的那个地址，但实际上不是这样，我需要宣告我的路由使得回程包能被接收。对于 IPv4，通常路由器上使用了 IP 动态伪装（Masquerading））

好在这不算特别难配置，我直接宣告了给我家中内网使用的一整段 IPv6 路由

```bird
protocol static {
    ipv6;
    route fdbd:8e82:8b88:1000::/56 via fdbd:8e82:8b88::3;
}
```

然后发现需要微调对端模板中的`import filter`以让这个路由通过检查被导入（再宣告出去）。不知道有没有更好的做法。

配置 Dnsmasq，关闭重绑定保护以允许 RFC1918 地址的上游响应，配置 [DN42 相关的 DNS 转发](https://wiki.dn42.us/services/dns/Configuration#forwarder-setup_dnsmasq)。

对于第二个需求，在 zerotier 控制面板添加路由 `192.168.10.1/24 via 172.23.10.3`。使用 VPN 时同时指定 DNS 服务器为 `172.23.10.3` 以得到内网 IP。

## 总结

这篇文章咕咕好久了，也许是因为直到现在这个方案都还不够完美吧 ~~（就是拖延症）~~。尽管我每月会维护一次 HomeLab（更新、清理防尘板），目前的不足还是很明显的：

- 伴随着向公网公开服务带来的安全风险，不可被攻破的系统并不存在，我拿漏扫扫完发现在软路由上报告了一些漏洞。我使用强密码规则、强制 ssh 使用密钥，但是没有有效的入侵检测记录（除了群晖自带日志）
- 日志、管理不统一。容器日志几乎不看，容器停止或者无限重启的情况也发生过。
- 配置文件零散，难以重建（例如我给每个虚拟机都要配一遍 ssh 密钥和 ssh 配置）
- 数据几乎没有备份

如果你有任何建议，欢迎联系我或在下方评论。
