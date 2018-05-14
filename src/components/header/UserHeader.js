import React, { Component } from 'react';

import UserStatus from './UserStatus'

import axios from 'axios'
import {preURL} from "../../config";

import {userLogin, userLogOut} from "../../redux/action";
import {hashHistory, Link} from 'react-router';

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import "./UserHeader.less"

/**
 * Created by Xiaotao.Nie on 2018/5/12.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

class Header extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        // 使用 cookie 这种方式在 Safari 下会有 bug
        // axios.post(preURL + "/iflogin", {}, {withCredentials: true}).then((responseText) => {
        //     console.log('iflogin:', responseText.data)
        //     if(responseText.data.login){
        //         this.props.userLogin(responseText.data.info)
        //     }
        // })
        let info = window.localStorage.getItem("user")
        if(info && info !== "undefined"){
            console.log("info:", info)
            this.props.userLogin(JSON.parse(info))
        }
    }

    componentWillReceiveProps(props) {
        console.log('props:', props)
    }

    render(){
        return(
            <header className="User-header">
                <div className="User-login-container">
                    <UserStatus userInfo = {this.props.userInfo} userLogOut={this.props.userLogOut}/>
                </div>
                <div className="User-slider">
                    <Link to={'/'}>主页</Link>
                </div>
                <h1 className="User-title">个人中心</h1>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state
    return { userInfo }
}
const mapDispatchToProps = dispatch => ({
    userLogin: bindActionCreators(userLogin, dispatch),
    userLogOut: bindActionCreators(userLogOut, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)