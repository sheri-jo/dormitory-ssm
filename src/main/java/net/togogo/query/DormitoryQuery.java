package net.togogo.query;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class DormitoryQuery extends BaseQuery {

    private String unit;
    private String room;

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
}

