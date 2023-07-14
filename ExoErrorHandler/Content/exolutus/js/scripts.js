$(function(){
	exo.init();
});
exo = {
	window:null,
	navScroll:null,
	init:function(){
		this.form();
		//this.login();
		this.nav.init();
		this.modal.init();
		this.loader.init();
		this.scrollbar.init();
		if($(window).outerWidth()>767){
			if(exo.conf.get() && exo.conf.get()==2){
				$('.side-section,.aside-overlay,.aside-toggle,.main-section').addClass('active');
				if ($('.side-section').hasClass('nav-desktop') && exo.navScroll) exo.navScroll.disable();
			}else{
			    $('.side-section,.aside-overlay,.aside-toggle,.main-section').removeClass('active');
				if(exo.navScroll)exo.navScroll.enable();
			}
		}
		if ($.fn.matchHeight !== 'undefined') {
		    try{
		        $('.dashboard .panel-body').matchHeight();
		    }
		    catch(err){

		    }
		}
	},
	conf:{
		get:function(){
			if(typeof(Storage) != 'undefined'){
				return localStorage.getItem('exo_nav');
			}
		},
		set:function(itm){
			if(itm){
				if(typeof(Storage) != 'undefined'){
					return localStorage.setItem('exo_nav',itm);
				}
			}
		},
		del:function(itm){
			if(itm){
				if(typeof(Storage) != 'undefined'){
					localStorage.removeItem(itm);
				}
			}
		}
	},
	nav:{
		init:function(){
			$('.aside-toggle').on('click',function(e){
				e.preventDefault();
				if($(this).hasClass('active')){
					exo.conf.set(1);
					$(this).removeClass('active');
					$('.side-section,.aside-overlay,.main-section').removeClass('active');
					if(exo.navScroll)exo.navScroll.enable();
				}else{
					exo.conf.set(2);
					$(this).addClass('active');
					$('.side-section,.aside-overlay,.main-seciton').addClass('active');
					if ($('.side-section').hasClass('nav-desktop') && exo.navScroll) exo.navScroll.disable();
				}
			});
			$('.aside-overlay').on('click',function(){
			    $('.aside-toggle,.side-section,.aside-overlay,.main-section').removeClass('active');
			});
			var check = function(){
				$('.main-section>.body').css('padding-bottom',$('body>.footer').outerHeight());
				if($(window).outerWidth()>767){
				    $('.side-section').removeClass('nav-mobile').addClass('nav-desktop');
				}else{
				    $('.side-section').removeClass('nav-desktop').addClass('nav-mobile');
				}
			}
			check();
			$(window).bind('resize',check);

			$('.side-section .nav li.has-child>a').on('click', function (e) {
				e.preventDefault();
				if ($(this).closest('.side-section').hasClass('active')) {
					return false;
				}
				if($(this).parent().hasClass('nav-active')){
					$(this).next().slideUp(200);
					$('.side-section .has-child').removeClass('nav-active');
				}else{
				    $('.side-section .has-child').removeClass('nav-active');
				    $('.side-section .nav-child').slideUp(200);
					$(this).parent().addClass('nav-active');
					$(this).next().slideDown(200);
				}
				setTimeout(function(){
					exo.navScroll.disable();
					exo.navScroll.enable();
				},300);
			});
			$('[data-toggle="new-window"]').on('click',function(){
				exo.window = window.open('','exo_window','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,fullscreen,width='+window.screen.width+',height='+window.screen.height+'', true)
				if(exo.window.location.href === 'about:blank'){
					exo.window.location.href = window.location.href;
					if(screen.availHeight && screen.availWidth){
						exo.window.resizeTo(screen.availWidth,screen.availHeight);
					}else{
						exo.window.resizeTo(screen.width,screen.height);
					}
					exo.window.moveTo(0,0);
					return exo.window;
				}else{
					exo.window.close();
				}
			});
			exo.nav.ellipsis('.nav-inner .nav-main');
		},
		ellipsis:function(nav){
			$(nav).each(function(){
				var navWidth, navItem, varWidth = 0, ctr, $menu = $(nav), $ellipsis;
				ctr = $menu.children().length;
				$menu.children().each(function(){
					varWidth += $(this).outerWidth();
				});

				checkInnerNav();
				$(window).resize(checkInnerNav);
				$('.aside-toggle').on('click',checkInnerNav);
				function checkInnerNav(){
					navWidth = $menu.width();
					navItem = Math.floor((navWidth / varWidth) * ctr) - 1;

					$menu.children().css({'display':'block','width':'auto'});
					$ellipsis = $menu.children(':gt('+navItem+')');
					$menu.next('.nav-more').find('.dropdown-menu').empty().append($ellipsis.clone());  
					$ellipsis.css({'display':'none','width':'0'});

					if($menu.next('.nav-more').find('.dropdown-menu').is(':empty')){
						$menu.next('.nav-more').hide();
					}else{
						$menu.next('.nav-more').show();
					}
				}
			});
		}
	},
	scrollbar:{
		init:function(){
			if($.fn.asScrollable != 'undefined'){
				try{
				var navHeight = function(){
					if($(window).outerHeight()>768){
					    $('.navi-wrap').height($(window).outerHeight() - ($('.side-section .header').outerHeight() + $('.footer').outerHeight()));
					}else{
					    $('.navi-wrap').height($(window).outerHeight() - $('.side-section .header').outerHeight());
					}
				}
				navHeight();
				exo.navScroll =  $('.navi-wrap').asScrollable({
						responsive:true,
						namespace: 'scrollable',
						skin: 'scrollable-inverse',
						direction: 'vertical',
						contentSelector: '>',
						containerSelector: '>',
					}).data('asScrollable');
				var checkMenu = function(){
				    if ($('.side-section').hasClass('active') && $('.side-section').hasClass('nav-desktop')) {
						exo.navScroll.disable();
					}else{
						exo.navScroll.disable();
						navHeight();
						exo.navScroll.enable();
					}
				}
				checkMenu();
				$(window).bind('resize',function(){
					checkMenu();
					navHeight();
				});
			}catch(err){}
			}
		},
		set:function(elem){
			if($.fn.asScrollable != 'undefined' && elem){
				$(elem).asScrollable({
					responsive:true,
					namespace: 'scrollable',
					skin: 'scrollable-inverse',
					direction: 'vertical',
					contentSelector: '>',
					containerSelector: '>',
				});
			}
		},
		del:function(elem){
			if($.fn.asScrollable != 'undefined' && elem){
				var getScroll = $(elem).data('asScrollable');
				if(getScroll){
					getScroll.destroy();
				}
			}
		}
	},
	form:function(){
		$('.form-control').each(function(){
			$(this).on('focus',function(){
				$(this).closest('.form-group').addClass('has-focus');
			}).on('blur',function(){
				$(this).closest('.form-group').removeClass('has-focus');
			});
		});
		$('.form-control-file').each(function(){
			$(this).find('input[type="file"]').on('change',function(e){
				$(this).closest('.form-control-file').find('input[type="text"]').val($(this).val());
				if($(this).val()){
					$(this).closest('.form-control-file').find('.has-del').show();
				}else{
					$(this).closest('.form-control-file').find('.has-del').hide();
				}
			});
			$(this).find('.has-del .btn').on('click',function(){
				$(this).closest('.form-control-file').find('input').val('');
				$(this).closest('.has-del').hide();
				if($(this).closest('.form-control-file').find('input[type="file"]').data('imgid')){
					$('img'+$(this).closest('.form-control-file').find('input[type="file"]').data('imgid')).removeAttr('src');
				}
			});
		});
	},
	modal:{
		init:function(){
			this.drag();
			$('.modal').each(function(){
				$this = $(this);
				$(this).on('hidden.bs.modal',function(e){
					$this.find('.modal-dialog').removeAttr('style');
				});
			});
		},
		drag:function(el){
			if(!el) el = '.modal-drag .modal-dialog';
			$(el).find('.modal-header').css('cursor','move');
			$(el).on('mousedown',function(e){
				var $this = $(this),
				$drag = $this.addClass('draggable'),
				z_idx = $drag.css('z-index'),
				drg_h = $drag.outerHeight(),
				drg_w = $drag.outerWidth(),
				pos_y = $drag.offset().top + drg_h - e.pageY,
				pos_x = $drag.offset().left + drg_w - e.pageX;
				$drag.css('z-index', 1000).parents().on('mousemove',function(e){
					var top = e.pageY + pos_y - drg_h,
					left = e.pageX + pos_x - drg_w,
					ch, cw;

					ch = $(window).innerHeight();
					cw = $(window).innerWidth();

					top = (top < 0) ? 0 : top;
					top = (top + drg_h > ch) ? ch - drg_h : top;

					left = (left < 0) ? 0 : left;
					left = (left + drg_w > cw) ? cw - drg_w : left;

					$('.draggable').offset({top:top,left:left}).on('mouseup',function(){
						$(this).removeClass('draggable').css('z-index', z_idx);
					});
				});
				$this.find('.close,.modal-body,.modal-footer,.form-control').on('mousemove mousedown',function(e){ e.stopPropagation(); });
				e.preventDefault();
			}).on('mouseup',function(){ $(this).removeClass('draggable'); });
			$(window).bind('resize',function(){
				$(el).removeAttr('style');
				if($(window).outerWidth()<1024){
					$(el).addClass('no-drag');
				}else{
					$(el).removeClass('no-drag');
				}
			});
		}
	},
	loader:{
		init:function(){
			$(window).bind('load',exo.loader.hide);
		},
		show:function(t){
			$('.loader-wrap').fadeIn(t?t:200);
		},
		hide:function(t){
			$('.loader-wrap').fadeOut(t?t:200);
		}
	}
}