import React from 'react';
import axios from 'axios';
import {getapiUrl} from './ConstValue';
import update from 'react-addons-update';
import {Form, FormGroup ,FormControl,ControlLabel,Button,Modal,Checkbox} from 'react-bootstrap';
import ReactSpinner from 'react-spinjs'; 


class Alarms extends React.Component {

	constructor(props) {
     	super(props);
 	
 		this.apiUrl= getapiUrl()
 		
 		this.state ={
 			'title':this.props.params.title,	
			'price':'',
			'sign':'', 
			'coin':'',
			'night':false,
 			'data':[],
 			'showModal':false,
			'delModal':false,
			'delId':'',
 			'isUpdate':false,
 			'spiner':true
 		}
   
   }

   // 첫 렌더링 시 호출
	componentDidMount() {
		
		let component = this;

		axios.get(this.apiUrl+'alarms/getList')
		  .then(function (response) {
		//	console.log(response)
		    component.setState({
		    	'data':response.data,
		    	'spiner':false

		    })

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		
  	}

  	componentWillReceiveProps(nextProps)
	{

		 this.setState({
	    	'title':nextProps.params.title,
	    })

	}
	componentDidUpdate(prevProps, prevState){

		if ( !prevState.isUpdate && this.state.isUpdate)
		{
			let component = this;

			component.setState({
				'spiner':true
			})

			axios.get(this.apiUrl+'alarms/getList')
		  .then(function (response) {
		//	console.log(response)
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
	handleCheckbox(e){
		this.setState({night:e.target.checked})
	}
	handleChange(e){

		let nextState={};

		nextState[e.target.name] = e.target.value;

		
		this.setState(nextState);
		
	}

	_addAlarms(){
		this.setState({showModal:true,price:'',sign:'>',coin:'eth'})
	}

	
	_addAlarmsPush(){
		
		let component = this;
		
		axios.post(this.apiUrl+'alarms/addAlarms',{coin:this.state.coin,sign:this.state.sign,price:this.state.price,night:this.state.night ? 'Y':'N'})
		  .then(function (response) {
		//	console.log(response)
		    component.setState({
				'spiner':false,
				'showModal':false,
				'isUpdate':true

		    })

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		
	}

	_modalClose(){
		this.setState({ showModal: false,delModal:false});
	}
	_deleteAlarm(id){
		this.setState({delId:id,delModal:true})

		
	}
	_deleteAlarmPush(){
		let component = this;


		axios.post(this.apiUrl+'alarms/delAlarms',{delId:this.state.delId})
		  .then(function (response) {
		//	console.log(response)
		    component.setState({
				'spiner':false,
				'delModal':false,
				'isUpdate':true,

		    })

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}


	render() {

    
		return (


			<div>
				<header id="header">


					<span className="logo"><strong>Alarm Settings</strong> {this.state.title}{'\u00A0'}{'\u00A0'}{'\u00A0'}
					<a style={{cursor:'pointer'}} onClick={this._addAlarms.bind(this)}>Add Alarms</a></span>	

		
				</header>

				{this.state.spiner ? <ReactSpinner /> : null }
			

				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>코인</th>
								<th>가격</th>
								<th>부호</th>
								<th>밤시간 알림</th>
							</tr>
						</thead>
						<tbody>

						{this.state.data.map((value,i) => {

							return (<AlarmList id={value.id} coin={value.coin} price={value.price} sign={value.sign} night={value.night} onDelete={this._deleteAlarm.bind(this)}  key={i}/>)
						})}

						</tbody>
					</table>
				</div>

				<Modal show={this.state.showModal} bsSize="small" onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>알람 등록</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <Form inline>
										 <FormGroup controlId="formControlsSelect">
								<ControlLabel><b>코인</b></ControlLabel>
								<FormControl componentClass="select" name="coin" placeholder="select" onChange={this.handleChange.bind(this)}>
										<option value="eth">ETH</option>
									<option value="btc">BTC</option>
								
									<option value="qtum">QTUM</option>
								</FormControl>
								</FormGroup>

							<FormGroup controlId="formInlineName">
								<ControlLabel><b>가격</b></ControlLabel>
								{' '}
								<FormControl type="text" name="price" value={this.state.price} onChange={this.handleChange.bind(this)}/>
								</FormGroup>
								{' '}
								 <FormGroup controlId="formControlsSelect">
								<ControlLabel><b>부호</b></ControlLabel>
								<FormControl componentClass="select" name="sign" placeholder="select" onChange={this.handleChange.bind(this)}>
									<option value=">">GT</option>
									<option value="<">LT</option>
								</FormControl>
								</FormGroup>

								<Checkbox checked={this.state.night} onChange={this.handleCheckbox.bind(this)}>밤시간 알림(23:00~07:00)</Checkbox>
						
							
					
						</Form>
			          </Modal.Body>
			          <Modal.Footer>
						<Button onClick={this._addAlarmsPush.bind(this)}>등록</Button>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			          </Modal.Footer>
			        </Modal>

						<Modal show={this.state.delModal} onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>삭제</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            {this.state.delId}를 삭제 하시겠습니까?
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			            <Button bsStyle="primary" onClick={this._deleteAlarmPush.bind(this)}>삭제</Button>
			          </Modal.Footer>
			        </Modal>

				
		
			
	
			</div>


										
								
		);
	}

}

// 토렌트 정보 컴포넌트
class AlarmList extends React.Component{

	handleClick(id){
		this.props.onDelete(id)
	}
	
	render(){
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.coin}</td>
				<td><a style={{cursor:'pointer'}} onClick={this.handleClick.bind(this,this.props.id)}>{this.props.price}</a></td>
				<td>{this.props.sign}</td>
				<td>{this.props.night}</td>
			</tr>
		);
	}
}


export default Alarms


