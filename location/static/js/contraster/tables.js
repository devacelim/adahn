var Columns = {
    PopulationCols : [
    {'title':"성별","data":"sex"},
    {'title':"연령대","data":"age"},
    {'title':"타겟군","data":"target"},
    {'title':"타켓군 구성비","data":"targetper"},
    {'title':"대조군","data":"cons"},
    {'title':"대조군 구성비","data":"consper"}
    ],
    WprdCols : [
    {'title':"요금제","data":"sex"},
    {'title':"타겟군","data":"age"},
    {'title':"타겟군 구성비","data":"target"},
    {'title':"대조군","data":"cons"},
    {'title':"대조군 구성비","data":"consper"}
    ],
    EqpCols : [
    {'title':"단말기","data":"sex"},
    {'title':"타겟군","data":"target"},
    {'title':"다켓군 구성비","data":"targetper"},
    {'title':"대조군","data":"cons"},
    {'title':"대조군 구성비","data":"consper"}
    ],
    App1Cols : [
    {'title':"앱/웹","data":"sex"},   
    {'title':"타겟군","data":"target"},
    {'title':"다켓군 구성비","data":"targetper"},
    {'title':"타겟군 lift","data":"cons"},
    
    ],
    App2Cols : [
    {'title':"앱/웹 카테고리","data":"sex"},   
    {'title':"타겟군","data":"target"},
    {'title':"다켓군 구성비","data":"targetper"},
    {'title':"타겟군 lift","data":"cons"},
    
    ],
    TelCols : [
    {'title':"통화 카테고리","data":"sex"},   
    {'title':"타겟군","data":"target"},
    {'title':"다켓군 구성비","data":"targetper"},
    {'title':"타겟군 lift","data":"cons"},
    
    ],
    LocCols : [
    {'title':"위치","data":"sex"},   
    {'title':"추정 집","data":"target"},
    {'title':"추정 집 구성비","data":"targetper"},
    {'title':"추정 직장","data":"cons"},
    {'title':"추정 직장 구성비","data":"consper"},
    
    ]
    
}


var Tables = {
    
    addTable : function(div,data)
    {
                
        var tableData=[]
     
        var $table = $('#'+div);
        var columns = ''
        var order=[]
        if ( div =="population_table")
        {
            columns = Columns.PopulationCols
            for(var i=0;i<data[0].length;i++)
            {
                for(var j=0;j<data[1].length;j++){
                    if ( data[1][i].sex_cd == data[1][j].sex_cd && data[0][i].cust_age_cd == data[1][j].cust_age_cd)
                    {  
                        tableData.push({'target':data[0][i].cnt,'targetper':parseFloat(data[0][i].percent).toFixed(2)+'%','cons':data[1][j].cnt,'consper':data[1][j].percent.toFixed(2)+'%','sex': data[0][i].sex_cd =="1" ? "남":"여", 'age': Categories.PopulationCtgr[ data[0][i].cust_age_cd] })                        
                        break;
                    }
                    
                    
                    
                }
                
            }

            
            order=[ 1, "asc" ]
            
        }
        
        else if ( div =="column_wprd_table")
        columns = Columns.WprdCols
        else if ( div =="column_eqp_table")
        columns = Columns.EqpCols
        else if ( div =="app1_table")
        columns = Columns.App1Cols
        else if ( div =="app2_table")
        columns = Columns.App2Cols
        else if ( div =="tel_table")
        columns = Columns.TelCols
        else if ( div =="loc_table")
        columns = Columns.LocCols
        
        
        $table.DataTable( {
            "data":tableData,
            "columns" : columns,
            "paging":false,
            "info":false,
            "searching":false,
            "scrollY": '200px',
            "scrollCollapse": true,
            "order": [order],
            dom: 'Bfrtip',
            buttons: [        
            {
                extend: 'excel',
                text: 'Export Excel'
            }
            ]
            
        })
    }
    
    
    
}

