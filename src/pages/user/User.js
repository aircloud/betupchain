/**
 * Created by Xiaotao.Nie on 2018/5/12.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

import React, { Component } from 'react';

import UserHeader from '../../components/header/UserHeader'
import {trim} from "../../Utils/index.Utils";
import {userLogin, userLogOut} from "../../redux/action";
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import ClassNames from 'classnames'
import {preURL} from "../../config";
import axios from "axios/index";
import {hashHistory, Link} from "react-router";



import "./User.less"


class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            editNas: false,
            editNasText:'编辑',
            address:this.props.userInfo && this.props.userInfo.info ? this.props.userInfo.info.address : ""
        }
    }

    changeEditNas(){
        if(this.state.editNasText === '编辑') {
            // 说明没有编辑
            this.setState({
                editNas:true,
                editNasText:'保存',
            })
        } else {
            axios.post(preURL + "/addAddress", {
                address: this.state.address,
                mail:this.props.userInfo.info.mail
            }, {withCredentials: true}).then((responseText) => {
                if(responseText.data.result){
                    this.props.userLogin(Object.assign({}, this.props.userInfo.info, {address: this.state.address}))
                } else {
                    alert('更新失败，请稍后重试')
                }
            })

            this.setState({
                editNas:false,
                editNasText:'编辑',
            })
        }
    }

    componentWillReceiveProps(props) {
        if(props.userInfo && props.userInfo.info){
            this.setState({
                address: props.userInfo.info.address
            })
        }
    }

    undoEditNas(){
        this.setState({
            editNas:false,
            editNasText:'编辑',
        })
    }

    render(){
        return (
            <div className="App">
                <UserHeader/>

                {this.props.userInfo && this.props.userInfo.login && <div className="user-form-container">
                    <br/>
                    <div className="input-group">
                        <label>邮箱:</label>
                        <input type="text" disabled={true} className="disabled-input common-input" value={this.props.userInfo && this.props.userInfo.info ? this.props.userInfo.info.mail : ""}
                        />
                    </div>
                    <div className="input-group">
                        <label>NAS地址:
                            <a style={{marginLeft:10,marginRight:10}} onClick={()=>{this.changeEditNas()}}>{this.state.editNasText}</a>
                            {this.state.editNas && <a onClick={()=>{this.undoEditNas()}}>撤销</a>}
                        </label>
                        <input type="text" disabled={!this.state.editNas} value={this.state.address} className={ClassNames("common-input",{"disabled-input":!this.state.editNas})} onChange={(e) => this.setState({address:e.target.value})}
                        />
                    </div>
                </div>}

                {(!this.props.userInfo || !this.props.userInfo.login) &&
                <div className="not-login">
                    您还没有登录，请先<Link to={"/register"}>注册</Link>或者<Link to={"/login"}>登录</Link>
                </div>
                }

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(User)