	var $ = jQuery;

	function noShadow() {
		return navigator.userAgent.toLowerCase().indexOf('samsung gt-i9505') > -1;
	};

	function dialog(options) {
		var defaults = {
				type: 'confirm', // info, alert, confirm, custom, loading
				title: '',
				message: '',
				messageSize: '15px',
				okText: '确认',
				cancelText: '取消',
				mood: '', // positive会出现一个勾表示正确，negative会出现一个叉表示错误，主要用于非custom对话框
				iconW: '70px', // 通过这种方式来实现对话框文字的对齐方式
				align: "center", // 当有icon的时候，此属性居中是无效的，当没有icon的时候可以使用
				okCallback: function() {},
				cancelCallback: function() {},
				onload: function(dialog) {}, // 当类型为loading时有效
				appearTime:2000
			}
			//做一些清除工作
		if ($('.dialog-box').length) {
			$('#dialogStyle').remove();
			$('.dialog-mask').remove();
			$('.dialog-box').remove();
			clearTimeout(showtimeout);
			clearTimeout(hidetimeout);
		}


		var opts = $.extend({}, defaults, options);
		showtimeout = undefined;
		hidetimeout = undefined;

		var c = {
			ow: document.documentElement.clientWidth,
			oh: document.documentElement.clientHeight,
			fontSize: "14px",
			color: "#333",
			mask: $('<div class="dialog-mask"></div>'),
			dialogBox: $('<div class="dialog-box"></div>'),
			header: $('<div class="dialog-header"></div>'),
			body: $('<div class="dialog-body"></div>'),
			footer: $('<div class="dialog-footer"></div>'),
			okBtn: $('<div class="dialog-ok"></div>'),
			cancelBtn: $('<div class="dialog-cancel"></div>'),
			icon: $('<span class="' + (opts.mood === 'positive' ? 'dialog-icon icon-tk-tick' : (opts.mood === 'negative') ? 'dialog-icon icon-tk-X' : '') + '"></span>')

		}
		c.iw = c.ow * 0.8;
		c.ih = 350;
		c.maskCss = '.dialog-mask{position:fixed;top:0;left:0;width: 100%;height:' + c.oh + 'px;background-color: rgba(0,0,0,0.3);z-index: 999;}';
		c.dialogCss = '.dialog-box{opacity:0;position: fixed;left: ' + (c.ow * 0.5-60) + 'px;width:120px;border:2px solid #fff;z-index: 999;font-size:' + c.fontSize + ';color:' + c.color + ';background-color:#fbfbfb;' + (noShadow() ? '' : 'border-radius:6px;') + '}' +
			'.dialog-header{height: 50px; border-bottom:1px solid #4b4b4b;}' +
			'.dialog-body{padding:'+(window.innerWidth==640?'20px  16px':'10px  10px')+';font-size:' + opts.messageSize + ';}' +
			'.dialog-footer{overflow:hidden; border-top: 1px solid #eee;font-size:' + opts.messageSize + ';}' +
			'.dialog-ok{width: 50%;text-align: center;float: left;line-height: 222.22%;font-size:'+ opts.messageSize +'}' +
			'.dialog-cancel{width: 49%;border-left: 1px solid #eee;text-align: center;float: right;line-height: 222.22%;font-size:'+ opts.messageSize +'}' +
			'.dialog-box.hide{opacity:0; -webkit-transition: opacity 3s; transition: opacity 3s;}' +
			'.dialog-box.show{opacity:1; -webkit-transition: opacity 1s; transition: opacity 1s;}' +
			'.dialog-icon{font-size:30px; padding-right:20px; vertical-align:middle;display:table-cell;width:' + opts.iconW + ';text-align:right;color:#ddd;}' +
			'.dialog-message{display:table-cell;text-align:left;color:#fff}';

		// 1、填充内容
		c.header.html(opts.title);
		c.body.html(opts.message);
		c.okBtn.html(opts.okText);
		c.cancelBtn.html(opts.cancelText);


		// 提供需要放开给外部调用的方法
		var publicFuncs = {};
		publicFuncs.show = function() {
			if (opts.type == 'info') {
				$('.dialog-box').removeClass('hide').addClass('show');
				showtimeout = setTimeout(publicFuncs.hide, opts.appearTime);
			} else if (opts.type == 'loading') {
				$('.dialog-box').removeClass('hide').addClass('show');
			} else {
				$('.dialog-mask').show();
				$('.dialog-box').removeClass('hide').addClass('show');
				$('.dialog-mask').on({
					'mousewheel': preventDft,
					'touchstart': preventDft
				});
			}
		}
		publicFuncs.hide = function() {
			if (opts.type == 'info') {
				$('.dialog-box').removeClass('show').addClass('hide');
				hidetimeout = setTimeout(function() {
					$('#dialogStyle').remove();
					$('.dialog-mask').remove();
					$('.dialog-box').remove();
				}, 3000);
			} else {
				$('#dialogStyle').remove();
				$('.dialog-mask').remove();
				$('.dialog-box').remove();
			}
		}

		// 2、根据不同的类型对dialog做变化
		switch (opts.type) {
			case "confirm":
				dealBody();
				adapterOutline({
					body: c.body,
					footer: c.footer,
					okBtn: c.okBtn,
					cancelBtn: c.cancelBtn
				});
				break;

			case "info":
				dealBody();
				adapterOutline({
					body: c.body
				});
				c.mask = $('<div></div>');
				c.dialogBox.css({
					'background-color': 'rgba(0,0,0,0.6)',
					'color': '#fff',
					'border': 'none',
					'border-radius': '5px',
					'text-align': 'center'
				});
				break;

			case "alert":
				dealBody();
				adapterOutline({
					body: c.body,
					footer: c.footer,
					okBtn: c.okBtn
				});
				c.okBtn.css('width', '100%');
				break;

			case "custom":
				adapterOutline({
					header: c.header,
					body: c.body,
					footer: c.footer,
					okBtn: c.okBtn,
					cancelBtn: c.cancelBtn
				});
				break;

			case "loading":
				dealBody();
				// loading的主要作用是要能在加载完成后消失box并执行加载完成后的回调
				adapterOutline({
					body: c.body
				});
				// c.mask = $('<div></div>');
				c.dialogBox.css({
					'background-color': 'rgba(0,0,0,0.6)',
					'color': '#fff',
					'border': 'none',
					'border-radius': '5px',
					'text-align': 'center'
				});
				// c.dialogBox.find('.dialog-body').prepend('<img src="'+opts.loadingGif+'" />'); //暂不提供加载动画gif
				break;

			default:
				;
		}

		// 3、事件处理
		c.okBtn.click(function(event) {
			var stop = opts.okCallback();
			if(stop == 'stop'){
				return;
			}
			publicFuncs.hide();
		});
		c.cancelBtn.click(function(event) {
			opts.cancelCallback();
			if(stop == 'stop'){
				return;
			}
			publicFuncs.hide();
		});

		// 插入css
		$(document).find('head').append('<style id="dialogStyle"></style>');
		$('#dialogStyle').text(c.maskCss + c.dialogCss);

		// 4、对话框的显示,在显示之前把所有dialog都清掉
		$('body').append(c.mask).append(c.dialogBox);
		calHeight();

		publicFuncs.show();
		if (opts.type == 'loading') {
			opts.onload(publicFuncs);
		}


		// functions
		function adapterOutline(blocks) {
			if (blocks.header) {
				c.dialogBox.append(c.header);
			}
			if (blocks.body) {
				c.dialogBox.append(c.body);
			}
			if (blocks.okBtn) {
				c.footer.append(c.okBtn);
			}
			if (blocks.cancelBtn) {
				c.footer.append(c.cancelBtn);
			}
			if (blocks.footer) {
				c.dialogBox.append(c.footer);
			}
		}

		function calHeight() {
			var height = $('.dialog-box').height();
			var top = (c.oh - height) / 3;
			$('.dialog-box').css({
				top: top
			});
		}

		function preventDft(e) {
			e.preventDefault();
		}

		function dealBody() {
			c.body.html($('<span class="dialog-message">' + c.body.html() + '</span>')).prepend(c.icon);
			if (opts.align === "center" && opts.mood === '') {
				c.body.find('.dialog-message').css('display', 'inline-block');
			}
			c.body.css('text-align', opts.align);
		}
	}
      dialog.alert=function(m){
             dialog({
                 type:"alert",
                 message:m
             });
      }
      dialog.tip=function(m){
             dialog({
                 type: 'info',
                 align: 'center',
                 message: m
             });
      }