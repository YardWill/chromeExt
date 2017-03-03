const code = `
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        // xhr.open("GET", options.url + "?" + params, true);
        xhr.open("GET", options.url, true);
        xhr.setRequestHeader("Accept", "version=1.1.0&device_key=11111&client_type=mobile_ios&client_os_version=10.0.1");
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();

ajax({
    url:'http://xyq.yananbdw.com/xyq_cbg_role_processor.php?action=guhao&url=http%3A%2F%2Fxyq.cbg.163.com%2Fcgi-bin%2Fequipquery.py%3Fact%3Doverall_search_show_detail%26serverid%3D795%26ordersn%3D1331_1486485936_1331270757%26equip_refer%3D1&callback=jQuery19107170023398749079_1488524961733&_=1488524961737',
    type:'GET',
},(res) => {
    console.log(res);
})
const a = document.querySelectorAll('#soldList tbody tr');
const arr = [];
const compareUrl = (alt1) => {
    let flag = 1;
    arr.forEach((e) => {
        if (e.alt === alt1) {
            flag = 0;
            return flag;
        }
    });
    return flag;
};

    a.forEach((e, i) => {
        if (i !== 0) {
            const alt = e.querySelector('td a').href;
            console.log(compareUrl(alt));
            if (compareUrl(alt)) {
                const money = e.querySelectorAll('td')[12].querySelector('span').innerHTML;
                arr.push({ key: i, alt, money });
            }
        }
    });
    console.log(arr);
    window.location.reload();
`;
chrome.tabs.executeScript(null, { code: code });

setInterval(() => {
    chrome.tabs.executeScript(null, { code: code });
}, 30 * 1000);
