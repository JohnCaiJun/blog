---
title: fork函数
categories: 编程
tags: C
date: 2019-02-26 22:40:45
---

fork函数是在<unistd.h>头文件中被定义，是系统的一个服务，

其定义原型为  pid_t fork(void) ,其中pid_t是一个宏定义  #define pid_t int

fork函数是在当前进程中创建一个新的进程，这个新的进程叫做子进程(child process)。当前进程称作父进程(parent process)。系统负责创建父进程的副本，包括代码段，堆和栈的复制。

fork函数是“调用一次，返回两次”。即在父进程中返回生成子进程的ID，在子进程中返回一个整数0（因为子进程只有一个父进程，可以通过调用函数getppid()返回父进程的ID)

```c
#include <stdio.h>
#include <unistd.h>

int main(int argc,char *argv[]){
    //fork函数使用
    int i = 0;
    printf("before fork\n");
    pid_t pid = fork();
    printf("after fork\n");
    if (pid < 0){
        printf("error\n");
        return 1;
    }
    else if (pid == 0){
        printf("fork success,this is son process\n");
        printf("father's pid = %d\n", getpid());
        while (i<10){
            i += 1;
            printf("this is son process,i=%d\n",i);
            sleep(1);
        }
    }
    else{
        printf("fork success,this is father process,son process id is %d \n",pid);
        while (i<10){
            i += 2;
            printf("this is father process,i=%d\n",i);
            sleep(2);
        }
    }
    return 0;
}
```

运行结果

``` bash
/Users/caijun/CLionProjects/CAccount/cmake-build-debug/CAccount
before fork
after fork
fork success,this is father process,son process id is 16090 
this is father process,i=2
after fork
fork success,this is son process
father's pid = 16090
this is son process,i=1
this is son process,i=2
this is son process,i=3
this is father process,i=4
this is son process,i=4
this is son process,i=5
this is father process,i=6
this is son process,i=6
this is son process,i=7
this is father process,i=8
this is son process,i=8
this is son process,i=9
this is father process,i=10
this is son process,i=10

Process finished with exit code 0
```


