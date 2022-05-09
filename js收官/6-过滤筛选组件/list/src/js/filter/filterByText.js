function filterByText (filterText, arr) {
    // 'btn mBtn'
    if (!filterText) {
        return arr;
    }else {
        return arr.filter(function (ele, index) {
            return ele.name.indexOf(filterText) != -1;
        });
    }
}