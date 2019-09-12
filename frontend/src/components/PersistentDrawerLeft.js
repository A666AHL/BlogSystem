import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreatIcon from '@material-ui/icons/Create';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Redirect} from "react-router";
import HomeIcon from '@material-ui/icons/Home';
import UserCard from "./UserCard";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import WriteCard from "./WriteCard";
import ArticleCard from "./ArticleCard";
import ShareIcon from '@material-ui/icons/Share';
import ShareCard from "./ShareCard";
import UsersCard from "./UsersCard";
import ArticlesCard from "./ArticlesCard";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    avatar: {
        position: 'absolute',
        right: 20,
        cursor: 'pointer',
    },
    admin: {
        position: 'absolute',
        right: 100,
        fontsize: 200,
        cursor: 'pointer',
    }
}));

export default function PersistentDrawerLeft() {

    const [avatar_url, setAvatar_url] = React.useState("");

    const [isAdmin, setIsAdmin] = React.useState(false);

    const [GoToAdmin, setGoToAdmin] = React.useState(false);

    // get 请求得到 avatar_url
    // 注意：这里会报一个警告，就是在退出时，这个异步方法在unmount, 可能会引起内存泄漏
    // 目前没有找到好的解决办法，还没发现很大的问题
    // 同时这个请求也不是一直发送，可以接受
    axios.get("http://localhost:8080/getAvatarUrl",
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
            }
        }).then((response) => {
            setAvatar_url(response.data.avatar_url);
            setIsAdmin(response.data.isadmin);
        }).catch(function (error) {
            console.log(error);
        });

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [Exit, setExit] = React.useState(false);
    // 右侧边栏显示那块内容
    const [Home, setHome] = React.useState(true); // 默认为主页内容
    const [Write, setWrite] = React.useState(false); // 1
    const [User, setUser] = React.useState(false);
    const [Square, setSquare] = React.useState(false);
    const [UserManage, setUserManage] = React.useState(false);
    const [ArticleManage, setArticleManage] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function exit() {
        // 移除登入状态
        localStorage.removeItem("isLogin");
        setExit(true);
    }

    if(Exit) {
        return <Redirect to="/login_view"/>
    }

    // 显示主页内容
    function home() {
        setHome(true);
        setWrite(false); // 2
        setUser(false);
        setSquare(false);
    }

    // 显示写作页面内容
    function write() { // 3
        setHome(false);
        setWrite(true); // 2
        setUser(false);
        setSquare(false);
    }

    // 显示用户信息内容
    function user() {
        setHome(false);
        setWrite(false); // 2
        setUser(true);
        setSquare(false);
    }

    // 显示广场页面内容
    function square() {
        setHome(false);
        setWrite(false); // 2
        setUser(false);
        setSquare(true);
    }



    let user_manage_content = (
        <UsersCard />
    );

    let article_manage_content = (
        <ArticlesCard />
    );

    let mainContent1 = user_manage_content;

    function user_manage() {
        setUserManage(true);
        setArticleManage(false);
    }

    function article_manage() {
        setUserManage(false);
        setArticleManage(true);
    }

    switch (true) {
        case ArticleManage:
            mainContent1 = article_manage_content;
            break;
        case UserManage: // 5
            mainContent1 = user_manage_content;
            break;
        default:
            mainContent1 = user_manage_content;
    }

    // 主页内容
    let homeContent = (
        <ArticleCard />
    );

    // 初始化右侧边栏为主页内容
    let mainContent = homeContent;

    // 用户信息内容
    let userContent = (
        <UserCard />
    );

    // 4: 写作页面内容
    let writeContent = (
        <WriteCard />
    );

    // 广场页面内容
    let squareContent = (
        <ShareCard/>
    );

    function goToAdmin() {
        setGoToAdmin(true);
    }

    switch (true) {
        case Home:
            mainContent = homeContent;
            break;
        case Write: // 5
            mainContent = writeContent;
            break;
        case User:
            mainContent = userContent;
            break;
        case Square:
            mainContent = squareContent;
            break;
        default:
            mainContent = homeContent;
    }

    if(GoToAdmin) {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap>
                            Admin System
                        </Typography>
                        <Typography noWrap className={classes.admin} hidden={!isAdmin} onClick={goToAdmin}>
                            后台管理
                        </Typography>
                        <Avatar alt="MY AVATAR" src={avatar_url} className={classes.avatar} onClick={user}/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <ListItem>
                            <ListItemIcon>
                                <ImportContactsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Blog" />
                        </ListItem>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key="user_manage" onClick={user_manage}>
                            <ListItemText primary="用户管理" />
                        </ListItem>
                        <ListItem button key="article_manage" onClick={article_manage}>
                            <ListItemText primary="文章管理" />
                        </ListItem>


                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {mainContent1}

                </main>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap>
                        Blog System
                    </Typography>
                    <Typography noWrap className={classes.admin} hidden={!isAdmin} onClick={goToAdmin}>
                        后台管理
                    </Typography>
                    <Avatar alt="MY AVATAR" src={avatar_url} className={classes.avatar} onClick={user}/>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <ListItem>
                        <ListItemIcon>
                            <ImportContactsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Blog" />
                    </ListItem>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="Home" onClick={home}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Square" onClick={square}>
                        <ListItemIcon>
                            <ShareIcon />
                        </ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItem>
                    <ListItem button key="Write" onClick={write}>
                        <ListItemIcon>
                            <CreatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Write" />
                    </ListItem>
                    <ListItem button key="User" onClick={user}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItem>
                    <ListItem button key="Exit" onClick={exit}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Exit" />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {mainContent}

            </main>
        </div>
    );
}