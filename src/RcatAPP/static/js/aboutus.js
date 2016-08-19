$(function(){
       $(".left ul li").click(function(){
       	 var v=$(this).index();
       	 $(".left ul li").css("background-color","#029774");
       	 $(this).css("background-color","#037458");
       	    $(".right div").css("display","none");
       	    // $(".right div").slideUp();
            $(".right div:nth-child("+(v+1)+")").css("display","block");
         
       })

    })