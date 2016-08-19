$(function(){
	



})

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

//经验
