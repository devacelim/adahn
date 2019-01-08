import React from 'react';
import Highcharts from 'highcharts';


class ReactHighChart extends React.Component
{

    componentDidMount()
    {
         if (this.props.modules) {
            this.props.modules.forEach(function (module) {

                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container, 
            this.props.options
        );

    }
       
       componentWillReceiveProps(props) {
         this.chart.series[0].setData(props.options.series[0].data)
        }

    
    //Destroy chart before unmount.
    componentWillUnmount(){
        this.chart.destroy();
    }

    //Create the div which the chart will be rendered to.
    render(){
        return React.createElement('div', { id: this.props.container ,className:this.props.clsNm});
    }
    

}


export default ReactHighChart