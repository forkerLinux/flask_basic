


// 首页
function first(look_obj){
 url = '/api_query_tantile_job';
      look_obj = look_obj;
        market_page = 1;
        var infos = tantil_list();
}

// 尾页

function last(url,look_obj,name){
   url = url;
   look_obj = look_obj;
   listpage = parseInt($.trim($('.'+name +' .total_number').html()));
   total_page = listpage;
   page = total_page;
    
}
// 上一页

function prev(url,look_obj,listpage,name){
   url = url;
   look_obj = look_obj;
   listpage = parseInt($.trim($('.'+name +'.sele a').html()))-1;
        page = listpage+1;
        if(listpage<=0){
          listpage=1;
        }        
        go_prev($('.'+name +'.cur_number'));
}

// 下一页

function next(url,look_obj,listpage,name){
   url = url;
   look_obj = look_obj;
     listpage = parseInt($.trim($('.'+name +'.sele a').html()))+1;
          page = listpage-1;
          total_page = parseInt($.trim($('.'+name +'.total_number').html()));
          if (company_page >= total_page) {
            company_page = total_page;
          }
         go_next($('.'+name +'.cur_number'));
}