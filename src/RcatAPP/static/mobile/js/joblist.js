$(function(){
	// 切换职位专业
	$('.search_menu li').click(function(){
		var index = $(this).index();
		if(index == 0){
			search_type_name = 'major'
			window.location.href = '/joblist';
		}else{
			search_type_name = 'job'
			window.location.href = '/joblist?search_type=job';
		}
	});
	// 点击"全网搜索"
	$(".btn_search").click(function(){
		var search = $.trim($('#search').val());
		if (search != '') {
			jump_to();
		} else {
			show_notice();
		}		
	});

	// 点击职位比薪 
	$('#compare').click(function(){
		var search = $.trim($('#search').val());
		if (search != '') {
			var jump_str = '/search/'+encodeURIComponent(search);
			window.location=jump_str;
		} else {
			show_notice();
		}				
	});
	$(".choose div").click(function(){
		var search = $.trim($('#search').val());
		if (search == '') {
			show_notice();
		}
		else{
			var html=$(this).children('.choose_con');
			var v=$(this).index();

	        $(this).children('.choose_con').toggleClass('action');
	        $(this).children('.down_icon').toggleClass('roll_up');
	        $(this).siblings().children('.choose_con').removeClass('action');
	        $(this).siblings().children('.down_icon').removeClass('roll_up');
	        $('.show_more_2').hide();
			$('.show_industry').hide();
	        if(v != 3){
	        	$(".show_list:nth-child("+(v+1)+")").toggle('fast', function(){
	        		if($(this).css('display') == 'none'){
						$('.job_list').show();
					}else{
						$('.job_list').hide();
					}
	        	});
				// $('.condition_list').toggle();
				// $(".show_list:nth-child("+(v+1)+")").toggle();
	        	$(".show_list:not(:nth-child("+(v+1)+"))").hide();
	        	$('.show_more').hide();
		        $(".show_list:nth-child("+(v+1)+")").find("li").click(function(){
		         	var li = $(this).find("a").html();
		            $(this).addClass("select_choose");
		            $(this).siblings().removeClass("select_choose");
		            html.html(li)
		         	$(".show_list:nth-child("+(v+1)+")").hide();
		         	jump_to();
		        })
		        
	        }else{
	        	$(".show_more").toggle('fast', function(){
	        		if($(this).css('display') == 'none'){
						$('.job_list').show();
						$('.more_condition').children('.choose_con').removeClass('action');
	        			$('.more_condition').children('.down_icon').removeClass('roll_up');
					}else{
						$('.job_list').hide();
						$('.more_condition').children('.choose_con').addClass('action');
	        			$('.more_condition').children('.down_icon').addClass('roll_up');
					}
	        	});
	        	// $(".show_more").toggle();
	         	$(".show_list").hide();
	         }
        }

	})

	// $(".black_overlay").click(function(){
	// 	$(".show_list").hide();
 //        $(".choose div").children('.choose_con').removeClass('action');
 //        $(".choose div").children('.down_icon').removeClass('roll_up');
 //        $(this).hide();
 //        $('.show_more').hide();
	// 	$('.show_more_2').hide();
	// })

	$('.show_more_2').on('click', '.right_list li', function(){
		var rel = $(this).parent().parent().data('rel');
		if(rel == 0){
			salary_name = $(this).html(); 
		}
		if(rel == 2){
			scale_name = $(this).html();
		}
		if(rel ==3){
			company_type_name = $(this).html();
		}
		jump_to();
	});
	$('.show_industry').on('click', '.right_list li', function(){
		industry_name = $(this).html();
		jump_to();
	});

})

function show_notice(){
	layer.alert('请先输入关键词！', {
		'title': '提示',
		'yes': function(e){
			layer.close(e);
			$('#search').focus();
		}
	});
	return false;	
}

function jump_to(){
	var search = $.trim($("#search").val());
	var address =$.trim($('.job_area .choose_con').html());
	var job_type =$.trim($('.job_type .choose_con').html());
	var edu = $.trim($('.education .choose_con').html());
	if(address == "工作地点"){
		address == '不限'
	}
	if(job_type == '工作性质'){
		job_type = '不限'
	}
	if(edu == "教育经历"){
		edu = '不限'
	}

	var jump_str = '/joblist?search='+encodeURIComponent(search)+'&search_type='+encodeURIComponent(search_type_name)+'&address='+encodeURIComponent(address)+'&industry='+encodeURIComponent(industry_name)+'&industry_top='+encodeURIComponent(industry_top_name)+'&scale='+encodeURIComponent(scale_name)+'&company_type='+encodeURIComponent(company_type_name)+'&salary='+encodeURIComponent(salary_name)+'&job_type='+encodeURIComponent(job_type)+'&edu='+encodeURIComponent(edu);
	
	window.location=jump_str;	
}

function get_more_data(datas){
	if (datas.length > 0) {
        var tag_str = '';
        for (var i = 0; i < datas.length; i++) {
            tag_str +='<div class="jobdetail_list" id="job_'+datas[i]['id']+'"><div class="row job_detail"><div class="col-xs-8 job_zw"><div class="job_name"><p><a href="/job_detail?job_id='+datas[i]['id']+'" title="'+datas[i]['job_name']+'">'+datas[i]['job_name']+'</a></p></div>'
            tag_str +='<p class="company_name">'+datas[i]['company_name']+'</p>' 
          
            tag_str +='  <p class="industry_name"><span>'+datas[i]['job_city']+'</span>'

           	if(datas[i]['education_str'] !=""){
            	tag_str +=' <span><span class="interval"> </span>'+datas[i]['education_str']+'</span>'
          	}
			if(datas[i]['job_type'] !=""){
                if(datas[i]['job_type'] == 'fulltime'){
                    tag_str +=' <span><span class="interval"> </span>全职</span>'
                }
                if(datas[i]['job_type'] == 'parttime'){
                    tag_str +=' <span><span class="interval"> </span>兼职</span>'
                }
                if(datas[i]['job_type'] == 'intern'){
                    tag_str +=' <span><span class="interval"> </span>实习</span>'
                }
                if(datas[i]['job_type'] == 'unclear'){
                    tag_str +=' <span><span class="interval"> </span>不限</span>'
                }
            }

           	tag_str += '</div>'
           	if(datas[i]['salary_str'] !="面议"){
           		tag_str += '<div class="col-xs-4 job_zw"><p class="time">'+datas[i]['dt_update']+'</p><p class="money">'+datas[i]['salary_str']+'</p>'
           	}else{
           		tag_str += '<div class="col-xs-4 job_zw"><p class="time">'+datas[i]['dt_update']+'</p><p class="money">面议</p>'
           	}
          
           	tag_str += '</div></div></div>'
     	} 
        return tag_str;
    }
}

