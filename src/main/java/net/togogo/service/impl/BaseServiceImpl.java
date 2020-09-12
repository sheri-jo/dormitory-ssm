package net.togogo.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.togogo.mapper.BaseMapper;
import net.togogo.query.BaseQuery;
import net.togogo.service.BaseService;
import net.togogo.util.PageUi;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public abstract class BaseServiceImpl<T> implements BaseService<T> {
    // 在具体service上实现本方法，获取各自接口
    protected abstract BaseMapper<T> getMapper();

    @Override
    @Transactional
    public void save(T t) {
        getMapper().insert(t);
    }

    @Override
    @Transactional
    public void update(T t) {
        getMapper().updateByPrimaryKey(t);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        getMapper().deleteByPrimaryKey(id);
    }

    @Override
    public T findOne(Integer id) {
        return getMapper().selectByPrimaryKey(id);
    }

    @Override
    public List<T> findAll() {
        return getMapper().selectAll();
    }

    @Override
    public PageUi<T> findByQuery(BaseQuery query) {

        PageUi<T> pageUi = new PageUi<>();
        Page page = PageHelper.startPage(query.getPage(), query.getLimit());
        System.out.println(page);
        //查询当前页的数据
        Page<T> data = (Page<T>) getMapper().findByPage(query);
        //获取总条数
        long count = page.getTotal();
        System.out.println(data);
        pageUi.setCount(count);
        pageUi.setData(data);
        return pageUi;
    }
}


