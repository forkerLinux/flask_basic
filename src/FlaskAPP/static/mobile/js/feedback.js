$(function(){

    $(".select_cart span").click(function(){
      $(this).parent("div").siblings("div").children("p").removeClass("choose_p")
      $(this).parent("div").siblings("div").children("span").removeClass("choose_ok")
      $(this).addClass("choose_ok")
      $(this).prev("p").addClass("choose_p");
    })
    $(".mm_next").click(function(){
        $(this).parent("div").siblings("div").children("p").removeClass("choose_p");
        $(this).parent("div").siblings("div").children("span").removeClass("choose_ok");
        $(this).addClass("choose_p")
        $(this).next("span").addClass("choose_ok")
    })


     

     $(".button_one .ok").click(function(){
        var jobtype = $(" .option .choose_ok").attr("data-value") ;
        var channel = $(".other_code .choose_ok").attr("data-value") ;
        var proposal = $.trim($(".other_code .textarea_size").val()) ;

        if(proposal.length<20){
          layer.alert("字数不可少于20字");
          return false;

        }
        if(proposal.length>200){
          layer.alert("字数请在200字以内")
          return false;

        }


        $.ajax({
              type:'post',
              url: "/api_feedback",
              contentType:"application/json; charset=utf-8",
              dataType: 'json',
              data: JSON.stringify({'jobtype':jobtype,'channel':channel,'proposal':proposal}),
              success: function(data)
              { 
                var errcode = data.errcode;
                if(errcode == 0){
                  layer.alert("反馈成功", {
            	yes: function(e) {
                  history.go(-1);
                	
            	  }
        	     })
                   setTimeout(go,2000)
                }
              },
              error:function(){   
                alert('error');   
              }
             });
     })

})



function go(){
      window.location.href ='/'
    }