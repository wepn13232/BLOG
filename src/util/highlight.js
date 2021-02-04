// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow.css'; // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件

let Highlight = {};
// 自定义插件
Highlight.install = function (Vue) {
	// 自定义指令 v-highlight
	Vue.directive('highlight', {
		// 被绑定元素插入父节点时调用
		inserted: function (el) {
			let blocks = el.querySelectorAll('pre code');
			for (let i = 0; i < blocks.length; i++) {
				Hljs.highlightBlock(blocks[i]);
				blocks[i].parentNode.style.backgroundColor = '#fffae7';//获取到pre节点的父节点，修改背景颜色
			}
		},
		// 指令所在组件的 VNode 及其子 VNode 全部更新后调用
		componentUpdated: function (el) {
			let blocks = el.querySelectorAll('pre code');
			for (let i = 0; i < blocks.length; i++) {
				Hljs.highlightBlock(blocks[i]);
				blocks[i].parentNode.style.backgroundColor = '#fffae7';//获取到pre节点的父节点，修改背景颜色
			}
		}
	})
};

export default Highlight;
