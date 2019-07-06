---
title: 修改Brew源
date: 2019-07-06 12:51:03
categories: Mac
tags: Mac
---

## 替换  brew源

我们用brew命令安装软件时，经常会遇到这样的情况：`brew install xxxx 一直卡在Updating Homebrew....`只要我们进行替换就可以解决这个问题。

``` shell
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git 
```

几个镜像:

* https://git.coding.net/homebrew/homebrew.git - Coding
* https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git - 清华
* https://mirrors.ustc.edu.cn/brew.git - 中科大

## 重置  brew源
如果你想重置brew源，那么切换为原来的下载地址就可以了。

``` shell
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```


