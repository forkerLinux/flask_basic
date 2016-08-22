$(function(){
//seo_type
$("#seo_type").change(function(){
    var this_status = $(this).val()
    var url_str = "/admin/seo_list?page=1"
     if(seo_page != "")
     {
        url_str += '&seo_page='+seo_page
     }
     if(this_status !="")
     {
        url_str += '&seo_type='+this_status
     }
     if(isshow != "")
     {
        url_str += '&isshow='+isshow
     }     
    window.location.href = url_str
});

//isshow
$("#isshow").change(function(){
    var this_status = $(this).val()
    var url_str = "/admin/seo_list?page=1"
     if(seo_type != "")
     {
        url_str += '&seo_type='+seo_type
     }
     if(this_status !="")
     {
        url_str += '&isshow='+this_status
     }
     if(seo_page != "")
     {
        url_str += '&seo_page='+seo_page
     }     
    window.location.href = url_str
});

//seo_page
$("#page_search").click(function(){
    var this_page = $.trim($("#seo_page").val());
    var url_str = "/admin/seo_list?page=1"
     if(seo_type != "")
     {
        url_str += '&seo_type='+seo_type
     }
     if(this_page !="")
     {
        url_str += '&seo_page='+this_page
     }
     if(isshow != "")
     {
        url_str += '&isshow='+isshow
     }     
    window.location.href = url_str
});

});

function check_seo(){
    var seo_page = $.trim($("input[name='seo_page']").val());
    var seo_title = $.trim($("textarea[name='title']").val())
    var keywords = $.trim($("textarea[name='keywords']").val())
    var description = $.trim($("textarea[name='description']").val())
    
    if(seo_page == ""){
        layer_alert("页面名称不能为空");
        return false
    }
    if(seo_title == ""){
        layer_alert("页面标题不能为空");
        return false
    }
        if(keywords == ""){
        layer_alert("页面关键字不能为空");
        return false
    }
        if(description == ""){
        layer_alert("页面介绍不能为空");
        return false
    }
    return true;
}