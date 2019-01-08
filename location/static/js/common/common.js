
function getAjax(url,callback){

	$.ajax({
		url:url,
		type:'GET',
		success:function(data){
			callback(data)


		},
		error: function(xhr,status,error){
			callback(error)
		}

	})


}

function postAjax(url,data,callback){

	$.ajax({
		url:url,
		type:'POST',
		data:data,
		success:function(data){
			callback(data)
		},
		error: function(xhr,status,error){
			callback(error)
		}

	})


}

// type : success,info,warning,danger
function notify(msg,type){
	$.notify({
		// options
		message: msg
	},{
		// settings
		type: type,
		offset: 20,
		newest_on_top: false,
		spacing: 10,
		z_index: 1031,
		delay: 1000,
		timer: 100000,
		url_target: '_blank',
		allow_dismiss: true,
		mouse_over: null,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		}
	
	});
}


function modalOpen(id){
	
	$(id).modal('show')
}

function modalClose(id){
	
	$(id).modal('hide')
}

function customModalOpen(id,opt){
	$(id).modal(opt)
}

function getFormattedNumber(value)
{
    var pattern = /(-?[0-9]+)([0-9]{3})/;
    value = value+'';
    while (pattern.test(value)) {
        value = value.replace(pattern, "$1,$2");
    }
    return value;
}

