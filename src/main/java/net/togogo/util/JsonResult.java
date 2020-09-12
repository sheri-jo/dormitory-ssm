package net.togogo.util;

// 封装由后台传向前台的json状态以及信息数据
public class JsonResult {

    private Boolean success = true;
    private String msg;

    public JsonResult() {

    }

    public JsonResult(Boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

