<?php
$logoURL = get_theme_file_uri('/dist/assets/images/logos/oriel-square-logo.svg');
$content = str_replace('srcset', 'data-srcset', $content);

/*
$dom = new DOMDocument;
libxml_use_internal_errors(true);
$dom->loadHTML($content);
libxml_clear_errors();
$pictures = $dom->getElementsByTagName('picture');
$id = rand(0, $pictures->length);
echo $dom->saveHtml($pictures[$id]); 
*/
?>
<div class="page-header page-header--homepage page-header--no-padding page-header--white">
  <?php echo $content; ?>
  <div class="page-header__content page-header__content--home">
    <div class="wrapper">
      <div class="page-header__logo page-header__logo--home"><img src="<?php echo $logoURL ?>" alt="Oriel Square Logo"></div>
    </div>
  </div>
</div>