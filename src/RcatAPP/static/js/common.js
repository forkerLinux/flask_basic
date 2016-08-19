	$(function(){
      var window_left=$('.wrap').height();
      var left=$('body').height();

      if(window_left < left-100 ){  
          $(".foot").addClass("navbar navbar-default navbar-fixed-bottom");
      }else{
          $(".foot").removeClass("navbar navbar-default navbar-fixed-bottom");
      }
		  $(".account").hover(
			function(){
        $('.item_menu').show();
			},function(){
				$('.item_menu').hide();
			}
		)	
    // 用户反馈
    $(".couple_back").click(function(){
      $(".couple_back_now").toggle();
      $('.black_overlay2').toggle();
      $('body').toggleClass('over');
    })
    $(".couple_back_now .list .left .button_one .canel").click(function(){
      $(".couple_back_now").hide();
      $('.black_overlay2').hide();
      $('body').removeClass('over');
    })
    $(".couple_back_now .list .left .select_cart >span").click(function(){
      $(this).siblings("p").removeClass("choose_p")
      $(this).siblings("span").removeClass("choose_ok")
      $(this).addClass("choose_ok")
      $(this).prev("p").addClass("choose_p");
    })
    $(".couple_back_now .list .left .select_cart .mm_next").click(function(){
        $(this).siblings("p").removeClass("choose_p")
        $(this).siblings("span").removeClass("choose_ok")
        $(this).addClass("choose_p")
        $(this).next("span").addClass("choose_ok")
    })
     $(".couple_back_now .list .left .select_cart >span").hover(function(){
        $(this).css("color","#3b5b98")
        $(this).prev("p").css("border","1px solid #3b5b98")

     },function(){
     	   $(this).css("color","#999")
           $(this).prev("p").css("border","1px solid #999")

     })

     

     $(".couple_back_now .list .left .button_one .ok").click(function(){
        var jobtype = $(".couple_back_now .list .left .option .choose_ok").attr("data-value") ;
        var channel = $(".couple_back_now .list .left .other_code .choose_ok").attr("data-value") ;
        var proposal = $.trim($(".couple_back_now .list .left .other_code .textarea_size").val()) ;

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
                  layer.alert("反馈成功！")
                  $('.black_overlay2').hide();
                  $('body').removeClass('over');
                  $(".couple_back_now").hide();
                }
              },
              error:function(){   
                alert('error');   
              }
             });
     })



	$(".gotop").click(function(){
	$('html,body').animate({ scrollTop:0}, 700);
    });

    $(window).scroll(function(){
        x=$(window).scrollTop();
        if(x>500)
        {
            $(".gotop").fadeIn();
        }
        else
        {
            $(".gotop").fadeOut();
        }
    });	
});
       