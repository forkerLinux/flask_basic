 function initLineChart(){
        var myChart = echarts.init(document.getElementById('linechart-cv'));

        // 指定图表的配置项和数据
         var option  = {
                title: {
                    text: ''
                },
                tooltip : {
                    textStyle:{fontSize:12}
                 
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis : [
                    {
                        type : 'category',
                        splitLine:'false',
                        boundaryGap : false,
                        data : ['7月20日','7月21日','7月22日','7月23日','7月24日','7月25日','7月26日','7月27日','7月28日','7月29日'],
                    
                         axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        }, 
                        axisLabel:{
                            textStyle:{
                                color:'#333',
                                fontSize:11
                            
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        // 网格线样式
                        splitLine:{
                                lineStyle:{
                                    color: ['#f0f0f0'],
                                    width: 1,
                                    type: 'solid'
                                 }
                                },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333',
                                fontSize:11
                            
                            }
                        }

                    }
                         
                ],
                series : [
                   
                    {
                        name:'',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {color:'#cff1ff',opacity:0.5}},
                        lineStyle: {normal: {color:'#00a7e7'}},
                        itemStyle: {normal: {color:'#00a7e7'}},
                        data:[21, 53, 70, 65, 71, 35, 34,33,55,41]
                    }
                ]
            };



        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
       }
       // 地区分布图
       function initAreaBarChart(){
        var myChart = echarts.init(document.getElementById('area-barchart'));
          var option = {
            title: {
                text: '地区分布图',
                textStyle:{
                    color:'#333',
                    fontWeight:'normal',
                    fontSize:16
                }
            },
            color: ['#4eb2e6'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                }, 
                textStyle:{fontSize:12}
            },
            xAxis: [{
             
                splitLine:'false',
                axisLine:{
                    lineStyle:{
                        color:'#999'
                    }
                }, 
                axisLabel:{
                    interval:0,
                    rotate:-30,
                    textStyle:{
                        color:'#333',
                        fontSize:11
                    
                     }
                },  
                  axisTick:{
                        show:false
                    },   
                type : 'category',
                data : ['河南','河北','北京','天津','山东','山西','黑龙江','吉林','辽宁','浙江','江苏','上海','安徽','江西','湖南','湖北','新疆','云南','贵州','福建']
            }],
            yAxis: [ {
                        type : 'value',
                       splitLine:{
                            lineStyle:{
                                color: ['#f0f0f0'],
                                width: 1,
                                type: 'solid'
                             }
                            },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333',
                                fontSize:11
                            
                            }
                        }

                    }]
                ,
            series: [{
                name: '',
                type: 'bar',
                 barWidth: '20',
                data:[1000, 980, 860, 760, 630, 570, 430,320,210,100,96,86,75,63,55,45,36,27,16]
            }]
        };

             myChart.setOption(option);
       }
       // 学校分布图 环形图
       function initSchoolPieChart(){
         var myChart = echarts.init(document.getElementById('school-piechart'));
          var option = {
                title: {
                    text: '学校分布图',
                    textStyle:{
                    color:'#333',
                    fontWeight:'normal',
                    fontSize:16
                    }
                },
                color:["#59c6ff","#ff8080","#5bd7e8","#fff176","#5ed4c9","#ffb471",'#e49ffa'],       
                tooltip: {
                    bottom:'20px',
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                     textStyle:{fontSize:12}
                },
                legend: {
                    itemWidth:12,
                    itemHeight:7,
                    top:40,
                    orient: 'vertical',
                    x: 'right',
                    align:'left',
                    data:['985','211','一本','二本','三本','高职','其他']
                },
                series: [
                    {
                        name:'学校分布',
                        type:'pie',
                        radius: ['55%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                           
                            {value:310, name:'985'},
                            {value:234, name:'211'},
                            {value:135, name:'一本'},
                            {value:148, name:'二本'},
                            {value:335, name:'三本'},
                            {value:148, name:'高职'},
                            {value:148, name:'其他'}
                        ]
                    }
                ]
            };



             myChart.setOption(option);
       }
            // 学校分布图
       function initSchoolBarChart(){
          var myChart = echarts.init(document.getElementById('school-barchart'));
          var option = {
            // title: {
            //     text: '学校分布图'
            // },
            color: ['#4eb2e6'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                },
                 textStyle:{fontSize:12}
            },
            xAxis: [{
               
                axisLine:{
                lineStyle:{
                        color:'#999'
                    }
                }, 
                axisLabel:{
                    interval:0,
                    rotate:-30,
                    textStyle:{
                        color:'#333',
                        fontSize:11
                    
                    }
                    },
                  axisTick:{
                        show:false
                    },          
                splitLine:'false',
                type : 'category',
                data : ['清华大学 ','北京大学 ','华北电力大学 ','北京交通大学 ','北京理工大学 ','天津工业大学 ','天津科技大学 ','天津大学 ','燕山大学 ','河北大学 ','华北理工大学 ','河北工程大学','山西大学','太原科技大学','中北大学','南昌大学','华东交通大学','东华理工大学','云南大学','昆明理工大学']
            }],
            yAxis: [ {
                        type : 'value',
                       splitLine:{
                            lineStyle:{
                                color: ['#f0f0f0'],
                                width: 1,
                                type: 'solid'
                             }
                            },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333',
                                fontSize:11
                            
                            }
                        }

                    }]
                ,
            series: [{
                name: '',
                type: 'bar',
                barWidth: '20',
                data:[1000, 980, 860, 760, 630, 570, 430,320,210,100,96,86,75,63,55,45,36,27,16]
            }]
        };

             myChart.setOption(option);
       }
        // 专业分布图
       function initMajorBarChart(){
        var myChart = echarts.init(document.getElementById('major-barchart'));
          var option = {
            title: {
                text: '专业分布图',
                textStyle:{
                color:'#333',
                fontWeight:'normal',
                fontSize:16
            }},
            color: ['#4eb2e6'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                },
                 textStyle:{fontSize:12}
            },
            xAxis: [{
           
                axisLine:{
                lineStyle:{
                        color:'#999'
                    }
                }, 
                axisTick:{
                    show:false
                },
                axisLabel:{
                    interval:0,
                    rotate:-30,
                    textStyle:{
                        color:'#333',
                        fontSize:11
                    
                    }
                },        
                splitLine:'false',
                type : 'category',
                data : ['水利','装备制造','生物与化工','轻工纺织','食品药品与粮食','交通运输','电子信息','医药卫生','财经商贸','旅游','文化艺术','新闻传播','教育与体育','公安与司法','公共管理与服务','军事学','农学','医学','管理学','艺术学'
]
            }],
            yAxis: [ {
                        type : 'value',
                       splitLine:{
                            lineStyle:{
                                color: ['#f0f0f0'],
                                width: 1,
                                type: 'solid'
                             }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#999'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#333',
                                fontSize:11
                            
                            }
                        }

                    }]
                ,
            series: [{
                name: '',
                type: 'bar',
                barWidth: '20',
                data:[1000, 980, 860, 760, 630, 570, 430,320,210,100,96,86,75,63,55,45,36,27,16]
            }]
        };

             myChart.setOption(option);
       }
       // 学历分布图 环形图
       function initEduPieChart(){
         var myChart = echarts.init(document.getElementById('education-piechart'));
          var option = {
              title: {
                text: '学历分布图',
                textStyle:{
                    color:'#333',
                    fontWeight:'normal',
                    fontSize:16
                }
                },
                tooltip: {

                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                     textStyle:{fontSize:12}
                },
                legend: {
                      itemWidth:12,
                     itemHeight:7,
                    top:'40',
                    bottom:'30',
                    orient: 'vertical',
                     x: 'right',
                     align:'left',
                    data:['专科','本科','硕士','博士','其他']
                },
                series: [
                    {
                        name:'学历分布',
                        type:'pie',
                        radius: ['55%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false
                              
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                           
                            {value:310, name:'专科',itemStyle:{normal:{color:'#59c6ff'}}},
                            {value:234, name:'本科',itemStyle:{normal:{color:'#ff8080'}}},
                            {value:135, name:'硕士',itemStyle:{normal:{color:'#5bd7e8'}}},
                            {value:148, name:'博士',itemStyle:{normal:{color:'#fff176'}}},
                            {value:148, name:'其他',itemStyle:{normal:{color:'#5ed4c9'}}}
                        ]
                    }
                ]
            };



             myChart.setOption(option);
       }
       // sex-piechart
       // 性别分布图 环形图
       function initSexPieChart(){
         var myChart = echarts.init(document.getElementById('sex-piechart'));
          var option = {
              title: {
                text: '性别分布图',
                textStyle:{
                    color:'#333',
                    fontWeight:'normal',
                    fontSize:16
                }
                },
                tooltip: {

                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                     textStyle:{fontSize:12}
                },
                legend: {
                    itemWidth:12,
                    itemHeight:7,
                    top:40,
                    orient: 'vertical',
                    x: 'right',
                    align:'left',
                    data:['男性','女性']
                },
                series: [
                    {
                        name:'性别分布',
                        type:'pie',
                        radius: ['55%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false
                            
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'男性',itemStyle:{normal:{color:'#59c6ff'}}},
                            {value:310, name:'女性',itemStyle:{normal:{color:'#ff8080'}}}
                           
                        ]
                    }
                ]
            };



             myChart.setOption(option);
       }