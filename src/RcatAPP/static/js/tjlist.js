var dangq =1;
var zong =1;
var baseurl = "";
$(function(){
//encodeURIComponent
// input获得焦点
$("#search_resume").focus(function(){
  $("#search_resume").css("border","1px solid #029774")
})
$("#search_resume").blur(function(){
  $("#search_resume").css("border","1px solid #999999")
})


//获取高度

  // var userAgent = navigator.userAgent; 
  //   var isOpera = userAgent.indexOf("Opera") > -1;
  //   if (userAgent.indexOf("Firefox") > -1||userAgent.indexOf("IE") > -1) {

  //         var v=$(window).height()-70;

  //          $(".detail_con").css("height",v+"px") ;

  //   } 
  //  else{
  //       var v=$(window).height()-70;

  //          $(".detail_con").css("height",v+"px") ;

              
  //  }

//高级搜索框
//高级搜索框

// $("#has_more").mouseover(function(){
//   $(".hide_area").css("display","block");
//   $("#caret ").css("transform","rotate(180deg)");

// });

// $("#has_more").mouseout(function(){
//   $(".hide_area").css("display","block");
//   $("#caret ").css("transform","rotate(360deg)");
// });



$("#has_more").hover(function(){
  $(this).parent("ul").siblings("ul").css("display","block");
  $(this).find("#caret").css("transform","rotate(180deg)");
}, function(){

});

$(".whole_area").hover(function(){
  // $(".hide_area").css("display","block");
}, function(){
  $(this).find(".hide_area").css("display","none");
  $(this).find("#caret").css("transform","rotate(360deg)");
});

$("#has_more2").hover(function(){
  $(this).parent("ul").siblings("ul").css("display","block");
  $(this).find("#caret2").css("transform","rotate(180deg)");
}, function(){

});

$(".whole_area").hover(function(){
  // $(".hide_area").css("display","block");
}, function(){
  $(this).find(".hide_area2").css("display","none");
  $(this).find("#caret2").css("transform","rotate(360deg)");
});

var count=1;
$("#choose_lt").click(function(){
  $(".high_search").toggle();
   $(".all_ul").toggle();
   
  // count++;
   if(count==1){
      $(this).find("p").css("transform","rotate(90deg)");
      $(this).attr("title","点击展开筛选项");
      $(".advanced_search .detail").css("height","50px")
  
 count--;
   }
   else{
  $(this).find("p").css("transform","rotate(-90deg)");
        $(this).attr("title","点击收起筛选项");
          $(".advanced_search .detail").css("height","314px")
    count++;
   }

 
})
  $(".li_industry").hover(function(){
    $(".industry").css("display","none")
  $(this).next("div").css("display","block");

}, function(){
 // $(this).next("div").css("display","none")
});

    $(".industry").hover(function(){
    // $(".industry").css("display","none")
  // $(this).next("div").css("display","block");

}, function(){
 $(this).css("display","none");
});


$("#search_resume").focus(function(){
  $(".cb_more").show();

   var window_height = $(window).height() + $(document).scrollTop();
        $('.black_overlay').css(
                {
                  'background-color': 'rgba(0,0,0,0.8)', 
                  'z-index' : 100, 
                  'height': window_height+'px', 
                  'display':'block'
                }
        ); 


})

$(".btn2").click(function(){
   $('.black_overlay').css("display","none");
 $(".cb_more").hide();
})


//  $("#close img").click(function(){
    
//         $(".step").css("display","none");
//         $(".black_overlay").css("display","none");
//  })

 //弹出层（代替alert） tjlist.html中的弹出层
  // $(".right_bar div p:first-child img").click(function(){
  //   $(".window").css("display","block");
  //       var window_height = $(window).height() + $(document).scrollTop();
  //       $('.black_overlay').css(
  //               {
  //                 'background-color': 'rgba(0,0,0,0.8)', 
  //                 'z-index' : 100, 
  //                 'height': window_height+'px', 
  //                 'display':'block'
  //               }
  //       ); 
  // })
  // $(".window input").click(function(){
  //   $(this).parent("div").hide();
  //   $('.black_overlay').hide();
  // })


 //弹出层（代替alert） reslike.html和reslike_two.html中的弹出层
  // $(".reslike_del").click(function(){
  //   $(".window").css("display","block");
  //       var window_height = $(window).height() + $(document).scrollTop();
  //       $('.black_overlay').css(
  //               {
  //                 'background-color': 'rgba(0,0,0,0.8)', 
  //                 'z-index' : 100, 
  //                 'height': window_height+'px', 
  //                 'display':'block'
  //               }
  //       ); 
  // })
  // $(".window input").click(function(){
  //   $(this).parent("div").hide();
  //   $('.black_overlay').hide();
  // })



 //搜索简历
$("#button_search").click(function(){
$(".cb_more").show();
      var window_height = $(window).height() + $(document).scrollTop();
        $('.black_overlay').css(
                {
                  'background-color': 'rgba(0,0,0,0.8)', 
                  'z-index' : 100, 
                  'height': window_height+'px', 
                  'display':'block'
                }
        ); 
  })
  $("#close").click(function(){
  $(".step").css("display","none");
   $('.black_overlay').css("display","none");
})



//搜索简历

/*$("#select_button").click(function(){
   var searc = $.trim($("#search_resume").val());
   if(searc == '')
   {
      alert("搜索内容不能为空！");
      return false;
   }
   window.location.href = "tjlist.htm?search="+encodeURIComponent(searc);
})*/

//列表
  $(".method p:nth-child(2)").click(function()
  {
      var cc = $(this);
      var rel = cc.parent().attr('rel');
      $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {display:'yes',rel:rel},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
                  alert('登录超时请重新登录！');
                  window.location="login.htm";
                  return false;
            }

        $(".add_list").slideUp(500);
        cc.css("color","#029774");
        cc.next("p").css("color","#000");
        },
        error:function(){   
            alert('error');   
        }
        
    });


  })

  //详情
  $(".method p:last-child").click(function(){

      var cc = $(this);
      var rel = cc.parent().attr('rel');
      $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {display:'no',rel:rel},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
                  alert('登录超时请重新登录！');
                  window.location="login.htm";
                  return false;
            }

        $(".add_list").slideDown(500);
        cc.css("color","#029774")
        cc.prev("p").css("color","#000");
        },
        error:function(){   
            alert('error');   
        }
        
    });   


  })





  //点击感兴趣 //就会生成一个订单
  $("#rec_like").click(function(){
    /*var opt = confirm("确定要操作吗?操作完成之后将会扣除一次下载次数！");
    if(opt==false){
        return false;
    }*/
    var t_obj = $(this);
    layer.confirm('确定要操作吗?操作完成之后将会扣除一次下载次数！', function(index){
        //do something
        var resume_id = t_obj.parent().attr('rel');
        $.ajax({
        type:'post',
        url: "ajax_order_like.htm",
        data: {resume_id:resume_id},
        dataType: 'json',
        success: function(msg){
        // console.log(msg);
          if(msg.status == 999)
          {
              //alert('登录超时请重新登录！');
              layer.alert('登录超时请重新登录！', {
               title: '提示',
              })
              window.location.href='login.htm'
              return false;
          } 
         //return false;
         if(msg == 1){
            //alert("操作成功！");
            window.location.reload();
         }else if(msg == 3){
            //alert("次数不足！请购买充值！");
            layer.alert('次数不足！请购买充值！', {
             title: '提示',
            })
         }else if(msg == 5)
         {
            //alert("已经下载过！");
            layer.alert('已经下载过！', {
             title: '提示',
            })
         }else{
          //alert("操作失败");
          layer.alert('操作失败', {
             title: '提示',
            })
         }
         
        },
        error:function(){   
            alert('error');   
        }
        
    });
        layer.close(index);
    }); 
 


  })

  
//职位名称选中下啦
$(".xiala").change(function()
{
    var job_id = $(this).val();
    var job_name = $(this).find("option:selected").text();
    var e_type = $("#e_type").val();
    var salary = $(this).find("option:selected").attr('rel');
    $("#e_job_id").val(job_id);
    if(e_type == 6)//职位
    {
      $("#e_subject").val("职位邀请（"+job_name+"）");
      $("input[name=job_name]").val(job_name);
      $("input[name=salary]").val(salary);
    }else if(e_type == 5)//面试
    {
      $("#e_subject").val("面试邀请（"+job_name+"）");
      $("#email_job_name1").html(job_name);
      $("input[name=m_job_name]").val(job_name);
    }
})

  //点击发送职位邀请 rec_detail.htm rec_send_email 
  $("#rec_send_email").click(function(){
     $(".title-email").html('发送职位邀请');
     $("#e_type").val(6);
     var id = $(this).parent().attr('rel');
     $(".xiala").show();
     $(".xiala").attr('selectedIndex', 0);
     $("#e_subject").val('');
     $("#e_subject").attr('placeholder','请在右侧的下拉框中选择职位名称');
     $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {tj_resumeid:id},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
              //alert('登录超时请重新登录！');
              layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
              window.location="login.htm";
              return false;
          }           
          if(msg == 1) 
          {
             var email = $("#re_mail").val();
             $("#e_email").val(email);
             $(".send_email").show();
             $("#mail_content").show();
             $("#mail_content2").hide();
             $("#mail_content3").hide();
          }
          else
          {
            //alert("请先点击感兴趣，才能发送职位邀请！");
            layer.alert('请先点击感兴趣，才能发送职位邀请！', {
             title: '提示',
            })
          }

        },
        error:function()
        {   
            alert('error');   
        }
        
      });


  })
  

  //点击转发给同事 rec_detail.htm   rec_send_zhuanfa
  $("#rec_send_zhuanfa").click(function(){
    $(".title-email").html('转发简历给他人');
    $("#e_type").val(1);
    $("#e_job_id").val(0);
    $("#e_email").val('');
    $("#e_email").attr('placeholder','请填写邮箱');
    $("#e_subject").val('');
    $(".xiala").hide();
    $(".xiala").attr('selectedIndex', 0);
    $("#e_subject").attr('placeholder','可以填写：转发简历名称-xxx公司名称');
    var id = $(this).parent().attr('rel');
     $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {tj_resumeid:id},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
             // alert('登录超时请重新登录！');
             layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
              window.location="login.htm";
              return false;
          } 
          if(msg == 1) 
          {
            $(".send_email").show();
            $("#mail_content").hide();
            $("#mail_content3").hide();
            $("#mail_content2").show();
          }
          else
          {
            //alert("请先点击感兴趣，才能转发给他人！");
            layer.alert('请先点击感兴趣，才能转发给他人！', {
             title: '提示',
            })
          }

        },
        error:function()
        {   
            alert('error');   
        }
        
      });

     
  })

  //下载简历
  $("#rec_xia").click(function(){

    var id = $(this).parent().attr('rel');
    $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {tj_resumeid:id},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
              //alert('登录超时请重新登录！');
              layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
              window.location="login.htm";
              return false;
          } 
          if(msg == 1) 
          {
            //rec_xia_f(window.location);
            open('cv_download.htm', '_blank');
          }
          else
          {
            //alert("请先点击感兴趣，才能下载！");
            layer.alert('请先点击感兴趣，才能下载！', {
             title: '提示',
            })
          }

        },
        error:function()
        {   
            alert('error');   
        }
        
      });
    

  })
  //发送面试邀请
  $(".resume_detial_yaoqing").click(function()
  {
      $(".title-email").html('发送面试邀请');
      var id = $(this).parent().attr('rel');
      $(".xiala").show();
      $(".xiala").attr('selectedIndex', 0);
      $("#e_subject").val('');
      $("#e_subject").attr('placeholder','请在右侧的下拉框中选择职位名称');
      $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {tj_resumeid:id},
        dataType: 'json',
        success: function(msg){
            if(msg.status == 999)
            {
                  //alert('登录超时请重新登录！');
                  layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
                  window.location="login.htm";
                  return false;
            }
          if(msg == 1) 
          {
              $("#e_type").val(5);
              $(".send_email").show();
              $("#mail_content3").show();
              $("#mail_content").hide();
              $("#mail_content2").hide();
          }
          else
          {
            //alert("点击感兴趣，才可以发送面试邀请！");
            layer.alert('点击感兴趣，才可以发送面试邀请！', {
             title: '提示',
            })
          }

        },
        error:function()
        {   
            alert('error');   
        }
        
      });

  })

  //
    //--------------------------简历列表 ------------//
   //简历来源
    $("#nav_op_laiyuan li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reslike.htm?t="+s_this;
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(exp !='') url += "&exp="+exp;
        if(f != "") url+="&f="+f;
        if(url_id)
        {
            url +='&j_id='+url_id; 
        }
        window.location.href = url+'&ko=count_ul4';
    });

   //学历搜索
    $("#nav_op_edu li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reslike.htm?edu="+encodeURIComponent(s_this);
        var three_id = $("#three_id").val();
        var exp = $("#exp").attr('rel');
        if(three_id !='') url += "&t="+three_id;
        if(exp !='') url += "&exp="+exp;
        if(f != "") url+="&f="+f;
        if(s != "") url+="&s="+s;

        window.location.href = url+'&ko=count_ul4';
    });

    //经验搜索
    $("#nav_op_exp li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reslike.htm?exp="+s_this;
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        if(three_id !='') url += "&t="+three_id;
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(f != "") url+="&f="+f;
        if(s != "") url+="&s="+s;
        window.location.href = url+'&ko=count_ul4';
    });

     //状态 nav_op_r_status
     $("#nav_op_r_status li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reslike.htm?f="+s_this;
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        if(three_id !='') url += "&t="+three_id;
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(exp !='') url += "&exp="+exp;
        window.location.href = url+'&ko=count_ul4';
    });

     //性别
    $("#nav_op_sex li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reslike.htm?s="+s_this;
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        if(three_id !='') url += "&t="+three_id;
        if(exp !='') url += "&exp="+exp;
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(f != "") url+="&f="+f;
       
        window.location.href = url+'&ko=count_ul4';
    });

  //删除
  $(".reslike_del").click(function()
  {
    
   /* var opt = confirm("确定要操作吗?操作完成之后将会被删除！");
    if(opt==false){
        return false;
    }*/
    var t_obj = $(this);
    layer.confirm('确定要操作吗?操作完成之后将会被删除！', function(index){

    var resume_id = t_obj.attr('rel');
    if(resume_id == ""){ alert('no_id');return false;}
    $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {reslike_resume_id:resume_id},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
                  //alert('登录超时请重新登录！');
                  layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
                  window.location="login.htm";
                  return false;
            }
            //alert("删除成功！");
          window.location.reload();
        },
        error:function(){   
            alert('error');   
        }
        
    });
    layer.close(index);
  });
  })


 //reslike_two  状态

$("#nav_op_r_status_two li a").click(function(){
      var obj = $(this);
      s_this = pub_select(obj);
      var url = "reslike_two.htm?f="+s_this;
      if(j_id != "") url+="&j_id="+f;
     
      window.location.href = url;
});

  //reslike_tow 删除 nav_op_r_status_two
  $(".reslike_del_two").click(function()
  {
    var resume_id = $(this).parent().attr('rel');
/*    var opt = confirm("确定要操作吗?操作完成之后将会被删除！");
    if(opt==false){
        return false;
    }*/
    
    layer.confirm('确定要操作吗?操作完成之后将会被删除！', function(index){

    if(resume_id == ""){ alert('no_id');return false;}
    $.ajax({
        type:'post',
        url: "ajax_public.htm",
        data: {reslike_resume_two_id:resume_id},
        dataType: 'json',
        success: function(msg)
        { 
           if(msg.status == 999)
            {
                  //alert('登录超时请重新登录！');
                  layer.alert('登录超时请重新登录！', {
             title: '提示',
            })
                  window.location="login.htm";
                  return false;
            }
           // alert("删除成功！");
          window.location.reload();
        },
        error:function(){   
            alert('error');   
        }
        
    });

    layer.close(index);
    });
  })
  //

})


function pub_select(obj){
    var con = obj.html();
    var s_this= obj.attr('rel');
    obj.parent().parent('ul').removeClass('show');
    obj.parent().parent('ul').siblings('a').children('span:first').html(con);
    obj.parent().parent('ul').siblings('a').children('span:first').attr('rel',s_this);
    return s_this;
}


function yanzheng(){
    var e_email = $("#e_email").val();
    if(e_email==""){
      //alert('email不能为空'); 
       layer.alert('email不能为空', {
             title: '提示',
            })
      return false;
    }

    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!pattern.test(e_email)) {
        //alert("邮箱格式不正确！");
        layer.alert('邮箱格式不正确！', {
             title: '提示',
            })
        return false;
    }

    var subject = $.trim($("#e_subject").val());
    if(subject==""){
       //alert('主题不能为空！');
       layer.alert('主题不能为空！', {
             title: '提示',
      })
       return false;
     }
    var e_type = $("#e_type").val();
    if(e_type ==5 || e_type==6)
    {
       var s = $(".xiala").find("option:selected").val();
       if(s == '')
       {
           //alert("请选择职位名称");
           layer.alert('请选择职位名称', {
             title: '提示',
      })
           return false;
       } 
    }
    return true;

}

function qudao(id){
    var ly = $(".laiyuan_"+id).html();
    document.write(ly);
}

function email_close()
{
  $('.send_email').hide();
}

function rec_status(s)
{
  if(s == 0)
  {
     document.write('感兴趣');
  }else if(s ==1)
  {
    document.write("已邀请");
  }
}

function rec_xia_f(s)
{
  //alert(s);
  $("#rec_xia").trigger("click");
   //open('cv_download.htm?u='+encodeURIComponent(s), '_blank');
}

function reslike_status(z,m)
{
  if(z == 0 && m == 0)
  {
    document.write('感兴趣');
  }else if(z ==1 && m==0)
  {
    document.write('职位邀请');
  }else if(z==0 && m==1)
  {
      document.write('面试邀请');
  }else if(z==1 && m==1)
  {
     document.write('职,面试邀请');
  }
}


function sex_zhuan(s)
{
    if(s == 0)
    {
      document.write('保密');
    }else if(s == 1)
    {
      document.write('男');
    }else {
      document.write('女');
    }
}





