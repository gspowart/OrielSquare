<?php
$size = 'normal';
if (isset($attributes['size'])) {
  $size = $attributes['size'];
}
$colorName = 'default';
if (isset($attributes['colorName'])) {
  $colorName = $attributes['colorName'];
}
$colorName = 'default';
if (isset($attributes['colorName'])) {
  $colorName = $attributes['colorName'];
}
$text = 'Click here';
if (isset($attributes['text'])) {
  $text = $attributes['text'];
}
$url = '#';
if (isset($attributes['linkObject']) && isset($attributes['linkObject']['url'])) {
  $url = $attributes['linkObject']['url'];
}

?>
<a href="<?php echo $url; ?>" class="btn btn--<?php echo $size; ?> btn--<?php echo $colorName; ?>">
  <?php echo $text; ?>
</a>