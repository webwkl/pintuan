$(function(){
	$('.btn').on('click', function(event) {
		event.preventDefault();
		window.location.href = 'fightgroup.html'
	});
	$('.btn1').on('click', function(event) {
		event.preventDefault();
		window.location.href = 'record.html'
	});
	$('.rule').on('click',  function(event) {
		event.preventDefault();
		$('.none').show();
	});
	$('.close').on('click', function(event) {
    	event.preventDefault();
	    $('.none').hide();
	});
	
})
