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
$class = '';
if (isset($attributes['class'])) {
  $class = $attributes['class'];
}
$wrapperClassName = '';
if (isset($attributes['wrapperClassName'])) {
  $wrapperClassName = $attributes['wrapperClassName'];
}
$wrapperTag = 'span';
if (isset($attributes['wrapperTag'])) {
  $wrapperTag = $attributes['wrapperTag'];
}
$imgID = 0;
if (isset($attributes['imgID'])) {
  $imgID = $attributes['imgID'];
}
$image = wp_get_attachment_image_src($imgID, 'logo_1x');


echo '<' . $wrapperTag . ' class="' . $wrapperClassName . '">';
if (str_ends_with($imgURL, '.svg')) { ?>
  <img width="140" height="168" class="<?php echo $class; ?>" src="<?php echo $imgURL; ?>" alt="<?php echo $imgAlt; ?>" />
<?php } else { ?>
  <img width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" class="<?php echo $class; ?>" srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />
<?php
}
echo '</' . $wrapperTag . '>';
