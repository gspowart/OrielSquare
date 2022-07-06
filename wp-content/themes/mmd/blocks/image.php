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
$imgID = 0;
if (isset($attributes['imgID'])) {
  $imgID = $attributes['imgID'];
}
$image = wp_get_attachment_image_src($imgID, 'logo_1x');

if ($layout == "carousel") {
  echo '<div class="glide__slide">';
}
$url = null;
if (isset($attributes['linkObject']) && isset($attributes['linkObject']['url'])) {
  $url = $attributes['linkObject']['url'];
}
if (isset($url)) { ?><a href="<?php echo $url; ?>" target="_blank">
  <?php
}
if (str_ends_with($imgURL, '.svg')) { ?>
    <img width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" class="image-flexbox__image image-flexbox__image--grey" src="<?php echo $imgURL; ?>" alt="<?php echo $imgAlt; ?>" />
  <?php } else { ?>
    <img width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" class="image-flexbox__image image-flexbox__image--grey" srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />
  <?php
}
if (isset($url)) { ?></a>
<?php }
if ($layout == "carousel") {
  echo '</div>';
}
?>