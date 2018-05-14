import React, { Component } from 'react';
import './Main.less';
import { Link } from 'react-router';

import Header from '../../components/header/Header'
import axios from "axios/index";
import {preURL} from "../../config";

import dayjs from 'dayjs'

function flatten2d(arr) {
    var result = [];
    for(let i = 0; i < arr.length; i++) { result = result.concat(arr[i]); }
    return result;
}

function group2d(arr, num) {
    var result = [];
    for(let i = 0; i < arr.length; i += num){
        result.push(arr.slice(i, i + num))
    }
    return result;
}

function computeEachLineNumber(width){
    if (width < 830 )
        return 1;
    else if (width >= 830 && width < 1210)
        return 2;
    else if (width >= 1210 && width < 1590)
        return 3;
    return 4;
}

class Main extends Component {

    constructor(props){
        super(props)
        this.clientWidth = document.documentElement.clientWidth;
        let eachLineNumber = computeEachLineNumber(this.clientWidth)
        this.state = {
            eachLineNumber,
            allActivities: group2d([],eachLineNumber)
        }
        console.log('this.clientWidth:', this.clientWidth)
    }

    listenSizeChange(){
        window.addEventListener('resize', (e) => {
            if(this.clientWidth !== document.documentElement.clientWidth) {
                this.clientWidth = document.documentElement.clientWidth;
                let eachLineNumber = computeEachLineNumber(this.clientWidth)
                this.setState({
                    eachLineNumber,
                    allActivities: group2d(flatten2d(this.state.allActivities), eachLineNumber)
                })
            }
        })
    }

    componentDidMount() {
        this.listenSizeChange()
        axios.post(preURL + "/getactivities", {},).then((responseText) => {
            console.log('getactivities:', responseText.data)

            let all = responseText.data.value.map((item) => {
                let newItem = item;
                newItem.beginDate = dayjs(item.begin).format('YYYY.MM.DD HH:mm:ss')
                newItem.endDate = dayjs(item.end).format('YYYY.MM.DD HH:mm:ss Z')
                return newItem
            })

            this.setState({
                allActivities: group2d(all, this.state.eachLineNumber)
            })
        })
    }

    render() {
        console.log('allActivities:' , this.state.allActivities)
        return (
            <div className="App">
                <Header/>
                <div className='activities-container'>
                    <div className='activities-inner-container'>
                        {this.state.allActivities.map((items, index0) =>
                            <div className='activities-list' key={index0}>
                                {items.map((item, index1) =>
                                    <div key={index1} className='activity'>
                                        <Link to={`/detail/${item.id}`}>
                                            <div className='activity-back' style={{backgroundImage:`url(${item.banner})`}}>
                                                <div className='activity-tag'>
                                                    <span>{item.tag}</span>
                                                </div>
                                                <div className='activity-header'>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='activity-content'>
                                            <div className='activity-meta'>
                                                <span className='activity-number'>共计<i className='activity-important'>{item.people}</i>人次参与</span>
                                                <span className='activity-total'><i className='activity-important'>{item.nas}NAS</i>奖池</span>
                                            </div>
                                            <p className='activity-abstract'>
                                                {item.abstract}
                                            </p>
                                            <div className="activity-time">
                                                {item.beginDate} - {item.endDate}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {!this.state.allActivities.length &&
                        <p style={{marginTop:20}}>
                            数据更新中，请稍后
                        </p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
