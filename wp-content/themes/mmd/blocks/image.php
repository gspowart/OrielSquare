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
$layout = '#';
if (isset($attributes['layout'])) {
  $layout = $attributes['layout'];
}
if ($layout == "carousel") {
  echo '<div class="glide__slide">';
}
if (str_ends_with($imgURL, '.svg')) { ?>
  <img class="image-flexbox__image image-flexbox__image--grey" src="<?php echo $imgURL; ?>" alt="<?php echo $imgAlt; ?>" />
<?php } else { ?>
  <img class="image-flexbox__image image-flexbox__image--grey" srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />
<?php
}
if ($layout == "carousel") {
  echo '</div>';
}
?>