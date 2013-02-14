;(function(window, $){
    "use strict";    
 
    // Check to see if our global is available as a member of window; if it is, our namespace root exists; if not, we'll create it.
    var react = window.react = (typeof window.react !== "undefined") ? window.react : {};
 
    (react.dataviz = function(){
        return{
            _init : function(){
               var ctx = document.getElementById("circle").getContext("2d");
               ctx.beginPath();
               ctx.arc(400, 150, 75, 0, Math.PI*2, true); 
               ctx.fillStyle = "#fe57a1";
               ctx.closePath();
               ctx.fill();
            }
        }
    }())._init();
}(window, jQuery));
