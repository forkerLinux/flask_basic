$(function(){
    $(".gotop").click(function(){
    $('html,body').animate({ scrollTop:0}, 700);
    });
     x=$(window).scrollTop();
        if(x>200)
        {
            $(".gotop").fadeIn();
        }
        else
        {
            $(".gotop").fadeOut();
        }
    $(window).scroll(function(){
        x=$(window).scrollTop();
        if(x>200)
        {
            $(".gotop").fadeIn();
        }
        else
        {
            $(".gotop").fadeOut();
        }
    }); 
})
function pop_alert(obj, notice){
	layer.alert(notice, {
    	yes: function(e) {
        	layer.close(e)
       		$("#"+obj).focus();
    	}
	});    
    return false;
}
function ChkEmpty(obj, notice){
    var v = $.trim($('#'+obj).val());
    if( v == ""){
        return pop_alert(obj, notice);

    }
    return v;
}

function ChkPassword(obj, notice){
	var p = ChkEmpty(obj, '请输入您的密码');
    if (p) {
        if (p.length < 6) {
           return pop_alert(obj, notice);
        }
    }   
    return p; 
}

var isCN = function(source){return/^[\u4e00-\u9fa5]+$/.test(source)};
function ChkChinese(obj){     
    var c = ChkEmpty(obj, '请输入您的真实姓名');
    if (c) {
        var f = isCN(c);
        if (!f) {
        	return pop_alert(obj, '姓名由汉字组成');
        } else if(c.length < 2) {
        	return pop_alert(obj, '请输入2-5个字符');
        } 
    }   
    return c; 
}
// 手机号验证 
isMobile = function(source){return/^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source)};
function ChkMobile(obj, notice){
    var m = ChkEmpty(obj, '请输入您的手机号');
    if (m) {
        if(!isMobile(m)){
          return  pop_alert(obj, notice);
        }
    }
    return m;
}
// 邮箱验证
isEmail = function(source){return/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(source)};
function ChkEmail(obj, notice)
{
    var e = ChkEmpty(obj, '请输入您的邮箱');
    if (e) {
        if (!isEmail(e)) {
           return pop_alert(obj, notice);
        }
    }
    return e;
}

isSalary = function(source){return ((/^[0-9]+$/).test(source))};
function ChkSalary(obj, notice){
  var s = ChkEmpty(obj, '请输入您期望的薪资');
  if (s) {
      if(!isSalary(s)){
         return pop_alert(obj, notice);
      }
  }  
  return s;
}
function ChkJobNum(obj, notice){
    var j = ChkEmpty(obj, '请输入您期望的职位');
    if (j) {
        if (j.indexOf('，') > -1) {
            var j2 = j.replace(/\，/g, ',');   
        } else {
            var j2 = j;
        }
        var str_job ='';
        var j_arr = j2.split(',');
        for(var i = 0; i < j_arr.length; i++){
            if ($.trim(j_arr[i]) == '' || typeof(j_arr[i]) == 'undefined') {
                j_arr.splice(i, 1);
                i = i - 1;
            } else {
                str_job += $.trim(j_arr[i])+',';
            }            
        }
        j2 = str_job.substr(0, str_job.length-1);
        if (j_arr.length > 5) {
            layer.alert(notice);
            return false;
        }
    }
    return j2;
}
