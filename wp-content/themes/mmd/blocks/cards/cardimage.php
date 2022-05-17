<?php

$defaultImage = get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg');
$imageURL = $defaultImage;
$imageURLx2 = $defaultImage;
$imgAlt = '#';
$defaultImage = get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg');
if (isset($attributes["imgURL"])) {
  $imageURL = $attributes["imgURL"];
}
if (isset($attributes["imgURLx2"])) {
  $imageURLx2 = $attributes["imgURLx2"];
}
if (isset($attributes["imgAlt"])) {
  $imgAlt = $attributes["imgAlt"];
}
?>

<div class="os-card__image">
  <img srcset="<?php echo $imageURL; ?> 1x, <?php echo $imageURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />
</div>