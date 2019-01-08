import React from 'react';
import axios from 'axios';
import {getapiUrl} from './ConstValue';
import ReactSpinner from 'react-spinjs'; 


class Qtum extends React.Component {

	constructor(props) {
     	super(props);
 	
 		this.apiUrl= getapiUrl()
 		
 		this.state ={
 			
 			'data':[],
 			'spiner':true,
 			'isUpdate':false
 		}
   
   }

   // 첫 렌더링 시 호출
	componentDidMount() {
		
		let component = this;

		axios.get(this.apiUrl+'qtum/getstakinginfo')
		  .then(function (response) {

		    component.setState({
		    	'data':[response.data],
		    	'spiner':false,
		    	'isUpdate':false

		    })

		  })


		  .catch(function (error) {
		    console.log(error);
		  });
		
  	}

  	_reload(){
  		this.setState({
  			'spiner':true,
  			'isUpdate':true
  		})
  	}
  	componentDidUpdate(prevProps, prevState){

  		if(!prevState.isUpdate && this.state.isUpdate )
  		{
	  		let component = this;

			axios.get(this.apiUrl+'qtum/getstakinginfo')
			  .then(function (response) {

			    component.setState({
			    	'data':[response.data],
			    	'spiner':false,
			    	'isUpdate':false

			    })

			  })


			  .catch(function (error) {
			    console.log(error);
			  });
		}

  	}
	shouldComponentUpdate(nextProps,nextState){
		return (JSON.stringify(nextState) != JSON.stringify(this.state))
	}
	

	render() {

    
		return (


			<div>
				<header id="header">


					<span className="logo"><strong>Qtum Staking Status</strong>{'\u00A0'}{'\u00A0'}{'\u00A0'}
					<a style={{cursor:'pointer'}} onClick={this._reload.bind(this)}>Refresh</a></span>	

		
				</header>
				
				{this.state.spiner ? <ReactSpinner /> : null }
			
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>enable</th>
								<th>staking</th>
								<th>remaintime</th>
								<th>balance</th>
								<th>stake</th>
								<th>confirms</th>
								<th></th>
								<th>weight</th>
								<th>netstakeweight</th>
								<th>search_int</th>
								<th>expectedtime</th>
							
								
						
							


							</tr>
						</thead>
						<tbody>

						{this.state.data.map((value,i) => {
							return (<QtumStakinginfo enable={value.enabled} staking={value.staking} weight={value.weight} netstakeweight={value.netstakeweight} 
								search_int={value.search_interval} expectedtime={value.expectedtime} remaintime={value.remaintime} balance={value.balance} stake={value.stake}  unlocked_until={value.unlocked_until} confirms={value.confirm}
							
							key={i}/>)
						})}
						</tbody>
					</table>
				</div>
				

			</div>


										
								
		);
	}

}


class QtumStakinginfo extends React.Component{


	render(){
		return( 
			<tr>
				<td style={{color:'red',fontWeight:600}}>{this.props.enable}</td>
				<td style={{color:'red',fontWeight:600}}>{this.props.staking}</td>
				<td style={{color:'red',fontWeight:600}}>{this.props.remaintime}</td>
				<td style={{color:'red',fontWeight:600}}>{this.props.balance}</td>
				<td style={{color:'red',fontWeight:600}}>{this.props.stake}</td>
				<td style={{color:'red',fontWeight:600}}>{this.props.confirms}</td>
				<td></td>
				<td>{this.props.weight}</td>
				<td>{this.props.netstakeweight}</td>
				<td>{this.props.search_int}</td>
				<td>{this.props.expectedtime}</td>
				
				<td></td>


			</tr>
		);
	}
}

export default Qtum