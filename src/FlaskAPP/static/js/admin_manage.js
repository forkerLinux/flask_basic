var dangq =1;
var zong =1;
$(function(){

$("#cainiao_welcome").click(function(){
    //window.location.href="binding.htm";
})

    //
	var count = document.getElementById("count");
	var count_img = document.getElementById("count_img");
	
	var home = document.getElementById("home");
	var source = document.getElementById("source");
	var posit = document.getElementById("posit");
	var new_posit = document.getElementById("new_posit");
	var resume = document.getElementById("resume");
	var countFlag = 0;
	var countFlag2 =0;
	
	
	/*
	count_img.style.cssText="transform:rotate(0deg)";
	count_img.style.cssText="transform:rotate(270deg)";
	*/
	

	
	$("#count").click(function(){ menu_on_off( $(this).next('ul') ); });
	$("#count2").click(function(){ menu_on_off( $(this).next('ul') ); });
	$("#li_tuijian").click(function(){ menu_on_off( $(this).next('ul') ); });
	$("#li_tuijian2").click(function(){ menu_on_off( $(this).next('ul') ); });
	
	

	$("#show-up").click(function()
	{
		if(countFlag==0)
		{
			$(".navi_con").css("width","2.5%");
			$(".detail_con").css("width","97.5%");
	        $("#x_image").attr("src", "/static/images/fangda.png");
	        
			countFlag++;
		}else{
			$(".navi_con").css("width","12%");
			$(".detail_con").css("width","88%");
        	$("#x_image").attr("src", "/static/images/suoxiao.png");
        	
			countFlag--;
		}
	})
	
	$("#cainiao_welcome").click(function(){
		if(countFlag==0){
			$(".all-op").css("display","block");
			countFlag++;
		}else{
			$(".all-op").css("display","none");
			countFlag--;
		}
	})
 $("#cainiao_welcome_two").click(function(){
        if(countFlag==0){
            $(".all-op").css("display","block");
	   
            countFlag++;
        }else{
            $(".all-op").css("display","none");
            countFlag--;
        }
    })
    
    
    $(".exit").hover(
    function(){
    $(this).find("a").css("color","#fff");
    },function(){
      $(this).find("a").css("color","#000");
    }
    )
    	
})


//分页样式
function page_list_js(zong,dangq,baseurl)
{
    if(dangq == 1){
        $("#prev_page").hide();
        $('#index_page').html("首页");
    }else
    {
        if (baseurl.substr(-1) == '?') {
            sbaseurl = baseurl.substring(0, baseurl.length - 1)
        }
        else {
            sbaseurl = baseurl
        }
        $('#index_page').html('<a href="'+sbaseurl+'">首页</a>');
        
    }
    if(dangq <6){i_start=1;}else{i_start=parseInt(dangq)-4;}
    var i_end = parseInt(i_start)+8;
    if(i_end >= zong){i_end = zong;}
    for(var i=i_start ; i<= i_end ; i++){
        console.log(baseurl);
        if(i == dangq)
        { 

            if (baseurl.substr(-1) == '?') {
            var page_str = "<span class='sele'><a href='"+baseurl+'page='+i+"'>"+i+"</a></span>";
            }
            else {
            var page_str = "<span class='sele'><a href='"+baseurl+'&page='+i+"'>"+i+"</a></span>";
            }
        }else{
            //判断 有没有 其他 参数 
            if (baseurl.substr(-1) == '?') {
            
                var page_str = "<span><a href='"+baseurl+'page='+i+"'>"+i+"</a></span>";
            }
            else {
            var page_str = "<span><a href='"+baseurl+'&page='+i+"'>"+i+"</a></span>";
            }
        }
        document.write(page_str);
    }

}




/*

function page_list_js(zong,dangq,baseurl)
{
    if(dangq == 1){$("#prev_page").hide();}
    if(dangq <6){i_start=1;}else{i_start=parseInt(dangq)-4;}
    var i_end = parseInt(i_start)+8;
    if(i_end >= zong){i_end = zong;}
    for(var i=i_start ; i<= i_end ; i++){
        if(i == dangq)
        { 
            var page_str = "<span class='sele'><a href='"+baseurl+i+"'>"+i+"</a></span>";
        }else{
            var page_str = "<span><a href='"+baseurl+i+"'>"+i+"</a></span>";
        }
        document.write(page_str);
    }

}
*/

function menu_on_off(o)
{
    o.css("display", 'none' == o.css("display") ? 'block' : 'none');
}
function formatDate(nS) {  
  if(nS ==0) {
      document.write('');
  }else{
    var ti =  new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");  
    document.write(ti);    
  }
   
} 

function getLocalTime(now){ 
    if(now ==0) {
      document.write('');
    }else
    { 
        var tt=new Date(parseInt(now) * 1000).toLocaleString().substr(0,10);
        var newstr=tt.replace("上",""); 
        var str=newstr.replace("下",""); 
        document.write(str);
   }
} 

function alert_f(msg,s)
{
    layer.alert(msg);
    if(s == 1)
    {
        window.location.href='login.htm';
    }
}
