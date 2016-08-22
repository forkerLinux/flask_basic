$(function(){
user_redis('lock_applyjob',1);
user_redis('lock_like',2);

$(".edit_info").click(function(){
  $(".advanced_search").show();
  $(".detail").hide();
})

//点击行业筛选展开职位为
$("#trade_id").click(function(e)
{
    show_panel('black_overlay', 'pop_trade');
    var trade = $.trim($(this).html());
    $('.trade span:contains('+trade+')').addClass('select');
});
//点击地区筛选展开
$("#area_id").click(function(e)
{
    show_panel('black_overlay', 'pop_area');
    var province = $('.province').data('province');
    var city = $.trim($(this).html());
    if(province == '') {
        create_province('北京');
    }else{
        create_province(province);
        $('.city li:contains('+city+')').addClass('select');
    }
});


    $(".black_overlay, .p_panel .cancel").click(function(){
        close_panel('black_overlay', 'p_panel');            
    });
 // 选择地区

    // 市
    $('body').on('click', '.province li', function(){
        var province = $.trim($(this).html());
        $('.province').data('province', province);
        create_province(province);
    });
    $('body').on('click', '.city li', function(){
        var city = $(this).html();
        $('#area_id').html(city);
        $(this).toggleClass('select');
        $('.p_panel .cancel').click();
    });


//薪资范围 点击展开显示
$(".condition1 .other_salary>p").click(function()
{
    $(this).next("div").toggle();
})

//选择薪资范围 选择了之后隐藏 
$(".cb_list>span").click(function()
{
    $(".condition1 p").html($(this).html());
    $(".condition1 p").attr('rel',$(this).attr('rel'));
    $(".cb_list").hide();
})
//  if($("#zhiwei_id input").val() == "" || $(".fill_in p").html() == "请选择行业领域"){

//   $(".button .cancel").removeClass("cancel").CaddClass("back_cancel");
// }
// else{
//   $(".button .cancel").addClass("cancel").removeClass("back_cancel");

// }

//时间选择
$(".delete_info").click(function(){
    //删除
   $(".advanced_search").show();
  $(".detail").hide();

 
      $.post('/api_del_subscribe', {'subscribe':1}, function(str){
          var errcode = str.errcode;

            if(errcode == 0)
            {
		window.location.reload();
		$('#zhiwei_id input').val('');
            }
            else if (errcode == 1) {
              layer.alert('登录超时请重新登录！', {
               title: '提示',
              })
                  window.location="/login";
            }
          else if (errcode == 2) {
            layer.alert('清空失败！', {
               title: '提示',
              })
               
          }
      }, "json");
   

})

// tr_trade 职位点击选中国
$("#tr_trade").on('click',".list",function()
{
    var is_c = $(this).find('span').hasClass('select');
    if(is_c == true)
    {
      $(this).find("span").removeClass("select");
      return false;
    }
    var num = $(".trade .select").size();
    if(num >4)
    {
      layer.alert('最多可以选择5个', {
               title: '提示',
      })
      return false;
    }
    $(this).find("span").addClass("select");
})

$(".button .cancel").click(function(){
   $(".advanced_search").hide();
  $(".detail").show();
})


//
//职位选中
$("#zhiwei_str .list").click(function()
{
    var is_c = $(this).find('span').hasClass('select');
    if(is_c == true)
    {
      $(this).find("span").removeClass("select");
      return false;
    }
    var num = $("#zhiwei_str .select").size();
    if(num >4)
    {
      layer.alert('最多可以选择5个', {
               title: '提示',
      })
      return false;
    }
    $(this).find("span").addClass("select");
})

//行业确定
$(".trade span").click(function(){
    var s_str=$(this).html();
    $("#trade_id").html(s_str);
    $("#trade_id").attr('rel',s_str);
    $(this).addClass('select').siblings().removeClass("select");
    $('.p_panel .cancel').click();
})

//保存
$("#form_button").click(function(){
  // var zhiwei_id = $.trim($("#zhiwei_id").attr('rel'));
   var zhiwei_str = $("#zhiwei_id").find("input").val();
   var trade = $.trim($("#trade_id").html());
   var area = $.trim($("#area_id").html());
   var trade_id = $.trim($("#trade_id").attr('rel'));
   var area_id = $.trim($("area_id").attr('rel'));

   // var salary = $.trim($(".condition1").find('p').attr('rel'));
   var salary_str = $(".condition1").find('p').html();
   var c_time = $(".checked").prev().val();
   if(zhiwei_str == undefined || zhiwei_str == '')
   {
      layer.alert('请输入订阅职位名称！', {
               title: '提示',
      })
      return false;
   }

   if(trade =='请选择行业领域')
   {
      layer.alert('请选择订阅行业领域！', {
               title: '提示',
      })
      return false;
      trade ='';
      trade_id ="";
   } 
    if(area =='请选择工作地点')
   {
      layer.alert('请选择订阅工作地点！', {
               title: '提示',
      })
      return false;
      area ='';
      area_id ="";
   } 


   if(salary_str == undefined || salary_str =='' || salary_str=='请选择薪资范围')
   {
      layer.alert('请选择订阅薪资范围！', {
               title: '提示',
      })
      return false;
      salary_str = '';
      salary_str ='';
   }

   post_data = {
       'search': zhiwei_str,
       'trade': trade,
       'salary': salary_str,
       'address': area
   }

    $.ajax({
        type:'post',
        url: "/api_subscribe",
        data: JSON.stringify(post_data),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(msg)
        { 
            var errcode = msg['errcode'];

            if (errcode == 0) {
                window.location.reload();
            }

            if (errcode == 1) {
                layer.alert('登录超时请重新登录!', {
                    title: '提示', 
                });
                location.href = '/logout';
            }

            if (errcode == 2) {
                layer.alert('保存失败!', {
                    title: '提示', 
                });
            }

        },
        error:function(){   
            alert('error');   
        }

    });

})


})

//职位
function pop_jobs(s,datas)
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
    var cat_id = $.trim($("#zhiwei_id").attr('rel'));
    if(cat_id)
    {
        var cat_arr = cat_id.split(","); 
         $.each(cat_arr,function(k,v){ 
             // console.log(".zid_"+v);
              $(".zid_"+v).addClass('select');
	  
         })
    }
}
//console.log(trade_arr);
function get_html_str2(trade_arr) 
{
   //alert(1)
   var str ='';
   var cat_arr ='';
   var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } 
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
                str +='<td class="list"><span class="select" rel="'+row.letter+'">'+row.name+'</span></td>';
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
//行业领域
function get_html_str(d)
{
   var str ='';
   var cat_arr ='';
   var trade_id = $.trim($("#trade_id").html());
    if(trade_id !='请选择行业领域')
    {
        cat_arr = trade_id.split(","); 
    } 
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
           //console.log(+'==\n');
          //console.log(row+'==='+vv+'\n');
            if(j%3 ==0)
            {
               str +='<tr>';
            }
            if($.inArray(row,cat_arr) !=-1)
            {
                str +='<td class="list"><span class="select">'+row+'</span></td>';
            }else{
                str +='<td class="list"><span>'+row+'</span></td>';
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


function user_redis(s,i){
  if(i == 1){var st_d = "&nbsp;已申请&nbsp;&nbsp;";}else{var st_d = "已收藏";}
  var inum = parseInt(i)-1;
  var job_i = $(".job_op a:eq("+inum+")").hasClass(""+s+"");
  if(job_i == false)
  {
    return false;
  }
  $.post("ajax_redis.htm",{indent:i},function(data){
     if(data.length>0)
     {
        data = eval(data);
        $.each(data,function(i,row){
          if($("#"+row).length > 0)
          {
            if(!$("#"+row).find("."+s).hasClass("apchange"))
            {
              $("#"+row).find("."+s).attr('rel',0);
              $("#"+row).find("."+s).addClass("apchange");
              $("#"+row).find("."+s).html(st_d);
            } 
          }
          
        })
      
     }
  })
}

