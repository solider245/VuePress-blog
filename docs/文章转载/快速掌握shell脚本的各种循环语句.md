---
title : 快速掌握shell脚本的各种循环语句
description : 在此处添描述
author : 中箭的吴起
image : 在此处放上图片链接
date : 2020-08-22 21:23:52 +0800
categories:
 -
tags:
 -
---
[[toc]]

## **概览**


​shell的各种循环语句：for、while、until、select​

## 1、for循环


#语法结构

### **第一种：取值变量**

```shell
for 变量名 in 变量取值表  
do  
    指令   
done
```

#例子：

```shell
#示例  
for a in {1..9}  
do  
 mkdir dir$a  
done  
#说明：创建9个目录
```

  

**第二种：C语言型for循环**

```shell
for ((exp1; exp2; exp3))  
do  
    指令  
done
```

###例子：

```shell
#示例  
for ((i=1;i<=3;i++))  
do  
 echo $i  
done  
#解释:i从1开始,当i<=3就可以运行,如果运行的值大于3,就退出循环  
  
#语法结构讲解  
for关键字后的双括号是三个表达式，  
第一个是变量初始化（例如：i=1）,第二个为变量的范围（例如i<=3）,第三个为变量自增或自减（例如i++）。  
当第一个表达式的初始化值符合第二个变量的范围时，就进行如循环执行，当条件不满足时就退出循环
```

  

###简单示例

####1.竖向打印10 9 8 7 6 5几个数字  
**第一种方法:直接列出元素**

```
[root@game scripts]# cat for1.sh   
#!/bin/bash  
  
for i in 1 2 3 4 5  
do  
    echo $i  
done  
  
#效果  
[root@game scripts]# sh for1.sh   
1  
2  
3  
4  
5
```

  

**第二种方法:使用大括号{}生成数字序列**

```shell
[root@game scripts]# cat for2.sh   
#!/bin/bash  
  
for i in {1..5}  
do  
    echo $i  
done  
  
#效果  
[root@game scripts]# sh for2.sh   
1  
2  
3  
4  
5
```

  

**#第三种方法:使用seq生成数字序列**

```shell
[root@game scripts]# cat for3.sh   
#!/bin/bash  
  
for i in `seq 1 5`  
do  
    echo $i  
done  
  
#效果  
[root@game scripts]# sh for3.sh   
1  
2  
3  
4  
5
```

  

**#2.获取当前目录下的目录或文件名,并将其作为变量列表打印输出**

```shell
#数据  
[root@game ~]# mkdir -p /test/{test1.txt,test2.txt,guo.txt,ke.txt}  
[root@game ~]# ls -l /test/  
total 0  
drwxr-xr-x. 2 root root 6 Aug 21 22:14 guo.txt  
drwxr-xr-x. 2 root root 6 Aug 21 22:14 ke.txt  
drwxr-xr-x. 2 root root 6 Aug 21 22:14 test1.txt  
drwxr-xr-x. 2 root root 6 Aug 21 22:14 test2.txt  
  
#编写脚本  
[root@game scripts]# cat for4.sh   
#!/bin/bash  
usage(){  
    echo "directory not found"  
}  
  
[ ! -d /test ] && usage && exit 1  
cd /test  
  
for i in `ls`  
do  
    echo $i  
done  
  
效果  
[root@game scripts]# sh for4.sh   
guo.txt  
ke.txt  
test1.txt  
test2.txt
```

  

## 2、while循环


###while循环一般应用于守护进程程序或一直循环执行

###语法格式

```shell
while <条件表达式>  
do  
    指令  
done
```

#简单示例

```shell
每隔2秒在屏幕上输出一次负载值  
[root@game scripts]# cat while1.sh   
#!/bin/bash  
  
while true  
do  
    uptime  
    sleep 2 #暂停2秒再执行  
done  
#提示：while true表示条件永远为真，因此会一直运行，像死循环一样，称为守护进程  
  
#效果:每隔2秒就输出一次  
[root@game scripts]# sh while1.sh   
 23:11:35 up 2 days,  2:00,  2 users,  load average: 0.00, 0.01, 0.05  
 23:11:37 up 2 days,  2:00,  2 users,  load average: 0.00, 0.01, 0.05  
 23:11:39 up 2 days,  2:00,  2 users,  load average: 0.00, 0.01, 0.05
```

  

## 3、until循环


###until循环是当条件表达式不成立时，就会进入循环，当条件表达式成立时，就会终止循环

###语法格式

```shell
until <条件表达式>  
do  
    指令  
done
```

#示例

```sh
#如果用户输出的是guoke就符合条件,退出循环,如果不是,用户输入3次之后就退出循环  
[root@game scripts]# cat until1.sh  
#!/bin/bash  
  
i=1  
until [ "$user" = "guoke" -o "$i" -gt 3 ]  
do  
    read -p "please enter you username:" user  
    let i++  
done  
  
#效果  
[root@game scripts]# sh until1.sh   
please enter you username:guoke  
[root@game scripts]# sh until1.sh   
please enter you username:1  
please enter you username:1  
please enter you username:1  
[root@game scripts]#
```

  

## 4、select循环


####语法格式

```shell
select 变量名 in [菜单取值列表]  
do  
    指令  
done
```

###示例

```shell
#第一种:直接使用列表字符串  
[root@game scripts]# cat select1.sh   
#!/bin/bash  
  
select name in apache httpd nginx tomcat  
do  
    echo $name  
done  
  
#效果  
[root@game scripts]# sh select1.sh   
1) apache  
2) httpd  
3) nginx  
4) tomcat  
#? 1  
apache  
#? 3  
nginx  
#? 4  
tomcat  
#? ^C  
  
  
#第二种:采用数组做变量列表  
[root@game scripts]# cat select2.sh   
#!/bin/bash  
​  
array=(aache nginx tomcat lighttpd)  
select name in "${array[@]}"  
do  
    echo $name  
done  
#效果  
[root@game scripts]# sh select2.sh   
1) apache  
2) nginx  
3) tomcat  
4) lighttpd  
#? 3  
tomcat  
#? 4  
lighttpd  
#? ^C
```

  

## 5.循环控制及状态返回值


* break (循环控制)  
* continue (循环控制)  
* exit (退出脚本)  
* return (退出函数)

####区别

```shell
break continue在条件语句及循环语句(for if while等)中用于控制程序的走向  
exit是终止所有语句并退出脚本  
return:仅用于在函数内部返回函数执行的状态值
```

  

#break示例

```shell
#如果i等于3,那么就终止循环  
[root@game scripts]# cat break1.sh   
#!/bin/bash  
  
for ((i=0;i<=5;i++))  
do  
    if [ $i -eq 3 ];then  
    break  
    else  
    echo $i  
    fi  
done  
echo "1111"  
yum install net-tools -y > /dev/null  
[ $? -eq 0 ] && echo "already install"  
  
  
#效果  
[root@game scripts]# sh break1.sh   
0  
1  
2  
1111  
already install  
#说明:i等于3的时候就终止循环,但是没有跳出脚本
```

  

####exit示例

```shell
[root@game scripts]# cat exit1.sh  
#!/bin/bash  
  
for ((i=0;i<=5;i++))  
do  
    if [ $i -eq 3 ];then  
    exit 1  
    fi  
    echo $i  
done  
echo "ok"  
  
#执行效果  
[root@game scripts]# sh exit1.sh  
0  
1  
2  
#说明:当i等于3的时候就会退出脚本了,就不会执行后面的语句
```

  

####continue示例

```shell
[root@game scripts]# cat con1.sh   
#!/bin/bash  
  
for ((i=0;i<=5;i++))  
do  
    if [ $i -eq 3 ];then  
    continue  
    else  
    echo $i  
    fi  
done  
echo "ok"  
  
#执行效果  
[root@game scripts]# sh con1.sh   
0
```

  
