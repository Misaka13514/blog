---
title: 为 PGP Key 部署 Web Key Directory (WKD) 托管
date: 2021-05-20 12:44:41
tags:
  - PGP
  - GnuPG
  - Security
  - Web
  - GitHub
  - GitHub Pages
  - Asymmetric cryptography
categories: 技术向
---

你现在可以快速地通过我的域名邮箱`admin@apeiria.net`来自动获取我的 PGP 公钥。

```sh
gpg --locate-key admin@apeiria.net
```

<!-- more -->

## 起因

前些日子想把原来的 RSA 公钥全部更换为 ECC 公钥，便重新生成了新的主密钥。

```sh
$ gpg --list-keys C4B71F9ED3515AEB8270D5D7189BB387CF3AD95F
pub   ed25519 2021-05-15 [C] [expires: 2024-01-01]
      C4B71F9ED3515AEB8270D5D7189BB387CF3AD95F
uid           [ultimate] 欠陥電気RadioNoise (御坂13514号のECC鍵) <Misaka13514@gmail.com>
uid           [ultimate] Misaka13514 <Misaka13514@gmail.com>
uid           [ultimate] Misaka <admin@apeiria.net>
sub   ed25519 2021-05-16 [S] [expires: 2024-01-01]
sub   ed25519 2021-05-16 [A] [expires: 2024-01-01]
sub   cv25519 2021-05-16 [E] [expires: 2024-01-01]
```

生成完就需要发布公钥供他人交换。以前我使用的是公钥服务器+在网页或其它平台发布公钥的下载链接或是公钥指纹的最后几位。

假设有一个人只有我的邮箱信息而想要给我发送加密邮件，一般来说有这些交换方法，它们似乎仍不够快速或是不够安全。

- 面对面交换显然太繁琐了。
- `gpg --recv-keys`只能通过指纹从公钥服务器获取公钥。使用这个命令需要先通过其它途径知道正确的指纹。
- 如果发布到 Web 或是 代码仓库 ，需要先在网页上查找到对应 URL 并下载。
- 看见有人使用特殊方法生成了带有靓号指纹的密钥。碰撞出相同一部分指纹的密钥是有可能做到的。
  （建议公开至少 64bit (16 位 16 进制)的指纹）
- `gpg --search-keys`可以通过邮箱在公钥服务器搜索与下载。但公钥服务器接受任何人上传的公钥，任何人可以生成含有我的邮箱标识的密钥并发布。
  （现在如`keys.openpgp.org`等服务器会在上传公钥后向对应邮箱发送验证邮件来验证身份）

正如 IPv6 与 DNS 那样，有一个靓号不如配置了方便有效的交换方式。

于是我寻找了其他发布公钥的途径，有`DNS CERT`、`DANE`、`Web Key Directory (wkd)`、`LDAP`、`NTDS`等。关于这些方法的说明可以`man gpg`或是在[GPG 文档](https://www.gnupg.org/documentation/manuals/gnupg/GPG-Configuration-Options.html)中看到。

我选择了`Web Key Directory (wkd)`方法，它也是默认启用的除本地外的唯一一种方法。下面将以我的密钥为例，自己部署 WKD。你也可以使用在自己域名上[使用第三方提供的服务](#使用第三方服务)。如果你使用的邮箱的域名已经[提供了这样的服务](https://wiki.gnupg.org/WKD#Mail_Service_Providers_offering_WKD)，你可以跳过下面的步骤。

## 自己部署

### 条件

- 有可以修改记录的域名
  需要修改 apex 顶级域名或是 openpgpkey 子域名记录
- 使用该域名邮箱
- 有可使用的网页服务器或可信的第三方托管服务
- GPG 版本 >= 2.2.12 （或自行查看[官方文档](https://wiki.gnupg.org/WKDHosting)中的其他可用客户端）

### 创建 WKD 文件夹

创建一个文件夹，并作为`openpgpkey.your.domain`的站点根目录。然后创建 WKD 的目录结构。

下面的部分命令需要根据你的情况来修改。

```sh
$ mkdir openpgpkey-WKD && cd openpgpkey-WKD
$ mkdir -p .well-known/openpgpkey
$ cd .well-known
$ gpg --list-options show-only-fpr-mbox -k "@your.domain" | $(gpgconf --list-dirs libexecdir)/gpg-wks-client -v --install-key
#如果需要，也可以替换为指定单个 Key
$ cd ..
```

输出将会类似这样

```text
gpg-wks-client: gpg: Total number processed: 1
gpg-wks-client: using key with user id 'Misaka <admin@apeiria.net>'
gpg-wks-client: gpg: Total number processed: 1
gpg-wks-client: directory 'openpgpkey/apeiria.net' created
gpg-wks-client: directory 'openpgpkey/apeiria.net/hu' created
gpg-wks-client: policy file 'openpgpkey/apeiria.net/policy' created
gpg-wks-client: key C4B71F9ED3515AEB8270D5D7189BB387CF3AD95F published for 'admin@apeiria.net'
```

站点目录结构将会类似这样

```text
$ tree -a
.
`-- openpgpkey
    `-- apeiria.net
        |-- hu
        |   `-- 4y36rkzdjnzmk3oxaekyi5biowgr5kcz
        `-- policy
```

### 在 GitHub Pages 上发布

你也可以使用其它任何你喜爱的 Web 托管方式。

在 GitHub 上创建一个公开仓库。

{% note info %}
[GitHub Pages 默认启用了 Jekyll](https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)，而它默认不会构建开头为`.`的文件夹，所以需要额外的配置。

可以通过在根目录创建`.nojekyll`文件以直接禁用 Jekyll；也可以创建一个配置文件`_config.yml`，并写入`include: [".well-known"]`。
{% endnote %}

```sh
$ touch .nojekyll
$ echo "openpgpkey.your.domain" > CNAME
$ git init && git add . && git commit -m "Initial commit"
Initialized empty Git repository in ~/openpgpkey-WKD/.git/
[main (root-commit) 114514 ] Initial commit
 3 files changed, 3 insertions(+)
 create mode 100644 .well-known/openpgpkey/your.domain/hu/1145141919810aaaaaa
 create mode 100644 .well-known/openpgpkey/your.domain/policy
 create mode 100644 CNAME
$ git remote add origin your-url
$ git push -u origin your-branch-name
```

将域名记录按照 GitHub 文档指向 GitHub Pages，然后到 GitHub 上启用 GitHub Pages，可以访问对应 URL 查看是否生效。

## 使用第三方服务

部分网站如[keys.openpgp.org](https://keys.openpgp.org/about/usage)提供了 WKD as a Service 的服务。

在网站上上传自己的公钥后，就可以使用它提供的服务了。

只需添加这样一条`CNAME`记录：将`openpgpkey.your.domain`指向`wkd.keys.openpgp.org`。

## 测试

```sh
$ gpg --no-default-keyring --keyring /tmp/gpg-$$ \
    --auto-key-locate clear,wkd,nodefault --verbose --locate-key you@your.domain
gpg: key 189BB387CF3AD95F: public key "Misaka <admin@apeiria.net>" imported
gpg: Total number processed: 1
gpg:               imported: 1
pub   ed25519 2021-05-15 [C] [expires: 2024-01-01]
      C4B71F9ED3515AEB8270D5D7189BB387CF3AD95F
uid           [ unknown] Misaka <admin@apeiria.net>
sub   ed25519 2021-05-16 [S] [expires: 2024-01-01]
sub   ed25519 2021-05-16 [A] [expires: 2024-01-01]
sub   cv25519 2021-05-16 [E] [expires: 2024-01-01]
```

## 推荐阅读

2021 年，用更现代的方法使用 PGP by [UlyC](https://ulyc.github.io/)

1. [PGP 基础](https://ulyc.github.io/2021/01/13/2021年-用更现代的方法使用PGP-上/)
2. [安全使用](https://ulyc.github.io/2021/01/18/2021年-用更现代的方法使用PGP-中/)
3. [公钥的发布与交换](https://ulyc.github.io/2021/01/26/2021年-用更现代的方法使用PGP-下/)

## 参考

- [Web Key Directory](https://wiki.gnupg.org/WKD)
- [Hosting a Web Key Directory (without dynamic WKS)](https://wiki.gnupg.org/WKDHosting)
- [Hosting a Web Key Directory](https://gnupg.org/blog/20161027-hosting-a-web-key-directory.html)
- [Hosting a Web Key Directory on GitHub Pages](https://github.com/mihalyr/openpgpkey)
- [GPG Configuration Options](https://www.gnupg.org/documentation/manuals/gnupg/GPG-Configuration-Options.html)
