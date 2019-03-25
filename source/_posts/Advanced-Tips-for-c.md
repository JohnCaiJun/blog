---
title: Advanced Tips for c++
date: 2019-02-16 20:09:28
categories: 编程
tags: C++
---
# Tips
## 使用引用避免拷贝
拷贝大的类类型对象或者容器对象比较低效，甚至有的类型（包括IO类型在内）根本就不支持拷贝操作。当某种类型不支持拷贝操作时，函数只能通过引用形参访问该类对象。


举个例子，我们准备编写一个函数比较两个string对象的长度。因为string对象可能非常长，所以应该尽量避免直接拷贝它们。

``` c++
// 比较两个string的长度
bool isShorter(const string &s1, const string &s2)
{
    return s1.size() < s2.size();
}
```
## 使用引用形参返回额外信息
一个函数只能返回一个值，然而有时函数需要同时返回多个值，引用形参为我们一次返回多个结果提供了有效的途径。

find_char函数返回在string对象中某个指定字符第一次出现的位置，同时，又返回该字符出现的次数。

``` c++
string::size_type count=0;
string::size_type find_char(const string &s, char c, string::size_type &ctr)
{
    for(decltype(s.size()) i = 0; i != s.size(); ++i){
        if(s[i] == c){
            if(ret == s.size())
                ret = i;
            ++ctr;
        }   
    }
    return ret;
}

auto index = find_char(s,'o',count);
cout<<index<<count<<endl;
```

假设s是一个string对象，ctr是一个size_type对象，调用完成后，如果string对象中确实存在o，那么count的值就是o出现的次数。

## const成员函数
保证函数不会修改调用对象

```
定义：void show() const;
调用：obj.show();
```

保证obj对象不会被show函数修改。

>只要类方法不修改调用对象，就应将其声明为const。

## this指针
this指针指向用来调用成员函数的对象。

## 友元函数
类的友元函数是非成员函数，其访问权限与成员函数相同。

## 虚函数
如果要在派生类中重新定义基类方法，通常应将基类方法声明为虚拟的。这样，程序将根据对象类型而不是 引用或指针的类型来选择方法版本。

>如果要在派生类中重新定义基类方法，则设置为虚方法

虚拟析构函数：基类没有定义虚拟析构函数，则只调用对应于指针类型的析构函数。基类定义虚拟析构函数，则调用相应对象的析构函数，然后再自动调用基类的析构函数。

使用虚函数时，在内存和执行速度方面有一定的成本:

- 每个对象都增大，增大量为存储地址的空间（虚函数表的地址）
- 对每个类，编译器都创建一个虚函数地址表（数组）
- 每个函数调用都需要执行一步额外的操作，即到表中查找地址。

虽然非虚函数效率比虚函数高，但不具备动态联编功能。

## auto_ptr智能指针

```c++
auto_ptr<string> pd (new string);
```

错误：`智能指针只能用于堆内存，&str地址在栈中`

```c++
string str("hello world!");
auto_ptr(string) pd = &str;
```


