// menu 
$('#menu-icon, #menu-icon-close').on('click', function() {
	$('#nav-pullout').toggleClass('open');
	$('#menu-items').toggleClass('open');
	$('.menu-bar').toggleClass('open');
	$('#nav-footer').toggleClass('open');
	$('#content-pullout').toggleClass('content-pullout');
	$('#content-overlay').toggleClass('display');
	$('#breadcrumbs').toggleClass('push');
	return false;
});

$('#content-overlay').on('click', function() {
	$('#nav-pullout').removeClass('open');
	$('#menu-items').removeClass('open');
	$('.menu-bar').removeClass('open');
	$('#nav-footer').removeClass('open');
	$('#content-pullout').removeClass('content-pullout');
	$('#content-overlay').removeClass('display');
	$('#breadcrumbs').removeClass('push');
	return false;
});

// categories
$('a[data-show-tag]').on('click', function() {
	var tag = $(this).attr('data-show-tag');

	if (tag && tag != '') {
		$('#project-list *[data-tag]').removeClass('clear').not('[data-tag~="' + tag + '"]').addClass('hide-tag');
		$('#project-list *[data-tag]').not('.hide-tag').eq(':nth-child(3n+1)').addClass('clear');
		$('#project-list *[data-tag~="' + tag + '"]').removeClass('hide-tag');
	}

	return false;
});


// Scroll to change header
var sectionTops = {}, headerOffset = 0;
$(window).on('resize', function() {
	headerOffset = $('#header').height();

	$('[data-scroll-section]').each(function() { // [] CSS
		sectionTops[ $(this).attr('data-scroll-section') ] = $(this).offset().top + $(this).height();
	});

}).on('scroll', function() {
	var scrollTop = $(this).scrollTop();
	if (scrollTop < 0) scrollTop = 0; // counter apple's negative scroll
	
	if (scrollTop + headerOffset <= 80) {
		$('#breadcrumbs').removeClass('bottom');
		$('#brand').removeClass('down');
		$.each(sectionTops, function(title,top) {
			console.log(title,scrollTop,top)
			if (scrollTop + headerOffset <= top) {
			$('#breadcrumbs h1').html(title)
			return false;
			}
		});
	}
	else {
		$('#breadcrumbs').addClass('bottom');
		$('#brand').addClass('down');
		$.each(sectionTops, function(title,top) {
			console.log(title,scrollTop,top)
			if (scrollTop + headerOffset <= top) {
			$('#breadcrumbs.bottom h1').html(title)
			return false;
			}
		});
	}


});

$(window).trigger('resize').trigger('scroll');

// back to top
$('#back-to-top').on('click', function() {
	// alert('t')
	$('body,html').animate({'scrollTop' : 0}, 10);
	return false;
});

// fade on each page
 $(window).on('beforeunload', function() {
    $('body').addClass('unload');
    return;
});

// remove fade when page is loaded
$(document).ready(function() {
	$('body').removeClass('unload')
});