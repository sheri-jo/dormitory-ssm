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
layui.use(['table', 'form'], function () {
    var form = layui.form,
        table = layui.table;

    table.render({
        elem: '#select_table',
        height: 'full-180',
        cols: [[
            {field: 'sno', title: '学号', sort: true},
            {field: 'name', title: '姓名'},
            {
                field: 'dormitory', title: '宿舍号', templet: function (d) {
                    return d.dormitory.unit + '-' + d.dormitory.room
                }
            },
            {
                field: 'wrate', title: '水费', templet: function (d) {
                    return d.dormitory.wrate
                }
            },
            {
                field: 'erate', title: '电费', templet: function (d) {
                    return d.dormitory.erate
                }
            },
        ]],
        id: "select-list" //重载表的时候被引用， table.reload('select-list');
    });

    form.on('submit(search)', function (data) {
        var formData = data.field;
        var sno = formData.sno;
        if (sno == '') {
            layer.alert('请输入筛选条件！', {icon: 2, time: 1500});
            return false;
        }
        $('.resultBox').removeClass('hide');
        table.reload('select-list', {
            where: { //这里传参 向后台
                sno: sno,
            },
            url: '/student/rmateAndRate',
            method: 'get'
        });
    });
});

