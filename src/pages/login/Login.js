import React, { Component } from 'react';

import axios from 'axios'
import { hashHistory } from 'react-router';

import Header from '../../components/header/Header'
import {trim} from "../../Utils/index.Utils";

import Button from "antd/lib/button"

import "./Login.less"
import {preURL} from "../../config";

axios.defaults.withCredentials=true

const FailureText=[
    "请填写邮箱",//1
    "请填写密码",//2
    "请输入正确格式的邮箱",//3
    "请填写正确位数的图片验证码",//4
    "请填写正确的图片验证码",//5
    "", //6
    "", //7
    "", //8
    "", //9
    "", //10
    "Network failure:请检查您的网络",//11
    "对不起，服务器错误，请稍后重试",//12
    "邮箱和密码不匹配，请重新输入",//13
];

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorText:"",
            mail:"",
            ifright:0,
            ifpending:0,
            count:30,
            ifsend:0,
            name:"",
            imgCode:"",
            imgCodeUrl:preURL+"/captcha",
        }
    }

    handleFailure(index,text){
        if(!text)
            this.setState({
                errorText:FailureText[index-1]
            });
        else this.setState({
            errorText:text
        })
    }

    _countdowm60(){
        if(this.state.count===0){
            this.setState({
                ifpending:0,
                count:60,
                vertifyText:"重新发送",
            });
            return true;
        }
        else if(this.state.count>0){
            const thiscount = this.state.count-1;
            this.setState({
                count:thiscount,
                vertifyText:"重新发送"+thiscount
            });
            this.timer=setTimeout(this._countdowm60.bind(this),1000);
        }
    }

    _FrontVertify(index){
        let reg1 = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");

        if(index >= 1) {
            if (!this.state.mail)return 1;
            else if(!reg1.test(this.state.mail)) return 3;
        }
        if(index >= 2){
            if (!this.state.password)return 2;
        }
        if(index >= 3){
            if(!this.state.imgCode || this.state.imgCode.length !== 4) return 4
        }
        return 0;
    }

    _login() {
        let temp_mail = this.state.mail;
        let temp_name = this.state.name;
        this.setState({
            errorText: "",
            confirmLoading: true
        });
        let temp_Vcode = this._FrontVertify(4);
        if (temp_Vcode !== 0) {
            this.handleFailure(temp_Vcode); // 前置检验没过
            this.setState({
                confirmLoading: false
            });
            return false;
        }
        else {
            axios({
                url: preURL + "/login",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                data:{
                    mail: temp_mail,
                    password: this.state.password,
                    imgCode: this.state.imgCode
                },
                withCredentials: true,
            }).then((responseText) => {
                if (!responseText.data.result) {
                    this.handleFailure(responseText.data.error)
                } else {
                    window.localStorage.setItem("user", JSON.stringify(responseText.data.info))
                    // hashHistory.push('/')
                    window.location.replace("/#/")
                    // alert('登录成功')
                }
            });
        }
    }

    changeImgcode(){
        this.setState({
            imgCodeUrl:preURL+"/captcha?time="+Date.now().toString()
        });
    }

    // componentDidMount() {
    //     let info = window.localStorage.getItem("user")
    //     if(info && info !== "undefined"){
    //         console.log("info:", info)
    //         this.props.userLogin(JSON.parse(info))
    //     }
    // }

    componentWillUnMount (){
        this.timer && clearTimeout(this.timer);
    };

    render(){
        return(
            <div className="App">
                <Header/>
                <h3 className='big-header'>用户登录</h3>
                <div className="user-form-container">
                    <hr/>
                    <div className="input-group">
                        <label>邮箱:</label>
                        <input type="text" className="common-input" value={this.state.mail} onChange={(e) => this.setState({mail:trim(e.target.value)})}
                        />
                    </div>
                    <div className="input-group">
                        <label>密码:</label>
                        <input type="password" className="common-input" onChange={(e) => this.setState({password:e.target.value})}
                        />
                    </div>
                    <div className="input-group">
                        <label>图像验证码:</label>
                        <div className='input-button-group'>
                            <input type="text" className="common-input" value={this.state.imgCode} onChange={(e) => this.setState({imgCode:trim(e.target.value)})}
                            />
                            <div className="svg-code">
                                <img src={this.state.imgCodeUrl} className="imgCode" onClick={()=>{this.changeImgcode()}}/>
                            </div>
                        </div>
                    </div>
                    <div className="error-div">{this.state.errorText}</div>
                    <div className="input-group">
                        <Button type="primary" className="submit-button" onClick={()=>{this._login()}}>登录</Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;