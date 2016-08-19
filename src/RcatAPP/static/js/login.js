var countdown = 60;
var obj_code, obj_type;
var savestate = 1;

$(function() {
    // var window_height=$('html').height();
    // var con_height=$(".wrap").height();
    // if(con_height < window_height){
    //     $('.wrap').css('height', window_height+'px');
    //     $(".foot").addClass("navbar navbar-fixed-bottom");
    // } else {
    //     $(".foot").removeClass("navbar navbar-fixed-bottom");
    // } 

    $(document).keydown(function(e) {
        if (e.keyCode == 13) { //绑定回车
            $("input").blur();

            var user = $("#email_add");
            var obj_pwd = $("#psd");
            var code = $('#num_input');
            // var conf = $('#psd_conf');
            var verify = $('#verify_code');
            var phone = $('#email');
            var postcaptcha = $('#postcaptcha');
            var pwd = $('#pwd');
            var repwd = $('#repwd');
            if ((!user.is(e.target) && user.has(e.target).length === 0) && (!obj_pwd.is(e.target) && obj_pwd.has(e.target).length === 0) && (!code.is(e.target) && code.has(e.target).length === 0) &&

                (!conf.is(e.target) && conf.has(e.target).length === 0) && (!verify.is(e.target) && verify.has(e.target).length === 0) &&
                (!phone.is(e.target) && phone.has(e.target).length === 0) && (!postcaptcha.is(e.target) && postcaptcha.has(e.target).length === 0) &&
                (!pwd.is(e.target) && pwd.has(e.target).length === 0) && (!repwd.is(e.target) && repwd.has(e.target).length === 0)
            ) {
                $(".layui-layer-btn0").click();
            }
        }
    });

    $("#personal").click(function() {
        $("#enterprise").addClass("click_dz");
        $(this).removeClass("click_dz");
        $("#email_add").attr('placeholder', '请输入手机号码');
        $("#email_add").val("");

    })
    $("#enterprise").click(function() {
            $("#personal").addClass("click_dz");
            $(this).removeClass("click_dz");
            $("#email_add").attr('placeholder', '请输入邮箱');
            $("#email_add").val("");

        })
        //登陆




    $("#savestate").attr('checked', 'checked');

    $("#savestate").click(function() {
        if (savestate == 1) {

            $("#savestate").removeAttr('checked');
            savestate = 0;


        } else if (savestate == 0) {
            $("#savestate").attr('checked', 'checked');
            savestate = 1;


        }

    })




    $(".go_job").click(function(event) {

        var phone = $.trim($("#email_add").val());
        if (phone == "") {
            //alert("账号不能为空！");

            layer.alert('账号不能为空！', {

                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email_add").focus();
                }

            })

            return false;
        }
        var dl = 1;
        if (dl == 1) {
            var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
            if (!pattern.test(phone)) {
                layer.alert("手机格式不正确！", {
                    title: '提示',
                    yes: function(e) {
                        layer.close(e)
                        $("#email_add").focus();
                    }
                });
                return false;
            }
        } else {
            var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (!pattern.test(phone)) {
                alert("邮箱格式不正确！");
                return false;
            }
        }

        var pwd = $.trim($("#psd").val());
        if (pwd == "") {
            //alert("密码不能为空！");
            layer.alert('密码不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#psd").focus();
                }
            })
            return false;
        }

        if (pwd.length < 6) {
            // alert("密码不能小于六位数！");
            layer.alert('密码不能小于六位数！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#psd").focus();
                }
            })
            return false;
        }
        var num_input = $.trim($("#num_input").val());
        if (num_input == "") {
            //alert("验证码不能为空！"+num_input);
            layer.alert("验证码不能为空！" + num_input, {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#num_input").focus();
                }
            })
            return false;
        }






        var d_type = $("#ind_login p.click_dz").attr('rel');
        //alert(d_type); return false;  

        $.ajax({
            type: 'post',
            url: "/api_login",
            data: JSON.stringify({ phonenum: phone, password: pwd, captcha: num_input, savestate: savestate }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                var errcode = data['errcode'];
                if (errcode == 0) {
                    // alert("success");
                    window.location.href = '/';
                }
                if (errcode == 1) {

                    layer.alert('密码错误！', {
                        title: '提示',
                        yes: function(e) {
                            layer.close(e)
                            $("#psd").focus();
                        }
                    });
                }
                if (errcode == 2) {
                    layer.alert('用户名不存在！', {
                        title: '提示',

                        yes: function(e) {
                            layer.close(e)
                            $("#email_add").val("");
                        }
                    });
                }
                if (errcode == 4 || errcode == 5) {
                    layer.alert('验证码错误！', {
                        title: '提示',
                        yes: function(e) {
                            layer.close(e)

                            $("#num_input").focus().val("");
                        }

                    });
                    $('#bt-img img').attr('src', '/checkcode?r=' + Math.random());

                }

            if (errcode == 7) {
                layer.alert('你已经被管理员禁止登录!', {
                    title: '提示',
                    yes: function(e) {
                        layer.close(e)
                    }
                });
            }
            },
            error: function() {
                alert('error');
            }

        });
    })

    //注册
    $(".go_register").click(function() {
        var phone = $.trim($("#email_add").val());
        if (phone == "") {
            //alert("账号不能为空！");
            layer.alert('账号不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email_add").focus();
                }
            })
            return false;
        }
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if (!pattern.test(phone)) {
            layer.alert('手机格式不正确！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email_add").focus();
                }
            })
            return false;
        }

        var pwd = $.trim($("#psd").val());
        if (pwd == "") {
            layer.alert('密码不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#psd").focus();
                }
            })
            return false;
        }
        if (pwd.length < 6) {
            layer.alert('密码不能小于六位数！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#psd").focus();
                }
            })
            return false;
        }
        var verify_code = $.trim($("#verify_code").val());
        if (verify_code == '') {
            layer.alert('验证码不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#verify_code").focus();
                }
            })
            return false;
        }
        var msg_code = $.trim($("#msg_code").val());
        if(msg_code == ""){
            layer.alert("短信验证码不能为空")
            return false
        }

        var xieyi = $("#xieyi").is(":checked");
        if (xieyi == false) {
            layer.alert('请确认选择同意招聘服务条款！', {
                title: '提示',
            })
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
                        title: '提示',
                        yes: function(e) {
                            layer.close(e)
                            $("#email_add").focus();
                        }
                    });
                }

                if (errcode == 2 || errcode == 3) {
                    layer.alert('验证码错误！', {
                        title: '提示',
                        yes: function(e) {
                            layer.close(e)
                            $("#msg_code").val("");
                            $("#msg_code").focus();
                        }
                    });
                }

            },
            error: function() {
                layer.alert('error', {
                    title: '提示',
                })
            }

        });

    });

    $('#msg_code').focus(function(){
        var phone = $("#email_add").val();
            var pwd = $("#psd").val();
            var conf_password = $("#psd_conf").val();
            if(phone!=""&&pwd!="" && conf_password != ''){
                $(".go_register").removeAttr('disabled');
            }
    });

    //获取验证码
    $("#get_code").click(function() {
        obj_type = 1;
        obj_code = $(this);
        var phone = $.trim($("#email_add").val());
        if (phone == "") {
            //alert("账号不能为空！");
            layer.alert('账号不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email_add").focus();
                }
            })
            return false;
        }
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if (!pattern.test(phone)) {
            //alert("手机格式不正确！");
            layer.alert('手机格式不正确！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email_add").focus();
                }
            })
            return false;
        }


        var captcha = $("#verify_code").val()
        if (captcha == "" || captcha.length != 4) {
            layer.alert('验证码格式错误！', {
                title: '提示'
            });
            return false
        } 

    obj_code.attr("disabled", true); 
    var d_type = $("#ind_login p.click_dz").attr('rel');
    $.ajax({
        type: 'post',
        url: "/api_msgcode",
        data: JSON.stringify({ phonenum: phone, rtype: 1 , captcha:captcha}),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data) {
            var errcode = data['errcode'];
            obj_code.attr("disabled", false);
            if (errcode == 3) {
                layer.alert('手机号已经存在！', {
                    title: '提示',
                    yes: function(e) {
                        layer.close(e)
                        $("#email_add").focus();
                    }
                });
            }

            if(errcode == 6){

                layer.alert('验证码不正确')
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
            //alert('error');   
            layer.alert('error', {
                title: '提示',
            })
        }

    });
       
    })


    //获取忘记密码的 短信 get_password_code
    $("#get_password_code").click(function() {
        obj_type = 2;
        obj_code = $(this);
        var phone = $.trim($("#email").val());
        if (phone == "") {
            //alert("手机号不能为空！");
            layer.alert('手机号不能为空！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email").focus();
                }
            })
            return false;
        }
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if (!pattern.test(phone)) {
            // alert("手机格式不正确！");
            layer.alert('手机格式不正确！', {
                title: '提示',
                yes: function(e) {
                    layer.close(e)
                    $("#email").focus();
                }
            })
            return false;
        }
        var captcha = $("#forget_num").val()
        if (captcha == "" || captcha.length != 4) {
            layer.alert('验证码格式错误！', {
                title:' 提示'
            });
            return false
        }
        obj_code.attr("disabled", true);
        $.ajax({
            type: 'post',
            url: "/api_msgcode",
            data: JSON.stringify({ phonenum: phone, rtype: 2,captcha:captcha }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                var errcode = data['errcode'];
                obj_code.attr("disabled", false);
                if (errcode == 3) {
                    layer.alert('手机号尚未注册！');
                    location.href = '/register';
                }
                if (errcode == 0) {
                    setcodetime(obj_code);

                }
                if(errcode == 6){
                    layer.alert('验证码不正确')
                }
                if(errcode == 4){
                    layer.alert('短信发送失败，请联系管理员')
                }
            },
            error: function() {
                //alert('error');  
                layer.alert('error', {
                    title: '提示',
                })
            }

        });
        
    })


    //忘记密码——修改密码
    $("#Submit").click(function() {
        var pwd = $.trim($("#pwd").val());
        var repwd = $.trim($("#repwd").val());
        if (pwd == "") {
            //alert("密码不能为空！");
            layer.alert('密码不能为空！', {
                title: '提示',
            })
            return false;
        }
        if (pwd.length < 6) {
            // alert("密码不能小于六位数！");
            layer.alert('密码不能小于六位数！', {
                title: '提示',
            })
            return false;
        }

        if (pwd != repwd) {
            //alert("新密码和确认密码不一致！");
            layer.alert('新密码和确认密码不一致！', {
                title: '提示',
            })
            return false;
        }

        $.ajax({
            type: 'post',
            url: "/api_reset_password",
            data: JSON.stringify({ password: pwd, confirm_pwd: repwd }),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                var errcode = data['errcode'];
                if (errcode == 0) {
                    layer.alert('密码修改成功！', { title: '提示' });
                    location.href = '/login';
                }
                if (errcode == 1) {
                    layer.alert('密码不一致！', {
                        title: '提示',
                        yes: function(e) {
                            layer.close(e)
                            $("#new_pass2").focus();
                        }
                    });
                }
                if (errcode == 2) {
                    layer.alert('手机验证码已超时！', {
                        title: '提示',
                        yes: function(e) {
                            layer.close(e);
                            $("#postcaptcha").val("");
                            $("#postcaptcha").focus();
                        }
                    });
                    location.href = '/forget_password';
                }

            },
            error: function() {
                layer.alert('error', {
                    title: '提示',
                })
            }

        });

    })

})


function setcodetime(obj) {
    if (countdown == 0) {
                
        obj.attr("disabled", false);   
        if (obj_type == 1) {
            obj.removeClass('again');
        } else { obj.removeClass('modify'); }
                
        obj.val("获取验证码");        
        countdown = 60;        
        return;    
    } else {
        if (obj_type == 1) {
            obj.addClass('again');
        } else { obj.addClass('modify'); }        
        obj.attr("disabled", true);        
        obj.val("重发验证码(" + countdown + "s)");        
        countdown--;    
    }
    setTimeout(function() { setcodetime(obj) }, 1000);
}
