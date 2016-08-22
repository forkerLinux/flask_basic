$(function(){
	var p0 = document.getElementById("old_pass");
	var p1a = document.getElementById("new_pass1");
	var p1b = document.getElementById("new_pass2");
	
	var btn = document.getElementById("submit2");

	function do_submit(){
        // error checks
        if(p0.value.length == 0)
        {
        	alert('旧密码不得为空');
        	p0.focus();
        	return false;
        }
        
        if(p1a.value.length == 0 || p1b.value.length == 0)
        {
        	alert('新密码及确认不得为空');
        	p1a.focus();
        	return false;
        }
        
        if(p1a.value != p1b.value)
        {
        	alert('新密码和确认不一致');
        	p1b.focus();
        	return false;
        }
        
        // submit
        $.post("/hrcenter/dochpwd.html", {old_pass:p0.value, new_pass1:p1a.value, new_pass2:p1b.value}, function(data){
            
            if(data.status > 100){
                alert(data.msg);
            }
            else if(data.status == 100){
                
                alert(data.msg);
                
                window.location.href="/hrcenter/websites.html";
            }else{
                alert('网络错误');
            }
        });
        
    }
	
	btn.onclick=do_submit;
	
})
