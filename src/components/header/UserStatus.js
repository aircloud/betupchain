/**
 * Created by Xiaotao.Nie on 2017/3/16.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React, { Component, PropTypes } from 'react'
import './UserStatus.less';
import {hashHistory, Link} from 'react-router';
import {preURL} from "../../config"
import Button from 'antd/lib/button'

import axios from 'axios'

class UserStatus extends Component{

    constructor(props){
        super(props);
        this.state = {
            visible1: false,
            visible2: false,
            phone:"",
            vertify:"",
            vertifyTest:"获取验证码",
            ifright:0,
            ifpending:0,
            count:30,
            ifsend:0,
            name:"",
            imgCode:null,
            confirmLoading1:false,
            confirmLoading2:false,
        };
        console.log("this.props.userStatus:",this.props.userStatus);
    };

    showModal1 = () => {
        this.setState({
            visible1: true,
        });
    };

    handleOk1 = (e) => {
        console.log(this.state.visible1);
        this.setState({
            visible1: false,
        });
    };

    handleCancel1 = (e) => {
        console.log(this.state.visible1);
        this.setState({
            visible1: false,
        });
    };

    handleOk2 = (e) => {
        this.setState({
            visible2: false,
        });
    };
    handleCancel2 = (e) => {
        this.setState({
            visible2: false,
        });
    };
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    _userLogOut(){
        // axios.post(preURL + "/logout", {}, {withCredentials: true}).then((responseText) => {
        //     if(responseText.data.result){
        //         window.localStorage.removeItem("user")
        //         this.props.userLogOut();
        //         hashHistory.push('/')
        //     }
        // })
        window.localStorage.removeItem("user")
        this.props.userLogOut();
        hashHistory.push('/')
        // location.reload()
    }

    render(){
        if(this.props.userInfo && this.props.userInfo.login) {
            return(
                <div className="UserLogin">
                    <Link to="/user" className="US-UserName">{this.props.userInfo.info.name}</Link>
                    <span className="US-LogOut" onClick={this._userLogOut.bind(this)}>退出</span>
                </div>
            )
        }
        else{
            return (
                <div className="UserLogin">
                    <Link to={'/register'}><Button className="App-login-button" onClick={this.showModal1} ghost>注册</Button></Link>
                    <Link to={'/login'}><Button className="App-login-button" onClick={this.showModal2} ghost>登录</Button></Link>
                </div>
            )

        }
    }

}

export default UserStatus;