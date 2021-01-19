const commonFunc = {
	//获取当前目录下所有的文件
	getFiles() {
		const files = require.context('./', false, /\.md$/);
		return files.keys()
	},
	getComponent(fileName) {
		const components = require(`./${fileName}.md`);
		return components.default || components
	}
}

export default commonFunc;
