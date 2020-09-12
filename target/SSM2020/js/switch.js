$(function () {
    // 加载弹出层
    layui.use(['element'],
        function () {
            element = layui.element;
        });

    // 触发事件
    var tab = {
        tabAdd: function (title, url, id) {
            //新增一个Tab项
            element.tabAdd('home-tab', {
                title: title,
                content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe" width="100%" height="400px"></iframe>',
                id: id
            })
        },
        tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('home-tab', '44');
            othis.addClass('layui-btn-disabled');
        },
        tabChange: function (id) {
            //切换到指定Tab项
            element.tabChange('home-tab', id);
        }
    };

    // 左侧菜单效果
    $('.left-nav #nav li').click(function (event) {
        // 如果有子项目，则展开关闭，修改样式图标和动画  layui-nav-itemed open
        if ($(this).children('.sub-menu').length) {
            if ($(this).hasClass('open')) { // 展开->关闭
                $(this).removeClass('open');
                $(this).find('.nav_right').html('');
                $(this).children('.sub-menu').stop().slideUp(); // stop()停止所有在指定元素上正在运行的动画
            } else { // 关闭->展开
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('');
                $(this).children('.sub-menu').stop().slideDown();
                // $(this).siblings().children('.sub-menu').stop().slideUp(); // siblings()返回被选元素的所有同级元素
                // $(this).siblings().find('.nav_right').html('');
                // $(this).siblings().removeClass('open');
            }
        } else { // 如果没有子项目，则触发右侧页面显示
            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            var index = $('.left-nav #nav li').index($(this)); // 按列表顺序
            console.log(index);
            for (var i = 0; i < $('.x-iframe').length; i++) {
                // 右侧已有相应页面，则切换
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) { // eq()获取当前链式操作中第N个jQuery对象，返回jQuery对象
                    tab.tabChange(index + 1);
                    event.stopPropagation();
                    return;
                }
            }
            // 右侧没有相应页面，则新增并切换
            tab.tabAdd(title, url, index + 1);
            tab.tabChange(index + 1);
        }
        event.stopPropagation(); // 防止冒泡触发父级列
    })
})


