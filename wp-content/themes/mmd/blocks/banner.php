<?php
$logoURL = get_theme_file_uri('/dist/assets/images/logos/oriel-square-logo.svg');
?>
<div class="page-header">
  <div class="page-header__content">
    <div class="wrapper wrapper--grid">
      <div class="page-header__logo"><img width="200" height="239" src="<?php echo $logoURL ?>" alt="Oriel Square Logo" /></div>
      <div class="page-header__text">
        <?php echo $content; ?>
      </div>
    </div>
  </div>
</div>