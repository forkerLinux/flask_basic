xc_ref_num=["994.43", "down", "-1.89 (-0.19%)","988.02", "down", " -3.17 (-0.32%)", "2016年1月"];
xc_datas_link=[{"labels":[201511,201512,201601,"","",""],
                "data1":[1000,996.32,994.43]},
               {"labels":[201511,201512,201601,"","",""],
               "data1":[1000,991.19,988.02]}];
// 薪酬指数
var scales = [950, 1050];
lineChart('myChart', ['薪酬指数'], xc_datas_link[0], '2,151,116', scales);
// 招聘指数
lineChart('myChart1', ['招聘指数'], xc_datas_link[1], '100,149,237', scales);

$("#xc_idx_num1").html(xc_ref_num[0]);
$("#xc_updown_num1").html(xc_ref_num[2]);
if (xc_ref_num[1] == 'down') {
    $('#updown_img1').attr('src', 'images/num_down.png');
    $('#xc_updown_num1').css('color', '#029774');
    $('#xc_idx_num1').css('color', '#029774');
}

$("#xc_idx_num2").html(xc_ref_num[3]);
$("#xc_updown_num2").html(xc_ref_num[5]);
if (xc_ref_num[4] == 'down') {
    $('#updown_img2').attr('src', 'images/num_down.png');
    $('#xc_updown_num2').css('color', '#029774');
    $('#xc_idx_num2').css('color', '#029774');
}

$("#update_date1").html(xc_ref_num[6]);
$("#update_date2").html(xc_ref_num[6]);

$("#xc_today_avg").html(xc_ref_num[3]);
$("#xc_yesterday_avg").html(xc_ref_num[4]);
$("#xc_avg_updown_num").html(xc_ref_num[5]);


function lineChart(lid, legend, datas, arr_linecolor, scale){
    var line = echarts.init(document.getElementById(lid));         
    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend:{
            data:[],
            // x:'53%'          
        },
        // calculable : true,
        grid:{
            borderWidth:0,
            // x2:0
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                splitLine:false,
                data : [],
                axisLabel:{
                    // interval:0
                },
                axisTick:{
                    interval:0
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    lineStyle:{
                        color:'#eee',
                        width:1,
                        type:'solid'
                    }
                },
                scale:true,
            }
        ],
        series : createSeries(legend, datas, arr_linecolor)
    };
   
    if(legend.length > 1){
        option['legend']['data'] = legend;
        option['xAxis'][0]['data'] = datas[0]['labels'];  
    }else{
        option['xAxis'][0]['data'] = datas['labels'];  
    } 

    if(scale.length>1){
        option['yAxis'][0]['min'] = scale[0];
        option['yAxis'][0]['max'] = scale[1];
    }

    line.setOption(option); 
}

function createSeries(legend, datas, arr_linecolor){   
    if(legend.length >1){
        var series = new Array();
        for(var i=0; i<datas.length; i++){
            series[i] = {
                name:legend[i],
                type:'line',
                data:datas[i]['data1'],
                itemStyle:createItemStyle(arr_linecolor[i], false)
            };
        }
    }else{
        var series = [
            {
                name:legend[0],
                type:'line',
                smooth:true,
                data:datas['data1'],
                itemStyle:createItemStyle(arr_linecolor, true),
                markLine : {
                    data : [
                        [
                            {name:'水平线', value:1000, x:79, y:192},
                            {name:'', x:570, y:192}
                        ]
                    ]
                }
            }
        ];
    }
    return series;
}

// 曲线显示样式
function createItemStyle(linecolor, bgcolor) {
    if(bgcolor){
        return {
            normal: {
                color: 'rgba(' + linecolor + ', 1)',
                areaStyle:{
                    color: 'rgba(' + linecolor + ', 0.5)'
                }
            }
        };
    }else{
        return {
            normal: {
                color: 'rgb(' + linecolor + ')',
                lineStyle:{
                    color: 'rgb(' + linecolor + ')'
                }
            }
        };
    }   
}


