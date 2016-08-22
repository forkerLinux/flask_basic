var search_order_interval
var order_id = 0
var search_count = 0
var daojishi_count = 3
var daojishi_interval
$(function(){

    $('.rechange_panel .title img').click(function(){
        clearInterval(search_order_interval)
        $('.black_overlay').hide();
        $('.pop_panel').hide();
    });

    $('.success_panel .title img').click(function(){
        clearInterval(search_order_interval)
        window.location.reload()
        $('.black_overlay').hide();
        $('.pop_panel').hide();
    });

//充值成功
$("#pay_success").click(function(){
    $('.black_overlay').show();
    $(".success_panel").show()
})


    //微信充值
    $('.btn_pay').click(function(){
        $('.black_overlay').show();
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
    //
});

function search_order(){
    //console.log(search_count)
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
                        daojishi_count = 3
                        $('.rechange_panel .title img').trigger("click");
                        $('.black_overlay').show();
                        $(".success_panel").show()
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
        $('.success_panel .title img').trigger("click");
        clearInterval(daojishi_interval)
        window.location.reload()   
    }
    daojishi_count--;
}