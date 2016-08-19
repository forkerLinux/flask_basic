

$(function(){
  var url = window.location.href;
              var query= url.indexOf('target');
              if(query > -1){
              var arr_url = url.split('=');
              var target = arr_url[1];
  }
  // var is_first = $.cookie('first_login');
  // if (is_first) {
  //   $('.black_overlay').hide();
  //   $("body").css("overflow","auto")
  //   if(target == 'fenwei'){
  //     $('html,body').animate({ scrollTop:1177});
  //   }
  //   else if(target == 'top'){
  //     $('html,body').animate({ scrollTop:2511});
  //   }
  //   else if(target == 'zoushi'){
  //     $('html,body').animate({ scrollTop:2053});
  //   }
  //   else if(target == 'nianxian'){
  //     $('html,body').animate({ scrollTop:700});
  //   }
  // }
  // else{
  //   $.cookie('first_login', 1, {expires: 366});
  //   $('.black_overlay').show();
  //   $("body").css("overflow","hidden");  
  // }
  $(".other_close img").hover(function(){
    $(this).attr("src","/static/images/close_hover.png")
  },function(){
    $(this).attr("src","/static/images/index_close.png")
  })
  $(".next_one,.other_close img").click(function(){
    $(".guid").hide();
    $("body").css("overflow","auto");
    if(target == 'fenwei'){
      $('html,body').animate({ scrollTop:1177});
    }
    else if(target == 'top'){
      $('html,body').animate({ scrollTop:2511});
    }
    else if(target == 'zoushi'){
      $('html,body').animate({ scrollTop:2053});
    }
    else if(target == 'nianxian'){
      $('html,body').animate({ scrollTop:700});
    }
})



		$("span a,strong a").hover(
				function(){
						$(this).css("text-decoration","none");
				},function(){
						$(this).css("text-decoration","none");
				}
			)
    $(".bnt_select ul li a").click(function(){    
    var a=$(this).html();
    $(this).parent().parent().parent().find("p").find(".show_list").html(a);
  })
// 市场分位图--所属行业

$("#trade_s ul li a").click(function(){    
    var infos = get_salary('trade_s');
          $.ajax({
                type:'post',
                url: "/api_query_tantile",
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({'search':infos.search,'industry':infos.industry}),

                success: function(data)
                { 
                  var errcode = data.errcode;
                  if(errcode == 0){
                      var data=data['data'];
                      industry_tantile=data;
                      bar_salary('main',data ,'transverse','#6ffe97',0,{'unit':'元','name':'薪资'});
                  }
                },
                error:function(){   
                  alert('error');   
                }

               });
})

// 市场分位图--工作年限
$("#work_s ul li a").click(function(){    
     var infos = get_salary('work_s');
          $.ajax({
                type:'post',
                url: "/api_query_tantile",
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({'search':infos.search,'exp':infos.industry}),
                success: function(data)
                { 
                  var errcode = data.errcode;
                  if(errcode == 0){
                      var data=data['data'];
                      exp_tantile=data;
                      bar_salary('work_year',data ,'portrait','#ff8c73',0,{'unit':'元','name':'薪资'});
                  }
                },
                error:function(){   
                  alert('error');   
                }
               });
})
// 市场分位图--教育经历
$("#edu_s ul li a").click(function(){    
     var infos = get_salary('edu_s');
          $.ajax({
                type:'post',
                url: "/api_query_tantile",
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({'search':infos.search,'edu':infos.industry}),

                success: function(data)
                { 
                  var errcode = data.errcode;
                  if(errcode == 0){
                      var data=data['data'];
                      edu_tantile=data;
                      bar_salary('edu_jl',data ,'transverse','#6ffe97',0,{'unit':'元','name':'薪资'});
                  }
                },
                error:function(){   
                  alert('error');   
                }

               });
})

// 市场分位图--企业规模
$("#scale_s ul li a").click(function(){    
     var infos = get_salary('scale_s');
          $.ajax({
                type:'post',
                url: "/api_query_tantile",
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({'search':infos.search,'scale':infos.industry}),

                success: function(data)
                { 
                  var errcode = data.errcode;
                  if(errcode == 0){
                      var data=data['data'];
                      scale_tantile=data;
                      bar_salary('company_size',data ,'portrait','#ff8c73',0,{'unit':'元','name':'薪资'});
                  }
                },
                error:function(){   
                  alert('error');   
                }

               });
})






 // 职位高薪公司排行榜
$("#company_s ul li a").click(function(){    
      var infos = get_salary('company_s');
    $.ajax({
          type:'post',
          url: "/api_query_company",
          contentType:"application/json; charset=utf-8",
          dataType: 'json',
          data: JSON.stringify({'search':infos.search,'industry':infos.industry}),
          success: function(data)
          { 
            var errcode = data.errcode;
            if(errcode == 0){
                var data=data['data'];
                bar_salary('main_2',data, 'transverse','#6ffe97',30,{'unit':'元','name':'薪资'});
            }
          },
          error:function(){   
            alert('error');   
          }

    });
})

// 右侧导航
var  search=$.trim($("#search").val());
$(".go_next p:first-child").click(function(){
position(0,".go_next p:first-child");
})
$(".go_next p:nth-child(2)").click(function(){
position(1239,".go_next p:first-child");
})
$(".go_next p:nth-child(3)").click(function(){
position(1867,".go_next p:first-child");
})
$(".go_next p:last-child").click(function(){
position(2358,".go_next p:first-child");
})
 $(window).scroll(function(){
        x=$(window).scrollTop();
       if(x>=0&& x<559){
          $(".go_next p:first-child").addClass("go_show");
          $(".go_next p:first-child").siblings("p").removeClass("go_show");
       }
       else if( x>559 && x<1386){
         $(".go_next p:nth-child(2)").addClass("go_show");
         $(".go_next p:nth-child(2)").siblings("p").removeClass("go_show");
       }
       else if( x>1386 && x<2054){
         $(".go_next p:nth-child(3)").addClass("go_show");
         $(".go_next p:nth-child(3)").siblings("p").removeClass("go_show");
       }
       else {
        $(".go_next p:last-child").addClass("go_show");
         $(".go_next p:last-child").siblings("p").removeClass("go_show");
       }
    });
})
function company_list(){
      var search=$.trim($("#search").val());
      var industry=$(".company .owned_industry span.click_bg a").html();
      return {
        'search':search,
        'industry':industry,
     }
}

function get_salary(data){
      var search=$.trim($("#search").val());
    var industry=$("#"+data +" p .show_list").html();
      return {
        'search':search,
        'industry':industry,
     }
}
function get_campany(){
      var search=$.trim($("#search").val());
    var industry=$(".company .owned_industry span.click_bg a").html();
    return {
        'search':search,
        'industry':industry
    }
}
function position(num,id){
 $('html,body').animate({ scrollTop:num}, 700);
$("id").addClass("go_show");
 $("id").siblings("p").removeClass("go_show");
}