$(function() {

        var _this = this;
        var pic = "";

        $("#refreshLoc").unbind("click").bind("click", function(){
            doLocation();
            $("#gAddress").text("Updating location...");
        });

        function doLocation() {
            geoPosition.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
        }

        if(geoPosition.init()){  // Geolocation Initialisation
                doLocation();
                
            } else {
                    alert("Device doesn't support geolocation!");
                    window.location.href = "#";
            }

            // p : geolocation object
            function success_callback(p){
                $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+p.coords.latitude+","+p.coords.longitude+"&sensor=false", function(json) {
                    console.log(json);
                    $("#gAddress").text(json.results[0].formatted_address);
                    
                    $("#latitude").val(p.coords.latitude);
                    $("#longitude").val(p.coords.longitude);

                });
                $("#location-loading").slideUp();
                $("#survey-body").fadeIn();
                

                if (p.coords.accuracy >= 40) {
                        $("#accuracyWarn").removeClass('hide');
                        $("#accuracy").text(p.coords.accuracy);
                    } else {
                        $("#accuracyWarn").addClass('hide');
                    }
                console.log(p);
            }

            function error_callback(p){
                // p.message : error message
            }

            $("#takePictureField").on("change",gotPic);

            function gotPic(event) {
                var file = event.target.files[0];
                if(event.target.files.length == 1 && 
                event.target.files[0].type.indexOf("image/") == 0) {
                    $("#thepic").attr("src",URL.createObjectURL(event.target.files[0]));
                
                }
            }



            $("#saveSurveyBtn").unbind("click").bind("click", function() {
                var formData = new FormData($('form')[0]);

            $.ajax({
                    url: '/path/to/your/api',  
                    type: 'POST',
                    success: function(json){
                        alert("Collection saved!");
                        // re-render your template or something better here to clear it
                        window.location.reload();
                    },
                    error: function(err){
                        alert("error!: " + err);
                    },
                    // Form data
                    data: formData,
                    //Options to tell jQuery not to process data or worry about content-type.
                    cache: false,
                    contentType: false,
                    processData: false
                });
                
            });
         

  
});
