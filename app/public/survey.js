$(document).ready(function() {
	function showAlert(msg) {
        $('span#alert-error-message').text(msg);
        $('div#alert-error').show();
    }

    function hideAlert() {
        $('div#alert-error').hide();
    }

	const validateForm = function(){
        let isValid = true;
        $('.validateForm').each(function() {
            if ($(this).val() === ''){
                isValid = false;
            }
        });
        return isValid;
    }
    $('button#close-alert-error').click(function(){
    	hideAlert();
    })

	$('button#submitFriendForm').click(function(event) {
		event.preventDefault();
		if(validateForm() === true){
			let newFriendInput = {
				name: $('input#name').val().trim(),
				photo: $('#uploadedImage').val().trim(),
				scores:[
					$('select#question1').val().trim(),
					$('select#question2').val().trim(),
					$('select#question3').val().trim(),
					$('select#question4').val().trim(),
					$('select#question5').val().trim(),
					$('select#question6').val().trim(),
					$('select#question7').val().trim(),
					$('select#question8').val().trim(),
					$('select#question9').val().trim(),
					$('select#question10').val().trim()
				]
			};

			$.post(
				'/api/friends', 
				newFriendInput
			).done(function(data) {
				$('#newFriendMatch').html(data.name);
		    	$("#newFriendImage").attr("src", data.photo);
				$('#modal-friend-match').modal('show');
			});
			//CLEAR FORM
			$('input#name').val('');
			$('#uploadedImage').val('');
			$('select#question1').val('');
			$('select#question2').val('');
			$('select#question3').val('');
			$('select#question4').val('');
			$('select#question5').val('');
			$('select#question6').val('');
			$('select#question7').val('');
			$('select#question8').val('');
			$('select#question9').val('');
			$('select#question10').val('');
		}
		else {
            showAlert("You must complete the form to find a freind!");
        }
	});
});