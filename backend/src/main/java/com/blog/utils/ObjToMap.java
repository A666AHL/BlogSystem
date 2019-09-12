package com.blog.utils;

import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class ObjToMap { // 将Obj转成Map
    public static Map<String, Object> ObjectToMap(Object obj) {
        try {
            if (obj instanceof Map) {
                return (Map)obj;
            }
            Map<String, Object> returnMap = BeanUtils.describe(obj);
            returnMap.remove("class");
            return returnMap;
        } catch (IllegalAccessException e1) {
            e1.getMessage();
        } catch (InvocationTargetException e2) {
            e2.getMessage();
        } catch (NoSuchMethodException e3) {
            e3.getMessage();
        }
        return new HashMap();
    }
}
