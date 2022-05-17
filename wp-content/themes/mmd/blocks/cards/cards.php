<?php
$backgroundColor = 'white';
if (isset($attributes['backgroundColor'])) {
  $backgroundColor = $attributes['backgroundColor'];
}
?>
<div class="page-section page-section--no-padding page-section--<?php echo $backgroundColor; ?>">
  <div class="wrapper wrapper--wrapper--no-padding-til-medium">
    <div class="row">
      <?php echo $content; ?>
    </div>
  </div>
</div>