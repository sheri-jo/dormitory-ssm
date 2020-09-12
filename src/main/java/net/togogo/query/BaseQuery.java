package net.togogo.query;
// 封装前台页面传来的分页查询参数
public class BaseQuery {
    private Integer page = 1;
    private Integer limit = 10;
    private String q;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }
}


