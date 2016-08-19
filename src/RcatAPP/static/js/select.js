$(function(){
	$(".text").focus(function(){
        $(".select p").css("display","block");
        $(".select-img").css("display","block");
	})
	$(".text").blur(function(){
$(".select p").css("display","none");
    $(".select-img").css("display","none");
	})
	$(".select-img").click(function(){
     $(".text").value="";
	})

 //弹出层（代替alert）
	$("#submit").click(function(){
		$(".window").css("display","block");
		    var window_height = $(window).height() + $(document).scrollTop();
        $('.black_overlay').css(
                {
                  'background-color': 'rgba(0,0,0,0.8)', 
                  'z-index' : 100, 
                  'height': window_height+'px', 
                  'display':'block'
                }
        ); 
	})
	$(".window input").click(function(){
		$(this).parent("div").hide();
		$('.black_overlay').hide();
	})
})