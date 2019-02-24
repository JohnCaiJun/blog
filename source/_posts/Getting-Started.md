---
title: Getting Started
date: 2019-02-15 21:01:28
categories: Git
tags: Git
---

## 设置存储库
Git的三个配置文件分别是版本库级别的配置文件（该项目目录下）、全局配置文件（用户主目录下）、系统级配置文件（/etc目录下）。其中版本库级别的配置文件优先级最高。

按照优先级高低依次为：

```git
1. git config -e 
2. git config -e --global
3. git config -e --system  
```
执行以上命令会打开相应的git配置文件。

## git diff（比较差异） 
工作区（当前工作目录下的文件）、提交暂存区（已经git add 的文件）、版本库中的文件。

例如：
当前目录下有一个welcome.txt文件
 
在工作区的内容为：

```txt 
hello
nice to meet you
byebye
```

在提交暂存区的内容为：

```txt
hello
nice to meet you
```

在版本库中的内容为：

```txt
hello
```

也就是说welcome.txt有三个不同的版本，一个在工作区，一个在等待提交的暂存区，还有一个是版本库中最新版本的welcome.txt。通过调用不同的git diff命令可以看到不同状态下的welcome.txt文件的差异。

```git
1. 显示工作区与提交暂存区（stage）中文件的差异
git diff 

2. 显示工作区与当前版本库（HEAD）中文件的差异
git diff HEAD

3. 显示提交暂存区与版本库中文件的差异（--cached或--staged）
git diff --cached
```

## 撤销
### 吃后悔药
依照暂存区welcome.txt重置工作区welcome.txt文件

```bash
$ git checkout -- welcome.txt

#执行 git diff 通过状态输出可以看到工作区与暂存区已经没有改动了。

#！！如果git checkout HEAD则会依照版本库重置暂存区和工作区（极具危险性）
```

依照版本库重置暂存区，但工作区不受影响

```bash
$ git reset HEAD
```

直接从暂存区删除文件，工作区不受影响

```bash
$ git rm --cached
```
### 删除
显示会删除当前目录下的未跟踪的文件（Untracked）或目录

``` bash
$ git clean -dn
```

删除未跟踪的文件

```bash
$ git clean -f <path> (默认为当前目录)
```

删除未跟踪的文件和目录

```bash
$ git clean -dn
```


### 回到过去
``` bash
# 查看历史
$ git log --oneline

# 回到某个历史节点
$ git checkout NODE_ID

# 回到某个提交节点，重置版本库、暂存区、工作区
$ git reset --hard HEAD^(ID)

# 相当于undo操作，但是该提交任然存在历史当中
$ git revert HEAD
```

## 查看暂存区和HEAD中的目录
有什么办法能够查看工作区一样直观地查看暂存区和HEAD中的目录树吗？

``` bash
# 查看HEAD目录树
$ git ls-tree -l HEAD

# 查看暂存区目录树
$ git ls-files -s
```

小技巧：

>1. 首先清除工作区当前的改动
$ git clean -fd
2. 用暂存区内容刷新工作区
$ git checkout .





