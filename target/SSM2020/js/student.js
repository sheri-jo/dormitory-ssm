/**
 * 序列化表格元素为 JSON，相同的 checkbox 用分号拼接起来
 */
$.fn.serializeFormToJson = function () {
    var arr = $(this).serializeArray();
    var param = {};
    $.each(arr, function (i, obj) {
        param[obj.name] = obj.value;
    })
    return param;
}
$.fn.serializeJson = function (otherStr) {
    var obj = {},
        arr = this.serializeArray();
    $(arr).each(function () {
        if (obj[this.name]) { // checkbox
            obj[this.name] += ';' + this.value;
        } else {
            obj[this.name] = this.value;
        }
    });
    if (otherStr != undefined) {
        var otherArr = otherStr.split(';'); // 'name: value;'
        $(otherArr).each(function () {
            var otherSplitArr = this.split(':');
            obj[otherSplitArr[0]] = otherSplitArr[1];
        });
    }
    return obj;
};
/**
 * 将 josn 对象赋值给 form
 */
$.fn.setForm = function (jsonValue) {
    let obj = this;
    $.each(jsonValue, function (name, ival) {
        var $oinput = obj.find("input[name=" + name + "]");
        if ($oinput.attr("type") == "checkbox") {
            if (ival !== null) {
                var checkboxObj = $("[name=" + name + "]");
                var checkArray = ival.split(";");
                for (var i = 0; i < checkboxObj.length; i++) {
                    for (var j = 0; j < checkArray.length; j++) {
                        if (checkboxObj[i].value == checkArray[j]) {
                            checkboxObj[i].click();
                        }
                    }
                }
            }
        } else if ($oinput.attr("type") == "radio") {
            $oinput.each(function () {
                var radioObj = $("[name=" + name + "]");
                for (var i = 0; i < radioObj.length; i++) {
                    if (radioObj[i].value == ival) {
                        radioObj[i].click(); // 触发点击
                    }
                }
            });
        } else if ($oinput.attr("type") == "textarea") {
            obj.find("[name=" + name + "]").html(ival);
        } else {
            obj.find("[name=" + name + "]").val(ival);
        }
    })
}

// 注册组件
layui.use(['table', 'layer', 'form', 'laypage'], function () {
    let table = layui.table,
        form = layui.form;
    /**
     * 学生信息表
     */
    table.render({
        elem: '#student_table', // 绑定容器
        url: '/student/page', // 设置数据接口 默认会自动传递两个参数 page limit
        toolbar: '#student_toolbar', // 自定义工具栏
        // toolbar: true, // 开启 layui 的默认工具栏,默认工具栏中只包含筛选列，导出和打印功能
        page: true, // 开启分页，可传入 Boolean/Object，对象可包含 laypage 组件所有支持的参数
        height: 'full-150',
        /**
         * 返回 table 表数据后台已进行相应配置，有相应的格式
         * @param res
         * @returns {{code: number, msg: string, count: number, data: *}}
         */
        /* 与后端对应
        parseData:function (res) { // res 即为原始返回的数据
            return{
                "code":0, // layui规定的状态码为 0
                "msg":"",
                "count":1000,
                data:res
            }
        },
        request: {
            pageName: 'curr', //页码的参数名称，默认：page
            limitName: 'nums' //每页数据量的参数名，默认：limit
        },
        response: {
            statusName: 'status', //规定数据状态的字段名称，默认：code
            statusCode: 200, //规定成功的状态码，默认：0
            msgName: 'hint', //规定状态信息的字段名称，默认：msg
            countName: 'total', //规定数据总数的字段名称，默认：count
            dataName: 'rows', //规定数据列表的字段名称，默认：data
        },
         */
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'sno', title: '学号', sort: true},
            {field: 'name', title: '姓名'},
            {fixed: 'right', width: 165, align: 'center', toolbar: '#form_bar'}
        ]],
        id: "student-list" // 重载表的时候被引用， table.reload('student-list');
    });

    // 监听头工具栏事件 -> table 原始容器的属性 lay-filter="对应的值"
    table.on('toolbar(student_table)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id), // 获取表格选中行
            data = checkStatus.data; // 获取选中的数据
        data = eval("(" + JSON.stringify(data) + ")");
        switch (obj.event) {
            case 'delAll':
                if (data.length === 0) {
                    layer.msg('请至少选择1行', {icon: 2, time: 1500, offset: '150px',});
                } else {
                    layer.alert('您确认要删除' + data.length + '条数据吗？', {
                        skin: 'layui-layer-molv', // 样式类名 layui-layer-lan 或 layui-layer-molv 自定义样式
                        closeBtn: 1, // 是否显示关闭按钮
                        anim: 1, // 动画类型
                        btn: ['确定', '取消'], // 按钮
                        icon: 2, // icon
                        offset: '120px',
                        yes: function () {
                            for (var i = 0; i < data.length; i++) {
                                console.debug("sno:======" + data[i].sno)
                                //发送请求到后台
                                $.post("student/delete", {sid: data[i].sid}, function (result) {
                                    if (result.success == true) { // 删除成功，刷新当前页表格
                                        layer.msg(result.msg, {icon: 1, time: 1500, offset: '120px'});
                                        $(".layui-laypage-btn").click(); // 点击分页刷新当前页
                                    } else if (result.success == false) { //删除失败
                                        layer.alert(result.msg, {icon: 2, offset: '120px'}, function () {
                                            $(".layui-laypage-btn").click();
                                            window.location.reload();
                                        });
                                    }
                                });
                            }
                        },
                        // 按钮 2的回调
                        btn2: function () {
                            layer.msg('你已取消删除操作。', {icon: 1, time: 1500, offset: '120px'});
                        }
                    });
                }
                break;
            case 'add':
                student_form('添加菜单', 'url这个值不管', 400, 250);
                $("#student_form").setForm({
                    sid: data.sid, // null
                    sno: data.sno,
                    name: data.name,
                });
                break;
        }
    });

    // 监听行工具事件 -> table 原始容器的属性 lay-filter="对应的值"
    table.on('tool(student_table)', function (obj) {
        var data = obj.data, // 获得当前行数据
            layEvent = obj.event; // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; // 获得当前行 tr 的 DOM对象
        switch (layEvent) {
            case 'detail':
                var jsonStr = JSON.stringify(data);
                layer.alert(jsonStr, { offset: '120px'});
                break;
            case 'del':
                layer.confirm('您确定删除学号：' + data.sno + '的数据吗？',
                    { offset: '120px'},
                    function (index) {
                        //向服务端发送删除指令，在这里可以使用Ajax异步
                        $.post("student/delete", {sid: data.sid}, function (ret) {
                            if (ret.success == true) {//删除成功，刷新当前页表格
                                layer.msg(ret.msg, {icon: 1, time: 1500}, function () {
                                    obj.del(); //删除对应行（tr）的 DOM结构，并更新缓存
                                    layer.close(index);
                                });
                            } else if (ret.success == false) {  //删除失败
                                layer.alert(ret.msg, {icon: 2}, function () {
                                    layer.close(index);
                                    window.location.reload();
                                });
                            }
                        });
                    }
                );
                break;
            case 'edit':
                console.debug(data);
                student_form('编辑菜单', 'url这个值不管', 400, 250);
                // 数据回显
                $("#student_form").setForm({
                    sid: data.sid,
                    sno: data.sno,
                    name: data.name,
                });
                break;
        }
    });

    // 监听单元格编辑 -> table 原始容器的属性 lay-filter="对应的值"
    // 单元格被编辑，且值发生改变时触发
    /*
    table.on('edit(student_table)', function (obj) {

        console.debug('编辑成功');
        let value = obj.value, // 得到修改后的值
            data = obj.data, // 得到所在行所有键值
            field = obj.field; // 得到字段
        layer.msg('[ID: ' + data.sid + '] ' + field + ' 字段更改为：' + value);
    });
    */

    //监听提交
    form.on('submit(student_submit)', function (data) {
        console.log(data.field)
        let formData = data.field;
        let sid = formData.sid,
            name = formData.name,
            sno = formData.sno;
        $.ajax({
            type: "post",  // 数据提交方式（post/get）
            url: "/student/save",  // 提交到的url
            data: {
                "sid": sid,
                "name": name,
                "sno": sno
            }, // 提交的数据
            dataType: "json", // 返回的数据类型格式
            success: function (msg) {
                if (msg.success) {  // 成功
                    // 关闭编辑窗口
                    layer.closeAll();
                    layer.alert(msg.msg, {icon: 1, time: 2500, title: '操作成功',  offset: '120px'});
                    table.reload('student-list');
                } else {  // 失败
                    layer.open({
                        icon: 2,
                        // time:1500,
                        type: 0,
                        title: '操作失败',
                        content: msg.msg,
                        area: ['200px', '150px'],
                        offset: '120px'
                    });
                }
            }
        });
        return false; // false：阻止表单跳转  true：表单跳转
    });

    //高级查询 -> 监听提交 -> 提交按钮 lay-filter="search"
    form.on('submit(search)', function (data) {
        // layer.msg(JSON.stringify(data.field));//表格数据序列化
        let formData = data.field;
        let sno = formData.sno;
        //数据表格重载
        table.reload('student-list', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: { //这里传参 向后台
                sno: sno,
                // startTime: startTime,
                // endTime: endTime
            },
            url: '/student/advancedQuery',
            method: 'post'
        });
        return false;//false：阻止表单跳转  true：表单跳转
    });

});


var index; // layer.open 打开窗口后的索引，通过 layer.close(index)的方法可关闭
//表单弹出层
function student_form(title, url, w, h) {
    if (title == null || title == '') {
        title = false;
    }
    if (url == null || url == '') {
    }
    // url="404.html";
    if (w == null || w == '') {
        w = ($(window).width() * 0.9);
    }
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    }
    index = layer.open({  // layer提供了5种层类型。可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
        type: 1,
        title: title,
        area: [w + 'px', h + 'px'], // 类型：String/Array，默认：'auto'  只有在宽高都定义的时候才不会自适应
        offset: '80px',
        fix: false, // 不固定
        maxmin: true, // 开启最大化最小化按钮
        shadeClose: true, // 点击阴影处可关闭
        shade: 0.4,// 背景灰度
        skin: 'layui-layer-rim', // 加上边框
        content: $("#student_pop_box")
    });
}

