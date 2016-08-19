var countdown = 60;
var obj_code, obj_type;

$(function(){
    $('#btn_registerid').click(function(){
         window.location.href="/register";
    })
	// 登录
    $("#password").focus(function () { 
        var mobile = ChkMobile('username-p', '手机号格式不正确');
		if (!mobile) {return false;}            
    });
        $("#submit").removeAttr('disabled');
	//验证码获取焦点
  //   $("#validate").focus(function () {
  //   	var password = ChkPassword('password', '密码不能小于6位');
  //   	if (!password) {
		// 	return false;
		// } else {
		// 	$("#submit").removeAttr('disabled');
		// }
  //   });
    // 换一换
    $(".img-check").click(function(){
		$(this).attr("src",'/checkcode?r=' + Math.random());
	});
	
	$('.change').click(function(){
		$('.img-check').click();
	});
	// 登录提交
	$("#submit").click(function () {
	    var phone = $("#username-p").val();
	    var pwd = $("#password").val();
	    // var validate = $("#validate").val() ;
	    // var savestate = $("#checkbox").is(":checked");
	    var ajax_url = '/api_login'
	     var success_url = $('#success_url').val();
	    // var data=JSON.stringify({phonenum:phone,password:pwd,captcha:validate,savestate:savestate});
        var data=JSON.stringify({phonenum:phone,password:pwd});
	    // if(validate == "" || validate.length!=4){
	    //     layer.alert('验证码错误', {
     //        	yes: function(e) {
     //            	layer.close(e)
     //           		$("#validate").focus();
     //        	}
     //    	});
	    //     return false;
	    // }else{
	        $.ajax({
	            type: "POST",
	            data: data,
	            url: ajax_url,
	            dataType: "json",
	            contentType: "application/json; charset=utf-8",
	            success: function (data) {
	                var errcode = data['errcode'];
	                if (errcode == 0) {
	                    if (data['data'] == 6) {
	                            window.location.href = '/cv_start';
	                    }else
	                    {
	                        window.location.href = success_url;
	                    }
	                }
	                 if (errcode==1) {
	                    layer.alert('密码错误！', {
			            	yes: function(e) {
			                	layer.close(e)
			               		$("#password").focus();
			            	}
			        	});
	                }
	                if (errcode == 2 || errcode == 3) {
	                    layer.alert('用户名不存在！', {
			            	yes: function(e) {
			                	layer.close(e)
			               		$("#username-p").focus();
			            	}
			        	});
	                }	               
	           //      if (errcode == 4 || errcode == 5){
	           //          layer.alert('验证码错误', {
			         //    	yes: function(e) {
			         //        	layer.close(e)
			         //       		$("#validate").focus();
			         //    	}
			        	// });
	           //      }	              
	                if(errcode == 6)
	                {
	                    window.location.href="/cv_start"
	                }
	                $('.img-check').attr('src', '/checkcode?r='+Math.random());
	        
	            },
	            error: function () {
	                layer.alert('error');
	            }
	        })
		// }
	});

	// 注册
	$("#psd").focus(function () { 
        var mobile = ChkMobile('email_add', '手机号格式不正确');
		if (!mobile) {return false;}            
    });
	//验证码获取焦点
    $("#verify_code").focus(function () {
    	var password = ChkPassword('psd', '密码不能小于6位');
    	if (!password) {return false;}      
    });

    $("#msg_code, #get_code").focus(function () {
    	var code = ChkEmpty('verify_code', '请输入图片验证码');
    	if (!code) {
			return false;
		} else {
			$(".go_register").removeAttr('disabled');
		}
    });
    //获取短信验证码
    $("#get_code").click(function() {
        obj_type = 1;
        obj_code = $(this);
        var phone = $.trim($("#email_add").val());
        var captcha = $("#verify_code").val()
    	obj_code.attr("disabled", true); 
    	var d_type = $("#ind_login p.click_dz").attr('rel');
    	$.ajax({
        	type: 'post',
        	url: "/api_msgcode",
        	data: JSON.stringify({ phonenum: phone, rtype: 1 , captcha: captcha}),
        	contentType: "application/json; charset=utf-8",
        	dataType: 'json',
        	success: function(data) {
            	var errcode = data['errcode'];
            	obj_code.attr("disabled", false);
            	if (errcode == 3) {
                	layer.alert('手机号已经存在！', {
                    	yes: function(e) {
                        	layer.close(e)
                       		$("#email_add").focus();
                    	}
                	});
            	}
	            if(errcode == 6){
	                layer.alert('验证码不正确', {
                    	yes: function(e) {
                        	layer.close(e)
                       		$("#verify_code").focus();
                    	}
                	});
	            }
	            if(errcode == 4){
	                layer.alert('短信发送失败，请联系管理员')
	            }
	            if (errcode == 0) {	
	                // 获取验证码倒计时
	                setcodetime(obj_code);
	            }
	        },
	        error: function() { 
	            layer.alert('error');
	        }
    	});
    });
	// 提交注册
	$(".go_register").click(function() {
        var phone = $.trim($("#email_add").val());
        var pwd = $.trim($("#psd").val());
        var verify_code = $.trim($("#verify_code").val());

        var msg_code = ChkEmpty('msg_code', '请输入短信验证码');
        if(!msg_code){return false;}

        var xieyi = $("#xieyi").is(":checked");
        if (xieyi == false) {
            layer.alert('请确认选择同意招聘服务条款！')
            return false;
        }
        $.ajax({
            type: 'post',
            url: "/api_register",
            data: JSON.stringify({ phonenum: phone, password: pwd, verify_code: msg_code }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                var errcode = data['errcode'];
                if (errcode == 0) {
                    window.location.href = '/';
                }
                if (errcode == 1) {
                    layer.alert('手机号已经存在！', {
                        yes: function(e) {
                            layer.close(e)
                            $("#email_add").focus();
                        }
                    });
                }
                if (errcode == 2 || errcode == 3) {
                    layer.alert('验证码错误！', {
                        yes: function(e) {
                            layer.close(e);
                            $("#msg_code").focus();
                        }
                    });
                }
            },
            error: function() {
                layer.alert('error')
            }

        });
    });
    // 忘记密码
    $("#forget_num").focus(function () { 
        var mobile = ChkMobile('email', '手机号格式不正确');
        if (!mobile) {return false;}            
    });

    $("#postcaptcha, #get_password_code").focus(function () {
        var code = ChkEmpty('forget_num', '请输入图片验证码');
        if (!code) {
            return false;
        } else {
            $(".sign_up_but_sign").removeAttr('disabled');
        }
    });
    // 获取短信验证码
    $("#get_password_code").click(function() {
        obj_type = 2;
        obj_code = $(this);
        var phone = $.trim($("#email").val());
        var captcha = $("#forget_num").val()
        obj_code.attr("disabled", true);
        $.ajax({
            type: 'post',
            url: "/api_msgcode",
            data: JSON.stringify({ phonenum: phone, rtype: 2, captcha: captcha }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                var errcode = data['errcode'];
                obj_code.attr("disabled", false);
                if (errcode == 3) {
                    layer.alert('手机号尚未注册！', {
                        yes: function(e){
                            layer.close(e);
                            location.href = '/register';
                        }
                    });                    
                }
                if (errcode == 0) {
                    setcodetime(obj_code);
                }
                if(errcode == 6){
                    layer.alert('验证码不正确', {
                        yes: function(e){
                            layer.close(e);
                            $('#forget_num').focus();
                        }
                    });
                }
                if(errcode == 4){
                    layer.alert('短信发送失败，请联系管理员')
                }
            },
            error: function() {  
                layer.alert('error')
            }
        });   
    });
    // 提交忘记密码
    $(".sign_up_but_sign").click(function(){
        var email = $.trim($("#email").val());
        var postcaptcha = ChkEmpty('postcaptcha', '请输入短信验证码');
        if(!postcaptcha){return false;}

        $.ajax({
            type:'post',
            url: "/api_forget_password",
            data: JSON.stringify({phonenum: email, verify_code: postcaptcha}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data){
              var errcode = data['errcode']
                if(errcode==1){
                    layer.alert('用户不存在！', {
                        yes: function(e){
                            layer.close(e);
                            $("#email").focus();
                        }
                    });
                 }else if(errcode == 2 || errcode == 3){
                    layer.alert('验证码错误！', {
                        yes: function(e){
                            layer.close(e);
                            $("#postcaptcha").focus();
                        }
                    })
                 }else if (errcode == 0) 
                 {
                    window.location.href="/reset_password?hex="+data['data'];
                 }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 重置密码
    $("#repwd").focus(function () {
        var password = ChkPassword('pwd', '密码不能小于6位');
        if (!password) {
            return false;
        } else {
            $("#save_reset_password").removeAttr('disabled');
        }
    });

});

function setcodetime(obj) {
    if (countdown == 0) {        
        obj.attr("disabled", false);   
        obj.removeClass('again');                
        obj.val("获取验证码");        
        countdown = 60;        
        return;    
    } else {
        obj.addClass('again');       
        obj.attr("disabled", true);        
        obj.val("重发验证码(" + countdown + "s)");        
        countdown--;    
    }
    setTimeout(function() { setcodetime(obj) }, 1000);
}

function check_reset_password() {
    var password = ChkPassword('pwd', '密码不能小于6位');
    if (!password) {
        return false;
    }

    var reset_password = $.trim($("#repwd").val());
    if (reset_password != password) {
        return pop_alert('repwd', '新密码和确认密码不一致！');
    }
    return true;
}