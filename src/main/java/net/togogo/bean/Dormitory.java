package net.togogo.bean;


public class Dormitory {
    private Integer did;
    private String unit;
    private String room;
    private String wrate;
    private String erate;

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getWrate() {
        return wrate;
    }

    public void setWrate(String wrate) {
        this.wrate = wrate;
    }

    public String getErate() {
        return erate;
    }

    public void setErate(String erate) {
        this.erate = erate;
    }

    @Override
    public String toString() {
        return "Dormitory{" +
                "did=" + did +
                ", unit='" + unit + '\'' +
                ", room='" + room + '\'' +
                ", wrate='" + wrate + '\'' +
                ", erate='" + erate + '\'' +
                '}';
    }
}
