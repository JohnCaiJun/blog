---
title: 常用CSS大全
categories: 前端
tags: CSS
date: 2019-08-06 23:46:52
---


## 登录框
el-form class="login-container"
h3 class="login_title"
el-checkbox class="login_remember"

``` css
.login-container {
    border-radius: 15px;            # 圆角边的像素
    background-clip: padding-box;   # 背景裁剪
    margin: 180px auto;             # 外边距：180像素，auto自动居中
    width: 350px;
    padding: 35px 35px 15px 35px;    # 内边距：上、下、左、右
    background: #fff;
    border: 1px solid #eaeaea;       # 边框：像素、实体线、颜色
    box-shadow: 0 0 25px #cac6c6;    # 边框阴影： 隐形像素，颜色
  }  
.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
.login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
```


