window.onload = function(){
	$('#myTabs a').mouseover(function(e){
		e.preventDefault()
		$(this).tab('show')
	})

	$('#bottomBtn').on('click',function(){
		$(this).parent().parent().hide();
	})
}