# Cursor, Windsurf & Augment Host Configuration Generator

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 简介

这是一个用于生成 hosts 文件配置的工具，可以帮助用户更快地连接到 Cursor、Windsurf 和 Augment 服务。该工具会实时获取各个域名的 IP 地址，并自动生成格式化的 hosts 文件内容，用户可以一键复制并添加到自己的系统 hosts 文件中。

## 功能特点

- **实时 IP 解析**：动态获取所有域名的最新 IP 地址
- **分类显示**：将域名按照服务类型（Cursor、Windsurf、Augment）分组显示
- **一键复制**：快速复制生成的 hosts 配置内容
- **自动刷新**：每 15 分钟自动刷新一次 IP 地址
- **响应式设计**：适配各种设备屏幕大小
- **状态指示**：清晰显示每个域名的解析状态

## 支持的域名

### Cursor 域名
- api2.cursor.sh
- api3.cursor.sh
- repo42.cursor.sh
- api4.cursor.sh
- us-only.gcpp.cursor.sh
- marketplace.cursorapi.com
- cursor-cdn.com
- download.todesktop.com

### Windsurf 域名
- codeium.com
- server.codeium.com

### Augment 域名
- i1.api.augmentcode.com
- augmentcode.com

## 源码目录结构

```
├── public/                 # 静态资源目录
│   ├── favicon.svg        # 网站图标
│   ├── cursor-host-icon.svg # 应用图标
│   ├── cursor-host-social.png # 社交媒体预览图
│   ├── index.html         # HTML 入口文件
│   ├── manifest.json      # PWA 配置文件
│   ├── robots.txt         # 搜索引擎爬虫指引文件
│   └── sitemap.xml        # 网站地图
│
├── src/                   # 源代码目录
│   ├── components/        # React 组件
│   │   ├── DomainList.js  # 域名列表组件
│   │   └── HostsOutput.js # Hosts 输出组件
│   ├── services/          # 服务层
│   │   └── dnsService.js  # DNS 解析服务
│   ├── App.css            # 应用样式
│   ├── App.js             # 主应用组件
│   ├── index.css          # 全局样式
│   └── index.js           # React 入口文件
│
├── package.json           # 项目依赖配置
└── README.md              # 项目说明文档
```

## 技术栈

- **React**：用于构建用户界面的 JavaScript 库
- **React Bootstrap**：基于 Bootstrap 的 React 组件库
- **Axios**：用于发送 HTTP 请求的库
- **Bootstrap Icons**：提供丰富的图标集

## SEO 优化

本项目已经进行了全面的 SEO 优化，包括：

- **元标签优化**：完整的标题、描述、关键词等元标签
- **社交媒体元标签**：Open Graph 和 Twitter Card 标签，优化社交媒体分享效果
- **结构化数据**：JSON-LD 格式的结构化数据，提高搜索引擎对网站的理解
- **语义化 HTML**：使用语义化标签如 header、footer、nav 等
- **网站地图**：提供 sitemap.xml 文件便于搜索引擎爬取
- **爬虫指引**：提供 robots.txt 文件指导搜索引擎爬虫
- **规范链接**：使用规范链接避免重复内容问题

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 使用方法

1. 访问网站，等待域名 IP 地址加载完成
2. 点击「复制」按钮，复制生成的 hosts 配置内容
3. 将复制的内容添加到系统的 hosts 文件中
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - macOS/Linux: `/etc/hosts`
4. 保存 hosts 文件后，即可享受更快的连接速度

## 贡献

欢迎提交 Issue 或 Pull Request 来帮助改进这个项目！

## 许可证

[MIT License](LICENSE)