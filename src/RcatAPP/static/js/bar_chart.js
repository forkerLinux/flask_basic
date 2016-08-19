
// 柱状图   
//格式  [{'legend': '教育/培训/院校', 'value': 11638},]
function bar_salary(id,datas,bar_type,color,angle,symbol){
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
        formatter: '{b}<br />{a}: {c}'+symbol['unit']+'<br />可点击查看',
        axisPointer: {
            type: 'shadow'
        },
    },
   
     grid: {
        left: '7%',
        right: '7%',
        bottom: '7%',
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
                textStyle: {
                color: '#fff'
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
