$(function(){
     $(".left ul li").click(function(){
         var v=$(this).index();
         $(".left ul li").css("background-color","#029774");
         $(this).css("background-color","#037458");
          
       })

      $(".left ul li:nth-child(1)").click(function(){
      	 $('html,body').animate({ scrollTop:0}, 500);
      	 })
      $(".left ul li:nth-child(2)").click(function(){
      	 $('html,body').animate({ scrollTop:1450}, 500);
      	 })
       $(".left ul li:nth-child(3)").click(function(){
      	 $('html,body').animate({ scrollTop:3010}, 500);
      	 })
        $(".left ul li:nth-child(4)").click(function(){
      	 $('html,body').animate({ scrollTop:5380}, 500);
      	 })
         $(".left ul li:nth-child(5)").click(function(){
      	 $('html,body').animate({ scrollTop:6630}, 500);
      	 })
      	  $(".left ul li:nth-child(6)").click(function(){
      	 $('html,body').animate({ scrollTop:7100}, 500);
      	 })
      	   $(".left ul li:nth-child(7)").click(function(){
      	 $('html,body').animate({ scrollTop:8620}, 500);
      	 })

  $(window).scroll(function(){
            x=$(window).scrollTop();
            if(x>=0&&x<1450)
            {
                $(".left ul li").css("background-color","#029774");
         $(".left ul li:nth-child(1)").css("background-color","#037458");
            }
           else if(x>=1450&&x<3010)
            {
                $(".left ul li").css("background-color","#029774");
                $(".left ul li:nth-child(2)").css("background-color","#037458");
            }
             else if(x>=3010&&x<5380)
            {
                $(".left ul li").css("background-color","#029774");
                 $(".left ul li:nth-child(3)").css("background-color","#037458");
            }
             else if(x>=5380&&x<6630)
            {
                $(".left ul li").css("background-color","#029774");
                 $(".left ul li:nth-child(4)").css("background-color","#037458");
            }
             else if(x>=6630&&x<7100)
            {
                $(".left ul li").css("background-color","#029774");
                  $(".left ul li:nth-child(5)").css("background-color","#037458");
            }
              else if(x>=7100&&x<8600)
            {
                $(".left ul li").css("background-color","#029774");
                  $(".left ul li:nth-child(6)").css("background-color","#037458");
            }
            else{
                 $(".left ul li").css("background-color","#029774");
                 $(".left ul li:nth-child(7)").css("background-color","#037458");
            }
        });

    })