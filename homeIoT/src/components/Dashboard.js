import React from 'react';
import ReactHighchart from './ReactHighchart';
import update from 'react-addons-update';
import Guage from 'highcharts/modules/solid-gauge';
import HighchartsMore from 'highcharts/highcharts-more';



class Dashboard extends React.Component {

	constructor(props){
		super(props)

		this.state={
			'room1':{
				'temp':0,
            	'humi':0,
        		'motion':[]
            },
            'room2':{
				'temp':0,
            	'humi':0,
            	'motion':[]
            },
            'room3':{
				'temp':0,
            	'humi':0,
            	'motion':[]
            },
            'isUpdate':false
			
		}


	this.basicOpt={
			chart: {
        		type: 'solidgauge'
        	},
        	title:'',
        	pane: {
        		center: ['45%', '85%'],
        		size: '130%',
        		startAngle: -90,
        		endAngle: 90,
        		background: {

        			innerRadius: '60%',
        			outerRadius: '100%',
        			shape: 'arc'
        		}
        	},
        	tooltip: {
        		enabled: false
        	},
	        credits: {
      		  enabled: false
			    },
	        yAxis: {
	        	stops: [
	                [0.1, '#55BF3B'], // green
	                [0.5, '#DDDF0D'], // yellow
	                [0.9, '#DF5353'] // red
	                ],
	                lineWidth: 0,
	                minorTickInterval: null,
	                tickAmount: 2,


	                labels: {
	                	y: 16
	                },
	                min: 0,
	                max: 50,
	                title: {
	                	y: -70,
	                	text: '온도'
	                }
	        },

            plotOptions: {
            	solidgauge: {
            		dataLabels: {
            			y: 5,
            			borderWidth: 0,
            			useHTML: true
            		}
            	}
            },
            series: [{

            	data: [],
            	dataLabels: {
            		format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            		'<span style="font-size:12px;color:silver">℃</span></div>'
            	}
            	
            }]
	        }


		
	}

	componentDidMount(){
		//addGauage(Highcharts)

	
		this.setState({
			'room1':{
				'temp':20,
				'humi':30,
				'motion':[{'time':''},{'time':''},{'time':''}]
			},
			'room2':{
				'temp':10,
				'humi':20,
				'motion':[{'time':''},{'time':''}]
			},
			'room3':{
				'temp':15,
				'humi':35,
				'motion':[{'time':''},{'time':''}]
			}
		})
		

	}

	_reload(){
  		this.setState({
  			//'spiner':true,
  			'isUpdate':true
  		})
  	}

	componentDidUpdate(prevProps, prevState){

		if(!prevState.isUpdate && this.state.isUpdate )
  		{
	  		let component = this;

	  		this.setState({
			'room1':{
				'temp':10,
				'humi':50,
				'motion':[{'time':''},{'time':''},{'time':''}]
			},
			'room2':{
				'temp':30,
				'humi':40,
				'motion':[{'time':''},{'time':''}]
			},
			'room3':{
				'temp':20,
				'humi':20,
				'motion':[{'time':''},{'time':''}]
			}
		})
		


			// axios.get(this.apiUrl+'torrent/status')
			//   .then(function (response) {

			//     component.setState({
			//     	'data':response.data,
			//     	'spiner':false,
			//     	'isUpdate':false

			//     })

			//   })


			//   .catch(function (error) {
			//     console.log(error);
			//   });
		}

	}



	render() {
		return (
			<div>
			<header id="header">
					<span className="logo"><strong>Dashbord</strong> House Info {'\u00A0'}{'\u00A0'}{'\u00A0'}
				</span>		
				</header>
			</div>
		)
		

		/*
	
	
		let tempOpt1= JSON.parse( JSON.stringify(this.basicOpt));
		let humiOpt1= JSON.parse( JSON.stringify(this.basicOpt));
		let tempOpt2= JSON.parse( JSON.stringify(this.basicOpt));
		let humiOpt2= JSON.parse( JSON.stringify(this.basicOpt));
		let tempOpt3= JSON.parse( JSON.stringify(this.basicOpt));
		let humiOpt3= JSON.parse( JSON.stringify(this.basicOpt));


		tempOpt1.series[0].data=[this.state.room1.temp];

		humiOpt1.yAxis.title.text='습도';
		humiOpt1.yAxis.max=80;
		humiOpt1.series[0].dataLabels.format= '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            		'<span style="font-size:12px;color:silver">%</span></div>'
		humiOpt1.series[0].data=[this.state.room1.humi]

		tempOpt2.series[0].data=[this.state.room2.temp];

		humiOpt2.yAxis.title.text='습도';
		humiOpt2.yAxis.max=80;
		humiOpt2.series[0].dataLabels.format= '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            		'<span style="font-size:12px;color:silver">%</span></div>'
		humiOpt2.series[0].data=[this.state.room2.humi]


		tempOpt3.series[0].data=[this.state.room3.temp];

		humiOpt3.yAxis.title.text='습도';
		humiOpt3.yAxis.max=80;
		humiOpt3.series[0].dataLabels.format= '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            		'<span style="font-size:12px;color:silver">%</span></div>'
		humiOpt3.series[0].data=[this.state.room3.humi]


		


		return (

			<div>
				<header id="header">
					<span className="logo"><strong>Dashbord</strong> House Info {'\u00A0'}{'\u00A0'}{'\u00A0'}
					<a style={{cursor:'pointer'}} onClick={this._reload.bind(this)}>Refresh</a></span>		
				</header>

				<div className="row">
					
				
					<div className="6u 12u$(medium)">
						<h3 style={{textAlign:'center'}}>거실 현황</h3>
					
							<ReactHighchart container='tempChart1' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {tempOpt1}/>
							<ReactHighchart container='humiChart1' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {humiOpt1}/>

						<table className="scroll">
							<thead>
								<tr>
									<th style={{width:'50%'}}>시간</th>
									<th style={{width:'1000px'}}>모션</th>
									
								</tr>
							</thead>
							<tbody >
								{this.state.room1.motion.map((value,i) => {
									return (<MotionInfo time={value.time} key={i}/>)
									}
								)}
								</tbody>
						</table>
	

						
							
					</div>
					<div className="6u 12u$(medium)">
						<h3  style={{textAlign:'center'}}>안방 현황</h3>
						<ReactHighchart container='tempChart2' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {tempOpt2}/>
						<ReactHighchart container='humiChart2' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {humiOpt2}/>

						<table className="scroll">
							<thead>
								<tr>
									<th style={{width:'50%'}}>시간</th>
									<th style={{width:'1000px'}}>모션</th>
									
								</tr>
							</thead>
							<tbody >
								{this.state.room2.motion.map((value,i) => {
									return (<MotionInfo time={value.time} key={i}/>)
									}
								)}
								</tbody>
						</table>
					</div>
					<div className="col-md-6 col-md-offset-3">
						<h3  style={{textAlign:'center'}}>작은방 현황</h3>
						<ReactHighchart container='tempChart3' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {tempOpt3}/>
						<ReactHighchart container='humiChart3' modules={[HighchartsMore,Guage]} clsNm='gaugeChart' options= {humiOpt3}/>

						<table className="scroll">
							<thead>
								<tr>
									<th style={{width:'50%'}}>시간</th>
									<th style={{width:'1000px'}}>모션</th>
									
								</tr>
							</thead>
							<tbody >
								{this.state.room3.motion.map((value,i) => {
									return (<MotionInfo time={value.time} key={i}/>)
									}
								)}
								</tbody>
						</table>
					</div>


				</div>


			</div>
							
								
		);
			*/		
	}

}



// FTP 정보 컴포넌트
class MotionInfo extends React.Component{


  

	render(){
		return(
			<tr>
				<td style={{width:'50%'}}>2017-01-10 11:11:11</td>
				<td style={{width:'1000px'}}>Motion!</td>
				


			</tr>

		);
	}
}



export default Dashboard