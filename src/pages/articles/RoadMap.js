import React, { Component } from 'react';

import { Link } from 'react-router'

import Header from '../../components/header/Header'

import './articles.less'

class RoadMap extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="App">
                <Header/>
                <div className="article-container">
                    <div className="article-inner-container">

                        <div className="article-title">产品规划 / ROADMAP</div>

                        <h3>Betupchain 时间路线</h3>

                        <p>Betupchain 的公测时间为 2018-05-14 至 2018-06-07，公测期间，只会上线随机系列竞猜活动，随机竞猜系列活动第一期于 2018-06-08 0:00:00 截止，参与的用户除去获得竞猜奖励外，还可随机获得平台给出的奖励（0.1 - 10 NAS 不等）</p>

                        <p>Betupchain 计划于 2018-06-08 正式开放并上线世界杯系列竞猜活动。</p>

                        <h3>Betupchain 功能规划</h3>

                        <p>2018-05-14 - 2018-06-07: </p>

                        <ul>
                            <li>确保平台基本功能正常可用，可以参与竞猜。</li>
                            <li>完成平台支付的安全审计工作，从而决定是否开放平台直接支付（目前仅可支持个人钱包支付）</li>
                            <li>完善系统界面设计工作</li>
                            <li>完善用户申请竞猜流程，并于正式版本上线之后上线该功能</li>
                        </ul>

                        <p>2018-06-07 - 2018-06-30: </p>

                        <ul>
                            <li>进一步完善系统界面设计</li>
                            <li>设计并开发客户端版本</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoadMap