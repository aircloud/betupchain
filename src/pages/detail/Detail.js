import React, { Component } from 'react';
import './Detail.less';
import { Link } from 'react-router';
import { Progress, InputNumber, Tabs } from 'antd';
import Header from '../../components/header/Header'
import {connect} from "react-redux";
import { bindActionCreators } from "redux"
import ClassNames from "classnames";
import axios from "axios/index";
import { preURL, constractAddress } from "../../config";
import dayjs from 'dayjs'
import { Timeline } from 'antd';

const { TabPane } = Tabs;

class Detail extends Component {

    constructor(props){
        super(props)
        this.state = {
            content: {},
            selects: [],
            votes: [],
        }

        this.syncTime = 1000 * 60 * 5;
    }
    componentDidMount() {
        if(this.props.params.id)
            this.getContent()

        // 更新速率需要进行控制
        window.setInterval(()=>{
            this.getContent()
        }, this.syncTime)
    }

    getContent(){
        axios.post(preURL + "/getactivitydetail", {
            id: this.props.params.id
        },).then((responseText) => {
            console.log("getactivitydetail:", responseText )
            let votes = new Array(responseText.data.selects.length);
            for(let i = 0; i < votes.length; i += 1){
                votes[i] = 0
            }
            this.setState({
                content: {...responseText.data.value,
                    beginDate:dayjs(responseText.data.value.begin).format('YYYY.MM.DD HH:mm:ss'),
                    endDate:dayjs(responseText.data.value.end).format('YYYY.MM.DD HH:mm:ss Z'),
                },
                selects: responseText.data.selects,
                votes
            })
        })
    }

    render() {
        console.log('this.state.votes:', this.state.votes)
        return (
            <div className="App">
                <Header/>
                <div className="detail-container">

                    <div className="meta-container">
                        <div className="meta-time">
                            {this.state.content.beginDate} - {this.state.content.endDate}
                        </div>
                        <div className="meta-total">
                            奖池累计 <i className='activity-important'>{this.state.content.nas}NAS</i>
                        </div>
                    </div>

                    <div className="info-container">
                        <h3>{this.state.content.name}</h3>
                        <p>
                            {this.state.content.abstract}
                        </p>
                        <p>
                            获奖计算规则：
                            {this.state.content.detail}
                        </p>
                    </div>

                    <div className="list-container">

                        <div className="list-title">
                            <div className="list-title-bet">下注/NAS</div>
                        </div>

                        {this.state.selects.map((item, index) =>
                            <div className="list-item" key={index}>
                                <div className="item-name">{item.name}</div>
                                <div className="list-item-vote-container">
                                    <Progress className="item-progress" percent={this.state.content.nas === 0 ? 0 : item.nas / this.state.content.nas * 100} format={precent => item.nas.toFixed(4) + "NAS" /*TODO NEED CHANGE*/}/>
                                    <InputNumber min={0.1} step={0.1} onChange={(value)=>{
                                        let votes = this.state.votes;
                                        if(!isNaN(value))
                                            votes[index] = value
                                        this.setState(votes)
                                    }} className="item-bet"/>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="oper-container">
                        <Tabs defaultActiveKey="2" size={'large'}>
                            <TabPane tab="平台支付" key="1">
                                <div className="input-group">
                                    <label>NAS地址:
                                        <Link style={{
                                            marginLeft:10,fontSize:14
                                        }} to={'/user'} target={"_blank"}>去个人中心配置</Link>
                                    </label>
                                    <input type="text" disabled={!this.state.editNas} value={this.props.userInfo && this.props.userInfo.info && this.props.userInfo.info.address} className={"common-input disabled-input"}
                                    />
                                    <p style={{marginTop:15,color: 'red'}}>
                                        注意：目前直接采用平台支付的方式正在进行安全评估，建议先采用个人钱包支付，等待平台测试期结束后会根据安全性评估的结果选择是否开放平台支付功能。
                                    </p>
                                </div>
                            </TabPane>
                            <TabPane tab="钱包支付" key="2">
                                <p className="doc-p">您可以选择使用 NEBULAS 官方提供的<a href={"https://github.com/nebulasio/web-wallet"} target={"_blank"}>钱包</a>来完成这笔交易，交易成功即代表投票成功。平台会每隔一定的时间(测试期间为5分钟，正式上线后为10秒)从链上获取并同步最新数据</p>
                                <h3 style={{
                                    marginBottom:20
                                }}>操作流程</h3>
                                <Timeline>
                                    <Timeline.Item>进入个人 Web 钱包，选择合约，点击执行标签</Timeline.Item>
                                    <Timeline.Item>点击选择钱包文件（如果没有钱包需要先新建钱包并保证有足够余额）</Timeline.Item>
                                    <Timeline.Item>
                                        <p>填入参数：</p>
                                        <p>函数：<b>bet</b></p>
                                        {/*<p>参数：<b>{JSON.stringify(this.state.votes.map(item => item ? item : 0))}</b></p>*/}
                                        <p>参数：<b>{JSON.stringify(this.state.votes)}</b></p>
                                        <p style={{wordBreak:"break-all"}}>目的地址：<b>{constractAddress}</b></p>
                                        <p>要发送的金额：<b>{this.state.votes.reduce((p,n) => {if(n)return p + n; else return p},0).toFixed(1)}</b></p>
                                    </Timeline.Item>
                                    <Timeline.Item>分别执行解锁、测试、提交后，执行成功后即代表交易成功</Timeline.Item>
                                </Timeline>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state
    return { userInfo }
}
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
