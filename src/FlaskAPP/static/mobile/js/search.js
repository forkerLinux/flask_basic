$(function(){
    $("#global").click(function(){
        if($("#search").val()==""){
            layer.alert("请输入搜索的关键字", {
                yes: function(e){
                    layer.close(e);
                    $('#search').focus();
                }
            });
        }else{
            var search_value = $("#search").val();
            window.location.href = '/search/' + encodeURIComponent(search_value);
        }
    });

    $('.btn_select p').click(function(e){
        e.stopPropagation();
        $(this).next('ul.drop_box').toggle();
    });

    $(".btn_select ul li a").click(function(){ 
        $(this).parent().parent('ul').hide();   
        var a=$(this).html();
        $(this).parent().parent().parent().find("p").find(".show_list").html(a);
    });
    
    // 分位图——所属行业
    $("#trade_s ul li a").click(function(){    
        var infos = get_salary('trade_s');
        $.ajax({
            type:'post',
            url: "/api_query_tantile",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'search':infos.search,'industry':infos.industry}),
            success: function(data){ 
                var errcode = data.errcode;
                if(errcode == 0){
                    var data=data['data'];
                    industry_tantile=data;
                    create_trade_map(data);
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 分位图——工作年限
    $("#work_s ul li a").click(function(){    
        var infos = get_salary('work_s');
        $.ajax({
            type:'post',
            url: "/api_query_tantile",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'search':infos.search,'exp':infos.industry}),
            success: function(data){ 
                var errcode = data.errcode;
                if(errcode == 0){
                    var data=data['data'];
                    exp_tantile=data;
                    create_work_year_map(data);
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 分位图--教育经历
    $("#edu_s ul li a").click(function(){    
        var infos = get_salary('edu_s');
        $.ajax({
            type:'post',
            url: "/api_query_tantile",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'search':infos.search,'edu':infos.industry}),
            success: function(data){ 
                var errcode = data.errcode;
                if(errcode == 0){
                    var data=data['data'];
                    edu_tantile=data;
                    create_edu_map(data);
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // 分位图--企业规模
    $("#scale_s ul li a").click(function(){    
        var infos = get_salary('scale_s');
        $.ajax({
            type:'post',
            url: "/api_query_tantile",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'search':infos.search,'scale':infos.industry}),
            success: function(data){ 
                var errcode = data.errcode;
                if(errcode == 0){
                    var data=data['data'];
                    scale_tantile=data;
                    create_scale_map(data);
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });
    // TOP榜
    // 高薪公司排行榜
    $("#company_s ul li a").click(function(){    
        var infos = get_salary('company_s');
        $.ajax({
            type:'post',
            url: "/api_query_company",
            contentType:"application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({'search':infos.search,'industry':infos.industry}),
            success: function(data){ 
                var errcode = data.errcode;
                if(errcode == 0){
                    var data=data['data'];
                    create_gs_salary_map(data);
                }
            },
            error:function(){   
                alert('error');   
            }
        });
    });

});

function get_salary(obj){
    var search=$.trim($("#search").val());
    var industry=$("#"+obj +" p .show_list").html();
    return {
      'search':search,
      'industry':industry,
    }
}
// 分位图
// 所属行业分位图
function create_trade_map(data){
    bar_salary('trade', data, 'transverse','#6ffe97',30,{'unit':'元','name':'薪资'},
        function jump(params, dom, rect){
            $("#trade").unbind();
            $("#trade").click(function(){
                var val=$.trim($("#search").val());
                var con=$(this).parent().find(".btn_select").find("p").find(".show_list").html();
                if(con == '所属行业'){
                    con='不限';
                }
                window.location.href = '/joblist?search='+encodeURIComponent(val)+'&salary='+encodeURIComponent(params[0]['data'])+'&industry='+encodeURIComponent(con);
            });
        }
    );
}
// 工作年限分位图
function create_work_year_map(data){
    bar_salary('work_year2',data ,'portrait','#ff8c73',0,{'unit':'元','name':'薪资'},
        function jump(point, params, dom, rect){
            $("#work_year2").unbind();
            $("#work_year2").click(function(){
                var val=$.trim($("#search").val());
                var con=$(this).parent().find(".btn_select").find("p").find(".show_list").html();
                if(con == '工作年限'){
                  con='不限';
                }
                window.location.href = '/joblist?search='+encodeURIComponent(val)+'&salary='+encodeURIComponent(params[0]['data'])+'&exp='+encodeURIComponent(con);
            })
        }
    );
}
// 教育经历分位图
function create_edu_map(data){
    bar_salary('education',data ,'transverse','#6ffe97',30,{'unit':'元','name':'薪资'},
        function jump(point, params, dom, rect){
            $("#education").unbind();
            $("#education").click(function(){
                var val=$.trim($("#search").val());
                var con=$(this).parent().find(".btn_select").find("p").find(".show_list").html();
                if(con == '教育经历'){
                    con='不限';
                }
                window.location.href = '/joblist?search='+encodeURIComponent(val)+'&salary='+encodeURIComponent(params[0]['data'])+'&edu='+encodeURIComponent(con);
            })
        }
    );
}
// 企业规模分位图
function create_scale_map(data){
    bar_salary('scale',data ,'portrait','#ff8c73',0,{'unit':'元','name':'薪资'},
        function jump(point, params, dom, rect){
            $("#scale").unbind();
            $("#scale").click(function(){
                var val=$.trim($("#search").val());
                var con=$(this).parent().find(".bnt_select").find("p").find(".show_list").html();
                if(con == '企业规模'){
                    con='不限';
                }
                window.location.href = '/joblist?search='+encodeURIComponent(val)+'&salary='+encodeURIComponent(params[0]['data'])+'&scale='+encodeURIComponent(con);
            })
        }
    );
}
// TOP榜
// 高薪公司排行榜
function create_gs_salary_map(data){
    bar_salary('gs_top_salary',data, 'transverse','#6ffe97',30,{'unit':'元','name':'薪资'},
        function jump(point, params, dom, rect){
            $("#gs_top_salary").unbind();
            $("#gs_top_salary").click(function(){
                var val=$.trim($("#search").val());
                window.location.href = '/joblist?search='+encodeURIComponent(params[0]['name'])+'&search_type=company_job'+'&job_name='+encodeURIComponent(val);
            })
        }
    );
}

// 柱状图   
//格式  [{'legend': '教育/培训/院校', 'value': 11638},]
function bar_salary(id,datas,bar_type,color,angle,symbol,callback){
    var myChart = echarts.init(document.getElementById(id));

    var trend_name = [];
    var trend_salary=[];
    for (var i = 0; i < datas.length; i++) {
        var name = datas[i]['legend'];
        var salary = datas[i]['value'];
        trend_name[i] = name;
        trend_salary[i] = salary;
    }
    
    option = {
    tooltip: {
        trigger: 'axis',
        enterable:true,
        formatter: '{b}<br />{a}: {c}'+symbol['unit']+'<br />可点击查看',
        axisPointer: {
            type: 'shadow'
        },
        position : callback,
    },
   
    grid: {
        left: '7%',
        right: '7%',
        bottom: '12%',
        containLabel: true,
        top:'7%',   
    },
    xAxis:'',
    yAxis: '',
    series: [
        {
              name: symbol['name'],
              type: 'bar',
              itemStyle:{
                  normal:{ 
                      color:''
                    }        
                },
              data:trend_salary
        },
   ]
};
//portrait 横向图标
if(bar_type!="portrait"){
    var x = {type: 'value',
           　splitLine:{
　　　        　show:true,
                lineStyle:{
                  color:'#5871A2'
                },
　          　},
              axisLabel: {
                 formatter: '{value}'+symbol['unit']+'',
                 interval:0,
                rotate:angle,
                 textStyle: {
                    color: '#fff'
                   }
               }};
    var y = {type: 'category', data: trend_name,
        　   splitLine:{
　　　　        show:false,
　　           },
             axisLabel: {
                show: true,
                interval:0,
                textStyle: {
                    color: '#fff', 
                },
                formatter: function (value, index) {
                    if(id == 'gs_top_salary'){
                        return value.substr(0, 6)+'...';
                    } else {
                        return value;
                    }
                },
            }};
              
    option['series'][0]['itemStyle']['normal']['color'] =color;


    }else{
       
        var y = {type: 'value',
        　       splitLine:{
　　　　           show:true,
                   lineStyle:{
                      color:'#5871A2'
                     },
　               　},
                 axisLabel: {
                    formatter: '{value}'+symbol['unit'],
                    show: true,
                    textStyle: {
                      color: '#fff'
                      }
                 }};
        var x = {type: 'category', data: trend_name,
        　       splitLine:{
　　　　            show:false,
　　              },
                 axisLabel: {
                    show: true,
                    rotate:angle,
                    interval:0,
                    textStyle: {
                         color: '#fff'
                    }
                   }};
           
     
        option['series'][0]['itemStyle']['normal']['color'] =color; 
    }

    option['xAxis'] = x;
    option['yAxis'] = y;
   
    var sum=0;
    for (var item in datas) {
        sum += datas[item]['value'];
    }

    if (sum == 0) {
        $('#'+id).parent().find(".no_date").remove()
        $('#'+id).parent().append('<div class="no_date"><p>因职位名称不够完善或职位样本数据不足，暂无相关数据</p><p>请更换职位名称试试</p></div>')
        $('#'+id).children("div").css("display","none");
        $('#'+id).parent().find(".avg").css("display","none");
    } else {
        $('#'+id).parent().find(".no_date").remove()
    }   

    myChart.setOption(option);
}

// 走势图
function line_salary(id,datas, rotate){
  
    var myChart = echarts.init(document.getElementById(id));


var trend_name = [];
    var trend_salary=[];
     for (var i = 0; i < datas.length; i++) {
        var name = datas[i]['legend'];
        var salary = datas[i]['value'];
        trend_name[i] = name;
        trend_salary[i] = salary;
        
    }



option = {
    
    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}: {c}',
    },
     grid: {
        left: '16%',
        right: '4%',
        
        top:'3%',
    },
   
    toolbox: {
        show: false,
        feature: {
            dataZoom: {},
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: trend_name,
        splitLine:{
　　　　show:true,
        lineStyle:{
            color:'#5871A2'
        },
　　},
            
        axisLabel: {
            show: true,
             rotate:rotate,
             interval:0,
            textStyle: {
            color: '#B9D1FA'
            }
        }
    },
    yAxis: {
        type: 'value',
        scale:true,
        splitLine:{
　　　　show:true,
        lineStyle:{
            color:'#5871A2'
        },
　　},
            
    axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
           }
        }
    },
    series: [
        {
            name:'市场薪酬',
            type:'line',
            smooth:true,
            data:trend_salary,
            itemStyle: {
                normal:{
                    color:'#ff85e4'
                    }
                },
              },
         ]
      };
      var sum=0;
  for (var item in datas) {
             sum += datas[item]['value'];
     }

       if(sum == 0){
        $('#'+id).parent().append('<div class="no_date"><p>因职位名称不够完善或职位样本数据不足，暂无相关数据</p><p>请更换职位名称试试</p></div>')
        $('#'+id).children("div").css("display","none");
       $('#'+id).parent().find(".avg_salary").css("display","none");
        }
      else{
                $('#'+id).parent().find(".no_date").remove()
         }

          myChart.setOption(option);
}

// 饼状图
function pie_salary(id,datas){
    var myChart = echarts.init(document.getElementById(id));
    var arr_pic = [];
    for (var i = 0; i < datas.length; i++) {
        var name = datas[i]['legend'];
        var salary = datas[i]['value'];
       
            arr_pic[i] =  {value:salary, name:name};

        
    }
option = {
   
    tooltip : {
        trigger: 'item',
        formatter: "{b} <br/>{a} : {c}%",
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:arr_pic,
        textStyle:{
           color:"#eee",
        }
    },

   
    series : [
        {
            name: '所占比例',
            type: 'pie',
            radius : '55%',
            center: ['50%', '40%'],
            hoverAnimation:false,
            data:arr_pic,
            itemStyle: {
                 normal:{  
                         color: function(params) {
                        // build a color map as your need.
                        var colorList = color;
                        return colorList[params.dataIndex]
                    } 
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
       addDataAnimation:false,
};

    var color=['#ffef82','#ff85e4','#6ffe97','#ff8c73','#64f4ff']
    var sum=0;
  for (var item in datas) {
             sum += datas[item]['value'];
     }

       if(sum == 0){
        $('#'+id).parent().append('<div class="no_date"><p>因职位名称不够完善或职位样本数据不足，暂无相关数据</p><p>请更换职位名称试试</p></div>')
        $('#'+id).children("div").css("display","none");
       $('#'+id).parent().find(".avg_salary").css("display","none");
        }
      else{
                $('#'+id).parent().find(".no_date").remove()
         }

    myChart.setOption(option);

}


