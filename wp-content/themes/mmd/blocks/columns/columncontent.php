<?php
$className = '';
if (isset($attributes['className'])) {
  $className = $attributes['className'];
}
$alignment = '';
if (isset($attributes['alignment'])) {
  $alignment = $attributes['alignment'];
}
$margin = '';
if (isset($attributes['margin'])) {
  $margin = $attributes['margin'];
}
$backgroundImage = '';
if (isset($attributes['backgroundImage'])) {
  $backgroundImage = $attributes['backgroundImage'];
}
$backgroundColor = '';
if (isset($attributes['backgroundColor'])) {
  $backgroundColor = $attributes['backgroundColor'];
}
$foregroundContent = '';
if (isset($attributes['foregroundContent'])) {
  $foregroundContent = $attributes['foregroundContent'];
}
$imgID = null;
if (isset($attributes['imgID'])) {
  $imgID = $attributes['imgID'];
}
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

?>
<div class="<?php echo $className; ?> content-area <?php echo $backgroundColor; ?><?php echo $backgroundImage; ?> <?php echo $alignment; ?> <?php echo $margin; ?>">

  <?php if (!is_null($imgID)) { ?>
    <picture class="content-area__background-image">
      <source srcset="<?php echo $imgURL; ?>" media="(min-width: 1380px)" />
      <img srcset="<?php echo $imgURL; ?> 1172w, <?php echo $imgURLx2; ?>" 2344w`} alt="<?php echo $imgAlt; ?>" />
    </picture>
  <?php } ?>
  <div class="<?php echo $foregroundContent; ?>"><?php echo $content; ?></div>
</div>