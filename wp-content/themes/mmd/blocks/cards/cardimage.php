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
$url = null;
if (isset($attributes['linkObject']) && isset($attributes['linkObject']['url'])) {
  $url = $attributes['linkObject']['url'];
}
?>

<div class="os-card__image">
  <?php if (isset($url)) { ?><a href="<?php echo $url; ?>" target="_blank"> <?php } ?>
    <img srcset="<?php echo $imageURL; ?> 1x, <?php echo $imageURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" />
    <?php if (isset($url)) { ?></a> <?php } ?>
</div>