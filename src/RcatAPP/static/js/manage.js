var dangq =1;
var zong =1;
var sss ='';
$(function(){

$("#cainiao_welcome").click(function(e){
    e.stopPropagation();
    //window.location.href="binding.htm";
})


$(".data_sync").click(function(){
     $.ajax({
        type:'post',
        url: "ajax_binding.htm",
        data: {sync:1},
        dataType: 'json',
        success: function(msg)
        {
            if(msg.status == 999)
            {
                alert('登录超时请重新登录！');
                window.location="login.htm";
                return false;
            } 
            if(msg == 1)
            {
                var f_p = $(".data_sync").attr('rel');
                if(f_p == 1)
                {
                     $(".note_font2").find("p").html("职位同步成功！");
                 }else
                 {
                     $(".note_font2").find("p").html("简历同步成功！");
                 }
              
            }else
            {
                alert('操作失败！请重新操作！');
            }         
        },
        error:function()
        {   
                //alert('error');   
        }
    });
})

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
	
	function menu_on_off(o,e)
	{
        //window.location.href.indexOf('binding.htm')>0 && 
        var o = o.next('ul');
		o.css("display", 'none' == o.css("display") ? 'block' : 'none');
	}
    
	
    $("#source").click(function(event){


    })
	$("#count").click(function(event){
     menu_on_off( $(this),event );
 });
	$("#count2").click(function(event){  menu_on_off( $(this),event ); });
	$("#li_tuijian").click(function(event){ 

            //
             
        menu_on_off( $(this),event );
         });
	$("#li_tuijian2").click(function(event){  menu_on_off( $(this),event ); });
	
	$("#show-up").click(function()
	{
		if(countFlag==0)
		{
			$(".navi_con").css("width","34px");
			$(".detail_con").css({left:"34px",width:"97.5%"});
            $(".navi_bar").css("width","54px");
	        $("#x_image").attr("src", "/static/images/fangda.png");
	        
			countFlag++;
		}else{
			$(".navi_con").css("width","161px");
			$(".detail_con").css({left:"161px",width:"88%"});
            $(".navi_bar").css("width","181px");
        	$("#x_image").attr("src", "/static/images/suoxiao.png");
        	
			countFlag--;
		}
	})
	$(".li_hover").click(function()
    {
            $(".navi_con").css("width","161px");
            $(".detail_con").css({left:"161px",width:"88%"});
            $(".navi_bar").css("width","181px");
                $("#x_image").attr("src", "/static/images/suoxiao.png");
        
    })
	$("#cainiao_welcome").click(function(e){
        e.stopPropagation();
		if(countFlag==0){
			$(".all-op").css("display","block");
			countFlag++;
		}else{
			$(".all-op").css("display","none");
			countFlag--;
		}
	})
 $("#cainiao_welcome_two").click(function(e){
    e.stopPropagation();
        if(countFlag==0){
            $(".all-op").css("display","block");
            countFlag++;
        }else{
            $(".all-op").css("display","none");
            countFlag--;
        }
    });

 $(document).click(function(){
            $(".all-op").css("display","none");            
        });
    	
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

//--
function formatDate(nS) {  
  if(nS ==0) {
      document.write('');
  }else{
    var ti =  new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");  
    document.write(ti);    
  }
   
}   

//年月日
function getLocalTime2(nS) { 
     if(nS ==0) {
      document.write('');
    }else{ 
   var ti =   new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
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



function get_substr(str)
{
    if($.trim(str)=='')
    {
        document.write('');
    }else
    {
        if(str.length >5)
        {
            document.write(str.substr(0,8));
        }else{
            document.write(str);
        }
    }
}


function get_salary(s)
{
  if(s == 0)
  {
    document.write('不限');
  }else
  {
    document.write(my_nl2br(s));
  }
} 


function my_nl2br(s)  
{  
    return s.replace("\r\n", "");
}

function alert_f(msg,s)
{
    layer.alert(msg);
    if(s == 1)
    {
        window.location.href='login.htm';
    }
}

function alert_r(msg,url)
{
    if(url !="")
    {
      layer.alert(msg,function index(){
      window.location.href=url;
      });
             
    }else
    {
        layer.alert(msg);
    }

        
    
}
function hideborder(obj){
    if(typeof(arr_jid) == "undefined"){return false;}
    for(var i=0; i<arr_jid.length; i++){
        var o = obj + arr_jid[i];
        var con = $.trim($("#"+o).html());
        if (!con) {
            $("#"+o).hide();
            if(obj == 'c_trade'){
                $("#gs_nature"+arr_jid[i]).addClass('c_trade');
            }

            if (obj == 'c_city') {
                $("#c_year"+arr_jid[i]).addClass('c_trade');
            }  
        }

        if ($("#c_trade"+arr_jid[i]).css('display') == 'none' && $("#gs_nature"+arr_jid[i]).css('display') == 'none') {
            $("#gs_size"+arr_jid[i]).addClass('c_trade');
        }

        if ($("#c_city"+arr_jid[i]).css('display') == 'none' && $("#c_year"+arr_jid[i]).css('display') == 'none') {
            $("#c_edu"+arr_jid[i]).addClass('c_trade');
        }

        if ($("#c_city"+arr_jid[i]).css('display') == 'none' && $("#c_year"+arr_jid[i]).css('display') == 'none' && $("#c_edu"+arr_jid[i]).css('display') == 'none') {
            $("#c_time"+arr_jid[i]).addClass('c_trade');
        }
    }    
}
              
