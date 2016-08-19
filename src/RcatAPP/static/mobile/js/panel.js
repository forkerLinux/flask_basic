$(function(){
    $('.head_img img').click(function(){
        $('.pop_modify_pic').show();
        $('.black_overlay').show();
    });
    $('.pop_close').click(function(){
        $('.pop_modify_pic').hide();
        $('.black_overlay').hide();
    });
    // 选择地区
    $('#address').focus(function(){
        show_panel('pop_area');
        var city = $(this).val();
        if (city == '') {
            create_province('北京');
        } else {
            create_province(city);
            $('.pop_area .city li:contains('+city+')').addClass('select');
        }        
    });
    // 省
    $('.pop_area').on('click', '.province li', function(){
        var province = $(this).html();
        create_province(province);
    });
    $('.pop_area').on('click', '.city li', function(){
        var city = $(this).html();
        $('#address').val(city);
        $(this).toggleClass('select');
        $('.cancel').click();
    });

    //　期望职位expect_job
     $('#expect_job').focus(function(){
        show_panel('pop_job');
        var job = $(this).val();
        arr_job = job.split(',')
        if (job == '') {
            create_job(jobsdata[0]['trade']);
        } else {
            create_job(arr_job[0]);
            $(".pop_job .city li.select").removeClass("select");
            for(var i=0; i<arr_job.length; i++){
                $('.pop_job .city li:contains('+arr_job[i]+')').addClass('select');
            }
        }        
    });
    $('.pop_job').on('click', '.province li', function(){
        var job_one = $(this).html();
        create_job(job_one);
    });
    $('.pop_job').on('click', '.city li', function(){
        var job_two = $(this).html();
        $('#expect_job').val(job_two);
        $(this).toggleClass('select');
        job_num = $(".pop_job .city li.select").size()
        if(job_num > 5)
        {
           $(this).removeClass("select") 
           layer.alert("最多选择5个职位") 
           return false;
        }
    });
   // 职位提交
   $('.pop_job .submit').click(function(){
        var str_job = '';
        var nums = $('.pop_job .city li.select').size();
        if (nums == 0) {
            layer.alert('至少选择一个职位');
            return false;
        }
        $('.pop_job .city li.select').each(function(){
            str_job += $(this).html()+',';
        });
        $("#expect_job").val(str_job.substring(0, str_job.length-1));
        $('.cancel').click();
    }); 


 //----------------------   
    $('.pop_close').click(function(){
        $('.black_overlay').hide();
        $(this).parent().hide();
    });
    $('.cancel').click(function(){
        $('.black_overlay').hide();
        $(this).parent().parent().hide();
    });
});

function pic_show(s, r)
{
   $(".head_img").find('img').data('rel', r);
   $(".head_img").find('img').attr('src', s);
   $(".pop_modify_pic, .black_overlay").hide();
}
function show_panel(obj){
    $('.black_overlay').show();
    $('.'+obj).show();
}

function create_year()
{ 
    var nums = cur_year - 1949;
    var years = '';
    for(var i = cur_year; i >= 1949; i--)
    {
        years += '<option value="'+i+'">'+i+'年</option>';
    }   
    return years;
}
// 省份
function create_province(address){
    $('.pop_area .province ul').html('');
    for (var index in citydata) {
        var name = citydata[index]['name'];
        $('.pop_area .province ul').append('<li>'+name+'</li>');
        //相应的省市
        var cities = citydata[index]['cities'];
        if (address == name) {
            $('.pop_area .city ul').html('');
            for(var index2 in cities){
                $('.pop_area .city ul').append('<li>'+cities[index2]+'</li>');
            }            
        } else {
            if (cities.length > 1) {
                for(var index2 in cities){
                    var city = cities[index2];
                    if (address == city) {
                        var province = citydata[index]['name'];
                        create_province(province);
                        return false;
                    }
                } 
            }            
        }
    }
}
// 职位
function create_job(job){
    $('.pop_job .province ul').html('');
    for (var index in jobsdata) {
        var name = jobsdata[index]['trade'];
        $('.pop_job .province ul').append('<li>'+name+'</li>');
        //相应的职位
        var cities = jobsdata[index]['job_list'];
        if (job == name) {
            $('.pop_job .city ul').html('');
            for(var index2 in cities){
                $('.pop_job .city ul').append('<li>'+cities[index2]+'</li>');
            }            
        } else {
            if (cities.length > 1) {
                for(var index2 in cities){
                    var city = cities[index2];
                    if (job == city) {
                        var province = jobsdata[index]['trade'];
                        create_job(province);
                        return false;
                    }
                } 
            }            
        }
    }
}
