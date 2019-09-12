package com.blog.login_check2.controller;

import com.blog.login_check2.dao.articlesMapper;
import com.blog.login_check2.dao.commentsMapper;
import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import com.blog.utils.ReadFile;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Map;

@Controller
public class GetController {

    @Value("${uploadDir}")
    private String uploadDir;

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getArticles")
    @ResponseBody
    public List<Map> getArticles(HttpServletRequest request) {
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

        // 获取文章列表
        SqlSession sqlSession = null;
        List<Map> articlelist;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            articlelist = articles.getArticles(username);
            return articlelist;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getShareArticles")
    @ResponseBody
    public List<Map> getShareArticles() {

        // 获取文章列表
        SqlSession sqlSession = null;
        List<Map> shareArticleList;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            shareArticleList = articles.getShareArticles();
            return shareArticleList;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getComments")
    @ResponseBody
    public List<Map> getComments(@RequestParam(value = "title") String title, @RequestParam(value = "writer") String writer) {
        // 获取评论列表
        SqlSession sqlSession = null;
        List<Map> commentsList;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            commentsMapper comments = sqlSession.getMapper(commentsMapper.class);
            commentsList = comments.getComments(title, writer);
            return commentsList;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getArticleContent")
    @ResponseBody
    public String getArticleContent(@RequestParam(value = "title") String title, HttpServletRequest request) {
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

        // 获取文章url, 在这里并用不上，因为这个url是在chrome插件上的url，所以直接拼接字符串得到url
        String article_url = uploadDir + "\\articles\\" + username + "\\" + title + ".md";
        ReadFile readFile = new ReadFile();
        String article_content = readFile.readMd(article_url);

        // 将markdown的内容返回给前端
        return article_content;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getShareArticleContent")
    @ResponseBody
    public String getShareArticleContent(@RequestParam(value = "title") String title, @RequestParam(value = "username") String username) {
        // 获取文章url, 在这里并用不上，因为这个url是在chrome插件上的url，所以直接拼接字符串得到url
        String article_url = uploadDir + "\\articles\\" + username + "\\" + title + ".md";
        ReadFile readFile = new ReadFile();
        String article_content = readFile.readMd(article_url);

        // 将markdown的内容返回给前端
        return article_content;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getShare")
    @ResponseBody
    public String getShare(@RequestParam(value = "title") String title, HttpServletRequest request) {
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

        // 获取文章是否被分享
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            String isShared = articles.getIsShared(username, title);
            return isShared;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return "fail";
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getAllUsers")
    @ResponseBody
    public List<Map> getAllUsers() {

        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            List<Map> list = users.getAllUsers();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @GetMapping("/getAllArticles")
    @ResponseBody
    public List<Map> getAllArticles() {

        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper articles = sqlSession.getMapper(articlesMapper.class);
            List<Map> list = articles.getAllArticles();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return null;
    }
}
