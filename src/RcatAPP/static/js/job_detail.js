$(function(){
	var width = $('.recommend').outerWidth();
	$('.recommend').css('width', width+'px');
	$('.inner_con').css('width', width+5+'px');
	$('.recommend .title, .job_con').css('width', width-30+'px');

	$(".job_op .lock_apply_job").click(function(){
		 var job_id = $(this).parent().attr('rel'); //id
		 var obj = $(this);
		  var app_text=$(this).text();
		 if(app_text=='立即申请'){
          $.ajax({
		        type:'post',
		        url: "/api_post_job",
		        contentType:"application/json; charset=utf-8",
		        dataType: 'json',
		        data: JSON.stringify({'job_id' : job_id}),
		        success: function(msg)
		        {console.log(msg)
		        	if(msg.errcode == 0)
		        	{	
		        		obj.html('已申请');
		        		obj.attr('title', '已申请');
		        		obj.addClass('gray');	
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
		        		 alert_r("您的简历完整度不足80%无法申请职位","/user_cv");
		        	}
                     else if (msg.errcode == 5) {
                         alert_r("你已经被管理员禁止投递简历", "");
                     }
		        	else
		        	{
		        		 alert_r("申请失败","");
		        	}
		        },
		        error: function(){
		        	// alert('error');
		        	console.log('申请失败')
		        }
		   })
 }else if(app_text == '已申请'){
 	layer.alert('该职位已申请');
 	return false;
 }
      else{
      	return true;
      }
	})

	//感兴趣
	$(".job_op .lock_collect").click(function(){
		 var job_id = $(this).parent().data('rel'); //id
		 var obj = $(this);
          $.ajax({
		        type:'post',
		        url: "/api_collection_job",
		        contentType:"application/json; charset=utf-8",
		        dataType: 'json',
		        data: JSON.stringify({'job_id' : job_id}),
		        success: function(msg)
		        {
		        	if(msg.errcode == 0)
		        	{
		        		obj.hide();
		        		obj.next('.delete_collect').show();
		        		return false;
		        	}else if(msg.errcode == 2)
		        	{
		        		alert_r("请先登录","/login");

		        	}else if(msg.errcode == 3)
		        	{
		        		alert_r("不能重复收藏","");
		        	}
					else if(msg.errcode == 4)
		        	{
		        		alert_r("请先填写简历","/user_cv");
		        	}
		        	else
		        	{
		        		alert_r("收藏失败","");
		        	}
		        }
		   })

	});

	$('.delete_collect').click(function(){
		var job_id = $(this).parent().data('rel');
		var obj = $(this);
		$.ajax({
			type: "post", 
			url: "api_del_collect_job",
			contentType:"application/json; charset=utf-8",
	        dataType: 'json',
	        data: JSON.stringify({'job_id' : job_id}),
	        success: function(data){
	        	if (data.errcode == 0) {
        			obj.hide();
    				obj.prev('.lock_collect').show();
	        	}
	        },
		});
	});

});
function alert_r(msg,url)
{
    if(url != '')
    {
        layer.alert(msg,function index(){window.location.href=url})
    }
    else{
        layer.alert(msg);
    }
}
