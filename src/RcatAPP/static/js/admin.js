$(function(){

  var bd_f = $("#bding").attr('rel');
  if(bd_f)
  {
     $("#bding option").attr('selected',false);
     $("#bding option[value='"+bd_f+"']").attr('selected','selected');
  }

  var em_f = $("#email_code").attr('rel');
  if(em_f)
  {
     $("#email_code option").attr('selected',false);
     $("#email_code option[value='"+bd_f+"']").attr('selected','selected');
  }

  //企业类型 qy_type
  var qy_type = $("#qy_type").attr('rel');
  if(qy_type)
  {
     $("#qy_type option").attr('selected',false);
     $("#qy_type option[value='"+qy_type+"']").attr('selected','selected');
  }

	//后台管理 js
    //简历来源
    $("#nav_op_laiyuan li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var hr_id = $("#hr_id").val();
        var url = "admin_index.htm?t="+s_this;
        if(hr_id != "")
        {
            url += "&h="+hr_id;
        }
        if(f != ''){url += "&f="+f;} 
        window.location.href = url;
    });

    //搜索
    $(".search_button").click(function()
    {
        var hr_id = $("#hr_id").val();
        var three_id = $("#three_id").attr('rel');
        var url = "admin_index.htm?h="+hr_id;
        if(hr_id == '')
        {
            alert("搜索框不能为空！");
            return false;
        }
        if(three_id != "")
        {
            url += "&t="+three_id;
        }
        window.location.href = url;

    })

    //新增职位列表
    $("#nav_op_states li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_new_job_list.htm?ko=count_ul3&f="+s_this;
        var opt_s = $("#opstatus").attr('rel');
        if(opt_s != "")
        {
            url += "&o="+three_id;
        }
        window.location.href = url;
    })

    //新增职位列表
    $("#nav_op_opstatus li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_new_job_list.htm?ko=count_ul3&o="+s_this;
        var f_s = $("#stauts").attr('rel');
        if(f_s != "")
        {
            url += "&f="+f_s;
        }
        window.location.href = url;
    })  

    //已有职位列表
    $("#nav_op_states2 li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_job_list.htm?ko=count_ul3&f="+s_this;
        var opt_s = $("#opstatus").attr('rel');
        if(opt_s != "")
        {
            url += "&o="+three_id;
        }
        if(t != ''){url += "&t="+t;}
        window.location.href = url;
    })

    //已有新增职位列表
    $("#nav_op_opstatus2 li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_job_list.htm?ko=count_ul3&o="+s_this;
        var f_s = $("#stauts").attr('rel');
        if(f_s != "")
        {
            url += "&f="+f_s;
        }
        if(t != ''){url += "&t="+t;}        
        window.location.href = url;
    })  

    //nav_op_method已有新增职位列表
     $("#nav_op_method li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_job_list.htm?ko=count_ul3&t="+s_this;
        var f_s = $("#stauts").attr('rel');
        var opt_s = $("#opstatus").attr('rel');

        if(f_s != "") {url += "&f="+f_s;} 
        if(opt_s != "") {url += "&o="+opt_s;}       
        window.location.href = url;
    })    


    //new_job_list 新增职位列表
    $(".opt_click").click(function(){
        var opt = confirm("确定操作完成了吗？");
        if(opt == false) return false;
        var job_id = $(this).attr('rel');
        $.ajax({
        type:'post',
        url: "admin_new_job_list.htm",
        data: {job_id:job_id},
        dataType: 'json',
        success: function(msg){
          alert("操作完成");
          window.location.reload();
        },
        error:function(){   
            alert('error');   
        }
        
        });
    })

    //已有职位列表 opt_click_job
     $(".opt_click_job").click(function(){
        var opt = confirm("确定操作完成了吗？");
        if(opt == false) return false;
        var job_id = $(this).attr('rel');
        $.ajax({
        type:'post',
        url: "admin_job_list.htm",
        data: {job_id:job_id},
        dataType: 'json',
        success: function(msg){
          alert("操作完成");
          window.location.reload();
        },
        error:function(){   
            alert('error');   
        }
        
        });
    })   

     //admin_user 搜索
     $(".search_button_user").click(function()
    {
        var id = $("#hr_id").val();
        //alert(id);
        var phone = $("#phone").val();
        var reg_time = $('#reg_time').val();
        var bd = $("#bding").val();
        var em = $("#email_code").val();
        var qy = $("#qy_type").val();
        var url='admin_user.htm?s=1';
        if(id == '' && phone=='' && reg_time=='' && bd==0 && em==0 && qy==0)
        {
            window.location.href = url;
            return false;
        }
        if(em!=0)
        {
             url += "&em="+em;
        }
        if(qy!=0)
        {
             url += "&qy="+qy;
        }      
        if(bd!=0)
        {
             url += "&bd="+bd;
        }

        if(id!='')
        {
             url += "&id="+id;
        }
        if(phone != "")
        {
            url += "&e="+phone;
        }
        if(reg_time != "")
        {
            url += "&t="+reg_time;
        }
        window.location.href = url;

    })  

//点击发送邮件
    $(".fasong").click(function(){
        var aa = $(this).attr('rel');
        var cm = $.trim($(this).attr("cm"));
/*        if(cm == 0)
        {
            layer.alert("没有绑定企业，不能发送邮件");
            return false;
        }*/

        if(aa == "")
        {
          var user_id = $(this).parent().attr('rel');
          //window.location.href = "admin_email.htm?id="+user_id;    
           $.ajax({
            type:'post',
            url: "admin_email.htm",
            data: {id:user_id},
            dataType: 'json',
            success: function(msg){
              if(msg == 6)
              {
                layer.alert("邮件发送成功",function index(){
                    window.location.href="admin_user.htm?id="+user_id+'&em=1';
                });
                
              }else if(msg == 1)
              {
                layer.alert("不存在此帐号");
              }else if(msg == 2)
              {
                layer.alert("数据插入错误，请联系管理员");
              }else if(msg == 3)
              {
                layer.alert("邮件发送失败，请联系管理员");
              }else if(msg ==7)
              {
                layer.alert("之前存在的企业账号，已经有登录密码，不用激活");
              }else if(msg == 8)
              {
                layer.alert("没有绑定企业，不能发送邮件");
              }
              
            },
            error:function(){   
                alert('error');   
            }
            
            });        
        }
        return false;
    })
    //点击通过审核  推荐简历
    $(".shenhe_click a").click(function(){
        var id = $(this).parent().attr("rel");
        var is_yes = confirm("确定要操作吗？");
        var r_type = $(this).attr('rel');
        if(is_yes == false)
        {
            return false;
        }
        //alert(id+'==='+r_type); return false;
        $.ajax({
        type:'post',
        url: "admin_rec_list.htm",
        data: {j_id:id,type:r_type},
        dataType: 'json',
        success: function(msg){
          alert("操作完成");
          window.location.reload();
        },
        error:function(){   
            alert('error');   
        }
        
        });
    })  



    $(".admin_keys_audit").click(function(){
         var k_id = $(this).parent().attr('rel');
         if(k_id == "") return false;
         var is_yes = confirm('确定账号验证通过了吗？');
         if(is_yes == false)
         {
            return false;
         }
        $.ajax({
            type:'post',
            url: "admin_index.htm",
            data: {k_id:k_id},
            dataType: 'json',
            success: function(msg){
              //alert("操作完成");
              window.location.reload();
            },
            error:function(){   
                alert('error');   
            }
        
        });
    })


//点击手动改成失败 admin_keys_fail
     $(".admin_keys_fail").click(function(){
         var k_id = $(this).parent().attr('rel');
         if(k_id == "") return false;
         var is_yes = confirm('确定要改成失败吗！');
         if(is_yes == false)
         {
            return false;
         }
        $.ajax({
            type:'post',
            url: "ajax_admin.htm",
            data: {k_id:k_id},
            dataType: 'json',
            success: function(msg){
                if(msg.status == 999)
                {
                    alert('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
              window.location.reload();
            },
            error:function(){   
                alert('error');   
            }
        
        });
    })
//删除帐号 彻底删除 admin_keys_del
     $(".admin_keys_del").click(function(){
         var k_id = $(this).parent().attr('rel');
         if(k_id == "") return false;
         var is_yes = confirm('请谨慎操作！删除将彻底从数据库中删除！');
         if(is_yes == false)
         {
            return false;
         }
        $.ajax({
            type:'post',
            url: "ajax_admin.htm",
            data: {del_k_id:k_id},
            dataType: 'json',
            success: function(msg){
                if(msg.status == 999)
                {
                    alert('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
              window.location.reload();
            },
            error:function(){   
                alert('error');   
            }
        
        });
    })
    //账号列表状态搜索
    $("#nav_op_bstatus li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        var url = "admin_index.htm?f="+s_this;
        if(h != "")
        { 
            url += "&h="+h;
        }
        if(t != ''){url += "&t="+t;}     
        window.location.href = url;
    }) 

    //admin_user 总下载次数
    $(".admin_user_xiazai a").click(function(){
        $(this).hide();
        $(this).parent().find('input').show();
        $(this).parent().find('input').focus();
    })

    //admin_user 总下载次数 失去焦点 开始更新
    $(".admin_user_xiazai input").blur(function(){
        var admin_id = $(this).parent().attr('rel');
        var count = $(this).val();
        var obj = $(this);
        $(this).hide();
        $(this).parent().find('a').show();
        $.ajax({
            type:'post',
            url: "ajax_admin.htm",
            data: {admin_id:admin_id,count:count},
            dataType: 'json',
            success: function(msg){
                if(msg.status == 999)
                {
                    alert('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
               obj.val(count);
               obj.parent().find('a').html(count);
               //alert("更新完成");
            },
            error:function(){   
                alert('error');   
            }
        
        });
    })

    //添加代理地址
    $(".ip_daili").click(function(){

        var ip = $.trim($("#ip_name").val());
        if(ip == '')
        {
            alert("代理地址不能为空！");
            return false;
        }
       var pattern =/^10\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])$/;
       if(!pattern.test(ip))
       {
          alert('ip代理地址不正确！');
          return false;
       } 
        $.ajax({
            type:'post',
            url: "ajax_admin.htm",
            data: {ip_daili:ip},
            dataType: 'json',
            success: function(msg){
                if(msg.status == 999)
                {
                    alert('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
               if(msg == 2)
               {
                 alert('已存在此代理ip');
               }else
               {
                  alert('添加成功！');
                  window.location.reload();
               }
            },
            error:function(){   
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

function qudao(id){
    var ly = $(".laiyuan_"+id).html();
    document.write(ly);
}

function qudao2(id){
    var ly = $(".laiyuan_"+id).html();
    var t_url = $(".laiyuan_"+id).attr('u');
    document.write("<a href='"+t_url+"' style='cursor:pointer' target='_blank'>"+ly+"</a>");
}

//操作状态
function admin_index_status(s)
{
    if(s == 0)
    {
        document.write('<a style="cursor:pointer" alt="点击人工操作审核通过" title="点击人工操作审核通过" class="admin_keys_audit">正在绑定</a>');
    }else if(s == 1)
    {
        document.write('<a style="cursor:pointer" alt="点击人工操作审核通过" title="点击人工操作审核通过" class="admin_keys_audit">绑定失败</a>');
    }else if(s == 2)
    {
       document.write('绑定成功');
    }else
    {
        document.write('<a style="cursor:pointer" alt="点击人工操作审核通过" title="点击人工操作审核通过" class="admin_keys_audit">验证码绑定失败</a>');
    }
}

//邮件发送章台
function email_status(a)
{
    if(a == '')
    {
        document.write('未发送,点击发送');
    }else
    {
        document.write('已发送');
    }
}

