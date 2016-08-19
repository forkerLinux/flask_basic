var total_page = 0;
var page = 1;
$(function(){
	$('.foot').removeClass('navbar navbar-default navbar-fixed-bottom');
		ajax_table(1);


	var i=0;
	var num =0;

	$(".more").click(function(){
		i=i+180;
		$(this).find("a").css("transform","rotate("+i+"deg)");
		$(".other_type").slideToggle(0,function(){
					if($(".other_type").css("display") == "block"){
		$(".no_set").parents(".list").css("margin-bottom","10px");
		// alert(1)
	}
	else if($(".other_type").css("display") == "none"){
		$(".no_set").parents(".list").css("margin-bottom","30px");
		// alert(2)

	}
		});


	})

	$(".check_trade").click(function(){
		$(".check_trade").parent().css("height","auto");
		$(".check_trade").removeClass("select");
        $(this).parent().siblings().find("ul.hide_ul li").removeClass("select");
        $(this).parents().siblings().find("ul.hide_ul li").removeClass("select");
        $(this).parents(".trade_type").siblings(".other_type").find("ul.hide_ul").hide();
		

		$(".trade_type .no_set").removeClass("select");
				    $(this).parent().siblings().find("ul.hide_ul").hide();
			$(this).parent().find("ul.hide_ul").slideToggle(0,function(){
				if($(this).css("display")=='none'){
		$(".check_trade").parent().css("height","auto");
		$(".check_trade").removeClass("select");
		$(this).parents(".list").css("margin-bottom","30px")
				}
				else{
        $(this).parents().siblings().find("ul.hide_ul").hide();

					var height=$(this).parent().find("ul.hide_ul").height();
		           $(this).parent().css("height",height+40+"px");
		           $(this).parent().find(".check_trade").addClass("select");
		$(this).parents(".list").css("margin-bottom","10px")

				}
			});
	})
		$(".trade_type .no_set").click(function(){
			$("ul.hide_ul").hide();
		$(".check_trade").removeClass("select");
		$(".check_trade").parent().css("height","auto");
		$(".check_trade").parent().find(".hide_ul li").removeClass("select");
		$(this).addClass("select");
		$('.rank_table').html('');
		page = 1;
		ajax_table(1);
		})
		$(".hide_ul li").click(function(){
			$(".hide_ul li").removeClass("select")
			$(this).addClass("select");
		})
		$("#workyear li").click(function(){
			$("#workyear li").removeClass("select")
			$(this).addClass("select");
		})

		$(".check_more span").click(function(){
			page = page + 1;
			ajax_table(page);
		})
		$(".hide_ul li").click(function(){
			$('.rank_table').html('');
			page = 1;
			ajax_table(1)

		})
		$("#workyear li").click(function(){
			var trade=$(".show_w.select").html();
			var work_years=$("#workyear li.select").html();
			$('.rank_table').html('');
			page = 1;
			    ajax_table(1)

		})
		  $("body").on('click', '.zn_name span', function() {
		  	var name=$(this).html();
            window.open('/career_development?search='+encodeURIComponent(name))


		  });

    $('.rank_table').on('mouseover', '.op_jobs', function(){
    	$(this).find('a span').show();
    	$(this).find('a img').hide();
    });
    $('.rank_table').on('mouseout', '.op_jobs', function(){
    	$(this).find('a span').hide();
    	$(this).find('a img').show();
    });

})
function check_more(){
	$(".hide_table").css("height","auto");
	$(".check_more").hide();
}

function ajax_table(page){
	var trade=$(".show_w.select").html();
    //var work_years=$("#workyear li.select").html();
    var work_years= '不限';
	if(trade == undefined){
		layer.alert("请选择行业")
	}else{
		$.ajax({
			type: 'post',
			url: "/api_head_line",
			contentType: "application/json; charset=utf-8",
			dataType: 'json',
			data: JSON.stringify({'trade':trade,'work_years':work_years, 'page':page}),
			success: function(data) {
			    var errcode = data.errcode;
			    var data_arr = data.data;
			    total_page = data_arr.total_page;
			    // alert(total_page);
			    if (errcode == 0) {
				     var table_list2 = table_list(data_arr.data)
	                 $(".rank_table").append(table_list2);
	                 if(total_page <= 1){
	                 	check_more();
	                 	if($(".rank_table li").length == 0){
			            	$(".text_description,.ranking").hide();
			            	$(".no_data").show();
			            }else{
							$(".text_description,.ranking").show();
			            	$(".no_data").hide();
			            }
	                 }else{
	                 	$(".text_description,.ranking").show();
			            $(".no_data").hide();
			            $(".check_more").show();
	                 }
	                 if(page == total_page){
	                 	check_more();
	                 }
	                 var window_left=$('.wrap').height();
				     var left=$('body').height();
				     if(window_left < left ){
				        $(".foot").addClass("navbar navbar-default navbar-fixed-bottom");
				      }
				      else{
				        $(".foot").removeClass("navbar navbar-default navbar-fixed-bottom");
				      }
	                 for (var i=0; i<$(".rank_table li").length; i++){
	                 	$('.rank_table li:eq('+i+') .rank span').html(i+1);
	                 }
			    }

			},
			error: function() {
			    alert('加载失败');
			}
		});
	}
}
function table_list(data){
  var tag_str = '';
  	for(var i=0;i<data.length;i++){
        var datas = data[i].salary_avg;
        tag_str += '<li><p class="col-sm-1 text-center rank"><span>'+(i+1)+'</span></p><p class="col-sm-5 text-center jobname"><a href="/joblist?search='+data[i].job_name+'&search_type=job" title="'+data[i].job_name+'" target="_blank">'+data[i].job_name+'</a></p>';
        tag_str += '<p class="col-sm-2 text-center salary">'+datas+'元/月</p>';
        tag_str += '<p class="col-sm-1 text-center op_jobs job_offer"><a href="/joblist?search='+data[i].job_name+'&search_type=job" title="查看工作机会" target="_blank"><img src="/static/images/major_icon_1.png?v=1" alt=""><span>工作机会</span></a></p>';
        tag_str += '<p class="col-sm-1 text-center op_jobs salary_status"><a href="/search/'+data[i].job_name+'" title="查看工资现状" target="_blank"><img src="/static/images/major_icon_2.png?v=1" alt=""><span>工资现状</span></a></p>';
        tag_str += '<p class="col-sm-1 text-center op_jobs develop"><a href="/career_development?search='+data[i].job_name+'" title="查看职位发展前景" target="_blank"><img src="/static/images/major_icon_3.png?v=1" alt=""><span>发展前景</span></a></p>';
        tag_str += '<p class="col-sm-1 text-center op_jobs course"><a href="javascript:void(0);" title="推荐课程"><img src="/static/images/major_icon_4.png?v=1" alt=""><span>推荐课程</span></a></p>';
  	}

  	return tag_str;
}



