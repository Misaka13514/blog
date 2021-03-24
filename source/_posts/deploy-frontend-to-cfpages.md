---
title: Cloudflare Pages 配置方法与使用体验
date: 2021-03-23 22:43:52
tags:
  - Cloudflare
  - Cloudflare Pages
  - CI/CD
  - GitHub
  - Blog
  - Hexo
categories: 笔记
---

Cloudflare Pages 可以供前端开发人员协作和部署网站。

<!-- more -->

目前似乎已开放公测。

- [官方介绍](https://pages.cloudflare.com)
- [官方文档](https://developers.cloudflare.com/pages/)

我在一个月前就通过了申请，开始使用这一平台。

免费计划：

- 不能并行构建站点
- 每月最多构建 500 次
- 无站点数量限制
- 无请求数限制
- 无带宽限制

嗯，够用。

## 特点

- 网页性能较好
- 配置简单
- 开发环境与生产环境分离
- CI/CD 自动化
- 支持绑定多域名

## 使用时遇到的问题

- ~~创建项目无法删除~~
- ~~无法使用免费域名~~
- 必须使用 **GitHub 的**仓库
- 自动从所有分支构建，无法忽略部分分支
- 设置自定义域名后，不能设置访问默认域名后自动跳转自定义域名
- 不添加`Access-Control-Allow-Origin` header，可能造成跨域访问异常

## 开始使用

[点这里开始](https://dash.cloudflare.com/?to=/:account/pages)

- 如果没有 Cloudflare 帐号，你需要[注册一个](https://dash.cloudflare.com/sign-up)。
- 如果页面语言不符合你所需要的语言，可以在右上角切换。
- 目前只能从 GitHub 仓库源码构建页面，所以你需要一个放有项目源码的 GitHub 仓库，并同步更新修改。（可能需要 Git 基础）

注册后，你需要将 GitHub 全部仓库或部分仓库的访问权限授予 `Cloudflare Pages`。如果未来想修改，可以[在 GitHub 调整设置](https://github.com/settings/installations)。

## 配置

Cloudflare Pages 比较易于配置。由于以前有过[配置 CI/CD 的相关经验](/2020/github-actions-hexo/)，且[源码也已在 GitHub 上同步](https://github.com/Misaka13514/blog)，在配置上我没遇到什么问题。

较 GitHub Actions 相比，Cloudflare Pages 配置更简单一些（自由度也少一些）

打开[Cloudflare 网页 配置面板](https://dash.cloudflare.com/?to=/:account/pages)，在这里你可以查看和修改你目前的项目使用情况。

### 创建并配置一个新项目

点击`创建项目`，选取项目所在仓库。

然后设置构建和部署

- 给项目起一个名称

  如果与其它项目名不冲突，它将成为默认访问域名的一部分。即`*.pages.dev`

- 选择生产分支

  从这个分支获取的代码将会部署到生产环境，其它分支的代码将会部署到开发环境。

- 构建设置

  有许多默认预设可选。如果预设不起作用或是你使用特殊配置，需要手动配置。

  > 我使用最多的构建命令是`yarn build`和`npm run build`。使用最多的构建目录是`public`和`dist`。你可以先在本地测试。
  > 如果不需要构建过程，根目录就是要部署的网页：构建命令留空，构建目录设置为`/`

- 根目录、环境变量设置

  一般不需要设置，可以根据你的需求设置。

## 性能效果测试

我使用[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)来测试网页性能表现。

以下是我 blog 的测试成绩

| 连接方式 | 移动设备 | 桌面设备 |
| -- | -- | -- |
| GitHub Pages                  | 57       | 90       |
| GitHub Pages + Cloudflare CDN | 67       | 94       |
| Cloudflare Pages              | 58       | 93       |

未来可能会将 blog 迁移至 Cloudflare Pages，要是发现 blog 有什么异常欢迎联系我反馈。(◍•ᴗ•◍)❤
