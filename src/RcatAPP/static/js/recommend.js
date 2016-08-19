$(function(){
	$.ajax({
		type: 'post',
		url: '/api_query_recommend_job',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({'limit': 5, 'page': 1}),
		success: function(data)
		{
			if (data.errcode == 0) 
			{
				if(data['data']['job_list'].length > 0){
					$('.have_data').show();
					$('.recommend .no_date').hide();
					var elm = create_recommend(data['data']['job_list']);
					$('.recommend_job').html(elm);  
				}else{
					$('.have_data').hide();
					$('.recommend .no_date').show();
				}					  					
			}
			if (data.errcode == 1) 
			{
				$('.have_data').hide();
				$('.recommend .no_date').show();
				$('.recommend .no_date span').html('简历尚未填写，暂无推荐');
			}
			if (data.errcode == 2) 
			{
				$('.have_data').hide();
				$('.recommend .no_date').show();
				$('.recommend .no_date span').html('简历期望值职位未填写，暂无推荐');
			}
		}
	})
});

function create_recommend(datas){
	var tag_str = '';
	if(datas.length > 0){
		for(var i=0; i<datas.length; i++){
			tag_str += '<div class="job_con"><div class="left"><a class="job_name" href="/job_detail?job_id='+datas[i]['id']+'" target="_blank" title="'+datas[i]['job_name']+'">'+datas[i]['job_name']+'</a>'
			tag_str += '<p class="gs_name">'+datas[i]['company_name']+'</p></div><div class="right"><p class="salary">'

			if(datas[i]['salary_str'] !="面议"){
              tag_str += datas[i]['salary_str']+'</p>'
            }else{
              tag_str += '面议</p>'
            }

            tag_str += '<p class="city">'+datas[i]['job_city']+'</p></div></div>'
		}
	}
	return tag_str;
}