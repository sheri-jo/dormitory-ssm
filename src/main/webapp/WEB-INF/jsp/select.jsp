<%--
  Created by IntelliJ IDEA.
  User: yxd
  Date: 2020/7/28
  Time: 18:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="lib/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="css/common.css">
    <style>
        .hide {
            opacity: 0;
        }
    </style>
</head>
<body>
<div id="select-manage">
    <%--查询表单--%>
    <fieldset class="layui-elem-field site-demo-button">
        <legend>信息查询</legend>
        <div class="layui-form layui-row">
            <div class="layui-col-lg3 layui-col-md4 layui-col-sm6">
                <div class="layui-form-item">
                    <label class="layui-form-label">学号</label>
                    <div class="layui-input-inline">
                        <input type="text" name="sno" id="select-sno" lay-verify="" placeholder="请输入学号"
                               autocomplete="off" class="layui-input" value="3217005014">
                    </div>
                </div>
            </div>
            <div class="layui-col-lg3 layui-col-md4 layui-col-sm6">
                <button class="layui-btn layui-btn-sm button-search" lay-submit lay-filter="search">
                    <i class="layui-icon">&#xe615;</i>查询
                </button>
            </div>
        </div>
    </fieldset>
    <fieldset class="layui-elem-field site-demo-button hide resultBox">
        <legend>查询结果</legend>
        <div>
            <table id="select_table" lay-filter="select_table"></table>
        </div>
    </fieldset>
</div>

<script type="text/javascript" src="lib/layui/layui.all.js"></script>
<script> $ = layui.jquery </script>
<script type="text/javascript" src="js/select.js"></script>
</body>
</html>
