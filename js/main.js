$(function(){
	/* BMW Credit*/

			$('#searchIcon').on('click',function(){
				$('.loaderContainer').show();
				var imgLoc = $('#insBMW').data('insrc');
				$("#insBMW").attr('src', imgLoc );
				$('.loaderContainer').hide();
				$('#insMsg').fadeIn();
			});

			$('#closeIns, .insContainer').on('click',function(){
				$('#insMsg').fadeOut();
			});
});