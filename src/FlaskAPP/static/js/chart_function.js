//分位值 柱状图
function main( id,data,bar_type,color){
    var myChart = echarts.init(document.getElementById(id));
   option = {
        tooltip: {
            trigger: 'axis',
        formatter: '{b}<br />{a}: {c} <br/> 点击可查看工作机会',

            axisPointer: {
                type: 'shadow'
            },
             position: function (point, params, dom, rect) {
                  $('#'+id).unbind();
                  $('#'+id).click(function(){
                   var val=$.trim($("#search").val());
                    var par_id=$(this).parent().find(".other_main").attr("id");
                    var con=$(this).parent().find(".bnt_select").find("p").find(".show_list").html();
                    
                    if(con == '所属行业' || con == '工作年限' || con == '教育经历' || con == '企业规模'){
                          con='不限'
                       }
                    else if(params[0]['data'] == undefined){
                     params[0]['data'] = '不限'
                     }
                    
                    jump_to(par_id,params[0]['data'],con,val)
                  })
            }
        },
        grid: {
            left: '10%',
            right: '7%',
            bottom: '3%',
            containLabel: true,
            top:'5%',  
        },
       
        xAxis:'',
        yAxis:'',
        series: [
            {
                name: '薪资',
                type: 'bar',
                

                label: '',
                 itemStyle:{
                    normal:{
                        color:''             
                    }
                },
                data:[data['10'], data['25'], data['50'], data['75'], data['90']]
            },
            
        ]
};
       if(bar_type!="s"){
        var x = {type: 'value',
              　splitLine:{
                lineStyle:{
                    color:'#5871A2'
                     },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: '#fff'
                      }
               }};
        var y = {type: 'category', data:['P10','P25','P50','P75','P90'],
              　splitLine:{
　　　            　show:false,
　             　},
                 axisLabel: {
                    show: true,
                    textStyle: {
                    color: '#fff'
                      }
               }
         };
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
                    show: true,
                    textStyle: {
                    color: '#fff'
                      }
               }};
        var x = {type: 'category', data:['P10','P25','P50','P75','P90'],
              　splitLine:{
　　　            　show:false
　　             },
                 axisLabel: {
                    show: true,
                    textStyle: {
                    color: '#fff'
                      }
                   }
                 };
        option['series'][0]['itemStyle']['normal']['color'] =color;
        
    }
        option['xAxis'] = x;
        option['yAxis'] = y;
 if(Object.getOwnPropertyNames(data).length == 0){

        $('#'+id).parent().append('<div class="no_date"><p>因职位名称不够完善或职位样本数据不足，暂无相关数据</p><p>请更换职位名称试试</p></div>')
        $('#'+id).children("div").css("display","none");

        
     }
     else{
            $('#'+id).parent().find(".no_date").remove()
     }


       
        myChart.setOption(option);
}


 
// 柱状图  薪酬区间,工作年限,职位高薪公司排行榜，行业排行榜
function bar_salary(id,datas,bar_type,color,key,value){
    var myChart = echarts.init(document.getElementById(id));

    var trend_name = [];
    var trend_salary=[];
     for (var i = 0; i < datas.length; i++) {
        var name = datas[i][key];
        var salary = datas[i][value];
        trend_name[i] = name;
        trend_salary[i] = salary;
    }
    option = {
    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}: {c}%<br />可点击查看',
        axisPointer: {
            type: 'shadow'
        },
        position :''
    },
   
    grid: '',
    xAxis:'',
    yAxis: '',
    series: [
     {
        name: '所占比例',
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
if(bar_type!="s"){

   var grid = {
        left: '3%',
        right: '4%',
        bottom: '6%',
        containLabel: true,
        top:'5%',
    };
    var x = {type: 'value',
           　splitLine:{
　　　        　show:true,
                lineStyle:{
                  color:'#5871A2'
                },
　          　},
              axisLabel: {
                 formatter: '{value}%',
                 interval:0,
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

                textStyle: {
                color: '#fff'
               }
            }};
             var  position=
              function (point, params, dom, rect) {
                  $('#'+id).unbind();
                  $('#'+id).click(function(){
                   var val=$.trim($("#search").val());
                   var name = params[0]['name'];
                   if(name == '应届毕业生'){
                       name = '应届'
                    }
                     window.open( '/joblist?search='+encodeURIComponent(val)+'&exp='+encodeURIComponent(name))
                   
                  })
            };  
    option['series'][0]['itemStyle']['normal']['color'] =color;
       option['tooltip']['position'] =position;


    }else{
       var grid = {
        left: '10%',
        right: '4%',
        bottom: '6%',
        containLabel: true,
        top:'5%',
    };
        var y = {type: 'value',
        　       splitLine:{
　　　　           show:true,
                   lineStyle:{
                      color:'#5871A2'
                     },
　               　},
                 axisLabel: {
                    formatter: '{value}%',
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
                    rotate:30,
                    interval:0,
                    textStyle: {
                         color: '#fff'
                      }
                   }};
          var  position=
              function (point, params, dom, rect) {
                  $('#'+id).unbind();
                  $('#'+id).click(function(){
                   var val=$.trim($("#search").val());
                     window.open( '/joblist?search='+encodeURIComponent(val)+'&salary='+encodeURIComponent(params[0]['name']))
                  })
            };        
     
       option['series'][0]['itemStyle']['normal']['color'] =color;
       option['tooltip']['position'] =position;
    }
       option['xAxis'] = x;
       option['yAxis'] = y;
       option['grid'] = grid;
   
          var sum=0;
     for (var item in datas) {
             sum += datas[item][value];
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
function pie_salary(id,datas,key,value){
    var myChart = echarts.init(document.getElementById(id));
    var arr_pic = [];
    for (var i = 0; i < datas.length; i++) {
        var name = datas[i][key];
        var salary = datas[i][value];
       
            arr_pic[i] =  {value:name, name:salary};

        
    }
option = {
   
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%",
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
            name: '薪酬区间',
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
             sum += datas[item][key];
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

// 走势图
function line_salary(id,datas,key,value){
  
    var myChart = echarts.init(document.getElementById(id));


var trend_name = [];
    var trend_salary=[];
     for (var i = 0; i < datas.length; i++) {
        var name = datas[i][key];
        var salary = datas[i][value];
        trend_name[i] = name;
        trend_salary[i] = salary;
        
    }



option = {
    
    tooltip: {
        trigger: 'axis'
    },
     grid: {
        // left: '3%',
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
             rotate:45,
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
             sum += datas[item][value];
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

