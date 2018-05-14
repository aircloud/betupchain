import React, { Component } from 'react';

import { Link } from 'react-router'

import './Footer.less'



class Footer extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <header className="footer">


                <hr style={{color:"#cccccc"}}/>

                <div className="footer-logo">
                    <img style={{width:28}} src={require("../../resource/img/logo.png")} />
                    <span>Betupchain</span>
                </div>

                <div className="footer-links">
                    <Link to={"about"}> 关于 </Link>
                    <Link to={"roadmap"}> 产品计划 </Link>
                    <Link to={"/responsibility"}> 责任声明 </Link>
                    <a href={'https://nebulas.io/'} target={'_blank'}> NEBULAS </a>
                </div>
                <div className="footer-info">

                    <a href={'https://github.com/aircloud'} target={'_blank'}> 开发者介绍 </a>
                    <Link to={"/joinandfund"}> 加入和资助 </Link>

                </div>
            </header>
        )
    }
}

export default Footer