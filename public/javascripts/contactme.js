
  $("form.contactForm").submit(function(e) {
    e.preventDefault();
   
    var jsonEmail = '[{"name":"'+ document.getElementById('contactName').value +'","email": "'+ document.getElementById('contactName').value +'","subject": "'+ document.getElementById('contactSubject').value +'","message": "'+ document.getElementById('contactMsg').value +'"}]';
 
  console.log(jsonEmail);
  
    $.ajax({
      url: "/contactme",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({mail: jsonEmail}),
	    type: "post", // if you want to send data via the "data" property change this to "POST". This can be omitted otherwise
      success: function(responseData) {
      },
      error: console.error
    });
    window.location = "/thankyou";
  });