---
title: iptables四表五链
categories: 运维
tags: Firewall
date: 2019-03-10 18:44:20
---


![](../media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-03-10%2018.53.17.png)

## 大白话
前提：
浏览器地址输入www.baidu.com，百度网站服务器做了防火墙设置。

1.首先我本地客户端发送tcp连接请求

>我的请求开始封包: 应用层（http）-> 传输层（tcp）-> 网络层（ip） -> 数据链路层（Mac祯） -> 物理层（数据流）

2.Mac祯到达目的主机（中间路由过程忽略，假设此Mac祯已经到达目标www.baidu.com）

>此时Mac祯开始拆包，首先匹配Prerouting链上的规则做地址转换，然后查看路由表决定是否转发，如果转发则匹配Forward表过滤，然后最后匹配Postrouting链是否需要做地址转换。

3.如果封包地址为www.baidu.com地址（在prerouting规则的前提下）

>匹配Input链

4.百度服务器接收到了请求，然后回送响应包给我客户端

>首先根据防火墙规则匹配Output链（nat->filter）然后再匹配ostrouting链规则


