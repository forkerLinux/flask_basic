// 省份
function create_province(address){
    $('.province ul').html('');
    for (var i=0 ;i<citydata.length;i++) {
        var name = citydata[i]['name'];
        $('.province ul').append('<li>'+name+'</li>');
        $('.province li:contains('+address+')').addClass('select');
        //相应的省市
        var cities = citydata[i]['cities'];
        if (address == name) {
            $('.city ul').html('');
            for(var j=0; j<cities.length; j++){
                $('.city ul').append('<li>'+cities[j]+'</li>');
            }         
        }
    }
}
// 职位
function create_jobs(job_name){
    $('.job_trade ul').html('');
    for (var index in jobsdata) {
        var trade = jobsdata[index]['trade'];
        $('.job_trade ul').append('<li>'+trade+'</li>');
        $('.job_trade li:contains('+job_name+')').addClass('select');
        //相应的职位
        var jobs = jobsdata[index]['job_list'];
        if (job_name == trade) {
            $('.jobs ul').html('');
            for(var index2 in jobs){
                $('.jobs ul').append('<li>'+jobs[index2]+'</li>');
            }            
        }
    }
}

function show_panel(bg, obj){
    $('.'+bg).show();
    $('.'+obj).show();
    $('body').css('overflow', 'hidden');
}

function close_panel(bg, obj) {
    $('.'+bg).hide();
    $('.'+obj).hide();
    $('body').css('overflow', 'auto');
}
