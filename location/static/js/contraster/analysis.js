
var chartHeight=390;
var SelectCharts = [
// {"type":"population","title":"인구통계학적 분포 비교","desc":"법인 등 특수 회선을 제외한 연령, 성별대별 분포를 비교합니다."},
// {"type":"column_wprd","title":"요금제 분포 비교","desc":"타겟군과 대조군의 요금제 분포를 비교합니다."},
// {"type":"column_eqp","title":"단말기 분포 비교","desc":"타겟군과 대조군의 단말기 분포를 비교합니다."},
// {"type":"arpu","title":"ARPU 분포 비교","desc":"직전 월 기준의 APRU 분포를 비교합니다."},
// {"type":"app1","title":"사용 앱/웹 비교","desc":"타겟군이 유의미하게 많이 사용하는 앱/웹 사용 횟수와 사용 회선수를 나타냅니다."},
// {"type":"app2","title":"사용 앱/웹 카테고리 비교","desc":"타겟군이 유의미하게 많이 사용하는 앱/웹 카테고리와 사용 회선수를 나타냅니다."},
// {"type":"tel","title":"통화 카테고리 비교","desc":"타겟군이 유의미하게 많이 통화하는 카테고리와 사용 회선수를 나타냅니다."},
// {"type":"loc","title":"위치/이동 특성 비교","desc":"타겟군에 대하여 추정된 집과 직장의 주소 분포를 나타냅니다."},
]


function analysisStart(id, elem,objs)
{
    var elem = $(elem);
    if ( elem.hasClass('disabled') ) {
        return false;
    }
    var opt = new Object();

    opt.backdrop='static';
    opt.keyboard=false;

    SelectCharts =objs
    customModalOpen(id,opt)
}


 var sel_blk=false
$(document).ready(function()
{
    
    // empty charts
    $('#analysisModal').on('hide.bs.modal', function(e) {
        
        $('#charts').empty();
        $('#scroller').empty();
    })
    
    // loc table redraw()
    $('#analysisModal').on('shown.bs.modal', function(e) {
        $('#loc_table').DataTable().columns.adjust().draw();

        var modal_pos = $('#analysisModal .modal-body').offset();

       
        $('#scroller').css('left',modal_pos.left+10);
        $('#scroller').css('display','block');
    })
    
       
    // draw charts
	$('#analysisModal').on('show.bs.modal', function(e) {
         
		var $modal = $(this);
        var ChartsObj = Object.create(Charts);
        var TablesObj = Object.create(Tables);
        
        var $div = $('#charts');
        var $scroller = $('#scroller');
        
        
        $div.css('height',SelectCharts.length*chartHeight)
        
     
        
        for(var i=0; i< SelectCharts.length;i++)
        {
              
            if ( i==0)
            $scroller.append("<span onclick=\"clk_blk('"+SelectCharts[i].filter+"',"+i+")\" data-tooltip-text=\""+SelectCharts[i].title+"\">&#9670;<br>")   
            else
            $scroller.append("<span onclick=\"clk_blk('"+SelectCharts[i].filter+"',"+i+")\" data-tooltip-text=\""+SelectCharts[i].title+"\">&#9671;<br>")   
            
            
            if (SelectCharts[i].filter=="population")
            {
             
                
                // DIV 생성
                var chartdiv = $('<div id="'+SelectCharts[i].filter+'" class="chartDiv">')
                var inner_two = $('<div class="inner_two">')
                var inner_one = $('<div class="inner_one">')
                for(j=0;j<2;j++)
                {   
                    var chartId = SelectCharts[i].filter+'_'+j
                    inner_one.append('<div id="'+chartId+'" class="divided_two_chart"></div>')           
                }
                inner_two.append(inner_one)
                
                inner_two.append('<table id="'+SelectCharts[i].filter+'_table'+'" class="display" cellspacing="0" style="width:100%">')
                
                chartdiv.append(inner_two)
                
                $div.append('<h4><b>'+SelectCharts[i].title+'</b></h4>')
                $div.append('<h6>'+SelectCharts[i].desc+'</h6>')
                $div.append('<div class="handle-left fa fa-arrow-circle-left" onclick="swingChart(\'-1\',\''+SelectCharts[i].filter+'\',2)">')
                $div.append('<div class="handle-right fa fa-arrow-circle-right" onclick="swingChart(\'1\',\''+SelectCharts[i].filter+'\',2)">')
                
                $div.append(chartdiv)
                $div.append('<hr>')
                
                // Chart & Table 생성
                for(j=0;j<2;j++)
                {
                    var title='';
                    if ( j==0)
                    title = SelectCharts[i].title+'(타겟군)';
                    else
                    title = SelectCharts[i].title+'(대조군)';
                    
                    var chartId = SelectCharts[i].filter+'_'+j
                    
                    ChartsObj.addPopulationChart(chartId,SelectCharts[i].data,title)
                }
                

                TablesObj.addTable(SelectCharts[i].filter+'_table',SelectCharts[i].data)
                
                
                
                
                
                
                
            } // end population
            else if (SelectCharts[i].filter=="column_wprd" || SelectCharts[i].filter=="column_eqp")
            {
                // DIV 생성
                var chartdiv = $('<div id="'+SelectCharts[i].filter+'" class="chartDiv">')
                var inner_three = $('<div class="inner_three">')
                var inner_one = $('<div class="inner_one">')
                
                var onechartId = SelectCharts[i].filter+'_one'
                
                var radio = $('<div class="form-group graph_radio">\
                <div class="col-md-4"> \
                <label class="radio-inline" for="radios-0">\
                <input type="radio" name="radios_'+SelectCharts[i].filter+'"  value="1" checked="checked">\
                타켓군 기준\
                </label> \
                <label class="radio-inline" for="radios-1">\
                <input type="radio" name="radios_'+SelectCharts[i].filter+'" value="2">\
                대조군 기준\
                </label>\
                <label class="radio-inline" for="radios-2">\
                <input type="radio" name="radios_'+SelectCharts[i].filter+'"  value="3">\
                타겟군 기준(구성비)\
                </label> \
                <label class="radio-inline" for="radios-3">\
                <input type="radio" name="radios_'+SelectCharts[i].filter+'"  value="4">\
                대조군 기준(구성비)\
                </label>\
                </div>\</div>');
                
                inner_one.append(radio)
                inner_one.append('<div id="'+onechartId+'" class="one_chart"></div>')     
                
                inner_three.append(inner_one)
                
                var inner_one_1 = $('<div class="inner_one">')
                
                
                for(j=0;j<2;j++)
                {   
                    var chartId = SelectCharts[i].filter+'_'+j
                    inner_one_1.append('<div id="'+chartId+'" class="divided_two_chart"></div>')           
                }
                inner_three.append(inner_one_1)
                
                inner_three.append('<table id="'+SelectCharts[i].filter+'_table'+'" class="display three_dept_table" cellspacing="0" style="width:100%">')
                
                chartdiv.append(inner_three)
                
                $div.append('<h4><b>'+SelectCharts[i].title+'</b></h4>')
                $div.append('<h6>'+SelectCharts[i].desc+'</h6>')
                $div.append('<div class="handle-left fa fa-arrow-circle-left" onclick="swingChart(\'-1\',\''+SelectCharts[i].filter+'\',3)">')
                $div.append('<div class="handle-right fa fa-arrow-circle-right" onclick="swingChart(\'1\',\''+SelectCharts[i].filter+'\',3)">')
                
                $div.append(chartdiv)
                $div.append('<hr>')
                
                
                ChartsObj.addColumnChart(onechartId,imsidata,imsicate,'0')
                for(j=0;j<2;j++)
                {
                    var title='';
                    if ( j==0)
                    title = SelectCharts[i].title+'(A)';
                    else
                    title = SelectCharts[i].title+'(B)';
                    
                    var chartId = SelectCharts[i].filter+'_'+j
                    
                    ChartsObj.addBarChart(chartId,bardata,barcategories,'','')
                }
                
                TablesObj.addTable(SelectCharts[i].filter+'_table',tabledata)
                
                
                
                
                
            } //end column_wprd
            else if ( SelectCharts[i].filter=="arpu"){
                
                // DIV 생성
                var chartdiv = $('<div id="'+SelectCharts[i].filter+'" class="chartDiv">')
                var inner_two = $('<div class="inner_two">')
                var inner_one = $('<div class="inner_one">')
                for(j=0;j<2;j++)
                {   
                    var chartId = SelectCharts[i].filter+'_'+j
                    inner_one.append('<div id="'+chartId+'" class="divided_two_chart"></div>')           
                }
                inner_two.append(inner_one)
                
                var onechartId=SelectCharts[i].filter+'_2';
                inner_two.append('<div id="'+onechartId+'" class="one_chart">')
                
                chartdiv.append(inner_two)
                
                $div.append('<h4><b>'+SelectCharts[i].title+'</b></h4>')
                $div.append('<h6>'+SelectCharts[i].desc+'</h6>')
                $div.append('<div class="handle-left fa fa-arrow-circle-left" onclick="swingChart(\'-1\',\''+SelectCharts[i].filter+'\',2)">')
                $div.append('<div class="handle-right fa fa-arrow-circle-right" onclick="swingChart(\'1\',\''+SelectCharts[i].filter+'\',2)">')
                
                $div.append(chartdiv)
                $div.append('<hr>')
                
                // Chart & Table 생성
                for(j=0;j<2;j++)
                {
                    
                    var chartId = SelectCharts[i].filter+'_'+j
                    
                    if ( j ==0 )
                    ChartsObj.addBoxPlotChart(chartId,boxdata)
                    else
                    ChartsObj.addAreaChart(chartId,areadata,areacate,0)
                }
                
                ChartsObj.addAreaChart(onechartId,areadata,areacate,1)
                //TablesObj.addPopulationTable(SelectCharts[i].filter+'_table',tabledata)
                
                
                
            }// end arpu
            
            else if ( SelectCharts[i].filter=="app1" ||SelectCharts[i].filter=="app2" ||  SelectCharts[i].filter=="tel"){
                
                // DIV 생성
                var chartdiv = $('<div id="'+SelectCharts[i].filter+'" class="chartDiv">')
                var inner_two = $('<div class="inner_two">')
                var inner_one = $('<div class="inner_one">')
                for(j=0;j<2;j++)
                {   
                    var chartId = SelectCharts[i].filter+'_'+j
                    inner_one.append('<div id="'+chartId+'" class="divided_two_chart"></div>')           
                }
                inner_two.append(inner_one)
                
                inner_two.append('<table id="'+SelectCharts[i].filter+'_table'+'" class="display" cellspacing="0" style="width:100%">')
                
                chartdiv.append(inner_two)
                
                $div.append('<h4><b>'+SelectCharts[i].title+'</b></h4>')
                $div.append('<h6>'+SelectCharts[i].desc+'</h6>')
                $div.append('<div class="handle-left fa fa-arrow-circle-left" onclick="swingChart(\'-1\',\''+SelectCharts[i].filter+'\',2)">')
                $div.append('<div class="handle-right fa fa-arrow-circle-right" onclick="swingChart(\'1\',\''+SelectCharts[i].filter+'\',2)">')
                
                $div.append(chartdiv)
                $div.append('<hr>')
                
                // Chart & Table 생성
                for(j=0;j<2;j++)
                {
                    var title='';
                    var opt='';
                    
                    if ( SelectCharts[i].filter=="app1" )
                    {
                        if ( j==0)
                        {
                            title = '연관 높은 앱/웹';
                            opt='lift';
                        }
                        else
                        title = '사용 회선수'
                        
                    }
                    else if ( SelectCharts[i].filter=="app2")
                    {
                        if ( j==0)
                        {
                            title = '연관 높은 카테고리'
                            opt='lift';
                        }
                        else
                        title = '사용 회선수'
                    }
                    else{
                        if ( j==0)
                        {
                            opt='lift';
                            title = '연관 높은 카테고리';
                        }
                        else
                        title = '사용 회선수'
                    }
                    
                    
                    
                    var chartId = SelectCharts[i].filter+'_'+j
                    
                    ChartsObj.addBarChart(chartId,bardata,barcategories,title,opt)
                }
                
                TablesObj.addTable(SelectCharts[i].filter+'_table',tabledata)
                
                
                
                
                
            } // end app,tel
            else if ( SelectCharts[i].filter=="loc"){
                // DIV 생성
                var chartdiv = $('<div id="'+SelectCharts[i].filter+'" class="chartDiv">')
                
                var inner_one = $('<div class="inner_one">')
                inner_one.append('<table id="'+SelectCharts[i].filter+'_table'+'" class="display" cellspacing="0" style="width:100%">')           
                
                
                chartdiv.append(inner_one)
                
                $div.append('<h4><b>'+SelectCharts[i].title+'</b></h4>')
                $div.append('<h6>'+SelectCharts[i].desc+'</h6>')
                $div.append('<div class="handle-left fa fa-arrow-circle-left" onclick="swingChart(\'-1\',\''+SelectCharts[i].filter+'\',1)">')
                $div.append('<div class="handle-right fa fa-arrow-circle-right" onclick="swingChart(\'1\',\''+SelectCharts[i].filter+'\',1)">')
                
                $div.append(chartdiv)
                $div.append('<hr>')
                
                TablesObj.addTable(SelectCharts[i].filter+'_table',tabledata)
                
                
            }
            
            
            
            
        }// end charts
        
        
        
        $('input[type=radio][name=radios_column_wprd]').on('change',function(){
            var chkval = $(this).val(); 
            var charts = $('#column_wprd').highcharts()
            if ( chkval == 1)
            {
                
                ChartsObj.addColumnChart('column_wprd_one',imsidata,imsicate,'0')
                
                
            }
            else if ( chkval == 2)
            {
                
                ChartsObj.addColumnChart('column_wprd_one',imsidata1,imsicate,'0')
                
                
            }
            else if ( chkval == 3)
            {
                ChartsObj.addColumnChart('column_wprd_one',imsidata,imsicate,'1')
                
            }
            else if ( chkval == 4)
            {
                ChartsObj.addColumnChart('column_wprd_one',imsidata1,imsicate,'1') 
            }
        })
        
        $('input[type=radio][name=radios_column_eqp]').on('change',function(){
            var chkval = $(this).val(); 
            var charts = $('#column_eqp').highcharts()
            if ( chkval == 1)
            {
                
                ChartsObj.addColumnChart('column_eqp_one',imsidata,imsicate,'0')
                
                
            }
            else if ( chkval == 2)
            {
                
                ChartsObj.addColumnChart('column_eqp_one',imsidata1,imsicate,'0')
                
                
            }
            else if ( chkval == 3)
            {
                ChartsObj.addColumnChart('column_eqp_one',imsidata,imsicate,'1')
                
            }
            else if ( chkval == 4)
            {
                ChartsObj.addColumnChart('column_eqp_one',imsidata1,imsicate,'1') 
            }
        })
        
        
        
        
        
        
	}) // end show.bs.modal
    

    
    
    // scroll event


 $('#save_btn').click(function() {
        save_chart($('#population_0').highcharts(), 'chart');
    });

   
    $('#analysisModal').scroll(function(){
        
        
        if ( !sel_blk )
        {
   
            var div = $('#analysisModal')
            
            
            var idx = parseInt(div.scrollTop() / chartHeight)
            

            if ( div[0].scrollHeight - div.scrollTop() == div.outerHeight() ) 
            {
            
                idx+=1
            }
            
            for(var j=0;j<=SelectCharts.length;j++)
            {
                
                if (idx+1 ==j  )
                $('#scroller > span:nth-child('+(j)+')').html('&#9670;<br>');
                else
                $('#scroller > span:nth-child('+(j)+')').html('&#9671;<br>');
                            
            }
            
        }

        
        
    })
    
    
    
})// end document 

var moveChart = false

function swingChart(direction,div,depth){
    
    if ( moveChart==false && depth!=1)
    {
        moveChart=true
        var mov=0;
        var org = $('#'+div).scrollLeft();     
        
        var inner_width=1200;
        var object_width=1140;
        var margin_left=60;
        

        
        if ( direction == '-1')
        {
            inner_width*=-1
            if ((org+inner_width*2) >= object_width*depth*-1 )         
            mov = org+inner_width-margin_left
            else
            mov = org+inner_width
        }
        else
        {
            if ((org+inner_width*2) >= object_width*depth )         
            mov = org+inner_width+margin_left
            else
            mov = org+inner_width
        }
        
        
        $('#'+div+'_table').DataTable().columns.adjust().draw();
        
        
        
        $('#'+div).stop().animate({scrollLeft:mov},'500','swing',function(){
            
            moveChart=false
            
            
            
        })
    }
    
}


function clk_blk(type,i){
    
    for(var j=0;j<=SelectCharts.length;j++)
    {
        
        if (i+1==j  )
        $('#scroller > span:nth-child('+(j)+')').html('&#9670;<br>');
        else
        $('#scroller > span:nth-child('+(j)+')').html('&#9671;<br>');
        
        
    }
    var mov = chartHeight*i

    sel_blk=true
    $('#analysisModal').stop().animate({scrollTop:mov},'500','swing',function(){
        sel_blk=false
        
    })
    
    
}



function save_chart(chart, filename) {
    var render_width = 800;
    var render_height = render_width * chart.chartHeight / chart.chartWidth

    var svg = chart.getSVG({
        exporting: {
            sourceWidth: chart.chartWidth,
            sourceHeight: chart.chartHeight
        }
    });

    var canvas = document.createElement('canvas');
    canvas.height = render_height;
    canvas.width = render_width;

    var image = new Image;
    image.onload = function() {
        canvas.getContext('2d').drawImage(this, 0, 0, render_width, render_height);
        var data = canvas.toDataURL("image/png")
        download(data, filename + '.png');
    };
    image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

function download(data, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = data
    document.body.appendChild(a);
    a.click();
    a.remove();
}

