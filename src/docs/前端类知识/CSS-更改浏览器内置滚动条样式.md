# CSS-更改浏览器内置滚动条样式

滚动条的样式一般都是随着浏览器而生成的，不同的浏览器可以产生不同的滚动条样式
不过前端可以修改滚动条的样式


滚动条的样式类：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/1416330/1604477254489-cbdfe0a7-f9c1-4f1c-a1de-29421baa5caa.png#align=left&display=inline&height=257&margin=%5Bobject%20Object%5D&name=image.png&originHeight=443&originWidth=700&size=225294&status=done&style=none&width=406)
滚动条的样式调整：
```
1. ::-webkit-scrollbar                滚动条整体部分
2. ::-webkit-scrollbar-thumb          滚动条里面的小方块，能向上向下移动（或向左向右移动）
3. ::-webkit-scrollbar-track          滚动条的轨道（里面装有Thumb）
4. ::-webkit-scrollbar-button         滚动条的轨道的两端按钮，由于通过点击微调小方块的位置。
5. ::-webkit-scrollbar-track-piece    内层轨道，滚动条中间部分
6. ::-webkit-scrollbar-corner         边角，即垂直滚动条和水平滚动条相交的地方
7. ::-webkit-resizer                  两个滚动条的交汇处上用于拖动调整元素大小的小控件
```


> 一般在内容区域使用，如.content::-webkit-scrollbar即可

