
/*

You can copy and paste the below into your codebase somewhere.
As long as Raphael is a global object, it'll just work.

USAGE (same default values for optional parameters as Raphaël's "animate" method)
=====
element.animateAlong({
  path: REQUIRED - Path data string or path element,
  rotate: OPTIONAL - Boolean whether to rotate element with the direction it is moving
                     (this is a beta feature - currently kills existing transformations
                      and rotation may not be perfect),
  duration: OPTIONAL - Number in milliseconds,
  easing: OPTIONAL - String (see Raphaël's docs),
  debug: OPTIONAL - Boolean, when set to true, paints the animating path, which is
            helpful if it isn't already rendered to the screen
},
props - Object literal containing other properties to animate,
callback - Function where the "this" object refers to the element itself
);

EXAMPLE
======
var rect = paper.rect(0,0,50,50);
rect.animateAlong({
  path: "M71.5,675.5l43-22.5l44-20.5l44.5-23l45-21.5l44-18.5l44.5-15.5l43-15
  l46-17.5l43-17L512,488l44-15l44.5-18.5l43-16.5l44-20l43.5-15.5l46-19.5l43-17l45-14l43-18.5l46.5-16.5l43.5-18.5l43.5-17l43-17.5
  l43-17l45.5-14.5l43-7.5h19.5",
  rotate: true,
  duration: 5000,
  easing: 'ease-out',
  debug: true
},
{
  transform: 's0.25',
  opacity: 0
},
function() {
  alert("Our opacity is now:" + this.attr('opacity'));
});

*/

Raphael.el.animateAlong = function(params, props, callback) {
  var element = this,
    paper = element.paper,
    path = params.path,
    rotate = params.rotate,
    duration = params.duration,
    easing = params.easing,
    debug = params.debug,
    isElem = typeof path !== 'string';
  
  element.path = 
    isElem
      ? path
      : paper.path(path);
  element.pathLen = element.path.getTotalLength();
  element.rotateWith = rotate;
  
  element.path.attr({
    stroke: debug ? 'red' : isElem ? path.attr('stroke') : 'rgba(0,0,0,0)',
    'stroke-width': debug ? 2 : isElem ? path.attr('stroke-width') : 0
  });

  paper.customAttributes.along = function(v) {
    var point = this.path.getPointAtLength(v * this.pathLen),
      attrs = {
        x: point.x,
        y: point.y 
      };
    this.rotateWith && (attrs.transform = 'r'+point.alpha);
    // TODO: rotate along a path while also not messing
    //       up existing transformations
    
    return attrs;
  };

  if(props instanceof Function) {
    callback = props;
    props = null;
  }
  if(!props) {
    props = {
      along: 1
    };
  } else {
    props.along = 1;  
  }
  
  var startAlong = element.attr('along') || 0;
  
  element.attr({along: startAlong}).animate(props, duration, easing, function() {
    !isElem && element.path.remove();
    
    callback && callback.call(element);
  });
};
