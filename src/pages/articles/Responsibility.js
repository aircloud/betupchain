import React, { Component } from 'react';

import { Link } from 'react-router'

import Header from '../../components/header/Header'

import './articles.less'

class Responsibility extends Component {

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

                        <div className="article-title">责任声明 / RESPONSIBILITY</div>

                        <p>Betupchain 基于 NEBULAS 区块链技术，在以下情况下，Betupchain 并不负责用户损失</p>

                        <ul>
                            <li>由于用户疏忽从而造成转账地址输入错误、参数输入错误的。</li>
                            <li>由于 NEBULAS 官方的一些原因产生损失的。</li>
                            <li>由于黑客入侵、政策风险等因素造成损失的，Betupchain 会将全部手续费收入弥补给用户，如果不足，酌情额外赔偿。</li>
                        </ul>

                        <p>另外，一些特殊情况如下：</p>

                        <ul>
                            <li>由于不可抗力因素造成竞猜结果无法产生的，平台会退换用户的竞猜投入（不退换手续费）。</li>
                            <li>由于没有人选择正确竞猜结果造成奖励无法发放的，该笔资产永久存储在合约地址中。</li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default Responsibility