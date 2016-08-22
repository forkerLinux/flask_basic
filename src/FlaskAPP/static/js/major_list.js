var search_order_interval
var order_id = 0
var search_count = 0
$(function(){

    //微信充值
    $('.lock_pay').click(function(){
        var obj = $(this);
        $.ajax({
            type:'post',
            url: "/invitecode",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
               order_id = data.order_id
               search_count = 0
               search_order()
               search_order_interval = setInterval("search_order()", 3000)
               $(".imgbox img").attr("src",data.paycode)
               $(".weixin_code").show()
            },
            error:function(){
                alert('error');  
            }
        })
        
    });

    //
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
            url: "/order_search",
            data: JSON.stringify({order_id:order_id}),
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            success: function(data)
            {
                search_count++;
                console.log(data)
                if(data.code == 'success'){
                        clearInterval(search_order_interval)
                         layer_alert("支付成功",'/major_list')
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