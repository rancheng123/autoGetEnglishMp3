var fs=require('fs');
var copy=function(src,dst){


    //创建文件夹（目录）   (异步)
   // fs.mkdirSync(dst+'/dist' + i);

    debugger
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function(path){
        var _src=src+'/'+path;
        var _dst=dst+'/'+path;
        fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性
            if(err)throw err;
            if(stats.isFile()){ //如果是个文件则拷贝
                let  readable=fs.createReadStream(_src);//创建读取流
                let  writable=fs.createWriteStream(_dst);//创建写入流
                readable.pipe(writable);
            }else if(stats.isDirectory()){ //是目录则 递归
                checkDirectory(_src,_dst,copy);
            }
        });
    });
}
var checkDirectory=function(src,dst,callback){

    //是否有权限（指定文件或目录）
    fs.access(
        //path
        dst,
        //指定要执行的可访问性检查(可选的值参阅文件可访问性的常量)
        fs.constants.F_OK,
        (err) => {

            if(err){
                fs.mkdirSync(dst);
                callback(src,dst);
            }else{
                callback(src,dst);
            }
        }
    );
};

var srcDir  = '/Users/deo/WebstormProjects/workPlace/businessDir/requestMp3/file';  //源目录
var distDir = '/Users/deo/WebstormProjects/workPlace/businessDir/requestMp3/dist'
checkDirectory(srcDir,distDir,copy);

