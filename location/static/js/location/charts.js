var Categories = {
    PopulationCtgr : ['0-9', '10-19', '20-29', '30-39','40-49', '50-59', '60-69', '70-79', '80-89','90+'],
    BoxCtgr:['타겟군','대조군'],

}

var Charts = {

    addPopulationChart : function(div,data,title,isExport)
    {
        // make data
  
        var rawData =  data[div.split('_')[1]][0]

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

               
                    chartData[0].data[ rawData[i].cust_age_cd ] = rawData[i].cnt*-1


                if ( min >= rawData[i].cnt*-1)
                    min = rawData[i].cnt*-1
            }
            else
            {
              
                    chartData[1].data[ rawData[i].cust_age_cd ] = rawData[i].cnt
                if ( max <= rawData[i].cnt)
                    max = rawData[i].cnt
            }


        }


        if ( min*-1 >= max)
            max = min*-1
        else
            min = max*-1

        var obj={
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
            exporting:{
                enabled:false
            },
            yAxis: {
                title: {
                    text: null
                },
                min:min,
                max:max,
                labels:{enabled:false}
            },
            credits:{enabled:false},         
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
        }
        if(isExport)
        {
            console.log("11")
             obj.exporting= {

               buttons:{
                   contextButton:{
                        menuItems: [{
                            text : 'Export to PNG',
                            onclick: function(){
                               save_chart(this,'chart',div)
                            }}]
                        
                    
                        
                   }
               }
            }
        }


        Highcharts.chart(div,obj);

    },

    addColumnChart: function(div,data,opt)
    {
        var chartData=[{
                name: '타겟군',
                data: [],
                color:'#0b3656'

            }, {
                name: '대조군',
                data: [],
                color:'#fbab1e'
            }
        ]

        if ( opt == "0" || opt =="2")
        {
            var targetData= data[0][0]
            var consData =  data[1][0]
        }
        else
        {
            var targetData= data[1][0]
            var consData =  data[0][0]
        }
            var category = []

            var nms =  div =="wprd_one" ? "fee_prod_nm" : "eqp_als";


            for(var i=0;i<targetData.length;i++){

                category.push(targetData[i][nms])

                if ( opt=="0")
                    chartData[0].data.push(targetData[i].cnt)
                else if ( opt=="1")
                    chartData[1].data.push(targetData[i].cnt)
                else if (opt=="2")
                    chartData[0].data.push(parseFloat(targetData[i].percent))
                else
                    chartData[1].data.push(parseFloat(targetData[i].percent))



                for(var j=0;j<consData.length;j++)
                {
                    if ( targetData[i][nms] == consData[j][nms]){

                        if ( opt=="0")
                            chartData[1].data.push(consData[j].cnt)
                        else if ( opt=="1")
                            chartData[0].data.push(consData[j].cnt)
                        else if ( opt=="2")
                            chartData[1].data.push(parseFloat(consData[j].percent) )
                        else
                            chartData[0].data.push(parseFloat(consData[j].percent) )


                    }
                }

            }


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
               buttons:{
                   contextButton:{
                        menuItems: [{
                            text : 'Export to PNG',
                            onclick: function(){
                               save_chart(this,'chart',div)
                            }}]
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
                        if(opt=="2" || opt=="3")
                        return (this.value).toFixed(2)+"%";
                        return getFormattedNumber(this.value);
                    }
                },

                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormatter:function(){
                    if(opt=="2" || opt=="3")
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+(this.y).toFixed(2)+'%</b><br/>';
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+getFormattedNumber(this.y)+'</b><br/>';
                }
            },
            series: chartData,
            credits: {
                enabled: false
            },
        });


    },

    addBarChart:function(div,data,title,opt){

        var plot_line =[]

        var category = [];
        var chartData=[{
            name: '사용자',
            data: [],
            color:'#7abbbf'
        }]

        var maxCnt=10;
        var filter= div.split('_')[0];

        if ( filter == "tel" || filter=="app1" ||filter=="app2")
        {

            var rawData = data[0]
            var nms = opt == 'lift' ? 'lift' : 'cnt'
            for(var i=0;i<rawData.length;i++)
            {
                if ( i==9)
                    break;

                if ( filter=="app2")
                    category.push(rawData[i].cat1+' > '+rawData[i].cat2)
                else
                    category.push(rawData[i].cat1+' > '+rawData[i].cat2+' > '+rawData[i].cat3)


                if ( rawData[i][nms] == 1e+308)
                {
                    var values=-1
                    for(j=i+1;j<rawData.length;j++)
                    {
                       if ( rawData[j][nms] != 1e+308)
                       {
                           values = rawData[j][nms]* 1.1
                           break;
                       }
                    }

                    if ( values == -1)
                        chartData[0].data.push({'color':'red','y':100})
                   else
                        chartData[0].data.push({'color':'red','y':values})

                }
                else
                    chartData[0].data.push( nms == 'lift' ? parseFloat(rawData[i][nms]*100) : parseInt(rawData[i][nms]))

            }

        }
        else
        {

            var nms =  filter =="wprd" ? "fee_prod_nm" : "eqp_als";
            var rawData =  data[div.split('_')[1]][0]
            for(var i=0;i<rawData.length;i++)
            {
                if ( i==9)
                    break;

                category.push(rawData[i][nms])

                chartData[0].data.push(rawData[i].cnt)
            }

        }

        if ( opt == 'lift')
        {
            chartData[0].name='lift';

            plot_line.push({
                color:"red",
                value:100,
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
                categories: category,
                title: {
                    text: null,

                },
                labels:{
                    formatter:function(){
                     //   var value = this.value.split(" > ");
                      //  if(value.length > 1)
                       // return value[value.length-1];
                        return this.value;
                    }
                },
                gridLineWidth: 0,
                lineWidth: 1,
                tickWidth: 0,

            },
              exporting: {
               buttons:{
                   contextButton:{
                        menuItems: [{
                            text : 'Export to PNG',
                            onclick: function(){
                               save_chart(this,'chart',div)
                            }}]
                   }
               }
            },

              plotOptions  : {
                series: {
                    dataLabels: {
                        enabled: true,
                        color: '#ffffff',
                        style: {fontWeight: 'bolder'},
                        formatter: function() {
                            if ( this.color=="red")
                                return "Infinity"
                        },
                        inside: true,
                    //    rotation: 270
                    },
                    pointPadding: 0.1,
                    groupPadding: 0
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
                            return (this.value).toFixed(0)+"%";
                        return getFormattedNumber(this.value);
                    }
                },
                plotLines: plot_line

            },
            tooltip: {
                pointFormatter:function(){
                    if(opt=="lift")
                        if ( this.color=="red")
                            return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>Infinity</b><br/>';
                        else
                            return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+(this.y).toFixed(2)+'%</b><br/>';
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+getFormattedNumber(this.y)+'</b><br/>';
                }
            },
            credits: {
                enabled: false
            },
            series: chartData
        });


    },

    addBoxPlotChart:function(div,data){


        var targetData= data[0].boxplot[0][0];
        var consData = data[1].boxplot[0][0];

        var chartData=[{
                name: '',
                data: [
                    [targetData.bottom,targetData.lower_quartile,targetData.median,targetData.upper_quartile,targetData.top],
                    [consData.bottom,consData.lower_quartile,consData.median,consData.upper_quartile,consData.top]
                ]
            }]




        var tooltip_format = function(){
            var text = getFormattedNumber(this.high*1000)+"  (최대)<br/>";
            text+= getFormattedNumber(this.q3*1000)+"  (상위25%)<br/>";
            text+= "<b>"+getFormattedNumber(this.median*1000)+"  (중간)</b><br/>";
            text+= getFormattedNumber(this.q1*1000)+"  (하위25%)<br/>";
            text+= getFormattedNumber(this.low*1000)+"  (최소)";
            return text;
        }

        chartData[0].tooltip={"pointFormatter":tooltip_format}


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
               buttons:{
                   contextButton:{
                        menuItems: [{
                            text : 'Export to PNG',
                            onclick: function(){
                               save_chart(this,'chart',div)
                            }}]
                   }
               }
            },


            xAxis: {
                categories: Categories.BoxCtgr,
                title: {
                    text: ''
                }


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
                        return getFormattedNumber(this.value)+',000';
                    }
                },
                gridLineWidth: 0,
                min:0

            },

            series: chartData,


        });



    },

    addAreaChart:function(div,data,opt){

        var chartData=[{
                name: '타겟군',
                color:'#0b3656',
                data: []
            }, {
                name: '대조군',
                data: [],
                color:'#fbab1e'
        }]

        var targetData = data[0].dist[0]
        var consData = data[1].dist[0]

        var category = []
        var nms= opt == 0 ? "percent" : "cnt"


        for(var i=0;i<=200;i++)
        {
            category.push((i*1000).toLocaleString())
            chartData[0].data[i]=0
            chartData[1].data[i]=0

            for(var j=0;j<targetData.length;j++)
            {
                if ( i==targetData[j].bf_m1_arpu )
                {

                    chartData[0].data[i] = nms == "percent" ? parseFloat(parseFloat(targetData[j][nms]).toFixed(2)) : targetData[j][nms]
                    break;
                }
            }

            for(var j=0;j<consData.length;j++)
            {
                if ( i==consData[j].bf_m1_arpu )
                {
                    chartData[1].data[i]= nms == "percent" ? parseFloat(parseFloat(consData[j][nms]).toFixed(2)) : consData[j][nms]
                    break;
                }
            }



        }


        Highcharts.chart(div, {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: ''
            },
            credits:{enabled:false},
             exporting: {
               buttons:{
                   contextButton:{
                        menuItems: [{
                            text : 'Export to PNG',
                            onclick: function(){
                               save_chart(this,'chart',div)
                            }}]
                   }
               }
            },



            xAxis: {
                categories: category,
                gridLineWidth: 0,
                lineWidth: 1,
                tickWidth: 0,
                scrollbar:{enabled:true},

            },
            yAxis: {
                title: { text: '' },
                labels : {
                    formatter:function(){
                        if(opt==0)
                        return this.value+"%";
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
                    if(opt==0)
                    return '<span style="color:'+this.color+'">\u25CF</span> '+this.series.name+': <b>'+parseFloat(this.y).toFixed(2)+'%</b><br/>';
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
            series: chartData
        });
    },

    addMapChart:function(div,data,title){


        var filter = div.split('_')[1];
        var rawData = [];

        var cols=null;
        if (filter == "0" || filter == "1")
            rawData = data[0][0]
        else
            rawData = data[1][0]

        if ( filter =="0" || filter=="2")
            cols='home_cnt';
        else
            cols='work_cnt';


        var chartData=[];
        var min=0;
        var max=0;
        var geo = korea_map;

        for(var i=0;i<rawData.length;i++)
        {
            for(var j=0;j<geo.length;j++)
            {
                if (rawData[i].do_addr== geo[j].name)
                {
                    var cnt = rawData[i][cols] == null ? 0 : rawData[i][cols];

                    chartData.push({'code':geo[j].id,'name':geo[j].name,'value':parseInt(cnt)})
                    break;
                }

            }

        }
        max = chartData[0].value
        min = chartData[ chartData.length-1 ].value

        Highcharts.mapChart(div,{
            title: { text: title },
            credits: { enabled: false },
            chart:{
                marginLeft:-10
            },
            exporting: {

           buttons:{
               contextButton:{
                    menuItems: [{
                        text : 'Export to PNG',
                        onclick: function(){
                           save_chart(this,'chart',div)
                        }}]
               }
           }
        },

            colorAxis: {
                min: min,
                max: max,
                minColor: '#434348',
                maxColor: '#7cb5ec',
                labels: {
                    formatter: function() {
                        if(this.value>=10000000)return parseInt(this.value/10000000)+"천만";
                        if(this.value>=1000000)return parseInt(this.value/1000000)+"백만";
                        if(this.value>=10000)return parseInt(this.value/10000)+"만";
                        if(this.value>=1000)return parseInt(this.value/1000)+"천";

                        return this.value;

                    }
                }
            },
            legend: {
                reversed: true,
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                    title: {
                    },
            },

        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + ' : </b> ' +this.point.value.toLocaleString()+' 명';
            }
        },


            series: [{
                animation: {
                    duration: 1000
                },
                data: chartData,
                mapData: geo,
                joinBy: ['id', 'code'],
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                name: title
            }]
            });
    }
}