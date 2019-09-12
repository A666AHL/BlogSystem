线程是比进程还要小的运行单位，一个进程包含多个进程

- 什么是多线程
- 线程的创建
- 线程的状态和声明周期
- 线程调度
- 同步与死锁

线程的创建

- 创建一个Thread类，或者一个Thread子类的对象
- 创建一个实现Runnable接口的类的对象
- Thread是一个线程类，位于java.lang包下

Thread() 创建一个线程对象

Thread(String name) 创建一个具有指定名称的线程对象

Thread(Runnable target) 创建一个基于Runnable接口实现类的线程对象

Thread(Runnable target, String name) 创建一个基于Runnable接口实现类，并且具有指定名称的线程对象

Thread类常用方法

public void run() 线程相关的代码写在该方法中，一般需要重写

public void start() 启动线程的方法

public static void sleep(long m) 线程休眠m毫秒的方法

public void join() 优先执行调用join() 方法的进程

Runnable接口

- 只有一个方法run();
- Runnable是Java中用以实现线程的接口
- 任何实现线程功能的类都必须实现该接口

线程的状态

- 新建（New）
- 可运行（Runnable）
- 正在运行（Running）
- 阻塞（Blocked）
- 终止（Dead）

![](D:\用户\黄亮\Pictures\线程的声明周期.png) 

Sleep方法应用

- Thread 类的方法

public static void sleep(long millis)

- 作用：在指定的毫秒数内让正在执行的线程休眠
- 参数为休眠的时间，单位是毫秒

join方法应用

- Thread类的方法

public final void join()

- 作用：等待调用该方法的线程结束后才能执行

FileInputStream

- 从文件系统中的某个文件中获得输入字节
- 用于读取诸如图像数据之类的原始字节流