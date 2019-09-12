package com.blog.login_check2.controller;

import com.blog.entity.Users;
import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MyController {

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/check")
    @ResponseBody
    public String check(@RequestBody Map<String, String> map, HttpServletRequest request) {
        String username = map.get("username");
        String password = map.get("password");
        // 将用户名及密码存入obj中
        Map obj = new HashMap();
        obj.put("username", username);
        obj.put("password", password);
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            // 在mapper/usersMapper.xml进行查询，传入obj
            // Users user = sqlSession.selectOne("check", obj); //之前的方法
            //创建usersMapper对象，mybatis自动生成mapper代理对象
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            //调用usersMapper方法
            Users user = users.check(obj); // 需要处理异常
            if(user != null) {
                // 设置session
                HttpSession httpSession = request.getSession();
                httpSession.setAttribute("user", obj);
                System.out.println(httpSession.getAttribute("user").toString());
                // 获取cookies
                Cookie[] cookies = request.getCookies();
                // 将cookies打印出来
                if (cookies != null && cookies.length > 0) {
                    for (Cookie cookie : cookies) {
                        System.out.println(cookie.getName() + " : " + cookie.getValue());
                    }
                }
                return "success";
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getAvatarUrl")
    @ResponseBody
    public Map getAvatarUrl(HttpServletRequest request) {
        String username;
        try {
            // 获取session中的username
            HttpSession httpSession = request.getSession();
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username = user.get("username").toString();
        } catch (Exception e) {
            System.out.println("请重新登入"); // 防止重启项目将session清除
            return null;
        }

        Map map = new HashMap();
        SqlSession sqlSession = null;
        String avatarUrl = "";
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            avatarUrl = users.getAvatarUrl(username);
            Integer isAdmin = users.getIsAdmin(username);
            map.put("avatar_url", avatarUrl);
            map.put("isadmin", isAdmin);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getIntro")
    @ResponseBody
    public String getIntro(HttpServletRequest request) {
        String username;
        try {
            HttpSession httpSession = request.getSession();
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username = user.get("username").toString();
        } catch (Exception e) {
            System.out.println("请重新登入");
            return "";
        }

        SqlSession sqlSession = null;
        String intro = "";
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            intro = users.getIntro(username);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return intro;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/save")
    @ResponseBody
    public String save(@RequestBody Map<String, String> map, HttpServletRequest request) {
        String username = map.get("username");
        String password = map.get("password");
        String intro = map.get("intro");
        // 将用户名及密码存入obj中
        Map obj = new HashMap();
        obj.put("username", username);
        obj.put("password", password);
        // 设置session
        HttpSession httpSession = request.getSession();
        String username0; // 修改前的username
        try {
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username0 = user.get("username").toString();
        } catch (Exception e) {
            System.out.println("请重新登入");
            return "";
        }
        httpSession.setAttribute("user", obj);
        // 更新数据
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            // 创建usersMapper对象，mybatis自动生成mapper代理对象
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            // 调用usersMapper方法
            // 先得到用户的id
            Integer id = users.getId(username0);
            // 更新数据库
            obj.put("intro", intro);
            obj.put("id", id);
            System.out.println("用户id: "+id);
            Integer count = users.updateSave(obj);
            System.out.println("更新"+count+"条数据");
            sqlSession.commit(); // 需要手动提交，不然数据库数据不会自动同步
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }


    // flutterApp 登录测试接口
    @CrossOrigin
    @PostMapping("/checkApp")
    @ResponseBody
    public String checkApp(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        System.out.println("username:"+username);
        System.out.println("password:"+password);
        if(username.equals("a") && password.equals("123")) {
            return "success";
        }
        return "fail";
    }
}
