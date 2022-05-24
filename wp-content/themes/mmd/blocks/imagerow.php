<?php
$layout = '';
if (isset($attributes['layout'])) {
  $layout = $attributes['layout'];
}
?>
<div class="image-flexbox <?php echo $layout; ?>">
  <?php echo $content; ?>
</div>