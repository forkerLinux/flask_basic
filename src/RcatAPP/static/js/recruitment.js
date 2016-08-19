	$(function(){
		  // 上传LOGO
        function pic_show(s, r)
        {
           $(".head_img").find('img').data('rel', r);
           $(".head_img").find('img').attr('src', s);
           $(".pop_modify_pic, .black_overlay").hide();
        } 
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
                location.href = '/company/recruitment';
            });

            $('.cancel').click(function(){
                close_panel('black_overlay', 'p_panel');
                location.href = '/company/recruitment';         
            });
		$('.toCompanyinfo').click(function(){
			location.href='/company/company_detail'
			
		});
		 $('#saveForm').click(function(e){

	          var recruit_process = $('#recruit_process').val();  
              var faq = $('#faq').val(); 
              var company_info = {
              	'recruit_process':recruit_process,
              	'faq':faq
              }
             
                $.ajax({
                    url: "/company/api_edit_recruitment",
                    type: "POST",
                    data: JSON.stringify(company_info),
                    contentType: "application/json; charset:utf-8",

                    dataType: "json",
                    success: function(data) {
                        if(data.errcode == 0){
                            layer.alert('保存成功', {
                                yes: function(e){
                                    layer.close(e);
                                    location.href = '/company/recruitment';
                                }
                            });
                        }
                        else{
                            layer.alert('保存失败');
                            return false;
                        }
                        
                    },
                    error: function(){
                        alert('error');
                    }
                });
            });
	})