---
title: Algorithm Key Mind
categories: 算法
tags: 算法
date: 2019-02-22 17:04:57
---


## 对分查找
### 源码

``` c
int BinarySearch(const ElementType A[], ElementType X, int N)
{
    int low, mid, high, notfound;
    notfound = -1;
    low = 0;
    high = N - 1;
    while(low <= high){
        mid = (low + high) / 2;
        if(A[mid] > X){
            high = mid - 1;
        }else if(A[mid] < X){
            low = mid + 1;
        }else
            return mid;
    } 
    return notfound;
}
```

### 算法分析：

信息：

1. A数组本身就已经排好序
2. 一共有N个数，每次折半查找
 
 
>Key Mind:
>>分析循环的次数，逆向思维从0开始以2的幂次方查找，总共有N个数。设循环T次，表达式为2^T =N-1，则T=log(N-1)。所以运行时间为O(logN)。


## 高效率取幂运算
### 源码
``` c
long int pow(long int x, unsigned int N)
{
    if(N = 0)
        return 1;
    if(N == 1)
        return x;
    if( IsEven(N))
        return pow(x * x, N / 2);
    else 
        return pow(x * x, N / 2) * x;
}
```
### 算法分析

信息：

1. 该函数计算x^N 次方
2. isEven判断N是否是偶数

>Key Mind:
>> 分析循环的次数。总共是N次，循环一次后为N/2次每次减半，也采用逆向思维，以2的幂次方增长2^T =N，所以T=logN。所以运行时间为O(logN);


总结对分查找和取幂运算，都是对数O(logN)运行时间，逆向考虑对应的都是2的幂次方计算，表达式2^x = N；所以二分思想能提高很大的效率。

## 排序
### 插入排序
``` c
void insertionSort( ElementType A[], int N )
{
    int i, j;
    ElementType tmp;
    for( i = 1; i < N; i++ )
    {
        tmp = A[i];
        for( j = i; j > 0 && A[j-1] > tmp; j-- )
        {
            A[j] = A[j-1];
        }
        A[j] = tmp;   
    }

}
```
>Key Mind:
>>将下标i读取到的值保存（隐喻腾空i的位置），第二个for循环指针回走检查，只要比与保存的值大就往后移。j最大值为N-1，所以两个for循环总次数为N^2 ，即时间复杂度为O(N^2 )。




