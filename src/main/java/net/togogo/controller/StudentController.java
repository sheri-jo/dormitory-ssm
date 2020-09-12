package net.togogo.controller;

import net.togogo.bean.Student;
import net.togogo.query.StudentQuery;
import net.togogo.service.StudentService;
import net.togogo.util.JsonResult;
import net.togogo.util.PageUi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @RequestMapping("")
    public String index() {
        return "home";
    }

    //查询所有信息
    @RequestMapping("/list")
    @ResponseBody
    public List<Student> findAll() {
        System.out.println("查询全部");
        return studentService.findAll();
    }

    //分页查询信息
    @RequestMapping("/page")
    @ResponseBody
    public PageUi<Student> findByPage(StudentQuery studentQuery) {
        return studentService.findByQuery(studentQuery);
    }

    //返回的结果：{success:true, msg:xxxx}
    @RequestMapping("/save")
    @ResponseBody
    public JsonResult save(Student student) {
        System.out.println(student);
        try {
            if (student.getSid() != null) {
                // 传入sid，即更新学生信息
                studentService.update(student);
                return new JsonResult(true, "修改成功！");
            } else {
                // 添加学生
                // 注册
                studentService.save(student);
                return new JsonResult(true, "添加成功！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new JsonResult(false, e.getMessage());
        }
    }

    @RequestMapping("/delete")
    @ResponseBody
    public JsonResult delete(Integer sid) {
        try {
            studentService.delete(sid);
            return new JsonResult(true, "删除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return new JsonResult(false, e.getMessage());
        }
    }
    @RequestMapping("/deleteAll")
    @ResponseBody
    public JsonResult deleteAll(Integer [] sids){
        JsonResult jsonResult = new JsonResult();

        try {
            for(Integer sid: sids){
                studentService.delete(sid);
            }
        } catch (Exception e) {
            e.printStackTrace();
            jsonResult = new JsonResult(false, e.getMessage());
        }
        return jsonResult;
    }

    /**
     * 高级查询
     *
     * @param studentQuery
     * @return
     */
    @RequestMapping("/advancedQuery")
    @ResponseBody
    public PageUi<Student> advancedQuery(StudentQuery studentQuery) {
        return studentService.advancedQuery(studentQuery);
    }

    @RequestMapping("/findOne")
    @ResponseBody
    public Student findOne(Integer sid) {
        return studentService.findOne(sid);
    }

    //登录
    @PostMapping("/loginStu")
    public String loginStu(Student student, HttpSession session) {
        Student loginStudent = studentService.loginStu(student);
        System.out.println("loginStudent+" + loginStudent);
        //登录判断完，登录成功返回到我们的主页面，同时要获取到登录的用户名
        if (Objects.nonNull(loginStudent)) {
            session.setAttribute("student", loginStudent);
            System.out.println("登录成功");
            return "home";
        }
        return "login";
    }

    //退出登录，移除session会话
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("student");
        return "login";
    }

    //查询所有信息
    @RequestMapping("/rmateAndRate")
    @ResponseBody
    public PageUi<Student> rmateAndRate(Student student) {
        List<Student> data = studentService.selectRmateAndRate(student);
        PageUi<Student> pageUi = new PageUi<Student>();
        pageUi.setData(data);
        return pageUi;
        // return studentService.selectRmateAndRate(student);
    }

}


