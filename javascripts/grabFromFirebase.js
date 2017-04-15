var db = firebase.database()

function grabFromFirebase(){
  var count = 0; //Count variable to keep track of new rows
  var query = db.ref("Users").orderByKey();
  query.once("value").then(function(snapshot) {
    var grid = ""; //Generate HTML string for the grid to be inserted
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.toJSON(); //Convert to serializable JSON

      //Get all of the data for the specific key
      var bio = key.Bio;
      var city = key.City;
      var email = key.Email;
      var firstName = key.FirstName;
      var lastName = key.LastName;
      //console.log(lastName); //For Testing

      if(count == 0){ //New row
        var HTMLstring = "<div class='row'><a href='mailto:" + email + "?Subject=Mploy%20Inquiry' target='_top'><div class='col-md-2 candidate'> <h3>" + firstName + " " + lastName + "</h3><h4>" + city + "</h4><p>" + bio + "</p><p><strong>Contact:  </strong>" + email + "</p></div></a>";
        //document.getElementById('candidatesGrid').innerHTML += HTMLstring;
        grid += HTMLstring;
        console.log(grid);
        count++;
      }
      else if(count == 4){ //End of Row
        var HTMLstring = "<a href='mailto:" + email + "?Subject=Mploy%20Inquiry' target='_top'><div class='col-md-2 candidate'><h3>" + firstName + " " + lastName + "</h3><h4>" + city + "</h4><p>" + bio + "</p><p><strong>Contact:  </strong>" + email + "</p></div></div></a>";
        //document.getElementById('candidatesGrid').innerHTML += HTMLstring;
        grid += HTMLstring;
        console.log(grid);
        count = 0;
      }
      else{ //Meat of a row
        var HTMLstring = "<a href='mailto:" + email + "?Subject=Mploy%20Inquiry' target='_top'><div class='col-md-2 candidate'> <h3>" + firstName + " " + lastName + "</h3> <h4>" + city + "</h4><p>" + bio + "</p><p><strong>Contact:  </strong>" + email + "</p></div></a>";
        //document.getElementById('candidatesGrid').innerHTML += HTMLstring;
        grid += HTMLstring;
        console.log(grid);
        count++;
      }
    });
    document.getElementById('candidatesGrid').innerHTML = grid; //Set innerHTML of candidatesGrid to grid after all data has been loaded
  });
};

$(document).ready(function(){
   console.log('document ready...');
   grabFromFirebase();
});
