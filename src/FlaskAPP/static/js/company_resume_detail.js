var search_order_interval
var order_id = 0
var search_count = 0
var balace = 0
var daojishi_count = 3
var daojishi_interval
$(function(){
    balace = $(".cv_code").attr("rel")
    var cv_id = $(".cv_code").find("span").html()
    var post_id = $(".cv_code").find("span").attr('rel')

    $('.lock_contact').click(function(){
        $('.black_overlay').show();
        $('.look_panel').show();
    });
    $('.pop_panel .title img, .lock_close').click(function(){
        clearInterval(search_order_interval)
        $('.black_overlay').hide();
        $('.pop_panel').hide();
        $('.layui-layer-content').hide();
    });

//查看联系方式
    $('.lock_look').click(function(){
        if(balace < 1)
        {
            layer.alert('余额不足请先充值')
            return false;
        }
        $.ajax({
            type:'post',
            url: "/company/api_view_contact",
            data: JSON.stringify({cv_id:cv_id}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
               // console.log(data)
                if(data.errcode == 0){
                    $(".b_phone").html(data.data.phonenum)
                    $(".b_email").html(data.data.email)
                    $('.pop_panel .title img').click();
                    $('.phonenum, .email').show();
                    $('.lock_contact').hide();                    
                }
                if(data.errcode == 4){
                    layer.alert('余额不足请先充值');
                }
            },
            error:function(){
                alert('error');  
            }
        })

    });

//下载简历
    $('.lock_download').click(function(){
        if(balace < 1)
        {
            layer.alert('余额不足请先充值')
            return false;
        }
        $.ajax({
            type:'post',
            url: "/company/api_download_check",
            data: JSON.stringify({cv_id:cv_id}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {                
                var download_cv_url =  "/company/download_cv/"+cv_id+"/"+post_id;
                //console.log(data)
                if(data.errcode == 0){
                        if(data.data != 'yes'){
                         $(".b_phone").html(data.data.phonenum)
                         $(".b_email").html(data.data.email)  
                                 $('.lock_contact').hide();                   
                            $('.pop_panel .title img, .lock_close').trigger("click");
                            window.location.href = download_cv_url;
                        }                   
                }
                if(data.errcode == 4){
                    layer.alert('余额不足请先充值');
                }
            },
            error:function(){
                alert('error');  
            }
        })

    });

//充值成功
$("#pay_success").click(function(){
    $('.black_overlay').show();
    $(".success_panel").show()
})


//
    $('.download_cv').click(function(){
        $('.black_overlay').show();
        $('.confirm_panel').show();
    });
    //下载确认
    $('.lock_confirm').click(function(){
        
        $.ajax({
            type:'post',
            url: "/company/api_download_check",
            data: JSON.stringify({cv_id:cv_id}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
                //console.log(data)
                var download_cv_url =  "/company/download_cv/"+cv_id+"/"+post_id;
                if(data.errcode == 0){
                        if(data.data == 'yes'){
                            $('.pop_panel .title img, .lock_close').trigger("click");
                            window.location.href = download_cv_url;
                        }else{
                            $('.confirm_panel').hide();
                            $('.download_panel').show();                           
                        }                  
                }else{
                            $('.confirm_panel').hide();
                            $('.download_panel').show();   
                        }
            },
            error:function(){
                alert('error');  
            }
        })
    });
    //微信充值
    $('.lock_pay').click(function(){
        var obj = $(this);
        $.ajax({
            type:'post',
            url: "/company/ordercode",
            data: JSON.stringify({f:1}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
               order_id = data.order_id
               search_count = 0
               search_order()
               search_order_interval = setInterval("search_order()", 3000)
               $("#weixin_code").attr("src",data.paycode)
              obj.parent().parent().parent().parent().hide();
              $('.rechange_panel').show();
            },
            error:function(){
                alert('error');  
            }
        })
        
    });

    //选择支付金额
    $(".choose_money span").click(function(){
        var pay_type = $(this).attr("rel")
        var obj = $(this)
         $.ajax({
            type:'post',
            url: "/company/ordercode",
            data: JSON.stringify({f:pay_type}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
                order_id = data.order_id
                search_count = 0
                $(".choose_money span").removeClass("checked")
                obj.addClass("checked")
               $("#weixin_code").attr("src",data.paycode)
            },
            error:function(){

                alert('error');  
            }
        })       
    })
    //添加标签
    $('.lock_add_tag').hover(function(){
        $(this).next().show();
    }, function(){
        $(this).next().hide();
    });
    $('.lock_add_tag').click(function(){
        $('.black_overlay').show();
        $('.tag_panel').show();
        var len = $(this).siblings('.all_tag').find('.tag_con').length;
        var tag = '';
        for(var i=0; i<len; i++){
            var con = $(this).siblings('.all_tag').find('.tag_con:eq('+i+')').html();
            var id = $(this).siblings('.all_tag').find('.tag_con:eq('+i+')').data('rel');
            tag += '<p><span data-rel="'+id+'">'+con+'</span><img src="/static/images/delete_tag_icon.png?v=1"></p>';
        }
        $('.show_tag').html(tag);
        $('#tag').val('');
    });
    $('.btn_addtag').click(function(){
        var tag = $.trim($('#tag').val());
        if(tag == ''){
            return pop_tips2('tag', '请输入标签');
        }
        var len = $('.show_tag p').length;
        if(len >= 5){
            layer.alert('最多可添加5个标签', {
                yes: function(e){
                    layer.close(e);
                    $('#tag').val('');
                }
            });
            return false;
        }else{
            var post_id = $('.lock_add_tag').data('post');
            $.ajax({
                type: 'post',
                url: '/company/api_tag_add',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({'post_id': post_id, 'tag_name':tag}),
                success: function(data){
                    if(data.errcode == 0){
                        var tag_id = data.data;
                        $('.show_tag').append('<p><span data-rel="'+tag_id+'">'+tag+'</span><img src="/static/images/delete_tag_icon.png?v=1"></p>');
                        $('#tag').val('');
                        $('.lock_add_tag').prev('.all_tag').append('<span class="tag_con" id="my_tag_'+tag_id+'" data-rel="'+tag_id+'">'+tag+'</span>');
                    }
                }
            });
        }
    });
    $('.tag_panel').on('click', '.show_tag img', function(){
        var obj = $(this);
        var tag_id = $(this).prev('span').data('rel');
        $.ajax({
            type: 'post',
            url: '/company/api_tag_delete',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({'post_tag_id': tag_id}),
            success: function(data){
                //console.log(data)
                if(data.errcode == 0){
                    obj.parent().remove();
                    $('.lock_add_tag').prev('.all_tag').children('#my_tag_'+tag_id).remove();
                }
            }
        });
    });
    // 一键通知
    $('.cv_notify').click(function(){
        $('.black_overlay').show();
        $('.rechange_panel_2').show();                      
    });
    $('.notice_tab .notice_type').click(function(){
        $('.notice_tab .notice_type').removeClass('selected');
        $(this).addClass('selected');

        $('.form1').toggleClass('formshow')
        $('.form2').toggleClass('formshow')

    })
    $('tr .notice_type').click(function(){
        $(this).toggleClass('selected');
    })
    $('.btn_publish').click(function(){
        send_invitation('paper');
    });
    $('.btn_publish_2').click(function(){
        send_invitation('interview');
    });
    // 通过和淘汰
    $('.cv_pass').click(function(){
        var id = $(this).data('rel');
        resume_pass([id], 'pass');
    });
    $('.cv_deny').click(function(){
        var id = $(this).data('rel');
        resume_pass([id], 'deny');
    });

});

function search_order(){
     if(search_count > 20)
     {
        console.log(search_count)
        clearInterval(search_order_interval)
        return false
     }
     $.ajax({
            type:'post',
            url: "/company/order_search",
            data: JSON.stringify({order_id:order_id}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
                search_count++;
                //console.log(data)
                if(data.code == 'success'){
                        clearInterval(search_order_interval)
                        balace = data.balance
                        daojishi_count = 3
                        $('.pop_panel .title img, .lock_close').trigger("click");
                        $('.black_overlay').show();
                        $(".success_panel").show()
                        $(".cv_code").attr("rel", balace)
                        $(".download_panel .blue").html(balace+"次")
                        $(".look_panel .blue").html(balace+"次") 
                        daojishi() 
                        daojishi_interval = setInterval("daojishi()", 1000)                                           
                }else if(data.code == 'fail'){
                    clearInterval(search_order_interval)
                    layer.alert("充值失败")
                }
              
            },
            error:function(){
                clearInterval(search_order_interval)
                alert('error');  
            }
        })
}

function daojishi()
{
    //console.log(daojishi_count)
    if(daojishi_count==0){
        $('.pop_panel .title img, .lock_close').trigger("click");
        clearInterval(daojishi_interval)
    }
    daojishi_count--;
}

function send_invitation(type){
    if(type == 'paper'){
       var info = check_inform();
    }else{
        var info = check_inform_2();
    }
    if (info == false) return false;
    //console.log(info)
    $.ajax({
        type: 'post',
        url: '/company/api_resume_email',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(info),
        success: function(data)
        {
            console.log(data)
            $('.rechange_panel_2').hide();
            $('.black_overlay').hide();
            if(data.errcode == 0){
                layer.alert('发送成功',{
                    yes:function(e){
                        layer.close(e);
                        window.location.reload()
                    }
                });
                return false;
            }
            if(data.errcode == 3 || data.errcode == 2){
                layer.alert('请先获取联系方式');
                return false;
            }
        },
        error:function(){
            alert('error')
        }
    })
}
function check_inform(){
    var arr_cid = $('.cv_job_name').data('post');
    var subject = check_empty('notice_title_input', '请填写主题');
    if(!subject) return false;

    var invite_time = check_date('notice_end_time', '请输入有效的日期格式');
    if(!invite_time) return false;

    var address = check_empty('notice_place_input', '请填写笔试地点');
    if(!address) return false;

    var contact = check_empty('notice_people_input', '请填写联系人');
    if(!contact) return false;

    var phone = check_mobile('notice_phone_input', '电话格式不正确');
    if(!phone) return false;

    var content = check_empty('job_duty', '请填写详细内容');
    if(!content) return false;

    return {
        'post_id':[arr_cid], 
        'invite_type':'paper',
        'subject': subject, 
        'invite_time': invite_time, 
        'contact': contact,
        'phone': phone,
        'address': address,
        'content': content,
    };
}
function check_inform_2(){
    var arr_cid = $('.cv_job_name').data('post');
    var subject = check_empty('notice_title_input_2', '请填写主题');
    if(!subject) return false;

    var invite_time = check_date('notice_end_time_2', '请输入有效的日期格式');
    if(!invite_time) return false;

    var address = check_empty('notice_place_input_2', '请填写面试地点');
    if(!address) return false;

    var contact = check_empty('notice_people_input_2', '请填写联系人');
    if(!contact) return false;

    var phone = check_mobile('notice_phone_input_2', '电话格式不正确');
    if(!phone) return false;

    var content = check_empty('job_duty_2', '请填写详细内容');
    if(!content) return false;

    return {
        'post_id':[arr_cid], 
        'invite_type':'interview',
        'subject': subject, 
        'invite_time': invite_time, 
        'contact': contact,
        'phone': phone,
        'address': address,
        'content': content,
    };
}
function resume_pass(arr_cid, status){
    $.ajax({
        type: 'post',
        url: '/company/api_resume_pass',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({'post_id':arr_cid, 'status':status}),
        success: function(data)
        {
            console.log(data)
            if(data.errcode == 0){
                window.location.reload();
            }
            if(data.errcode == 1){
                layer.alert('参数错误');
            }
        },
        error:function(){
            alert('error')
        }
    })
}