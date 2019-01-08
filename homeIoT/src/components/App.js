import React from 'react';

import Sidebar from './Sidebar';


export default class App extends React.Component {

  constructor(props) {
        super(props);
    
        
        this.state ={
            isOpen:true
        }
   
   }


    componentWillReceiveProps(nextProps)
    {

        this.setState({
            isOpen:false
        })
        

    }          
   componentDidMount() {

        document.title = "Adahn's Home IoT";
   }

    render(){
    	
    	
        return (	   
        	<div>
        		 <div id="wrapper">
                    <div id="main">
                        <div className="inner">
                         {this.props.children}
                        </div>
                    </div>
                     <Sidebar isOpen={this.state.isOpen}/>

                 </div> 
            </div>
   		
        );
    }
}




export class NoMatch extends React.Component {
	render() {
		return (
			<div>
				<h2>Sorry! 404 Not Found</h2>
			</div>
		);
	}
}