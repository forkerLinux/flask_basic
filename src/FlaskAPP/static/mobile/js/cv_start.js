$(function(){
	var height = $(".start").outerHeight(true);
	var height_cv = $(".fill_my_cv").outerHeight(true);
	var height_will = $(".fill_will").outerHeight(true);
    $(".start").css("margin-top","-"+height*0.5+"px");
    $(".fill_my_cv").css("margin-top","-"+height_cv*0.5+"px");
    $('.btn_start').click(function(){
        $('.start').hide();
        $('.fill_my_cv').show();
    });
        // 保存基本信息
    $('.fill_basic .btn_save').click(function(){
        var arr_cv = check_basic();
        if (arr_cv == false) {
        	return false;

        }
        else{
        	        	$('.fill_basic').hide();
        $('.fill_will').show();
        }
        
});

   // 选择行业
    $('#expect_trade').click(function(){
        show_panel('pop_trade');
        $('.trade span').removeClass('select');
        var trade = $(this).val();
        if (trade != '') {
            var arr_trade = trade.split('，');
            $.each(arr_trade, function(k, v){
                $('.trade span:contains('+v+')').addClass('select');
            });
        }
    });

    $('.trade span').click(function(){
        $(this).toggleClass('select');
        var nums = $('.trade span.select').size();
        if (nums > 5) {
            $(this).removeClass('select');
            layer.alert('最多可选择5个行业');
            return false;
        }
    });


    // 职业意向
    // 添加技能
    $(".btn_addskill").click(function(){
        var skill = $.trim($(".add_skill>input").val());
        if (skill == '') {layer.alert('标签内容不能为空'); return false;}
        var skill2 = $(".my_skill").find('b:contains('+skill+')').html();
        if (skill2 != undefined) {
            layer.alert("已存在一个相同标签");
            return false;
        }
        if($(".my_skill span").length < 10) {
            $(".my_skill").append('<span><b>'+skill+'</b><a href="javascript:void(0);"></a></span>');
        } else {
            layer.alert("最多可添加10个技能标签");
        }
        $(".add_skill>input").val('');
    });

    // 删除技能
    $('body').on('click', '.my_skill span a', function(){
        $(this).parent().remove();
    });
    // 上一步
    $('.btn_prev').click(function(){
    	$('.fill_will').hide();
    	$('.fill_basic').show();
    });

    // 保存职业意向
    $('.fill_will .btn_save').click(function(){
        var arr_cv = check_will();
        if (!arr_cv) {return false;}

        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    window.location = '/career_development';
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });        
    });   
    $('.pop_trade .submit').click(function(){
        var str_trade = '';
        var nums = $('.trade span.select').size();
        if (nums == 0) {
            layer.alert('至少选择一个行业');
            return false;
        }
        $('.trade span.select').each(function(){
            str_trade += $(this).html()+'，';
        });
        $("#expect_trade").val(str_trade.substring(0, str_trade.length-1));
        $('.cancel').click();
    }); 

});

function check_basic(){
    var arr_basic = {};

    var name = ChkChinese('real_name');
    if (!name) {return false}

    var cur_address = ChkEmpty('address', '请选择您的常住地区');
    if (!cur_address) {return false};

    var mobile = ChkMobile('mobile', '手机号格式不正确');
    if (!mobile) {return false};

    var email = ChkEmail('email', '邮箱格式不正确');
    if (!email) {return false};

    return arr_basic;
}
function check_will(){
    var arr_will = {};
    var expect_trade = ChkEmpty('expect_trade', '请选择您期望的行业');
    if (!expect_trade) {return false}

    var expect_salary = ChkSalary('expect_salary','请按格式输入正确的期望薪资');
    if (!expect_salary) {return false};

    var expect_job = ChkJobNum('expect_job', '最多可输入五个职位');
    if (!expect_job) {return false}; 
    $("#expect_job").val(expect_job);   

    return arr_will;
}

function get_all_info(){
    // 擅长技能
    var obj_skill = $(".my_skill span");
    var arr_skill = [];
    if (obj_skill.length > 0) {
        for (var i = 0; i < obj_skill.length; i++) {
            arr_skill[i] = $('.my_skill b:eq('+i+')').html();
        }
    }

    return {
        'basic':{
            'work_years': '',
            'birthday': '',
            'name': $('#real_name').val(),
            'current_area': $('#address').val(),
            'marital_status': '',
            'gender': '',
            'education': '',
            'phonenum': $("#mobile").val(),
            'email': $("#email").val(),
            'avatar': $(".head_img").find("img").data("rel")
        },

        // 工作状态及职业意向
        'intension':{
            'status': '',
            'expect_salary': $("#expect_salary").val(),
            'area': '',
            'title': $("#expect_job").val(),
            'trade': $("#expect_trade").val()
        },

        // 擅长技能
        'tags': arr_skill,

        // 教育经历
        'education': [],

        // 工作经历
        'career': [],

        // 工作经验
        'experience':[],

        // 自我描述
        'description': '',

        // 其他信息
        'extra': ''
    };
}
