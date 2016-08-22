$(function(){
  //擅长技能 如果为空 隐藏
  var g_s = $(".good_skills").attr('rel');
  if(g_s == "")
  {
     $(".good_skills").hide();
  }
 //教育经历
  var education = $(".education").attr('rel');
  if(education == 0)
  {
    $(".education").hide();
  }

  //项目经验
  var xiangmu_exp = $(".xiangmu_exp").attr('rel');
  if(xiangmu_exp == 0)
  {
    $(".xiangmu_exp").hide();
  }
  
  //自我描述 self_describe
  var self_describe = $(".self_describe").attr('rel');
  if(self_describe == "")
  {
     $(".self_describe").hide();
  }
  //其他信息 other_info
  var other_info = $(".other_info").attr('rel');
  if(other_info == "")
  {
     $(".other_info").hide();
  }

})



function get_marriage(s)
{
  if(s == 0)
  {
    document.write('保密');
  }else if(s == 1)
  {
    document.write('未婚');
  }else
  {
    document.write('已婚');
  }
}

function get_work_year(s)
{
  if(s == 0)
  {
    document.write('应届毕业生');
  }else if(s==100)
  {
    document.write('10年以上');
  }else
  {
     document.write(s+'年');
  }
}

function get_work_status(s)
{
   if(s == 1)
   {
      document.write('正在找工作');
   }else if(s ==2)
   {
    document.write('在职，暂无跳槽打算');
   }else if(s == 3)
   {
     document.write('在职，急寻新机会');
   }else
   {
    document.write('在职，看看新机会');
   }
}

function get_edu(s)
{
   var edu = ['中专','大专','本科','本科','硕士','博士','其他'];
   document.write(edu[s]);
}