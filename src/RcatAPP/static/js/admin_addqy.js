$(function(){
  $("input[name='phone']").blur(function(){
    var phone = $.trim($(this).val()); 
    if(phone!="")
    {
        v_phone(phone);
    }else
    {
        layer.alert("请填写邮箱账号");
    }
  })

//检测
$(".email_check").click(function(){
    var phone = $.trim($("input[name='company_email']").val());
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
    var phone = $.trim($("input[name='company_email']").val());
    var moblie = $.trim($("input[name='contact_phone']").val());
    var linkman = $.trim($("input[name='contact']").val());
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
        layer.alert("已存在这个邮箱账号！");
        return false;
    }
    
/*    if(moblie=="")
    {
        layer.alert("请填写手机号");
        return false;
    }
    var pattern2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
    if (!pattern2.test(moblie)) {
        alert("手机格式不正确！");
        return false;
    }*/
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
        url: "/admin/api_check_email",
        data: JSON.stringify({email:p}),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(data){
          var errcode = data['errcode'];
          /*if(msg == 3)
          {
            $(".email_tip").html("（已存在这个账号，但未绑定过直投企业）");
          }else */if(errcode ==0)
          {
             $(".email_tip").html("（不存在这个账号，可以绑定）");
          }else if(errcode ==1)
          {
            $(".email_tip").html("已经绑定过不能重复绑定");
          }
          
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