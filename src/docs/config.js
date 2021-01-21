import category from "@/docs/category";

const commonFunc = {
	//获取当前目录下所拥有的文件
	getFiles(cateName) {
		const files = require.context('./', false, /\.md$/);
		return files.keys()
	},
	//获取文件夹（即目录）
	getCategory() {
		return category;
	},
	//获取md文件组件
	getComponent(fileName) {
		const components = require(`./${fileName}.md`);
		return components.default || components
	}
}

export default commonFunc;
