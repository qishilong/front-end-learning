function filterBySex (sexStr, arr) {
    if (sexStr == 'a') {
        return arr;
    }else {
        return arr.filter(function (ele, index) {
            if (sexStr.indexOf(ele.sex) != -1) {
                return true;
            }
        })
    }
};