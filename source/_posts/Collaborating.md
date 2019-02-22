---
title: Collaborating
date: 2019-02-16 13:38:42
categories: Git
tags: git
---
# 利用本地共享库完成多人同时协作
演示一个共享版本库的搭建过程，以及两个用户user1和user2在各自的工作区中是如何工作并进行数据交换的。
## 首先创建一个裸仓库
```bash
$ git init --bare /path/to/repos/shared.git
```
创建user1和user2的工作目录：

```bash
$ mkdir /path/to/user1/workspace
$ mkdir /path/to/user2/workspace
```

## 用户user1克隆版本库
```bash
$ cd /path/to/user1/workspace
$ git clone file:///path/to/repos/shared.git project
```
设置user.name和user.email

>要在版本库级别设置user.email和user.email配置变量，以便和全局设置区分开，因为我们模拟环境中所有用户都共享同一全局设置和系统设置。

```bash
$ cd project
$ git config user.name user1
$ git config user.email user1@gmail.com
```

用户user1创建初始数据并提交

``` bash
$ echo Hello > README
$ git add README
$ git commit -m "initial commit"
```

用户user1将本地版本库的提交推送到上游

``` bash
$ git push origin master
```

## 用户user2克隆版本库
>与user1克隆版本库后的操作大致相同，只是现在版本库已经不再是空版本库了。

设置user.name和user.email

```bash
$ cd project 
$ git config user.name user2
$ git config user.email user2@gmail.com
```

用户user2添加一行数据并提交

```bash
$ echo world > README
$ git add README
$ git commit -m "user2's commit: add world"
```

用户user2将本地版本库的提交推送到上游

```bash
$ git push origin master
``` 

用户user2推送成功没有出现错误，是因为user2此次的推送本身就是快进式推送。

## 查看是否是快进式推送
>所谓快进式推送，就是要推送的本地版本库的提交是建立在远程版本库相应分支的现有提交基础上的，即远程版本库相应分支的最新提交是本地版本库最新提交的祖先提交。

查看用户user2本地版本库的最新提交及其历史提交

```bash
$ git rev-list HEAD
```

查看远程版本库的最新提交

``` bash
$ git ls-remote origin
```

发现远程版本库的最新提交是user2本地版本库的祖先提交。

假设这个项目约定：每个开发者在team目录下写一个自述文件。

于是user1创建文件team/user1.txt

```bash
$ cd /path/to/user1/workspace/project/
$ mkdir team
$ echo "i'm user1" > team/user1.txt
$ git add team
$ git commit -m "user1's profile"
```

用户user1将本地提交推送到服务器上

```bash
$ git push origin master
```
注意：此时会推送错误。

查看是否是快进式推送。果然不是，所以此时user2必须先Pull最新的版本库。

```bash
git pull
```
>git pull 实际包含两个动作：获取远程版本库的最新提交，以及将获取到的远程版本库提交与本地提交进行合并。

合并之后可以查看版本库的提交关系图

```bash
git log --graph --oneline
```

此时再次进行推送即可成功。

```bash
git push
```

### 禁止非快进式推送
git提供了至少两种方式对非快进式推送进行限制。一个是通过版本库的配置，另一个是通过版本库的钩子脚本。

将版本库的配置变量receive.denyNonFastForwards设置为true可以禁止任何用户进行非快进式推送。

（1）更改服务器版本库的配置

```bash
$ git --git-dir=/path/to/repos/shared.git config receive.denyNonFastForwards true
```
（2）版本库的钩子（hooks）脚本

## 合并&解决冲突
### 修改不同的文件
如果用户user1和用户user2各自的本地提交中修改了不同的文件，当一个用户将改动推送到服务器后，另外一个用户的推送就会遇到非快进式推送错误，需要先合并再推送。两个用户修改了不同的文件，合并不会遇到麻烦。

（1）用户user1修改team/user1.txt文件，提交并推送到服务器
（2）用户user2修改team/user2.txt文件，提交
（3）用户user2在推送的时候，会遇到非快进式推送的错误而终止。
（4）用户user2抓取最新的版本库到本地

```bash
$ git fetch 
```
（5）用户user2执行合并操作

```bash
$ git merge origin/master
```
（6）用户user2推送合并后的本地版本库到共享版本库。

### 修改相同文件的不同区域
与上同。
### 同时更改文件名和文件内容
与上同。

### 逻辑冲突

### 冲突解决

查看冲突有两处（暂存区和工作区）：

``` bash
$ git ls-files -s
```
其中第三个字段（标号1，2，3），编号为1的暂存区用于保存冲突文件修改之前的副本，即冲突双方共同的祖先版本。可用`$ git show :1:FILE_NAME`访问。编号为2的暂存区用于保存当前冲突文件在当前分支中修改的副本。编号为3的暂存区用于保存当前冲突文件在合并版本（分支）中修改的副本。

工作区的版本则同时包含了成功的合并及冲突的合并。其中冲突的合并会用特殊的标记<<<<<<=======>>>>>>进行标识，<=小于号和等号之间的为当前分支所更改的内容，=>等号和大于号之间的为合并版本更改的内容。

冲突解决的实质就是通过编辑操作，将冲突标识符所标识的冲突内容替换为合适的内容，并去掉冲突标识符。编辑完毕后执行git add命令将文件添加到暂存区（标号0），然后再提交就完成了冲突解决。

当工作区处于合并冲突时，无法再执行提交操作。此时有两个选择：放弃合并操作，解决冲突。

放弃合并，只须执行git reset将暂存区重置即可。

可以通过图形化工具解决冲突：如kdiff3,meld,tortoisemerge,araxis等。

### 树冲突
与上同。

### merge与rebase的区别
google...


