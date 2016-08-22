
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
