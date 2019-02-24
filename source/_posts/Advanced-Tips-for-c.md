---
title: Advanced Tips for c++
date: 2019-02-16 20:09:28
categories: 编程
tags: C++
---
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

## 尽量使用常量引用


