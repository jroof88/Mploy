console.log("Firebase Posting Script Connected");

var db = firebase.database();

function postToFirebase(){

    //Get values from Form
    var organization = document.getElementById("organization").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var jobDescription = document.getElementById("jobDescription").value;
    var duration = document.getElementById("duration").value;
    var compensation = document.getElementById("compensation").value;
    var location = document.getElementById("location").value;
    var email = document.getElementById("email").value;
    var phoneNo = document.getElementById("phoneNo").value;

    var latitude;
    var longitude;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var myResult = results[0].geometry.location;

          var loc=[]; // no need to define it in outer function now
          loc[0]=results[0].geometry.location.lat().toString();
          loc[1]=results[0].geometry.location.lng().toString();

          latitude = loc[0];
          longitude = loc[1];

          //Post data  Firebase --- use push() to increment inside the Jobs object
          db.ref("Jobs").push({
            "organization": organization,
            "jobTitle": jobTitle,
            "jobDescription": jobDescription,
            "duration": duration,
            "compensation": compensation,
            "latitude": latitude,
            "longitude": longitude,
            "location": location,
            "email": email,
            "phoneNo": phoneNo
          });

          alert("Thank you for your job posting!")
          window.location.reload();
      }

    });

    return false;
};

$(document).on('click','#submit',function() {
    postToFirebase();
});
