import React from 'react';
import axios from 'axios';
import {getapiUrl} from './ConstValue';
import {Button, Modal } from 'react-bootstrap';
import ReactSpinner from 'react-spinjs'; 
import Checkbox from './Checkbox'


class FtpList extends React.Component {

	constructor(props) {
     	super(props);
 	
 		this.apiUrl= getapiUrl()
 		
 		this.state ={
 			
 			'data':[],
 			'showModal':false,
 			'selText':'',
 			'serverRes':'',
 			'showresModal':false,
 			'isUpdate':false,
 			'spiner':true,
 			'selectAll':false

 		}


 		this.checkboxs = new Set()
   
   }

   // 첫 렌더링 시 호출
	componentDidMount() {
		
		let component = this;

		axios.get(this.apiUrl+'ftp/getList')
		  .then(function (response) {

		    component.setState({
		    	'data':response.data,
		    	'spiner':false


		    })

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		
  	}

  	// 삭제 확인창
	_deleteConfirm(text){

		var len= this.checkboxs.size
		var ptn=''
		if ( text ==null && len>0)
		{
			var i=0;
			this.checkboxs.forEach(function (item) {
				i++
				if ( i==len)
					ptn+=item
				else
					ptn+=item+'||'	
		
			});
		}
		else if ( text !=null)
		{
			ptn = text
		}
		else
		{
			
			this.setState({
		    	'serverRes':"삭제할 파일을 체크해주세요.",
		   		'showresModal':true
		   	})
			return
		}


 		this.setState({ 
 			showModal: true,
 			selText:ptn
 		});
		

	}

	shouldComponentUpdate(nextProps,nextState){
		return (JSON.stringify(nextState) != JSON.stringify(this.state))
	}


	// 삭제 후 리스트 가져오기
	componentDidUpdate(prevProps, prevState){

		if ( !prevState.isUpdate && this.state.isUpdate)
		{
			let component = this;

			component.setState({
				'spiner':true
			})

			axios.get(this.apiUrl+'ftp/getList')
			  .then(function (response) {

			    component.setState({
			    	'data':response.data,
			    	'isUpdate':false,
			    	'spiner':false

			    })

			  })

			  .catch(function (error) {
			    console.log(error);
			  });
		}

	}

	// 파일삭제 
	_deleteFile(){

		let component = this;
		
		component.setState({
			'spiner':true,
			 showModal: false,
		})

		axios.post(this.apiUrl+'ftp/deleteFile',{file:this.state.selText})
		  .then(function (response) {

		    component.setState({
		    	'serverRes':response.data,
		   		'showresModal':true,
		    	'spiner':false,
		    	'isUpdate':true
		    })

		  })
		  .catch(function (error) {
		    console.log(error);
		  });


	}
	// 모달 닫기
	_modalClose(){
		this.setState({ showModal: false ,'showresModal':false});
	}

	// 체크박스 업데이트 핸들러
	_CheckboxUpdate(label){

		if ( this.checkboxs.has(label))
			this.checkboxs.delete(label)
		else
			this.checkboxs.add(label); 

	}

	// 모두체크/체크해제 
	_checkAll(values){
		this.setState({
			'selectAll':values
		})
		
	}

	render() {

    
		return (


			<div>
				<header id="header">


					<span className="logo"><strong>FTP List</strong>{'\u00A0'}{'\u00A0'}{'\u00A0'}
					{ this.state.selectAll ? <a onClick={this._checkAll.bind(this,false)}>모두해제</a> :<a onClick={this._checkAll.bind(this,true)}>모두체크</a> }
					{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<a style={{cursor:'pointer'}} onClick={this._deleteConfirm.bind(this,null)}>삭제</a></span>	

		
				</header>


				


				{this.state.spiner ? <ReactSpinner /> : null }


				<div className="table-wrapper">
					<table >
						<thead>
							<tr>
								<th></th>
								<th>파일이름</th>
								<th>사이즈</th>
							</tr>
						</thead>
						<tbody>

						{this.state.data.map((value,i) => {
					return (<FtpInfo name={value.name} size={value.size} dftCheckbox={this.state.selectAll} onCheckboxs={this._CheckboxUpdate.bind(this)} onDelete={this._deleteConfirm.bind(this)} key={i}/>)
				})}

						</tbody>
					</table>
				</div>
			
				
				<Modal show={this.state.showModal} onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>삭제</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            {this.state.selText}를 삭제 하시겠습니까?
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			            <Button bsStyle="primary" onClick={this._deleteFile.bind(this)}>삭제</Button>
			          </Modal.Footer>
			        </Modal>

			    <Modal show={this.state.showresModal} onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>결과</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            {this.state.serverRes}
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			         
			          </Modal.Footer>
			        </Modal>
	
			</div>


										
								
		);
	}

}


// FTP 정보 컴포넌트
class FtpInfo extends React.Component{


  	handleCheckbox(label){
  		this.props.onCheckboxs(label)
  	}

	handleClick(name){
		this.props.onDelete(name)
	}


	render(){
		return(
			<tr>
				<td><Checkbox label={this.props.name} dftValue={this.props.dftCheckbox} handleCheckboxChange={this.handleCheckbox.bind(this,this.props.name)} key={this.props.name} /></td>
				<td><a style={{cursor:'pointer'}} onClick={this.handleClick.bind(this,this.props.name)}>{this.props.name}</a></td>
				<td>{this.props.size}</td>


			</tr>

		);
	}
}

export default FtpList