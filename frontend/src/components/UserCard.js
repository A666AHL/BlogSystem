import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MessageIcon from '@material-ui/icons/Message';

axios.defaults.withCredentials = true;

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        float: 'left',
    },
    card1: {
        maxWidth: 345,
        marginLeft:20,
        padding: 30,
        float: 'left',
    },
    grid: {
        backgroundColor: "#FAFAFB",
    },
    avatar: {
        margin: 80,
        width: 120,
        height: 120,
    },
    input_avatar: {
        display: 'none',
        visibility: 'hidden',
    },
    input_label: {
        cursor: "pointer",
        color: "#3F51C6",
    },
    formControl: {
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    }

});

export default function UserCard() {

    const [avatar_url, setAvatar_url] = React.useState("favicon.ico");

    // get 请求得到 avatar_url
    axios.get("http://localhost:8080/getAvatarUrl",
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
            }
        }).then(function (response) {
            setAvatar_url(response.data.avatar_url);
        }).catch(function (error) {
            console.log(error);
        });


    let formData = new FormData();

    function inputChange(e) {
        formData = new FormData();
        const file = e.target.files[0];
        // 这里的 file 是字段，根据具体需求更改，后端用file进行接受
        formData.append('file', file);
        if(file !== undefined)
        {
            alert("确定文件："+file.name);
        } // 显示选择文件名
    }

    function upload() {
        axios.post('http://localhost:8080/upload/avatar', formData,
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            })
            .then(function (response) {
                setTimeout(() => {
                    setAvatar_url(response.data); // 延迟执行
                }, 1000);
                console.log(avatar_url);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const classes = useStyles();

    const [username, setUsername] = React.useState(localStorage.getItem("username"));
    const [intro, setIntro] = React.useState("");

    // get 请求得到intro
    axios.get("http://localhost:8080/getIntro",
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
            }
        }).then(function (response) {
        setIntro(response.data);
    }).catch(function (error) {
        console.log(error);
    });

    const [values, setValues] = React.useState({
        password: '',
        username: '',
        intro: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    function save() {
        let data = {
            username: values.username,
            password: values.password,
            intro: values.intro,
        };

        alert("请确认以下信息\nusername: "+values.username+'\npassword: '+values.password+'\nintro: '+values.intro);
        axios.post('http://localhost:8080/save', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    setUsername(data.username);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("password", data.password);
                    setIntro(data.intro);
                    console.log(response);
                } else {
                    alert("更新失败");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Card className={classes.card}>
            <CardActionArea>
                <CardMedia>
                    <Grid container justify="center" alignItems="center" className={classes.grid}>
                        <Avatar alt="MY AVATAR" src={avatar_url} className={classes.avatar} />
                    </Grid>
                </CardMedia>
                <Divider />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {intro}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <input type="file" name="file" id="file" className={classes.input_avatar} onChange={inputChange} />
                <label htmlFor="file" className={classes.input_label}>Choose a file</label>
                <Button size="small" color="primary" onClick={upload}>
                    Upload My Avatar
                </Button>
            </CardActions>
        </Card>
            <Card className={classes.card1}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-username">Username</InputLabel>
                    <Input
                        id="adornment-username"
                        value={values.username}
                        onChange={handleChange('username')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <PersonOutlineIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-intro">Intro</InputLabel>
                    <Input
                        id="adornment-intro"
                        value={values.intro}
                        onChange={handleChange('intro')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <MessageIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button variant="contained" color="primary" className={classes.button} onClick={save}>
                   Change and Save your info
                </Button>
            </Card>
        </div>
    );
}