var d = new Date();
var cur_year = parseInt(d.getFullYear());
var birth_year_f = '';
$(function(){
	$(".go_img").click(function(){
		$(this).parent().parent().parent().hide();
		$(".two_part").show();
	})
	// 基本信息
	 // 选择性别
    $('.sex').click(function(){
    	$(".sex").next("span").removeClass('gray');
        $(this).siblings("p").addClass('gray');
        $(this).next("span").removeClass('other_gray').siblings("span").addClass('other_gray');
        
    });
	    // 动态生成年份和月份
    var years = create_year();
    $("select.year").append(years);
    var months = create_month();
    $("select.month").append(months);
	    //出生年份
    birth_year_f = $("#birth_year").data('rel');
    if(birth_year_f !='')
    {
        $("#birth_year option:first").attr('selected',false);
        $("#birth_year option[value="+birth_year_f+"]").attr('selected','selected');
        // 年龄
    var age = cur_year - birth_year_f; 
    if(age<=0){
    $('.b_age').html('待完善');
    }
    else{
    $('.b_age').html(age+'岁');
    }

    }

        // 婚姻状况
    var f_marriage = $('#marriage').data('rel');
    if(f_marriage){
        $("#marriage option:first").attr('selected',false);
        $("#marriage option[value='"+f_marriage+"']").attr('selected','selected');
    }
    // 工作年限
    var f_l_year = $('#work_year').data('rel');
    if(f_l_year){
        $("#work_year option:first").attr('selected',false);
        $("#work_year option[value='"+f_l_year+"']").attr('selected','selected');
    }
    // 学历
    var f_edu_bg = $('.edu_bg').data('rel');
    if (f_edu_bg) {
        $('.edu_bg option:first').attr('selected', false);
        $('.edu_bg option[value="'+f_edu_bg+'"]').attr('selected', 'selected');
    }
    // 选择性别
    $('.sex').click(function(){
        $(this).removeClass('gray').siblings().addClass('gray');
    });
    // 选择地区
    $('#place, #expect_city, #gs_address').focus(function(){
        show_panel('pop_area');
        var rel = $(this).data('rel');
        $('.pop_area').data('rel', rel);
        var city = $(this).val();
        if (city == '') {
            create_province('北京');
        } else {
            create_province(city);
            $('.city li:contains('+city+')').addClass('select');
        }        
    });
    // 市
    $('.pop_area').on('click', '.province li', function(){
        var province = $(this).html();
        create_province(province);
    });
    $('.pop_area').on('click', '.city li', function(){
        var city = $(this).html();
        var rel = $('.pop_area').data('rel');
        if (rel == 0) {
            $('#place').val(city);
        } else if (rel == 1) {
            $('#expect_city').val(city);
        } else {
            $('#gs_address').val(city);
        }
        $(this).toggleClass('select');
        $('.cancel').click();
    });
    // 选择行业
    $('#expect_trade, #gs_trade').click(function(){
        show_panel('pop_trade');
        var rel = $(this).data('rel');
        $('.trade span').removeClass('select');
        var trade = $(this).val();
        if(rel == 0){
            $('.submit').show();
            if (trade != '') {
                var arr_trade = trade.split('，');
                $.each(arr_trade, function(k, v){
                    $('.trade span:contains('+v+')').addClass('select');
                });
            }
        } else {
            $('.submit').hide();
            if(trade != ''){
                $('.trade span:contains('+trade+')').addClass('select');
            }
        }
        $('.pop_trade').data('rel', rel);
    });

    $('.trade span').click(function(){
        var rel = $('.pop_trade').data('rel');
        if (rel == 0) {
            $(this).toggleClass('select');
            var nums = $('.trade span.select').size();
            if (nums > 5) {
                $(this).removeClass('select');
                layer.alert('最多可选择5个行业');
                return false;
            }
        } else {
            var trade = $(this).html();
            $('#gs_trade').val(trade);
            $('.cancel').click();
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
    // 保存基本信息
    $('.basic .btn_save').click(function(){
        var arr_cv = check_basic();
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
                    $('.img_edit .blue').html(data.data);
                    $('.basic').data('rel', 1);
                    $('.user_name').html(arr_cv['name']).removeClass('no_data');
                    $('.b_sex').html(arr_cv['sex']).removeClass('no_data');
                    $('.b_age').html((cur_year - arr_cv['birth_year'])+'岁').removeClass('no_data');
                    $('.b_address').html(arr_cv['cur_address']).removeClass('no_data');
                    $('.b_marriage').html(arr_cv['marriage']).removeClass('no_data');
                    $('.b_edu').html(arr_cv['edu_bg']).removeClass('no_data');
                    $('.b_work_year').html(arr_cv['work_year']).removeClass('no_data');
                    $('.b_phone').html(arr_cv['mobile']).removeClass('no_data');
                    $('.b_email').html(arr_cv['email']).removeClass('no_data');

                    closeDiv('basic');
                } else {
                    layer.alert('保存失败');
                }
                
            },
            error:function(){   
                alert('error');   
            }
        }); 
    });
    // 职业意向
    var f_work_state = $("#work_state").data('rel');
    if (f_work_state) {
        $('#work_state option:first').attr('selected', false);
        $('#work_state option[value="'+f_work_state+'"]').attr('selected','selected');
    }

    // 保存职业意向
    $('.will .btn_save').click(function(){
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
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $('.will').data('rel', 1);
                    $('.will_info').eq(4).html(arr_cv['work_state']).removeClass('no_data');
                    $('.will_info').eq(3).html(arr_cv['expect_city']).removeClass('no_data');
                    $('.will_info').eq(0).html(arr_cv['expect_trade']).removeClass('no_data');
                    $('.will_info').eq(1).html(arr_cv['expect_job']).removeClass('no_data');
                    $('.will_info').eq(2).html(arr_cv['expect_salary']).removeClass('no_data');

                    closeDiv('will');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });        
    });
    // 擅长技能
    var f_good_skills = $(".show_skill").data('rel');
    if(f_good_skills) {
       var s_arr = f_good_skills.split("|");
       var jn = '';
       var jn2 = '';
       $.each(s_arr, function(k, v){ 
          jn +='<span>'+v+'</span>\n';
          jn2 += '<span><b>'+v+'</b><a href="javascript:void(0);"></a></span>\n';
       })
       $(".skill_con").html(jn);
       $(".my_skill").html(jn2);
    }
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
    //保存技能 
    $(".skills .btn_save").click(function(){
        var bqian = '';
        var jn='';
        $(".my_skill b").each(function(){
            bqian += $(this).html()+'|';
            jn +='<span>'+$(this).html()+'</span>\n';
        })
        if(bqian == ''){layer.alert('请先添加技能标签');return false;}
        bqian = bqian.substring(0,bqian.length-1);

        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".skill_con").html(jn);
                    closeDiv('skill');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });  
    });


    // 教育经历
    //编辑
    $(".education").on('click', ".edu_con .edit_info_first", function(){
        $('.edu').data('rel', 1);   //用于判断是添加保存还是编辑保存
        var edu_id = $(this).parent().data('rel');
        $(".edu .btn_save").data('rel', edu_id);
        var school = $(this).siblings('li.school').html();
        $("#school").val(school);

        var major = $(this).siblings('li').find("span.major").html();
        $("#major").val(major);

        var degree = $(this).siblings('li.degree').html();
        $("#education2 option:first").attr('selected',false);
        $("#education2 option[value='"+degree+"']").attr('selected','selected');

        var edu_time = $(this).siblings('li.edu_time').html();
        edit_time(edu_time, 'start_year', 'start_month', 'end_year', 'end_month');
        openDiv('edu');
    });
    // 删除
    $("body").on('click', ".edu_con .delete_info" ,function(){
        var edu_nums = $('.edu_con').length;
        if (edu_nums == 1) {
            var rel = $('.edu_con').data('rel');
            $('.edu_con').removeClass('edus_'+rel).addClass("edus_0");
            $('.edu_con .school').html('');
            $('.edu_con .major').html('');
            $('.edu_con .degree').html('');
            $('.edu_con .edu_time').html('');
            $('.edu_con').hide();
        } else if(edu_nums > 1) {
            $(this).parent().remove();
        }
     
        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                } else {
                    layer.alert('删除失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 添加
    $(".education .lock_add").click(function(){
        if($('.edus_0 .school').html() == ''){
            $('.edu').data('rel', 1);   //用于判断是添加保存还是编辑保存
            $(".edu .btn_save").data('rel', 0);
        } else {
            $('.edu').data('rel', 0);
            clear_edu();
        }
        openDiv('edu');    
    });
    // 保存
    $("body").on('click', ".edu .btn_save" ,function(){
        var arr_cv = check_edu();
        if (arr_cv == false) {return false;}
        var eduid = $(this).data('rel');
        arr_cv['id'] = eduid;

        var rel = $('.edu').data('rel');
        var infos = get_all_info();
        var education = infos['education'];

        if (rel == 0) {
            // 添加保存         
            var form_edu = {
                'start_time': get_time('start_year', 'start_month'),
                'major': $.trim($('#major').val()),
                'end_time': get_time('end_year', 'end_month'),
                'school': $.trim($('#school').val()),
                'degree': $.trim($('#education2').val())
            };

            education.push(form_edu);
        } else {
            // 编辑保存
            var id = parseInt(eduid);
            education[id]['start_time'] = get_time('start_year', 'start_month');
            education[id]['major'] = $.trim($('#major').val());
            education[id]['end_time'] = get_time('end_year', 'end_month');
            education[id]['school'] = $.trim($('#school').val());
            education[id]['degree'] = $.trim($('#education2').val());
        }

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data); 
                    $(".education").data('rel', 1);
                    if (rel == 1) {
                        $('.edu_con').show();
                        var obj = $(".edus_"+eduid);
                        obj.find(".school").html(arr_cv['school']);
                        obj.find(".major").html(arr_cv['major']);
                        obj.find(".degree").html(arr_cv['degree']);
                        obj.find(".edu_time").html(arr_cv['edu_time']);
                    } else {
                        var edu_nums = $('.edu_con').length;
                        var item_tag = '<ul class="list-unstyled edu_con edus_'+edu_nums+' position" data-rel="'+edu_nums+'"><li class="cv_time edu_time">'+arr_cv['edu_time']+'</li><li class="cv_ss school">'+arr_cv['school']+'</li><li class="cv_other"><span class="major">'+arr_cv['major']+'</span><span class="split">|</span><span class="degree">'+arr_cv['degree']+'</span></li><div class="op edit_info_first" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></ul>'
                        $(".show_edu .p_add").before(item_tag);
                    }
                    closeDiv('edu');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });  
    });

 // 工作经历
    // 编辑
    $('.work_exp').on('click', '.work_con .edit_info_first', function(){

        $('.work').data('rel', 1);   //用于判断是添加保存还是编辑保存
        $(".work .btn_save").data('rel', $(this).parent().data('rel'));

        var gs = $(this).siblings('li').children('span.gs').html();
        $("#gs").val(gs);

        var work_time = $(this).siblings('li.work_time').html();
        edit_time(work_time, 'start_year2', 'start_month2', 'end_year2', 'end_month2');

        var gs_address = $(this).siblings('li').children('span.gs_address').html();
        $("#gs_address").val(gs_address);

        var gs_trade = $(this).siblings('li.gs_trade').html();
        $("#gs_trade").val(gs_trade);

        var gs_job = $(this).siblings('li').children('span.gs_job').html();
        $("#gs_job").val(gs_job);

        var job_duty = $(this).siblings('p').find(".content").html();
        $("#job_duty").val(job_duty);

        openDiv('work');
    });
    // 删除
    $("body").on('click', ".work_con .delete_info", function(){
        var w_nums = $('.work_exp .work_con').length;
        if (w_nums == 1) {
            var rel = $('.work_exp .work_con').data('rel');
            $('.work_exp .work_con').removeClass('w_tab_'+rel).addClass("w_tab_0");
            $('.work_exp .work_con .gs').html('');
            $('.work_exp .work_con .work_time').html('');
            $('.work_exp .work_con .gs_trade').html('');
            $('.work_exp .work_con .gs_job').html('');
            $('.work_exp .work_con .gs_address').html('');
            $('.work_exp .work_con .job_duty').html('');
            $('.work_exp .work_con').hide();
        } else if(w_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                } else {
                    layer.alert('删除失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 添加
    $(".work_exp .lock_add").click(function(){
        if($('.work_exp .work_con .gs').html() == ''){
            $(".work").data('rel', 1);
            $(".work .btn_save").data('rel', 0);
        }else{
            $(".work").data('rel', 0);
            $(".work .btn_save").attr('rel', '')
        }
        clear_work();
        openDiv('work');  
    });
    // 保存
    $(".work .btn_save").click(function(){
        var arr_cv = check_work();
        if (arr_cv == false) {return false;}
        var w_id = $(this).data('rel');
        arr_cv['id'] = w_id;


        var rel = $('.work').data('rel');
        var infos = get_all_info();
        var career = infos['career'];
        if (rel == 0) {
            // 添加保存          
            var form_work = {
                'duty': $('#job_duty').val(),
                'area': $('#gs_address').val(),
                'start_time': get_time('start_year2', 'start_month2'),
                'title': $('#gs_job').val(),
                'trade': $('#gs_trade').val(),
                'end_time': get_time('end_year2', 'end_month2'),
                'company': $('#gs').val()
            };

            career.push(form_work);
        } else {
            // 编辑保存
            var id = parseInt(w_id);
            career[id]['duty'] = $('#job_duty').val();
            career[id]['area'] = $('#gs_address').val();
            career[id]['start_time'] = get_time('start_year2', 'start_month2');
            career[id]['title'] = $('#gs_job').val();
            career[id]['trade'] = $('#gs_trade').val();
            career[id]['end_time'] = get_time('end_year2', 'end_month2');
            career[id]['company'] = $('#gs').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".work_exp").data('rel', 1);
                    if (rel == 1) {
                        $('.work_exp .work_con').show();
                        $(".w_tab_"+w_id+" .gs").html(arr_cv['gs']);
                        $(".w_tab_"+w_id+" .work_time").html(arr_cv['work_time']);
                        $(".w_tab_"+w_id+" .gs_address").html(arr_cv['gs_address']);
                        $(".w_tab_"+w_id+" .gs_trade").html(arr_cv['gs_trade']);
                        $(".w_tab_"+w_id+" .gs_job").html(arr_cv['gs_job']);
                        $(".w_tab_"+w_id+" .job_duty .content").html(arr_cv['job_duty']);       
                    } else {
                        var work_nums = $('.work_exp .work_con').length;
                        var tag = '<ul class="work_con w_tab_'+work_nums+' position" data-rel="'+work_nums+'" ><li class="work_time edu_time">'+arr_cv['work_time']+'</li><li class="gs_trade cv_ss">'+arr_cv['gs_trade']+'</li><li class="cv_tt"><span class="gs">'+arr_cv['gs']+'</span><span class="split">|</span><span class="gs_job">'+arr_cv['gs_job']+'}</span><span class="split">|</span><span class="gs_address">'+arr_cv['gs_address']+'</span></li><p class="job_duty cv_other"><span class="no_data">工作内容：</span><span class="content ">'+arr_cv['job_duty']+'</span></p><div class="op edit_info_first" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></ul>'
                        $(".show_work").append(tag);
                    }
                    closeDiv('work');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    
    // 项目经验
    // 编辑
    $(".item_exp").on('click', ".item_con .edit_info_first", function(){
        $(".project").data('rel', 1);
        $(".project .btn_save").data('rel', $(this).parent().data('rel'));

        var item_name = $(this).siblings('li.item_name').html();
        $("#item_name").val(item_name);

        var item_duty = $(this).siblings('li.item_duty').html();
        $("#item_duty").val(item_duty);

        var item_time = $(this).siblings('li.item_time').html();
        edit_time(item_time, 'start_year3', 'start_month3', 'end_year3', 'end_month3');

        var item_des = $(this).siblings('li.item_des').html();
        $("#item_des").val(item_des);
        openDiv('project');
    });
    // 删除
    $("body").on('click', ".item_con .delete_info", function(){
        var p_nums = $('.item_exp .item_con').length;
        if (p_nums == 1) {
            var rel = $('.item_exp .item_con').data('rel');
            $('.item_exp .item_con').removeClass('item_tab_'+rel).addClass("item_tab_0");
            $('.item_exp .item_con .item_name').html('');
            $('.item_exp .item_con .item_time').html('');
            $('.item_exp .item_con .item_duty').html('');
            $('.item_exp .item_con .item_des').html('');
            $('.item_exp .item_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                } else {
                    layer.alert('删除失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 添加
    $(".item_exp .lock_add").click(function(){
        if($('.item_exp .item_con .item_name').html() == ''){
            $(".project").data('rel', 1);
            $(".project .btn_save").data('rel', 0);
        }else{
            $(".project").data('rel', 0);
        }
        clear_item();
        openDiv('project'); 
    });
    // 保存
    $(".project .btn_save").click(function(){
        var arr_cv = check_item();
        if (arr_cv == false) {return false;}
        var p_id = $(this).data('rel');
        arr_cv['id'] = p_id;

        var rel = $('.project').data('rel');
        var infos = get_all_info();
        var experience = infos['experience'];
        if (rel == 0) {
            // 添加保存          
            var form_item = {
                'project_name': $('#item_name').val(),
                'title': $('#item_duty').val(),
                'start_time': get_time('start_year3', 'start_month3'),
                'end_time': get_time('end_year3', 'end_month3'),
                'description': $('#item_des').val()
            };

            experience.push(form_item);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            experience[id]['project_name'] = $('#item_name').val();
            experience[id]['title'] = $('#item_duty').val();
            experience[id]['start_time'] = get_time('start_year3', 'start_month3');
            experience[id]['end_time'] = get_time('end_year3', 'end_month3');
            experience[id]['description'] = $('#item_des').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".item_exp").data('rel', 1)
                    if (rel == 1) {
                        $(".item_exp .item_con").show();
                        $(".item_tab_"+p_id+" .item_name").html(arr_cv['item_name']);
                        $(".item_tab_"+p_id+" .item_time").html(arr_cv['item_time']);
                        $(".item_tab_"+p_id+" .item_duty").html(arr_cv['item_duty']);
                        $(".item_tab_"+p_id+" .item_des").html(arr_cv['item_des']);                           
                    } else {
                        var item_nums = $('.item_exp .item_con').length;
                        var item_tag = '<div class="item_con item_tab_'+item_nums+'" data-rel="'+item_nums+'"><p><span class="item_name">'+arr_cv['item_name']+'</span><span class="item_time">'+arr_cv['item_time']+'</span></p><p class="item_duty">'+arr_cv['item_duty']+'</p><p class="item_des">'+arr_cv['item_des']+'</p><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_item").append(item_tag);
                    }
                    closeDiv('project');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });

    // 自我描述
    $(".self_info .btn_save").click(function(){
        var my_con = $.trim($("#des_con").val());
        if(my_con == ''){layer.alert('请填写自我描述！'); return false;}
        var infos = get_all_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.img_edit .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".show_self p").html(my_con);
                    closeDiv('self_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });        
    });

})
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

function create_month(){
    var months = '';
    for(var i=1; i<=12; i++){
      months += '<option value="'+i+'">'+i+'月</option>';
    }
    return months;
}
function get_time(year, month){
    var y = $("#"+year).val();
    var m = $('#'+month).val();
    if (m < 10) {
      m = '0' + m;
    }
    return y+'.'+m;
}
function clear_work(){
    $("#gs").val('');
    $("#gs_trade").val('');
    $("#gs_job").val('');
    $("#gs_address").val('');
    $("#job_duty").val('');
    $("#start_year2").val('');
    $("#start_month2").val('');
    $("#end_year2").val('');
    $("#end_month2").val(''); 
}
function clear_item(){
    $("#item_name").val('');
    $("#item_duty").val('');
    $("#item_des").val('');
    $("#start_year3").val('');
    $("#start_month3").val('');
    $("#end_year3").val('');
    $("#end_month3").val('');   
}
// 日期编辑
function edit_time(t, s_yid, s_mid, e_yid, e_mid){
    var t2 = t.split(' - ');
    var s_t = t2[0];
    var s_year = s_t.substr(0, 4);
    var s_mon = s_t.substr(-2, 2);
    if(s_mon <10)
    {
      s_mon = s_mon.replace('0', '');
    }
    
    $("#"+s_yid+" option:first").attr('selected',false);
    $("#"+s_yid+" option[value='"+s_year+"']").attr('selected','selected');
    $("#"+s_yid).val(s_year);
    $("#"+s_mid+" option:first").attr('selected',false);
    $("#"+s_mid+" option[value='"+s_mon+"']").attr('selected','selected');
    $("#"+s_mid).val(s_mon);

    var e_t = t2[1];
    var e_year = e_t.substr(0, 4);
    var e_mon = e_t.substr(-2, 2);
    if(e_mon <10)
    {
      e_mon = e_mon.replace('0', '');
    }
    
    $("#"+e_yid+" option:first").attr('selected',false);
    $("#"+e_yid+" option[value='"+e_year+"']").attr('selected','selected');
    $("#"+e_yid).val(e_year);
    $("#"+e_mid+" option:first").attr('selected',false);
    $("#"+e_mid+" option[value='"+e_mon+"']").attr('selected','selected');
    $("#"+e_mid).val(e_mon);
}

    function clear_edu(){
    $(".edu .btn_save").data('rel', '');
    $("#school").val('');
    $("#major").val('');
    $("#start_year").val('');
    $("#start_month").val('');
    $("#end_year").val('');
    $("#end_month").val(''); 
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

    // 教育经历
    var obj_edu = $('.edu_con');
    var arr_edu = [];
    if (obj_edu.length > 0) {
        for (var i = 0; i < obj_edu.length; i++) {
            var school_name = $.trim($('.edu_con:eq('+i+') .school').html());
            var major_name = $.trim($('.edu_con:eq('+i+') .major').html());
            var edu_bg = $.trim($('.edu_con:eq('+i+') .degree').html());
            var edu_time = $.trim($('.edu_con:eq('+i+') .edu_time').html());
            var arr_edu_time = edu_time.split(' - ');
            var edu_start_time = $.trim(arr_edu_time[0]);
            var edu_end_time = $.trim(arr_edu_time[1]);

            arr_edu[i] = {
                'start_time': edu_start_time,
                'major': major_name,
                'end_time': edu_end_time,
                'school': school_name,
                'degree': edu_bg
            };
        }
    }




    // 工作经历
    var obj_work = $('.work_con');
    var arr_work = [];
    if (obj_work.length > 0) {
        for (var i = 0; i < obj_work.length; i++) {
            var company = $('.work_exp .work_con:eq('+i+') .gs').html();
            var work_time = $('.work_exp .work_con:eq('+i+') .work_time').html();
            var work_area = $('.work_exp .work_con:eq('+i+') .gs_address').html();
            var work_trade = $('.work_exp .work_con:eq('+i+') .gs_trade').html();
            var work_name = $('.work_exp .work_con:eq('+i+') .gs_job').html();
            var work_duty = $('.work_exp .work_con:eq('+i+') .content').html();
            var arr_work_time = work_time.split(' - ');
            var work_start_time = arr_work_time[0];
            var work_end_time = arr_work_time[1];

            arr_work[i] = {
                'duty': work_duty,
                'area': work_area,
                'start_time': work_start_time,
                'title': work_name,
                'trade': work_trade,
                'end_time': work_end_time,
                'company': company
            };
        }
    }

    // 项目经验
    var obj_item = $('.item_exp .item_con');
    var arr_item = [];
    if (obj_item.length > 0) {
        for (var i = 0; i < obj_item.length; i++) {
            var item_name = $('.item_exp .item_con:eq('+i+') .item_name').html();
            var item_duty = $('.item_exp .item_con:eq('+i+') .item_duty').html();
            var item_time = $('.item_exp .item_con:eq('+i+') .item_time').html();
            var item_des = $('.item_exp .item_con:eq('+i+') .item_des').html();

            var arr_item_time = item_time.split(' - ');
            var item_start_time = arr_item_time[0];
            var item_end_time = arr_item_time[1];

            arr_item[i] = {
                'project_name': item_name,
                'title': item_duty,
                'start_time': item_start_time,
                'end_time': item_end_time,
                'description': item_des
            };
        }
    }

    return {
        'basic':{
            'work_years': $('#work_year').val(),
            'birthday': $('#birth_year').val(),
            'name': $('#real_name').val(),
            'current_area': $('#place').val(),
            'marital_status': $('#marriage').val(),
            'gender': $('.other_gray').siblings("span").html(),
            'education': $('.edu_bg').val(),
            'phonenum': $('#mobile').val(),
            'email':$("#email").val(),
            'avatar': $(".head_img").find("img").data("rel")
        },

        // 工作状态及职业意向
        'intension':{
            'status': $("#work_state").val(),
            'expect_salary': $("#expect_salary").val(),
            'area': $("#expect_city").val(),
            'title': $("#expect_job").val(),
            'trade': $("#expect_trade").val()
        },

        // 擅长技能
        'tags': arr_skill,

        // 教育经历
        'education': arr_edu,

        // 工作经历
        'career': arr_work,

        // 工作经验
        'experience':arr_item,

        // 自我描述
        'description': $.trim($("#des_con").val()),

        // 其他信息
        'extra': $.trim($("#other_con").val())
    };
}


function openDiv(obj){
    $("."+obj).show();
		$(".two_part").hide();
}

function closeDiv(obj){
     $("."+obj).hide();
	$(".two_part").show();
}

function show_panel(obj){
    $('.black_overlay').show();
    $('.'+obj).show();
}

function cancelfill(obj, notice){
    var is_perfect = $("."+obj).data('rel');
    if (is_perfect == '') {
        layer.alert(notice);
        openDiv(obj);
    } else {
        closeDiv(obj);
    }
}
function check_item(){
  var arr_item = {};
  var item_name  = ChkEmpty('item_name', '请输入项目名称');
  if(item_name == false){ return false;}

  var start_year3  = ChkEmpty('start_year3', '请选择开始年份');
  if(start_year3 == false){ return false;}

  var start_month3  = ChkEmpty('start_month3', '请选择开始月份');
  if(start_month3 == false){ return false;}

  var end_year3  = ChkEmpty('end_year3', '请选择结束年份');
  if(end_year3 == false){ return false;}

  var end_month3  = ChkEmpty('end_month3', '请选择结束月份');
  if(end_month3 == false){ return false;}

  var item_time = chkyear(start_year3, start_month3, end_year3, end_month3);
  if(!item_time){return false;}

  var item_duty = $("#item_duty").val();
  var item_des = $("#item_des").val();
  arr_item['item_name'] = item_name;
  arr_item['item_duty'] = item_duty;
  arr_item['item_des'] = item_des;
  arr_item['item_time'] = item_time;
  
  return arr_item;
}
function check_basic(){
    var arr_basic = {};
    var sex = $('.other_gray').siblings("span").html();
    var marriage = $("#marriage").val();
    var work_year = $("#work_year").val();
    var edu_bg = $(".edu_bg").val();

    var name = ChkChinese('real_name');
    if (!name) {return false}

    var birth_year = ChkEmpty('birth_year', '请选择您的出生年份');
    if (!birth_year) {return false};

    var mobile = ChkMobile('mobile', '手机号格式不正确');
    if (!mobile) {return false};

    var email = ChkEmail('email', '邮箱格式不正确');
    if (!email) {return false};

    var cur_address = ChkEmpty('place', '请选择您的常住地区');
    if (!cur_address) {return false};

    arr_basic['name'] = name;
    arr_basic['sex'] = sex;
    arr_basic['birth_year'] = birth_year;
    arr_basic['marriage'] = marriage;
    arr_basic['mobile'] = mobile;
    arr_basic['email'] = email;
    arr_basic['cur_address'] = cur_address;
    arr_basic['work_year'] = work_year;
    arr_basic['edu_bg'] = edu_bg;

    return arr_basic;
}
function check_will(){
    var arr_will = {};
    var work_state = $('#work_state').val();

    var expect_trade = ChkEmpty('expect_trade', '请选择您期望的行业');
    if (!expect_trade) {return false}

    var expect_job = ChkJobNum('expect_job', '最多可输入五个职位');
    if (!expect_job) {return false};
    $("#expect_job").val(expect_job);

    var expect_city = ChkEmpty('expect_city', '请选择您期望的工作地点');
    if (!expect_city) {return false};

    var expect_salary = ChkSalary('expect_salary','请按格式输入正确的期望薪资');
    if (!expect_salary) {return false};

    arr_will['work_state'] = work_state;
    arr_will['expect_trade'] = expect_trade;
    arr_will['expect_job'] = expect_job;
    arr_will['expect_city'] = expect_city;
    arr_will['expect_salary'] = expect_salary;

    return arr_will;
}
function check_edu(){
    var arr_edu = {};
    var school  = ChkEmpty('school', '请输入您的毕业院校');
    if(school == false){ return false;}

    var major  = ChkEmpty('major', '请输入您所学专业名称');
    if(major == false){ return false;}

    var start_year  = ChkEmpty('start_year', '请选择开始年份');
    if(start_year == false){ return false;}

    var start_month  = ChkEmpty('start_month', '请选择开始月份');
    if(start_month == false){ return false;}

    var end_year  = ChkEmpty('end_year', '请选择结束年份');
    if(end_year == false){ return false;}

    var end_month  = ChkEmpty('end_month', '请选择结束月份');
    if(end_month == false){ return false;}

    var edu_time = chkyear(start_year, start_month, end_year, end_month);
    if (!edu_time) {return false;}

    var degree = $("#education2").val();

    arr_edu['school'] = school;
    arr_edu['major'] = major;
    arr_edu['edu_time'] = edu_time;
    arr_edu['degree'] = degree;
    
    return arr_edu; 
}
function check_work(){
    var arr_work = {};
    var gs  = ChkEmpty('gs', '请输入公司名称');
    if(gs == false){ return false;}

    var gs_trade  = ChkEmpty('gs_trade', '请选择您从事的行业名称');
    if(gs_trade == false){ return false;}

    var gs_job  = ChkEmpty('gs_job', '请输入您从事的职位名称');
    if(gs_job == false){ return false;}

    var gs_address  = ChkEmpty('gs_address', '请选择工作地点');
    if(gs_address == false){ return false;}

    var start_year2  = ChkEmpty('start_year2', '请选择开始年份');
    if(start_year2 == false){ return false;}

    var start_month2  = ChkEmpty('start_month2', '请选择开始月份');
    if(start_month2 == false){ return false;}

    var end_year2  = ChkEmpty('end_year2', '请选择结束年份');
    if(end_year2 == false){ return false;}

    var end_month2  = ChkEmpty('end_month2', '请选择结束月份');
    if(end_month2 == false){ return false;}

    var work_time = chkyear(start_year2, start_month2, end_year2, end_month2);
    if(!work_time){return false;}

    var job_duty  = ChkEmpty('job_duty', '请输入工作职责');
    if(job_duty == false){ return false;}

    arr_work['gs'] = gs;
    arr_work['gs_trade'] = gs_trade;
    arr_work['gs_job'] = gs_job;
    arr_work['gs_address'] = gs_address;
    arr_work['work_time'] = work_time;
    arr_work['job_duty'] = job_duty;
    
    return arr_work;   
}

// 比较结束时间与开始时间的大小
function chkyear(start_year, start_month, end_year, end_month){
    if (start_year > end_year) {
        layer.alert('结束时间必须大于开始时间');
        return false;
    }

    if (start_year == end_year && start_month >= end_month) {
        layer.alert('结束时间必须大于开始时间');
        return false;
    }

    if (start_month < 10) {
        start_month = '0' + start_month;
    }
    var t1 = start_year + '.' + start_month;

    if (end_month < 10) {
        end_month = '0' + end_month;
    }
    var t2 = end_year + '.' + end_month;

    return t1 + ' - ' + t2;
}
