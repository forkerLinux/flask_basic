$(function(){
    var width=$("#search").outerWidth(true);
    $("#search").focus();
    $(".typeahead").css("width",width);

    $(".search_href").on("keydown",".keyclass",function(event){
      event.stopPropagation()
      if(event.keyCode != 13 ) return;
        event.returnValue=false;

      if(!$('.typeahead ').is(":hidden")){
          return
      }
      if(document.activeElement){
        var id1 = document.activeElement.id;
        var parentNodeName = document.activeElement.parentNode.parentNode.parentNode;
        if('|search|'.indexOf('|' + id1 + '|') == -1)  return;

        if($(parentNodeName).hasClass('major_search')){

             $(".major_search #global").trigger("click");
        }else if ($(parentNodeName).hasClass('job_search')) {
             $(".job_search #global").trigger("click");
        }else{
          // return;
        }
      }

      // $('#global').trigger("click");
      event.returnValue=false;
    });

    $(".major_search #global").click(function(){
      var text_list=[];
      var search_content = $.trim($(".major_search #search").val());
      var typeahead = $.trim($(".typeahead li").text());
      if (search_content == "") {
        layer.alert("专业名称不能为空")  
         $('#search').blur();                             
      }
      else{
          for(var i=0;i<$(".typeahead li").length;i++){
            text_list.push($.trim($(".typeahead li:eq("+i+")").data("value")));
          }
          if($.inArray(search_content,text_list) == -1){
            layer.alert("请填写正确的专业名称");
             $('#search').blur();

          }else{
            window.location.href = "/joblist?search="+encodeURIComponent(search_content)+"&search_type=major";
          }
      }
    })

    $(".job_search #global").click(function(){
      var text_list=[];
      var search_content = $.trim($(".job_search #search").val());
      
      if (search_content == "") {
        layer.alert("职位名称不能为空") 
         $('#search').blur();                              
      }else{
        window.location.href = "/joblist?search="+encodeURIComponent(search_content)+"&search_type=job";
      }
    })

    var url = window.location.href;
    var query= url.indexOf('target');
    if(query > -1){
        var arr_url = url.split('=');
        var target = arr_url[1];
    } else {
        var target = 'major';
    }

    if (target == 'major') {
        show_major();
    } 
    if (target == 'job') {
        show_job();
    }
    $('.major').click(function(){
      $('.major_search').show();
      $('.job_search').hide();
    });
    $('.jobs').click(function(){
      $('.major_search').hide();
      $('.job_search').show();
    });
})

function show_major(){
  $('.major_search').show();
  $('.job_search').hide();
}
function show_job(){
  $('.major_search').hide();
  $('.job_search').show();
}

