$(function(){

 var resume_s = $.trim($(".black_overlay").attr('rel'));
 if(resume_s!="")
 {
    $(".detail_middle_sc").show();
    $(".jl_whole").hide();  
    $(".ruk").hide();  
 }
//婚姻状况
  var marriage_f = $("#marriage").attr('rel');
  if(marriage_f)
  {
     $("#marriage option").attr('selected',false);
     $("#marriage option[value='"+marriage_f+"']").attr('selected','selected');
  }

//性别选择
 var sex_f = $("#sex_label").attr('rel');
 if(sex_f)
 {
    $("#sex_label .sex_tag").removeClass('select');
    $("#sex_label input").attr('checked',false);
    $("#sex_label input[value='"+sex_f+"']").attr('checked','checked');
    $("#sex_label input[value='"+sex_f+"']").next().addClass('select');
 }


//工作年限
 var work_year_f = $("#work_year").attr('rel');
 if(work_year_f !=0 && work_year_f!='')
 {
    $("#work_year option:first").attr('selected',false);
    $("#work_year option[value='"+work_year_f+"']").attr('selected','selected');
    
 }

//工作状态
var work_state_f = $(".work_state").attr('rel');
if(work_state_f == 0)//没有填写
{
   openDiv('gzzt');//打开编辑
}else{
   $("#gzzt select option:first").attr('selected',false);
   $("#gzzt select").find("option[value='"+work_state_f+"']").attr('selected','selected');
   closeDiv('gzzt');
}

//工作状态点击取消 onclick="closeDiv('gzzt');"
$("#gzzt .btn_cancle").click(function(){
  var work_state_f = $(".work_state").attr('rel');
  if(work_state_f == 0)
  {
    layer.alert('请填写工作状态，并保存！');
    return false;
  }else{
    closeDiv('gzzt');
  }
})

//行业意向
var work_will_f = $(".work_will").attr('rel');
if(work_will_f == "" || work_will_f==0)
{
   openDiv('yixiang');//打开编辑
}else
{
/*   var cat_arr = work_will_f.split(",");
   var zhiwei = '';
   $.each(cat_arr,function(k,v){ 
      zhiwei += $(".zid_"+v).html()+',';
      //$(".zid_"+v).addClass('select_color');
   })
   $("#zhiye .will_value").eq(1).html(zhiwei.substring(0,zhiwei.length-1));*/
   // $("#expect_job").val(zhiwei.substring(0,zhiwei.length-1));
   closeDiv('yixiang');
}

//擅长技能
var good_skills_f = $(".good_skills").attr('rel');
if(good_skills_f =='')
{
    $(".good_skills .my_resumeinfo").hide();
     $(".good_skills .fill_resume").show();
    $(".good_skills #scjn").hide();
}else
{
   var cat_arr = good_skills_f.split("|");
   var jn = '';
   var jn2 = '';
   $.each(cat_arr,function(k,v){ 
      jn +='<p>'+v+'</p>\n';
      jn2 += '<p><b>'+v+'</b><span><img src="images/close.png" alt="" /></span></p>\n';
   })
   $(".skill_con").html(jn);
   $(".my_skill").html(jn2);
   $(".good_skills .fill_resume").hide();
   closeDiv('scjn');
}

//擅长技能 取消 btn_cancle
$(".good_skills .btn_cancle").click(function(){
   if(good_skills_f == '')
   {
        $(".good_skills .my_resumeinfo").hide();
        $(".good_skills .fill_resume").show();
        $(".good_skills #scjn").hide();
   }else
   {
     closeDiv('scjn');
   }
})

//工作状态 保存
$("#gzzt .btn_save").click(function(){
    var work_status = $("#gzzt select").val();
    $.post('ajax_no.htm', {work_status:work_status}, function(msg){
      if(msg==0){layer.alert('请先填写基本资料！'); return false;}
      $(".work_state").attr('rel','1');
      $(".work_state .my_resumeinfo p").html($("#gzzt select").find('option:selected').text());
      closeDiv('gzzt');
    })
})

//性别选择
  $('.sex_tag').click(function(){
    var radioId = $(this).attr('name');
    $(this).siblings('label').removeClass('select');
    $(this).addClass('select');
    $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
  });

 //点击显示行业
  $("#gs_trade").focus(function(){
      $("#tr_trade .list").find('span').removeClass('select_color');
      var ex_val = $(this).val();
      if(ex_val !='')
      {
          var cat_arr = ex_val.split(",");
          $.each(cat_arr,function(k,v){ 
              $("#tr_trade .list").find('span:contains('+v+')').addClass('select_color'); 
          }) 
      }
      //$('.cb_more .btn1').hide();
      //$('.cb_more .note2').html('&nbsp;');
      $(".cb_more").attr('rel','gs_trade');
      fun();

      $(".cb_more .note2").html('请选择行业');
      $(".cb_more .btn1").css("visibility","hidden");
  });

//职业意向  期望行业 点击显示
  $("#tr_trade").on('click',".list",function(){
    var zhuren = $(".cb_more").attr('rel');
    if(zhuren == 'expect_trade')
    {
      var is_c = $(this).find('span').hasClass('select_color');
      if(is_c == true)
      {
        $(this).find("span").removeClass("select_color");
        return false;
      }
      var num = $("#tr_trade .select_color").size();
      if(num >4)
      {
        layer.alert('最多可以选择5个', {
                 title: '提示',
        })
        return false;
      }
      $(this).find("span").addClass("select_color");
    }else
    {
       $("#"+zhuren).val($(this).find("span").html());
       $(".btn2").click();
    }

  })

//职业意向 期望行业点击提交 
   $(".cb_more .btn1").click(function(){
       var s_str = '';
       var num = $("#tr_trade .select_color").size();
       if(num == 0)
       {
          s_msg = '请至少选择一个行业！';
          layer.alert(s_msg, {
                 title: '提示',
          })
          return false;
       }
       $("#tr_trade .select_color").each(function() { 
          s_str += $(this).html()+',';
       });

       $("#expect_trade").val(s_str.substring(0,s_str.length-1));
       $(".btn2").click();
   })

//职业意向取消 yixiang
   $("#yixiang .btn_cancle").click(function(){
      if(work_will_f == "" || work_will_f==0)
      {
         layer.alert('请填写职业意向，才可以点击取消');
         return false;
      }
   })


//职业意向  期望职位
  // $("#zhiwei_str .list").click(function(){
  //   var zhuren = $(".cb_more_zw").attr('rel');
  //   var is_c = $(this).find('span').hasClass('select_color');
  //   if(is_c == true)
  //   {
  //     $(this).find("span").removeClass("select_color");
  //     return false;
  //   }
  //   if(zhuren == 'expect_job')
  //   {
  //       var num = $("#zhiwei_str .select_color").size();
  //       if(num >4)
  //       {
  //         layer.alert('最多可以选择5个', {
  //                  title: '提示',
  //         })
  //         return false;
  //       }
  //       $(this).find("span").addClass("select_color");
  //   }else
  //   {   
  //      $("#"+zhuren).val($(this).find("span").html());
  //      $(".btn2").click();
  //   }

  // })

//职业意向  期望职位选中
  // $(".cb_more_zw .btn1").click(function(){
  //     var num = $("#zhiwei_str .select_color").size();
  //     s_msg = '请至少选择一个职位！';
  //     var s_str = '';
  //     var s_str_id = '';
  //     if(num == 0)
  //     {
  //       layer.alert(s_msg, {
  //                title: '提示',
  //       })
  //       return false;
  //     }
  //     $("#zhiwei_str .select_color").each(function() { 
  //         s_str_id += $(this).attr('rel')+',';
  //         s_str += $(this).html()+',';
  //     });
  //     if(num !=0)
  //     {
  //         $("#expect_job").attr('rel',s_str_id.substring(0,s_str_id.length-1));
  //         $("#expect_job").val(s_str.substring(0,s_str.length-1));
  //     }
  //     $(".btn2").click();
  // })  

  $("#gs_address").focus(function(){
    $(".cb_more_area .list span").removeClass('select_color');
    var palce = $(this).val();
    if(palce)
    {
       $(".cb_more_area .list").find('span:contains('+palce+')').addClass('select_color'); 
    }
    $(".cb_more_area").attr('rel','gs_address');
      fun2();
  });

  $("input[type='text']").focus(function(){
    $(this).css({'border':'1px solid #029774','outline':'none'})
  })
  $("input[type='text']").blur(function(){
    $(this).css({'border':'1px solid #D9D9D9','outline':'none'})
  })

  //期望行业点击
  $("#expect_trade").focus(function(){
      $("#tr_trade .list").find('span').removeClass('select_color');
      var ex_val = $(this).val();
      if(ex_val !='')
      {
          var cat_arr = ex_val.split(",");
          $.each(cat_arr,function(k,v){ 
              $("#tr_trade .list").find('span:contains('+v+')').addClass('select_color'); 
          }) 
      }
      $('.cb_more .btn1').show();
      $(".cb_more").attr('rel','expect_trade');
      fun();
  });

  //期望职位 点击
  // $("#expect_job").focus(function(){
  //     $("#zhiwei_str .list").find('span').removeClass('select_color');
  //     if(work_will_f!='')
  //     {
  //         var cat_arr = work_will_f.split(",");
  //         $.each(cat_arr,function(k,v){ 
  //             $(".zid_"+v).addClass('select_color');
  //         }) 
  //     }
  //     $('.cb_more_zw .btn1').show();
  //     $(".cb_more_zw").attr('rel','expect_job');
  //    fun3();
  // });

  //期望地点
  $("#expect_city").focus(function(){
      $(".cb_more_area .list span").removeClass('select_color');
      var palce = $(this).val();
      if(palce)
      {
         $(".cb_more_area .list").find('span:contains('+palce+')').addClass('select_color'); 
      }
      $(".cb_more_area").attr('rel','expect_city');
      fun2();
  });

  //点击取消
  $(".btn2").click(function(){
      $('.black_overlay').css("display","none");
      $(".cb_more").attr('rel','');
      $(".cb_more").hide();
      $(".cb_more_area").attr('rel','');
      $(".cb_more_area").hide();
      $(".cb_more_zw").attr('rel','');
      $(".cb_more_zw").hide();
  })

   $(".btn_new").click(function(){
      $(".my_resumeinfo").hide();
      $(".fill_resume").show();
    });

  $(".btn_old").click(function(){
      $(".fill_resume").hide();
      $(".my_resumeinfo").show();
    });

  $("textarea").focus(function(){
    $(this).css({'border':'1px solid #029774','outline':'none'})
  })
  $("textarea").blur(function(){
    $(this).css({'border':'1px solid #D9D9D9','outline':'none'})
  });

  // 擅长技能 添加
  $(".btn_addskill").click(function(){
    var b = $.trim($(".p_search>input").val());
    if(b == ''){layer.alert('标签内容不能为空！'); return false;}
    var b2 = $(".my_skill").find('b:contains('+b+')').html();
    if(b2 != undefined)
    {
      layer.alert("已经存在一个相同标签了！");
      return false;
    }
    if($(".my_skill p").length<10)
    {
       $(".my_skill").append('<p><b>'+b+'</b><span class="span_img"><img src="images/close.png" alt="" /></span></p>');
    }else
    {
       layer.alert("擅长技能最多可添加10条");
    }

  });

//擅长技能 删除
  $("body").on('click',".my_skill span",function(){
     $(this).parent('p').remove();
  })
    
//擅长技能 保存
  $("#scjn .btn_save").click(function(){
      var bqian = '';
      var jn='';
      $(".my_skill b").each(function(){
         bqian += $(this).html()+'|';
         jn +='<p>'+$(this).html()+'</p>\n';
      })
      if(bqian ==''){layer.alert('请先添加标签！才能保存！');return false;}
      bqian = bqian.substring(0,bqian.length-1);
      $.post('ajax_no.htm', {skill_tags:bqian}, function(str)
      {
        if(str == 0){layer.alert('请先填写基本资料！'); return false;}
         $(".skill_con").html(jn);
         $(".good_skills").attr('rel',1);
         closeDiv('scjn');
      })
  })

  // 修改头像
  $(".modify_pic").click(function(){
    $(".pop_modify_pic").show();
    var window_height = $(window).height() + $(document).scrollTop();
      $('.black_overlay').css(
              {
                'background-color': 'rgba(0,0,0,0.8)', 
                'z-index' : 100, 
                'height': window_height+'px', 
                'display':'block'
              }
      ); 
    });

  $(".op").click(function(){
    $(".pop_modify_pic,.black_overlay").hide();
  });

  // 上传文件
  // $(".ruk").click(function(){
  //   $(".pop_modify_pic_t").show();
  //   var window_height = $(window).height() + $(document).scrollTop();
  //     $('.black_overlay').css(
  //             {
  //               'background-color': 'rgba(0,0,0,0.8)', 
  //               'z-index' : 100, 
  //               'height': window_height+'px', 
  //               'display':'block'
  //             }
  //     ); 
  //   });


  $(".op").click(function(){
    $(".pop_modify_pic_t,.black_overlay").hide();
  });


  // 确定按钮
$(".but_su").click(function(){
  $(".detail_middle_sc").show();
  $(".jl_whole").hide();
   $(".pop_modify_pic_t,.black_overlay").hide();
})


  // 删除上传文件
  $(".delete").click(function(){
      $(".detail_middle_sc").hide();
  $(".jl_whole").show();
  })



  // 删除头像
  $(".delete_pic").click(function(){
    layer.confirm('确定要删除照片？', function(index){
      $.post('ajax_no.htm', {delte_img:1}, function(str){
         if(str == 0)
         {
            layer.alert('请先上传头像！');
         }else{
            $(".head_img").find('img').attr('src','images/touxiang.png');
         }
      });
      layer.close(index);
    })
  });

  // 动态生成年份和月份
  var years = create_year();
  $("select.year").append(years);
 //出生年份
  var birth_year_f = $("#birth_year").attr('rel');
  if(birth_year_f !='')
  {
      $("#birth_year option:first").attr('selected',false);
      $("#birth_year option[value="+birth_year_f+"]").attr('selected','selected');
  }
  var months = create_month();
  $("select.month").append(months);

// 点击空白处 弹出框隐藏

$(".cb_more").click(function(e){
  e.stopPropagation();
});

$(".black_overlay").click(function(){
  // alert($(".cb_more").css('display'));

        if($(".black_overlay").css('display')=='block'){
          // alert("p");
            $(".black_overlay").hide();
             $(".cb_more").hide();
                $(".cb_more_zw").hide();
                   $(".cb_more_area").hide();
             $(".pop_modify_pic").hide();
                $(".pop_modify_pic_t").hide();
        }               
    });
//jibenziliao 基本资料取消

  $("#jibenziliao .btn_cancle").click(function(){
    var is_s = $("#jibenziliao").attr('rel');
    if(is_s =='')
    {
       layer.alert('请填写基本资料！');
       return false;
    }else
    {
       closeDiv('jibenziliao');
    }
  })

//基本资料保存
$("#basics_info .btn_save").click(function(){
     /*var ss= {uname:'你猜',birth:'2015',phone:'17710062936',email:'909933794@qq.com',sex:'1',marriage:'0',work_year:'0',often_address:'上海'};*/
     var jsonStr = check_form1();
     if(jsonStr == false){return false;}
      $.ajax({
        type:'post',
        url: "ajax_no.htm",
        data: jsonStr,
        dataType: 'json',
        success: function(msg)
        { 
           $("#jibenziliao").attr('rel',1);
           $(".user_name").find('span').html(jsonStr['uname']);
           $(".user_place").find('span').html(jsonStr['often_address']);
           $(".user_other span").eq(0).html($("#sex_label .select").prev().val());
           $(".user_other span").eq(1).html(jsonStr['birth']+'年');
           $(".user_other span").eq(2).html($(".edu_bg").find('option:selected').text());
           $(".user_other span").eq(3).html($("#marriage").find('option:selected').text());
           $(".user_other span").eq(4).html($("#work_year").find('option:selected').text());
           $(".user_other span").eq(5).html(jsonStr['phone']);
           $(".user_other span").eq(6).html(jsonStr['email']);

           closeDiv('jibenziliao');
        },
        error:function(){   
            alert('error');   
        }

    });
     //alert(encoded);


})



//基本资料 常住地区
  $("#place").focus(function(){
    $(".cb_more_area .list span").removeClass('select_color');
    var palce = $(this).val();
    if(palce)
    {
       $(".cb_more_area .list").find('span:contains('+palce+')').addClass('select_color'); 
    }
    $(".cb_more_area").attr('rel','place');
    fun2();
  });

  //基本资料 常住地区 选项
  $(".cb_more_area .list").click(function(){
     var obj = $(this);
     diqu_public(obj,$(".cb_more_area").attr('rel'));
  })


  ////职业意向提交
  $("#yixiang .btn_save").click(function(){
      var jsonStr=check_form3();
      if(jsonStr == false){return false;}
      $.ajax({
        type:'post',
        url: "ajax_no.htm",
        data: jsonStr,
        dataType: 'json',
        success: function(msg)
        { 
          if(msg == 0){layer.alert('请先填写基本资料！'); return false;}
           $("#zhiye .will_value").eq(0).html(jsonStr['wish_industry']);
           $("#zhiye .will_value").eq(1).html($("#expect_job").val());
           $("#zhiye .will_value").eq(2).html(jsonStr['wish_job_address']);
           $("#zhiye .will_value").eq(3).html(jsonStr['wish_salary']+'元');
           closeDiv('yixiang');
        },
        error:function(){   
            alert('error');   
        }

    });
  })

//
if(trade_arr!="") 
{
   var str ='';
   var cat_arr ='';
/*   var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } */
   if(cat_arr=="")
   {
        $.each(trade_arr,function(j,row){ 
          
          if(j%3 ==0)
          {
             str +='<tr>';
          }
          
          str +='<td class="list"><span rel="'+row.letter+'">'+row.name+'</span></td>';
          
          if(j%3==2)
          {
            str +='</tr>';
          }      
        })  
      
   }else
   {
      $.each(trade_arr,function(j,row){ 
           //console.log(+'==\n');
          //console.log(row+'==='+vv+'\n');
            if(j%3 ==0)
            {
               str +='<tr>';
            }
            if($.inArray(row.name,cat_arr) !=-1)
            {
                str +='<td class="list"><span class="select_color" rel="'+row.letter+'">'+row.name+'</span></td>';
            }else{
                str +='<td class="list"><span rel="'+row.letter+'">'+row.name+'</span></td>';
            }
               
            if(j%3==2)
            {
              str +='</tr>';
            } 
        })
}
   //alert(str);
   $("#tr_trade").html(str);
}

//
});




//只有选择一个地区的
function diqu_public(obj,c)
{
    var is_c = obj.find('span').hasClass('select_color');
    if(is_c == true)
    {
      obj.find("span").removeClass("select_color");
      return false;
    }

    obj.find("span").addClass("select_color");
    $("#"+c).val(obj.find("span").html());
    $(".btn2").click();  
}

function create_year()
{ 
  var d = new Date();
  var cur_year = parseInt(d.getFullYear());
  var nums = cur_year - 1949;
  var years = '';

    for(var i = cur_year; i >= 1949; i--)
    {
        years += '<option value="'+i+'">'+i+'年</option>';
    }   
  return years;
}

function create_month(){
  var months = '';
  for(var i=1; i<=12; i++){
    months += '<option value="'+i+'">'+i+'月</option>';
  }
  return months;
}

function closeDiv(obj){
  $("#"+obj).hide();
  $("#"+obj).siblings('.my_resumeinfo').show();
}

function openDiv(obj)
{
  if(obj == 'scjn'){$("#scjn .p_search").find('input').val('');}
  $("#"+obj).show();
  $("#"+obj).siblings('div').hide();
}



function pop_jobs(id, datas)
{
    var info = datas[0];
    var str_zhiwei = "";
    $.each(info,function(i,row){  
        //console.log(i);
        str_zhiwei += '<tr class="whole">';
        str_zhiwei += '<th style="width:222px;border: 1px solid #ccc;font-size: 14px;">'+i+'</th>';
        str_zhiwei += '<td style="border: 1px solid #ccc">';
        str_zhiwei += '<table style="width:100%;margin-bottom:5px">';
        $.each(row,function(j,row2){ 
          //console.log(j%3);
          if(j%3 ==0)
          {
            str_zhiwei +='<tr>';
          }
          
          //console.log(row2);
          ch = row2.split("|"); 
          str_zhiwei +='<td class="list"><span class="zid_'+ch[0]+'" rel="'+ch[0]+'">'+ch[1]+'</span></td>';
          
          if(j%3==2)
          {
            str_zhiwei +='</tr>';
          }     
        })
        
        str_zhiwei +='</table></td></tr>';
    });
    
    $("#zhiwei_str").html(str_zhiwei);
}
//console.log(trade_arr)

function get_html_str(d)
{
  //return false;
   var str ='';
   var cat_arr ='';
   /*var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } */
   if(cat_arr=="")
   {
        $.each(d,function(j,row){ 
          if(j%3 ==0)
          {
             str +='<tr>';
          }
              
          str +='<td class="list"><span>'+row+'</span></td>';
          
          if(j%3==2)
          {
            str +='</tr>';
          }      
        })  
      
   }else
   {
      $.each(d,function(j,row){ 
            if(j%3 ==0)
            {
               str +='<tr>';
            }
            if($.inArray(row,cat_arr) !=-1)
            {
                str +='<td class="list"><span class="click_color">'+row+'</span></td>';
            }else{
                str +='<td class="list"><span>'+row+'</span></td>';
            }
               
            if(j%3==2)
            {
              str +='</tr>';
            } 
        })
}
   $("#tr_trade").html(str);

}


function fun(){
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

}

//地区
function fun2()
{
    $(".cb_more_area").show();
    var window_height = $(window).height() + $(document).scrollTop();
    $('.black_overlay').css(
            {
              'background-color': 'rgba(0,0,0,0.8)', 
              'z-index' : 100, 
              'height': window_height+'px', 
              'display':'block'
            }
    ); 

}

function fun3(){
    $(".cb_more_zw").show();
   var window_height = $(window).height() + $(document).scrollTop();
        $('.black_overlay').css(
                {
                  'background-color': 'rgba(0,0,0,0.8)', 
                  'z-index' : 100, 
                  'height': window_height+'px', 
                  'display':'block'
                }
        ); 

}
// 基本信息
  function check_form1()
  {
     //性别
     var j_arr={};
     var sex =  $("#sex_label .select").attr('rel');
     var marriage = $("#marriage").val();
     var work_year = $("#work_year").val();
     var edu_bg = $(".edu_bg").val();
     var check1  = ChkEmpty(real_name, '请输入您的真实姓名');
     if(check1 == false){ return false;}

     var check2  = CheckChinese(real_name, '姓名由汉字组成');
     if(check2 == false){ return false;}

     var check3  = ChChinese(real_name,'请输入2-5个字符');
     if(check3 == false){ return false;}

     var check4  = ChkEmpty(birth_year, '请选择您的出生年份');
     if(check4 == false){ return false;}

     var check5  = ChkEmpty(mobile, '请输入您的手机号');
     if(check5 == false){ return false;}

     var check6  = ChkMobile(mobile, '手机号格式不正确');
     if(check6 == false){ return false;}

     var check7  = ChkEmpty(email, '请输入您的邮箱');
     if(check7 == false){ return false;}

     var check8  = ChkEmail(email, '邮箱格式不正确');
     if(check8 == false){ return false;}

     var check9  = ChkEmpty(place, '请选择您的常住地区');
     if(check9 == false){ return false;}


     //var str  = "uname:'"+check1+"',birth:'"+check4+"',phone:'"+check5+"',email:'"+check7+"',sex:'"+sex+"',marriage:'"+marriage+"',work_year:'"+work_year+"',often_address:'"+check9+"'";
     j_arr['uname'] = check1;
     j_arr['birth'] = check4;
     j_arr['phone'] = check5;
     j_arr['email'] = check8;

     j_arr['sex'] = sex;
     j_arr['marriage'] = marriage;
     j_arr['work_year'] = work_year;
     j_arr['education'] = edu_bg;
     j_arr['often_address'] = check9;
     //alert(str);
     return j_arr;      
  }

// 职业意向
  function check_form3()
  {
      var j_arr={};
      var check1 =  ChkEmpty(expect_trade, '请选择您期望的行业');
      if(check1 == false){return false;}

      var check2 =  ChkEmpty(expect_job, '请输入您期望的职位');
      if(check2 == false){return false;}

      var check3 =  ChkEmpty(expect_city, '请选择您期望的工作地点');
      if(check3 == false){return false;}

      var check4 =  ChkEmpty(expect_salary, '请输入您期望的薪资');
      if(check4 == false){return false;}

      var check5 =  ChkInteger(expect_salary,'请按格式要求填写正确的数字');
      if(check5 == false){return false;}
      j_arr['wish_industry'] = check1;
      j_arr['wish_jobid'] = $("#expect_job").val();
      j_arr['wish_job_address'] = check3;
      j_arr['wish_salary'] = check5;

      return j_arr;
  }



//图片
function pic_show(s)
{
   //$("#pic_show").html(s);
   $(".head_img").find('img').attr('src',s);
   $(".pop_modify_pic,.black_overlay").hide();
}

function get_marriage(s)
{
  if(s == 0)
  {
    document.write('保密');
  }else if(s == 1)
  {
    document.write('未婚');
  }else
  {
    document.write('已婚');
  }
}

function get_work_year(s)
{
  if(s == 0)
  {
    document.write('应届毕业生');
  }else if(s==100)
  {
    document.write('10年以上');
  }else
  {
     document.write(s+'年');
  }
}

function get_work_status(s)
{
   if(s == 1)
   {
      document.write('正在找工作');
   }else if(s ==2)
   {
    document.write('在职，暂无跳槽打算');
   }else if(s == 3)
   {
     document.write('在职，急寻新机会');
   }else
   {
    document.write('在职，看看新机会');
   }
}

// 学历
function get_edu(s)
{
   var edu = ['博士及以上','博士','硕士','本科','大专','大专及以下'];
   document.write(edu[s-1]);
}
//基本资料 学历
function get_edu2(s)
{
   var edu = ['中专','大专','本科','硕士','博士','其他'];
   document.write(edu[s]);
}


