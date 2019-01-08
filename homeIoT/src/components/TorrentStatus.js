import React from 'react';
import axios from 'axios';
import {getapiUrl} from './ConstValue';
import ReactSpinner from 'react-spinjs'; 


class TorrentStatus extends React.Component {

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

		axios.get(this.apiUrl+'torrent/status')
		  .then(function (response) {

		    component.setState({
		    	'data':response.data,
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

			axios.get(this.apiUrl+'torrent/status')
			  .then(function (response) {

			    component.setState({
			    	'data':response.data,
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


					<span className="logo"><strong>Torrent Status</strong>{'\u00A0'}{'\u00A0'}{'\u00A0'}
					<a style={{cursor:'pointer'}} onClick={this._reload.bind(this)}>Refresh</a></span>	

		
				</header>
				
				{this.state.spiner ? <ReactSpinner /> : null }
			
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>파일이름</th>
								<th>다운로드 속도</th>
								<th>퍼센트</th>
								<th>상태</th>
							</tr>
						</thead>
						<tbody>

						{this.state.data.map((value,i) => {
							return (<TorrentStatusInfo name={value.name} downRate={value.downRate} percent={value.percent} status={value.status} key={i}/>)
						})}
						</tbody>
					</table>
				</div>
				

			</div>


										
								
		);
	}

}


class TorrentStatusInfo extends React.Component{

	handleClick(name){
		this.props.onDelete(name)
	}
	render(){
		return(
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.downRate}</td>
				<td>{this.props.percent}</td>
				<td>{this.props.status}</td>
			</tr>
		);
	}
}

export default TorrentStatus