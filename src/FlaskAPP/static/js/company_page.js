//分页样式
function page_list_js(zong,dangq,baseurl)
{
    if(dangq == 1){
        $("#prev_page").hide();
        $('#index_page').html("首页");
    }else
    {
        if (baseurl.substr(-1) == '?') {
            sbaseurl = baseurl.substring(0, baseurl.length - 1)
        }
        else {
            sbaseurl = baseurl
        }
        $('#index_page').html('<a href="'+sbaseurl+'">首页</a>');
        
    }
    if(dangq <6){i_start=1;}else{i_start=parseInt(dangq)-4;}
    var i_end = parseInt(i_start)+8;
    if(i_end >= zong){i_end = zong;}
    for(var i=i_start ; i<= i_end ; i++){
        console.log(baseurl);
        if(i == dangq)
        { 

            if (baseurl.substr(-1) == '?') {
            var page_str = "<span class='sele'><a href='"+baseurl+'page='+i+"'>"+i+"</a></span>";
            }
            else {
            var page_str = "<span class='sele'><a href='"+baseurl+'&page='+i+"'>"+i+"</a></span>";
            }
        }else{
            //判断 有没有 其他 参数 
            if (baseurl.substr(-1) == '?') {
            
                var page_str = "<span><a href='"+baseurl+'page='+i+"'>"+i+"</a></span>";
            }
            else {
            var page_str = "<span><a href='"+baseurl+'&page='+i+"'>"+i+"</a></span>";
            }
        }
        document.write(page_str);
    }

}
// 下一页， 上一页， 尾页
// param  基准url 当前页面，总页面  跳转类型
function skip_page(base_url, page, total_page, type) {
    url = base_url + '?page='
    //上一页
    if (type == 0) {
        if (page <= 1) {
            return;
        }
        location.href = url + (page-1).toString();
    }

    // 下一页
    if (type == 1 ) {
        if (page >= total_page) {
            return;
        }

        location.href = url + (page+1).toString();
    }

    // 最后一页
    if (type == 2) {
        location.href = url + total_page.toString();
    
    }
}
