<%--
  Created by IntelliJ IDEA.
  User: yxd
  Date: 2020/7/26
  Time: 19:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>宿舍管理系统</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css" media="all">
    <style>
    </style>
</head>
<body>
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">GY宿舍管理系统</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
<%--        <ul class="layui-nav layui-layout-left">--%>
<%--            <li class="layui-nav-item"><a href="">控制台</a></li>--%>
<%--            <li class="layui-nav-item"><a href="">商品管理</a></li>--%>
<%--            <li class="layui-nav-item"><a href="">用户</a></li>--%>
<%--            <li class="layui-nav-item">--%>
<%--                <a href="javascript:;">其它系统</a>--%>
<%--                <dl class="layui-nav-child">--%>
<%--                    <dd><a href="">邮件管理</a></dd>--%>
<%--                    <dd><a href="">消息管理</a></dd>--%>
<%--                    <dd><a href="">授权管理</a></dd>--%>
<%--                </dl>--%>
<%--            </li>--%>
<%--        </ul>--%>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
<%--                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">--%>
                    你好！
                </a>
<%--                <dl class="layui-nav-child">--%>
<%--                    <dd><a href="">基本资料</a></dd>--%>
<%--                    <dd><a href="">安全设置</a></dd>--%>
<%--                </dl>--%>
            </li>
            <li class="layui-nav-item"><a href="/student/logout">退出</a></li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black left-nav">
        <div class="layui-side-scroll side-nav">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" id="nav" lay-filter="test">
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="iconfont"></i>
                        <cite>信息管理</cite>
                        <i class="iconfont nav_right"></i>
                    </a>
                    <ul class="layui-nav-child sub-menu">
                        <li>
                            <a _href="/goStudent">
                                <i class="iconfont"></i>
                                <cite>学生信息</cite>
                            </a>
                        </li>
                        <li>
                            <a _href="/goDormitory">
                                <cite>水电信息</cite>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="layui-nav-item">
                    <a _href="/goSelect">
                        <i class="iconfont"></i>
                        <cite>费用查询</cite>
                        <i class="iconfont nav_right"></i>
                    </a>
                </li>
<%--                <li class="layui-nav-item">--%>
<%--                    <a href="javascript:;">--%>
<%--                        <i class="iconfont"></i>--%>
<%--                        <cite>测试父级一</cite>--%>
<%--                        <i class="iconfont nav_right"></i>--%>
<%--                    </a>--%>
<%--                    <ul class="layui-nav-child sub-menu">--%>
<%--                        <li>--%>
<%--                            <a _href="javascript:;">--%>
<%--                                <i class="iconfont"></i>--%>
<%--                                <cite>测试子级一</cite>--%>
<%--                            </a>--%>
<%--                        </li>--%>
<%--                        <li>--%>
<%--                            <a _href="javascript:;">--%>
<%--                                <cite>测试子级二</cite>--%>
<%--                            </a>--%>
<%--                        </li>--%>
<%--                    </ul>--%>
<%--                </li>--%>
            </ul>
        </div>
    </div>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div class="layui-tab tab" lay-filter="home-tab" lay-allowClose="true">
            <ul class="layui-tab-title"><!--标签页标题-->
                <li class="home"><i class="layui-icon">&#xe68e;</i>主页</li>
            </ul>
            <div class="layui-tab-content" ><!--标签页内容-->
                <div class="layui-tab-item layui-show o_div" >
                    欢迎你！
                </div>
            </div>
        </div>
    </div>

    <div class="layui-footer">
        <!-- 底部固定区域 -->
        © layui.com
    </div>
</div>
<script type="text/javascript" src="/lib/layui/layui.all.js"></script>
<script>$=layui.jquery</script>
<script type="text/javascript" src="/js/switch.js"></script>
</body>
</html>
