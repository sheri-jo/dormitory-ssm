/**
 * 序列化表格元素为 JSON，相同的 checkbox 用分号拼接起来
 */
$.fn.serializeJson = function (otherStr) {
    var obj = {},
        arr = this.serializeArray();
    $(arr).each(function () {
        if (obj[this.name]) {
            obj[this.name] += ';' + this.value;
        } else {
            obj[this.name] = this.value;
        }
    });
    if (otherStr != undefined) {
        var otherArr = otherStr.split(';');
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
    var obj = this;
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
                        radioObj[i].click();
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

//注册组件
layui.use(['table', 'layer', 'form', 'laypage', 'laydate', 'upload'], function () {
    var laydate = layui.laydate,
        table = layui.table,
        form = layui.form,
        upload = layui.upload;

    /**
     * 学生信息表
     */
    table.render({
        elem: '#dormitory_table',
        height: 'full-150',
        url: '/dormitory/page', //数据接口
        toolbar: '#dormitory_toolbar', //自定义工具栏
        // toolbar: true, // layui 的默认工具栏,默认工具栏中只包含筛选列，导出和打印功能
        page: true, //开启分页
        // height: $(document).height() - $('#dormitory_form').offset().top - 15, // 固定分页栏
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'unit', title: '楼号', sort: true},
            {field: 'room', title: '房间号', sort: true},
            {field: 'wrate', title: '水费'},
            {field: 'erate', title: '电费'},
            {fixed: 'right', width: 165, align: 'center', toolbar: '#form_bar'}
        ]],
        id: "dormitory-list" //重载表的时候被引用， table.reload('dormitory-list');
    });

    // 监听头工具栏事件 -> table 原始容器的属性 lay-filter="对应的值"
    table.on('toolbar(dormitory_table)', function (obj) {
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
                            console.debug('正在删除');
                            for (var i = 0; i < data.length; i++) {
                                //发送请求到后台
                                $.post("dormitory/delete", {did: data[i].did}, function (result) {
                                    if (result.success == true) { // 删除成功，刷新当前页表格
                                        layer.msg(result.msg, {icon: 1, time: 1500, offset: '120px'});
                                        // layer.close(index); // 右上角关闭按钮触发的回调
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
                        // 按钮2的回调
                        btn2: function () {
                            layer.msg('你已取消删除操作。', {icon: 1, time: 1500, offset: '120px'});
                        }
                    });
                }
                break;
            case 'add':
                dormitory_form('添加菜单', 'url这个值不管', 400, 330);
                $("#dormitory_form").setForm({
                    did: data.did,
                    unit: data.unit,
                    room: data.room,
                    wrate: data.wrate,
                    erate: data.erate,
                });
                break;
        }
    });

    // 监听行工具事件 -> table 原始容器的属性 lay-filter="对应的值"
    table.on('tool(dormitory_table)', function (obj) {
        var data = obj.data, // 获得当前行数据
            layEvent = obj.event; // 获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; // 获得当前行 tr 的 DOM对象
        switch (layEvent) {
            case 'detail':
                var jsonStr = JSON.stringify(data);
                layer.alert(jsonStr, {offset: '120px'});
                break;
            case 'del':
                layer.confirm('您确定删除 宿舍：' + data.unit + '-' + data.room + ' 的数据吗？',
                    {offset: '120px'},
                    function (index) {
                        //向服务端发送删除指令，在这里可以使用Ajax异步
                        $.post("dormitory/delete", {did: data.did}, function (ret) {
                            if (ret.success == true) {//删除成功，刷新当前页表格
                                layer.msg(ret.msg, {icon: 1, time: 1500}, function () {
                                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                    layer.close(index);
                                    // $(".layui-laypage-btn").click();//点击分页刷新当前页
                                });
                            } else if (ret.success == false) {  //删除失败
                                layer.alert(ret.msg, {icon: 2}, function () {
                                    layer.close(index);
                                    // $(".layui-laypage-btn").click();
                                    window.location.reload();
                                });
                            }
                        });
                    }
                );
                break;
            case 'edit':
                console.debug(data);
                dormitory_form('编辑菜单', 'url这个值不管', 400, 330);
                //回显数据
                $("#dormitory_form").setForm({
                    did: data.did,
                    unit: data.unit,
                    room: data.room,
                    wrate: data.wrate,
                    erate: data.erate,
                });
                break;
        }
    });

    //监听提交
    form.on('submit(dormitory_submit)', function (data) {
        console.log(data.field)
        var formData = data.field;
        var did = formData.did,
            unit = formData.unit,
            room = formData.room,
            wrate = toFixedTwo(formData.wrate),
            erate = toFixedTwo(formData.erate);
        $.ajax({
            type: "post",  // 数据提交方式（post/get）
            url: "/dormitory/save",  // 提交到的url
            data: {
                "did": did,
                "unit": unit,
                "room": room,
                "wrate": wrate,
                "erate": erate,
            }, // 提交的数据
            dataType: "json", // 返回的数据类型格式
            success: function (msg) {
                if (msg.success) {  // 成功
                    // 关闭编辑窗口
                    layer.closeAll();
                    // 弹出提示窗口
                    layer.alert(msg.msg, {icon: 1, time: 2500, title: '操作成功', offset: '120px'});
                    // 刷新dormitory_table
                    table.reload('dormitory-list');
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

        return false; //false：阻止表单跳转  true：表单跳转
    });

    //高级查询 -> 监听提交 -> 提交按钮 lay-filter="search"
    form.on('submit(search)', function (data) {
        // layer.msg(JSON.stringify(data.field));//表格数据序列化
        var formData = data.field;
        console.debug(formData);
        var unit = formData.unit,
            room = formData.room;
        //数据表格重载
        table.reload('dormitory-list', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: { //这里传参 向后台
                unit: unit,
                room: room,
                // startTime: startTime,
                // endTime: endTime
            },
            url: '/dormitory/advancedQuery',
            method: 'post'
        });
        return false;//false：阻止表单跳转  true：表单跳转
    });

});


var index; // layer.open 打开窗口后的索引，通过 layer.close(index)的方法可关闭
//表单弹出层
function dormitory_form(title, url, w, h) {
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
        offset: '25px',
        fix: false, // 不固定
        maxmin: true, // 开启最大化最小化按钮
        shadeClose: true, // 点击阴影处可关闭
        shade: 0.4,// 背景灰度
        skin: 'layui-layer-rim', // 加上边框
        content: $("#dormitory_pop_box")
    });
}
function toFixedTwo(str) {
    return parseFloat(str).toFixed(2) + ''
}