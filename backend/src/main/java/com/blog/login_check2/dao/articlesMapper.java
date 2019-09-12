package com.blog.login_check2.dao;

import java.util.List;
import java.util.Map;

public interface articlesMapper {

    Integer insertArticle(Map obj) throws Exception;

    List<Map> getArticles(String username) throws Exception;

    List<Map> getAllArticles() throws Exception;

    List<Map> getShareArticles() throws Exception;

    String getArticleUrl(String username, String title) throws Exception;

    Integer deleteArticle(String username, String title) throws Exception;

    String getIsShared(String username, String title) throws Exception;

    Integer updateShare(String username, String title, String isShared) throws Exception;

    Integer updateArticle(Map map) throws Exception;

    Integer adminDeleteArticle(Map map) throws Exception;
}
