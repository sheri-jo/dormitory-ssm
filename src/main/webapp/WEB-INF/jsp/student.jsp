<%--
  Created by IntelliJ IDEA.
  User: yxd
  Date: 2020/7/27
  Time: 9:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request. getContextPath();
    String basePath = request. getScheme()+"://"+request. getServerName()+":"+request. getServerPort()+path+"/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <title>学生管理</title>
    <link rel="stylesheet" href="lib/layui/css/layui.css" media="all"><%--适用于所有设备--%>
    <link rel="stylesheet" href="css/common.css">
</head>
<body>

<div id="student-manage">
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
    <%--学生信息表--%>
    <fieldset class="layui-elem-field site-demo-button">
        <legend>学生基本信息</legend>
        <div>
            <table id="student_table" lay-filter="student_table"></table>
        </div>
    </fieldset>
</div>
<%--弹出表单--%>
<div class="layui-row" id="student_pop_box" style="display:none; position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
    <div class="layui-col-md11">
        <form id="student_form" class="layui-form" action="" style="margin-top: 20px;align:center;">
            <%--隐藏字段id,区分添加和修改--%>
            <input type="hidden" name="sid"/>
            <div class="layui-form-item">
                <label class="layui-form-label">学号</label>
                <div class="layui-input-block">
                    <input type="text" name="sno" id="sno" lay-verify="required" placeholder="请输入学号"
                           autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">姓名</label>
                <div class="layui-input-block">
                    <input type="text" name="name" id="name" lay-verify="required" placeholder="请输入姓名"
                           autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button class="layui-btn layui-btn-radius layui-btn-normal" lay-submit=""
                            lay-filter="student_submit" <%--onclick="student_submit()"--%>>确认
                    </button>
                    <%--<input type="button" class="layui-btn layui-btn-radius layui-btn-normal" value="确认" onclick="student_submit()" />--%>
                    <button type="reset" class="layui-btn layui-btn-radius layui-btn-primary">重置</button>
                </div>
            </div>
        </form>
    </div>
</div>
<%--信息表的头工具栏按钮，id和 table 头的 toolbar 属性绑定--%>
<script type="text/html" id="student_toolbar">
    <div class="layui-btn-container">
        <button class="layui-btn layui-btn-danger layui-btn-sm" lay-event="delAll"><i class="layui-icon"></i>批量删除
        </button>
        <button class="layui-btn layui-btn-sm layui-btn-warm" lay-event="add" <%--onclick=""--%>><i class="layui-icon"></i>添加
        </button>
    </div>
</script>
<%--信息表的行工具栏按钮，id 和 table 行的 toolbar属性绑定--%>
<script type="text/html" id="form_bar">
    <a <%--class="layui-btn layui-btn-primary layui-btn-xs"--%> lay-event="detail" title="查看"><i class="layui-icon">&#xe63c;</i></a>
    <a <%--class="layui-btn layui-btn-xs"--%> lay-event="edit" title="编辑"><i class="layui-icon">&#xe642;</i></a>
    <a <%--class="layui-btn layui-btn-danger layui-btn-xs"--%> lay-event="del" title="删除">
        <i class="layui-icon">&#xe640;</i>
    </a>
</script>

<script type="text/javascript" src="lib/layui/layui.all.js"></script>
<script> $ = layui.jquery </script>
<script type="text/javascript" src="js/student.js"></script>
</body>
</html>


