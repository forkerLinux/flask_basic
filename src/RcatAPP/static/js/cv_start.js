var d = new Date();
var cur_year = parseInt(d.getFullYear());
$(function(){
    $('.btn_start').click(function(){
        $('.start').hide();
        $('.fill_my_cv').show();
    });
    // 头像
    $('.head_img').hover(function(){
        $('.head_img_bg').show();
        $('.head_img_note').show();
    }, function(){
        $('.head_img_bg').hide();
        $('.head_img_note').hide();
    });

    $('.head_img').click(function(){
        $('.black_overlay').show();
        $('.pop_modify_pic').show();
    });

    $('.pop_close').click(function(){
        $('.black_overlay').hide();
        $(this).parent().hide();
    });
    $('.cancel').click(function(){
        $('.black_overlay').hide();
        $(this).parent().parent().hide();
    });

    // 动态生成年份
    var years = create_year();
    $("select.year").append(years);
    // 选择地区
    $('#address').focus(function(){
        show_panel('pop_area');
        var city = $(this).val();
        if (city == '') {
            create_province('北京');
        } else {
            create_province(city);
            $('.city li:contains('+city+')').addClass('select');
        }        
    });
    // 市
    $('body').on('click', '.province li', function(){
        var province = $(this).html();
        create_province(province);
    });
    $('body').on('click', '.city li', function(){
        var city = $(this).html();
        $('#address').val(city);
        $(this).toggleClass('select');
        $('.cancel').click();
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
    // 选择职位
    $('#expect_job').focus(function(){
        show_panel('pop_jobs');
        var job = $.trim($(this).val());
        if (job == '') {
            create_jobs(jobsdata[0]['trade']);
        } else {
            var arr_job = job.split(',');
            create_jobs(arr_job[0]);
            $.each(arr_job, function(k, v){                
                $('.jobs li:contains('+v+')').addClass('select');
            });
        }        
    });
    // 职位所属行业行业
    $('body').on('click', '.job_trade li', function(){
        var trade = $(this).html();
        create_jobs(trade);
    });
    $('body').on('click', '.jobs li', function(){
        $(this).toggleClass('select');
        var nums = $('.jobs li.select').size();
        if(nums > 5){
            $(this).removeClass('select');
            layer.alert('最多可选择5个职位');
            return false;
        }
    });
    $('.pop_jobs .submit').click(function(){
        var str_jobs = '';
        var nums = $('.jobs li.select').size();
        if (nums == 0) {
            layer.alert('至少选择一个职位');
            return false;
        }
        $('.jobs li.select').each(function(){
            str_jobs += $(this).html()+',';
        });
        $("#expect_job").val(str_jobs.substring(0, str_jobs.length-1));
        $('.cancel').click();
    });

    // 保存基本信息
    $('.fill_basic .btn_save').click(function(){
        var arr_cv = check_basic();
        if (!arr_cv) {return false;}
        $('.fill_basic').hide();
        $('.fill_will').show(); 
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

    $('body').on('mouseover', '.my_skill span', function(){
        $(this).addClass('active');
    });

    $('body').on('mouseout', '.my_skill span', function(){
        $(this).removeClass('active');
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

});

function show_panel(obj){
    $('.black_overlay').show();
    $('.'+obj).show();
}
// 上传头像
function pic_show(s, r)
{
   $(".head_img").find('img').data('rel', r);
   $(".head_img").find('img').attr('src', s);
   $(".pop_modify_pic, .black_overlay").hide();
}

function create_year()
{ 
    var nums = cur_year - 1949;
    var years = '';
    for(var i = cur_year; i >= 1949; i--)
    {
        years += '<option value="'+i+'">'+i+'年</option>';
    }   
    return years;
}
// 省份
function create_province(address){
    $('.province ul').html('');
    for (var index in citydata) {
        var name = citydata[index]['name'];
        $('.province ul').append('<li>'+name+'</li>');
        //相应的省市
        var cities = citydata[index]['cities'];
        if (address == name) {
            $('.city ul').html('');
            for(var index2 in cities){
                $('.city ul').append('<li>'+cities[index2]+'</li>');
            }            
        } else {
            if (cities.length > 1) {
                for(var index2 in cities){
                    var city = cities[index2];
                    if (address == city) {
                        var province = citydata[index]['name'];
                        create_province(province);
                        return false;
                    }
                } 
            }            
        }
    }
}
// 职位
function create_jobs(job_name){
    $('.job_trade ul').html('');
    for (var index in jobsdata) {
        var trade = jobsdata[index]['trade'];
        $('.job_trade ul').append('<li>'+trade+'</li>');
        //相应的职位
        var jobs = jobsdata[index]['job_list'];
        if (job_name == trade) {
            $('.jobs ul').html('');
            for(var index2 in jobs){
                $('.jobs ul').append('<li>'+jobs[index2]+'</li>');
            }            
        } else {
            for(var index2 in jobs){
                var job = jobs[index2];
                if (job_name == job) {
                    var trade = jobsdata[index]['trade'];
                    create_jobs(trade);
                    return false;
                }
            }            
        }
    }
}

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

function ChkEmpty(obj, notice){
    var v = $.trim($('#'+obj).val());
    if( v == ""){
        layer.alert(notice);    
        return false;
    }
    return v;
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

var isCN = function(source){return/^[\u4e00-\u9fa5]+$/.test(source)};
function ChkChinese(obj){     
    var c = ChkEmpty(obj, '请输入您的真实姓名');
    if (c) {
        var f = isCN(c);
        if (!f) {
            layer.alert('姓名由汉字组成');
            return false;
        } else if(c.length < 2) {
            layer.alert('请输入2-5个字符');
            return false;
        } 
    }   
    return c; 
}

isMobile = function(source){return/^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source)};
function ChkMobile(obj, notice){
    var m = ChkEmpty(obj, '请输入您的手机号');
    if (m) {
        if(!isMobile(m)){
            layer.alert(notice);
            return false;
        }
    }
    return m;
}

isEmail = function(source){return/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(source)};
function ChkEmail(obj, notice)
{
    var e = ChkEmpty(obj, '请输入您的邮箱');
    if (e) {
        if (!isEmail(e)) {
            layer.alert(notice);
            return false;
        }
    }
    return e;
}

isSalary = function(source){return ((/^[0-9]+$/).test(source))};
function ChkSalary(obj, notice){
  var s = ChkEmpty(obj, '请输入您期望的薪资');
  if (s) {
      if(!isSalary(s)){
          layer.alert(notice);
          return false;
      }
  }  
  return s;
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


