- 角色

  根据条件分页查询角色数据

  permission n. 准许;许可;批准

- Thymeleaf

- ```js
  localStorage.removeItem("isLogin");
  const isLogin = localStorage.getItem("isLogin");
  localStorage.setItem("isLogin", "true");
  ```

```java
import React from 'react';
import axios from "axios";

import {Redirect} from "react-router";

// 请求带上cookie
axios.defaults.withCredentials = true;

class Main extends React.Component{
    constructor(props) {

        super(props);
        console.log("构造方法");
        this.state = {
            res : false,
        };
        console.log("构造方法1");
        let that = this;
        // let a = 1;
        console.log("构造方法2");
        // 获取缓存中的账号与密码
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        let data = {username: username, password: password};
        // 将username和password打印出来
        console.log(username + password);
        console.log("构造方法3");
        async function changeRes() {


            let pro = await axios.post('http://localhost:8080/login', data,
                {
                    headers:
                        {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                        }
                });
            console.log("构造方法4");

            // .then(response => {
                //     if(response.data === "success") {
                //         // 将相应头打印出来
                //         console.log("1");
                //         console.log(response);
                //         that.setState({res: true});
                //     }
                //
                // })
                // .catch(error => {
                //     console.log(error);
                // });
            // console.log("pro");
            // console.log(pro);
            // if(pro.data === "success")
            //     that.setState({res: true});
        }
        changeRes();
    }



    render() {

        let that = this;
        // let a = 1;
        // async function changeRes() {
        //     // 获取缓存中的账号与密码
        //     let username = localStorage.getItem("username");
        //     let password = localStorage.getItem("password");
        //     let data = {username: username, password: password};
        //     // 将username和password打印出来
        //     console.log(username + password);
        //     await axios.post('http://localhost:8080/login', data,
        //         {
        //             headers:
        //                 {
        //                     "Content-Type": "application/json",
        //                     "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
        //                 }
        //         })
        //         .then(response => {
        //             if(response.data === "success") {
        //                 // 将相应头打印出来
        //                 console.log("1");
        //                 console.log(response);
        //                 that.setState({res: true});
        //                 a = 0;
        //             }
        //
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // }
        // changeRes();
        let res = this.state.res;
        console.log(res);
        if(!res) {
            return <Redirect to="/login_view"/>
        }
        return (
            <div>main</div>
        );
    }

}

export default Main;
```

```java
@CrossOrigin(origins = "http://localhost:3000",allowCredentials ="true")    // 解决跨域问题
    @PostMapping("/login")
    @ResponseBody
    public String login(@RequestBody Map<String, String> map, HttpServletRequest request, HttpSession httpSession) {
        System.out.println("/login ===================================");
        String susername = map.get("username");
        String spassword = map.get("password");
        // 将从前端获取的username和password打印出来
        System.out.println(susername+spassword);
        // 从session中取出user
        Object user = httpSession.getAttribute("user");
        if(user != null) {
            // 打印user
            System.out.println(user);
            // 将user从Object转换成Map
            Map umap = ObjToMap.ObjectToMap(user);
            if(susername.equals(umap.get("username")) && spassword.equals(umap.get("password"))) {
                return "success";
            }
        }
        return "fail";
    }
```

