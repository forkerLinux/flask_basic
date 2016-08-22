        function tou(){
        if(!checkPhoto()){
            return;
        }
        checkPhoto();

        for(file in document.getElementById("liveimg").files){
            if(document.getElementById("liveimg").files[file].size >1024 * 1024){
                layer.alert('图片大小应小于1M');
                return;
            }
        }
   
        var fileSize = document.getElementById("liveimg").files.length
        var html ='';
        for(var  i = 0 ;i<fileSize;i++){
            var files =  document.getElementById("liveimg").files[i];
             var src = window.URL.createObjectURL(files);
            html += "<img  class='img_upload' width='110' height='100' src='"+src+"' >";
        }
         $("#img").append(html);
       }
       function get_show_welfare(){
            var arr_welfare = [];
            for(var i=0; i<$('.job_welfare span').length; i++){
                arr_welfare.push($('.job_welfare span:eq('+i+')').html());
            }
            return arr_welfare;
        }
        $(function(){

        	// 福利信息
            $('#welfare').click(function(e){
                e.stopPropagation();
                $('.welfare_menu').toggle();
                $('.school_menu').hide();
                $('.major_menu').hide();
            });
            $('.welfare_list li').click(function(){
                var welfare = $.trim($(this).html());
                $('.no_welfare').hide();
                $('.job_welfare').show();
                if($(this).hasClass('welfare_checked')){
                    return false
                }else{
                    $(this).addClass('welfare_checked');
                    $('.job_welfare').append('<p><span>'+welfare+'</span><img src="/static/images/delete_icon.png?v=1"></p>');
                }                
            });
            $('.btn_addwelfare').click(function(){
                var welfare = $.trim($('#welfare2').val());
                if(welfare == ''){
                    return pop_tips2('welfare2', '请输入福利');
                }else{
                    if($('.job_welfare span').length > 0){
                        var arr_welfare = get_show_welfare();
                        if($.inArray(welfare, arr_welfare) != -1){
                            return pop_tips2('welfare2', '该福利已存在');
                        }
                    }
                    $('.job_welfare').append('<p><span>'+welfare+'</span><img src="/static/images/delete_icon.png?v=1"></p>');
                }
            });
            $('.welfare_menu').on('click', '.job_welfare img', function(e){
                e.stopPropagation();
                var welfare = $.trim($(this).siblings('span').html());
                if($('.welfare_checked').size() > 0){
                    $('li.welfare_checked:contains("'+welfare+'")').filter(function(){
                        if($(this).html() == welfare){
                            return $(this);
                        }
                    }).removeClass('welfare_checked');
                }
                $(this).parent().remove();
                if($('.job_welfare span').length <= 0){
                    $('.no_welfare').show();
                    $('.job_welfare').hide();
                }
            }); 
            $('.select_box').on('click', '.my_welfare_list img', function(){
                var welfare = $.trim($(this).siblings('span').html());
                $('.job_welfare span:contains("'+welfare+'")').filter(function(){
                    if($(this).html() == welfare){
                        return $(this);
                    }
                }).parent().remove();
                if($('.welfare_checked').size() > 0){
                    $('li.welfare_checked:contains("'+welfare+'")').filter(function(){
                        if($(this).html() == welfare){
                            return $(this);
                        }
                    }).removeClass('welfare_checked');
                }
                $(this).parent().remove();
            });
            $('.welfare_menu .btn_save').click(function(){
                var arr_welfare = get_show_welfare();
                var welfare = '';
                if(arr_welfare.length > 0){
                    for(var i=0; i<arr_welfare.length; i++){
                        welfare += '<p><span>'+arr_welfare[i]+'</span><img src="/static/images/delete_icon.png?v=1"></p>';
                    }
                    $('.welfare_menu').hide();
                    $('.inputbox3').hide();
                    $('.my_welfare_list').html(welfare);
                    $('.my_welfare_show').show();
                }else{
                    layer.alert('至少添加一项');
                    return false;
                }
            });
            $('.welfare_menu .btn_cancel').click(function(){
                $('.welfare_menu').hide();
                if($('.my_welfare_list span').length > 0){
                    $('.inputbox3').hide();
                    $('.my_welfare_show').show();
                }else{
                    $('.inputbox3').show();
                    $('.my_welfare_show').hide();
                }                
            });
            $('.edit_welfare').click(function(e){
                var welfare = '';
                if($('.my_welfare_list span').length > 0){
                    for(var i=0; i<$('.my_welfare_list span').length; i++){
                        var con = $('.my_welfare_list span:eq('+i+')').html();
                        welfare += '<p><span>'+con+'</span><img src="/static/images/delete_icon.png?v=1"></p>';
                    }
                }else{
                    $('.no_welfare').show();
                    $('.job_welfare').hide();
                }
                $('.my_welfare_show').hide();
                $('.job_welfare').html(welfare);
                e.stopPropagation();
                $('.welfare_menu').show();
            });
        	$('.toRecruitment').click(function(){
        		location.href='/company/recruitment';
        	})
        	 $('.wrap').click(function(e){
                var _w = $('.welfare_menu');
                if(_w.has(e.target).length === 0){
                    $(".welfare_menu").hide();
                    if($('.my_welfare_list span').length > 0){
                        $('.my_welfare_show').show();
                        $('.inputbox3').hide();
                    }else{
                        $('.inputbox3').show();
                        $('.my_welfare_show').hide();
                    }
                }             
            });
        	//add end
            $('.company_open').click(function(){
                $(this).children('a').toggle();
            });
            // 上传LOGO
            $('.head_img').hover(function(){
                $('.head_img_bg').show();
            }, function(){
                $('.head_img_bg').hide();
            });

            $('.head_img').click(function(){
                show_panel('black_overlay', 'pop_modify_pic');
            });

            $('.pop_close, .btn_savepic').click(function(){
                close_panel('black_overlay', 'pop_modify_pic');  
            });
             $('.pop_close, .btn_savepic2').click(function(){
                close_panel('black_overlay', 'pop_liveimg_pic');  
            });
            $('.cancel').click(function(){
                close_panel('black_overlay', 'p_panel');         
            });
            $('.edit_upimg').click(function(){
                var obj = $(this);
                var imgid = $(obj).prev().attr('imgid')
                show_panel('black_overlay', 'pop_modify_pic_life');
                document.getElementById('img_id').value= imgid;
                $("#imagelifeform").ajaxForm({
                        dataType : "JSON", 
                        async :true, 
                        success : function(data){
                            if(data.errcode == 0){
                                var url = data.data.url
                                console.log(url);
                            }
                            if(data.errcode == 1){
                                layer.alert('修改失败');
                                return false;
                            }
                            if(data.errcode == 2){
                                layer.alert('修改失败');
                                return false;
                            }
                        
                        },
                        error : function(){
                            alert("数据加载失败！");
                        }
                    // }
                 });
                 });
    
             $('.pop_close, .btn_savepic').click(function(){
                close_panel('black_overlay', 'pop_modify_pic_life');  
            });

            // 选择行业
            $('#gs_trade').click(function(){
                $('.black_overlay').show();
                $('.pop_trade').show();
                $('body').css('overflow', 'hidden');
                $('.trade span').removeClass('select');
                var trade = $.trim($(this).val());
                $('.submit').hide();
                if (trade != '') {
                    $('.trade span:contains('+trade+')').addClass('select');
                }               
            });
            $('.trade span').click(function(){
                var trade = $(this).html();
                $('#gs_trade').val(trade);
                $('.cancel').click();
            });

            $('.cancel').click(function(){
                $('.black_overlay').hide();
                $('.pop_trade').hide();
                $('body').css('overflow', 'auto');
            });
            // 公司规模
            $('.company_scale_menu a').click(function(){
                var scale = $(this).html();
                $('#gs_size').val(scale);
            });
            // 公司性质
            $('.company_type_menu a').click(function(){
                var type = $(this).html();
                $('#gs_type').val(type);
            });
            // 工作地点 省
            $('#province').click(function(){
                inputfocus($(this));
                var width = $(this).outerWidth();
                var elm_str = '';
                for(var index in citydata2){
                    elm_str += '<li><a href="javascript:void(0);">'+citydata2[index]['name']+'</a></li>';
                }
                $('.province_menu').html(elm_str)
                $('.province_menu').css('min-width', width+'px');
            });

            $('.address_box').on('click', '.province_menu a', function(){
                var province = $.trim($(this).html());
                $('#province').val(province);
            });
            // 市
            $('#city').click(function(){
                var province = check_empty('province', '请选择公司所在省');
                if(!province) return false;

                var city_str = '';
                for(var index in citydata2){
                    var name = $.trim(citydata2[index]['name']);
                    if(name == province){
                        var arr_city = citydata2[index]['cities'];
                        for(index2 in arr_city){
                            city_str += '<li><a href="javascript:void(0);">'+arr_city[index2]+'</a></li>';
                        }                       
                    }
                }
                $('.city_menu').html(city_str);
                var width = $(this).outerWidth();
                $('.city_menu').css('min-width', width+'px');
            });

            $('.address_box').on('click', '.city_menu a', function(){
                var city = $.trim($(this).html());
                $('#city').val(city);
            });
            $('#saveForm').click(function(e){
	        	var company_info = check_info();
                if(!company_info) return false;
                $.ajax({
                    url: "/company/api_edit_companyinfo",
                    type: "POST",
                    data: JSON.stringify(company_info),
                    contentType: "application/json; charset:utf-8",
                    dataType: "json",
                    success: function(data) {
                        if(data.errcode == 0){
                            layer.alert('发布成功', {
                                yes: function(e){
                                    layer.close(e);
                                    location.href = '/company/company_detail';
                                }
                            });
                        }
                        if(data.errcode == 1){
                            layer.alert('发布失败');
                            return false;
                        }
                        
                    },
                    error: function(){
                        // alert('error');
                    }
                });
            });

            if($('.my_welfare_list p').length>0){
            $('.my_welfare_show').show();
            $('.inputbox3').hide();
            }

            $('#saveFormImgs').click(function(){
          
                 var fileSize = document.getElementById("liveimg").files.length;
                 if(fileSize == 0){
                        //未选择图片
                     layer.alert('未选择图片');
                     return false
                 }
                if(!checkPhoto()){
                    return false
                }
                 var imgnum = $('.img_upload').length
                 if(imgnum >5){
                    layer.alert('生活文化图片最多上传5个，当前已上传'+$('.img_upload').length+'个');
                    return false
                 }
                  $('#saveForm').click();
            });
            $('.delete_upimg').click(function(){
                var  elem = $(this)
                 var imgid = $(this).prev().attr('imgid');
                 var id_list = [imgid]
                 var paramlist = {"id_list":id_list}
                $.ajax({
                    url: "/company/api_del_life_img",
                    type: "POST",
                    data: JSON.stringify(paramlist),
                    contentType: "application/json; charset:utf-8",
                    dataType: "json",
                    success: function(data) {
                        if(data.errcode == 0){
                            layer.alert('删除成功');
                            $(elem).prev().remove();
                            $(elem).remove();
                        }
                        else{
                            layer.alert('删除失败');
                        }
                        
                    },
                    error: function(){
                          layer.alert('删除失败');
                    }
                });
            })
        }); 
        function checkPhoto(){
         var type="";
         if(document.getElementById("liveimg").value!=''){
          type=document.getElementById("liveimg").value.match(/^(.*)(\.)(.{1,8})$/)[3];
             type=type.toUpperCase();
         }
       
        if(type!="JPEG"   &&   type!="PNG"   &&   type!="JPG"   &&   type!="GIF"){
          layer.alert('上传图片类型错误');
         return false;
        } 
        return true
        } 
        // 上传LOGO
        function pic_show(s, r)
        {
           $(".head_img").find('img').data('rel', r);
           $(".head_img").find('img').attr('src', s);
           $(".pop_modify_pic, .black_overlay").hide();
        }    
        function check_info(){
    	   	// 福利信息
            var arr_welfare = [];
             var boon = '';
            if($('.my_welfare_list span').length > 0){
                for(var i=0; i<$('.my_welfare_list span').length; i++){
                    arr_welfare.push($('.my_welfare_list span:eq('+i+')').html());
                }
               boon = arr_welfare.join(',');
            }
            $('#welfare').val(boon);


            var gs_trade = check_empty('gs_trade', '请选择所属行业');
            if(!gs_trade) return false;

            var gs_scale = check_empty('gs_size', '请选择公司规模');
            if(!gs_scale) return false;

            var gs_type = check_empty('gs_type', '请选择公司性质');
            if(!gs_type) return false;

            var province = check_empty('province', '请选择公司所在省');
            if(!province) return false;

            var city = check_empty('city', '请选择公司所在市');
            if(!city) return false;

            var detail_address = check_empty('detail_address', '请输入详细地址');
            if(!detail_address) return false;

            var gs_web = check_empty('gs_web', '请输入公司网址');
            if(!gs_web) return false;

            var gs_des = check_empty('gs_des', '请输入公司简介');
            if(!gs_des) return false;

            var company_trade = $('input[name=company_trade]').val();
            var company_scale = $('input[name=company_scale]').val();
            var company_type = $('input[name=company_type]').val();
            var company_city = $('input[name=company_city]').val();
            var company_address1 = $('input[name=company_address1]').val();
            var company_address2 = $('input[name=company_address2]').val();           
            var company_site = $('input[name=company_site]').val();  
            var company_des = $('#gs_des').val(); 

            var events = $('#events').val();  
            return {
                'company_trade': company_trade,
                'company_scale': company_scale,
                'company_type': company_type,
                'company_city': company_city,
                'company_address1': company_address1,
                'company_address2': company_address2,
                'company_site': company_site,
                'company_des': company_des,
                'boon': boon,
                'events': events
            }

        }