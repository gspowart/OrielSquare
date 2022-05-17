<?php
$colourTheme = 'os-card--grey';
if (isset($attributes['colourTheme'])) {
  $colourTheme = $attributes['colourTheme'];
}
?>
<div class="row__large-4 os-card <?php echo $colourTheme; ?>">
  <?php echo $content; ?>
</div>