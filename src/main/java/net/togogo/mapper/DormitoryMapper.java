package net.togogo.mapper;

import net.togogo.bean.Dormitory;
import net.togogo.query.DormitoryQuery;

import java.util.List;

public interface DormitoryMapper extends BaseMapper<Dormitory>{
    /**
     * 高级查询
     * @param dormitoryQuery
     * @return advancedQuery
     */
    List<Dormitory> advancedQuery(DormitoryQuery dormitoryQuery);
}
