function loadDiv () {
  //querySelector grabs the first element it finds in the DOM that matches the given CSS-like selector
  //so we look for the first element with a class of section and get its inner HTML
  var element = document.querySelector(".section").innerHTML;
  //strip out newlines and trim the white space
  element = element.replace(/^\\n/g, "");
  element = element.trim();
  //then turn it into an array
  element = element.split(' ');                   
  
  //to be safely passed to our iterator, which we return
  return new Iterator(element);
}