$(function(){
  $("input[name='phone']").blur(function(){
    var phone = $.trim($(this).val());
    //var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
    if(phone!="")
    {
        v_phone(phone);
    }else
    {
        layer.alert("请填写邮箱账号");
    }
  })

$(".email_check").click(function(){
    var phone = $.trim($("input[name='phone']").val());
    if(phone!="")
    {
        $(".company_name_tip").html(""); 
        $(".linkman_tip").html(""); 
        $(".moblie_tip").html(""); 
        v_phone(phone);
    }else
    {
        layer.alert("请填写邮箱账号");
    }
    
})
})

function hradd_form()
{
    var cid = $("input[name='company_id']").val();
    var cname = $.trim($("input[name='company_name']").val());
    var phone = $.trim($("input[name='phone']").val());
    var moblie = $.trim($("input[name='moblie']").val());
    var linkman = $.trim($("input[name='linkman']").val());
    if(cname == "")
    {
        layer.alert("请填写公司全称");
        return false;
    }
    if(phone=="")
    {
        layer.alert("请填写邮箱账号");
        return false;
    }
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
     if (!pattern.test(phone)) {
        layer.alert("邮箱格式不正确！");
        return false;
    }
    var v_p = $("input[name='phone']").attr('rel');
    if(v_p == 1)
    {
        layer.alert("这个邮箱已经绑定过");
        return false;
    }
    if(moblie=="")
    {
        layer.alert("请填写手机号");
        return false;
    }
    var pattern2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
    if (!pattern2.test(moblie)) {
        alert("手机格式不正确！");
        return false;
    }
    if(linkman == "")
    {
         layer.alert("请填写联系人");
         return false;
    }
    return true;
}

function v_phone(p)
{
    $.ajax({
        type:'post',
        url: "admin_hradd.htm",
        data: {v_phone:p},
        dataType: 'json',
        success: function(msg){
          if(msg ==2)
          {
             $(".email_tip").html("（不存在这个账号，可以绑定）");
          }else if(msg ==1)
          {
            $(".email_tip").html("已经绑定过不能重复绑定");
          }else
          {
             if(msg.status == 3){
                $(".email_tip").html("（已存在这个账号，但未绑定过投递企业，这次绑定将会覆盖之前的手机 联系人,企业名称）");
                if(msg.company_name)
                {
                   $(".company_name_tip").html("直投企业公司名称："+msg.company_name); 
                }
                if(msg.moblie)
                {
                   $(".moblie_tip").html("直投企业手机："+msg.moblie); 
                }
                if(msg.linkman)
                {
                   $(".linkman_tip").html("直投企业联系人："+msg.linkman); 
                }               
                
             }
          }
          $("input[name='phone']").attr('rel',msg);
        },
        error:function(){   
            alert('error');   
        }
        
    }); 
}

function error_alert(s)
{
    layer.alert(s);
}