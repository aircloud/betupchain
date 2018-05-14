import React, { Component } from 'react';

import UserStatus from './UserStatus'

import axios from 'axios'
import {preURL} from "../../config";

import {userLogin, userLogOut} from "../../redux/action";

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {hashHistory, Link} from 'react-router';

import './Header.less'

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
            <header className="App-header">
                <div className="App-login-container">
                    <UserStatus userInfo = {this.props.userInfo} userLogOut={this.props.userLogOut}/>
                </div>
                <div className="App-slider">
                    <Link to={'/'}>主页</Link>
                </div>
                <h1 className="App-title">Betupchain</h1>
                <p className="App-intro">
                    Betupchain 是一个基于 NEBULAS 的区块链竞猜平台，用户可以参与或发起竞猜活动，通过区块链来保证竞猜的公平和不可篡改。
                </p>
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