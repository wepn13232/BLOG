const commonFunc = {
	//获取当前目录下所有的文件
	getFiles() {
		const files = require.context('./', false, /\.md$/);
		console.log(files.keys())
	}
}

export default commonFunc;
