$(function(){

//删除
  $(".qy_delte").click(function(){
    var id = $(this).parent().attr("rel");
    if(id == "") {return false;}

      layer.confirm("确定要删除吗？删除之后将不能在收取简历", function(index){
        $.ajax({
          type:'post',
          url: "ajax_public.htm",
          data: {qy_id:id},
          dataType: 'json',
          success: function(msg)
          {
              if(msg.status == 999)
              {
                    layer.alert('登录超时请重新登录！', {
                 title: '提示',
                })
                  window.location="login.htm";
                  return false;
              } 
            $("#row_dropdown_"+id).remove();
          },
          error:function(){   
              alert('error');   
          }
          
      });
        layer.close(index);
      })
  })

//
})

function resume_nums(s)
{
   if(s == "")
   {
     document.write(0);
   }else{
    document.write(s);
   }
}