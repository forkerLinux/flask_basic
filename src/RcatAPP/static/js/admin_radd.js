$(function(){
  //投递公司
 var hr_id = $("#hr_id").attr('rel');
 if(hr_id !=0 && hr_id!='')
 {
    $("#hr_id option:first").attr('selected',false);
    $("#hr_id option[value='"+hr_id+"']").attr('selected','selected');
    
 }
  //工作年限
 var work_year_f = $("#work_year").attr('rel');
 if(work_year_f !=0 && work_year_f!='')
 {
    $("#work_year option:first").attr('selected',false);
    $("#work_year option[value='"+work_year_f+"']").attr('selected','selected');
    
 }
 //学历
var education = $("#education").attr('rel');
 if(education !=0 && education!='')
 {
    $("#work_year option:first").attr('selected',false);
    $("#work_year option[value='"+education+"']").attr('selected','selected');
    
 }

//职位选中
var job_id = $("#job_id").attr('rel');
 if(job_id !=0 && job_id!='')
 {
    $("#job_id option:first").attr('selected',false);
    $("#job_id option[value='"+job_id+"']").attr('selected','selected');
    
 }

  $("input[name='uname']").blur(function(){
    var phone = $.trim($(this).val()); 
    if(phone!="" )
    {
        v_phone(phone);
    }
  })

  //删除直投简历
  $(".direct_del").click(function(){
      var id = $(this).parent().attr('rel');
      if(id == ""){return false;}
      $.ajax({
        type:'post',
        url: "admin_rlist.htm",
        data: {delid:id},
        dataType: 'json',
        success: function(msg){
          $("#row_dropdown_"+id).remove();
        },
        error:function(){   
            alert('error');   
        }
        
    });     
  })

  //投递公司oncange
  $("#hr_id").change(function(){
      var hid = $(this).val();
      if(hid != 0)
      {
        $.ajax({
          type:'post',
          url: "admin_radd.htm",
          data: {qy_id:hid},
          dataType: 'json',
          success: function(msg){
            var select_str = "<option value=0 selected>请选择职位</option>";
            $("#job_id").empty();
            $(".qy_job").hide();
            if(msg.length > 0)
            {
              $(".qy_job").show();
              $.each(msg,function(i,row){
                select_str += "<option value='"+row.id+"'>"+row.job_name+"</option>";
              })
              $("#job_id").append(select_str);
            }else
            {
               $("#job_id").append(select_str);
               $("#job_name").val('');
               layer.alert("这个投递公司，旗下不存在职位");
            }
          },
          error:function(){   
              alert('error');   
          }
        }); 
      }else
      {
        $(".qy_job").hide();
      }
  })

//公司名称选择
$("#job_id").change(function(){
    var job_n = $("#job_id option:selected").text();
    $("#job_name").val(job_n);
})
//
})

function hradd_form()
{
    var uname = $.trim($("input[name='uname']").val());
    var hr_id = $("#hr_id").val();
    if(uname == "")
    {
        layer.alert("请填写简历姓名");
        return false;
    }
    var v_p = $("input[name='uname']").attr('rel');
    if(v_p == 1)
    {
        layer.alert("已存在这个简历姓名！");
        return false;
    }

   var wish_salary = $.trim($("#wish_salary").val());
   if(wish_salary == "")
   {
      layer.alert("期望薪资不能为空");
      return false;
   }
   
   if(isNaN(wish_salary))
   {
      layer.alert("薪资请填写数字");
      return false;
   }
    if(hr_id == 0)
    {
        layer.alert("请选择投递公司");
        return false;
    }
   var job_name = $.trim($("#job_name").val());
   if(job_name == "")
   {
      layer.alert("职位名称不能为空");
      return false;
   }
    var old_url = $("#old_url").val();
    if(old_url =="")
    {
      var file = $.trim($("#file").val());
      if(file == "")
      {
         layer.alert("请上传文件");
         return false;
      }     
    }
 
    return true;
}

function v_phone(p)
{
    var id = $("input[name='id']").val();
    $.ajax({
        type:'post',
        url: "admin_radd.htm",
        data: {v_uname:p,id:id},
        dataType: 'json',
        success: function(msg){
          $("input[name='uname']").attr('rel',msg);
        },
        error:function(){   
            alert('error');   
        }
        
    }); 
}

function error_alert(s)
{
    layer.alert(s);
}

function upload_fin(s)
{
   layer.alert(s,function index(){
      window.location.href="admin_rlist.htm";
   });
}

//学历
function get_edu(s)
{
   var edu = ['中专','大专','本科','本科','硕士','博士','其他'];
   document.write(edu[s]);
}

function get_work_year(s)
{
  if(s == 0)
  {
    document.write("应届毕业生");
  }else if(s == 100)
  {
    document.write("10年以上");
  }else
  {
    document.write(s+'年');
  }
}