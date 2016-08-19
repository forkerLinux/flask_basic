
// 走势图
function line_salary(id,datas){
  
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

