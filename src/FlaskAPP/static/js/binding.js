var ts = 1411093343382;
var id_click,in_t;
$(function(){



 $(".close_one").click(function(){
        $(".step").css("display","none");
        $(".step_two").css("display","none");
          $(".step_three").css("display","none");
        $(".black_overlay").css("display","none");
    })
 $("#close_one_two").click(function(){
    
        $(".step_two").css("display","none");
        $(".black_overlay").css("display","none");
 })

	//点击绑定
    $(".lock_binding").click(function(){

    	$('#bding_form')[0].reset();

        var status = $(this).attr('s');
       	if(status == 2)
       	{
            $("#rebinding_btn").val('重新绑定');
			var c = confirm("已经绑定成功的账号，确定要修改吗？");
			if(c == false){
				return false;
			}
        /* layer.confirm('已经绑定成功的账号，确定要修改吗？', {
                btn: ['确定','取消'] //按钮
         })*/
         
         if($(".erro").attr('rel') == 0)
         {
            return false;
         }
		}else if(status == 3 || status == 1)
		{
            $("#rebinding_btn").val('重新绑定');
		}else
		{
			$("#rebinding_btn").val('绑定');
		}

		$(".p_security_code").hide();
		$(".p_huiyuan").hide();

        var this_img = $(this).parent().find("img").attr('src');
        $(".left_img img").attr("src",this_img);

		var three_id = $(this).parent().attr('rel');
		var site_letter = $(this).attr('zimu');
		
		$("#site_letter").val(site_letter);
		$("#three_id").val(three_id);

		var uname = $(this).attr('uname');
		var pwd = $(this).attr('pwd');

		$("#uname").val(uname);
        if(status == 2 || status == 1 || status==3)
        {
            $("#pwd").val('');
        }else
        {
            $("#pwd").val(pwd);
        }
		

		//alert(uname+'=='+pwd);
		//return false;
        $("#panel_account").show(
            function(){
               // $(".right_form p:nth-child(2) input").focus();
             $("#uname").focus();
            $("#huiyuan").focus();
              

        }
        );

        var window_height = $(window).height() + $(document).scrollTop();
        $('.black_overlay').css(
                {
                  'background-color': 'rgba(0,0,0,0.8)', 
                  'z-index' : 100, 
                  'height': window_height+'px', 
                  'display':'block'
                }
        ); 

		if(site_letter == '51job')
		{
			if(uname != "")
			{
				var hui = uname.split('|');
				$("#huiyuan").val(hui[0]);
				$('#uname').val(hui[1]);
			}
			$(".p_huiyuan").show();
		}

		if(site_letter == 'job1001')
		{
			if(uname != "")
			{
				var hui = uname.split('|');
				$("#security_code").val(hui[1]);
				$('#uname').val(hui[0]);
			}			
			$(".p_security_code").show();
		}

		id_click=$(this);

    })


    
    $("#rebinding_btn").click(function(){
    	binding_click(id_click);
    });
   

    //点击关闭
    $(".op_close_pop").click(function(){

       $("#panel_account").hide();
       $('.black_overlay').hide();
    })

	
})

function anniu_opt(s,id)
{
	if(s == 1)//失败
	{
		$("#bding_"+id).addClass('red_btn');
		$("#bding_"+id).val('绑定失败,请重新绑定');

	}else if(s == 2)//成功
	{
		$("#bding_"+id).addClass('green_btn');
		$("#bding_"+id).val('绑定成功');
	}else if(s == 3)//正在绑定
	{
		$("#bding_"+id).addClass('ing_btn');
		$("#bding_"+id).val('正在绑定');
	}
	else
	{
		$("#bding_"+id).addClass('blue_btn');
		$("#bding_"+id).val('立即绑定');
	}
}

    //点击绑定
    function binding_click(id_click)
    {
        var info_misc="";
        var uname = $.trim($("#uname").val());
        var pwd = $.trim($("#pwd").val());
        var three_id = $("#three_id").val();
        var site_letter = $("#site_letter").val(); //网站英文字母

        if(site_letter == '51job')
        {
            var huiyuan = $.trim($("#huiyuan").val());
            if(huiyuan == ""){
                //alert("会员名不能为空！");
            layer.alert('会员名不能为空！', {
             title: '提示',
            })
                return false;
            }
            uname = huiyuan+"|"+uname;
        }

        if(site_letter == 'job1001')
        {
            var anquanma = $.trim($("#security_code").val());
            if(anquanma == "")
            {
                //alert("安全码不能为空！");
            layer.alert('安全码不能为空！', {
             title: '提示',
            })
                return false;
            }
            uname = uname+"|"+anquanma;
        } 

        if(uname == "" || pwd == "")
        {
            //alert("账号名或密码不能为空！");
            layer.alert('账号名或密码不能为空！', {
             title: '提示',
            })
            return false;
        }

        if(uname.length>50)
        {
            layer.alert('用户名不能太长！', {
             title: '提示',
            })
            return false;
        }

        if(site_letter == '58')
        {
            info_misc = encryptString( ts + pwd );
        } 

        var b_id = id_click.parent().attr('bid');
        //alert(b_id); return false;
        $.ajax({
            type:'post',
            url: "ajax_binding.htm",
            data: {uname:uname,pwd:pwd,three_id:three_id,site_letter:site_letter,info_misc:info_misc,b_id:b_id},
            dataType: 'json',
            success: function(msg)
            {
                var obj =  eval(msg);
                if(obj.status == 999)
                {
                    alert('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
                if(obj.code){
                    //alert(obj.msg);
                    if(obj.code == 2)
                    {
                        alert(obj.msg);
                        return false;
                    }
                    id_click.addClass('ing_btn');
                    id_click.val('正在绑定');
                    id_click.attr('s',3);
                    id_click.parent().attr('bid',obj.id);
                    id_click.attr('zimu',site_letter);
                    id_click.attr('pwd',"*********");
                    id_click.attr('uname',uname);
                    $("#panel_account").hide();
                    $(".step").show();
                    //$('.black_overlay').hide();
                 }else{
                    alert('绑定失败！');
                 }
               
            },
            error:function(){   
                alert('error');   
            }
            
        });

    }

function encryptString(str)
{
    var e = '010001';
    var m = "008baf14121377fc76eaf7794b8a8af17085628c3590df47e6534574efcfd81ef8635fcdc67d141c15f51649a89533df0db839331e30b8f8e4440ebf7ccbcc494f4ba18e9f492534b8aafc1b1057429ac851d3d9eb66e86fce1b04527c7b95a2431b07ea277cde2365876e2733325df04389a9d891c5d36b7bc752140db74cb69f";

    var key=RSAUtils.getKeyPair(e, '', m);
    
    return RSAUtils.encryptedString(key, str)
}


function chk_status()
{
	var arr_id = [];
	
	// 
	$("div.site").each(function() { 
		
		var id1 = $(this).attr('bid');
		if(id1 != '')
		{
			var s = $(this).find('input').attr('s');
			if(s == 1 || s==3)//绑定失败或者 正在绑定
			{
				arr_id[arr_id.length] = parseInt(id1);
			}
			
		}
	});
	
	if(arr_id.length == 0) return;
	var s_list = arr_id.toString();
	//console.log(s_list);
	$.ajax({
            type:'post',
            url: "ajax_binding.htm",
            data: { batch:1, id:s_list },
            dataType: 'json',
            success: function(msg){
                //console.log(msg);
                var obj =  eval(msg);
                if(obj.status == 999)
                {
                    //alert('登录超时请重新登录！');
                    layer.msg('登录超时请重新登录！');
                    window.location="login.htm";
                    return false;
                }
                if(200 == obj.code){
                    for(id1 in obj.d)
                    {
                    	var f_status = obj.d[id1];
                    	//console.log(id1 + '-> ' + f_status);
                    	
                    	switch(parseInt(f_status))
                    	{
                    		case 1:
                    			$("#site_"+id1).find('input').removeClass('ing_btn');
                    			$("#site_"+id1).find('input').addClass('red_btn');
                    			$("#site_"+id1).find('input').attr('s',1);
								$("#site_"+id1).find('input').val('绑定失败,请重新绑定');

								break;
                    			
                    		case 2:
                    			$("#site_"+id1).find('input').removeClass('ing_btn');
                                $("#site_"+id1).find('input').removeClass('red_btn');
                    			$("#site_"+id1).find('input').addClass('green_btn');
                    			$("#site_"+id1).find('input').attr('s',2);
                                g_f_bind_ok =1;
								$("#site_"+id1).find('input').val('绑定成功');
								break;
                    			
                    		default:
                    			;
                    	}
                    	
                    }
                 }
            },
            error:function(){   
                console.log('** Ajax error **');   
            }
            
        });




}

setInterval('chk_status()', 5000);



