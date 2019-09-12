import React from 'react';
import Card from '@material-ui/core/Card';
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {green} from "@material-ui/core/colors";
import axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from '@material-ui/styles';
import {Redirect} from "react-router-dom";

// 请求带上cookie
axios.defaults.withCredentials = true;

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(1),
    },
    popper: {
        height: 20,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

export function LoginCard() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [result, setResult] = React.useState(false);
    function handleClick(event) {
        let ev = event.currentTarget;
        let data = {username: username, password: password};
        // 将username, password储存在浏览器缓存中
        localStorage.setItem("username",username);
        localStorage.setItem("password",password);
        axios.post('http://localhost:8080/check', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {

                    // 将相应头打印出来
                    console.log(response);
                    // 这两行应有顺序关系，不然登入要登两次
                    localStorage.setItem("isLogin", "true");
                    setResult(true);
                }
                else {
                    setAnchorEl(anchorEl ? null : ev);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function inputChange(e){
        setUsername(e.target.value);
    }
    function inputPassword(e) {
        setPassword(e.target.value);
    }

    const [result1, setResult1] = React.useState(false);

    function goToRegister() {
        setResult1(true);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    if(result) {
        return <Redirect to="/main"/>
    } else if(result1) {
        return <Redirect to="/register" />
    }
    return (
        <div id="login">
            <Card>
                <CardActionArea>
                    <CardMedia component="img" image="images/login.png"/>
                    <CardContent>
                        <div className={classes.root}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    className={classes.margin}
                                    label="Username"
                                    onChange={inputChange}
                                />
                                <TextField
                                    className={classes.margin}
                                    label="Password"
                                    variant="outlined"
                                    onChange={inputPassword}
                                />
                            </ThemeProvider>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button aria-describedby={id} size="small" color="primary" onClick={handleClick}>Enter</Button>
                    <Popper id={id} open={open} anchorEl={anchorEl} transition className={classes.popper}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography className={classes.typography}>Login failed</Typography>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <Button size="small" color="primary" onClick={goToRegister}>Register</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LoginCard;
