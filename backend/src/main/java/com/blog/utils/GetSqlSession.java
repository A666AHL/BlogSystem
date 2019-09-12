package com.blog.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class GetSqlSession {
    public static SqlSession getSqlSeesion() throws IOException {
        String resource = "mybatis/mybatis-config.xml";
        InputStream is = Resources.getResourceAsStream(resource);
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);

        SqlSession session = factory.openSession();
        return session;
    }
}
