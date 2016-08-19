$(function(){
	// 修改头像
  $(".modify_pic").click(function(){
    $(".pop_modify_pic").show();
    // var window_height = $(window).height() + $(document).scrollTop();
      $('.black_overlay').css(
              {
                'background-color': 'rgba(0,0,0,0.8)', 
                'z-index' : 100, 
                // 'height': window_height+'px', 
                'display':'block'
              }
      ); 
    });

  $(".op").click(function(){
    $(".pop_modify_pic,.black_overlay").hide();
  });

  // 删除头像
  $(".delete_pic").click(function(){
    layer.confirm('确定要删除营业执照？', function(index){
      $.post('ajax_no.htm', {delte_img:1}, function(str){
         if(str == 0)
         {
            layer.alert('请先上传营业执照！');
         }else{
            $(".head_img").find('img').attr('src','images/touxiang.png');
         }
      });
      layer.close(index);
    })
  });

  $('.black_overlay').click(function(){
  	$('.pop_modify_pic').hide();
  	$(this).hide();
  });

  $('.suc input[type=text]').focus(function(){
  	$(this).blur();
  });

  // 修改企业认证
  $('.suc input[type=button]').click(function(){
  	$('.suc').hide();
  	$('form').show();
  });

  // 保存企业认证

  $("form .save").click(function(){
     var jsonStr = check_form();
     if(jsonStr == false){return false;}

     $('#com_name2').val(jsonStr['qy_name']);
     $('#linkman2').val(jsonStr['linkman']);
     $('#mobile2').val(jsonStr['mobile']);
     $('form').hide();
     $('.suc').show();
 });

});

function check_form()
  {
      var qy_arr={};
      var check1 =  ChkEmpty(com_name, '请输入公司名称');
      if(check1 == false){return false;}

      var check2 =  ChkEmpty(linkman, '请输入联系人姓名');
      if(check2 == false){return false;}

      var check3 =  ChkEmpty(mobile, '请输入联系电话');
      if(check3 == false){return false;}

      qy_arr['qy_name'] = check1;
      qy_arr['linkman'] = check2;
      qy_arr['mobile'] = check3;

      return qy_arr;
  }