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
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {ListItem} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        float: 'left',
        width: 350,
        marginBottom: 20,
        marginLeft: 20,
    },
    button: {
        position: "absolute",
        right: 20,
    }
});

export default function ShareCard() {

    const [data, setData] = React.useState([]);

    let ableDel = true;

    // 该文章的评论数据
    const [comments, setComments] = React.useState([]);

    const [isGet, setIsGet] = React.useState(true);

    const [title, setTitle] = React.useState("");

    // 该文章的作者
    const [username, setUsername] = React.useState("");

    const [showContent, setShowContent] = React.useState(false);

    const [content, setContent] = React.useState("");

    const [values, setValues] = React.useState({
        comment: '',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    if(data.length === 0) { // 防止一直在发送请求
        // 请求文章的信息
        axios.get("http://localhost:8080/getShareArticles",
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
            setData(response.data);
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    // 获取文章内容，并得到title
    function getContent(title, username) {
        setTitle(title);
        setUsername(username);
        let data = {title: title, username: username};
        // 请求文章的内容
        axios.get("http://localhost:8080/getShareArticleContent",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
            setShowContent(true);
            setIsGet(true);
            setContent(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function goBack() {
        setShowContent(false);
    }

    function addComment() {
        let data = {title: title, comment: values.comment, writer: username};
        axios.get("http://localhost:8080/addComment",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
            if(response.data === "success") {
                alert("添加评论成功");
                getComments();
            } else {
                alert("添加评论失败");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    function getComments() {
        let data = {title: title, writer: username};
        axios.get("http://localhost:8080/getComments",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                setComments(response.data);
                setIsGet(false);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function deleteComment(username2, comment) {
        let data = {username2: username2, comment: comment};
        axios.get("http://localhost:8080/deleteComment",
            {
                params: data,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            }).then(function (response) {
                if(response.data === "success") {
                    alert("删除评论成功");
                    getComments();
                } else {
                    alert("删除评论失败");
                }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const classes = useStyles();

    if(showContent) {
        if(isGet) {
            getComments();
        }
        let username3 = localStorage.getItem("username");
        if(username3 === username) {
            ableDel = false;
        }
        return (
            <div>
                <IconButton onClick={goBack}>
                    <KeyboardBackspaceIcon color="primary"/>
                </IconButton>
                <ReactMarkdown source={content}/>
                <TextField
                    label="COMMENT"
                    value={values.comment}
                    onChange={handleChange('comment')}
                    style={{ margin: 8 }}
                    placeholder="Write something..."
                    helperText="Give this article your advice..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" style={{ margin: 8 }} onClick={addComment}>
                    Submit
                </Button>
                <List>
                    {comments.map((comment, index) => (
                        <ListItem key={index}>
                            <Avatar alt="AVATAR" src={comment.icon_url}/>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {comment.username2}:&nbsp;
                            </Typography>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {comment.comment}
                            </Typography>
                            <Button size="small" color="primary" onClick={deleteComment.bind(this, comment.username2, comment.comment)} className={classes.button} disabled={ableDel && username3 !== comment.username2}>Delete</Button>
                        </ListItem>
                    ))}
                </List>
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
                                <Typography variant="body2" color="textSecondary" component="p">
                                from {article.username1}
                                </Typography>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {article.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={getContent.bind(this, article.title, article.username1)}>
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </List>
    );
}