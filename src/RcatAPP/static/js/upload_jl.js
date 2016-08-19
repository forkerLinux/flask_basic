$(function(){
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
})

function check_form()
{
   var uname = $.trim($("#uname").val());
   if(uname == "")
   {
      layer.alert("用户名不能为空");
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

function upload_fin(s)
{
   layer.alert(s,function index(){
      window.location.href="resume_info.htm";
   });
}

