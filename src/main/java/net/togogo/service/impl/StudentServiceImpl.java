package net.togogo.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import net.togogo.bean.Student;
import net.togogo.mapper.BaseMapper;
import net.togogo.mapper.StudentMapper;
import net.togogo.query.StudentQuery;
import net.togogo.service.StudentService;
import net.togogo.util.PageUi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl extends BaseServiceImpl<Student> implements StudentService {
    @Autowired
    private StudentMapper studentMapper;
    @Override
    protected BaseMapper<Student> getMapper() {
        return studentMapper;
    }

    @Override
    public PageUi<Student> advancedQuery(StudentQuery studentQuery) {

        PageUi<Student> pageUi = new PageUi<>();
        Page<Student> page = PageHelper.startPage(studentQuery.getPage(), studentQuery.getLimit());
        //查询当前页数据
        Page<Student> student = (Page<Student>)studentMapper.advancedQuery(studentQuery);
        //获取总条数
        long total = page.getTotal ();
        pageUi.setCount(total);
        pageUi.setData(student);

        return pageUi;
    }

    @Override
    public Student loginStu(Student student) {
        return studentMapper.loginStu(student);
    }

    @Override
    public List<Student> selectRmateAndRate(Student student) {
        System.out.println(student);
        return studentMapper.selectRmateAndRate(student);
    }
}


