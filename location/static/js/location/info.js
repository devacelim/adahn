var info_width = $('.info_area').width()-25;


var level1_data = [
    {"bu_type":"AAA","imp":"BBB"},
    {"bu_type":"BBB","imp":"BBB"},
    {"bu_type":"CCC","imp":"BBB"}
]
var level2_chart_data= [
    [
        [{"sex_cd": "1", "cnt": 2, "percent": "10.53", "cust_age_cd": 0}, {"sex_cd": "1", "cnt": 3, "percent": "15.79", "cust_age_cd": 1}, {"sex_cd": "1", "cnt": 1, "percent": "5.26", "cust_age_cd": 2}, {"sex_cd": "1", "cnt": 2, "percent": "10.53", "cust_age_cd": 3}, {"sex_cd": "1", "cnt": 3, "percent": "15.79", "cust_age_cd": 4}, {"sex_cd": "2", "cnt": 2, "percent": "10.53", "cust_age_cd": 2}, {"sex_cd": "2", "cnt": 1, "percent": "5.26", "cust_age_cd": 3}, {"sex_cd": "2", "cnt": 2, "percent": "10.53", "cust_age_cd": 5}, {"sex_cd": "2", "cnt": 1, "percent": "5.26", "cust_age_cd": 6}]], [[{"sex_cd": "1", "cnt": 247684, "percent": 0.944, "cust_age_cd": 0}, {"sex_cd": "1", "cnt": 1143388, "percent": 4.3578, "cust_age_cd": 1}, {"sex_cd": "1", "cnt": 1763880, "percent": 6.7227, "cust_age_cd": 2}, {"sex_cd": "1", "cnt": 2460687, "percent": 9.3785, "cust_age_cd": 3}, {"sex_cd": "1", "cnt": 2832173, "percent": 10.7943, "cust_age_cd": 4}, {"sex_cd": "1", "cnt": 2396584, "percent": 9.1341, "cust_age_cd": 5}, {"sex_cd": "1", "cnt": 1438081, "percent": 5.481, "cust_age_cd": 6}, {"sex_cd": "1", "cnt": 620560, "percent": 2.3651, "cust_age_cd": 7}, {"sex_cd": "1", "cnt": 142652, "percent": 0.5437, "cust_age_cd": 8}, {"sex_cd": "1", "cnt": 8878, "percent": 0.0338, "cust_age_cd": 9}, {"sex_cd": "2", "cnt": 266582, "percent": 1.016, "cust_age_cd": 0}, {"sex_cd": "2", "cnt": 1076077, "percent": 4.1013, "cust_age_cd": 1}, {"sex_cd": "2", "cnt": 1527907, "percent": 5.8233, "cust_age_cd": 2}, {"sex_cd": "2", "cnt": 2115090, "percent": 8.0613, "cust_age_cd": 3}, {"sex_cd": "2", "cnt": 2358364, "percent": 8.9885, "cust_age_cd": 4}, {"sex_cd": "2", "cnt": 2092944, "percent": 7.9769, "cust_age_cd": 5}, {"sex_cd": "2", "cnt": 1233441, "percent": 4.701, "cust_age_cd": 6}, {"sex_cd": "2", "cnt": 607693, "percent": 2.3161, "cust_age_cd": 7}, {"sex_cd": "2", "cnt": 205265, "percent": 0.7823, "cust_age_cd": 8}, {"sex_cd": "2", "cnt": 16253, "percent": 0.0619, "cust_age_cd": 9}]]]
$(document).ready(function(){


   
   $('#level1_left').css('display','none');

    // level1 ajax call
    var level1_1_tbody = $('#level1_1');
    for(var i=0;i<level1_data.length;i++)
        level1_1_tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
    
    var level1_2_tbody = $('#level1_2');
    for(var i=0;i<level1_data.length;i++)
        level1_2_tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
    
    $('#btn_1').click()
    $('#btn_1').addClass('active');


     autosize()

    $('.info_context').css('display','block')

  
    
})


 $(window).resize(function(){
        autosize()
 })


function autosize(){
    var win_height = $(window).height();
    
    info_width = $('.info_area').width()-25;

    $('.inner_two').css('width',info_width*2);
    $('.inner_one').css('width',info_width);
    $('.inner_table').css('width',info_width*0.9);

    
    $('#level2').css('height',win_height-490)

}
var moveChart = false

function swingChart(direction,div,depth){


    if ( moveChart==false && depth!=1)
    {
        moveChart=true
        var mov=0;
        var org = $('#'+div).scrollLeft();

        var inner_width=info_width;
        var margin_left=5;

        var max= inner_width*depth;

      
        if ( direction == -1)
        {
            var page = parseInt((org+inner_width)/inner_width)-1
            inner_width*=-1
          
            if ( page == depth-1)
            {
                mov = inner_width+org-margin_left
                
                 $('#level1_right').css('display','block');
                    $('#level1_left').css('display','none');
            }
            else
                mov = inner_width+org

        }
        else
        {
           
            var page = ((org+inner_width)/inner_width)+1
           
          
            if ( page == depth  )
            {
                mov = inner_width+org+margin_left
                $('#level1_right').css('display','none');
                   $('#level1_left').css('display','block');
            }
            else
            {
                
                mov = inner_width+org
               
            }

            
            

        }
  
        $('#'+div).stop().animate({scrollLeft:mov},'500','swing',function(){

            moveChart=false



        })
    }

}


function lev2_active(idx)
{
    var lev2_div = $('#level2')
    lev2_div.empty();
    $('#btn_1').removeClass('active')

    lev2_div.append('<h4><span class="glyphicon glyphicon-user"></span> 인구 통계학적 분포</h4>\
                        <div id="popmain_0" class="charts"></div>')

    Charts.addPopulationChart('popmain_0',level2_chart_data,'',false)

    if (idx ==1)
    {

        lev2_div.append('<h4><span class="glyphicon glyphicon-pushpin"></span> 주간 상주 지역(TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_1_1">   \
                                </tbody>\
                            </table>\
                        </div>')
        lev2_div.append('<h4><span class="glyphicon glyphicon-flag"></span> 주요 방문 업종(Tmap 목적지 기준 TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_1_2">   \
                                </tbody>\
                            </table>\
                        </div>')


        var tbody = $('#level2_1_1');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_1_2');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')

    }
    else if (idx == 2)
    {
        lev2_div.append('<h4><span class="glyphicon glyphicon-home"></span> 거주 지역(TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_2_1">   \
                                </tbody>\
                            </table>\
                        </div>')
        lev2_div.append('<h4><span class="glyphicon glyphicon-flag"></span> 주요 방문 업종(Tmap 목적지 기준 TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_2_2">   \
                                </tbody>\
                            </table>\
                        </div>')


        var tbody = $('#level2_2_1');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_2_2');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')

    }
    else
    {
        
        lev2_div.append('<h4><span class="glyphicon glyphicon-home"></span> 거주 지역(TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_3_1">   \
                                </tbody>\
                            </table>\
                        </div>')
        lev2_div.append('<h4><span class="glyphicon glyphicon-pushpin"></span> 주간 상주 지역(TOP3)</h4>\
                <div class="inner_table" > \
                    <table class="table table-striped">\
                        <thead> \
                            <tr>   \
                                <th>지역</th> \
                                <th>비율</th>\
                            </tr> \
                        </thead> \
                        <tbody id="level2_3_2">   \
                        </tbody>\
                    </table>\
                </div>')

        lev2_div.append('<h4><span class="glyphicon glyphicon-flag"></span> 주요 방문 업종(Tmap 목적지 기준 TOP3)</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_3_3">   \
                                </tbody>\
                            </table>\
                        </div>')

        lev2_div.append('<h4><span class="glyphicon glyphicon-time"></span> 시간대별 방문 회선수</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_3_4">   \
                                </tbody>\
                            </table>\
                        </div>')
        lev2_div.append('<h4><span class="glyphicon glyphicon-calendar"></span> 월별 방문 회선수</h4>\
                        <div class="inner_table" > \
                            <table class="table table-striped">\
                                <thead> \
                                    <tr>   \
                                        <th>지역</th> \
                                        <th>비율</th>\
                                    </tr> \
                                </thead> \
                                <tbody id="level2_3_5">   \
                                </tbody>\
                            </table>\
                        </div>')


        var tbody = $('#level2_3_1');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_3_2');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_3_3');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_3_4');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
        tbody = $('#level2_3_5');
        for(var i=0;i<level1_data.length;i++)
            tbody.append('<tr> <th scope="row">'+level1_data[i].bu_type+'</th> <td>'+level1_data[i].imp+'</td></tr>')
    }

      autosize()

}


function save_chart(chart, filename,div) {
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

        var obj={}
        obj.filter=div;
        obj.type='chart';
        // postAjax('api/reqdown',obj,function(ret){
        // })
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