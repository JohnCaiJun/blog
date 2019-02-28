---
title: CentOS 7.0 环境编译thinstation
categories: 运维
tags: 运维
date: 2018-07-09 12:43:17
---
## 准备一台CentOS 7 服务器 (我的是阿里云的)
### 1.安装git
```bash
 yum install git
```

### 2.克隆thinstation仓库，并初始化环境
github 地址：https://github.com/Thinstation/thinstation.git
 
```bash
 git clone git://github.com/Thinstation/thinstation.git
```

thinstation大概有1.3G,网速正常的话也可能很慢，下载时间比较长，耐心等待。

### 3.安装ftp服务，将编译好的thinstation文件从服务器拉下来
```bash
yum install vsftpd
```

编辑`/etc/vsftpd/vsftpd.conf`,确保以下选项

    local_enable=YES
    write_enable=YES

### 4.创建一个用户（将编译好的thinstation生成的iso,pxe等复制到此用户的家目录）

```bash
 useradd centos;echo "123";passwd --stdin centos;
```


下载结束后，你克隆的thinstation源码将存放在你当前终端所在目录下，一般默认在当前用户的目录下。

### 5.初始化thinstation编译环境

cd到thinstation/目录

```bash
cd ~/thinstation
```

然后执行./setup-chroot进行初始化（注意当前用户必须是root,有些命令只有拥有超级用户权限才能执行）
 
```bash
./setup-chroot
```

注意此时终端显示的信息，这些都是thinstation所支持的package


**重点**：对于CentOS环境，必须修改thinstation/ts/TS_ENV

![](https://img-blog.csdn.net/20180709122631443?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FhcnJvbl9ETA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

找到PATH变量，修改为：`PATH=$PATH:/ts/bin:/sbin:/bin` (不修改此处，在运行./setup-chroot后会因为找不到相关命令而报错，可能影响后续的编译)

初始化结束：按Q退出，按Q退出只是进入到了编译的环境，并不是退出编译

退出的只是当前的页面，其实按Q之后进入编译环境并不是退出编译环境，而是显示着
 
```bash
[root@TS_chroot]/#
```

如果要退出编译环境还需要输入exit 再次退出，按H帮助，到这里编译环境就搭建好了。

需要再次进入编译环境，还需切换到超级用户，进入thinstation目录输入`./setup-chroot` 后，按Q再次进入编译环境。（每次对thinstation进行编译都得这样操作）

### 6.自定义配置文件

编译环境搭建好后，将thinstation编译成符合自己需求的thinstation才是真正的编译过程。那么最重要的就是配置文件了。

主要有两个配置文件:

	  (1) build.conf
	  (2) build.conf.buildtime

**对于build.conf文件：**
 
1. 文件说明
 这个文件是thinstation的基本配置文件，你可以通过修改这个文件选择你需要thinstation 
 兼容那些硬件包含那些程序和功能，并通过运行“./build”命令生成thinstation 启动镜 
 像。
2. 模块
首先，查看thinstation支持的主机型号模块是否在thinstation/build/machine/目录下已存在。

不存在自己创建自己主机型号模块（建议自己创建）

```bash
./mkchine Mini-PC  //此时会生成build/machine/Mini-PC目录
```

我们将自己这个主机型号模块编译进这个build.conf文件中

```bash
machine Mini-PC  
```

此时machine/Mini-PC目录为空，现在的问题是怎么得到客户端主机的驱动模块？

不急，先说一下thinstation.conf.buildtime配置文件，你需要先完成一次任意的编译。

**对于thinstation.conf.buildtmie**

1. 文件说明
这个文件主要是定义开机后主机的一些设置。

2. 参数
主要有
 自定义音量
 麦克风
 图形界面管理器
 系统主题风格，如xp
 显示图标
 开机自动运行

等等

###　7.获取目标主机的硬件驱动模块

配合PXE服务器，主要有以下几个步骤：

	 （1）在build.conf配置文件中找到 #package extension 与 #package extensions-x 这两个选项，然后开启（去掉注释）。
	 （2）build.conf和build.conf.buildtime配置文件准备完毕后，使用./buid --allmodules编译

```bash
 ./build --allmodules    //allmodules顾名思义，就是编译所有的模块拉~
```

然后将编译好的thinstation/build/boot-images下的pxe下的所有文件复制到PXE服务器的tftp目录下。


**接下来要注意了：**
		
	 （1）客户端开机网卡启动，PXE引导thinstation（小型的linux系统）kernel并加载到内存,
	 此时客户端应该启动进入界面了，然后客户端运行终端terminel或者xterm,
	 在终端中输入“/bin/hwlister.sh"运行，你将会得到modules.list(firmware.list可能会有)，modules.list包含了客户端主机驱动模块的列表.
 
```bash              
~]# ls /
```
你会发现在根目录下多了modules.list文件，用u盘将它拷贝到你的PXE服务器上。

	 （2）将modules.list文件copy到你的创建的机器模块目录下，
	 我这里是thinstation/build/machine/PHILIPS/mudules.list。
	 （因为机器的不同，可能也会生成firmware.list等文件，但这并不是必须的，必须的文件只有mudules.list文件）
      
如果你的机器允许tftp上传，官方文档说会直接发送到相关machine模块的目录下，我这里是直接用u盘烤过去的。

### 8.再次编译符合目标主机驱动的thinstation

**注意啦：**

```bash
 ~]# vim build      //不要忘记注释 package extensions 与 package extensions-x
 ~]# ./build        //不要加--allmodules,我们已经得到了modules.list了呀！
```

![](https://img-blog.csdn.net/20180709124134151?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FhcnJvbl9ETA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![](https://img-blog.csdn.net/2018070912414457?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FhcnJvbl9ETA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



如果你不通过/bin/hwlister.sh命令获取客户端主机驱动，我们需要知道那些模块是我们需要编译进去的，模块就是对应的驱动，在modules.list文件中定义。不要把不需要的模块编译进去，越多的模块启动所需的时间越长。


### 9.最后就是将编译完成的pxe目录下的所有内容拷贝到PXE服务器的tftp目录下


### 10.瘦客户端就制作完成啦





