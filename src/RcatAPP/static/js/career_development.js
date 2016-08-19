$(function() {
      $(document).keydown(function(event){
      if(event.keyCode != 13 ) return;
      
      event.returnValue=false;
      if(document.activeElement) 
      {
        var id1 = document.activeElement.id;
        if('|search|'.indexOf('|' + id1 + '|') == -1)  return;
      }
      
      $('#global').trigger("click");
      
      event.returnValue=false;

    });
  // var is_first = $.cookie('first_login2');
  //   if (is_first) {
  //       $('.black_overlay').hide();
  //       $("body").css("overflow","auto")
  //   }else{
  //       $.cookie('first_login2', 1, {expires: 366});
  //       $('.black_overlay').show();
  //       $("body").css("overflow","hidden")
  //   }
    $(".other_close img").hover(function(){
        $(this).attr("src","/static/images/close_hover.png")
    },function(){
      $(this).attr("src","/static/images/index_close.png")
    })
    $(".next_two,.other_close img").click(function(){
        $(".guid").hide();
        $("body").css("overflow","auto")
    });

  var content = $(".content").outerHeight(true);
  var content_next = $(".content_next").outerHeight(true);
  var frame_pr = content - 60;
  var frame_pr_2 = content_next - 60;


  $(".content").css({
    "margin-top": "-" + content * 0.5 + "px"
  })
  $(".content_next").css("margin-top", "-" + content_next * 0.5 + "px")
  $(".frame_pr").css({
    "height": frame_pr + "px",
    "margin-top": "-" + frame_pr * 0.5 - 10 + "px"
  })
  $(".frame_pr_2").css({
    "height": frame_pr_2 + "px",
    "margin-top": "-" + frame_pr_2 * 0.5 - 10 + "px"
  })
  $(".next_whole").css({
    "height": content_next,
    "margin-top": "-" + content_next * 0.5 + "px"
  })
  $(".prev_whole").css({
    "height": content,
    "margin-top": "-" + content * 0.5 + "px"
  })

   function change_height() {
    var content = $(".content").outerHeight(true);
    var content_next = $(".content_next").outerHeight(true);
    var frame_pr_2 = content_next - 60;
    var frame_pr = content - 60;
    $(".content").css({
      "margin-top": "-" + content * 0.5 + "px"
    })
    $(".content_next").css("margin-top", "-" + content_next * 0.5 + "px")
    $(".frame_pr").css({
      "height": frame_pr + "px",
      "margin-top": "-" + frame_pr * 0.5 - 10 + "px"
    })
    $(".frame_pr_2").css({
      "height": frame_pr_2 + "px",
      "margin-top": "-" + frame_pr_2 * 0.5 - 10 + "px"
    })
    $(".next_whole").css({
      "height": content_next,
      "margin-top": "-" + content_next * 0.5 + "px"
    })
    $(".prev_whole").css({
      "height": content,
      "margin-top": "-" + content * 0.5 + "px"
    })
    if(content == 0 && content_next == 0){
      $(".product_2").hide();
      $(".product").append('<div class="no_record"><img src="/static/images/career_nodata.png"><p class="no_report">暂无数据</p><p class="notice">请您重新搜索职位查看</p></div>')
       if($(".account>div").attr("class") == "admin_login"){
             $(".no_record").append('<div class="login_ckeck"><a class="tz_href">登录</a><span>查看发展路径</span></div>')
       }
    }
    if(content <=60){
       $(".frame_pr").hide();
        if(content == 0){
           $(".content").html('<p class="no_have_color">暂无</p>')
        }
    }
    else{
       $(".frame_pr").show();

    }

   if(content_next <=60){
      $(".frame_pr_2").hide();
     if(content_next == 0){
       $(".content_next").html('<p class="no_have_color_next">暂无</p>')
    }

  }
    else{
       $(".frame_pr_2").show();
      
    }

}



  $("#global").click(function() {
     if($("#search").val()==""){
      layer.alert("请输入搜索的关键字");
    }
    else{
      var name = $("#search").val();
      $(".choose_position").html(name);
      ajax_prev(name);
    }

  })

  $("body").on('click', '.bar_next .check_name', function() {

    var sub = $(this).parent().siblings(".title_name").html().split("：");
     var name=sub[0]
    var ch_name = $(".show_name>div>span ").html();

    if (name == ch_name) {
      return false
    }
    $(".choose_position").html(name);
    ajax_prev(name);

  })
   $("body").on('click', '.tz_href', function() {
    var name = $(".show_name>span").html();
    window.open('/development_path/' + encodeURIComponent(name))

     })
  $("body").on('click', '.bar .check_name', function() {

     var sub = $(this).parent().siblings(".title_name").html().split("：");
     var name=sub[0]
    var ch_name = $(".show_name>div>span ").html();

    var ch_name = $(".show_name>div>span").html();


    if (name == ch_name) {
      return false
    }
    $(".choose_position").html(name);
    
    ajax_prev(name);

  })
  $("body").on('click', '.show_name>span', function() {
    var search = $(this).html();
    window.open('/search/' + encodeURIComponent(search))


  })
  // 职位
    $('#search').focus(function(){
        show_panel('pop_jobs');
        $('body').css('overflow', 'hidden');
        var job = $.trim($(this).val());
        var job_trade = $.trim($('.job_trade').data('trade'));
        if (job == '') {
            create_jobs(jobsdata[0]['trade']);
        } else {
            if (job_trade != ''){  
                create_jobs(job_trade);
            } else {
                create_jobs(jobsdata[0]['trade']);
            }
            var arr_job = job.split(',');
            $.each(arr_job, function(k, v){                
                $('.jobs li:contains('+v+')').addClass('select');
            });
        }        
    });
    // 职位所属行业行业
    $('body').on('click', '.job_trade li', function(){
        var trade = $(this).html();
        create_jobs(trade);
        $('.job_trade').data('trade', trade);
    });
    $('body').on('click', '.jobs li', function(){
        $(this).addClass('select');
        var jobs_li=$(this).html();
        $("#search").val(jobs_li);
        $('.cancel').click();
    });

    $('.black_overlay_zw, .cancel').click(function(){
        $('.black_overlay_zw').hide();
        $(".p_panel ").hide();
        $('body').css('overflow', 'auto');
    });



 

  // function ajax(name) {
  //   $.ajax({
  //     type: 'post',
  //     url: "/api_career_map",
  //     contentType: "application/json; charset=utf-8",
  //     dataType: 'json',
  //     data: JSON.stringify({
  //       job_name: name
  //     }),

  //     success: function(data) {
  //       var errcode = data.errcode;
  //       if (errcode == 0) {
  //         var data = data['data'];
  //         var skill_list = skill_develop(data['skill_tags']);
  //         $(".skill_whole").html(skill_list);
  //         var career_list = caree_develop(data, name);

  //         $(".product").append(career_list);
  //         change_height();

  //         $(".product").animate({
  //           "margin-left": "-100%"
  //         }, 1000, function() {

  //           $(".product").css({
  //             "margin-left": "0%"
  //           })
  //           $(".product div:first").remove();
  //         });
  //       }
  //     },
  //     error: function() {
  //       alert('error');
  //     }
  //   });
  // }


  function ajax_prev(name) {
    $.ajax({
      type: 'post',
      url: "/api_career_map",
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        job_name: name
      }),

      success: function(data) {
        var errcode = data.errcode;
        if (errcode == 0) {
          var data = data['data'];
          var skill_list = skill_develop(data['skill_tags'],name);
          $(".skill_main").html(skill_list);
          var career_list = caree_develop(data, name)
          $(".product").html(career_list);
          // $(".product").prepend(career_list);
          // $(".product").css("margin-left", "-100%");
          change_height();
          // $(".product").animate({
          //   "margin-left": "0%"
          // }, 1000, function() {
            
          //   $(".product>div:last").remove();
          // });
        }
      },
      error: function() {
        alert('加载失败');
      }
    });
  }
})


function caree_develop(datas, name) {
 
  var tag_str = '';
  var career = datas.career_before;
  var after = datas.career_after;
  tag_str += '<div class="product_2"><div class="box"><p class="prev_work">上一阶段职位</p><div class="prev_whole"><div class="content">'
  for (var i = 0; i < career.length; i++) {
    tag_str += '<div class="progress bar"><div class="progress-bar blue_col" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + career[i]['percent'] + ';"></div>'
    tag_str += ' <div class="check_look"><div class="check_name" title="' + career[i]['percent'] + '">查看导图</div><div class="check_char"><a href="/search/' + career[i]['jobname'] + '" target="_blank">查看工资</a></div></div>'
    tag_str += '<span class="title_name">' + career[i]['jobname'] + '：' + career[i]['percent'] + '</span></div>'
  }
  tag_str += '</div></div></div><div class="box_two"><div class="show_name"><span>' + name + '</span>'
    if(datas.user_id != 0){
    tag_str += '<div class="login_ckeck"><a class="tz_href">查看发展路径<img src="/static/images/remind_two.png?v=20160627"></a></div>'
  }
  else{
    tag_str += '<div class="login_ckeck"><a class="tz_href">查看发展路径<img src="/static/images/remind_two.png?v=20160627"></a></div>'
  }
  tag_str +='<p class="hr1"><img src="/static/images/career_icon.png?v=1" alt=""></p><p class="hr2"><img src="/static/images/career_icon_2.png?v=1" alt=""></p></div></div>'
  tag_str += '<div class="box"><p class="next_work">下一阶段职位</p><div class="next_whole"><div class="content_next">'
  for (var k = 0; k < after.length; k++) {
    tag_str += '<div class="progress bar_next">'
    tag_str += ' <div class="progress-bar blue_col" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + after[k]['percent'] + ';"></div><span class="title_name">' + after[k]['jobname'] + '：' + after[k]['percent'] + '</span>'
    tag_str += '<div class="check_look"><div class="check_name" title="' + after[k]['percent'] + '">查看导图</div><div class="check_char"><a href="/search/' + after[k]['jobname'] + '" target="_blank">查看工资</a></div></div></div>'
  }
  tag_str += ' </div></div></div></div>'


  return tag_str;
}


function skill_develop(tag_list,name) {
  var tag_str = '';
  var tags = tag_list;
  var len_skill_tags = tags.length;
  if(len_skill_tags > 0){
       tag_str += '<p class="title_chart">我与<span class="choose_position">'+name+'</span>职位的技能差距 </p><div class="skill_whole">'
  
  for (var i = 0; i < len_skill_tags; i++) {
    if (tags[i].haveclass) {
      tag_str += '<p class="skill"><a href="javascript:;" class="skill_have">查看相关课程</a>'
    } else {
      tag_str += '<p class="skill no_have"><a href="javascript:;"  class="skill_gray">暂无相关课程</a>'

    }
    tag_str += ' <span class="skill_name" >' + tags[i]['tagname'] + '</span>'
    if (tags[i].ishave) {
      tag_str += '<a href="javascript:;"><img src="/static/images/have.png"></a>'
    } else {
      tag_str += '<a href="javascript:;"><img src="/static/images/no_have.png"></a>'
    }
    tag_str += '</p>'
  }
    tag_str += '</div>'
}
  return tag_str;

}
  // 职位
function create_jobs(job_name){
    $('.job_trade ul').html('');
    for (var index in jobsdata) {
        var trade = jobsdata[index]['trade'];
        $('.job_trade ul').append('<li>'+trade+'</li>');
        $('.job_trade li:contains('+job_name+')').addClass('select');
        //相应的职位
        var jobs = jobsdata[index]['job_list'];
        if (job_name == trade) {
            $('.jobs ul').html('');
            for(var index2 in jobs){
                $('.jobs ul').append('<li>'+jobs[index2]+'</li>');
            }            
        }
    }
}

  function show_panel(obj){
    $('.black_overlay_zw').show();
    $('.'+obj).show();
}