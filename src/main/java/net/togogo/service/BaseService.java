package net.togogo.service;

import net.togogo.query.BaseQuery;
import net.togogo.util.PageUi;

import java.util.List;

public interface BaseService<T> {
    void save(T t);

    void update(T t);

    void delete(Integer id);

    T findOne(Integer id);

    List<T> findAll();

    PageUi<T> findByQuery(BaseQuery query);
}


