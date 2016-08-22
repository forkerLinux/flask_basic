$(function(){
    $(".dropdown .toggle").click(function(e){
        e.stopPropagation();

    });
    $(document).click(function(){
        if($(".dropdown-menu").hasClass("show")){
            $(".dropdown-menu").removeClass("show");
            
        }               
    });
    $("#nav_op_state li a").click(function(){
        var obj = $(this);
        s_this = pub_select(obj);
        window.location.href = "rili.htm?f="+s_this;
    });

    $(".rili_detial_del").click(function(){
        var opt = confirm("确定要删除吗？");
        if(opt==false){
            return false;
        }
        var id = $(this).parent().attr('rel');
        $.ajax({
            type:'post',
            url: "ajax_rili.htm",
            data: {rili_id:id},
            dataType: 'json',
            success: function(msg){
            if(msg.status == 999)
            {
                alert('登录超时请重新登录！');
                window.location="login.htm";
                return false;
            } 
             //console.log(msg);
              window.location.reload();
            },
            error:function(){   
                alert('error');   
            }
        });
    })

//rili
    var status = $("#state").attr('rel');
    laydate.skin('molv');
    laydate({
      elem: '#mianshi_time',
      // format: 'YYYY-MM-DD',
      istime: false,
      choose: function(datas){ //选择日期完毕的回调
        //alert(datas);
         window.location.href="rili.htm?f="+status+"&t="+datas;
      }
  });


})

function pub_select(obj){
    var con = obj.html();
    var s_this= obj.attr('rel');
    obj.parent().parent('ul').removeClass('show');
    obj.parent().parent('ul').siblings('a').children('span:first').html(con);
    obj.parent().parent('ul').siblings('a').children('span:first').attr('rel',s_this);
    return s_this;
}

function qudao(id){
    var ly = $(".laiyuan_"+id).html();
    document.write(ly);
}