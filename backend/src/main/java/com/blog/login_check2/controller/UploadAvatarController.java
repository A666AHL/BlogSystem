package com.blog.login_check2.controller;

// Fastjson 是一个 Java 库，可以将 Java 对象转换为 JSON 格式，当然它也可以将 JSON 字符串转换为 Java 对象
// clean, install 多试几次
//import com.alibaba.fastjson.JSONObject;
import com.blog.entity.Users;
import com.blog.login_check2.dao.articlesMapper;
import com.blog.login_check2.dao.usersMapper;
import com.blog.utils.GetSqlSession;
import com.blog.utils.ObjToMap;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController // 相当于@ResponseBody ＋ @Controller合在一起的作用
@RequestMapping("/upload") // 表示类中的所有响应请求的方法都是以该地址作为父路径
public class UploadAvatarController {

    @Value("${uploadDir}")
    private String uploadDir;

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @RequestMapping(value = "/avatar", method = RequestMethod.POST)
    public String uploadAvatar(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) { // MyController使用@RequestBody，对于post请求两个都可以

        if (file.isEmpty()) {
            return "";
        }
        String username;
        try {
            // 将session中的username打印出来
            HttpSession httpSession = request.getSession();
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username = user.get("username").toString();
            System.out.println("用户名: "+username);
        } catch (Exception e) {
            System.out.println("请重新登入");
            return "";
        }

        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));

        String filePath = uploadDir + "\\img\\";
        File dest = new File(filePath + username + suffixName);
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String avatar_url = "http://127.0.0.1:8887/img/"+dest.getName()+"?temp="+Math.random();

        // DO: 将avatar_url插入数据库中
        Map obj = new HashMap();
        obj.put("username", username);
        obj.put("avatar_url", avatar_url);
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            //创建usersMapper对象，mybatis自动生成mapper代理对象
            usersMapper users = sqlSession.getMapper(usersMapper.class);
            //调用usersMapper方法
            // 更新数据库
            Integer count = users.updateAvatarUrl(obj);
            System.out.println("更新"+count+"条数据");
            sqlSession.commit(); // 需要手动提交，不然数据库数据不会自动同步
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        // 返回图片存储的地址给前端 + 加上随机数解决浏览器缓存重新拉取图片
        return avatar_url;
    }

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @RequestMapping(value = "/article", method = RequestMethod.POST)
    public String uploadArticle(@RequestParam(value = "file") MultipartFile file, @RequestParam(value = "title") String title, @RequestParam(value = "description") String description, HttpServletRequest request) { // MyController使用@RequestBody，对于post请求两个都可以

        if (file.isEmpty()) {
            return "";
        }
        String username;
        try {
            // 将session中的username打印出来
            HttpSession httpSession = request.getSession();
            Map<String, Object> user = ObjToMap.ObjectToMap(httpSession.getAttribute("user"));
            username = user.get("username").toString();
            System.out.println("用户名: "+username);
        } catch (Exception e) {
            System.out.println("请重新登入");
            return "";
        }

        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        if(!suffixName.equals(".md")) {
            return "文件格式错误，请上传md文件";
        }

        // 每一个用户有一个文章的文件夹
        String filePath = uploadDir + "\\articles\\" + username + "\\";
        File dest = new File(filePath + title + suffixName);

        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String article_url = "http://127.0.0.1:8887/articles/"+username+"/"+dest.getName()+"?temp="+Math.random();

        // TODO: 将article_url插入数据库中
        Map obj = new HashMap();
        obj.put("username1", username);
        obj.put("title", title);
        obj.put("description", description);
        obj.put("article_url", article_url);
        SqlSession sqlSession = null;
        try {
            sqlSession = GetSqlSession.getSqlSeesion();
            articlesMapper users = sqlSession.getMapper(articlesMapper.class);
            Integer count = users.insertArticle(obj);
            System.out.println("插入"+count+"条数据");
            sqlSession.commit(); // 需要手动提交，不然数据库数据不会自动同步
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        // 返回文章存储的地址给前端
        return article_url;
    }

}
