<!DOCTYPE html>
<html>
<head>
  <title>Andrew Leedham's Portfolio</title>
  <link rel="stylesheet" type="text/css" href="css/styles.min.css">
  <link href="http://fonts.googleapis.com/css?family=Teko|Noto+Sans" rel="stylesheet" type="text/css">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
</head>
<body>
  <?php
  if(!empty($_POST)){
    $p = $_POST;
    if(isset($p["name"]) and !empty($p["name"]) and isset($p["email"]) and !empty($p["email"]) and isset($p["subject"]) and !empty($p["subject"]) and isset($p["message"]) and !empty($p["message"])){
      $name = $p["name"];
      $email = $p["email"];
      $subject = $p["subject"];
      $message = $p["message"];
      if(filter_var($email, FILTER_VALIDATE_EMAIL)){
        if(!mail("AndrewLeedham@Outlook.com", $subject, $message."\n\n Website email from ".$name, "From: ".$email)){
          echo "<div class='error'><p>Oops something went wrong sending that email!</p></div>";
        }
      }else{
        echo "<div class='error'><p>Your email address is invalid!</p></div>";
      }
    }else{
      echo "<div class='error'><p>You didn't fill in the email form fully!</p></div>";
    }
  }
  ?>
  <aside class="left">
    <i data-href="https://www.facebook.com/andy.j.leedham" id="fb" class="fa fa-2x fa-facebook"></i>
    <i data-href="https://twitter.com/AndrewJLeedham" id="tw" class="fa fa-2x fa-twitter"></i>
    <i data-href="http://www.instagram.com/andrew_leedham/" id="ig" class="fa fa-2x fa-instagram"></i>
    <i data-href="http://andrew-leedham.tumblr.com/" id="tb" class="fa fa-2x fa-tumblr"></i>
    <i data-href="mailto:AndrewLeedham@Outlook.com" id="em" class="fa fa-2x fa-envelope"></i>
    <i id="all" class="fa fa-2x fa-share-alt"></i>
  </aside>
  <aside class="right">
    <i id="top" class="fa fa-3x fa-angle-up"></i>
  </aside>
  <nav id="mainNav" class="band">
    <section>
      <div class="sixteen columns">
        <ul>
          <li>
            <img id="logo" src="img/logo.png"/>
          </li>
          <li>About me</li>
          <li>Projects</li>
          <li>Tumblr</li>
          <li>Contact</li>
        </ul>
      </div>
    </section>
  </nav>
  <div id="aboutme" class="band">
    <section>
      <h2 class="sixteen columns">About me</h2>
      <div class="eight columns">
        <p>
          Hi, my name is Andrew Leedham. I grew up in Nottingham United Kingdom and studied A-Level Computing, Maths and Photography. I'm currently a student at Hull University studying Computer Science.
        </p>
        <br/>
        <p>
          I am also an amateur Photographer, I enjoy landscape photography(mainly sunsets), as well as macro photography. I upload most of my Photography to <a href="http://andrew-leedham.tumblr.com/">Tumblr</a>.
        </p>
        <br/>
      </div>
      <div class="eight columns">
        <p>
          I love exploring new fields in Computing, I find them all fascinating. I've found that Web Design is the most rewarding and intriguing topic, I've designed a lot of websites in my time, including this one, most of my other projects aren't live, since I tend to develop websites for fun and to learn with no intended purpose. I did an internship at <a href="http://riverdeneconsulting.com/" target="_blank">Riverdene Consulting</a> in 2012, where I produced a digital sign in system for the office, so they could pull stats from the employees punctuality.
        </p>
        <br/>
      </div>
      <div class="one-third column image">
        <img src="img/me.png"/>
      </div>
      <div class="two-thirds column image">
        <img src="img/hull.png"/>
      </div>
    </section>
  </div>
  <div id="projects" class="band">
    <section>
      <h2 class="sixteen columns">Projects</h2>
      <div id="slider" class="flexslider sixteen columns">
        <ul class="slides">
          <li>
            <img src="img/projects/alwd.png"/>
            <div class="desc">
              <h3>Andrew Leedham Web Design - Website</h3>
              <p>
                This website was built to advertise a service for my web design company. My intention was to make a friendly colourful website, that provided relevant yet easy to read content. This was my first responsive website using Skeleton Boilerplate, the first of many... <div class="group link"><a class="btn" href="" target="_blank">Not Live...</a><i class="fa fa-link"></i></div>
              </p>
            </div>
          </li>
          <li>
            <img src="img/projects/rab.png"/>
            <div class="desc">
              <h3>Rabsport Engineering - Website</h3>
              <p>
                This website was built to show customers update photos of their projects. My intention was to build a robust modern website, that shows the companies persona as well as its colour scheme. I also built a PHP based gallery system for ease of use, so my client can easily add new photos and projects. <div class="group link"><a class="btn" href="" target="_blank">Coming soon...</a><i class="fa fa-link"></i></div>
              </p>
            </div>
          </li>
          <li>
            <img src="img/projects/vrm.png"/>
            <div class="desc">
              <h3>Velocity: Racing Manager - Website</h3>
              <p>
                This website is currently in development, and is being built to house a predictor game. The intention is to create a very clean, modern and unique website that fits with the games colour scheme. I am the lead/only designer and I also dabble in some back-end, for example the sign-in/sign-up system. <div class="group link"><a class="btn" href="https://www.facebook.com/formulaigame" target="_blank">Coming soon...</a><i class="fa fa-link"></i></div>
              </p>
            </div>
          </li>
          <li>
            <img src="img/projects/pht.png"/>
            <div class="desc">
              <h3>Andrew Leedham's Photography - Website</h3>
              <p>
                This website was built to archive all my A-Level photography shoots, however since finishing A-levels I decided to keep adding to it. My intention was to use Gaussian blur somehow, so I played with various designs and came up with this transparent overlay feel. I feel the website is very unique and displays my photography beautiful. However I have since converted to archiving my images on Tumblr, for ease of use and sharing options.<div class="group link"><a class="btn" href="" target="_blank">Not live...</a><i class="fa fa-link"></i></div>
              </p>
            </div>
          </li>
          <li>
            <img src="img/projects/blog.png"/>
            <div class="desc">
              <h3>Andrew Leedham's Blog - Website</h3>
              <p>
                This website was built using wordpress to archive my discovries and life events that I feel need sharing. It was my first published wordpress site, and consisted of a custom made theme, and some of my own photography. I was going for a simplistic design, with minimal content. However I have since converted to using Tumblr, for ease of use and sharing options.<div class="group link"><a class="btn" href="" target="_blank">Not live...</a><i class="fa fa-link"></i></div>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div id="carousel" class="flexslider sixteen columns">
        <ul class="slides">
          <li>
            <img src="img/projects/alwd.png"/>
          </li>
          <li>
            <img src="img/projects/rab.png"/>
          </li>
          <li>
            <img src="img/projects/vrm.png"/>
          </li>
          <li>
            <img src="img/projects/pht.png"/>
          </li>
          <li>
            <img src="img/projects/blog.png"/>
          </li>
        </ul>
      </div>
    </section>
  </div>
  <div id="tumblr" class="band">
    <section>
      <h2 class="sixteen columns">Tumblr</h2>
  </div>
  <div id="contact" class="band">
    <section>
      <h2 class="sixteen columns">Contact</h2>
      <form method="post" action="">
        <div class="eight columns">
          <label for="name">Your name:</label><br/>
          <div class="group">
            <input id="name" name="name" type="text"/>
            <i class="fa fa-tag"></i>
          </div>
        </div>
        <div class="eight columns">
          <label for="email">Your email:</label><br/>
          <div class="group">
            <input id="email" name="email" type="text"/>
            <i class="fa fa-envelope"></i>
          </div>
        </div>
        <div class="sixteen columns">
          <label for="subject">Your subject:</label><br/>
          <div class="group">
            <input id="subject" name="subject" type="text"/>
            <i class="fa fa-pencil"></i>
          </div>
        </div>
        <div class="sixteen columns">
          <label for="message">Your message:</label><br/>
          <textarea id="message" name="message" rows="5"></textarea>
        </div>
        <div id="send" class="sixteen columns">
          <div class="group">
            <input type="submit" value="Send"/>
            <i class="fa fa-send"></i>
          </div>
        </div>
      </form>
      <div class="sixteen columns">
        <ul>
          <li><i data-href="https://www.facebook.com/andy.j.leedham" id="fb" class="social fa fa-facebook"></i></li><!--
         --><li><i data-href="https://twitter.com/AndrewJLeedham" id="tw" class="social fa fa-twitter"></i></li><!--
         --><li><i data-href="http://instagram.com/andyjleedham" id="ig" class="social fa fa-instagram"></i></li><!--
         --><li><i data-href="http://andrew-leedham.tumblr.com/" id="tb" class="social fa fa-tumblr"></i></li><!--
         --><li><i data-href="mailto:AndrewLeedham@Outlook.com" id="em" class="social fa fa-envelope"></i></li>
        </ul>
      </div>
    </section>
  </div>
  <footer>
    <p>&copy; Andrew Leedham 2014 &copy;</p>
  </footer>
  <div id="load" class="fullscreen">
    <i class="fa fa-5x fa-spin fa-cog"></i>
  </div>
  <script type="text/javascript" src="js/libs.js"></script>
  <script type="text/javascript" src="js/script.js"></script>
  <script type="text/javascript" src="js/tumblr.js"></script>
</body>
</html>
