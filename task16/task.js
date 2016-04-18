/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
//trim函数
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
var aqiData = {};
var aqiCity = document.getElementById("aqi-city-input")
var aqiValue = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var name = aqiCity.value.trim();
    var value = aqiValue.value.trim();

    if(!name.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!value.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[name] = value;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        item += "<tr><td>"+city + "</td><td>" + aqiData[city] +"</td><td><button>删除</button></td>";
    }
    document.getElementById("aqi-table").innerHTML = city ?item :"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr = target.parentElement.parentElement;
    var strCity = tr.children[0].innerHTML;//找到当前按钮所在的行中城市信息
    delete aqiData[strCity];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
//    var x=document.getElementById("add-btn");
//    x.onclick = function()
//    {
//        addBtnHandle();
//    };
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var y = document.getElementById("aqi-table");

    y.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {//事件代理
            delBtnHandle(e.target);
        }
    })
}

init();