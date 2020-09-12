package net.togogo.controller;

import net.togogo.bean.Dormitory;
import net.togogo.query.DormitoryQuery;
import net.togogo.service.DormitoryService;
import net.togogo.util.JsonResult;
import net.togogo.util.PageUi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/dormitory")
public class DormitoryController {

    @Autowired
    private DormitoryService dormitoryService;

    @RequestMapping("/dormitory")
    public String index() {
        return "dormitory/dormitory";
    }

    //查询所有信息
    @RequestMapping("/list")
    @ResponseBody
    public List<Dormitory> findAll() {
        return dormitoryService.findAll();
    }

    //分页查询信息
    @RequestMapping("/page")
    @ResponseBody
    public PageUi<Dormitory> findByPage(DormitoryQuery dormitoryQuery) {
        return dormitoryService.findByQuery(dormitoryQuery);
    }

    //返回的结果：{success:true, msg:xxxx}
    @RequestMapping("/save")
    @ResponseBody
    public JsonResult save(Dormitory dormitory) {
        System.out.println(dormitory);
        try {
            if (dormitory.getDid() != null) {
                // 传入did，即更新学生信息
                dormitoryService.update(dormitory);
                return new JsonResult(true, "修改成功！");
            } else {
                // 添加学生
                // 注册
                dormitoryService.save(dormitory);
                return new JsonResult(true, "添加成功！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new JsonResult(false, e.getMessage());
        }
    }

    @RequestMapping("/delete")
    @ResponseBody
    public JsonResult delete(Integer did) {
        try {
            dormitoryService.delete(did);
            return new JsonResult(true, "删除成功！");
        } catch (Exception e) {
            e.printStackTrace();
            return new JsonResult(false, e.getMessage());
        }
    }
    @RequestMapping("/deleteAll")
    @ResponseBody
    public JsonResult deleteAll(Integer [] dids){
        JsonResult jsonResult = new JsonResult();

        try {
            for(Integer did: dids){
                dormitoryService.delete(did);
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
     * @param dormitoryQuery
     * @return
     */
    @RequestMapping("/advancedQuery")
    @ResponseBody
    public PageUi<Dormitory> advancedQuery(DormitoryQuery dormitoryQuery) {
        return dormitoryService.advancedQuery(dormitoryQuery);
    }

    @RequestMapping("/findOne")
    @ResponseBody
    public Dormitory findOne(Integer did) {
        return dormitoryService.findOne(did);
    }

}


