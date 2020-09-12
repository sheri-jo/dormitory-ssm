package net.togogo.query;

// 封装前台查询传来的参数
public class StudentQuery extends BaseQuery {

    private Integer did;
    private String sno;
    private String name;

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

