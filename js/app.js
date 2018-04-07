!function () {
  $.ajax({
  	//AJAX request; get 12 employee profiles in json
   	url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
  	success: function(data) {
    	let users = data.results;
    	let cards = `<ul id="users" style="list-style: none;">`;
    	// Iterate over all employee profiles
      let i = 0;
    	$.each(users, function( index, value ) {
    	 	//build cards displaying info for each stored in unique LIs
    		cards +=
         `<li class="card" id="${i++}">
    	 			<img class ="image" src="${users[index].picture.large}">
    	 			<div class="info">
      		 		<p class= "fullName proper-noun"><i>${users[index].name.first} ${users[index].name.last}</i></p>
      		 		<p ><i>${users[index].login.username}</i></p>
    		 			<p class="proper-noun">${users[index].location.city}, ${users[index].nat}</p>
    		 		</div>
    		 	</li>`;
    });
  	//close ul tag
  	cards += "</ul>";
  	//and dynamically add HTML to document
  	$("#profiles").html(cards);
    //build & append overlay to dim screen when modal is displayed
    const overlay = $('<div id="overlay">');
    $("body").append(overlay)
    //card click handler
    $('.card').on("click", function (e) {
     	//parse card's id from string to number
     	let thisCard =  parseInt($(this).attr('id'));
     	//build modal
     	function updateModal(cardToShow) {
     	$("#modal").html(
        `<div class="modal-image">
    		 		<img src="${users[cardToShow].picture.large}">
    		 </div>
    		 <div class = "modal-info">
    	 	    <p class="proper-noun fullName">${users[cardToShow].name.first}  ${users[cardToShow].name.last}</p>
            <p ><i>${users[cardToShow].login.username}</i></p>
    	 		  <p>${users[cardToShow].email}</p>
    	 		  <hr>
    	 		  <p>${users[cardToShow].phone}</p>
      	 		<div id="address">
      		 		<p class="proper-noun">${users[cardToShow].location.street}</p>
      		 	  <p class="proper-noun">${users[cardToShow].location.city}</p>
      		 		<p class="proper-noun">${users[cardToShow].location.state}</p>
      		 		<p>${users[cardToShow].location.postcode}</p>
      		 	</div>
      		 	<p>Birthday: ${users[cardToShow].dob}</p>
      		 	<div id="arrows">
      			  <a href="#" class="fa prev" id="prev" > <= </a>&nbsp&nbsp&nbsp
              <a href="#"  class="fa next" id="next"> => </a>
      			</div>
     			</div>`);
    	}
    	//build modal, display modal & overlay
    	updateModal(thisCard);
    	$("#modal").slideDown();
    	overlay.show();
    	//'next' button click handler
    	$("#modal").on('click', '#next', function () {
    		// As long as modal shown ISN'T 12/12
    		if  (thisCard !== users.length-1) {
    			// Add 1 to index value
    			thisCard ++;
    			updateModal(thisCard);
    		// If modal shown IS 12/12
    		} else {
    			// Reset index value to 0
    			thisCard = 0;
    			// Update Modal to show correct information
    			updateModal(thisCard);
    		}
    	});
    	//'prev' button click handler, works same way
    	$("#modal").on('click', '#prev', function () {
    		if (thisCard !== 0)	{
    			thisCard --;
    			updateModal(thisCard);
    		} else {
    			thisCard = users.length-1;
    			updateModal(thisCard)
    		}
    	});
    	//Same functionality for when left and right keys are pressed
     	$(document).keyup(function(e) {
     		if (e.keyCode == 39) {
    			if  (thisCard !== users.length-1) {
    				thisCard ++;
    				updateModal(thisCard);
    			} else {
    				thisCard = 0;
    				updateModal(thisCard);
    		  }
        }
        if (e.keyCode == 37) {
          if (thisCard !== 0)	{
            thisCard --;
            updateModal(thisCard);
          } else {
            thisCard = users.length-1;
            updateModal(thisCard)
          }
    		}
    	});
    });
    //closing modal methods
    const closeModal = function() {
      // Hide the overlay
      overlay.hide();
      // Hide the modal
      $("#modal").hide();
    }
    //when overlay is clicked
    overlay.click(function(){
      closeModal();
    });
    //when Escape key pressed
    $(document).keyup(function(e) {
         if (e.keyCode == 27) {
          closeModal();
         }
    });
    //search bar
    const search = function() {
      let filter = $('#searchBar').val().toLowerCase();
      let li = $("#profiles li");
       //loop through LIs, and hide non-matches
        for (i = 0; i < li.length; i++) {
            let seachItemsName = li[i].getElementsByTagName("i")[0];
            let seachItemsUser = li[i].getElementsByTagName("i")[1];
            if ((seachItemsName.innerHTML.toLowerCase().indexOf(filter) > -1) || (seachItemsUser.innerHTML.toLowerCase().indexOf(filter) > -1)) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    // Run search function on keyup of search bar input
    $('#searchBar').on('keyup', search);
    }
  });
}();
