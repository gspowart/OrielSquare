<?php
$imgURL = '';
if (isset($attributes['imgURL'])) {
  $imgURL = $attributes['imgURL'];
}
$imgURLx2 = '';
if (isset($attributes['imgURLx2'])) {
  $imgURLx2 = $attributes['imgURLx2'];
}
$imgAlt = '';
if (isset($attributes['imgAlt'])) {
  $imgAlt = $attributes['imgAlt'];
}
$class = '';
if (isset($attributes['class'])) {
  $class = $attributes['class'];
}
?>
<picture class="<?php echo $class; ?>">
  <source srcset="<?php echo $imgURL ?>" media="(min-width: 1380px)">
  <img srcset="<?php echo $imgURL ?> 640w, <?php echo $imgURLx2 ?> 1280w" alt="<?php echo $imgAlt ?>">
</picture>