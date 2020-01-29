let listArr = [
    {img:'./imgs/arr-demo1-1.png',sex:'女',name:'张三',description:'想想浪费的时间'},
    {img:'./imgs/arr-demo1-2.png',sex:'男',name:'李四',description:'这些年都做了啥'},
    {img:'./imgs/arr-demo1-3.png',sex:'女',name:'王五',description:'除了体重啥都没长'},
    {img:'./imgs/arr-demo1-4.png',sex:'男',name:'赵六',description:'你意识到了并决定改变'},
    {img:'./imgs/arr-demo1-5.png',sex:'男',name:'冯七',description:'坚持下来'},
    {img:'./imgs/arr-demo1-6.png',sex:'男',name:'冯巩',description:'就会不一样'}
];

// 初始变量
var oUl = document.getElementsByTagName('ul')[0];
var oInput =  document.getElementsByClassName('search')[0];
var searchText ='',    // 性别 和 关键字双层叠加过滤
    initSex = '不限';

// 数据渲染页面
function  renderPage(data){
    // 遍历数据
    var htmlStr = '';  //采用字符串拼接的方式
    oUl.innerHTML = '';
    data.forEach(function(ele,index,self){
        // console.log(ele);
        htmlStr += `
        <li>
            <img src="${ele.img}" alt="">
            <p class="name">${ele.name}</p>
            <p class="description">${ele.description}</p>
        </li>`
    });
    oUl.innerHTML = htmlStr;

}
renderPage(listArr);

// 添加行为：input 输入搜索
oInput.oninput = function(){   //oninput输入时触发
    //获取输入的文本内容 this.value-this是操作的input框
    // 通过文本进行数据的过滤
    // console.log(this.value);
    searchText = this.value;
    let filterListArr = filterArrByText(listArr,this.value);  //过滤数据
    let filterListArr2 = filterArrBySex(filterListArr,initSex)
    renderPage(filterListArr2); //更新视图
}
// 根据文本过滤数据的函数，纯函数
function filterArrByText(data,text){
    if(!text){  //等价于text == '' ，如果写if(text){}  text是''转布尔值为false
        // 如果text是''进入,返回原data,不做处理
        return data;
    }else{
        var newArr = data.filter(function(ele,index,self){  
            // text存在于ele.name里
            return ele.name.indexOf(text)>-1 || ele.description.indexOf(text)>-1;  //return true,这一项返回到新数组中进行返回
        })
        return newArr;  
        //  也可以写 return  data.filter(function(){});  直接返回filter过滤完返回的新数组
    }
}

//添加行为：切换按钮
let oBtnArr = document.getElementsByClassName('btn');
let lastActiveBtn = document.getElementsByClassName('active')[0];
[...oBtnArr].forEach(function(ele,index,self){
    // console.log(this);    forEach里的this如果没有第二个参数指定，this指向window  
    ele.onclick = function(){   //所以这里要用ele，不能用this
        // console.log(this);   这里this指向当前元素 ele
        changeActive(ele);
        // console.log(this.innerText);
        initSex = this.innerText;
        let newArr = filterArrBySex(listArr,this.innerText);
        let newArr2 = filterArrByText(newArr,searchText)
        
        renderPage(newArr2);
    }
});

function changeActive(curEle){
    curEle.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = curEle;
}
function filterArrBySex(data,sex){
    // debugger
    if(sex == '不限'){
        return data
    }else{
        return data.filter(function(ele,index,self){
                    return ele.sex == sex
                });
    }
}

// 条件增加导致行为增加该如何处理？
// redux状态管理思想：
// 迭代优化：随着过滤条件的增加，要处理的行为就会越多，要管理的状态也就越多。input时刻监听着事件，当事件发生后，根据事件改变的状态来相应的处理更新对应的视图；
// dom感受事件发生=> 更改状态 =>影响视图
// 随着需求的增加，事件越来越多，状态越来越多。由于目前编程这种环环相扣的形式，会变得特别冗长

// 我们可以设计一个东西来管理状态，合并行为
// step1:简单的管理状态,每次行为相应的改变state里的状态，然后根据状态去处理数据
// var state = {    //里面存着所有和视图有关的状态 -记录状态
//     text:'',
//     sex:''
// }
// 诸多状态如何管理？

