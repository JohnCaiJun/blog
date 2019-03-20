---
title: c风格字符数组与字符串
categories: 编程
tags: C++
date: 2019-03-20 17:58:03
---


对于字符数组后面是否要加‘\0’，有以下几种情况：

第一种： char str[10] = {'h','e','l','l','o'};

如果大括号中的字符个数小于字符数组的长度，则把大括号中的字符赋给数组中前面的元素，其余元素自动赋值为空字符（即‘\0’）。

第二种：char str[5] = {'h','e','l','l','o'};

对于大括号中的字符个数和数组长度相同，系统不会自动添加'\0'。对于这种赋值方式，需要手动添加‘\0’;

即：char str[6] = {'h','e','l','l','o', '\0'};

第三种：char str[] = "hello";

第四种：char *str = "hello";


## 测试：
```c++
char str1[10] = {'h','e','l','l','o'};
char str2[5] = {'h','e','l','l','o'};
char str3[] = "hello";
char *str4 = "hello";
cout << sizeof(str1) << " " << strlen(str1) << endl;
cout << sizeof(str2) << " " << strlen(str2) << endl;
cout << sizeof(str3) << " " << strlen(str3) << endl;
cout << sizeof(str4) << " " << strlen(str4) << endl;

//输出
10 5
5 5
6 5
8 5
```
sizeof()会将‘\0’也当做一个字符并计入结果，而strlen()不会计入‘\0’；

