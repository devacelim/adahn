import React from 'react'
import {Form, FormGroup ,FormControl,ControlLabel,Button,Modal} from 'react-bootstrap';
import update from 'react-addons-update';
import {getAccountInfo} from './ConstValue'

class Nbbang extends React.Component {

	

	constructor(props){
		super(props)


		this.state={
			'Peoples':[
				{'name':'','weight':1},
				{'name':'','weight':1}
			],
			'Objects':[
				{'name':'','money':''}
			],
			showModal:false,
			modalContent:''
		}


	}

	_addRemovePeople(val){

		let newState=null
		if ( val )
		{
			newState = update(this.state,{
				Peoples:{	
					$push:[{"name":'',"weight":1}]
				}
			});
		}
		else
		{

			if( this.state.Peoples.length >=3)
			{
				newState = update(this.state,{Peoples:{
					$splice: [[this.state.Peoples.length-1,1]]
				}
				});
			}
			else
				return
		}

		this.setState(newState);

	}
	_addRemoveObject(val){

		let newState=null
		if ( val )
		{
			newState = update(this.state,{
				Objects:{	
					$push:[{"name":'',"money":''}]
				}
			});
		}
		else
		{

			if( this.state.Objects.length >1)
			{
				newState = update(this.state,{Objects:{
					$splice: [[this.state.Objects.length-1,1]]
				}
				});
			}
			else
				return
		}

		this.setState(newState);

	}


	_calc(){

		
		let cnt=0
		let sum=0
		this.state.Peoples.map((people,i) => {
			
			cnt+=parseInt(people.weight)
		})

		this.state.Objects.map((object,i)=>{
			sum+=parseInt(object.money)					
				
		})
	

		const html= (
			<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>항목</th>
								<th>값</th>
							</tr>
						</thead>
						<tbody>
						


						{this.state.Objects.map((object,i)=>{
							return(
							<NbbangResult key={i} name={object.name} object={(parseInt(object.money)).toLocaleString()}/>
							)
						})}

						<tr>
							<td>총계</td>
							<td>{parseInt(sum).toLocaleString()}</td>
						</tr>

						</tbody>
					</table>
					<table>
						<thead>
							<tr>
								<th>이름</th>
								<th>1/{cnt}</th>
							</tr>
						</thead>
						<tbody>

						{this.state.Peoples.map((people,i)=>{
							return(
								<NbbangResult key={i} name={people.name+'*'+people.weight} object={(parseInt((sum/cnt)*people.weight/100)*100).toLocaleString()}/>
							)
						})}
						</tbody>
					</table>

					<div style={{float:'right'}}>
					계좌 : {getAccountInfo()}
					</div>


			</div>

		)

		this.setState({showModal:true,modalContent:html})



	}

	_clear(){
		
		this.setState({'Peoples':[
				{'name':'','weight':1},
				{'name':'','weight':1}
			],
			'Objects':[
				{'name':'','money':''}
			]
		})		

	}
	onNameEdit(name,weight,num){


		let newState= update(this.state,{
			Peoples:{ 
				[num]:{
				name:{$set:name},
				weight:{$set:weight}
			}}
		});
		

		this.setState(newState)


	}

	onObjectEdit(name,money,num){
		let newState= update(this.state,{
			Objects:{ 
				[num]:{
				name:{$set:name},
				money:{$set:money}
			}}
		});
		

		this.setState(newState)
	}
	_modalClose(){
		this.setState({ showModal: false });
	}


	render()
	{

		return(

			<div>
				<header id="header">


					<span className="logo"><strong>N-BBANG</strong></span>	

		
				</header>
				

				<div style={{float:'right'}}>
				<Button onClick={this._calc.bind(this)}>계산</Button>
			
				<Button onClick={this._clear.bind(this)}>초기화</Button>
				</div>
				
				

				{this.state.Peoples.map((people,i) => {
						return (
							<NbbangName key={i} num={i} name={people.name} weight={people.weight} onEdit={this.onNameEdit.bind(this)}/> 
						);
				})}
				<Button onClick={this._addRemovePeople.bind(this,true)}>인원추가</Button>
				<Button onClick={this._addRemovePeople.bind(this,false)}>인원삭제</Button>

				<hr/>
				
				{this.state.Objects.map((object,i) => {
						return (
							<NbbangObject key={i} num={i} name={object.name} money={object.money} onEdit={this.onObjectEdit.bind(this)}/> 
						);
				})}
				<Button onClick={this._addRemoveObject.bind(this,true)}>항목추가</Button>
				<Button onClick={this._addRemoveObject.bind(this,false)}>항목삭제</Button>


				<Modal show={this.state.showModal} bsSize="small" onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>엔빵결과</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            {this.state.modalContent}
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			          </Modal.Footer>
			        </Modal>


			</div>

		)
	}
}

class NbbangResult extends React.Component{



	render(){
		return(
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.object}</td>
			</tr>
		)
	}
}


class NbbangName extends React.Component{


	constructor(props){
		super(props)

		this.state={
			'name':'',
			'weight':1

		}
	}


	handleChange(e){

		let nextState={};

		nextState[e.target.name] = e.target.value;
		this.setState(nextState);


		
	}

	// 부모에서 query 받기
	componentWillReceiveProps(nextProps){

	//	console.log(nextProps)
		this.setState({
			name:nextProps.name,
			weight:nextProps.weight
		})
	}

	shouldComponentUpdate(nextProps,nextState){
		return ( (JSON.stringify(nextState) != JSON.stringify(this.state)))
	}

	componentDidUpdate(prevProps, prevState)
	{
		this.props.onEdit(this.state.name,this.state.weight,this.props.num)
		
	}




	render(){

		return(
			<div>
				
					<Form inline>
				    <FormGroup controlId="formInlineName">
					    <ControlLabel><b>사람 {this.props.num+1}</b></ControlLabel>
					    {' '}
					    <FormControl type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
					    </FormGroup>
					    {' '}
					    <FormGroup controlId="formInlineEmail">
					    <ControlLabel>가중치</ControlLabel>
					    {' '}
					    <FormControl type="text" name="weight" value={this.state.weight} onChange={this.handleChange.bind(this)} />
				    </FormGroup>
				    
				    
			    
			  		</Form>

			
				
			</div>

		)
	}



}


class NbbangObject extends React.Component{


	constructor(props){
		super(props)

		this.state={
			'name':'',
			'money':''

		}
	}


	handleChange(e){

		let nextState={};

		nextState[e.target.name] = e.target.value;
		this.setState(nextState);


		
	}

	// 부모에서 query 받기
	componentWillReceiveProps(nextProps){

	//	console.log(nextProps)
		this.setState({
			name:nextProps.name,
			money:nextProps.money
		})
	}

	shouldComponentUpdate(nextProps,nextState){
		return ( (JSON.stringify(nextState) != JSON.stringify(this.state)))
	}

	componentDidUpdate(prevProps, prevState)
	{
		this.props.onEdit(this.state.name,this.state.money,this.props.num)
		
	}




	render(){

		return(
			<div>
				
					<Form inline>
				    <FormGroup controlId="formInlineName">
					    <ControlLabel><b>항목 {this.props.num+1}</b></ControlLabel>
					    {' '}
					    <FormControl type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
					    </FormGroup>
					    {' '}
					    <FormGroup controlId="formInlineEmail">
					    <ControlLabel>금액</ControlLabel>
					    {' '}
					    <FormControl type="text" name="money" value={this.state.money} onChange={this.handleChange.bind(this)} />
				    </FormGroup>
				    
				    
			    
			  		</Form>

			
				
			</div>

		)
	}



}
export default Nbbang