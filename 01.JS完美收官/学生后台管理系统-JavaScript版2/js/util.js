// 工具库，相关工具函数都放在这里

// 封装 DOM 查询函数

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}