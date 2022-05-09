$.fn.extend({
  page: function (option) {
    // currentPage 当前页
    // totalPage 总页数
    // position left center right
    // callBack: 翻页之后要执行的函数
    new Page(option, this).init();
  }
})

function Page(option, wrap) {
  this.wrap = wrap;
  this.currentPage = option.currentPage || 1;
  this.totalPage = option.totalPage || 1;
  this.position = option.position || 'left';
  if (typeof option.callBack === 'function') {
    this.callBack = option.callBack;
  } else {
    this.callBack = function () { }
  }
}

Page.prototype.init = function () {
  // 初始化结构
  this.initElement();
  // 绑定事件
  this.bindEvent();
}

Page.prototype.initElement = function () {
  // 里面的内容置空
  this.wrap.html('');
  var pWrap = $('<div></div>')
    .addClass('pagination-wrap')
    .css({
      textAlign: this.position
    });

  this.pagination = $('<ul></ul>').addClass('pagination');
  pWrap
    .append(this.pagination)
    .appendTo(this.wrap);
  this.renderByCurrentPage()
}

Page.prototype.renderByCurrentPage = function () {
  var pagination = this.pagination;
  var currentPage = this.currentPage;
  var totalPage = this.totalPage;
  // jquery对象
  pagination.html('');
  pagination.append($('<li class="prev-btn">&lt;</li>'));
  if (totalPage <= 7) {
    for (var i = 1; i <= totalPage; i++) {
      pagination.append($('<li></li>').text(i).attr('title', i))
    }
  } else {
    if (currentPage <= 4) {
      for (var i = 1; i <= 6; i++) {
        $('<li></li>')
          .text(i)
          .attr('title', i)
          .appendTo(pagination)
      }
    }
    if (currentPage > 4) {
      // 1, ...
      pagination
        .append($('<li>1</li>'))
        .append($('<li>...</li>').addClass('less-than'))
    }
    if (currentPage > 4 && currentPage <= totalPage - 4) {
      for (var i = 1; i <= 5; i++) {
        $('<li></li>')
          .text(currentPage - 3 + i)
          .attr('title', currentPage - 3 + i)
          .appendTo(pagination)
      }
    }
    if (currentPage <= totalPage - 4) {
      pagination
        .append($('<li>...</li>').addClass('more-than'))
        .append($(`<li>${totalPage}</li>`))

    }
    // (totalPage-6+1)， totalPage-6+2, ...totalPage-6+6
    if (currentPage > totalPage - 4) {
      for (var i = 1; i <= 6; i++) {
        $('<li></li>')
          .text(totalPage - 6 + i)
          .attr('title', totalPage - 6 + i)
          .appendTo(pagination)
      }
    }
  }

  pagination.append($('<li class="next-btn">&gt;</li>'));
  // pagination.appendTo($('.pagination-wrap'));

  // 当前页的类名
  this.pagination.find(`li[title=${currentPage}]`).addClass('currentPage');
  // 执行回调函数
  this.callBack(this.currentPage);
}

Page.prototype.bindEvent = function () {
  var self = this;
  this.pagination.on('click', 'li', function (e) {
    var target = $(e.target);
    //  < -1 上一页
    if (target.hasClass('prev-btn')) {
      if (self.currentPage === 1) {
        window.alert('这已经是第一页了')
      } else {
        self.currentPage--;
        // currentPage 重新渲染
        self.renderByCurrentPage();
      }
    } else if (target.hasClass('next-btn')) {
      //  > +1 下一页
      if (self.currentPage === self.totalPage) {
        window.alert('这已经是最后一页了')
      } else {
        self.currentPage++;
        // currentPage 重新渲染
        self.renderByCurrentPage();
      }
    } else if (target.hasClass('less-than')) {
      //  ... less-than  -5
      if (self.currentPage > 5) {
        self.currentPage -= 5;
      } else {
        self.currentPage = 1;
      }
      // currentPage 重新渲染
      self.renderByCurrentPage();
    } else if (target.hasClass('more-than')) {
      //  ... more-than  +5
      if (self.currentPage + 5 <= self.totalPage) {
        self.currentPage += 5;
      } else {
        self.currentPage = self.totalPage;
      }
      self.renderByCurrentPage();
    } else {
      var nowPage = parseInt(target.text());
      // 优化
      if (nowPage === self.currentPage) {
        return;
      }
      self.currentPage = nowPage;
      self.renderByCurrentPage();
      // 根据currentPage重新渲染
    }
    //  点谁跳谁
  })


}