
var fs = require("fs");
var path = require("path");
var request = require("request");

let paths = fs.readdirSync('/Users/deo/WebstormProjects/知识/JS/第三方工具/nodeJS学习/原生nodeJS/stream 流/requestMp3/file');


debugger
//var i = Number(paths[paths.length -1].replace('.mp3','').replace('out',''));

var page = Number(paths[paths.length -1].split('--')[0].replace('out',''));
var i =0



//删除文件  start
// var child_process = require('child_process');
// child_process.execSync('rm -rf file', {
//     cwd: '/Users/deo/WebstormProjects/workPlace/businessDir/requestMp3'
// });
//删除文件  end


//创建文件夹目录
var dirPath = path.join(__dirname, "file");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log("文件夹创建成功");
} else {
    console.log("文件夹已存在");
}






if (0) {


//new zealand  start
    var arr = []
    $('.c-play-controller__download').map((i, ele) => {


        arr.push(ele.querySelector('.menu-toggle').getAttribute('href'))

        return ele.querySelector('.menu-toggle').getAttribute('href');
    });

    console.log(JSON.stringify(arr))
//new zealand  start

}




debugger
//从页面获取的数据
var arr = ["https://podcast.radionz.co.nz/inst/inst-20170721-0810-insight_is_biking_the_new_golf-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170714-0810-insight_the_next_americas_cup_and_who_will_pay_for_it-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170707-0812-insight_climate_change_-_politics_and_actions-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170630-0812-insight_trade_deals_and_balancing_power-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170623-0812-insight_data_in_exchange_for_help-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170615-0812-insight_the_changing_face_of_sport_in_nz-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170609-0812-insight_schools_after_9_years_of_national_government-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170602-0812-insight_high_country_farming_-_a_dying_way_of_life-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170519-0812-insight_meth_-_the_human_cost_of_a_hit-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170512-0812-insight_on_a_bender_-_meth_use_out_of_control-128.mp3","https://podcast.radionz.co.nz/inst/inst-20170505-0812-insight_a_line_in_the_sand_for_freshwater_quality-128.mp3"]


loadMp3(arr)

function loadMp3(arr) {

    var res = arr.pop()
    if (res) {
        i++;
        let fileName = "out" + (page + 1) + '--' + intToString(i, 3) + ".mp3";
        var url = res

        let stream = fs.createWriteStream(path.join(dirPath, fileName));

        //事件
        stream.on('close', () => {
            console.log('close')
        })


        stream.on('data', (chunk) => {
            // chunk 数据块
            // 计算当前读取到的文件的大小，计算读取的顺序
            // chunk 是一个 buffer 对象
            // 每一次读取到了一点数据，将该数据的长度累加起来 / 文件的总大小 * 100 得到百分比
            // curSize += chunk.length
            // // 将已经读取到的字节数 / 总字节数 * 100 = 百分比
            // percent = (curSize / totalSize * 100).toFixed( 2 ) + '%'
            // console.log( '读取中' + percent )
            console.log('data')

        })


        stream.on('error', () => {
            console.log('error')
        })

        //被pipe 时
        stream.on('pipe', () => {
            console.log('pipe')
        })
        //当可继续写入数据时 触发。
        stream.on('drain', (a, b, c) => {

            console.log('drain')
        })
        stream.on('finish', () => {
            console.log('finish')
        })
        stream.on('unpipe', () => {
            console.log('unpipe')
        })


        var progress = require('progress-stream');
        var str = progress({
            time: 100 /* ms */
        });
        str.on('progress', function (progress) {
            console.log(progress.percentage);
        });


        var startTime = Date.now();
        request(url, {timeout: 11115500}, (error, response, body) => {

            console.log('responsed')
            console.log('res.statusCode:  ' + res.statusCode)
            if (res.statusCode == 200) {

            } else {

            }


        })
            .pipe(str)
            .pipe(stream)

            .on('data', function (data) {
                // decompressed data as it is received
                console.log('decoded chunk: ' + data)
            })
            .on('response', function (response) {
                console.log('结束')
            })
            .on('error', function (err) {
                console.log(err)
            })
            .on("close", function (err) {

                var endTime = Date.now();

                console.log("文件[" + fileName + "]下载完毕");
                console.log("下载时间： " + (endTime - startTime)/1000 + '秒' )

                loadMp3(arr)
            })

    }else{

        console.log('所有下载完毕');


    }
}



//整数转字符串，不足的位数用0补齐
function intToString(num, len) {
    let str = num.toString();
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

