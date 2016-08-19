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
