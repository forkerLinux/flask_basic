var countdown=60; 
var obj_code,obj_type;
  var savestate = 1;
$(function(){

  $(document).keydown(function(e){
    if(e.keyCode == 13){ //绑定回车
    $("input").blur();  

     var user = $("#email_add");
     var obj_pwd = $("#psd");
     var code = $('#num_input'); 
           if((!user.is(e.target) && user.has(e.target).length === 0) && (!obj_pwd.is(e.target) && obj_pwd.has(e.target).length === 0) && (!code.is(e.target) && code.has(e.target).length === 0)){
                    $(".layui-layer-btn0").click();
           }            
    }
  });

$("#personal").click(function(){
    $("#enterprise").addClass("click_dz");
    $(this).removeClass("click_dz");
    $("#email_add").attr('placeholder','请输入手机号码');
    $("#email_add").val("");
  
})
$("#enterprise").click(function(){
    $("#personal").addClass("click_dz");
    $(this).removeClass("click_dz");
    $("#email_add").attr('placeholder','请输入邮箱');
    $("#email_add").val("");
  
})
	//登陆

 
  
                $("#savestate").attr('checked','checked');

        $("#savestate").click(function(){
            if(savestate == 1){
                
                  $("#savestate").removeAttr('checked');
                 savestate = 0;
          
               
            }
            else if(savestate == 0){
                $("#savestate").attr('checked','checked');
                 savestate = 1;
                 
            
            }

        })

    $(".go_job").click(function(event){
        var phone = $.trim($("#email_add").val());
        if(phone==""){
            //alert("账号不能为空！");
             layer.alert('账号不能为空！', {
              // closeBtn:0,
             title: '提示',
             yes: function(e){
              layer.close(e);
              $("#email_add").focus();
             }
            })
            return false;
        }
       var dl = 2;
       if(dl == 1)
       {
            var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
            if (!pattern.test(phone)) {
                alert("手机格式不正确！");
                return false;
            }        
       }else
       {
         var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
         if (!pattern.test(phone)) {
            layer.alert("邮箱格式不正确！",{
              title:'提示',
              yes:function(e){
                layer.close(e);
                $('#email_add').focus();
              }
            });
            return false;
         }
       }

        var pwd = $.trim($("#psd").val());
        if(pwd==""){
            //alert("密码不能为空！");
           layer.alert('密码不能为空！', {
             title: '提示',
             yes:function(e){
                layer.close(e);
                $('#psd').focus();
              }
            })
            return false;
        }

        if(pwd.length <6)
        {
           // alert("密码不能小于六位数！");
            layer.alert('密码不能小于六位数！', {
             title: '提示',
             yes:function(e){
                layer.close(e);
                $('#psd').focus();
              }
            })
            return false;
        }
        var num_input = $.trim($("#num_input").val());
        if(num_input==""){
            //alert("验证码不能为空！"+num_input);
            layer.alert("验证码不能为空！"+num_input, {
             title: '提示',
             yes:function(e){
                layer.close(e);
                $('#num_input').focus();
              }
            })
            return false;
        }
        
        var d_type = $("#ind_login p.click_dz").attr('rel');
        //alert(d_type); return false;  
        $.ajax({
            type:'post',
            url: "/company/api_login",
            data: JSON.stringify({email:phone,password:pwd,captcha:num_input,savestate:savestate}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
              var errcode = data['errcode'];
              console.log(data);
              if (errcode == 0) {
                  location.href="/company/";
              }
              if (errcode == 1){
                layer.alert('密码错误！', {
                    title: '提示',
                    yes:function(e){
                        layer.close(e);
                        $('#psd').focus();
                      }
                });
              }
              if (errcode == 2){
                layer.alert('用户名不存在！',{
                  title:'提示',
                  yes:function(e){
                    layer.close(e);
                    $('#email_add').focus();
                  }
                });
              }
              if (errcode == 4 || errcode == 5){
                layer.alert('验证码错误！', {
                    title: '提示',
                    yes:function(e){
                        layer.close(e);
                        $('#num_input').focus();
                        $('#num_input').val('');
                      }
                });
                $('#bt-img img').attr('src', '/company/checkcode?r='+Math.random());
              }
            },
            error:function(){   
                alert('error');   
            }
            
        });
    })

})


function setcodetime(obj)
{
   // alert(countdown);
    if (countdown == 0) 
    { 
        
        obj.attr("disabled",false);   
        if(obj_type ==1){  
            obj.removeClass('again'); 
        } else{obj.removeClass('modify'); }
        
        obj.text("获取验证码"); 
        countdown = 60; 
        return;
    } 
    else 
    { 
        if(obj_type ==1){  
            obj.addClass('again'); 
        } else{obj.addClass('modify'); }
        obj.attr("disabled", true); 
        obj.text("重发验证码(" + countdown + "s)"); 
        countdown--; 
    } 
    setTimeout(function() { setcodetime(obj) },1000);
}


