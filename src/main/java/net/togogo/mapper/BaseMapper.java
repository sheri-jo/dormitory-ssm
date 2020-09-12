package net.togogo.mapper;

import net.togogo.query.BaseQuery;

import java.util.List;

public interface BaseMapper<T> {
    int deleteByPrimaryKey(Integer id);

    int insert(T t);

    T selectByPrimaryKey(Integer id);

    List<T> selectAll();

    int updateByPrimaryKey(T t);

    List<T> findByPage(BaseQuery query);
}
