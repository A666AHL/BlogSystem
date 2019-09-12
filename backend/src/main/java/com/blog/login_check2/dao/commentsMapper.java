package com.blog.login_check2.dao;

import java.util.List;
import java.util.Map;

public interface commentsMapper {

    Integer addComment(Map map) throws Exception;

    List<Map> getComments(String title, String writer) throws Exception;

    Integer deleteComment(String username2, String comment) throws Exception;
}
