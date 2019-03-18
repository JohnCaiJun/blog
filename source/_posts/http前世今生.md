---
title: http前世今生
categories: 网络
tags: web
date: 2019-03-18 13:28:23
---

HTTP（HyperText Transfer Protocol）是万维网（World Wide Web）的基础协议。自 Tim Berners-Lee 博士和他的团队在1989-1991年间创造出它以来，HTTP已经发生了太多的变化，在保持协议简单性的同时，不断扩展其灵活性。如今，HTTP已经从一个只在实验室之间交换文件的早期协议进化到了可以传输图片，高分辨率视频和3D效果的现代复杂互联网协议。
## 万维网
1989年， 当时在 CERN 工作的 Tim Berners-Lee 博士写了一份关于建立一个通过网络传输超文本系统的报告。这个系统起初被命名为 Mesh，在随后的1990年项目实施期间被更名为万维网（World Wide Web）。它在现有的TCP和IP协议基础之上建立，由四个部分组成：

- 一个用来表示超文本文档的文本格式，超文本标记语言（HTML）。
- 一个用来交换超文本文档的简单协议，超文本传输协议（HTTP）。
- 一个显示（以及编辑）超文本文档的客户端，即网络浏览器。第一个网络浏览器被称为 WorldWideWeb。
- 一个服务器用于提供可访问的文档，即 httpd 的前身。

这四个部分完成于1990年底，且第一批服务器已经在1991年初在CERN以外的地方运行了。 1991年8月16日，Tim Berners-Lee 在公开的超文本新闻组上发表的文章被视为是万维网公共项目的开始。

HTTP在应用的早期阶段非常简单，后来被称为HTTP/0.9，有时也叫做单行（one-line）协议。



## HTTP/0.9 – 单行协议
最初版本的HTTP协议并没有版本号，后来它的版本号被定位在 0.9 以区分后来的版本。 HTTP/0.9 极其简单：请求由单行指令构成，以唯一可用方法GET开头，其后跟目标资源的路径（一旦连接到服务器，协议、服务器、端口号这些都不是必须的）。

```
GET /mypage.html
```

响应也极其简单的：只包含响应文档本身。

```
<HTML>
这是一个非常简单的HTML页面
</HTML>
```

跟后来的版本不同，HTTP/0.9 的响应内容并不包含HTTP头，这意味着只有HTML文件可以传送，无法传输其他类型的文件；也没有状态码或错误代码：一旦出现问题，一个特殊的包含问题描述信息的HTML文件将被发回，供人们查看。

## HTTP/1.0 – 构建可扩展性节
由于 HTTP/0.9 协议的应用十分有限，浏览器和服务器迅速扩展内容使其用途更广：

- 协议版本信息现在会随着每个请求发送（HTTP/1.0被追加到了GET行）。
- 状态码会在响应开始时发送，使浏览器能了解请求执行成功或失败，并相应调整行为（如更新或使用本地缓存）。
- 引入了HTTP头的概念，无论是对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性。
- 在新HTTP头的帮助下，具备了传输除纯文本HTML文件以外其他类型文档的能力（感谢Content-Type头）。

一个典型的请求看起来就像这样：

```
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML> 
一个包含图片的页面
  <IMG SRC="/myimage.gif">
</HTML>
```

接下来是第二个连接，请求获取图片：

```
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:32 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/gif
(这里是图片内容)
```

在1991-1995年，这些新扩展并没有被引入到标准中以促进协助工作，而仅仅作为一种尝试：服务器和浏览器添加这些新扩展功能，但出现了大量的互操作问题。直到1996年11月，为了解决这些问题，一份新文档（RFC 1945）被发表出来，用以描述如何操作实践这些新扩展功能。文档 RFC 1945 定义了 HTTP/1.0，但它是狭义的，并不是官方标准。

## HTTP/1.1 – 标准化的协议节
HTTP/1.0 多种不同的实现方式在实际运用中显得有些混乱，自1995年开始，即HTTP/1.0文档发布的下一年，就开始修订HTTP的第一个标准化版本。在1997年初，HTTP1.1 标准发布，就在HTTP/1.0 发布的几个月后。

HTTP/1.1 消除了大量歧义内容并引入了多项改进：

- 连接可以复用，节省了多次打开TCP连接加载网页文档资源的时间。
- 增加流水线操作，允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟。
- 支持响应分块。
- 引入额外的缓存控制机制。
- 引入内容协商机制，包括语言，编码，类型等，并允许客户端和服务器之间约定以最合适的内容进行交换。
- 感谢Host头，能够使不同域名配置在同一个IP地址的服务器上。

一个典型的请求流程， 所有请求都通过一个连接实现，看起来就像这样：

```
GET /en-US/docs/Glossary/Simple_header HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding

(content)


GET /static/img/header-background.png HTTP/1.1
Host: developer.cdn.mozilla.net
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Age: 9578461
Cache-Control: public, max-age=315360000
Connection: keep-alive
Content-Length: 3077
Content-Type: image/png
Date: Thu, 31 Mar 2016 13:34:46 GMT
Last-Modified: Wed, 21 Oct 2015 18:27:50 GMT
Server: Apache

(image content of 3077 bytes)
```

HTTP/1.1 在1997年1月以 RFC 2068 文件发布。

## HTTP2/ - 为了更优异的表现节
这些年来，网页愈渐变得的复杂，甚至演变成了独有的应用，可见媒体的播放量，增进交互的脚本大小也增加了许多：更多的数据通过HTTP请求被传输。HTTP/1.1链接需要请求以正确的顺序发送，理论上可以用一些并行的链接（尤其是5到8个），带来的成本和复杂性堪忧。比如，HTTP流水线就成为了Web开发的负担。

在2010年到2015年，谷歌通过实践了一个实验性的SPDY协议，证明了一个在客户端和服务器端交换数据的另类方式。其收集了浏览器和服务器端的开发者的焦点问题。明确了响应数量的增加和解决复杂的数据传输，SPDY成为了HTTP/2协议的基础。

HTTP/2在HTTP/1.1有几处基本的不同:

- HTTP/2是二进制协议而不是文本协议。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。
- 这是一个复用协议。并行的请求能在同一个链接中处理，移除了HTTP/1.x中顺序和阻塞的约束。
- 压缩了headers。因为headers在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。
- 其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

在2015年5月正式标准化后，HTTP/2取得了极大的成功，在2016年7月前，8.7%的站点已经在使用它，代表超过68%的请求[2] 。高流量的站点最迅速的普及，在数据传输上节省了可观的成本和支出。

这种迅速的普及率很可能是因为HTTP2不需要站点和应用做出改变：使用HTTP/1.1和HTTP/2对他们来说是透明的。拥有一个最新的服务器和新点的浏览器进行交互就足够了。只有一小部分群体需要做出改变，而且随着陈旧的浏览器和服务器的更新，而不需Web开发者做什么，用的人自然就增加了。

## 后HTTP/2进化节
随着HTTP/2.的发布，就像先前的HTTP/1.x一样，HTTP没有停止进化，HTTP的扩展性依然被用来添加新的功能。特别的，我们能列举出2016年里HTTP的新扩展：

- 对Alt-Svc的支持允许了给定资源的位置和资源鉴定，允许了更智能的CDN缓冲机制。
- Client-Hints 的引入允许浏览器或者客户端来主动交流它的需求，或者是硬件约束的信息给服务端。
- 在Cookie头中引入安全相关的的前缀，现在帮助保证一个安全的cookie没被更改过。

HTTP的进化证实了它良好的扩展性和简易性，释放了很多应用程序的创造力并且情愿使用这个协议。今天的HTTP的使用环境已经于早期1990年代大不相同。HTTP的原先的设计不负杰作之名，允许了Web在25年间和平稳健得发展。修复漏洞，同时却也保留了使HTTP如此成功的灵活性和扩展性，HTTP/2的普及也预示着这个协议的大好前程。


文章转载自:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP

