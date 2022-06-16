<?php
$layout = '';
if (isset($attributes['layout'])) {
  $layout = $attributes['layout'];
}

if ($layout == "carousel") { ?>

  <div class="glide-logos content-area--centre" data-transition-speed="7000">
    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides">
        <?php echo $content; ?>
      </div>
    </div>

  </div>
<?php } else { ?>
  <div class="image-flexbox <?php echo $layout; ?>">
    <?php echo $content; ?>
  </div>
<?php } ?>