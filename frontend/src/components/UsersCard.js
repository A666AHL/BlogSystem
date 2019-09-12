import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

// 请求带上cookie
axios.defaults.withCredentials = true;

export default function UsersCard() {
    const [isGet, setIsGet] = React.useState(true);

    const [data, setData] = React.useState([]);

    const [state, setState] = React.useState({
        columns: [
            { title: 'id', field: 'id' },
            { title: 'username', field: 'username' },
            { title: 'password', field: 'password' },
            { title: 'admin', field: 'isadmin', type: "boolean"},
            { title: 'state', field: 'state', type: "boolean"},
        ],
        data: data,
    });

    if(isGet) {
        axios.get("http://localhost:8080/getAllUsers",
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                console.log(response);
                setData(response.data);
                const data = response.data;
                setState({...state, data});
                setIsGet(false);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function addUser(data) {
        axios.post('http://localhost:8080/addUser', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("添加用户成功");
                } else {
                    alert(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateUser(data) {
        axios.post('http://localhost:8080/updateUser', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("更新用户成功");
                } else {
                    alert(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <MaterialTable
            title="用户表"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            addUser(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            updateUser(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}