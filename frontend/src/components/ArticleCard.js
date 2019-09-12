import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
    card: {
        float: 'left',
        width: 350,
        marginBottom: 20,
        marginLeft: 20,
    },
});

export default function ArticleCard() {

    const [data, setData] = React.useState([]);

    const [title, setTitle] = React.useState("");

    const [isGet, setIsGet] = React.useState(true);

    // primary 代表以分享 disabled 代表未分享
    const [share, setShare] = React.useState("disabled");

    const [showContent, setShowContent] = React.useState(false);

    const [content, setContent] = React.useState("");

    if(isGet) { // 防止一直在发送请求
        // 请求文章的信息
        axios.get("http://localhost:8080/getArticles",
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
            setData(response.data);
            setIsGet(false);
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getContent(title) {
        setTitle(title);
        let data = {title: title};
        // 请求文章的内容
        axios.get("http://localhost:8080/getArticleContent",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                setShowContent(true);
                setContent(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function deleteArticle(title) {
        let data = {title: title};
        // 删除文章
        axios.get("http://localhost:8080/deleteArticle",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                if(response.data === "success") {
                    alert("删除成功");
                    setIsGet(true);
                }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function goBack() {
        setShowContent(false);
    }

    function changeShare() {
        let data = {title: title, isShared: share !== "primary" ? "true": "false"};
        axios.get("http://localhost:8080/updateShare",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                if(response.data === "success") {
                    alert(share !== "primary" ? "分享成功" : "取消分享成功");
                    setShare(share === "primary" ? "disabled" : "primary");
                }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getShare() {
        let data = {title: title};
        axios.get("http://localhost:8080/getShare",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
            if(response.data.toString() === "true") {
                    setShare("primary");
                } else {
                    setShare("disabled");
                }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const classes = useStyles();

    if(showContent) {
        getShare();
        return (
            <div>
                <IconButton onClick={goBack}>
                    <KeyboardBackspaceIcon color="primary"/>
                </IconButton>
                <IconButton onClick={changeShare}>
                    <ShareIcon color={share}/>
                </IconButton>
                <ReactMarkdown source={content}/>
            </div>
        );
    }

    return (
        <List>
            {data.map((article, index) => (
                <Card className={classes.card} key={index}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={deleteArticle.bind(this, article.title)}>
                            Delete
                        </Button>
                        <Button size="small" color="primary" onClick={getContent.bind(this, article.title)}>
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </List>
    );
}