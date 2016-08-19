//公共js
$(function(){
//seo_url
    $("#seo_url span").click(function(){
            var seo_index = $(this).index();
            if(seo_index == 0){
                window.location.href ="/admin/seo_list"
            }else{
                window.location.href = "/admin/seo_add"
            }
    });
})

// layer.alert 封装
function layer_alert(msg, url)
{
   if(url != '' && url != undefined)
   {
       layer.alert(msg, function(){
            window.location.href = url
       })
   }else{
        layer.alert(msg)
   } 
}

// ajax 封装
function ajax_func(args_url, args_data, obj)
{
    $.ajax({
        type:'post',
        url: '/admin/'+args_url,
        data: JSON.stringify(args_data),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(msg)
        {
            //执行字符串函数
            window[args_url](msg, obj)
        },
        error:function()
        {
            layer_alert('ajax error','')
        }
    })
}
        

// ajax 封装 分页
function ajax_func_page(args_data)
{
    // console.log(args_data)
    var args_url = args_data.api_url
    return $.ajax({
        type:'post',
        url: '/'+args_data.api_url,
        data: JSON.stringify(args_data),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(msg)
        {
            //执行字符串函数
            window[args_url](msg)
        },
        error:function()
        {
            layer_alert('ajax error','')
        }
    })
}



//ajax 回调函数
/*function api_login(d, obj)
{
    console.log(d)
    if(d.errcode == 0)
    {
        layer_alert('登录成功','/')
    }else
    {
        layer_alert('登录失败','')
    }
}*/

