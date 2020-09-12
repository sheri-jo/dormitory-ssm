package net.togogo.mapper;

import net.togogo.bean.Student;
import net.togogo.query.StudentQuery;

import java.util.List;

public interface StudentMapper extends BaseMapper<Student>{
    /**
     * 高级查询
     * @param studentQuery
     * @return advancedQuery
     */
    List<Student> advancedQuery(StudentQuery studentQuery);
    /*login*/
    Student loginStu(Student student);

    List<Student> selectRmateAndRate(Student student);
}