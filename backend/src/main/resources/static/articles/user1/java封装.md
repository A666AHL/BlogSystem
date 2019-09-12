- 将类的某些信息隐藏在类内部, 不允许外部程序直接访问
- 通过该类提供的方法来实现对隐藏信息的操作和访问
- 隐藏对象的信息
- 留出访问的接口

特点:

1. 只能通过规定的方法访问数据
2. 隐藏类的实例细节, 方便修改和实现

创建getter/setter 方法

private String name;

public void setName(string name){

​	this.name = name;

}

public String getName(){

​	return this.name;

}

使用包进行类管理

Java中一个包里不能存在同名类

包的命名规则: 域名的倒序 + 模块 + 功能

域名全部小写

package com.imooc.mechanics;	// 定义包, 必须放在程序的第一行

可以创建一个专门进行测试的包, com.imooc.test

import com.imooc.animal.*;	// 加载com.imooc.animal 下所有类

import com.imooc.animal.Cat;	// 指定加载Cat类, 推荐, 运行效率高

或直接com.imooc.animal.Cat

加载类的顺序跟import 导入语句的位置无关

如果两个包存在相同的类Cat

则可以import com.imooc.animal.Cat;

在程序中使用Cat则是animal中的类, 

通过直接使用com.imooc.mechanics.Cat而使用mechanics中的Cat类

常用系统包

java.lang 包含java 语言基础的类, 该包系统加载时默认导入, 如: System, String, Math

java.util 包含java语言中常用工具, 如: Scanner, Random

java.io 包含输入, 输出相关功能的类, 如: File, InputStream

static 关键字: 静态信息

静态成员, 类成员

类实例化所有的对象都共用一个static成员

- 类对象共享
- 类加载时产生, 销毁时释放, 生命周期长

访问直接 类名.成员

当然也可以使用对象名进行访问, 不过会给出警告

static是不可以加在类上面的, 局部变量也不行

static在类中可以不加this. 进行访问

静态方法中, 不能直接访问非静态成员, 只能直接调用静态成员, 且不可以使用 this 关键字

如果非要访问, 可以这样

Cat temp = new Cat();

temp.run();

静态方法中不能直接访问同一个类中的非静态成员,只能直接调用同一个类中的静态成员

只能通过对象实例化后, 对象, 成员方法的方式访问非静态成员

构造代码块{}

静态代码块 static{}

封装练习视频先跳过