<?php
$width = 'wrapper wrapper--large';
if (isset($attributes['width'])) {
  $width = $attributes['width'];
}
$backgroundColor = 'white';
if (isset($attributes['backgroundColor'])) {
  $backgroundColor = $attributes['backgroundColor'];
}
$padding = 'page-section--padding-medium';
if (isset($attributes['padding'])) {
  $padding = $attributes['padding'];
}
?>
<div class="page-section page-section--<?php echo $backgroundColor; ?> <?php echo $padding; ?>">
  <div class="<?php echo $width; ?>">
    <?php echo $content; ?>
  </div>
</div>