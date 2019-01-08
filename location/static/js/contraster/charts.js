var Categories = {
    PopulationCtgr : ['0-9', '10-19', '20-29', '30-39','40-49', '50-59', '60-69', '70-79', '80-89','90+'],
    BoxCtgr:['타겟군','대조군'],
    
}


var Charts = {
    
    addPopulationChart : function(div,data,title)
    {
        // make data

        var rawData =  data[div.split('_')[1]]
        var chartData = [{
            name: '남자',
            data: [0,0,0,0,0,0,0,0,0],
            color:'#7abbbf'
        }, {
            name: '여자',
            data: [0,0,0,0,0,0,0,0,0],
            color:'#eb5a49'
            
        }]

        var min=0;
        var max=0;
        for(var i=0;i<rawData.length;i++)
        {
            if ( rawData[i].sex_cd == "1")
            {

                // if ( rawData[i].cust_age_cd >=9  )
                //     chartData[0].data[8] += rawData[i].cnt*-1
                // else    
                    chartData[0].data[ rawData[i].cust_age_cd ] = rawData[i].cnt*-1


                if ( min >= rawData[i].cnt*-1) 
                    min = rawData[i].cnt*-1
            }
            else
            {
                // if ( rawData[i].cust_age_cd >=9  )
                //     chartData[1].data[8] += rawData[i].cnt*-1
                // else
                    chartData[1].data[ rawData[i].cust_age_cd ] = rawData[i].cnt
                if ( max <= rawData[i].cnt)
                    max = rawData[i].cnt
            }


        }


        if ( min*-1 >= max)
            max = min*-1
        else
            min = max*-1




        Highcharts.chart(div, {
            chart: {
                type: 'bar',
            },
            title: {
                text: title
            },
            xAxis: [{
                categories: Categories.PopulationCtgr,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { 
                opposite: true,
                reversed: false,
                categories: Categories.PopulationCtgr,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                min:min,
                max:max,        
                labels:{enabled:false}
            },            
            credits:{enabled:false},
            exporting: {
                type:'image/jpeg',
                // buttons: {
                    
                //     contextButton: {
                //         // menuItems:null,
                //         // onclick:function(){
                //         //     this.exportChart();
                //         // }
                //         menuItems: [{
                //             text: 'Export to PNG',
                //             onclick: function () {
                //                 this.exportChart();
                //             },
                //             separator: false
                //         }]
                //     }
                // },
                 fallbackToExportServer: false,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },         
            tooltip: {
                formatter: function () {
                    return '<b>' +this.point.category +' / '  + this.series.name + ' : '+  Math.abs(this.point.y).toLocaleString() +'명';
                }
            },       
            series: chartData
        });
        
    },
    
    addColumnChart: function(div,data,category,opt)
    {
        Highcharts.chart(div, {
            chart: {
                type: 'column',
                
            },
            title: {
                text: ''
            },
            
            xAxis: {
                categories: category                
            },
            exporting: {
                fallbackToExportServer:false,
                buttons: {
                    
                    contextButton: {
                        menuItems: [{
                            text: 'Export to PNG',
                            onclick: function () {
                                this.exportChart();
                            },
                            separator: false
                        }]
                    }
                }
            },
            yAxis: {
                gridLineWidth:0,
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }],
                labels : {
                    formatter:function(){
                        if(opt=='1')
                        return (this.value*100).toFixed(2)+"%";
                        return getFormattedNumber(this.value);
                    }
                },
                
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormatter:function(){
                    if(opt=='1')
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+(this.y*100).toFixed(2)+'%</b><br/>';
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+getFormattedNumber(this.y)+'</b><br/>';
                }
            },
            series: data,
            credits: {
                enabled: false
            },
        });
        
        
    },
    
    addBarChart:function(div,data,categories,title,opt){
        
        var plot_line =[]
        if ( opt == 'lift')
        {
            plot_line.push({
                color:"red",
                value:1,
                width:2,
                zIndex: 5
            });
        }
        
        Highcharts.chart(div, {
            chart: {
                type: 'bar'
            },
            title: {
                text: title
            },
            legend: {enabled: false},
            xAxis: {
                categories: categories,
                title: {
                    text: null,
                    
                },
                labels:{
                    formatter:function(){
                        var value = this.value.split(" > ");
                        if(value.length > 1)
                        return value[value.length-1];
                        return this.value;
                    }
                },
                gridLineWidth: 0,
                lineWidth: 1,
                tickWidth: 0,
                
            },
            exporting: {
                fallbackToExportServer:false,
                buttons: {
                    
                    contextButton: {
                        menuItems: [{
                            text: 'Export to PNG',
                            onclick: function () {
                                this.exportChart();
                            },
                            separator: false
                        }]
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                },
                gridLineWidth: 0,
                labels : {
                    formatter:function(){
                        if(opt == "lift")
                        return (this.value*100).toFixed(0)+"%";
                        return getFormattedNumber(this.value);
                    }
                },
                plotLines: plot_line
                
            },
            tooltip: {
                pointFormatter:function(){
                    if(opt=="lift")
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+(this.y*100).toFixed(2)+'%</b><br/>';
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+getFormattedNumber(this.y)+'</b><br/>';
                }
            },
            credits: {
                enabled: false
            },
            series: data
        });
        
        
    },
    
    addBoxPlotChart:function(div,data){
        
        var tooltip_format = function(){
            var text = getFormattedNumber(this.high)+"  (최대)<br/>";
            text+= getFormattedNumber(this.q3)+"  (상위25%)<br/>";
            text+= "<b>"+getFormattedNumber(this.median)+"  (중간)</b><br/>";
            text+= getFormattedNumber(this.q1)+"  (하위25%)<br/>";
            text+= getFormattedNumber(this.low)+"  (최소)";
            return text;
        }
        
        data[0].tooltip={"pointFormatter":tooltip_format}
        
        
        Highcharts.chart(div, {
            
            chart: {
                type: 'boxplot'
            },
            
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            exporting: {
                fallbackToExportServer:false,
                buttons: {
                    
                    contextButton: {
                        menuItems: [{
                            text: 'Export to PNG',
                            onclick: function () {
                                this.exportChart();
                            },
                            separator: false
                        }]
                    }
                }
            },
            xAxis: {
                categories: Categories.BoxCtgr,
                title: {
                    text: ''
                },
                
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels:{
                    formatter:function(){
                        return getFormattedNumber(this.value);
                    }
                },
                gridLineWidth: 0,
                
            },
            
            series: data,
            
            
        });
        
        
        
    },
    
    addAreaChart:function(div,data,categories,opt){
        var min=0
        var max=100
        if ( opt ==1)
        {
            
        }
        Highcharts.chart(div, {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: ''
            },
            credits:{enabled:false},
            
            xAxis: {
                categories: categories,
                gridLineWidth: 0,
                lineWidth: 1,
                tickWidth: 0,
                scrollbar:{enabled:true},
                //  min:min,
                //  max:max
                
            },
            yAxis: {
                title: { text: '' },
                labels : {
                    formatter:function(){
                        if(opt==0)
                        return (this.value*100)+"%";
                        return getFormattedNumber(this.value);
                    }
                },
                gridLineWidth: 0,
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
                
            },
            tooltip: {
                pointFormatter:function(){
                    if(opt==1)
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+(this.y*100).toFixed(2)+'%</b><br/>';
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+getFormattedNumber(this.y)+'</b><br/>';
                }
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                },
                series:{
                    marker:{
                        enabled:false
                    }
                }
            },
            series: data
        });
    }
    
    
    
    
}