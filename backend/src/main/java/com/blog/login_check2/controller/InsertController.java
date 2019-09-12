package com.blog.login_check2.controller;

import com.blog.login_check2.dao.articlesMapper;
import com.blog.login_check2.dao.commentsMapper;
import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class InsertController {
    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/addComment")
    @ResponseBody
    public String addComment(@RequestParam(value = "title") String title, @RequestParam(value = "comment") String comment,@RequestParam(value = "writer") String writer, HttpServletRequest request) {
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

        // 根据username获取icon_url
        SqlSession sqlSession = null;
        String icon_url = "";
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            icon_url = users.getAvatarUrl(username);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        // 插入评论
        Map map = new HashMap();
        map.put("comment", comment);
        map.put("username2", username);
        map.put("title1", title);
        map.put("icon_url", icon_url);
        map.put("writer", writer);

        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            commentsMapper comments = sqlSession.getMapper(commentsMapper.class);
            Integer count = comments.addComment(map);
            System.out.println("插入"+count+"条评论");
            sqlSession.commit();
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }
}
