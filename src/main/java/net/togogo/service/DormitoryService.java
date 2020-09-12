package net.togogo.service;

import net.togogo.bean.Dormitory;
import net.togogo.query.DormitoryQuery;
import net.togogo.util.PageUi;

public interface DormitoryService extends BaseService<Dormitory> {
    /**
     * 高级查询
     */
    PageUi<Dormitory> advancedQuery(DormitoryQuery studentQuery);
}
