function pop_tips(obj, notice){
	layer.tips(notice, '#'+obj, {
		tips:[2, '#ff6767'],
		time: 0,
		tipsMore: true
	});
	$('#'+obj).addClass('wrong');
	return false;
}
function pop_tips2(obj, notice){
    layer.tips(notice, '#'+obj, {
        tips:[3, '#ff6767'],
        time: 0,
        tipsMore: true
    });
    $('#'+obj).addClass('wrong');
    return false;
}

function check_empty(obj, notice){
	var val = $.trim($('#'+obj).val());
	if(val == ''){
		return pop_tips(obj, notice);
	}
	return val;
}
// 邮箱验证
isEmail = function(source){return/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(source)};
function check_email(obj, notice)
{
    var e = check_empty(obj, '请输入企业邮箱');
    if (e) {
        if (!isEmail(e)) {
           return pop_tips(obj, notice);
        }
    }
    return e;
}
// 手机号验证 
isMobile = function(source){return/^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source)};
function check_mobile(obj, notice){
    var m = check_empty(obj, '请输入手机号码');
    if (m) {
        if(!isMobile(m)){
          return  pop_tips(obj, notice);
        }
    }
    return m;
}

function check_pwd(obj, notice){
	var p = check_empty(obj, '请输入您的密码');
    if (p) {
        if (p.length < 6) {
           return pop_tips(obj, notice);
        }
    }   
    return p; 
}
isInt = function(source){return ((/^[0-9]+$/).test(source))};
function check_integer(obj, notice){
	var p = check_empty(obj, '请输入联系电话');
	if (p) {
        if (!isInt(p)) {
           return pop_tips(obj, notice);
        }
    }   
    return p; 
}

function inputfocus(obj){
	if (obj.hasClass('wrong')) {
		var index = layer.tips(this);
		layer.close(index);
		obj.removeClass('wrong');
	}
}

function alert_f(msg, s){
    layer.alert(msg);
}
isDate = function(source){return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(source);}
function check_date(obj, notice){
    var d = check_empty(obj, '请输入截止日期');
    if (d) {
        if (!isDate(d)) {
           return pop_tips(obj, notice);
        }
    }   
    return d; 
}
function check_integer2(obj, notice){
    var p = check_empty(obj, '请输入招聘人数');
    if (p) {
        if (!isInt(p)) {
           return pop_tips(obj, notice);
        }
    }   
    return p; 
}
function check_integer3(obj, notice){
    var p = check_empty(obj, '请输入月薪');
    if (p) {
        if (!isInt(p)) {
           return pop_tips(obj, notice);
        }
    }   
    return p; 
}
