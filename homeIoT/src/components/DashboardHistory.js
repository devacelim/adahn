import React from 'react';
import update from 'react-addons-update';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import ReactHighchart from './ReactHighchart';
import {ANCHOR_RIGHT} from 'react-dates/constants';

import 'react-dates/lib/css/_datepicker.css';

class DashboardHistory extends React.Component {

	constructor(props){
		super(props);
		
		this.state={
			'daily':{
					
			},
			'weekly':{
				
			},
			'monthly':{
				
			},
			d_date:moment(),
			ws_date:moment(),
			ms_date:moment(),

			d_focused:false,
			w_focused:false,
			m_focused:false,

			we_date:moment().subtract(7,'days'),
			me_date:moment().subtract(30,'days'),
			isUpdate:true
			
		}

		this.basicOpt= {
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: 'Monthly Average Temperature'
	        },
	        subtitle: {
	            text: 'Source: WorldClimate.com'
	        },
	        xAxis: {
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            }
	        },
	        credits: {
      		  enabled: false
			},
	        plotOptions: {
	            line: {
	                dataLabels: {
	                    enabled: true
	                },
	                enableMouseTracking: false
	            }
	        },
	        series: [{
	            name: 'Tokyo',
	            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	        }, {
	            name: 'London',
	            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	        }]
  	    }



	}
		
	_reload(){
  		this.setState({
  			//'spiner':true,
  			'isUpdate':true
  		})
  	}


	render(){



		return(

			<div>
				<header id="header">
					<span className="logo"><strong>Dashbord</strong> History {'\u00A0'}{'\u00A0'}{'\u00A0'}
					<a style={{cursor:'pointer'}} onClick={this._reload.bind(this)}>Refresh</a></span>		
				</header>

				<div className="row">
					<div  style={{float:'right'}}>
							<SingleDatePicker
								  id="ds_input"
								 
								  date={this.state.d_date}
								  focused={this.state.d_focused}
								  onDateChange={(date) => {this.setState({d_date:date}); }}
								  onFocusChange={({ focused }) => {this.setState({d_focused:focused});  }}
								  isOutsideRange={() => { false }}
								  displayFormat='YYYY-MM-DD'
								  numberOfMonths={1}
								  showClearDate={true}
								  reopenPickerOnClearDate={true}
								  monthFormat='YYYY MM월'/>
					</div>
				</div>

				<div className="row">
					
				
					<div className="6u 12u$(medium)">

						<h3>일별 온도 현황</h3>
						
						<ReactHighchart container='tempHisChart1' clsNm='tempHis' options= {this.basicOpt}/>

						

					</div>

					<div className="6u 12u$(medium)">
						<h3>일별 습도 현황</h3>

						<ReactHighchart container='humiHisChart1' clsNm='tempHis' options= {this.basicOpt}/>

					</div>
				</div>


				<div className="row">

					<div  style={{float:'right'}}>
						<SingleDatePicker
								  id="ws_input"
								  date={this.state.ws_date}
								  focused={this.state.w_focused}
								  onDateChange={(date) => { this.setState({ws_date:date,we_date:moment(date).subtract(7,'days')}); }}
								  onFocusChange={({ focused }) => {this.setState({w_focused:focused});  }}
								  isOutsideRange={() => { false }}
								  displayFormat='YYYY-MM-DD'
								  numberOfMonths={1}
								  showClearDate={true}
								  reopenPickerOnClearDate={true}
								  monthFormat='YYYY MM월'/>~
							<SingleDatePicker
								  id="wd_input"
								  date={this.state.we_date}
								  disabled={true}
								  displayFormat='YYYY-MM-DD'/>
					</div>
				</div>

				<div className="row">

					<div className="6u 12u$(medium)">
						<h3>주별 온도 현황</h3>

						
					</div>

					<div className="6u 12u$(medium)">
						<h3>주별 습도 현황</h3>
					</div>
				</div>

				<div className="row">
					<div  style={{float:'right'}}>

						<SingleDatePicker
								  id="ms_input"
								  date={this.state.ms_date}
								  focused={this.state.m_focused}
								  onDateChange={(date) => {this.setState({ms_date:date,me_date:moment(date).subtract(30,'days')}); }}
								  onFocusChange={({ focused }) => {this.setState({m_focused:focused});  }}
								  isOutsideRange={() => { false }}
								  displayFormat='YYYY-MM-DD'
								  numberOfMonths={1}
								  showClearDate={true}
								  reopenPickerOnClearDate={true}
								  monthFormat='YYYY MM월'/>~
							<SingleDatePicker
								  id="wd_input"
								  date={this.state.me_date}
								  disabled={true}
								  displayFormat='YYYY-MM-DD'/>

					</div>
				</div>
				<div className="row">

					<div className="6u 12u$(medium)">
						<h3>월별 온도 현황</h3>
						
					</div>

					<div className="6u 12u$(medium)">
						<h3>월별 습도 현황</h3>
					</div>
				</div>

				
			</div>


			)
		

	}
}


export default DashboardHistory;