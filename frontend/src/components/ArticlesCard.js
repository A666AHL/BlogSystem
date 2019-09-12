import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

// 请求带上cookie
axios.defaults.withCredentials = true;

export default function ArticlesCard() {
    const [isGet, setIsGet] = React.useState(true);

    const [data, setData] = React.useState([]);

    const [state, setState] = React.useState({
        columns: [
            { title: 'AritcleID', field: 'articleId' },
            { title: 'Title', field: 'title' },
            { title: 'Writer', field: 'username1' },
            { title: 'Shared', field: 'isShared', type: "boolean"},
            { title: 'pass', field: 'state', type: "boolean"},
        ],
        data: data,
    });

    if(isGet) {
        axios.get("http://localhost:8080/getAllArticles",
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

    function updateArticle(data) {
        axios.post('http://localhost:8080/updateArticle', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("更新文章成功");
                } else {
                    alert(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteArticle(data) {
        axios.post('http://localhost:8080/adminDeleteArticle', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("删除文章成功");
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
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            updateArticle(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            deleteArticle(oldData);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}