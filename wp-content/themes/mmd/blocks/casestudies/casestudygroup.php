<?php
$className = '#';
if (isset($attributes['className'])) {
  $className = $attributes['className'];
}
$csLayoutType = 'list';
if (isset($attributes['csLayoutType'])) {
  $csLayoutType = $attributes['csLayoutType'];
}
if ($csLayoutType == "carousel") {
  echo $content;
} else {
?>

  <div class="<?php echo $className; ?>">
    <?php echo $content; ?>
  </div>

<?php } ?>