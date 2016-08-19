$(function(){
	// 选择行业
	$('#trade_id').click(function(){
		show_panel('pop_trade');
    	$('.trade span').removeClass('select');
    	var trade = $.trim($(this).val());
    	if (trade != '') {
        	var arr_trade = trade.split('，');
        	$.each(arr_trade, function(k, v){
            	$('.trade span:contains('+v+')').addClass('select');
        	});
    	}
	});
	$('.trade span').click(function(){
	    var trade = $(this).html();
        $('#trade_id').val(trade);
        $('.cancel').click();
	});
	// 选择地区
	$('#address').click(function(){
        show_panel('pop_area');
        var city = $.trim($(this).html());
        if (city == '') {
            create_province('北京');
        } else {
            create_province(city);
            $('.city li:contains('+city+')').addClass('select');
        }        
    });
    $('body').on('click', '.city li', function(){
        var city = $(this).html();
        $('#address').val(city);
        $(this).toggleClass('select');
        $('.cancel').click();
    });
    // 选择薪酬
    $('#salary').click(function(){
    	show_panel('cb_list');
    	var salary = $.trim($(this).val()); 
    	if(salary != ''){
    		$('.cb_list span:contains('+salary+')').addClass('select');
    	}   	    	
    });
    $('.cb_list span').click(function(){
    	var salary = $(this).html();
    	$('#salary').val(salary);
    	$(this).toggleClass('select');
    	$('.black_overlay').hide();
    	$('.cb_list').hide();
    });
    // 保存
    $('#form_button').click(function(){
    	var post_subscribe = check_subscribe();
    	if (!post_subscribe) {return false};

    	$.ajax({
	        type:'post',
	        url: "/api_subscribe",
	        data: JSON.stringify(post_subscribe),
	        contentType:"application/json; charset=utf-8",
	        dataType: 'json',
	        success: function(data){ 
	            var errcode = data['errcode'];
	            if (errcode == 0) {
	                window.location.reload();
	            }
	            if (errcode == 1) {
	                layer.alert('登录超时请重新登录!');
	                location.href = '/logout';
	            }
	            if (errcode == 2) {
	                layer.alert('保存失败!');
	            }
	        },
	        error:function(){   
	            alert('error');   
	        }
	    });
    });

    // 我的订阅
    // 编辑
    $(".edit_info").click(function(){
  		$(".add_subscribe").show();
  		$(".my_subscribe").hide();
	});
	// 清空
	$(".delete_info").click(function(){
   		$(".add_subscribe").show();
  		$(".my_subscribe").hide();
      	$.post('/api_del_subscribe', {'subscribe':1}, function(str){
          	var errcode = str.errcode;
            if(errcode == 0){
				window.location.reload();
            } else if (errcode == 1) {
              layer.alert('登录超时请重新登录！')
                  window.location="/login";
            } else if (errcode == 2) {
            	layer.alert('清空失败！')   
          	}
      	}, "json");
	});

});

function check_subscribe(){
	var job = ChkEmpty('job_name', '请填写职位名称');
	if (!job) {return false};

	var trade = ChkEmpty('trade_id', '请选择行业领域');
	if (!trade) {return false};

	var address = ChkEmpty('address', '请选择工作地点');
	if (!address) {return false};

	var salary = ChkEmpty('salary', '请选择薪资范围');
	if (!salary) {return false};

	return {
		'search': job,
       	'trade': trade,
       	'salary': salary,
       	'address': address
	};
}