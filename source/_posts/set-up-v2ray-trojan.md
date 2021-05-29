---
title: 搭建 V2Ray 和 Trojan
date: 2020-03-04 23:47:32
tags:
  - Linux
  - V2Ray
  - Trojan
  - GFW
  - Proxy
  - Nginx
  - Caddy
  - HaProxy
  - IaaS
categories: 笔记
---

最近把 SSR 改成了 v2ray,顺便把 blog 从 VPS 转到了 GitHub Pages

<!-- more -->
{% note warning %}
本文已过期，请移步至官方文档。
{% endnote %}

自从 2019 年成功办完[中国银行长城跨境通卡](https://poplite.xyz/post/2018/03/05/boc-debit-card-guide-for-online-payment.html),并成功白嫖了 1 年的 GCP 后,我先搭建的是 SSR,不久后又安装了 nginx 来显示我的 blog.

可是这 nginx 又不好配,更新 blog 也不方便,SSR 又不抗封,就产生了前文所说的改动的想法.

~~复读机又上线了~~

## 参考文章

### GitHub Pages 启用自定义域名并开启 SSL

> - [为 Hexo 博客配置上 HTTPS](https://hex.moe/p/f17d42de/)
> - [GitHub Pages 开始为自定义域名提供 HTTPS 支持（附启用方法）](https://poplite.xyz/post/2018/05/03/how-to-enable-https-for-custom-domain-on-github-pages.html)

### 搭建 V2Ray/Trojan

#### V2Ray+TLS

- +WebSocket+Web(Nginx):
  > [V2Ray 进阶配置 WebSocket+TLS+Nginx](https://web.archive.org/web/20200414052340/https://www.ecsoe.com/archives/38.html)
  > 使用人数多,兼容性好
- +HTTP/2+Web(Caddy):
  > [HTTP/2+TLS+WEB | 新 V2Ray 白话文指南](https://guide.v2fly.org/advanced/h2_tls_web.html)
- +TCP+HaProxy+Web:
  > [TCP + TLS + Web | 新 V2Ray 白话文指南](https://guide.v2fly.org/advanced/tcp_tls_web.html)
- +DomainSocket+HaProxy+Web:
  > [HaProxy 通过 Domain Socket 与 V2Ray 通讯](https://gist.github.com/liberal-boy/b2d5597285b4202b6d607faaa1078d27)

#### Trojan

> 直接一键脚本,舒适

## 实战搭建 V2Ray+WebSocket+TLS+Nginx

**建议搭建前检查自己的客户端是否支持**
~~照着文档装就行了~~

再装个 BBR 等基本就没问题了

上述文章均能与部分网页共存(通过转发)

部分网页可能转发不正确/不完整(比如 Trojan+Typecho 登录好像会有问题)
