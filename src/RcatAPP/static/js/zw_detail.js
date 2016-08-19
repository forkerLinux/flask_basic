$(function(){
	chkishide("fuli");
	chkishide("gs_xingzhi");
	chkishide("gs_dizhi");
	chkishide("gs_web");
	chkishide("gs_scale");
	chkishide("gs_detail");

	var n = $(".gs_xingzhi").html();
	var d = $(".gs_dizhi").html();
	var w = $(".gs_web").html();
	var s = $(".gs_scale").html();
	if (n == "" && d == "" && w =="" && s == "") {
		$("#gs_info").hide();
	}

	var w_year = $.trim($('.job_area2 span:last').html());
	if(w_year == ''){
		$('.job_area2 span:last').hide();
	}
});

function chkishide(obj){
	var con = $("."+obj).html();
	if(!con){
		$("#"+obj).hide();
	}
}


