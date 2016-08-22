$(function(){
  //教育经历项目编辑
  var edu_f = $(".education").attr('rel');
  if(edu_f != 0)
  {
    $(".education .my_resumeinfo").show();
    closeDiv('edu_jingli');
  }else{
    $(".education .my_resumeinfo").hide();
    $(".education .fill_resume").show();
  }
  
  //教育经历编辑
  $("body").on('click',".edu_con .edit_info",function()
  {
    var edu_id = $(this).parent().attr('rel');
    $("#edu_jingli .btn_save").attr('rel',edu_id);
    var s = $(this).siblings('li.s_n').html();
    $("#school").val(s);

    var m = $(this).siblings('li.z_n').html();
    $("#major").val(m);

    var x = $(this).siblings('li.x_n').attr('rel');
    $(".xueli option:first").attr('selected',false);
    $(".xueli option[value='"+x+"']").attr('selected','selected');

    var t = $(this).siblings('li.t_n').html();
    edit_time(t, 'start_year', 'start_month', 'end_year', 'end_month');
    openDiv('edu_jingli');
  });
      
  
  // 教育经历
  $("body").on('click',"#edu_jingli .btn_save",function(){
       var eduStr = check_form4();
       if(eduStr == false){return false;}
       var eduid = $(this).attr('rel');
       eduStr['id'] = eduid;
        $.ajax({
          type:'post',
          url: "ajax_no.htm",
          data: eduStr,
          dataType: 'json',
          success: function(msg)
          { 
             if(msg == 0){layer.alert('请先填写基本资料！');}
             $(".education").attr('rel','1');
             if(eduid!="")
             {
                 var obj = $(".edus_"+eduid);
                 obj.find(".s_n").html(eduStr['school']);
                 obj.find(".z_n").html(eduStr['major']);
                 obj.find(".x_n").html(eduStr['xueli']);
                 obj.find(".t_n").html(eduStr['time']);
                 closeDiv('edu_jingli');
             }else
             {
                var item_tag = '<ul class="edu_con edus_'+msg+'" rel="'+msg+'"><li class="edu_con_fst s_n">'+eduStr['school']+'</li><li class="z_n">'+eduStr['major']+'</li><li class="x_n" rel='+eduStr['xueli']+'>'+eduStr['xueli']+'</li><li class="t_n">'+eduStr['time']+'</li><div class="edit_info" style="top:2px;right:45px" alt="编辑" title="编辑"></div><div class="delete_info" alt="删除" title="删除"></div></ul>'
                $(".education .my_resumeinfo .p_add").before(item_tag);
                closeDiv('edu_jingli');
             }

          },
          error:function(){   
              alert('error');   
          }

       });
       
  });

//教育经历删除
$("body").on('click',".edu_con .delete_info",function(){
   var eduid = $(this).parent().attr('rel');
   var obj = $(this).parent();
   if(eduid == ''){ alert('错');return false;}
   $.post('ajax_no.htm', {delete_edu:eduid}, function(msg){
      if(msg==0){layer.alert('请先填写基本资料！'); return false;}
       obj.remove();
    })
})

//idonclick="openDiv('edu_jingli');"

  $(".education .p_add").click(function(){
      //$("body").append($("p").clone());
      openDiv('edu_jingli');
      clear_edu();
  })

  //工作经历项目编辑
  var work_f = $(".work_exp").attr('rel');
  if(work_f != 0)
  {
    $(".work_exp .my_resumeinfo").show();
    closeDiv('work_jingli');
  }else{
    $(".work_exp .my_resumeinfo").hide();
    $(".work_exp .fill_resume").show();
  }
  //工作经历编辑
  $("body").on('click',".work_exp .work_com .edit_info",function(){
    openDiv('work_jingli');
    $("#work_jingli .btn_save").attr('rel',$(this).parent().attr('rel'));

    var g_n = $(this).siblings('h3').children('span.com_name').html();
    $("#gs").val(g_n);

    var time = $(this).siblings('h3').children('span.work_time').html();
    edit_time(time, 'start_year2', 'start_month2', 'end_year2', 'end_month2');

    var didian = $(this).siblings('p').children('span.didian').html();
    $("#gs_address").val(didian);

    var hangye = $(this).siblings('p').children('span.hangye').html();
    $("#gs_trade").val(hangye);

    var zhiwei = $(this).siblings('p').children('span.zhiwei').html();
    $("#gs_job").val(zhiwei);

    var zhize = $(this).siblings('p').children('span.zhize').html();
    $("#zhize").val(zhize);

  });
      

  //教育经历 取消
  $("#edu_jingli .btn_cancle").click(function(){
     var edu_f = $(".education").attr('rel');
     if(edu_f == 0) //取消
     {
        $(".education .my_resumeinfo").hide();
        $(".education .fill_resume").show();
        $("#edu_jingli").hide();
     }else
     {
       closeDiv('edu_jingli');
     }
  })

//工作经历 取消
  $("#work_jingli .btn_cancle").click(function(){
     var work_f = $(".work_exp").attr('rel');
     if(work_f == 0) //取消
     {
        $(".work_exp .my_resumeinfo").hide();
        $(".work_exp .fill_resume").show();
        $("#work_jingli").hide();
     }else
     {
       closeDiv('work_jingli');
     }
  })

  //$.ajaxSetup({ contentType: 'text/json' });
  // 工作经历
  $("#work_jingli .btn_save").click(function(){
       var workStr = check_form5();
       if(workStr == false){return false;}
       // 修改保存
       var w_id = $(this).attr('rel');
        workStr['id'] = w_id;
        $.ajax({
          type:'post',
          url: "ajax_no.htm",
          data: workStr,
          dataType: 'json',
          success: function(msg)
          { 
             if(msg == 0){layer.alert('请先填写基本资料！');}
             $(".work_exp").attr('rel','1');
             if(w_id!="")
             {
                 $(".w_tab_"+w_id+" .com_name").html(workStr['company']);
                 $(".w_tab_"+w_id+" .work_time").html(workStr['time']);
                 $(".w_tab_"+w_id+" .didian").html(workStr['address']);
                 $(".w_tab_"+w_id+" .hangye").html(workStr['trade']);
                 $(".w_tab_"+w_id+" .zhiwei").html(workStr['job_name']);
                 $(".w_tab_"+w_id+" .zhize").html(workStr['content']);       
                 closeDiv('work_jingli');
             }else
             {
                var tag = '<div class="work_com w_tab_'+msg+'" rel="'+msg+'"><div class="edit_info" style="top:5px;right:45px;" alt="编辑" title="编辑"></div><div class="delete_info" style="top:-3px;" alt="删除" title="删除"></div><h3 class="work_tit clearfix" style="margin-bottom:10px;"><span class="com_name">'+workStr['company']+'</span><span class="work_time">'+workStr['time']+'</span></h3><p><span>工作地点：</span><span class="didian">'+workStr['address']+'</span><span style="margin:0 20px; color:#999;">|</span><span>行业：</span><span class="hangye">'+workStr['trade']+'</span></p><p><span>职位名称：</span><span class="zhiwei">'+workStr['job_name']+'</span></p><p><span>工作职责：</span><span class="zhize">'+workStr['content']+'</span></p></div>';
                 $(".work_exp .my_resumeinfo .p_add").before(tag);
                 closeDiv('work_jingli');
             }

          },
          error:function(){   
              alert('error');   
          }

       });

  });

//工作经历删除
$("body").on('click',".work_exp .work_com .delete_info",function(){
   var w_id = $(this).parent().attr('rel');
   var obj = $(this).parent();
   if(w_id == ''){ alert('错');return false;}
   $.post('ajax_no.htm', {delete_work:w_id}, function(msg){
      if(msg==0){layer.alert('请先填写基本资料！'); return false;}
       obj.remove();
    })
})
  //项目经验编辑
  var item_f = $(".xiangmu_exp").attr('rel');
  if(item_f != 0)
  {
    $(".xiangmu_exp .my_resumeinfo").show();
    closeDiv('xiangmu_jingli');
  }else{
    $(".xiangmu_exp .my_resumeinfo").hide();
    $(".xiangmu_exp .fill_resume").show();
  }

//项目经验编辑
    $("body").on('click',".xiangmu_exp .work_com .edit_info",function(){
      openDiv('xiangmu_jingli');
      $("#xiangmu_jingli .btn_save").attr('rel',$(this).parent().attr('rel'));

      var item_name = $(this).siblings('h3').children('span.com_name').html();
      $("#xiangmu").val(item_name);

      var item_duty = $(this).siblings('h3').children('span.work_name').html();
      $("#xiangmu_zhiwu").val(item_duty);

      var item_time = $(this).siblings('h3').children('span.work_time').html();
      edit_time(item_time, 'start_year3', 'start_month3', 'end_year3', 'end_month3');

      var item_con = $(this).siblings('p').html();
      $("#xiangmu_miaoshu").val(item_con);

    });
      

  // 项目经验
  $("#xiangmu_jingli .btn_save").click(function(){
       var itemStr = check_form6();
       if(itemStr == false){return false;}
       var x_id = $(this).attr('rel');
        itemStr['id'] = x_id;
        //console.log(itemStr);
        $.ajax({
          type:'post',
          url: "ajax_no.htm",
          data: itemStr,
          dataType: 'json',
          success: function(msg)
          { 
             if(msg == 0){layer.alert('请先填写基本资料！');}
             $(".xiangmu_exp").attr('rel',1)
             if(x_id!="")
             {
                 $(".item_tab_"+x_id+" .com_name").html(itemStr['project_name']);
                 $(".item_tab_"+x_id+" .work_time").html(itemStr['time']);
                 $(".item_tab_"+x_id+" .work_name").html(itemStr['project_job']);
                 $(".item_tab_"+x_id+" p").html(itemStr['content']);       
                 closeDiv('xiangmu_jingli');
             }else
             {
                 var item_tag = '<div class="work_com item_tab_'+msg+'" rel="'+msg+'"><h3 class="work_tit clearfix" style="margin-bottom: 10px;"><span class="com_name">'+itemStr['project_name']+'</span><span class="work_name">'+itemStr['project_job']+'</span><span class="work_time">'+itemStr['time']+'</span></h3><p>'+itemStr['content']+'</p><div class="edit_info" style="top:5px;right:45px;" alt="编辑" title="编辑"></div><div class="delete_info" style="top:-3px;"alt="删除" title="删除"></div></div>';
                 $(".xiangmu_exp .my_resumeinfo .p_add").before(item_tag);
                 closeDiv('xiangmu_jingli');
             }

          },
          error:function(){   
              alert('error');   
          }

       });
  });
//项目经验删除
  $("body").on('click',".xiangmu_exp .work_com .delete_info",function(){
    var x_id = $(this).parent().attr('rel');
    var obj = $(this).parent();
    if(x_id == ''){ alert('错');return false;}
    $.post('ajax_no.htm', {delete_project:x_id}, function(msg){
      if(msg==0){layer.alert('请先填写基本资料！'); return false;}
       obj.remove();
    })
  })

  //项目经验 取消
  $("#xiangmu_jingli .btn_cancle").click(function(){
     var item_f = $(".xiangmu_exp").attr('rel');
     if(item_f == 0) //取消
     {
        $(".xiangmu_exp .my_resumeinfo").hide();
        $(".xiangmu_exp .fill_resume").show();
        $("#xiangmu_jingli").hide();
     }else
     {
       closeDiv('xiangmu_jingli');
     }
  });

  //自我描述编辑
  var self_describe_f = $(".self_describe").attr('rel');
  if(self_describe_f != '')
  {
    $(".self_describe .my_resumeinfo").show();
    closeDiv('self_miaoshu');

    $(".self_describe .edit_info").click(function(){
      var d_con = $(this).siblings('p').html();
      $("#my_miaoshu").val(d_con);
    });
      
  }else{
    $(".self_describe .my_resumeinfo").hide();
    $(".self_describe .fill_resume").show();
  }

  // 自我描述
  $("#self_miaoshu .btn_save").click(function(){
       var my_con = $.trim($("#my_miaoshu").val());
       if(my_con == ''){layer.alert('请填写自我描述才能保存！');return false;}
       // 修改保存
        $.post('ajax_no.htm', {introduce:my_con}, function(msg){
         if(msg==0){layer.alert('请先填写基本资料！'); return false;}
           $(".self_describe .my_resumeinfo p").html(my_con);
           closeDiv('self_miaoshu');
        })  
        /*          
       if(my_con == ''){  
        $(".self_describe .fill_resume").show();
       }else{
        $(".self_describe .my_resumeinfo").show(); 
       } */    
       
  });

  //自我描述 取消
  $("#self_miaoshu .btn_cancle").click(function(){
     if(self_describe_f == '') //取消
     {
        $(".self_describe .my_resumeinfo").hide();
        $(".self_describe .fill_resume").show();
        $("#self_miaoshu").hide();
     }else
     {
       closeDiv('self_miaoshu');
     }
  });

  //其他信息编辑
  var other_info_f = $(".other_info").attr('rel');
  if(other_info_f != '')
  {
    $(".other_info_f .my_resumeinfo").show();
    closeDiv('qitaxinxi');

    $(".other_info .edit_info").click(function(){
      var other_con = $(this).siblings('p').html();
      $("#other_miaoshu").val(other_con);
    });
      
  }else{
    $(".other_info .my_resumeinfo").hide();
    $(".other_info .fill_resume").show();
  }

  //$.ajaxSetup({ contentType: 'text/json' });
  // 其他信息
  $("#qitaxinxi .btn_save").click(function(){
       var q_con = $.trim($("#other_miaoshu").val());
       if(q_con==''){layer.alert('请填写内容，才能保存！'); return false;}
        $.post('ajax_no.htm', {other_info:q_con}, function(msg){
         if(msg==0){layer.alert('请先填写基本资料！'); return false;}
           $(".other_info .my_resumeinfo p").html(q_con); 
           closeDiv('qitaxinxi');
        }) 
       // 修改保存
       
       /*if(q_con == ''){  
        $(".other_info .fill_resume").show();
       }else{
        $(".other_info .my_resumeinfo").show(); 
       }    */ 
  });

  //其他信息 取消
  $("#qitaxinxi .btn_cancle").click(function(){
     if(other_info_f == '') //取消
     {
        $(".other_info .my_resumeinfo").hide();
        $(".other_info .fill_resume").show();
        $("#qitaxinxi").hide();
     }else
     {
       closeDiv('qitaxinxi');
     }
  });


  // 添加工作经历重置文本框
  $(".work_exp .p_add").click(function(){
    openDiv('work_jingli');
    $("#work_jingli .btn_save").attr('rel','')
    $("#gs").val('');
    $("#gs_trade").val('');
    $("#gs_job").val('');
    $("#gs_address").val('');
    $("#zhize").val('');

    $("#start_year2").find("option:selected").removeAttr("selected");
    $("#start_year2 option:first").attr('selected','selected');
    
    $("#start_month2").find("option:selected").removeAttr("selected");
    $("#start_month2 option:first").attr('selected','selected');
    
    $("#end_year2").find("option:selected").removeAttr("selected");
    $("#end_year2 option:first").attr('selected','selected');
    

    $("#end_month2").find("option:selected").removeAttr("selected");
    $("#end_month2 option:first").attr('selected','selected');
    
  });

  // 添加项目经验重置文本框
  $(".xiangmu_exp .p_add").click(function(){
    openDiv('xiangmu_jingli');
    $("#xiangmu").val('');
    $("#xiangmu_zhiwu").val('');
    $("#xiangmu_miaoshu").val('');
    $("#start_year3").val('');
    $("#start_month3").val('');
    $("#end_year3").val('');
    $("#end_month3").val('');    
  });

});

// 日期编辑
function edit_time(t, s_yid, s_mid, e_yid, e_mid){
  var t2 = t.split(' - ');
  var s_t = t2[0];
  var s_year = s_t.substr(0, 4);
  var s_mon = s_t.substr(-2, 2);
  if(s_mon <10)
  {
    s_mon = s_mon.replace('0', '');
  }
  
  $("#"+s_yid+" option:first").attr('selected',false);
  $("#"+s_yid+" option[value='"+s_year+"']").attr('selected','selected');
  $("#"+s_yid).val(s_year);
  $("#"+s_mid+" option:first").attr('selected',false);
  $("#"+s_mid+" option[value='"+s_mon+"']").attr('selected','selected');
  $("#"+s_mid).val(s_mon);

  var e_t = t2[1];
  var e_year = e_t.substr(0, 4);
  var e_mon = e_t.substr(-2, 2);
  if(e_mon <10)
  {
    e_mon = e_mon.replace('0', '');
  }
  
  $("#"+e_yid+" option:first").attr('selected',false);
  $("#"+e_yid+" option[value='"+e_year+"']").attr('selected','selected');
  $("#"+e_yid).val(e_year);
  $("#"+e_mid+" option:first").attr('selected',false);
  $("#"+e_mid+" option[value='"+e_mon+"']").attr('selected','selected');
  $("#"+e_mid).val(e_mon);
}

// 教育经历
function check_form4()
{
  var edu_arr = {};

  var check1  = ChkEmpty(school, '请输入您的毕业院校');
  if(check1 == false){ return false;}

  var check2  = ChkEmpty(major, '请输入您所学专业名称');
  if(check2 == false){ return false;}

  var check3  = ChkEmpty(start_year, '请选择开始年份');
  if(check3 == false){ return false;}

  var check4  = ChkEmpty(start_month, '请选择开始月份');
  if(check4 == false){ return false;}

  var check5  = ChkEmpty(end_year, '请选择结束年份');
  if(check5 == false){ return false;}

  var check6  = ChkEmpty(end_month, '请选择结束月份');
  if(check6 == false){ return false;}

  var check7 = chkyear(check3, check4, check5, check6);
  if(!check7){return false;}

  var xueli = $(".xueli").val();

  edu_arr['school'] = check1;
  edu_arr['major'] = check2;
  edu_arr['time'] = check7;
  edu_arr['xueli'] = $(".xueli option:selected").text();
  var ch = check7.split(' - ');
  edu_arr['start_time'] = ch[0];
  edu_arr['end_time']   = ch[1];
  edu_arr['edu']        = xueli;
  
  return edu_arr;      
}

// 工作经历
function check_form5()
{
  var work_arr = {};

  var check1  = ChkEmpty(gs, '请输入公司名称');
  if(check1 == false){ return false;}

  var check2  = ChkEmpty(gs_trade, '请选择您从事的行业名称');
  if(check2 == false){ return false;}

  var check3  = ChkEmpty(gs_job, '请输入您从事的职位名称');
  if(check3 == false){ return false;}

  var check4  = ChkEmpty(gs_address, '请选择工作地点');
  if(check4 == false){ return false;}

  var check5  = ChkInteger_select(start_year2, '请选择开始年份');
  if(check5 == false){ return false;}

  var check6  = ChkInteger_select(start_month2, '请选择开始月份');
  if(check6 == false){ return false;}

  var check7  = ChkInteger_select(end_year2, '请选择结束年份');
  if(check7 == false){ return false;}

  var check8  = ChkInteger_select(end_month2, '请选择结束月份');
  if(check8 == false){ return false;}

  var check9 = chkyear(check5, check6, check7, check8);
  if(!check9){return false;}

  var check10  = ChkEmpty(zhize, '请输入工作职能');
  if(check10 == false){ return false;}

  var t_arr = check9.split(' - ');
  work_arr['start_time'] = t_arr[0];
  work_arr['end_time'] = t_arr[1];

  work_arr['company'] = check1;
  work_arr['trade'] = check2;
  work_arr['job_name'] = check3;
  work_arr['address'] = check4;
  work_arr['time'] = check9;
  work_arr['content'] = check10;
  
  return work_arr;      
}

//清楚教育径路
function clear_edu()
{
    $("#edu_jingli .btn_save").attr('rel','');
    $("#school").val('');
    $("#major").val('');
    $("#start_year option:selected").attr('selected',false);
    $("#start_year option:first").attr('selected','selected');

    $("#start_month option:selected").attr('selected',false);
    $("#start_month option:first").attr('selected','selected');

    $("#end_year option:selected").attr('selected',false);
    $("#end_year option:first").attr('selected','selected');

    $("#end_month option:selected").attr('selected',false);
    $("#end_month option:first").attr('selected','selected');

    $(".xueli option:selected").attr('selected',false);
    $(".xueli option:first").attr('selected','selected'); 
}


// 项目经验
function check_form6()
{
  var item_arr = {};

  var check1  = ChkEmpty(xiangmu, '请输入项目名称');
  if(check1 == false){ return false;}

  var check2  = ChkEmpty(start_year3, '请选择开始年份');
  if(check2 == false){ return false;}

  var check3  = ChkEmpty(start_month3, '请选择开始月份');
  if(check3 == false){ return false;}

  var check4  = ChkEmpty(end_year3, '请选择结束年份');
  if(check4 == false){ return false;}

  var check5  = ChkEmpty(end_month3, '请选择结束月份');
  if(check5 == false){ return false;}

  var check6 = chkyear(check2, check3, check4, check5);
  if(!check6){return false;}

  var item_duty = $("#xiangmu_zhiwu").val();

  var item_con = $("#xiangmu_miaoshu").val();

  var t_arr = check6.split(' - ');
  item_arr['begin_time'] = t_arr[0];
  item_arr['end_time'] = t_arr[1];

  item_arr['project_name'] = check1;
  item_arr['project_job'] = item_duty;
  item_arr['content'] = item_con;
  item_arr['time'] = check6;
  
  return item_arr;
}

// 比较结束时间与开始时间的大小
function chkyear(s1, m1, s2, m2){
  if(m1.length == 1){
    m1 = '0' + m1;
  }

  var t1 = s1 + '.' + m1;
  var d1 = s1 + '.' + m1 + '.01';

  if(m2.length == 1){
    m2 = '0' + m2;
  }

  var t2 = s2 + '.' + m2;
  var d2 = s2 + '.' + m2 + '.01';

  var s = new Date(d1.replace(/\./g,'/'));
  var e = new Date(d2.replace(/\./g,'/'));

  if (s >= e) {
    layer.alert("结束时间必须大于开始时间");
    return false;
  }

  return t1 + ' - ' + t2;
}




