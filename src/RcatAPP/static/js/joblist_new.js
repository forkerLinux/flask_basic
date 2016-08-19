var f_show = false;
$(function(){
	$(".job_enter").on('click', '.lock_now_apply', function(){
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
		        {
		        	if(msg.errcode == 0)
		        	{
		        		obj.html('已申请');
		        		obj.parent().attr('title', '已申请');
		        		obj.addClass('gray');
		        		return false;
		        	}
		        	else if(msg.errcode == 2)
		        	{
		        		 alert_r("请先登录","");
		        	}
		        	else if(msg.errcode == 3)
		        	{
		        		alert_r("不能重复申请","");
		        	}
                     else if(msg.errcode == 4)
		        	{
		        		alert_r("请先完善简历80%","/user_cv");
		        	}
                     else if(msg.errcode == 5)
                     {
                         alert_r("你已经被管理员禁止投递简历", "");
                     }
		        	else
		        	{
		        		alert_r("申请失败","");
		        	}
		        },
		        error: function(){
		        	alert('error');
		        }
		   })
 }else if(app_text == '已申请'){
 	layer.alert('该职位已申请');
 	return false;
 }
	})

	//感兴趣
	$("body").on('click','.add_collect',function(){
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
	// 取消收藏
	$('body').on('click', '.delete_collect', function(){
		var job_id = $(this).parent().data('rel');
		var obj = $(this);
		$.ajax({
			type: "post", 
			url: "/api_del_collect_job",
			contentType:"application/json; charset=utf-8",
	        dataType: 'json',
	        data: JSON.stringify({'job_id' : job_id}),
	        success: function(data){
	        	if (data.errcode == 0) {
        			obj.hide();
    				obj.siblings('.add_collect').show();
	        	}else if(data.errcode == 1)
                { 
		        	alert_r("请先登录","/login");
                }else if(data.errcode == 2)
                {
                    alert_r("删除失败", '')
                }
	        },
		});
	});

})
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
