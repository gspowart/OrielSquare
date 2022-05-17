<?php
$imgURL = '#';
if (isset($attributes['imgURL'])) {
  $imgURL = $attributes['imgURL'];
}
$imgURLx2 = '#';
if (isset($attributes['imgURLx2'])) {
  $imgURLx2 = $attributes['imgURLx2'];
}
$imgAlt = '#';
if (isset($attributes['imgAlt'])) {
  $imgAlt = $attributes['imgAlt'];
}

?>
<img class="image-flexbox__image image-flexbox__image--grey" srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />