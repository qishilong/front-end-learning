(function ($, player) {
	function MusicPlayer(dom) {
		this.wrap = dom;	//播放器的容器（用于加载listControl模块）
		this.dataList = [];	//存储请求到的数据

		this.now = 0;	//歌曲的索引
		this.rotateTimer = null;	//旋转唱片的定时器
	}
	MusicPlayer.prototype = {
		init() {	//初始化
			this.getDom();	//获取元素
			this.getData('../mock/data.json');	//请求数据
		},
		getDom() {	//获取页面里的元素
			this.record = document.querySelector('.songImg img');	//旋转图片
			this.controlBtns = document.querySelectorAll('.control li');	//底部导航里的按钮
		},
		getData(url) {
			var This = this;

			$.ajax({
				url: url,
				method: 'get',
				success: function (data) {
					This.dataList = data;	//存储请求过来的数据
					This.loadMusic(This.now);	//加载音乐 
					This.musicControl();	//添加音乐操作功能
				},
				error: function () {
					console.log('数据请求失败');
				}
			});
		},
		loadMusic(index) {	//加载音乐
			player.render(this.dataList[index]);	//渲染图片，歌曲信息...
			player.music.load(this.dataList[index].audioSrc);

			//播放音乐（只有音乐的状态为play的时候才能播放）
			if (player.music.status == 'play') {
				player.music.play();
				this.controlBtns[2].className = 'playing';	//按钮状态变成播放状态
				this.imgRotate(0);	//旋转图片
			}
		},
		musicControl() {	//控制音乐（上一首、下一首。。。）
			var This = this;
			//上一首
			this.controlBtns[1].addEventListener('touchend', function () {
				player.music.status = 'play';

				//This.now--;
				This.loadMusic(--This.now);
			});

			//播放、暂停
			this.controlBtns[2].addEventListener('touchend', function () {
				if (player.music.status == 'play') {	//歌曲的状态为播放，点击后要暂停
					player.music.pause();	//歌曲暂停
					this.className = '';	//按钮变成暂停状态
					This.imgStop();			//停止旋转图片
				} else {//歌曲的状态为暂停，点击后要播放
					player.music.play();	//歌曲播放
					this.className = 'playing';	//按钮变成播放状态

					//第二次播放的时候需要加上上一次旋转的角度。但是第一次的时候这个角度是没有的，取不到。所以做了一个容错处理
					var deg=This.record.dataset.rotate || 0;
					This.imgRotate(deg);	//旋转图片
				}
			});


			//下一首
			this.controlBtns[3].addEventListener('touchend', function () {
				player.music.status = 'play';

				//This.now--;
				This.loadMusic(++This.now);
			});
		},
		imgRotate(deg) {	//旋转唱片
			var This = this;

			clearInterval(this.rotateTimer);

			this.rotateTimer = setInterval(function () {
				deg = +deg + 0.2;	//前面的加号是把字符串转数字

				This.record.style.transform = 'rotate(' + deg + 'deg)';
				This.record.dataset.rotate=deg;	//把旋转的角度存到标签身上，为了暂停后继续播放能取到
			}, 1000 / 60);
		},
		imgStop(){	//停止图片旋转
			clearInterval(this.rotateTimer);
		}
	}

	var musicPlayer = new MusicPlayer(document.getElementById('wrap'));
	musicPlayer.init();

})(window.Zepto, window.player);