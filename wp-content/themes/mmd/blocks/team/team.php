<?php
$text = 'Our Team';
if (isset($attributes['text'])) {
  $text = $attributes['text'];
}

?>
<div class="page-section page-section--aqua page-section--padding-medium">
  <div class="wrapper">
    <div class="team">
      <h2 class="headline--white headline--centre headline--h2 headline--uppercase headline--margin-b"><?php echo $text; ?></h2>
      <?php echo $content; ?>
    </div>
  </div>
</div>

<div class="modal">
  <div class="modal__inner">
    <div class="wrapper wrapper--modal">
      <div class="glide-team glide--border glide--grey-bg glide__modal">
        <div class="glide" data-transition-speed="-1">
          <div class="modal__close">X</div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left glide__arrow--green" data-glide-dir="&lt;">prev</button>
            <button class="glide__arrow glide__arrow--right glide__arrow--green" data-glide-dir="&gt;">next</button>
          </div>
          <div class="glide__track" data-glide-el="track">
            <div class="glide__slides" id="popupcontent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>