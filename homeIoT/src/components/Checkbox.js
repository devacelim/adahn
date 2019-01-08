import React from 'react';


class Checkbox extends React.Component{

	constructor(props){
		super(props);
 	
 		this.state ={
 			'isChecked':this.props.dftValue
 		}

 	//	this.props.handleCheckboxChange(this.props.label)
	}



	toggleCheckbox(){


		this.setState({
			isChecked:!this.state.isChecked
		})

		this.props.handleCheckboxChange(this.props.label)
	}

	componentWillReceiveProps(nextProps)
	{

		if(nextProps.dftValue !=this.state.isChecked)
		{
			 this.setState({
				isChecked:nextProps.dftValue
			})


			this.props.handleCheckboxChange(this.props.label)
		}
	}


	render(){

		return(

			<input type="checkbox" 
                        value={this.props.label} 
                        checked={this.state.isChecked} 
                        onChange={this.toggleCheckbox.bind(this)} />
       
    
      )
	}

}

export default Checkbox