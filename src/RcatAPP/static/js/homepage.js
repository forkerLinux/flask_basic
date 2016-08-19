$(function(){
	$('.company_detail_tab span').click(function(){
			if($(this).hasClass('select_tab')){
					return
			}
			$('.select_tab').removeClass('select_tab');
			$(this).addClass('select_tab');
			if($(this).hasClass('detail_tab')){
				$('.recruitment_div').hide();
				$('.company_detail_div').show();
			}else if($(this).hasClass('recrui_tab')){
				$('.recruitment_div').show();
				$('.company_detail_div').hide();
			}

		});

})
	
		function drawJobList(job_list){
			var html = '';
			for(jo in job_list){
				html += '<div class="jobdetail_list"><div class="row job_detail">';

				var job= job_list[jo]
				var salary_str = '面议';
				if(job.salary_str != '面议'){
					salary_str = job.salary_str 
				}
				html += '<div class="col-xs-7 job_zw"><div class="job_name"><p><a href="/job_detail?job_id="'+job.job_id+ '" target="_blank" title="'+job.job_name+'">'+job.job_name+'</a></p></div>';
				html += '<p class="industry_name"><span class="money">'+salary_str+'</span><span>'+job.job_city+'</span>';
				if(job.edu!= ''){
					html +='<span><span class="interval">|</span>'+job.edu+'</span>';
				}
				if(job.job_type!=''){
					var job_type = '不限';
					if(job.job_type == 'fulltime'){
						job_type = '全职'
					}else if(job.job_type == 'parttime'){
						job_type = '兼职'
					}else if(job.job_type == 'intern'){
						job_type = '实习'
					}
					html += '<span class="detail_list"><span class="interval">|</span>'+job_type+'</span>'
				}
				if(job.need_num!=''){
					html +='<span><span class="interval">|</span>'+job.need_num+'人</span></p></div>'
				}
				html+='<div class="col-xs-5 job_zw gs_info"><p class="update_time">'+job.dt_update+'</p></div>'
					html+= '</div></div>'
			}
			

			$('.job_list_body').html(html);
		}