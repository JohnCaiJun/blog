require('shelljs/global');

try {
	hexo.on('deployBefore', function() {//当deploy完成前执行mv操作
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
	echo("======================Auto MOVE Media Begin===========================");
	cd('/Users/caijun/hexo/blog');    //此处修改为Hexo根目录路径
	if (exec('cp -r ./source/media .').code !== 0) {
		echo('move media failure');
		exit(1);
	}else{
        echo('move success');
    }
		echo("==================Auto MOVE Media Complete============================")
}
