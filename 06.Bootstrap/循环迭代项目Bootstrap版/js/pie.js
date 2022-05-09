(function () {
    var pie = {
        init() {
            this.getData();
            this.option = {
                title: {
                    text: '',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                legend: {
                    data: [],
                    orient: 'vertical',
                    left: 'left'
                },
                tooltip:{
                    
                },
                series: {
                    name: '',
                    type: 'pie',
                    data: [],
                    radius: "55%",
                    center: ['50%', '60%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,.5)'
                        }
                    }
                }
            }
        },
        getData() {
            var This = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
                success: function (res) {
                    //console.log(res);
                    var list = JSON.parse(res).data;

                    if (list.length > 0) {
                        This.areaChart(list);
                        This.sexChart(list);
                    } else {
                        alert('亲，没有数据哦~');
                    }
                }
            })
        },
        areaChart(data) {
            //
            var myChart = echarts.init(document.querySelector('.areaChart'));
            var legendData = [];
            var seriesData = [];

            /*
                [{"address":"上海","appkey":"kaivon_1574822824764","birth":1993,"ctime":1628857094,"email":"wang@qq.com","id":82615,"name":"小王","phone":"13333333333","sNo":"123345","sex":1,"utime":1628857094}]
                legendData:     ["上海","天津","北京"]
                seriesData：    [{name:'上海',value:3},...]

             */

            var newData = {};
            /* var obj={
                a:10,
                a:'k'
            }
            console.log(obj); */

            /*  newData={
                 "上海":3,
             } */

            data.forEach(function (item) {
                if (!newData[item.address]) {
                    newData[item.address] = 1;
                    legendData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            for (var prop in newData) {
                seriesData.push({
                    name: prop,
                    value: newData[prop]
                });
            }

            this.option.title.text = '渡一教育学生地区分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '地区分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        },
        sexChart(data) {
            var myChart = echarts.init(document.querySelector('.sexChart'));
            var legendData = ['男', '女'];


            var newData = {};

            data.forEach(function (item) {
                if (!newData[item.sex]) {
                    newData[item.sex] = 1;
                } else {
                    newData[item.sex]++;
                }
            });

            var seriesData = [
                { name: '男', value: newData[0] },
                { name: '女', value: newData[1] },
            ];

            this.option.title.text = '渡一教育性别分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        }
    }

    pie.init();
})();