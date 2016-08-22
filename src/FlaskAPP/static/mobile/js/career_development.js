$(function() {

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
    if(content == 0 && content_next == 0){
      $(".next_prev_chart").css("height","300px")
      if($(".tz_href").text()=='查看发展路径'){
        $(".tz_href").hide();
      }
    }
    else{
      $(".next_prev_chart").css("height","420px")
        $(".tz_href").show();

    }
  
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
      $(".next_prev_chart").css("height","300px")
      $(".product").append('<div class="no_record"><img src="/static/images/career_nodata.png"><p class="no_report">暂无数据</p><p class="notice">请您重新搜索职位查看</p></div>')


      if($(".tz_href").text()=='查看发展路径'){
        $(".tz_href").hide();
      }

    }
    else{
        $(".tz_href").show();
      $(".next_prev_chart").css("height","420px")


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



   $("body").on('click', '.tz_href', function() {
    var name = $(".box_two span").html();
     window.location.href='/development_path/' + encodeURIComponent(name);

     })


  $(".next_prev_chart").on('click', '.bar_next .title_name', function() {

     var name=$(this).find(".max_name").html();
    var ch_name = $(".box_two>div>span ").html();
    $(".desired_positions_show").removeClass("desired_positions_show")
    $(".desired_positions").find(".position_name").css("color","#333");
    if (name == ch_name) {
      return false
    }
    $(".choose_position").html(name);
    ajax_prev(name);

  })
  $(".next_prev_chart").on('click', '.bar .title_name', function() {

    var name=$(this).find(".max_name").html();
     
    var ch_name = $(".box_two>div>span ").html();

    var ch_name = $(".box_two>div>span").html();
    $(".desired_positions_show").removeClass("desired_positions_show")
    $(".desired_positions").find(".position_name").css("color","#333");

    if (name == ch_name) {
      return false
    }
    $(".choose_position").html(name);
    
    ajax_prev(name);

  })
  $(".next_prev_chart").on('click', '.box_two span', function() {
    var search = $(this).html();

    window.location.href='/search/' + encodeURIComponent(search);

  })



 

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
          var data = data['data']
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
       layer.alert("加载失败")
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
    tag_str += '<span class="title_name"><span>' + career[i]['percent'] + '</span><span class="max_name">' + career[i]['jobname'] + '</span> </span></div>'
  }
  tag_str += '</div><div class="frame_pr"></div></div></div><div class="box_two"><div><span>' + name + '</span><p class="hr1"></p><p class="hr2"></p></div></div>'
  tag_str += '<div class="box"><p class="next_work">下一阶段职位</p><div class="next_whole"><div class="frame_pr_2"></div><div class="content_next">'
  for (var k = 0; k < after.length; k++) {
    tag_str += '<div class="progress bar_next">'
    tag_str += ' <div class="progress-bar blue_col" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:' + after[k]['percent'] + ';"></div><span class="title_name"><span class="max_name">' + after[k]['jobname'] + '</span> <span>' + after[k]['percent'] + '</span></span>'
    tag_str += '</div>'
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
