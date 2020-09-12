package net.togogo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class goPage {

    // 跳转到登录的页面
    @GetMapping("goLogin")
    public String goLogin(){
        return "login";
    }

    @GetMapping("goHome")
    public String goHome(){
        return "home";
    }

    @GetMapping("goStudent")
    public String goStudent(){
        return "student";
    }

    @GetMapping("goDormitory")
    public String goDormitory(){
        return "dormitory";
    }

    @GetMapping("goSelect")
    public String goSelect(){
        return "select";
    }
}
