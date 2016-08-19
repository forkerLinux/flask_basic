$(function(){
	var ts = 1411093343382;
	var id_click,in_t;
	$(".choose p").click(function(){
		var sp = $(this).next("span").css('visibility');
		var status = $(this).next("span").attr('rel');
		if(sp == 'visible' && status == 2){
			var c = confirm("已经绑定成功的账号，确定要修改吗？");
			if(c == false){
				return false;
			}
		}
		var three_id = $(this).attr('rel');
		var site_letter = $(this).find('span').attr('zimu');
		$("#site_letter").val(site_letter);
		$("#three_id").val(three_id);
		var uname = $(this).find('span').attr('uname');
		var pwd = $(this).find('span').attr('pwd');
		$("#but5").val(uname);
		$("#but6").val(pwd);
		if(site_letter == '51job'){
			if(uname != ""){
				var hui = uname.split('|');
				$("#huiyuan").find('input').val(hui[0]);
				$('#but5').val(hui[1]);
			}

			$("#huiyuan").show();
		}else{

			$("#huiyuan").hide();
		}
		if(site_letter == 'job1001'){
			if(uname != ""){
				var hui = uname.split('|');
				$("#anquanma").find('input').val(hui[1]);
				$('#but5').val(hui[0]);
			}			
			$("#anquanma").show();
		}else{
			$("#anquanma").hide();
		}
		$(".submit-form").css("display","block");
		$(this).css("outline","2px solid #0E97E6");
		$(this).siblings("p").css("outline","1px solid lightgray");
		$("#circle1").css({"background-color":"#0E97E6","border":"none"});
		$("#circle2").css({"background-color":"#fff","border":"1px solid #BADBFF"});
		$("#circle3").css({"background-color":"#fff","border":"1px solid #BADBFF"});
		$(".show4").css("color","gray");
		$(".show").css("color","#0E97E6");

		id_click=$(this);

		$(".content-title").html($(this).text()).css({"font-size":"20px","color":"#0E97E6","font-weight":"550"});

	})

	$("#but5").focus(function(){
		$(".show3").css("color","#0E97E6");
		$("#circle2").css({"background-color":"#0E97E6","border":"none"});

	})
	$("#but").click(function(){
		var info_misc="";
        var uname = $.trim($("#but5").val());
        var pwd = $.trim($("#but6").val());
        var three_id = $("#three_id").val();
        var site_letter = $("#site_letter").val(); //网站英文字母
        if(site_letter == '51job'){
        	var huiyuan = $.trim($("#huiyuan").find('input').val());
        	if(huiyuan == ""){
        		alert("会员名不能为空！");
        		return false;
        	}
        	uname = huiyuan+"|"+uname;
        }
        if(site_letter == 'job1001'){
        	var anquanma = $.trim($("#anquanma").find('input').val());
        	if(anquanma == ""){
        		alert("安全码不能为空！");
        		return false;
        	}
        	uname = uname+"|"+anquanma;
        }     
        if(uname == "" || pwd == ""){
        	alert("账号名或密码不能为空！");
        	return false;
        }
        if(site_letter == '58'){
        	info_misc = encryptString( ts + pwd );
        } 
        butthis = $(this);
        //开始ajax 绑定账号
        //alert(pwd); return false;
        $.ajax({
            type:'post',
            url: "submit.htm",
            data: {uname:uname,pwd:pwd,three_id:three_id,site_letter:site_letter,info_misc:info_misc},
            dataType: 'json',
            success: function(msg){
                //console.log(msg);
                var obj =  eval(msg);
                //console.log(msg);
                if(obj.code){
                    alert(obj.msg);
                   	$(".show3").css("color","#0E97E6")
			        $(".show4").css("color","#0E97E6");
			      	$(".choose p").css("outline","1px solid lightgray");
					$("#circle3").css("background-color","#0E97E6");
					$("#circle3").css("border","none");
					butthis.parents(".submit-form").css("display","none");
					id_click.next("span").css("visibility","visible");
					id_click.next("span").find('img').attr("src","images/wait.gif");
                 }else{
                    alert('绑定失败！');
                 }
               
            },
            error:function(){   
                alert('error');   
            }
            
        });

			   		
	})
	$(".more_add").click(function(){

		$(".submit-form2").css("display","block");
	})
	$("#but2").click(function(){

		$(".submit-form2").css("display","none");
	})
	$("#but3").click(function(){

		$(".submit-form").css("display","none");
		$(".choose p").css("outline","1px solid lightgray");
	})
	$("#but4").click(function(){

		$(".submit-form2").css("display","none");
		 $("#circle2").css({"background-color":"#fff","border":"1px solid #BADBFF"});
		 $(".show").css("color","#0E97E6");
	})
})

function encryptString(str)
{
	var e = '010001';
	var m = "008baf14121377fc76eaf7794b8a8af17085628c3590df47e6534574efcfd81ef8635fcdc67d141c15f51649a89533df0db839331e30b8f8e4440ebf7ccbcc494f4ba18e9f492534b8aafc1b1057429ac851d3d9eb66e86fce1b04527c7b95a2431b07ea277cde2365876e2733325df04389a9d891c5d36b7bc752140db74cb69f";

	var key=RSAUtils.getKeyPair(e, '', m);
	
	return RSAUtils.encryptedString(key, str)
}

function tips_verify(s,id){
	if(s == 1){ //失败
		$(".tips_verify"+id).attr('alt','绑定失败，请重新绑定！');
		$(".tips_verify"+id).attr('title','绑定失败，请重新绑定！');
		//in_t = setInterval(ajax_tips_verify(id),5000);// 注意函数名没有引号和括弧！
	}else if(s == 2){
		$(".tips_verify"+id).attr('alt','绑定成功！');
		$(".tips_verify"+id).attr('title','绑定成功！');
	}else if(s==0){//开始校验
		//in_t = setInterval(ajax_tips_verify(id),10000);// 注意函数名没有引号和括弧！
	}
}

/*function ajax_tips_verify(id){
	    $.ajax({
            type:'post',
            url: "submit.htm",
            data: {'verify':id},
            dataType: 'json',
            success: function(msg){
                console.log(msg);
                if(msg == 2){
                   clearInterval(in_t);
                   wind.location.href="submit.htm";
                 }else{
                 	alert("没有验证通过！"+msg);
                 } 
            },
            error:function(){   
                alert('error');   
            }
            
        });
}*/