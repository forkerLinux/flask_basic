// $(function(){
// 	 //　期望职位expect_job
//      $('#search').focus(function(){
//         show_panel('pop_job');
//         var job = $(this).val();
//         arr_job = job.split(',')
//         if (job == '') {
//             create_job(jobsdata[0]['trade']);
//         } else {
//             create_job(arr_job[0]);
//             $(".pop_job .city li.select").removeClass("select");
//             for(var i=0; i<arr_job.length; i++){
//                 $('.pop_job .city li:contains('+arr_job[i]+')').addClass('select');
//             }
//         }        
//     });
//     $('.pop_job').on('click', '.province li', function(){
//         var job_one = $(this).html();
//         create_job(job_one);
//     });
//     $('.pop_job').on('click', '.city li', function(){
//         $(this).addClass('select');
//         var jobs_li=$(this).html();
//         $("#search").val(jobs_li);
//         $('.cancel').click();
//     });

//     $('.cancel').click(function(){
//         $('.black_overlay').hide();
//         $(this).parent().parent().hide();
//     });
// });



// 职位
// function create_job(job){
//     $('.pop_job .province ul').html('');
//     for (var index in jobsdata) {
//         var name = jobsdata[index]['trade'];
//         $('.pop_job .province ul').append('<li>'+name+'</li>');
//         //相应的职位
//         var cities = jobsdata[index]['job_list'];
//         if (job == name) {
//             $('.pop_job .city ul').html('');
//             for(var index2 in cities){
//                 $('.pop_job .city ul').append('<li>'+cities[index2]+'</li>');
//             }            
//         } else {
//             if (cities.length > 1) {
//                 for(var index2 in cities){
//                     var city = cities[index2];
//                     if (job == city) {
//                         var province = jobsdata[index]['trade'];
//                         create_job(province);
//                         return false;
//                     }
//                 } 
//             }            
//         }
//     }
// }
// function show_panel(obj){
//     $('.black_overlay').show();
//     $('.'+obj).show();
// }
$(function(){
    $('.dropdown .dropdown-menu a').click(function(){
        var select_item = $(this).html();
        $(this).parent().parent().siblings().children('span:first').html(select_item);
        $('.searchType').attr('searchtype',select_item);
        var str  = '请输入'+select_item+'名称';
        $('#search').attr('placeholder',str);
    });
})
