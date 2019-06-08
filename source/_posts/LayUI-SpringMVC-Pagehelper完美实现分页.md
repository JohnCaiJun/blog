---
title: LayUI-SpringMVC-Pagehelper完美实现分页
categories: Java
tags: Java Spring LayUI
date: 2019-06-08 12:45:17
---


# LayUI-SpringMVC-Pagehelper完美实现分页
## 1. 导入pagehelper
编辑 pom.xml，添加

``` xml
    <dependency>
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper</artifactId>
        <version>${pagehelper.version}</version>
    </dependency>
```

## 2. 配置pagehelper
编辑spring-mybatis.xml，添加"plugin" -> "pagehelper"


``` xml
    <!-- 配置SqlSessionFactory对象 -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 注入数据库连接池 -->
        <property name="dataSource" ref="dataSource"/>
        <!-- 扫描entity包 使用别名 -->
        <property name="typeAliasesPackage" value="com.springmvc.entity"/>
        <!-- 扫描sql配置文件:mapper需要的xml文件 -->
        <property name="mapperLocations" value="classpath:mapper/*.xml"/>
        <property name="plugins">
            <array>
                <!--分页工具-->
                <bean class="com.github.pagehelper.PageHelper">
                    <property name="properties">
                        <value>
                            dialect=mysql
                        </value>
                    </property>
                </bean>
            </array>
        </property>
    </bean>
```

## 3. LayUI前端View界面
数据表格开启分页功能：`page:true`


``` jsp
        table.render({
            elem: '#test'
            ,url:'<%=basePath%>/people/people.json'
            ,toolbar: '#toolbarDemo'
            ,title: '用户数据表'
            ,cols: [[
                {type: 'checkbox', fixed: 'left'}
                ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
                ,{field:'userName', title:'用户名', width:120, edit: 'text'}
                ,{field:'email', title:'邮箱', width:150, edit: 'text', templet: function(res){
                        return '<em>'+ res.email +'</em>'
                    }}
                ,{field:'sex', title:'性别', width:80, edit: 'text', sort: true}
                ,{field:'city', title:'城市', width:100}
                ,{field:'sign', title:'签名'}
                ,{field:'experience', title:'积分', width:80, sort: true}
                ,{field:'ip', title:'IP', width:120}
                ,{field:'logins', title:'登入次数', width:100, sort: true}
                ,{field:'joinTime', title:'加入时间', width:120}
                ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
            ]]
            ,page: true
        });
```
## 4. 后台实现
ServiceImpl


``` java
    @Override
    public Map<String, Object> getMapAll(int page, int limit) {
        PageHelper.startPage(page, limit);
        List<People> peopleList = peopleMapper.getAll(); // 从数据库中返回people表的所有信息
        PageInfo<People> pageInfo=new PageInfo<People>(peopleList); // pagehelper进行封装
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("code",0);
        map.put("msg","");
        map.put("count",pageInfo.getTotal()); // pagehelper包装
        map.put("data",pageInfo.getList()); // pagehelper包装
        return map;
    }
```


