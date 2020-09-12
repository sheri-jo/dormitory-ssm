package net.togogo.util;

import java.util.ArrayList;
import java.util.List;
// 封装后台传往前台的表格中的数据，LayUi的table表格需要以一种特殊的格式接收数据，否则会报错
public class PageUi<T> {

    private Integer code = 0;
    private String msg;
    private Long count;
    private List<T> data = new ArrayList<>();

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}

