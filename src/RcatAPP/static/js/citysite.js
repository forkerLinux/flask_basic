var citydata = [
                    { name: "不限", cities: [] },
                    { name: "北京", cities: ["北京"] },
                    { name: "上海", cities: ["上海"] },
                    { name: "天津", cities: ["天津"] },
                    { name: "重庆", cities: ["重庆"] },
                    { name: "河北省", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
                    { name: "山西省", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
                    { name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
                    { name: "辽宁省", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
                    { name: "吉林省", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
                    { name: "黑龙江省", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
                    { name: "江苏省", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
                    { name: "浙江省", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
                    { name: "安徽省", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
                    { name: "福建省", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
                    { name: "江西省", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
                    { name: "山东省", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
                    { name: "河南省", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
                    { name: "湖北省", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
                    { name: "湖南省", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
                    { name: "广东省", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
                    { name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
                    { name: "海南省", cities: ["海口", "三亚", "洋浦市"] },
                    { name: "四川省", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
                    { name: "贵州省", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
                    { name: "云南省", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
                    { name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
                    { name: "陕西省", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
                    { name: "甘肃省", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
                    { name: "青海省", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
                    { name: "宁夏", cities: ["银川", "吴忠"] },
                    { name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
                    { name: "香港", cities: ["香港"] },
                    { name: "澳门", cities: ["澳门"] },
                    { name: "台湾", cities: ["台湾"] }
               ];

var citydata2 = [
                    { name: "北京", cities: ["东城区", "西城区", "海淀区", "朝阳区", "丰台区", "石景山区", "通州区", "顺义区", "房山区", "大兴区", "昌平区", "怀柔区", "平谷区", "门头沟区", "密云县", "延庆县"] },
                    { name: "上海", cities: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"] },
                    { name: "天津", cities: ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "滨海新区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "静海县", "宁河县", "蓟县"] },
                    { name: "重庆", cities: ["渝中区", "江北区", "南岸区", "沙坪坝区", "九龙坡区", "大渡口区", "渝北区", "巴南区", "北碚区", "万州区", "黔江区", "永川区", "涪陵区", "长寿区", "江津区", "合川区", "双桥区", "万盛区", "南川区", "荣昌县", "大足县", "壁山县", "铜梁县", "潼南县", "綦江县", "忠县", "开县", "云阳县", "梁平县", "垫江县", "丰都县", "奉节县", "巫山县", "巫溪县", "城口县", "武隆县", "北部新区", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"] },
                    { name: "河北省", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
                    { name: "山西省", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
                    { name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
                    { name: "辽宁省", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
                    { name: "吉林省", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
                    { name: "黑龙江省", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
                    { name: "江苏省", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
                    { name: "浙江省", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
                    { name: "安徽省", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
                    { name: "福建省", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
                    { name: "江西省", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
                    { name: "山东省", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
                    { name: "河南省", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
                    { name: "湖北省", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
                    { name: "湖南省", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
                    { name: "广东省", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
                    { name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
                    { name: "海南省", cities: ["海口", "三亚", "洋浦市"] },
                    { name: "四川省", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
                    { name: "贵州省", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
                    { name: "云南省", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
                    { name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
                    { name: "陕西省", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
                    { name: "甘肃省", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
                    { name: "青海省", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
                    { name: "宁夏", cities: ["银川", "吴忠"] },
                    { name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
                    { name: "香港", cities: ["香港"] },
                    { name: "澳门", cities: ["澳门"] },
                    { name: "台湾", cities: ["台湾"] }
               ];