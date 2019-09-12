import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TitleIcon from '@material-ui/icons/Title';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import CardActions from "@material-ui/core/CardActions";

axios.defaults.withCredentials = true;

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        float: 'left',
        paddingTop: 10,
    },
    input_article: {
        display: 'none',
        visibility: 'hidden',
    },
    input_label: {
        cursor: "pointer",
        color: "#3F51C6",
    },
    formControl: {
        margin: 20,
    },
    button: {
        marginTop: 20,
    }

});

export default function WriteCard() {

    let formData = new FormData();

    function inputChange(e) {
        formData = new FormData();
        // 注意：记住最后选择文件，不然无法上传
        let file = e.target.files[0];
        // 这里的 file 是字段，根据具体需求更改，后端用file进行接受
        formData.append('file', file);
        if(file !== undefined)
        {
            alert("确定文件："+file.name);
        } // 显示选择文件名
    }

    function upload() {
        formData.append('title', values.title);
        formData.append('description', values.description);
        axios.post('http://localhost:8080/upload/article', formData,
            {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:8080", // 解决跨域问题
                }
            })
            .then(function (response) {
                if(response.data === "success") {
                    alert("文章上传成功");
                } else if(response.data === "fail") {
                    alert("文章上传失败");
                } else {
                    alert(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const classes = useStyles();

    const [values, setValues] = React.useState({
        title: '',  // 一个用户不能有重名文章，后端根据title来存储文件
        description: '',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };


    return (
        <div>

            <Card className={classes.card}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-title">Title</InputLabel>
                    <Input
                        id="adornment-title"
                        value={values.title}
                        onChange={handleChange('title')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <TitleIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-description">Description</InputLabel>
                    <Input
                        id="adornment-description"
                        value={values.description}
                        onChange={handleChange('description')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <SubtitlesIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <CardActions>

                    <input type="file" name="file" id="file" className={classes.input_article} onChange={inputChange} />
                    <label htmlFor="file" className={classes.input_label}>Choose a file</label>
                    <Button size="small" color="primary" onClick={upload}>
                        Upload My Article
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}