<!DOCTYPE html>
<html>
  <head>
  <title>BLEM v2</title>
  <style>
    .indexiframe {
      filter:invert(100%) hue-rotate(0deg);
      position:fixed; 
      top:0; 
      left:0; 
      bottom:0; 
      right:0; 
      width:100%; 
      height:100%; 
      border:none; 
      margin:0; 
      padding:0; 
      overflow:hidden; 
      z-index:999999;
    }
  </style>
  </head>
  <body>
  <iframe 
    class="indexiframe"
    src="https://brady-lemaster.github.io/v2/page/unsdghome.html">
    Your browser doesn't support iframes
  </iframe>
  </body>
</html>