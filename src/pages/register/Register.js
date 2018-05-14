import React, { Component } from 'react';

import axios from 'axios'
import {hashHistory} from 'react-router';

import Header from '../../components/header/Header'
import {trim} from "../../Utils/index.Utils";

import Button from "antd/lib/button"

import "./Register.less"
import {preURL} from "../../config";

axios.defaults.withCredentials=true

const FailureText=[
    "请填写邮箱",//1
    "请填写用户名",//2
    "请填写图片验证码",//3
    "请填写邮件验证码",//4
    "请输入正确格式的邮箱",//5
    "请输入长度不少于2个字符的用户名",//6
    "请填写正确位数的图片验证码",//7
    "请填写正确的图片验证码",//8
    "该邮箱已经注册，请直接登录",//9
    "该用户名已经被占用，请更换用户名",//10
    "请等待30秒后重新发送",//11
    "Network failure:请检查您的网络",//12
    "对不起，服务器错误，请稍后重试",//13
    "请填写正确的邮件验证码",//14
    "两次输入的密码不一致，请重新输入",//15
    "请输入并二次确认密码"//16
];

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorText:"",
            mail:"",
            vertify:"",
            vertifyText:"发送邮件验证码",
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
            else if(!reg1.test(this.state.mail)) return 5;
        }
        if(index >= 2){
            if (!this.state.name)return 2;
            else if(this.state.name.length<2) return 6;
        }
        if(index >= 3){
            if(!this.state.password || !this.state.passwordV2) return 16
            else if(this.state.password !== this.state.passwordV2) return 15
        }
        if(index >= 4){
            if (!this.state.imgCode)return 3;
            else if(this.state.imgCode.length!==4)return 7;
        }
        if(index >= 5){
            if (!this.state.vertify)return 4;
        }
        return 0;
    }

    _sendvertify(){
        if(this._sendvertifyHandle) return
        this._sendvertifyHandle = true;
        this.setState({errorText:""});
        let temp_mail = this.state.mail;
        let temp_Vcode = this._FrontVertify(4);
        if( temp_Vcode!==0){ // 如果提前验证失败，那么就不会进入到判断逻辑
            this.handleFailure(temp_Vcode);
            this._sendvertifyHandle = false;
            return false;
        }
        else if(this.state.ifpending===1){
            this._sendvertifyHandle = false;
            this.handleFailure(11); // 如果目前没有到60秒，还是不会继续发送
            return false;
        }
        else {
            console.log(preURL+"/captchatest/" + this.state.imgCode);
            axios.post(preURL+"/captchatest/" + this.state.imgCode,{},{withCredentials: true}).then((responseText)=> {
                if(!responseText.data.result){
                    this.handleFailure(8);
                    alert(JSON.stringify(responseText.data.result))
                    this._sendvertifyHandle = false;
                    return false;
                }
                axios({
                    method: 'post',
                    url: preURL + "/finduser",
                    withCredentials: true,
                    data: {
                        mail: this.state.mail,
                        name: this.state.name
                    }
                }).then((responseText)=> {
                    if(!responseText.data.result){
                        this.handleFailure(responseText.data.error);
                        this._sendvertifyHandle = false;
                        return false;
                    }
                    else {
                        axios({
                            method: 'post',
                            url: preURL + "/sendmail",
                            withCredentials: true,
                            data: {
                                mail: this.state.mail,
                                imgCode: this.state.imgCode
                            }
                        }).then((response)=> {
                            this._sendvertifyHandle = false;
                            console.log(response);
                            if (response.data.result) {
                                this.setState({
                                    ifpending: 1,
                                    ifsend: 1,
                                    vertifyText: "已发送",
                                });
                                this._countdowm60();
                            }
                            else {
                                this.handleFailure(12);
                            }
                        });
                    }
                });
            });
        }
    }

    _register() {
        let temp_mail = this.state.mail;
        let temp_name = this.state.name;
        this.setState({
            errorText: "",
            confirmLoading: true
        });
        let temp_Vcode = this._FrontVertify(5);
        if (temp_Vcode !== 0) {
            this.handleFailure(temp_Vcode); // 前置检验没过
            this.setState({
                confirmLoading: false
            });
            return false;
        }
        else {
            axios({
                url: preURL + "/insert",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                data:{
                    mail: temp_mail,
                    name: temp_name,
                    mailCode: this.state.vertify,
                    password: this.state.password,
                },
                withCredentials: true,
            }).then((responseText) => {
                if (!responseText.data.result) {
                    this.handleFailure(responseText.data.error)
                } else {
                    alert('注册成功，即将跳转到登录页')
                    hashHistory.push('/login')
                }
            });
        }
    }

    changeImgcode(){
        this.setState({
            imgCodeUrl:preURL+"/captcha?time="+Date.now().toString()
        });
    }

    componentWillUnMount (){
        this.timer && clearTimeout(this.timer);
    };

    render(){
        return(
            <div className="App">
                <Header/>
                <h3 className='big-header'>用户注册</h3>
                <div className="user-form-container">
                    <hr/>
                    <div className="input-group">
                        <label>邮箱:</label>
                        <input type="text" className="common-input" value={this.state.mail} onChange={(e) => this.setState({mail:trim(e.target.value)})}
                        />
                    </div>
                    <div className="input-group">
                        <label>用户名:</label>
                        <input type="text" placeholder={'最长不超过128个字符'} className="common-input" value={this.state.name} onChange={(e) => this.setState({name:trim(e.target.value)})}
                        />
                    </div>
                    <div className="input-group">
                        <label>密码:</label>
                        <input type="password" className="common-input" onChange={(e) => this.setState({password:e.target.value})}
                        />
                    </div>
                    <div className="input-group">
                        <label>确认密码:</label>
                        <input type="password" className="common-input" onChange={(e) => this.setState({passwordV2:e.target.value})}
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
                    <div className="input-group">
                        <label>邮件验证码:</label>
                        <div className='input-button-group'>
                            <input type="text" className="common-input" value={this.state.vertify} onChange={(e) => this.setState({vertify:trim(e.target.value)})}
                            />
                            <Button className="mail-code" onClick={()=>{this._sendvertify()}}>{this.state.vertifyText}</Button>
                        </div>
                    </div>
                    <div className="error-div">{this.state.errorText}</div>
                    <div className="input-group">
                        <Button type="primary" className="submit-button" onClick={()=>{this._register()}}>提交注册</Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register;