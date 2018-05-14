import React, { Component } from 'react';

import { Link } from 'react-router'

import Header from '../../components/header/Header'

import './articles.less'

class JoinAndFund extends Component {

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

                        <div className="article-title">加入和资助 / JOIN AND FUND</div>

                        <h3>加入 Betupchain</h3>

                        <p>Betupchain 目前由个人开发者进行维护，如果你认可该项目前景并有如下之一技能，欢迎加入：</p>

                        <ul>
                            <li>拥有相关产品的产品设计经验，对产品有独到见解。</li>
                            <li>拥有相关渠道资源，在市场方面有经验。</li>
                            <li>热衷于区块链技术，尤其是区块链底层技术。</li>
                        </ul>

                        <h3>资助或者投资</h3>

                        <p>如果您看好这个项目，您可以选择资助或者投资，前者可以使您在平台发展以后获得平台提供的奖励（发放到资助地址），投资也许可能会使您获得潜在的更大收益。</p>

                        <br/>

                        <p>加入或资助，均可通过 <b>networknxt@gmail.com</b> 进行联系</p>

                        <p>NAS 资助地址： <b>n1Z55BGGrCdEkrZ5PMZ2EcwJReJyZTGMkcc</b> </p>
                        <p>BTC 资助地址： <b>3Lui5PAeqnUSQ5QJqWMr5eYg4awe3QAqUn</b> </p>
                        <p>ETH 资助地址： <b>0x32010948d0db41123fff12157d22bd6c48f343f1</b> </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default JoinAndFund