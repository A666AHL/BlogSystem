package com.blog.login_check2.controller;

import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class RegisterController {
    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/register")
    @ResponseBody
    public String register(@RequestBody Map<String, String> map)
    {
        // 默认头像
        map.put("avatar_url", "http://127.0.0.1:8887/img/avatar.png");
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            Integer id = users.getId(map.get("username"));
            if(id != null)
                return "用户名已存在，请重新输入用户名";
            Integer count = users.register(map);
            System.out.println("插入"+count+"条数据");
            sqlSession.commit(); // 需要手动提交，不然数据库数据不会自动同步
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/addUser")
    @ResponseBody
    public String addUser(@RequestBody Map map)
    {
        // 默认头像
        map.put("avatar_url", "http://127.0.0.1:8887/img/avatar.png");
        if(map.get("isadmin") == null) {
            map.put("isadmin", false);
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            Integer id = users.getId(map.get("username").toString());
            if(id != null)
                return "用户名已存在，请重新输入用户名";
            Integer count = users.addUser(map);
            System.out.println("添加"+count+"个用户");
            sqlSession.commit(); // 需要手动提交，不然数据库数据不会自动同步
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }
}
