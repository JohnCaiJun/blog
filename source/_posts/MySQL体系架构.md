---
title: MySQL体系架构
date: 2019-01-27 12:06:09
categories: 数据库
tags: MySQL
---

# MySQL体系架构
![](../media/15485651840202.jpg)

MySQL体系架构分为两部分:

1. Connectors
2. MySQL server

一是不同语言与SQL的交互，如java-JDBC，PHP，Python。
二是MySQL server。
## MySQL server
MySQL server又分八大模块，每个模块负责不同的工作。

1.Management Services & Utilities

>系统管理和控制工具：管理（克隆，复制，比较，差异，导出，导入），重建（设置，配置，自动从属促销），一般（磁盘使用，冗余索引，搜索元数据）

2.Connection Pool

>连接池：连接池是维护的数据库连接的缓存，以便在将来对数据库的请求需要时可以重用连接。如身份认证、线程重用、连接限制、检查内存、数据缓存；管理用户的连接，线程处理等需要缓存的需求。

3.SQL Interface

>SQL接口：进行 DML、DDL，存储过程、视图、触发器等操作和管理；用户通过 SQL 命令来查询所需结果。

4.Parser

>解析器：查询翻译对象的特权；SQL 命令传递到解析器的时候会被解析器验证和解析。

5.Optimizer

>查询优化器

6.Caches & Buffers

>缓存

7.Engine

>存储引擎：以何种方式在磁盘上保存数据

[什么是数据库引擎以及不同数据库引擎的区别](https://github.com/jaywcjlove/mysql-tutorial/blob/master/chapter3/3.5.md)
## MyISAM和Innodb的差别
### MyISAM
MyISAM表是独立于操作系统的，这说明可以轻松地将其从Windows服务器移植到Linux服务器；每当我们建立一个MyISAM引擎的表时，就会在本地磁盘上建立三个文件，文件名就是表名。例如，我建立了一个MyISAM引擎的tb_Demo表，那么就会生成以下三个文件：

- tb_demo.frm，存储表定义。
- tb_demo.MYD，存储数据。
- tb_demo.MYI，存储索引。
MyISAM表无法处理事务，这就意味着有事务处理需求的表，不能使用MyISAM存储引擎。

MyISAM存储引擎特别适合在以下几种情况下使用：

1. 选择密集型的表。MyISAM存储引擎在筛选大量数据时非常迅速，这是它最突出的优点。
2. 插入密集型的表。MyISAM的并发插入特性允许同时选择和插入数据。例如：MyISAM存储引擎很适合管理邮件或Web服务器日志数据

### Innodb
InnoDB是一个健壮的事务型存储引擎，这种存储引擎已经被很多互联网公司使用，为用户操作非常大的数据存储提供了一个强大的解决方案。我的电脑上安装的 MySQL 5.6.13 版，InnoDB就是作为默认的存储引擎。

InnoDB还引入了行级锁定和外键约束，在以下场合下，使用InnoDB是最理想的选择：

- 更新密集的表。InnoDB存储引擎特别适合处理多重并发的更新请求。
- 事务。InnoDB存储引擎是支持事务的标准MySQL存储引擎。
- 自动灾难恢复。与其它存储引擎不同，InnoDB表能够自动从灾难中恢复。
- 外键约束。MySQL支持外键的存储引擎只有InnoDB。
- 支持自动增加列AUTO_INCREMENT属性。
- 从5.7开始innodb存储引擎成为默认的存储引擎。

一般来说，如果需要事务支持，并且有较高的并发读取频率，InnoDB是不错的选择。

## 索引
[B_tree原理与实现](https://blog.csdn.net/endlu/article/details/51720299)

 
 

