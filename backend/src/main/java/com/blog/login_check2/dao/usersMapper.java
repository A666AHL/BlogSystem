package com.blog.login_check2.dao;

import com.blog.entity.Users;

import java.util.List;
import java.util.Map;

// 对应着usersMapper.xml文件的namespace
public interface usersMapper {

    List<Users> user() throws Exception;

    Users check(Map obj) throws Exception;

    Integer updateAvatarUrl(Map obj) throws Exception;

    String getAvatarUrl(String username) throws Exception;

    String getIntro(String username) throws Exception;

    Integer updateSave(Map obj) throws Exception;

    Integer getId(String username) throws Exception;

    Integer register(Map map) throws Exception;

    Integer getIsAdmin(String username) throws Exception;

    List<Map> getAllUsers() throws Exception;

    Integer addUser(Map map) throws Exception;

    Integer updateUser(Map map) throws Exception;
}
