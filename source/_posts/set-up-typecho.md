---
title: 搭建Typecho
date: 2020-04-26 08:31:08
tags:
- Blog
- Typecho
- Linux
- PHP
- Nginx
- MySQL
- IaaS
categories: 笔记
---
搭建配置及自定义一个Typecho站点
<!-- more -->
--> [安言的个人博客](https://anyan.ml) <--
来玩呀(编者不是我哦)

~~Kora! 我一个搭了那么久的blog还没搭了几天的blog热闹~~

我的blog运行在PaaS,这次搭建的Typecho运行在IaaS
VPS来自我的GCP(2020.4)

## 免费域名申请

> [Freenom](https://www.freenom.com)

## 搭建Typecho

先是直接装一套LNMP,安装替代产品也行

> [开始安装 - Typecho文档站点](http://docs.typecho.org/install)

下载Typecho放网站目录,访问即可配置

数据库可以提前创建

## 自定义Typecho

### 伪静态

Nginx配置文件:

```nginx
if (!-e $request_filename) {
    rewrite ^(.*)$ /index.php$1 last;
}
```

然后在Typecho后台-设置-永久链接
启用地址重写功能

### 使用一言API

在页脚显示一句话

[使用示例 - 一言开发者中心](https://developer.hitokoto.cn/sentence/)
Hexo 用户可以看看: [为您的Hexo博客添加Hitokoto一言功能](https://blog.bill.moe/add-hitokoto/)

~~复制粘贴不就好?~~

在`header.php`中加入

```html
<script>
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.getElementById('hitokoto')
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)
</script>
```

在页脚加入

```html
<p id="hitokoto">:D 获取中...</p>
```

为了防止[跨域访问](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)出错,在Nginx配置中加入

```nginx
location / {
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
if ($request_method = 'OPTIONS') {
    return 204;
}
```

这个问题也能使用反向代理的方法来解决

## 写在后面

至此目前的修改就基本都在这了
以后的更改再回来更新
