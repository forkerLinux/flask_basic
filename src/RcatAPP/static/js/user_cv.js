var d = new Date();
var cur_year = parseInt(d.getFullYear());
var birth_year_f = '';
$(function(){ 
     $('#school').typeahead({source: university_list, items: 5});
     $('#major').typeahead({source: major_data, items: 5});

    // 简历公开程度
    var openlevel = $.trim($('.openlevel').val());
    var arr_level = {
        'public': '对所有公开',
        'open': '对招聘头条公开',
        'secret': '完全保密'
    };
    if(openlevel != ''){
        $('.choose').html(arr_level[openlevel]);
    }else{
        $('.choose').html(arr_level['public']);
    }
    $('.cv_name').change(function(){
        var cv_name = $(this).val();
        $.ajax({
            type:'post',
            url: "/api_cv_name",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'resume_name' : cv_name}),
            success: function(data) { 

            },
            error: function(){
                alert('error');
            }
        });
    });
    $('.public_level p').click(function(){
        var width = $(this).outerWidth(true);
        $(this).next('ul').css('min-width', width+'px');
        $(this).addClass('action');
    });
    $('.public_level li a').click(function(){
        var con = $(this).html();
        $('.choose').html(con);
        $('.public_level p').removeClass('action');
        var level = $(this).data('level');
        $.ajax({
            type:'post',
            url: "/api_cv_openlevel",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'openlevel' : level}),
            success: function(data) { 
                console.log(data);
            },
            error: function(){
                alert('error');
            }
        });
    });
    // 导航
    $('.cv_nav a').click(function(){
        $(this).addClass('tab_select').siblings().removeClass('tab_select');
        $(this).children('.no_active').hide();
        $(this).children('.already_active').show();
        $(this).siblings().children('.no_active').show();
        $(this).siblings().children('.already_active').hide();
    });
    // 基本信息
    // 上传头像
    $('.head_img').hover(function(){
        $('.head_img_bg').show();
        $('.head_img_note').show();
    }, function(){
        $('.head_img_bg').hide();
        $('.head_img_note').hide();
    });

    $('.head_img').click(function(){
        show_panel('black_overlay', 'pop_modify_pic');
        // $('.black_overlay').show();
        // $('.pop_modify_pic').show();
        // $('.pop_modify_pic').parent().show();
    });

    $('.pop_close, .btn_savepic').click(function(){
        // $('.black_overlay').hide();
        // $(this).parent().parent().hide();
        close_panel('black_overlay', 'pop_modify_pic');  
    });

    $('.cancel').click(function(){
        close_panel('black_overlay', 'p_panel');         
    });

    $('.my_cv').hover(function(){
        $(this).children('.op').show();
    }, function(){
        $(this).children('.op').hide();
    });

    $('.s_f_cv').on('mouseover', '.edu_con, .work_con, .item_con, .job_con, .award_con, .cv_con', function(){
        $(this).children('.op').show();
    });

    $('.s_f_cv').on('mouseout', '.edu_con, .work_con, .item_con, .job_con, .award_con, .cv_con', function(){
        $(this).children('.op').hide();
    });

    // 动态生成年份和月份
    var years = create_year();
    $("select.year").append(years);
    var months = create_month();
    $("select.month").append(months);
    //出生年份
    birth_year_f = $("#birth_year").data('rel');
    if(birth_year_f !=''){
        $("#birth_year option:first").attr('selected',false);
        $("#birth_year option[value="+birth_year_f+"]").attr('selected','selected');
    }
    // 婚姻状况
    var f_marriage = $('#marriage').data('rel');
    if(f_marriage){
        $("#marriage option:first").attr('selected',false);
        $("#marriage option[value='"+f_marriage+"']").attr('selected','selected');
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
    // 政治面貌
    var f_polity = $('#polity_face').data('rel');
    if(f_polity){
        $("#polity_face option:first").attr('selected',false);
        $("#polity_face option[value='"+f_polity+"']").attr('selected','selected');
    }
    // 选择地区
    $('#place, #expect_city, #gs_address').focus(function(){
        show_panel('black_overlay', 'pop_area');
        var rel = $(this).data('rel');
        $('.pop_area').data('rel', rel);
        var province = $(this).data('province');
        var city = $(this).val();
        if(province == ''){
            create_province('北京');
        }else{
            create_province(province);
            $('.city li:contains('+city+')').addClass('select');
        }
    });
    // 市
    $('body').on('click', '.province li', function(){
        var province = $(this).html();
        var rel = $('.pop_area').data('rel');
        if(province != '不限'){
            if(rel == 0){
                $('#place').data('province', province);
            }else if(rel == 1){
                $('#expect_city').data('province', province);
            }else{
                $('#gs_address').data('province', province);
            }
            create_province(province);
        }else{
            if (rel == 0) {
                $('#place').val('不限');
                $('#place').data('province', '');
            } else if (rel == 1) {
                $('#expect_city').val('不限');
                $('#expect_city').data('province', '');
            } else {
                $('#gs_address').val('不限');
                $('#gs_address').data('province', '');
            }
            $('.cancel').click();
        }        
    });
    $('body').on('click', '.city li', function(){
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
            $('.pop_trade .submit').show();
            if (trade != '' && trade != '不限') {
                var arr_trade = trade.split('，');
                $.each(arr_trade, function(k, v){
                    $('.trade span:contains('+v+')').addClass('select');
                });
            }
        } else {
            $('.pop_trade .submit').hide();
            if(trade != '' && trade != '不限'){
                $('.trade span:contains('+trade+')').addClass('select');
            }
        }
        $('.pop_trade').data('rel', rel);
    });

    $('.trade span').click(function(){
        var rel = $('.pop_trade').data('rel');
        var trade = $(this).html();
        if(trade == '不限'){
            $(this).siblings().removeClass('select');
            if(rel == 0){
                $('#expect_trade').val(trade);
            }else{
                $('#gs_trade').val(trade);
            }
            $('.cancel').click();
        }else{
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
        show_panel('black_overlay', 'pop_jobs');
        var job = $.trim($(this).val());
        var job_trade = $.trim($('.job_trade').data('trade'));
        if(job_trade == ''){
            create_jobs(jobsdata[1]['trade']);
        }else{
            create_jobs(job_trade);
        }
        if(job != ''){
            var arr_job = job.split(',');
            $.each(arr_job, function(k, v){                
                $('.jobs li:contains('+v+')').addClass('select');
            }); 
        }              
    });
    // 职位所属行业行业
    $('body').on('click', '.job_trade li', function(){
        var trade = $(this).html();
        if(trade == '不限'){
            $("#expect_job").val(trade);
            $('.cancel').click();
        }else{
            create_jobs(trade);
            $('.job_trade').data('trade', trade);  
        }        
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
    $('.basic .btn_save').click(function(){
        var arr_cv = check_basic();
        if (!arr_cv) {return false;}
        console.log(arr_cv);
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : arr_cv}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $('.basic').data('rel', 1);
                    $('.show_basic span').removeClass('no_write');
                    $('.user_name').html(arr_cv['basic']['name']);
                    $('.b_sex').html(arr_cv['basic']['gender']);
                    $('.b_year').html(arr_cv['basic']['birthday']+'年');
                    $('.b_address').html(arr_cv['basic']['current_area']);
                    $('.b_marriage').html(arr_cv['basic']['marital_status']);
                    $('.b_edu').html(arr_cv['basic']['education']);
                    $('.b_phone').html(arr_cv['basic']['phonenum']);
                    $('.b_email').html(arr_cv['basic']['email']);
                    $('.b_polity_face').html(arr_cv['basic']['politics_status']);

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
        console.log(arr_cv)
        if (!arr_cv) {return false;}

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : arr_cv}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $('.will').data('rel', 1);
                    $('.will_info').eq(0).html(arr_cv['intension']['status']);
                    $('.will_info').eq(1).html(arr_cv['intension']['area']);
                    $('.will_info').eq(2).html(arr_cv['intension']['trade']);
                    $('.will_info').eq(3).html(arr_cv['intension']['title']);
                    $('.will_info').eq(4).html(arr_cv['intension']['expect_salary']+'元');

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
    // 教育经历
    //编辑
    $("body").on('click', ".edu_con .edit_info", function(){

        $('.edu').data('rel', 1);   //用于判断是添加保存还是编辑保存
        var edu_id = $(this).parent().data('rel');
        $(".edu .btn_save").data('rel', edu_id);
        var school = $(this).siblings('p').find('.school').text();
        $("#school").val(school);

        var major = $(this).siblings('p').find('.major').text();
        $("#major").val(major);

        var degree = $(this).siblings('p').find('.degree').html();
        $("#education2 option:first").attr('selected',false);
        $("#education2 option[value='"+degree+"']").attr('selected','selected');
        $("#education2").val(degree);

        var edu_time = $(this).siblings('p').find('.edu_time').html();
        edit_time(edu_time, 'start_year', 'start_month', 'end_year', 'end_month');
        openDiv('edu');
        var width=$("#school").outerWidth();
        $(".typeahead").width(width-2);


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
     
        var infos = get_edu_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
                
        var width=$("#school").outerWidth();
        $(".typeahead").width(width-2);

    });
    // 保存
    $("body").on('click', ".edu .btn_save" ,function(){
        var arr_cv = check_edu();
        if (arr_cv == false) {return false;}
        var eduid = $(this).data('rel');
        arr_cv['id'] = eduid;

        var rel = $('.edu').data('rel');
        var infos = get_edu_info();
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
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data); 
                    $(".education").data('rel', 1);
                    if (rel == 1) {
                        $('.edu_con').show();
                        var obj = $(".edus_"+eduid);
                        obj.find(".school").text(arr_cv['school'].toString());
                        obj.find(".major").text(arr_cv['major'].toString());
                        obj.find(".degree").html(arr_cv['degree']);
                        obj.find(".edu_time").html(arr_cv['edu_time']);
                    } else {
                        var edu_nums = $('.edu_con').length
                        var item_tag = '<div class="edu_con edus_'+edu_nums+'" data-rel="'+edu_nums+'"><p><span class="school"></span><span class="edu_time">'+arr_cv['edu_time']+'</span></p><p><span class="major"></span><span class="degree">'+arr_cv['degree']+'</span></p><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_edu").append(item_tag);
                        $(".edus_"+edu_nums+" .school").text(arr_cv['school'].toString())
                        $(".edus_"+edu_nums+" .major").text(arr_cv['major'].toString())
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
    $('body').on('click', '.work_con .edit_info', function(){
        $('.work').data('rel', 1);   //用于判断是添加保存还是编辑保存
        $(".work .btn_save").data('rel', $(this).parent().data('rel'));

        var gs = $(this).siblings('p').children('span.gs').text();
        $("#gs").val(gs);

        var work_time = $(this).siblings('p').children('span.work_time').html();
        edit_time(work_time, 'start_year2', 'start_month2', 'end_year2', 'end_month2');

        var gs_address = $(this).siblings('p').children('span.gs_address').html();
        $("#gs_address").val(gs_address);

        var gs_trade = $(this).siblings('p').children('span.gs_trade').text();
        $("#gs_trade").val(gs_trade);

        var gs_job = $(this).siblings('p').children('span.gs_job').html();
        $("#gs_job").val(gs_job);

        var job_duty = $(this).siblings('.job_duty').text();
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
        var infos = get_work_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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

        //============
        var rel = $('.work').data('rel');
        var infos = get_work_info();
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
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".work_exp").data('rel', 1);
                    if (rel == 1) {
                        $('.work_exp .work_con').show();
                        $(".w_tab_"+w_id+" .gs").text(arr_cv['gs'].toString());
                        $(".w_tab_"+w_id+" .work_time").html(arr_cv['work_time']);
                        $(".w_tab_"+w_id+" .gs_address").html(arr_cv['gs_address']);
                        $(".w_tab_"+w_id+" .gs_trade").html(arr_cv['gs_trade']);
                        $(".w_tab_"+w_id+" .gs_job").text(arr_cv['gs_job'].toString());
                        $(".w_tab_"+w_id+" .job_duty").text(arr_cv['job_duty'].toString());       
                    } else {
                        var work_nums = $('.work_exp .work_con').length;
                        var tag = '<div class="work_con w_tab_'+work_nums+'" data-rel="'+work_nums+'"><p><span class="gs">'+escape(arr_cv['gs'].toString())+'</span><span class="work_time">'+arr_cv['work_time']+'</span></p><p><span class="gs_job"></span><span class="gs_trade">'+arr_cv['gs_trade']+'</span><span class="gs_address">'+arr_cv['gs_address']+'</span></p><p class="job_duty"></p><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_work").append(tag);
                        $(".w_tab_"+work_nums+" .gs").text(arr_cv['gs'].toString())
                        $(".w_tab_"+work_nums+" .gs_job").text(arr_cv['gs_job'].toString());
                        $(".w_tab_"+work_nums+" .job_duty").text(arr_cv['job_duty'].toString());
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
    $("body").on('click', ".item_con .edit_info", function(){
        $(".project").data('rel', 1);
        $(".project .btn_save").data('rel', $(this).parent().data('rel'));

        var item_name = $(this).siblings('p').children('span.item_name').text();
        $("#item_name").val(item_name);

        var item_duty = $(this).siblings('p.item_duty').text();
        $("#item_duty").val(item_duty);

        var item_time = $(this).siblings('p').children('span.item_time').html();
        edit_time(item_time, 'start_year3', 'start_month3', 'end_year3', 'end_month3');

        var item_des = $(this).siblings('.item_des').text();
        $("#item_des").html(item_des);
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
        var infos = get_item_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
        var infos = get_item_info();
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
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".item_exp").data('rel', 1)
                    if (rel == 1) {
                        $(".item_exp .item_con").show();
                        $(".item_tab_"+p_id+" .item_name").text(arr_cv['item_name'].toString());
                        $(".item_tab_"+p_id+" .item_time").html(arr_cv['item_time']);
                        $(".item_tab_"+p_id+" .item_duty").text(arr_cv['item_duty'].toString());
                        $(".item_tab_"+p_id+" .item_des").text(arr_cv['item_des'].toString());                           
                    } else {
                        var item_nums = $('.item_exp .item_con').length;
                        var item_tag = '<div class="item_con item_tab_'+item_nums+'" data-rel="'+item_nums+'"><p><span class="item_name"></span><span class="item_time">'+arr_cv['item_time']+'</span></p><p class="item_duty"></p><pre class="item_des"></pre><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_item").append(item_tag);
                        $(".item_tab_"+item_nums+" .item_name").text(arr_cv['item_name'].toString())
                        $(".item_tab_"+item_nums+" .item_duty").text(arr_cv['item_duty'].toString())
                        $(".item_tab_"+item_nums+" .item_des").text(arr_cv['item_des'].toString())
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
    // 校内职务
    // 编辑
    $("body").on('click', ".job_con .edit_info", function(){
        $(".job_info").data('rel', 1);
        $(".job_info .btn_save").data('rel', $(this).parent().data('rel'));

        var job_name = $(this).siblings('p').children('span.job_name').text();
        $("#job_name").val(job_name);

        var school = $(this).siblings('p.school_name').text();
        $("#my_school").val(school);

        var job_time = $(this).siblings('p').children('span.job_time').html();
        edit_time(job_time, 'start_year4', 'start_month4', 'end_year4', 'end_month4');

        var job_des = $(this).siblings('.job_des').text();
        $("#job_des").html(job_des);
        openDiv('job_info');
    });
    // 删除
    $("body").on('click', ".job_con .delete_info", function(){
        var p_nums = $('.school_job .job_con').length;
        if (p_nums == 1) {
            var rel = $('.school_job .job_con').data('rel');
            $('.school_job .job_con').removeClass('job_tab_'+rel).addClass("job_tab_0");
            $('.school_job .job_con .job_name').html('');
            $('.school_job .job_con .job_time').html('');
            $('.school_job .job_con .school_name').html('');
            $('.school_job .job_con .job_des').html('');
            $('.school_job .job_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_job_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
    $(".school_job .lock_add").click(function(){
        if($('.school_job .job_con .job_name').html() == ''){
            $(".job_info").data('rel', 1);
            $(".job_info .btn_save").data('rel', 0);
        }else{
            $(".job_info").data('rel', 0);
        }
        clear_job();
        openDiv('job_info'); 
    });
    // 保存
    $(".job_info .btn_save").click(function(){
        var arr_cv = check_job();
        if (arr_cv == false) {return false;}
        var p_id = $(this).data('rel');
        arr_cv['id'] = p_id;

        var rel = $('.job_info').data('rel');
        var infos = get_job_info();
        var school_job = infos['school_job'];
        if (rel == 0) {
            // 添加保存          
            var form_job = {
                'job_name': $('#job_name').val(),
                'school_name': $('#my_school').val(),
                'start_time': get_time('start_year4', 'start_month4'),
                'end_time': get_time('end_year4', 'end_month4'),
                'job_info': $('#job_des').val()
            };

            school_job.push(form_job);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            school_job[id]['job_name'] = $('#job_name').val();
            school_job[id]['school_name'] = $('#my_school').val();
            school_job[id]['start_time'] = get_time('start_year4', 'start_month4');
            school_job[id]['end_time'] = get_time('end_year4', 'end_month4');
            school_job[id]['job_info'] = $('#job_des').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".school_job").data('rel', 1)
                    if (rel == 1) {
                        $(".school_job .job_con").show();
                        $(".job_tab_"+p_id+" .job_name").text(arr_cv['job_name'].toString());
                        $(".job_tab_"+p_id+" .school_name").text(arr_cv['school_name'].toString());
                        $(".job_tab_"+p_id+" .job_time").html(arr_cv['job_time']);
                        $(".job_tab_"+p_id+" .job_des").text(arr_cv['job_des'].toString());                           
                    } else {
                        var job_nums = $('.school_job .job_con').length;
                        var job_tag = '<div class="job_con job_tab_'+job_nums+'" data-rel="'+job_nums+'"><p><span class="job_name"></span><span class="job_time">'+arr_cv['job_time']+'</span></p><p class="school_name"></p><pre class="job_des"></pre><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_school_job").append(job_tag);
                        $(".job_tab_"+job_nums+" .job_name").text(arr_cv['job_name'].toString())
                         $(".job_tab_"+job_nums+" .school_name").text(arr_cv['school_name'].toString())
                          $(".job_tab_"+job_nums+" .job_des").text(arr_cv['job_des'].toString())
                    }
                    closeDiv('job_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });
    // 校内奖励
    // 编辑
    $("body").on('click', ".award_con .edit_info", function(){
        $(".award_info").data('rel', 1);
        $(".award_info .btn_save").data('rel', $(this).parent().data('rel'));

        var job_name = $(this).siblings('p').children('span.award_name').text();
        $("#award_name").val(job_name);

        var school = $(this).siblings('p.school_name').text();
        $("#my_school2").val(school);

        var job_time = $(this).siblings('p').children('span.award_time').html();
        edit_time2(job_time, 'start_year5', 'start_month5');

        var job_des = $(this).siblings('.award_des').text();
        $("#award_des").html(job_des);
        openDiv('award_info');
    });
    // 删除
    $("body").on('click', ".award_con .delete_info", function(){
        var p_nums = $('.school_award .award_con').length;
        if (p_nums == 1) {
            var rel = $('.school_award .award_con').data('rel');
            $('.school_award .award_con').removeClass('award_tab_'+rel).addClass("award_tab_0");
            $('.school_award .award_con .award_name').html('');
            $('.school_award .award_con .award_time').html('');
            $('.school_award .award_con .school_name').html('');
            $('.school_award .award_con .award_des').html('');
            $('.school_award .award_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_award_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
    $(".school_award .lock_add").click(function(){
        if($('.school_award .award_con .award_name').html() == ''){
            $(".award_info").data('rel', 1);
            $(".award_info .btn_save").data('rel', 0);
        }else{
            $(".award_info").data('rel', 0);
        }
        clear_award();
        openDiv('award_info'); 
    });
    // 保存
    $(".award_info .btn_save").click(function(){
        var arr_cv = check_award();
        if (arr_cv == false) {return false;}
        var p_id = $(this).data('rel');
        arr_cv['id'] = p_id;

        var rel = $('.award_info').data('rel');
        var infos = get_award_info();
        var school_job = infos['school_rewards'];
        if (rel == 0) {
            // 添加保存          
            var form_job = {
                'rewards_name': $('#award_name').val(),
                'school_name': $('#my_school2').val(),
                'start_time': get_time('start_year5', 'start_month5'),
                'end_time': '',
                'rewards_info': $('#award_des').val()
            };

            school_job.push(form_job);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            school_job[id]['rewards_name'] = $('#award_name').val();
            school_job[id]['school_name'] = $('#my_school2').val();
            school_job[id]['start_time'] = get_time('start_year5', 'start_month5');
            school_job[id]['end_time'] = '';
            school_job[id]['rewards_info'] = $('#award_des').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".school_award").data('rel', 1)
                    if (rel == 1) {
                        $(".school_award .award_con").show();
                        $(".award_tab_"+p_id+" .award_name").text(arr_cv['job_name']);
                        $(".award_tab_"+p_id+" .school_name").text(arr_cv['school_name']);
                        $(".award_tab_"+p_id+" .award_time").html(arr_cv['job_time']);
                        $(".award_tab_"+p_id+" .award_des").text(arr_cv['job_des']);                           
                    } else {
                        var job_nums = $('.school_award .award_con').length;
                        var job_tag = '<div class="award_con award_tab_'+job_nums+'" data-rel="'+job_nums+'"><p><span class="award_name"></span><span class="award_time">'+arr_cv['job_time']+'</span></p><p class="school_name"></p><pre class="award_des"></pre><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></div>';
                        $(".show_award").append(job_tag);
                        $(".award_tab_"+job_nums+" .award_name").text(arr_cv['job_name']);
                        $(".award_tab_"+job_nums+" .school_name").text(arr_cv['school_name']);
                        $(".award_tab_"+job_nums+" .award_des").text(arr_cv['job_des']);
                    }
                    closeDiv('award_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });
    // 语言能力
    // 编辑
    $("body").on('click', ".language_con .edit_info", function(){
        $(".language_info").data('rel', 1);
        $(".language_info .btn_save").data('rel', $(this).parent().data('rel'));

        var language_name = $(this).siblings('li.language_name').html();
        $("#language option:first").attr('selected',false);
        $("#language option[value='"+language_name+"']").attr('selected','selected');
        $('#language').val(language_name);

        var hear = $(this).siblings('li.hear').children('.two').html();
        $("#hear option:first").attr('selected',false);
        $("#hear option[value='"+hear+"']").attr('selected','selected');
        $('#hear').val(hear);

        var read_write = $(this).siblings('li.read_write').children('.two').html();
        $("#read_write option:first").attr('selected',false);
        $("#read_write option[value='"+read_write+"']").attr('selected','selected');
        $('#read_write').val(read_write);

        openDiv('language_info');
    });
    // 删除
    $("body").on('click', ".language_con .delete_info", function(){
        var p_nums = $('.language_ability .language_con').length;
        if (p_nums == 1) {
            var rel = $('.language_ability .language_con').data('rel');
            $('.language_ability .language_con').removeClass('language_tab_'+rel).addClass("language_tab_0");
            $('.language_ability .language_con .language_name').html('');
            $('.language_ability .language_con .hear .two').html('');
            $('.language_ability .language_con .read_write .two').html('');
            $('.language_ability .language_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_language_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
    $(".language_ability .lock_add").click(function(){
        if($('.language_ability .language_con .language_name').html() == ''){
            $(".language_info").data('rel', 1);
            $(".language_info .btn_save").data('rel', 0);
        }else{
            $(".language_info").data('rel', 0);
        }
        clear_language();
        openDiv('language_info'); 
    });
    // 保存
    $(".language_info .btn_save").click(function(){
        var p_id = $(this).data('rel');

        var rel = $('.language_info').data('rel');
        var infos = get_language_info();
        var school_job = infos['languages'];
        if (rel == 0) {
            // 添加保存          
            var form_job = {
                'language_name': $('#language').val(),
                'hear': $('#hear').val(),
                'readwrite': $('#read_write').val()
            };

            school_job.push(form_job);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            school_job[id]['language_name'] = $('#language').val();
            school_job[id]['hear'] = $('#hear').val();
            school_job[id]['readwrite'] = $('#read_write').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".language_ability").data('rel', 1)
                    if (rel == 1) {
                        $(".language_ability .language_con").show();
                        $(".language_tab_"+p_id+" .language_name").html($('#language').val());
                        $(".language_tab_"+p_id+" .hear .two").html($('#hear').val());
                        $(".language_tab_"+p_id+" .read_write .two").html($('#read_write').val());                          
                    } else {
                        var job_nums = $('.language_ability .language_con').length;
                        var job_tag = '<ul class="list-unstyled cv_con language_con language_tab_'+job_nums+'" data-rel="'+job_nums+'"><li class="language_name">'+$('#language').val()+'</li><li class="hear"><span class="one">听说：</span><span class="two">'+$('#hear').val()+'</span></li><li class="read_write"><span class="one">读写：</span><span class="two">'+$('#read_write').val()+'</span></li><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></ul>';
                        $(".show_language").append(job_tag);
                    }
                    closeDiv('language_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });
    // IT技能
    // 编辑
    $("body").on('click', ".skill_con .edit_info", function(){
        $(".IT_skill_info").data('rel', 1);
        $(".IT_skill_info .btn_save").data('rel', $(this).parent().data('rel'));

        var language_name = $(this).siblings('li.skill_name').text();
        $('#skill').val(language_name);

        var hear = $(this).siblings('li.skill_level').children('.two').html();
        $("#skill_level option:first").attr('selected',false);
        $("#skill_level option[value='"+hear+"']").attr('selected','selected');
        $('#skill_level').val(hear);

        var read_write = $(this).siblings('li.skill_time').children('.two').html();
        $("#use_time").val(read_write);

        openDiv('IT_skill_info');
    });
    // 删除
    $("body").on('click', ".skill_con .delete_info", function(){
        var p_nums = $('.IT_skill .skill_con').length;
        if (p_nums == 1) {
            var rel = $('.IT_skill .skill_con').data('rel');
            $('.IT_skill .skill_con').removeClass('skill_tab_'+rel).addClass("skill_tab_0");
            $('.IT_skill .skill_con .skill_name').html('');
            $('.IT_skill .skill_con .skill_level .two').html('');
            $('.IT_skill .skill_con .skill_time .two').html('');
            $('.IT_skill .skill_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_skill_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
    $(".IT_skill .lock_add").click(function(){
        if($('.IT_skill .skill_con .skill_name').html() == ''){
            $(".IT_skill_info").data('rel', 1);
            $(".IT_skill_info .btn_save").data('rel', 0);
        }else{
            $(".IT_skill_info").data('rel', 0);
        }
        clear_skill();
        openDiv('IT_skill_info'); 
    });
    // 保存
    $(".IT_skill_info .btn_save").click(function(){
        var arr_cv = check_skill();
        if(!arr_cv) return false;
        var p_id = $(this).data('rel');

        var rel = $('.IT_skill_info').data('rel');
        var infos = get_skill_info();
        var school_job = infos['skill'];
        if (rel == 0) {
            // 添加保存          
            var form_job = {
                'skill_name': $('#skill').val(),
                'skill_level': $('#skill_level').val(),
                'skill_time': $('#use_time').val()
            };

            school_job.push(form_job);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            school_job[id]['skill_name'] = $('#skill').val();
            school_job[id]['skill_level'] = $('#skill_level').val();
            school_job[id]['skill_time'] = $('#use_time').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".IT_skill").data('rel', 1)
                    if (rel == 1) {
                        $(".IT_skill .skill_con").show();
                        $(".skill_tab_"+p_id+" .skill_name").text(arr_cv['skill_name']);
                        $(".skill_tab_"+p_id+" .skill_level .two").html(arr_cv['skill_level']);
                        $(".skill_tab_"+p_id+" .skill_time .two").html(arr_cv['skill_time']);                          
                    } else {
                        var job_nums = $('.IT_skill .skill_con').length;
                        var job_tag = '<ul class="list-unstyled cv_con skill_con skill_tab_'+job_nums+'" data-rel="'+job_nums+'"><li class="skill_name"></li><li class="skill_level"><span class="one">熟练掌握程度：</span><span class="two">'+arr_cv['skill_level']+'</span></li><li class="skill_time"><span class="one">使用时间：</span><span class="two">'+arr_cv['skill_time']+'</span> 个月</li><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></ul>';
                        $(".show_IT_skill").append(job_tag);
                        $(".skill_tab_"+job_nums+" .skill_name").text(arr_cv['skill_name']);
                    }
                    closeDiv('IT_skill_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });
    // 获得证书
    // 编辑
    $("body").on('click', ".certificate_con .edit_info", function(){
        $(".certificate_info").data('rel', 1);
        $(".certificate_info .btn_save").data('rel', $(this).parent().data('rel'));

        var certificate_name = $(this).siblings('li.certificate_name').html();
        $("#certificate_name option:first").attr('selected',false);
        $("#certificate_name option[value='"+certificate_name+"']").attr('selected','selected');
        $('#certificate_name').val(certificate_name);

        var str_certificate = create_certificate(certificate_name);
        $('#certificate_name2').append(str_certificate);
        var certificate_level = $(this).siblings('li.certificate_level').html();
        $("#certificate_name2 option:first").attr('selected',false);
        $("#certificate_name2 option[value='"+certificate_level+"']").attr('selected','selected');
        $('#certificate_name2').val(certificate_level);

        var certificate_time = $(this).siblings('li.certificate_time').html();
        edit_time2(certificate_time, 'start_year6', 'start_month6');

        openDiv('certificate_info');
    });
    // 删除
    $("body").on('click', ".certificate_con .delete_info", function(){
        var p_nums = $('.get_certificate .certificate_con').length;
        if (p_nums == 1) {
            var rel = $('.get_certificate .certificate_con').data('rel');
            $('.get_certificate .certificate_con').removeClass('certificate_tab_'+rel).addClass("certificate_tab_0");
            $('.get_certificate .certificate_con .certificate_name').html('');
            $('.get_certificate .certificate_con .certificate_time').html('');
            $('.get_certificate .certificate_con .certificate_level').html('');
            $('.get_certificate .certificate_con').hide();
        } else if(p_nums > 1) {
            $(this).parent().remove();
        }
        var infos = get_certificate_info();
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) {
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
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
    $(".get_certificate .lock_add").click(function(){
        if($('.get_certificate .certificate_con .certificate_name').html() == ''){
            $(".certificate_info").data('rel', 1);
            $(".certificate_info .btn_save").data('rel', 0);
        }else{
            $(".certificate_info").data('rel', 0);
        }
        clear_certificate();
        openDiv('certificate_info'); 
    });
    // 保存
    $(".certificate_info .btn_save").click(function(){
        var arr_cv = check_certificate();
        if (arr_cv == false) {return false;}
        var p_id = $(this).data('rel');
        arr_cv['id'] = p_id;

        var rel = $('.certificate_info').data('rel');
        var infos = get_certificate_info();
        var school_job = infos['certificate'];
        if (rel == 0) {
            // 添加保存          
            var form_job = {
                'certificate_name': $('#certificate_name').val(),
                'certificate_time': get_time('start_year6', 'start_month6'),
                'certificate_level': $('#certificate_name2').val()
            };

            school_job.push(form_job);
        }else {
            // 编辑保存
            var id = parseInt(p_id);
            school_job[id]['certificate_name'] = $('#certificate_name').val();
            school_job[id]['certificate_time'] = get_time('start_year6', 'start_month6');
            school_job[id]['certificate_level'] = $('#certificate_name2').val();
        }      

        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".get_certificate").data('rel', 1)
                    if (rel == 1) {
                        $(".get_certificate .certificate_con").show();
                        $(".certificate_tab_"+p_id+" .certificate_name").html(arr_cv['certificate_name']);
                        $(".certificate_tab_"+p_id+" .certificate_time").html(arr_cv['certificate_time']);
                        $(".certificate_tab_"+p_id+" .certificate_level").html(arr_cv['certificate_level']);                           
                    } else {
                        var job_nums = $('.get_certificate .certificate_con').length;
                        var job_tag = '<ul class="list-unstyled cv_con certificate_con certificate_tab_'+job_nums+'" data-rel="'+job_nums+'"><li class="certificate_name">'+arr_cv['certificate_name']+'</li><li class="certificate_level">'+arr_cv['certificate_level']+'</li><li class="certificate_time">'+arr_cv['certificate_time']+'</li><div class="op edit_info" title="编辑" alt="编辑"></div><div class="op delete_info" title="删除" alt="删除"></div></ul>';
                        $(".show_certificate").append(job_tag);
                    }
                    closeDiv('certificate_info');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
       });
    });
    // 生成相应的证书等级
    $('#certificate_name').change(function(){
        var name = $('#certificate_name').val();
        if(name != ''){
            var level = create_certificate(name);
            $('#certificate_name2').html(level);
        }        
    });
    // 其他信息
    $(".other .btn_save").click(function(){
        var q_con = $.trim($("#other_con").val());
        if(q_con==''){layer.alert('请填写自我评价'); return false;}
        var infos = {
            'extra': {
                'description': q_con
            }
        };
        $.ajax({
            type:'post',
            url: "/api_user_cv",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'cv_info' : infos}),
            success: function(data) { 
                if (data.errcode == 0) {
                    $('.cv_range .blue').html(data.data);
                    $('.show_percent div').css('width', data.data);
                    $(".show_other pre").text(q_con); 
                    closeDiv('other');
                } else {
                    layer.alert('保存失败');
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 取消
    $('.other .btn_cancle').click(function(){
        var rel = $(this).parent().parent().parent().data('rel');
        $(this).parent().parent().hide();
        if (rel == '') {
            $(this).parent().parent().siblings('p.p_add').show();
        } else {
            $(this).parent().parent().siblings('div').show();
        }
    });

});

function openDiv(obj){
    $("."+obj).show();
    $("."+obj).siblings('div').hide();
    $("."+obj).siblings('.p_add').hide();
}

function closeDiv(obj){
    $("."+obj).hide();
    $("."+obj).siblings('div').show();
    if (obj == 'edu' || obj == 'work' || obj == 'project' || obj == 'job_info' || obj == 'award_info' || obj == 'language_info' || obj == 'IT_skill_info' || obj == 'certificate_info') {
        $("."+obj).siblings('.p_add').show();
    }
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

function create_month(){
    var months = '';
    for(var i=1; i<=12; i++){
      months += '<option value="'+i+'">'+i+'月</option>';
    }
    return months;
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

function edit_time2(t, s_yid, s_mid){
    var s_year = t.substr(0, 4);
    var s_mon = t.substr(-2, 2);
    if(s_mon < 10)
    {
      s_mon = s_mon.replace('0', '');
    }
    
    $("#"+s_yid+" option:first").attr('selected',false);
    $("#"+s_yid+" option[value='"+s_year+"']").attr('selected','selected');
    $("#"+s_yid).val(s_year);
    $("#"+s_mid+" option:first").attr('selected',false);
    $("#"+s_mid+" option[value='"+s_mon+"']").attr('selected','selected');
    $("#"+s_mid).val(s_mon);
}

function get_time(year, month){
    var y = $("#"+year).val();
    var m = $('#'+month).val();
    if (m < 10) {
      m = '0' + m;
    }
    return y+'.'+m;
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
function clear_job(){
    $("#job_name").val('');
    $("#my_school").val('');
    $("#job_des").val('');
    $("#start_year4").val('');
    $("#start_month4").val('');
    $("#end_year4").val('');
    $("#end_month4").val('');   
}
function clear_award(){
    $("#award_name").val('');
    $("#my_school2").val('');
    $("#award_des").val('');
    $("#start_year5").val('');
    $("#start_month5").val('');  
}
function clear_language(){
    $("#language").val('');
    $("#hear").val('');
    $("#read_write").val('');  
}
function clear_skill(){
    $("#skill").val('');
    $("#skill_level").val('');
    $("#use_time").val('');  
}
function clear_certificate(){
    $("#certificate_name").val('');
    $("#certificate_name2").val('');
    $("#start_year6").val('');
    $("#start_month6").val('');  
}

function check_basic(){
    var arr_basic = {};
    var sex = $('.gray').siblings().html();
    var marriage = $("#marriage").val();
    var edu_bg = $(".edu_bg").val();
    var polity = $('#polity_face').val();

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

    arr_basic = {
        'basic': {
            'education': edu_bg,
            'name': name,
            'current_area': cur_address,
            'phonenum': mobile,
            'email': email,
            'marital_status': marriage,
            'avatar': $(".head_img").find("img").data("rel"),
            'birthday': birth_year,
            'politics_status': polity,
            'gender': sex
        }
    };
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

    arr_will = {
        'intension': {
            'status': work_state,
            'trade': expect_trade,
            'area': expect_city,
            'title': expect_job,
            'expect_salary': expect_salary,
        }
    };
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
function check_job(){
  var arr_job = {};
  var job_name  = ChkEmpty('job_name', '请输入职务名称');
  if(job_name == false){ return false;}

  var start_year4  = ChkEmpty('start_year4', '请选择开始年份');
  if(start_year4 == false){ return false;}

  var start_month4  = ChkEmpty('start_month4', '请选择开始月份');
  if(start_month4 == false){ return false;}

  var end_year4  = ChkEmpty('end_year4', '请选择结束年份');
  if(end_year4 == false){ return false;}

  var end_month4  = ChkEmpty('end_month4', '请选择结束月份');
  if(end_month4 == false){ return false;}

  var job_time = chkyear(start_year4, start_month4, end_year4, end_month4);
  if(!job_time){return false;}

  var school_name = $("#my_school").val();
  var job_des = $("#job_des").val();
  arr_job['job_name'] = job_name;
  arr_job['school_name'] = school_name;
  arr_job['job_des'] = job_des;
  arr_job['job_time'] = job_time;
  
  return arr_job;
}
function check_award(){
  var arr_job = {};
  var job_name  = ChkEmpty('award_name', '请输入获奖名称');
  if(job_name == false){ return false;}

  var start_year4  = ChkEmpty('start_year5', '请选择获奖年份');
  if(start_year4 == false){ return false;}

  var start_month4  = ChkEmpty('start_month5', '请选择获奖月份');
  if(start_month4 == false){ return false;}

  var job_time = chkyear2(start_year4, start_month4);
  if(!job_time){return false;}  

  var award_des  = ChkEmpty('award_des', '请输入奖励描述');
  if(award_des == false){ return false;}

  var school_name = $("#my_school2").val();
  var job_des = $("#award_des").val();
  arr_job['job_name'] = job_name;
  arr_job['school_name'] = school_name;
  arr_job['job_des'] = job_des;
  arr_job['job_time'] = job_time;
  
  return arr_job;
}
function check_skill(){
  var arr_skill = {};
  var skill_name  = ChkEmpty('skill', '请输入技能名称');
  if(skill_name == false){ return false;}

  var use_time  = ChkEmpty('use_time', '请输入使用时间');
  if(use_time == false){ return false;}

  arr_skill['skill_name'] = skill_name;
  arr_skill['skill_level'] = $('#skill_level').val();
  arr_skill['skill_time'] = use_time;

  return arr_skill;
}
function check_certificate(){
    var arr_certificate = {};
    var certificate_name  = ChkEmpty('certificate_name', '请选择证书名称');
    if(certificate_name == false){ return false;}

    var certificate_level  = ChkEmpty('certificate_name2', '请选择证书等级');
    if(certificate_level == false){ return false;}

    var start_year6  = ChkEmpty('start_year6', '请选择获奖年份');
    if(start_year6 == false){ return false;}

    var start_month6  = ChkEmpty('start_month6', '请选择获奖月份');
    if(start_month6 == false){ return false;}

    var job_time = chkyear2(start_year6, start_month6);
    if(!job_time){return false;}  

    arr_certificate['certificate_name'] = certificate_name;
    arr_certificate['certificate_level'] = certificate_level;
    arr_certificate['certificate_time'] = job_time;
      
    return arr_certificate;
}

// 比较结束时间与开始时间的大小
function chkyear(start_year, start_month, end_year, end_month){
    var start_year = parseInt(start_year)
    var start_month = parseInt(start_month)
    var end_year = parseInt(end_year)
    var end_month = parseInt(end_month)
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

function chkyear2(start_year, start_month){
    if (start_month < 10) {
        start_month = '0' + start_month;
    }
    return start_year + '.' + start_month;
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

function alert_f(msg, s){
    layer.alert(msg);
    if(s == 1){
        window.location.href='login.htm';
    }
}
// 教育经历
function get_edu_info(){
    var obj_edu = $('.edu_con');
    var arr_edu = [];
    if (obj_edu.length > 0) {
        for (var i = 0; i < obj_edu.length; i++) {
            var school_name = $.trim($('.edu_con:eq('+i+') .school').text().toString());
            var major_name = $.trim($('.edu_con:eq('+i+') .major').text().toString());
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
    return {
        'education': arr_edu
    };
}
// 工作经历
function get_work_info(){
    var obj_work = $('.work_con');
    var arr_work = [];
    if (obj_work.length > 0) {
        for (var i = 0; i < obj_work.length; i++) {
            var company = $('.work_exp .work_con:eq('+i+') .gs').text().toString();
            var work_time = $('.work_exp .work_con:eq('+i+') .work_time').html();
            var work_area = $('.work_exp .work_con:eq('+i+') .gs_address').html();
            var work_trade = $('.work_exp .work_con:eq('+i+') .gs_trade').html();
            var work_name = $('.work_exp .work_con:eq('+i+') .gs_job').text().toString();
            var work_duty = $('.work_exp .work_con:eq('+i+') .job_duty').text().toString();
            //alert(work_duty)
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
    return {
        'career': arr_work
    };
}
// 项目经验
function get_item_info(){
    var obj_item = $('.item_exp .item_con');
    var arr_item = [];
    if (obj_item.length > 0) {
        for (var i = 0; i < obj_item.length; i++) {
            var item_name = $('.item_exp .item_con:eq('+i+') .item_name').text().toString();
            var item_duty = $('.item_exp .item_con:eq('+i+') .item_duty').text().toString();
            var item_time = $('.item_exp .item_con:eq('+i+') .item_time').html();
            var item_des = $('.item_exp .item_con:eq('+i+') .item_des').text().toString();

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
        'experience': arr_item
    };
}
// 校内职务
function get_job_info(){
    var obj_job = $('.school_job .job_con');
    var arr_job = [];
    if (obj_job.length > 0) {
        for (var i = 0; i < obj_job.length; i++) {
            var job_name = $('.school_job .job_con:eq('+i+') .job_name').text().toString();
            var job_time = $('.school_job .job_con:eq('+i+') .job_time').html();
            var school_name = $('.school_job .job_con:eq('+i+') .school_name').text().toString();
            var job_des = $('.school_job .job_con:eq('+i+') .job_des').text().toString();

            var arr_job_time = job_time.split(' - ');
            var job_start_time = arr_job_time[0];
            var job_end_time = arr_job_time[1];

            arr_job[i] = {
                'job_name': job_name,
                'school_name': school_name,
                'start_time': job_start_time,
                'end_time': job_end_time,
                'job_info': job_des
            };
        }
    }
    return {
        'school_job': arr_job
    };
}
// 校内奖励
function get_award_info(){
    var obj_job = $('.school_award .award_con');
    var arr_job = [];
    if (obj_job.length > 0) {
        for (var i = 0; i < obj_job.length; i++) {
            var job_name = $('.school_award .award_con:eq('+i+') .award_name').text();
            var job_time = $('.school_award .award_con:eq('+i+') .award_time').html();
            var school_name = $('.school_award .award_con:eq('+i+') .school_name').text();
            var job_des = $('.school_award .award_con:eq('+i+') .award_des').text();

            arr_job[i] = {
                'rewards_name': job_name,
                'school_name': school_name,
                'start_time': job_time,
                'end_time': '',
                'rewards_info': job_des
            };
        }
    }
    return {
        'school_rewards': arr_job
    };
}
// 语言能力
function get_language_info(){
    var obj_job = $('.language_ability .language_con');
    var arr_job = [];
    if (obj_job.length > 0) {
        for (var i = 0; i < obj_job.length; i++) {
            var language_name = $('.language_ability .language_con:eq('+i+') .language_name').html();
            var hear = $('.language_ability .language_con:eq('+i+') .hear .two').html();
            var read_write = $('.language_ability .language_con:eq('+i+') .read_write .two').html();

            arr_job[i] = {
                'language_name': language_name,
                'hear': hear,
                'readwrite': read_write
            };
        }
    }
    return {
        'languages': arr_job
    };
}
// IT技能
function get_skill_info(){
    var obj_job = $('.IT_skill .skill_con');
    var arr_job = [];
    if (obj_job.length > 0) {
        for (var i = 0; i < obj_job.length; i++) {
            var language_name = $('.IT_skill .skill_con:eq('+i+') .skill_name').text();
            var hear = $('.IT_skill .skill_con:eq('+i+') .skill_level .two').html();
            var read_write = $('.IT_skill .skill_con:eq('+i+') .skill_time .two').html();

            arr_job[i] = {
                'skill_name': language_name,
                'skill_level': hear,
                'skill_time': read_write
            };
        }
    }
    return {
        'skill': arr_job
    };
}
function get_certificate_info(){
    var obj_job = $('.get_certificate .certificate_con');
    var arr_job = [];
    if (obj_job.length > 0) {
        for (var i = 0; i < obj_job.length; i++) {
            var language_name = $('.get_certificate .certificate_con:eq('+i+') .certificate_name').html();
            var hear = $('.get_certificate .certificate_con:eq('+i+') .certificate_level').html();
            var read_write = $('.get_certificate .certificate_con:eq('+i+') .certificate_time').html();

            arr_job[i] = {
                'certificate_name': language_name,
                'certificate_level': hear,
                'certificate_time': read_write
            };
        }
    }
    return {
        'certificate': arr_job
    };
}
function create_certificate(name){
    var arr_certificate = {
        '英语证书': ['大学英语四级', '大学英语六级', '英语专业四级', '英语专业八级', '中级口译证书', '高级口译证书', '托福', '雅思', '托业', 'GRE', 'GMAT', '全国公共英语等级考试', '通用英语初级', '通用英语中级'],
        '俄语证书': ['俄语四级证书', '俄语六级证书'],
        '法语证书': ['法语四级证书'],
        '日语证书': ['日语一级证书', '日语二级证书', '日语三级证书', '日语四级证书'],
        '德语证书': ['德语四级证书', '德语六级证书'],
        '计算机证书': ['全国计算机等级一级', '全国计算机等级二级', '全国计算机等级三级A', '全国计算机等级三级B', '全国计算机等级四级'],
        '会计证书': ['会计上岗证'],
        '其他证书': ['导游人员资格证书', '普通话等级证书']
    };
    var str_elm = '<option value="" selected="selected">请选择</option>';
    if(name != ''){
        certificate = arr_certificate[name];
        for(var index in certificate){
            str_elm += '<option value="'+certificate[index]+'">'+certificate[index]+'</option>';     
        }
    }
    return str_elm;
}