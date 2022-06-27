<?php
$title = 'WHAT OUR CLIENTS LIKE ABOUT US';
if (isset($attributes['title'])) {
  $title = $attributes['title'];
}
?>


<div class="page-section page-section--aqua page-section--padding-medium">
  <div class="wrapper wrapper--narrow">
    <h2 class="headline headline--white headline--centre headline--h2 headline--uppercase"><?php echo $title; ?></h2>
    <div class="glide glide-testimonial">
      <div class="glide__arrows" data-glide-el="controls">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="&lt;">prev</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir="&gt;">prev</button>

      </div>
      <div class="glide__track" data-glide-el="track">
        <div class="glide__slides">
          <?php echo $content; ?>
        </div>
      </div>
    </div>
    <p class="t-centre"><a class="btn btn--default" href="<?php the_permalink(697); ?>">View all case studies</a></p>
  </div>
</div>