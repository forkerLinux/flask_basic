$(function(){
	$(".menu_main").mouseover(function(){
       $(this).next(".menu_sub").show();

       $(this).addClass("show_border");
        var height=$(this).parent().prev().height();
        $(this).next(".menu_sub").css("top","0px");

        $(this).css("background-color","#fff");

        var mm=$(this).children("span").children("a");
          var ss=$(this).next(".menu_sub").find("span").children("a");

   for(var i=0;i<mm.length;i++){
   	var q=mm[i].innerHTML;
       for(var k=0;k<ss.length;k++){
	var p=ss[k].innerHTML;
       	   if(q==p){
		ss[k].style.color="#029774";
	ss[k].style.fontWeight="bold";
       	   }
       }
   }


   
	})
	$(".menu_box").mouseleave(function(){
		$(this).find(".menu_sub").hide();
		 $(this).removeClass("show_border");		
		
	})
	$(".menu_box:first-child").mouseover(function(){
       $(this).find(".menu_sub").show();

       $(this).children(".menu_main").addClass("show_border");
   
        $(this).find(".menu_sub").css("top","0px")
        // alert(height)
	})
   
	$(".menu_sub").mouseover(function(){


       $(this).prev().addClass("show_border");
        $(this).prev().css("background-color","#fff");
        
	})

	$(".menu_sub").mouseout(function(){
       	$(this).prev().css("background-color","#eaeaea");    
	  
        	$(this).prev().removeClass("show_border");     
	})
$(".menu_main").mouseout(function(){
       	$(this).css("background-color","#eaeaea"); 
	$(this).removeClass("show_border");     
        
	})



})