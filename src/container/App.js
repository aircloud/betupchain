import React, { Component } from 'react';

import Footer from '../components/footer/Footer'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default App