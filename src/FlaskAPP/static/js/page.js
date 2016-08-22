function create_element_job(datas){
    if (datas.length > 0) {
        var tag_str = '';
        for (var i = 0; i < datas.length; i++) {
            tag_str +='<div class="jobdetail_list" id="job_'+datas[i]['id']+'"><div class="row job_detail"><div class="col-xs-7 job_zw"><div class="job_name"><p><a href="/job_detail?job_id='+datas[i]['id']+'" target="_blank" title="'+datas[i]['job_name']+'">'+datas[i]['job_name']+'</a></p></div>'          
            tag_str +='<p class="industry_name">'
           
            if(datas[i]['salary_str'] !="面议"){
              tag_str += '<span class="money">￥'+datas[i]['salary_str']+'/月</span>'
            }else{
              tag_str += '<span class="money">面议</span>'
            }
            tag_str += '<span>'+datas[i]['job_city']+'</span>'

            if(datas[i]['education_str'] !=""){
              tag_str +=' <span><span class="interval">|</span>'+datas[i]['education_str']+'</span>'
            }
            if(datas[i]['job_type'] !=""){
                if(datas[i]['job_type'] == 'fulltime'){
                    tag_str +=' <span><span class="interval">|</span>全职</span>'
                }
                if(datas[i]['job_type'] == 'parttime'){
                    tag_str +=' <span><span class="interval">|</span>兼职</span>'
                }
                if(datas[i]['job_type'] == 'intern'){
                    tag_str +=' <span><span class="interval">|</span>实习</span>'
                }
                if(datas[i]['job_type'] == 'unclear'){
                    tag_str +=' <span><span class="interval">|</span>不限</span>'
                }
            }
            if(datas[i]['boon'].length >0){
              tag_str +=' <p class="welfare">'
              for(var k=0; k<datas[i]['boon'].length;k++){
                tag_str +=' <span>'+datas[i]['boon'][k]+'</span>'
              }
              tag_str +=' </p>' 
            }
            tag_str += '</div><div class="col-xs-5 job_zw gs_info"><p class="company_name">'+datas[i]['company_name']+'</p>'
            tag_str += '<p class="industry_name">'

            if(datas[i]['trade'] !=""){
              tag_str +=' <span>'+datas[i]['trade']+'</span>'
            }
            if(datas[i]['company_type'] !=""){
              tag_str +='<span><span class="interval">|</span>'+datas[i]['company_type']+'</span>'
            }
            if(datas[i]['scale'] !=""){
              tag_str +='<span><span class="interval">|</span>'+datas[i]['scale']+'人</span></p>' 
            }
           
           tag_str += '<p class="update_time">'+datas[i]['dt_update']+'</p></div></div></div>'
        } 
        return tag_str;
    }
}

//分页js
function PagerObject(){
        var that = {};
        that.init = function(pagerElement,current_page, total_page, before_length, after_length, cb){
            that.pagerElement = pagerElement;
            that.current_page = current_page;
            that.total_page = total_page;
            that.before_length = before_length;
            that.after_length = after_length;
            that.cb = cb;
            that._bindClick();
        };
        that._bindClick = function(){
            that.pagerElement.find('span').click(function(){
                current_page = $(this).data("page");
                    if (current_page<=1) {
                        current_page=1;
                    }else if (current_page>=total_page){
                        current_page=total_page;
                    }
             $('html,body').animate({ scrollTop:0}, 700);
                that.cb(current_page).done(function(){that.change_current(current_page)}).fail(function(){that.fail()});

            })
        }
		that.change_page = function(current_page){
				if (current_page<=1) {
					current_page=1;
				}else if (current_page>=total_page){
					current_page=total_page;
				}
			that.cb(current_page).done(function(){that.change_current(current_page)}).fail(function(){that.fail()});
		}
        that.change_current = function(current_page){
            var fragment = $(document.createDocumentFragment());
            that.current_page = current_page;
            //判断起始条件
            if(that.current_page <=1  ){
                that.current_page = 1;
                fragment.append('<span class="gray" data-page="1">上一页</span>');
                fragment.append('<span class="item action" data-page="1">1</span>');
            } else {
                fragment.append('<span class="prev" data-page="'+(current_page-1)+'">上一页</span>');
                fragment.append('<span class="item" data-page="1">1</span>');
            }

            //循环输出
            var beforePointFlag = 0;
            var afterPointFlag = 0;
            for(var i =2; i < that.total_page; i++){
                if((that.current_page - that.before_length -i > 0) && (beforePointFlag == 0)){
                    fragment.append('<i class="point">...</i>');
                    beforePointFlag = 1;
                }
                if((that.current_page-that.before_length-i <=0) && (that.current_page+that.after_length-i >= 0)){                  
                    if(i === that.current_page){
                        fragment.append('<span class="item action" data-page="'+i+'">'+i+'</span>');
                    } else {
                        fragment.append('<span class="item" data-page="'+i+'">'+i+'</span>');
                    }                   
                }
                if((that.current_page + that.after_length -i < 0) && (afterPointFlag == 0)){
                    fragment.append('<i class="point">...</i>');
                    afterPointFlag = 1;
                }
            }

            //判断终止条件
            if(that.current_page == that.total_page){
              if(that.total_page != 1){
                    fragment.append('<span class="item action" data-page="'+that.total_page+'">'+that.total_page+'</span>');
                }
                fragment.append('<span class="gray" data-page="'+(that.current_page)+'">下一页</span>');
            } else {
                fragment.append('<span class="item" data-page="'+that.total_page+'">'+that.total_page+'</span>');
                fragment.append('<span class="last" data-page="'+(that.current_page+1)+'">下一页</span>');

            }
            that.pagerElement.empty().append(fragment);
            that._bindClick();
        };
        that.fail = function(){
         layer.alert('加载失败！');
        }
        return that;
    }
