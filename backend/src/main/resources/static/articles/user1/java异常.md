异常处理

通过5个关键字来实现：try、catch、finally、throw、throws

捕获异常

try 执行可能产生异常的代码

catch 捕获异常

finally 无论是否发生异常代码总能执行

声明异常

throws 声明可能要抛出的异常

抛出异常

throw 手动抛出异常

```java
public void method() {
    try{
        // 代码段1
        // 产生异常的代码段2
    } catch(异常类型 ex) {
        // 对异常进行处理的代码段3
    } finally {
        // 代码段4
    }
}
```

try 块后可接零个或多个catch块，如果没有catch块，则必须跟一个finally块。

