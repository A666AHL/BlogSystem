package com.blog.login_check2.controller;

import com.blog.login_check2.dao.articlesMapper;
import com.blog.login_check2.dao.commentsMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class DeleteController {
    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/deleteArticle")
    @ResponseBody
    public String deleteArticle(@RequestParam(value = "title") String title, HttpServletRequest request) {
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

        // 删除文章
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            Integer count = articles.deleteArticle(username, title);
            System.out.println("删除"+count+"条数据");
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
    @PostMapping("/adminDeleteArticle")
    @ResponseBody
    public String updateArticle(@RequestBody Map map)
    {
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            Integer count = articles.adminDeleteArticle(map);
            System.out.println("删除"+count+"篇文章");
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
    @GetMapping("/deleteComment")
    @ResponseBody
    public String deleteComment(@RequestParam(value = "username2") String username2, @RequestParam(value = "comment") String comment) {
        // 删除评论
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            commentsMapper comments = sqlSession.getMapper(commentsMapper.class);
            Integer count = comments.deleteComment(username2, comment);
            System.out.println("删除"+count+"条评论");
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
