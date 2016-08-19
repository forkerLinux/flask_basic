$(function(){
	$('.job_detail .con br:first').remove();
	$('.outer').on('click', '.job_op .lock_apply_job', function(){
		console.log('lisuai')
		var job_id = $(this).parent().parent().data('rel'); //id
		var obj = $(this);
		var app_text=$(this).text();
		if(app_text == '投递简历' || app_text == '立即申请'){
          	$.ajax({
		        type:'post',
		        url: "/api_post_job",
		        contentType:"application/json; charset=utf-8",
		        dataType: 'json',
		        data: JSON.stringify({'job_id' : job_id}),
		        success: function(msg) {
		        	if(msg.errcode == 0)
		        	{	
		        		// $(this).hide();
		        		// $('.ready_apply_job').show();
		        		obj.html('已申请')
		        		obj.addClass('ready_apply_job');
		        		return false;
		        	}else if(msg.errcode == 2)
		        	{
		        		 alert_r("请先登录","/login");
		        	}
		        	else if(msg.errcode == 3)
		        	{
		        		 alert_r("不能重复申请","");
		        	}
                     else if(msg.errcode == 4)
		        	{
		        		 alert_r("请登录PC端招聘头条完善简历后在进行职位申请","");
		        	}
                     else if (msg.errcode == 5) {
                         alert_r("你已经被管理员禁止投递简历", "");
                     }
		        	else
		        	{
		        		 alert_r("申请失败","");
		        	}
		        }
		   	});
 		} else {
      		return true;
      	}
	});
	//加入收藏
	$('.outer').on('click', '.job_op .lock_like_job', function(){
		console.log('lisuai')
		var job_id = $(this).parent().parent().data('rel'); //id
		console.log($(this).parent())
		console.log(job_id)
		var obj = $(this);
         $.ajax({
		    type:'post',
	        url: "/api_collection_job",
	        contentType:"application/json; charset=utf-8",
	        dataType: 'json',
	        data: JSON.stringify({'job_id' : job_id}),
	        success: function(data) {
	        	console.log(data)
	        	if (data.errcode == 0) {
    				obj.addClass('delete_collect');	
    				console.log(obj.find('img').attr('src'))
    				obj.html('<img src="/static/mobile/images/shoucang2.png">');
    				obj.removeClass('lock_like_job');
	        		return false;
	        	} else if (data.errcode == 2) {
	        		alert_r("请先登录","/login");
	        	} else if (data.errcode == 3) {
	        		alert_r("不能重复收藏","");
	        	} else if (data.errcode == 4) {
	        		// alert_r("请先填写简历","/user_cv");
	        	} else {
	        		alert_r("收藏失败","");
	        	}
	        }
	   })

	});
	// 取消收藏
	$('.outer').on('click', '.job_op .delete_collect', function(){
		var job_id = $(this).parent().parent().data('rel');
		var obj = $(this);
		$.ajax({
			type: "post", 
			url: "api_del_collect_job",
			contentType:"application/json; charset=utf-8",
	        dataType: 'json',
	        data: JSON.stringify({'job_id' : job_id}),
	        success: function(data){
	        	if (data.errcode == 0) {
    				obj.addClass('lock_like_job');
    				obj.html('<img src="/static/mobile/images/shoucang1.png">');
    				obj.removeClass('delete_collect');	
	        	}
	        },
		});
	});

});
function alert_r(msg,url){
    if (url != '') {
        layer.alert(msg,function index(){window.location.href=url})
    } else{
        layer.alert(msg);
    }
}
