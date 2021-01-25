import category from "@/docs/category";

const commonFunc = {
	//获取当前目录下所拥有的文件
	getFiles() {
		const files = require.context('./', true, /\.md$/);
		return files;
	},
	//获取文件夹（即目录）
	getCategory() {
		return category;
	},
	//获取md文件组件
	getComponent(fileName) {
		const components = require(`${fileName}`);
		return components.default || components
	}
}

export default commonFunc;
