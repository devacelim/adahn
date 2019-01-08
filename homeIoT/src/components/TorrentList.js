import React from 'react';
import axios from 'axios';
import {getapiUrl} from './ConstValue';
import update from 'react-addons-update';
import {Button, Modal } from 'react-bootstrap';
import ReactSpinner from 'react-spinjs'; 

class TorrentList extends React.Component {

	constructor(props) {
     	super(props);
 	
 		this.apiUrl= getapiUrl()
 		
 		this.state ={
 			'title':this.props.params.title,
 			'page':1,
 			'query':'',
 			'data':[],
 			'pages': [1, 2, 3, 4, 5,6,7,8,9,10],
 			'showModal':false,
 			'selText':'',
 			'selLink':'',
 			'serverRes':'',
 			'showresModal':false,
 			'isUpdate':false,
 			'spiner':true
 		}
   
   }

   // 첫 렌더링 시 호출
	componentDidMount() {
		
		let component = this;

		axios.get(this.apiUrl+'torrent/getList?cid='+this.state.title+'&query='+this.state.query+'&page='+this.state.page)
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

  	componentWillReceiveProps(nextProps)
	{

		 this.setState({
	    	'title':nextProps.params.title,
	    	'query':''
	    })

	}


	shouldComponentUpdate(nextProps,nextState){

		return (JSON.stringify(nextState) != JSON.stringify(this.state)); 
	}

	componentDidUpdate(prevProps, prevState){


		// URL 파라메터가 바뀌거나 isUpdate가 True일때 REST Call
		if ( ( !prevState.isUpdate && this.state.isUpdate )|| prevProps.params.title != this.props.params.title)
		{

			let component = this;
			window.scrollTo(0, 0)
			component.setState({
				'spiner':true
			})
		
			axios.get(this.apiUrl+'torrent/getList?cid='+this.state.title+'&query='+this.state.query+'&page='+this.state.page)
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

	// 다운로드 확인창 
	_downLoadConfirm(text,link){


 		this.setState({ 
 			showModal: true,
 			selText:text,
 			selLink:link
 		});
		

	}
	
	// 토렌트 다운로드
	_TorrDownload(){

		let component = this;

		window.scrollTo(0, 0);
		
		component.setState({
				'spiner':true,
				 showModal: false,
		})
		

		axios.post(this.apiUrl+'torrent/downLoad',{url:this.state.selLink})
		  .then(function (response) {

		    component.setState({
		    	'serverRes':response.data,
		   		'showresModal':true,
		    	'spiner':false
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

	// 검색어&페이지 업데이트
	_schConditionUpdate(query,page){

		let newState = update(this.state,{
			query:{$set:query},
			page:{$set:page},
			isUpdate:{$set:true}
		})
		
		

		this.setState(newState);

		
	}

	render() {

    
		return (


			<div>
				<header id="header">


					<span className="logo"><strong>Torrent List</strong> {this.state.title}</span>	

		
				</header>

				{this.state.spiner ? <ReactSpinner /> : null }
				<TorrentSearch query={this.state.query} onEdit={this._schConditionUpdate.bind(this)}/>


				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>제목</th>
								
							</tr>
						</thead>
						<tbody>

						{this.state.data.map((value,i) => {
							return (<TorrentInfo text={value.text} link={value.link} onDownload={this._downLoadConfirm.bind(this)} key={i}/>)
				
						})}

						</tbody>
					</table>
				</div>
		
				

				

				<ul className="pagination">

					{this.state.pages.map((value,i) => {
						return (<TorrentPage curPage={this.state.page} query={this.state.query} onEdit={this._schConditionUpdate.bind(this)} page={value} key={i}  />);
					})}

					
				</ul>
				
				<Modal show={this.state.showModal} onHide={this._modalClose.bind(this)}>
			          <Modal.Header closeButton>
			            <Modal.Title>다운로드 </Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            {this.state.selText}를 다운로드 하시겠습니까?
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this._modalClose.bind(this)}>닫기</Button>
			            <Button bsStyle="primary" onClick={this._TorrDownload.bind(this)}>다운로드</Button>
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

// 검색어 컴포넌트
class TorrentSearch extends React.Component{

	constructor(props){
		super(props);
	
		this.state={
			'query':'',
			'page':1
		};


	}


	// 버튼 클릭시 부모의 _schConditionUpdate 실행
	handleClick(){

		this.props.onEdit(this.state.query,this.state.page);
	
	}

	// 부모에서 query 받기
	componentWillReceiveProps(nextProps){

		this.setState({
			query:nextProps.query
		})
	}

	// 텍스트박스 입력시 리렌더링
	handleChange(e){

		let nextState={};


		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
		
	}

	// 엔터처리
	_handleKeyPress(e) {
    	if (e.key === 'Enter') 
      		this.props.onEdit(this.state.query,this.state.page);
   
  	}


	render(){
		
		return (

	
			<div className="row">
		<ul className="actions" style={{float:'right'}}>
	

			<li><input type="text" name="query" id="demo-name" value={this.state.query}  onKeyPress={this._handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} placeholder="검색어"/></li>
			<li><a onClick={this.handleClick.bind(this)} className="button icon fa-download">Search</a></li>
		</ul>	
			</div>
	
		)
	}
}

// Pagination 컴포넌트
class TorrentPage extends React.Component{

	constructor(props){
		super(props);
	
		this.state={
			'query':'',
			'page':1
		};


	}


	// 페이지 클릭시 부모의 _schConditionUpdate 실행
	handleClick(){

		this.props.onEdit(this.state.query,this.state.page);
	
	}

	// 부모에서 query&page 받기
	componentWillReceiveProps(nextProps){

		this.setState({
			query:nextProps.query,
			page:nextProps.page
		})
	}
	
	render()
	{
		if ( this.props.page == this.props.curPage)
			return(	
				<li><a onClick={this.handleClick.bind(this)} className="page active">{this.props.page}</a></li>
			)

		else
			return(	
				<li><a onClick={this.handleClick.bind(this)}  className="page">{this.props.page}</a></li>
			)
		
	}
}

// 토렌트 정보 컴포넌트
class TorrentInfo extends React.Component{

	handleClick(text,link){
		this.props.onDownload(text,link)
	}
	render(){
		return(
			<tr>
				<td><a style={{cursor:'pointer'}} onClick={this.handleClick.bind(this,this.props.text,this.props.link)}>{this.props.text}</a></td>
			</tr>
		);
	}
}

export default TorrentList