import React, { Component } from 'react';

import { Link } from 'react-router'

import Header from '../../components/header/Header'

import './articles.less'

class About extends Component {

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

                        <div className="article-title">关于 / ABOUT</div>

                        <h3>Betupchain 能做什么?</h3>

                        <p>Betupchain是一个基于 NEBULAS 的区块链竞猜平台，用户可以在平台上参与或者申请发起竞猜活动（目前，我们还没有开放申请竞猜活动的功能，具体开放时间可以参考我们的<Link to={"/roadmap"}>产品规划</Link>），另外平台也会定期发布竞猜，比如随机数学竞猜（类似彩票），世界杯竞猜、欧洲杯竞猜、NBA季后赛竞猜等。</p>

                        <h3>Betupchain 具体如何保证竞猜的公平性？</h3>

                        <p>Betupchain 的核心是一个基于 NEBULAS 的智能合约，其已经部署在了 NEBULAS 的公链上，智能合约不可被篡改，其管理着用户投票资产并负责奖励发放，相关数据任何人皆可查询。</p>
                        <p>另外，Betupchain 的智能合约除奖励发放以外不允许任何人提取资产，而奖励方法的过程人为不可操控，因此保证了投票过程的公平性和准确性。</p>

                        <h3>Betupchain 管理员可以做什么？</h3>

                        <p>为了保证 Betupchain 可以平稳发展运行，我们设计了 Betupchain 管理员一角色，最初管理员由开发者进行承担，之后随着 Betupchain 的功能开发完成以及更多的人参与进来，我们会邀请 Betupchain 平台上较为活跃的成员或机构成为我们的管理员，相比于普通成员，管理员有以下功能：</p>

                        <ul>
                            <li>可以直接新建一个竞猜活动，而普通成员想要新建竞猜活动需要先向管理员申请</li>
                            <li>可以管理平台手续费收入，目前的手续费为 0.6%，手续费收入主要用于链上数据存储、数据库和服务器费用等。</li>
                            <li>可以对某一项竞猜提请合约发放奖励，对于某一项刚刚结束的竞猜，其结果通常需要人为判断，但是结果是众所周知的，比如一场球赛的竞猜结果，是众所周知并且不能公然造假的，这个时候管理员可以提交结果到合约，从而合约自动发放奖励。</li>
                        </ul>

                        <h3>Betupchain 的奖励规则</h3>


                        <p>对于一个竞猜，所有参与者参与的资产会共同组成竞猜奖金（扣除 0.6% 的手续费），最终竞猜奖金会根据猜对一方购买的份数，按比例发放竞猜奖励（一份为0.1NAS）</p>

                    </div>
                </div>
            </div>
        )
    }
}

export default About