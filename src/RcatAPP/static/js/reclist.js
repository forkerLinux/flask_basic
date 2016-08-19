$(function(){
    var flag_s = 0;
    //发布渠道筛选
    $("#nav_op_method li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var f_status = $("#stauts").attr('rel');
        window.location.href = "joblist.htm?t="+s_this+'&s='+f_status;
    });

    //状态筛选
    $("#nav_op_state li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var three_id= $("#three_id").attr('rel');
        window.location.href = "joblist.htm?t="+three_id+'&s='+s_this;
    });
    //--------------------------简历列表 ------------//
   //简历来源
    $("#nav_op_laiyuan li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reclist.htm?t="+s_this;
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        var job = $("#job").attr('rel');
        var j_n = $("#job").html();
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(exp !='') url += "&exp="+exp;
        if(job !='') url += "&job="+encodeURIComponent(job);
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
        var url = "reclist.htm?edu="+encodeURIComponent(s_this);
        var three_id = $("#three_id").val();
        var exp = $("#exp").attr('rel');
        var job = $("#job").attr('rel');
        //var j_n = $("#job").html();
        if(three_id !='') url += "&t="+three_id;
        if(exp !='') url += "&exp="+exp;
        if(job !='') url += "&job="+encodeURIComponent(job);
        if(f != "") url+="&f="+f;
        if(url_id)
        {
            url +='&j_id='+url_id; 
        }
        window.location.href = url+'&ko=count_ul4';
    });

    //经验搜索
    $("#nav_op_exp li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reclist.htm?exp="+s_this;
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        var job = $("#job").attr('rel');
        //var j_n = $("#job").html();
        if(three_id !='') url += "&t="+three_id;
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(job !='') url += "&job="+encodeURIComponent(job);
        if(f != "") url+="&f="+f;
        if(url_id)
        {
            url +='&j_id='+url_id; 
        }        
        window.location.href = url+'&ko=count_ul4';
    });

   //申请职位 nav_op_job
    $("#nav_op_job li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var j_n = $("#job").html();
        var url = "reclist.htm?job="+encodeURIComponent(s_this);
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        if(three_id !='') url += "&t="+three_id;
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(exp !='') url += "&exp="+exp;
        if(f != "") url+="&f="+f;
        window.location.href = url+'&ko=count_ul4';
    });

 //状态 nav_op_r_status
     $("#nav_op_r_status li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "reclist.htm?f="+s_this;
        var three_id = $("#three_id").val();
        var edu = $("#edu").html();
        var exp = $("#exp").attr('rel');
        if(three_id !='') url += "&t="+three_id;
        var job = $("#job").attr('rel');
        if(job !='') url += "&job="+encodeURIComponent(job);
        if(edu !='学历') url += "&edu="+encodeURIComponent(edu);
        if(exp !='') url += "&exp="+exp;
        if(f != "") url+="&f="+f;
        window.location.href = url+'&ko=count_ul4';
    });

  //reclist.htm  删除按钮
  $(".rec_detial_del").click(function(){
    var resume_id = $(this).parent().attr('rel');
    var opt = confirm("确定要操作吗?操作完成之后将会被删除！");
    if(opt==false){
        return false;
    }
    if(resume_id == ""){ alert('no_id');return false;}
    $.ajax({
        type:'post',
        url: "ajax_reclist.htm",
        data: {resume_id:resume_id},
        dataType: 'json',
        success: function(msg)
        { //rec_detial_del
            if(msg.status == 999)
            {
                alert('登录超时请重新登录！');
                window.location="login.htm";
                return false;
            } 
          var l = $(".rec_detial_del").find('span').html();
          if(l != undefined)
          {
             var h_f = $("#next_info").attr('href');
             if(h_f != undefined)
             {
                window.location.href = h_f;
            }else{ window.location.href="rec_detail.htm?ko=count_ul4"; }
             
          }else{
             window.location.href="rec_detail.htm?ko=count_ul4";
          }
        },
        error:function(){   
            alert('error');   
        }
        
    });
  })
  //点击感兴趣 //就会生成一个订单
  $("#rec_like").click(function(){
    var opt = confirm("确定要操作吗?操作完成之后将会从余额扣除支付5元！");
    if(opt==false){
        return false;
    }
    var id = $(this).parent().attr('rel');
    var resume_id = $(this).parent().attr('rid');
    //return false;
    $.ajax({
        type:'post',
        url: "ajax_order_like.htm",
        data: {resume_id:resume_id,id:id},
        dataType: 'json',
        success: function(msg){
        // console.log(msg);
          if(msg.status == 999)
          {
              alert('登录超时请重新登录！');
              window.location="login.htm";
              return false;
          } 
         //return false;
         if(msg == 1){
            alert("操作成功！");
            window.location.reload();
         }else if(msg == 3){
            alert("余额不足！请先充值");
         }else{
          alert("操作失败");
         }
         
        },
        error:function(){   
            alert('error');   
        }
        
    });
    return false;

  })

  
  //点击发送职位邀请 rec_detail.htm rec_send_email 
  $("#rec_send_email").click(function(){
     $(".title-email").html('发送职位邀请');
     $("#e_type").val(2);
     var id = $(this).parent().attr('rel');
     $.ajax({
        type:'post',
        url: "ajax_rec_detail.htm",
        data: {rec_id:id,s:''},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
              alert('登录超时请重新登录！');
              window.location="login.htm";
              return false;
          }           
          if(msg == 1) 
          {
             var subject = $("#re_sub").val();
             var email = $("#re_mail").val();
             $("#e_email").val(email);
             $("#e_subject").val(subject);
             $(".send_email").show();
             $("#mail_content").show();
             $("#mail_content2").hide();
             $("#mail_content3").hide();
          }
          else
          {
            alert("请先点击感兴趣，完成支付才能发送职位邀请！");
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
    $("#e_email").val('');
    $("#e_subject").val('');
    $("#e_subject").attr('placeholder','推荐简历-xxx公司');
    var id = $(this).parent().attr('rel');
     $.ajax({
        type:'post',
        url: "ajax_rec_detail.htm",
        data: {rec_id:id,s:''},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
              alert('登录超时请重新登录！');
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
            alert("请先点击感兴趣，完成支付才能转发给他人！");
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
        url: "rec_detail.htm",
        data: {rec_id:id,s:''},
        dataType: 'json',
        success: function(msg){
          if(msg.status == 999)
          {
              alert('登录超时请重新登录！');
              window.location="login.htm";
              return false;
          } 
          if(msg == 1) 
          {
            rec_xia_f(window.location);
            //open('cv_download.htm', '_blank');
          }
          else
          {
            alert("请先点击感兴趣，完成支付才能下载！");
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
      $.ajax({
        type:'post',
        url: "rec_detail.htm",
        data: {rec_id:id,s:2},
        dataType: 'json',
        success: function(msg){
          if(msg == 1) 
          {
              $("#e_type").val(3);
              $(".send_email").show();
              $("#mail_content3").show();
              $("#mail_content").hide();
              $("#mail_content2").hide();
          }
          else
          {
            alert("点击感兴趣，才可以发送面试邀请！");
          }

        },
        error:function()
        {   
            alert('error');   
        }
        
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
    if(e_email==""){alert('email不能为空'); return false;}

    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!pattern.test(e_email)) {
        alert("邮箱格式不正确！");
        return false;
    }

    var subject = $.trim($("#e_subject").val());
    if(subject==""){alert('主题不能为空！'); return false;}

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
  if(s == 1)
  {
     document.write('感兴趣');
  }else if(s ==2)
  {
    document.write("已删除");
  }else if(s == 7)
  {
    document.write('职位邀请');
  }else if(s ==8)
  {
    document.write('面试邀请');
  }else if(s ==0)
  {
    document.write('未联系');
  }
}

function rec_xia_f(s)
{
  //alert(s);
  open('cv_download.htm?u='+encodeURIComponent(s), '_blank');
}