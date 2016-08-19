$(function(){
	
	

	$(".more").hover(function(){
		$(this).next("ul").show();
		$(this).parent("li").css("backgroundColor", '#fff');
		$(this).find(".color").css("transform","rotate(180deg)");
	}, function(){

	});

	$(".condition").hover(function(){
  
	}, function(){
		$(this).find(".hide_ul").hide();
		$(this).css("backgroundColor", '#fff');
  		$(this).find(".color").css("transform","rotate(360deg)");
  		// $('.hide_ul .hide_industry li a').removeClass('select')
	});

	// 其他条件筛选
	$('.dropdown').click(function(){
		var search = $.trim($('#search').val());
		if (search == '') {
			layer.alert('请先输入关键词！', {
				'title': '提示',
				'yes': function(e){
					layer.close(e);
					$('#search').focus();
				}
			});
			return false;
		}		
	});

	$('.dropdown .dropdown-menu a').click(function(){
		var select_item = $(this).html();
		$(this).parent().parent().siblings().children('span:first').html(select_item);

		jump_to();			
	});

	// 点击收起或展开筛选项
	$('.lock_roll').click(function(){
		var rel = $(this).attr('rel');
		$(this).removeClass('show');
		$(this).siblings().addClass('show');
		if (rel == 0) {
			$('.brief').addClass('show');
			$('.detail').removeClass('show');
		} else {
			$('.brief').removeClass('show');
			$('.detail').addClass('show');
		}
	});

	// 点击隐藏地区后显示情况
	var obj_area = $('.job_area .list a');
	var arr_area = [];
	for(var i = 0; i < obj_area.length; i++){
		var con = obj_area[i].innerHTML;
		arr_area[i] = con;
	}
	if ($.inArray(job_area, arr_area) == -1) {
		$('.job_area .list').append('<a class="select" href="javascript:void(0);">'+job_area+'</a>');
	}
	// 点击隐藏行业后所处行业显示情况
	var obj = $('.industry .list a');
	var arr_trade = [];
	for(var i = 0; i < obj.length; i++){
		var con = obj[i].innerHTML;
		arr_trade[i] = con;
	}
	if ($.inArray(job_trade_top, arr_trade) == -1) {
		$('.industry .level_ul').append('<li><a class="select" href="javascript:void(0);">'+job_trade_top+'</a></li>');
		var str = $('.hide_industry .level_ul2  a.select').eq(0).next().html();
		str = '<ul class="hide_ul_level2" style="display: block;">'+str +'</ul>';
		$('.industry .level_ul a.select').parent('li').append(str);
	}

	// 点击职位或公司显示情况
	if (search_type == 'major') {	
		$('.major_search').show();
		$('.job_search').hide();
	}

    // 公司+职位
    if (search_type == 'job') {
		$('.major_search').hide();
		$('.job_search').show();
    }
initElem();
$('.major').click(function(){
      $('.major_search').show();
      $('.job_search').hide();
      $('.major_search #search').val('');
      search_type = 'major';     
    });
    $('.jobs').click(function(){
      $('.major_search').hide();
      $('.job_search').show();
      $('.job_search #search').val('');
      search_type = 'job';       
    });
	// 点击"全网搜索"
	$(".major_search #global, .job_search #global").click(function(){
		search_con = $.trim($(this).parent().siblings('div').children('input').val());
		if (search_con != '') {
			jump_to();
		} else {
			show_notice();
		}		
	});

	// 筛选
	$(".condition .list a").click(function(){	
		var item = $(this).parent().parent().attr('data-item');
		var select=$(this).attr("class");
		if (item == 'industry') {
			job_trade_top = $(this).html();
		} else if(item == 'area') {
			job_area = $(this).html();
		}	
		if(select == 'select'){
			return false;
		}
		if (search_con != '') {
			if(item == 'industry'){
				$(this).parents('ul.level_ul').children('li').find('.hide_ul_level2').hide();
				$('.hide_ul').hide();
				$('.hide_ul .select').removeClass('select');
				$(this).next().show();
				$(this).parents('ul.level_ul').children('li').find('a').removeClass('select');
				$(this).addClass("select");
				if(job_trade_top == '不限'){
					job_trade = '不限';
					jump_to();
					$(this).parents('li.industry').height('40px');
				}else{
					 var height = $('.industry a.select').next().outerHeight()+40;
	 				$('.industry ').height(height+'px');
				}
				
			
			}else{
				$(this).addClass("select");
				$(this).siblings().removeClass("select");
				jump_to();
			}
	
		} else {
			show_notice();
		}		
	});
	// 筛选
		$(".condition .show_w ").click(function(){	
			job_trade_top = $(this).parent().prev().html();
			job_trade = $(this).find('a').html();

		if (search_con != '') {
				jump_to();

		} else {
			show_notice();
		}		
	});


	$(".condition .hide_ul a").click(function(){
		var item = $(this).parent().parent().attr('data-item');
		var select=$(this).attr("class");

		if (item == 'hide_industry') {
			job_trade = $(this).html();
		} else {
			job_area = $(this).html();
		}
		if(select == 'select'){
			return false;
		}
		if (search_con != '') {
			if(item == 'hide_industry'){
				$(this).parents('ul.level_ul2').children('li').find('a').removeClass('select');
				$(this).addClass("select");
				$(this).parents('ul.level_ul2').children('li').find('.hide_ul2_level2').hide()
				$(this).next().show();
				if(job_trade == '不限'){
				}else{
					var h = $('.level_ul2').outerHeight() ; 
					 var height = $('.hide_industry a.select').next().outerHeight()+ h+10;
	 				$('.hide_ul ').height(height+'px');
					$(this).next().css('top','60px');
				}

			}else{
				jump_to();	
			}
			
		} else {
			show_notice();
		}
	});
})

function initElem(){

	if(job_trade_top !='不限'){
			$('.industry .level_ul a.select').next().show();
			var height = $('.industry a.select').next().outerHeight()+$('.industry ').height();
			$('.industry ').height(height+'px');
	}

}
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
	var search = search_con;
	var address = job_area;
	
	var scale = $('.company_scale .list a.select').html();
	var company_type = $('.company_nature .list a.select').html();
	var salary = $(".salary .dropdown-toggle span:first").html();
	var job_type = $(".work_year .dropdown-toggle span:first").html();
	var edu = $(".education .dropdown-toggle span:first").html();
	var boon = $(".welfare_project .dropdown-toggle span:first").html();
	//行业一级
	var  industry_top = job_trade_top;
	//行业二级
	var industry = job_trade;

	var jump_str = '/joblist?search='+encodeURIComponent(search)+'&address='+encodeURIComponent(address)+'&industry='+encodeURIComponent(industry)+'&industry_top='+encodeURIComponent(industry_top)+'&scale='+encodeURIComponent(scale)+'&company_type='+encodeURIComponent(company_type)+'&salary='+encodeURIComponent(salary)+'&job_type='+encodeURIComponent(job_type)+'&edu='+encodeURIComponent(edu)+'&boon='+encodeURIComponent(boon);
	



	if (search_type == 'job') {
		jump_str += '&search_type=job';
	} else if (search_type == 'major') {
		jump_str += '&search_type=major';
	}
	window.location=jump_str;	
}

