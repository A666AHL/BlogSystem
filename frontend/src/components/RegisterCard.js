import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
    },
    formControl: {
        marginLeft: 36,
        marginBottom: 20,
    },
    button: {
        marginTop: 12,
        marginBottom: 20,
    },
    img: {
        marginBottom: 16,
    }
});

export default function RegisterCard() {

    const classes = useStyles();

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

    function register() {
        let data = {
            username: values.username,
            password: values.password,
            intro: values.intro,
        };

        axios.post('http://localhost:8080/register', data,
            {
                headers:
                    {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                    }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("注册成功");
                    console.log(response);
                } else if(response.data === "fail") {
                    alert("注册失败");
                } else {
                    alert(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div id="login">
            <Card className={classes.card}>
                <CardMedia component="img" image="images/register.png" className={classes.img}/>
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
                <Grid container justify="center" alignItems="center">
                    <Button variant="contained" color="primary" className={classes.button} onClick={register}>
                        Register
                    </Button>
                </Grid>
            </Card>
        </div>
    );
}