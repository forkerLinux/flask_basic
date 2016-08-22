// var salary_min=document.getElementById("salary_min").val();
// var salary_max=document.getElementById("salary_max").val();
//判断条件 
function job_edit()
{
    var job_name = $.trim($("input[name=job_name]").val());
    var job_num = $.trim($("input[name=job_num]").val());
    var job_type = $("input[name=job_type]:checked").val();
    var address = $.trim($("input[name=address]").val());
    var job_years = $("input[name=job_years]").val();
    var edu = $("select[name=edu] option:selected").val();
    //var salary = $("select[name=salary] option:selected").val();
    var boon = $.trim($("input[name=boon]").val());
    var job_des = $.trim($("textarea[name=job_des]").val());
    if(job_name==""){
        //alert('职位名称不能为空！');
        layer.alert('职位名称不能为空！', {
             title: '提示',
        })
        return false;
    }
    var pattern = /^\d+$/;  
    if(job_num=="" || !pattern.test(job_num)){
        //alert('职位人数不能为空，或只能为数字！');
        layer.alert('职位人数不能为空，或只能为数字！', {
             title: '提示',
        })
        return false;
    }
    if(address==""){
        //alert('公司地点不能为空！');
        layer.alert('公司地点不能为空！', {
             title: '提示',
        })
        return false;
    }
    if(job_years==""){
        //alert('请选择工作年限！');
        layer.alert('请选择工作年限！', {
             title: '提示',
        })
        return false;
    }
    if(edu==""){
        //alert('请选择学历！');
        layer.alert('请选择学历！', {
             title: '提示',
        })
        return false;
    }
    var s_min = $("input[name=s_min]").val();
    var s_max = $("input[name=s_max]").val();
    
    if(s_min == '' || s_max == "")
    {
        //alert("最低金额和最高金额不能为空!");
        layer.alert('最低金额和最高金额不能为空', {
             title: '提示',
        })
        return false;
    }
    if(parseInt(s_max) < parseInt(s_min))
    {
        //alert("最高金额不能低于最低金额");
        layer.alert('最高金额不能低于最低金额', {
             title: '提示',
        })
        return false;
    }
    if(!(/^[0-9]+$/).test(s_min) || !(/^[0-9]+$/).test(s_max)){
          layer.alert('请填写正确的薪酬数字', {
             title: '提示',
        })
        return false;
    }
    if(!(/^[\u4e00-\u9fa5]+$/).test(address)){
          layer.alert('请填写正确的工作地点', {
             title: '提示',
        })
        return false;
    }
    if(job_des==""){
        //alert('职位介绍描述不能空！');
        layer.alert('职位介绍描述不能空！', {
             title: '提示',
        })
        return false;
    }

    return true;

}


// echarts图

function main(data){
        var salary_min = $.trim($("#salary_min").val());
    // var salary_max = $("#salary_min").val();

    var myChart = echarts.init(document.getElementById('line_graph'));

  option = {
   
    tooltip: {
      
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
    grid :{
      
      x:'13%',
      x2:'11%',
      
      
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['P10', 'P25','P50','P75','P90']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}元'
        }
    },
    series: [
        {
            name:'工资水平',
            type:'line',

            data:[data['10'],data['25'],data['50'], data['75'], data['90']],
            markPoint: {
               data: [
                    {type: 'max', name: '最大值',
                   itemStyle:{
                     normal:{     
                        color:'#FF6666',
                      }
                   },
                },
                {type: 'min', name: '最小值',
                    itemStyle:{
                         normal:{
                    
                          color:'#DC8A0B'
                    
                        }
                    },
                 },
                    

                ],

                symbolSize:[72,72]
            },

           
        },
        { 

            type:'line',
            data:[salary_min],
            markLine: {
               data: [
                    [
                      {name: '您在这' , xAxis: 0,yAxis:salary_min},
                      {name: '您在这', xAxis: 4,yAxis:salary_min}
                    ]
                   
                ],

            },
           
        }
       
    ]
};
 
 myChart.setOption(option);
}

function get_salary(){
      var search=$.trim($("#search").val());
      return {
        'search':search,

     }
}

// 下拉框
 $(function() {   
        $(".education").change(function() {
            // 当选择的时候，找到当前选中的 option
            var option = $(this).find("option:selected");
            // 获得 value 和 对应文本
            var selv = option.val();
            var selt = option.text();
            // 然后找到 select 的父节点的第0个 span，把 selt 写入到 span 中
            if (selt != '--请选择--') {
                $(".edu_sel").css('color', '#000');
            }else{
                $(".edu_sel").css('color', '#757575');
            }
            $(".edu_sel").html(selt);  
        })
        // 初始化的时候，执行一次change方法
        $("select").change();
    });

 // 提示
 function alert_r(msg,url)
{
    if(url !="")
    {
      layer.alert(msg,{
      skin: 'layui-layer-lan'
     ,closeBtn: 0
     ,yes:function index(){
      window.location.href=url;
      }
      }
      );
             
    }else
    {
        layer.alert(msg);
    }

        
    
}

function go(){
      location.href="/company/company_job_list"; 
    }









