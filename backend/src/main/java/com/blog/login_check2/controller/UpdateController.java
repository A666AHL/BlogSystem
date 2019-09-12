package com.blog.login_check2.controller;

import com.blog.login_check2.dao.articlesMapper;
import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class UpdateController {

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/updateShare")
    @ResponseBody
    public String updateShare(@RequestParam(value = "title") String title, @RequestParam(value = "isShared") String isShared, HttpServletRequest request) {
        String username;
        try {
            // 获取session中的username
            HttpSession httpSession = request.getSession();
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username = user.get("username").toString();
        } catch (Exception e) {
            System.out.println("请重新登入"); // 防止重启项目将session清除
            return "";
        }

        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            Integer count = articles.updateShare(username, title, isShared);
            System.out.println("更新"+count+"条数据");
            sqlSession.commit();
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/updateUser")
    @ResponseBody
    public String updateUser(@RequestBody Map map)
    {
        System.out.println(map);
        if(map.get("isadmin") == null) {
            map.put("isadmin", false);
        }
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            Integer count = users.updateUser(map);
            System.out.println("更新"+count+"个用户");
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
    @PostMapping("/updateArticle")
    @ResponseBody
    public String updateArticle(@RequestBody Map map)
    {
        if(map.get("isShared") == null) {
            map.put("isShared", false);
        }
        if(map.get("state") == null) {
            map.put("state", false);
        }

        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper users = sqlSession.getMapper(articlesMapper.class);
            Integer count = users.updateArticle(map);
            System.out.println("更新"+count+"篇文章");
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
