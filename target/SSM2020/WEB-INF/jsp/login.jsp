<%--
  Created by IntelliJ IDEA.
  User: HP
  Date: 2020.7.24.024
  Time: 14:43
  To changethis template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录页面</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css" media="all">
    <style>
        .layui-input {
            display: block;
            width: 300px;
        }
        .layui-btn {
            display: block;
            width: 250px;
            height: 40px;
            margin: auto;
            border-radius: 20px;
        }
        .form-block {
            width: 500px;
            height: 300px;
            margin: 150px auto;
        }
        .layui-form,
        .layui-form-item,
        .layui-btn {
            margin-top: 30px;
        }
        body {
            background-color: #eee;
        }
    </style>
</head>
<body>
<ul class="layui-nav" style="background-color:#4E5465;">
    <li class="layui-nav-item">GY宿舍管理系统</li>

</ul>
<div class="form-block">
    <form class="layui-form"  action="/student/loginStu" method="post">
        <div class="layui-form-item">
            <label class="layui-form-label">学号</label>
            <div class="layui-input-block">
                <input type="text" name="sno" lay-verify="title" autocomplete="off" placeholder="请输入学号" class="layui-input" value="3217005014">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-block">
                <input type="password" name="password" lay-verify="required" lay-reqtext="学号是必填项，不能为空！" placeholder="请输入密码" autocomplete="off" class="layui-input" value="1258963">
            </div>
        </div>
        <div>
            <button type="submit" class="layui-btn" >登&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp录</button>
        </div>
    </form>
</div>
<div class="layui-footer" style="background-color:#eee; width: 300px; margin-left: 580px">
    <!-- 底部固定区域 -->
    © layui.com - 底部固定区域
</div>
</body>
</html>
