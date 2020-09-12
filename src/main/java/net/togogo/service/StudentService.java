package net.togogo.service;

import net.togogo.bean.Student;
import net.togogo.query.StudentQuery;
import net.togogo.util.PageUi;

import java.util.List;

public interface StudentService extends BaseService<Student> {
    /**
     * 高级查询
     */
    PageUi<Student> advancedQuery(StudentQuery studentQuery);

    /*login*/
    Student loginStu(Student student);

    List<Student> selectRmateAndRate(Student student);
}
