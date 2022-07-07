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
<input type="hidden" class="hdn-header-image" data-url="<?php echo $imgURL ?>" data-urlx2="<?php echo $imgURLx2 ?>" data-alt="<?php echo $imgAlt ?>" data-class="<?php echo $class; ?>" />