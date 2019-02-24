---
title: Branch
categories: Git
tags: Git
date: 2019-02-24 14:59:00
---


## 代码管理之殇
分支是代码管理的利器。如果没有有效的分支管理，代码管理就适应不了复杂的开发过程和项目的需要。有前瞻性性的项目管理，新版本的开发往往是和当前版本同步进行的。如果两个版本的开发都混杂在master分支中，肯定会是一场灾难。

分支类型主要分为：

1. 发布分支
2. 特性分支
3. 卖主分支

google~

## 分支命令
``` bash
# 查看分支
git branch

# 创建分支
git branch <branch-name>
git branch <branch-name> <target-point>

# 删除分支
git branch -d <branch-name>
git branch -D <branch-name>


# 重命名分支
git branch -m <old-branch> <new-branch>
git branch -M <old-branch> <new-branch>
```
## 项目开发使用分支测试用例
user1初始化项目。
user1添加getOpt()命令解析功能。
user2添加getScreen()获取屏幕数功能。


### 基于特性分支的开发
user1和user2应该为自己负责的功能创建特性分支。

```bash
# user1
# （1）为“test-branch”项目创建里程碑v1.0
git tag -m "Release 1.0" v1.0

# （2）将新建的里程碑对宋到远程共享版本库
git push origin refs/tags/v1.0

# （3）创建分支user1/getopt，并切换到新分支上
git branch user1/getopt
git checkout user1/getopt
(git checkout -b user1/getopt) #一个命令执行两个操作

# 然后user1进行getOpt命令解析功能的开发........

# user2
# （1）首先将项目克隆到本地
# （2）然后创建分支user2/getScreen分支
# （3）在user2/getScreen分支进行开发.....

# user1
# （1）此时user1在user1/getopt分之下工作完成对getOpet功能的开发
# （2）user1提交代码，完成开发任务
# （3）此时查看user1/getopt分支和master分支的指向不同了
git rev-parse user1/getopt master

# （4）将user1/getopt分支合并到主线
#       首先将工作区切换到主线
git checkout master
#       然后执行git merge命令合并user1/getopt分支。
git merge user1/getopt
#   实际上合并后master分支和user1/getopt指向同一个提交。
# （5）此时查看状态信息显示本地master分支比远程共享版本库的master分支领先，是可以使用git cherry命令查看哪些提交领先（未被推送到上游跟踪分支中）
git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
  
git cherry
+ 5ea2fecbdb45d084c69bdb7a6a0b05c5d88e98c7
# （6）执行推送操作，完成本地分支向远程分支的同步
git push
# （7）最后删除user1/getopt分支
git branch -d user1/getopt

```
此时，由于user2的getScreen功能比较复杂，所以就先不等他了。

### 基于发布分支的开发
前提：v1.0版本中现在出现两个bug，需要修复。
于是将这两个bug分别交给user1和user2去完成。

假如这两个bug分别是向README.txt文件添加aa,bb

- user1负责添加aa
- user2负责添加bb

由于现在的版本库master分支相比v1.0发布时添加了新功能getOpt代码，如果基于master分支修改，就会引入尚未经过测试、可能不稳定的新功能的代码。

所以，要想解决在1.0版本发现的bug，就需要`基于1.0发行版`的代码创建发布分支。

``` bash
# user1
# （1）创建发布分支
git tag -n1 -1 v*
git checkout -b test_git-1.X v1.0
# （2）用git rev-parse命令显示对应的提交id（v1.0包含提交说明里程碑，所以对应的提交id为v1.0{}）
git rev-parse test_git-1.x v1.0{} master
# （3）user1将分支test_git-1.x推送到远程共享版本库（因为User2修改bug也要用到该分支）
git push origin test_git-1.x

# user2
# （1）user2从共享版本库获取test_git-1.x分支
git fetch
# （2）远程分支不能直接检出，要基于该远程分支创建本地分支
git rev-parse test_git-1.x v1.0{} master

# user1
# （1）添加aa
# （2）提交并推送到远端共享仓库的发布分支test_git-1.x
git push origin test_git-1.x

# user2
# （1）首先pull远端仓库test_git-1.x
git pull origin test_git-1.x
# （2）添加bb
# （3）提交并推送到远端共享库的发布分支test_git-1.x
git push origin test_git-1.x

```

#### 发布分支的提交合并到主线
当user1和user2都相继在test_git-1.x分支中将像一个的Bug修改完后，就可以才能够test_git-1.x分支中编译新的软件产品交给客户使用了。

>不要忘了在主线master分支中也做出同样的更改，因为test_git-1.x分支中修改的bug同样也存在于主线master分支中

```bash
# 以user2的身份进行操作
# （1）切换到master分支
git checkout master
# （2）从远程仓库同步master分支（此时会包含user1之前添加的getOpt命令解析的功能）
git pull
# （3）查看分支test_git-1.x的日志，确认要拣选的提交ID。从日志可以看出要拣选的提交分别是第一个父提交和第二个父提交，可以分别用test_git-1.x^1，test_git-1.x^2。
git log -3 --graph --oneline test_git-1.x
*   e604950 resolve conflic by user2
|\
| * 30f1b20 Fix bug by user1
* | 29b84e8 Fix bug by user2
|/
# （4）执行拣选操作 （此时可能冲突，如遇冲突就处理冲突）
git cherry-pick test_project-1.x^1
git cherry-pick test_project-1.x^2
# （5）查看状态可以看到当前的工作分支相对于远程服务器有两个新提交
git status
# （6）推送本地master分支到远端共享版本库
```

### 分支变基

>可以采用merge的方式合并。
>>利：开发者在user2/getScreen中的提交不会改变。
>>弊：会产生3个提交包括一个合并提交，增加了代码审核的负担。
>>所以很多项目在特性分支合并到开发主线的时候，都不推荐使用合并操作，而是使用变基操作。

前提：此时user2继续完成getScreen功能

```bash
# user2
# （1）切换到user2/getScreen分支
# （2）添加getScreen功能
# （3）提交
# （4）推送分支user2/getScreen分支到远程服务器（主要是为了备份数据）
git push origin user2/getScreen
# （5）执行变基操作（此时遇到冲突的话...google~）
git rebase master
# （6）查看历史发现已经合并完成，将user2/getScreen分支直接推送到远端的master分支上
git push origin user2/getScreen:master

# （7）user1执行拉回操作，发现确实添加了getScreen功能
# （8）现在特性分支user2/getScreen完成了使命可以删除了（不要忘了删除远程分支user2/getScreen）
git branch -d user2/getScreen
git push origin :user2/getScreen #删除远端user2/getScreen分支
```


