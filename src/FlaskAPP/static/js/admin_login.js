$(function(){
    //登陆
    $(".go_login").click(function(){
        var phone = $.trim($("#email_add").val());
        if(phone==""){
           layer_alert("账号不能为空！");
            return false;
        }
        var pwd = $.trim($("#psd").val());
        if(pwd==""){
            layer_alert("密码不能为空！");
            return false;
        }
        if(pwd.length <6)
        {
            layer_alert("密码不能小于六位数！");
            return false;
        }
        var num_input = $.trim($("#num_input").val());
        if(num_input==""){
            layer_alert("验证码不能为空！"+num_input);
            return false;
        }
        var login_data = {email:phone,password:pwd,captcha:num_input}
        ajax_func('api_login', login_data, $(this))

    })  
//企业审核
    $(".audit_status a").click(function(){
         var status = $(this).attr("rel")
         var com_id = $(this).parent().attr("rel")
         var audit_data = {status:status,com_id:com_id}
         ajax_func('api_audit_company', audit_data, $(this))
    })
//企业状态搜索
$("#audit_status_company").change(function(){
    var this_status = $(this).val()
    var url_str = "/admin/company_audit?page=1"
     if(url_com != "")
     {
        url_str += '&com='+url_com
     }
     if(this_status !="")
     {
        url_str += '&status='+this_status
     }
    window.location.href = url_str
})
//企业公司名称搜索
$("#company_audit_sub").click(function(){
     var this_com = $.trim($("#search_name").val())
     var url_str = "/admin/company_audit?page=1"
     if(url_status != "")
     {
        url_str += '&status='+url_status
     }
     if(this_com !="")
     {
        url_str += '&com='+this_com
     }
    window.location.href = url_str
})

//audit_status_job 职位审核
  $(".audit_status_job a").click(function(){
     var status = $(this).attr("rel")
     var job_id = $(this).parent().attr("rel")
     var audit_data = {status:status,job_id:job_id}
     ajax_func('api_audit_job', audit_data, $(this))
})  

//职位公司名称搜索 job_audit_sub
$("#job_audit_sub").click(function(){
     var this_com = $.trim($("#search_name").val())
     var url_str = "/admin/job_audit?page=1"
     if(url_status != "")
     {
        url_str += '&status='+url_status
     }
     if(this_com !="")
     {
        url_str += '&com='+this_com
     }
    window.location.href = url_str
})
//audit_status_job 职位状态搜索
$("#audit_status_job").change(function(){
    var this_status = $(this).val()
    var url_str = "/admin/job_audit?page=1"
     if(url_com != "")
     {
        url_str += '&com='+url_com
     }
     if(this_status !="")
     {
        url_str += '&status='+this_status
     }
    window.location.href = url_str
})

//关闭职位详情
$(".compay_detail p").click(function(){
    $(".compay_detail").hide()
})
$(".look_com").click(function(){
    $(".compay_detail").show()
})

})

// 登录回调函数
function api_login(d, obj)
{
    if(d.errcode == 0)
    {
        layer_alert('登录成功','/admin')
    }
    if (d.errcode == 1){
         layer_alert('密码错误！');
     }
    if (d.errcode == 2){
         layer_alert('用户名不存在！');
     }
    if (d.errcode == 4 || d.errcode == 5){
         layer_alert('验证码错误！');
        $('#img_check').attr('src', '/admin/checkcode?r='+Math.random());
    }
}

//企业审核回调函数
function api_audit_company(d,obj)
{
     if(d.errcode == 0)
     {
         var data = d.data
         obj.parent().next().html(data.admin_user)
         obj.parent().next().next().html(data.current_time)
         if (data.status == 'allow'){
            obj.parent().html("<span>通过</span>")
        }else{
             obj.parent().html("<span style='color:red'>不通过</span>")
        }

     }
    if (d.errcode == 1){
         layer_alert('参数错误！');
     }
    if (d.errcode == 2){
         layer_alert('不存在这个公司！');
     }
    if (d.errcode == 3){
         layer_alert('邮件发送失败！');
     }
}

//职位审核回调函数
function api_audit_job(d,obj)
{
     if(d.errcode == 0)
     {
         var data = d.data
         obj.parent().next().html(data.admin_user)
         obj.parent().next().next().html(data.current_time)
         if (data.status == 'open'){
            obj.parent().html("<span>通过</span>")
        }else{
             obj.parent().html("<span style='color:red'>不通过</span>")
        }

     }
    if (d.errcode == 1){
         layer_alert('参数错误！');
     }
    if (d.errcode == 2){
         layer_alert('不存在这个职位！');
     }
}