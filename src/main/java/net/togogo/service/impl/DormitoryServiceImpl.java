package net.togogo.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.togogo.bean.Dormitory;
import net.togogo.mapper.BaseMapper;
import net.togogo.mapper.DormitoryMapper;
import net.togogo.query.DormitoryQuery;
import net.togogo.service.DormitoryService;
import net.togogo.util.PageUi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DormitoryServiceImpl extends BaseServiceImpl<Dormitory> implements DormitoryService {
    @Autowired
    private DormitoryMapper dormitoryMapper;
    @Override
    protected BaseMapper<Dormitory> getMapper() {
        return dormitoryMapper;
    }

    @Override
    public PageUi<Dormitory> advancedQuery(DormitoryQuery dormitoryQuery) {

        PageUi<Dormitory> pageUi = new PageUi<>();
        Page<Dormitory> page = PageHelper.startPage(dormitoryQuery.getPage(), dormitoryQuery.getLimit());
        //查询当前页数据
        Page<Dormitory> dormitory = (Page<Dormitory>)dormitoryMapper.advancedQuery(dormitoryQuery);
        //获取总条数
        long total = page.getTotal ();
        pageUi.setCount(total);
        pageUi.setData(dormitory);

        return pageUi;
    }
}


