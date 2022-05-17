<?php
$gutters = '';
if (isset($attributes['gutters'])) {
  $gutters = $attributes['gutters'];
}
?>
<div class="row <?php echo $gutters; ?>">
  <?php echo $content; ?>
</div>