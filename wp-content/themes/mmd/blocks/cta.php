<?php
$backgroundColor = 'cta--transparent';
if (isset($attributes['backgroundColor'])) {
  $backgroundColor = $attributes['backgroundColor'];
}
$title = '';
if (isset($attributes['title'])) {
  $title = $attributes['title'];
}
$textContent = '';
if (isset($attributes['content'])) {
  $textContent = $attributes['content'];
}
$layout = '';
if (isset($attributes['layout'])) {
  $layout = $attributes['layout'];
}
$headlineColor = 'headline--white';
if (isset($attributes['headlineColor'])) {
  $headlineColor = $attributes['headlineColor'];
}
?>
<div class="cta <?php echo $backgroundColor; ?> <?php echo $layout; ?>">
  <div class="cta__content">
    <h2 class="headline headline--h2 <?php echo $headlineColor; ?> headline--margin-b-sm"><?php echo $title; ?></h2>
    <p><?php echo $textContent; ?></h2>
  </div>
  <div class="cta__buttons">
    <?php echo $content; ?>
  </div>
</div>