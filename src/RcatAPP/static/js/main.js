
//输入框的验证
$(function(){
    var regExt1 = /1[34578]\d{9}/;
    var regExt2 = /\w+@\w+([-]\w+)*(\.\w)+/;
    $("#password").focus(function () { 
            var phone = $("#username-p").val()
            if (phone == "") {
                $("#username-p").focus();
            } else if (phone != "" && phone.length < 11) {
                layer.alert('手机号码长度不够！', {
                    title: '提示'
                })
                $("#username-p").focus();
            } else if (!regExt1.test(phone)) {
                layer.alert('手机号码格式不正确！', {
                    title: '提示'
                })
                $("#username-p").focus();
            }
            $("#submit").removeAttr('disabled');
    })
//焦点到了验证码
    // $("#validate").focus(function () {
    //     var phone = $("#username-p").val();
    //     var pwd = $("#password").val();
    //     if(phone!=""&&pwd!=""){
    //         $("#submit").removeAttr('disabled');
    //     }
    //         if (phone == "" && pwd == "") {
    //             $("#username-p").focus();
    //         } else if (pwd == "") {
    //             $("#password").focus();

    //         } else if (pwd != "" && pwd.length < 6) {
    //             layer.alert('密码长度不够！', {
    //                 title: '提示'
    //             })
    //         } 
    // })
})

// //换验证码
// $(".img-check").click(function(){
//  $('.img-check').attr('src', '/checkcode?r='+Math.random());
// })
//获取验证吗结束

//提交表单
$("#submit").click(function () {
    var phone = $("#username-p").val();
    var pwd = $("#password").val();
    // var validate = $("#validate").val() ;
    // var savestate = $("#checkbox").is(":checked");
    if (phone == "" && pwd == "") {
                $("#username-p").focus();
     } else if (pwd == "") {
                $("#password").focus();

     } else if (pwd != "" && pwd.length < 6) {
                layer.alert('密码长度不够！', {
                    title: '提示'
                })
    } 
    var ajax_url = '/api_login'
    var success_url = $('#success_url').val();
    // var data=JSON.stringify({phonenum:phone,password:pwd,captcha:validate,savestate:savestate});
    var data=JSON.stringify({phonenum:phone,password:pwd});
    // if(validate == "" || validate.length!=4){
    //     layer.alert('验证码长度错误');
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
                        layer.alert('密码错误！');
                    }
                    if (errcode == 2 || errcode == 3) {
                        layer.alert('用户名不存在！');
                    }
                   
                    // if (errcode == 4 || errcode == 5){
                    //     layer.alert('验证码错误')
                    // }
                  
                    if(errcode == 6)
                    {
                        window.location.href="/cv_start"
                    }
                    $('.img-check').attr('src', '/checkcode?r='+Math.random());
                    if (errcode == 7)
                    {
                        layer.alert('你已经被管理员登录!');
                    }
            
                },
                error: function () {
                    layer.alert('error', {
                        title: '提示'
                    })
                }
            })
    // }
})
//表单提交结束
