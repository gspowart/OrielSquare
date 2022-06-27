<?php
$extract = '';
if (isset($attributes['extract'])) {
  $extract = $attributes['extract'];
}
$title = 'Case Study';
if (isset($attributes['title'])) {
  $title = $attributes['title'];
}
$imgURL = '#';
if (isset($attributes['imgURL'])) {
  $imgURL = $attributes['imgURL'];
}
$imgURLx2 = '#';
if (isset($attributes['imgURLx2'])) {
  $imgURLx2 = $attributes['imgURLx2'];
}
$imgAlt = '#';
if (isset($attributes['imgAlt'])) {
  $imgAlt = $attributes['imgAlt'];
}
$type = '';
if (isset($attributes['type'])) {
  $type = $attributes['type'];
}
$layoutType = 'list';
if (isset($attributes['layoutType'])) {
  $layoutType = $attributes['layoutType'];
}
$categories = '';
if (isset($attributes['categories'])) {
  $categories = $attributes['categories'];
}
if ($layoutType == "carousel") {
?>
  <div class="glide__slide">
    <div class="row row--gutters case-study-item">
      <div class="row__large-6 row--center-content-vertically content-area">
        <h3 class="headline headline--h3 headline--white"><?php echo $title; ?></h3>
        <p><?php echo $extract; ?></p>
        <a class="btn btn--default open-modal showCaseStudy" data-case-study-id="1" href="#">Read more</a>
        <div class="case-studies__details--popup-content glide__slide">
          <div class="row row--gutters">
            <div class="row__large-6 row--center-content-vertically content-area">
              <p class="headline headline--h4 headline--blue headline--uppercase headline--margin-b-mid"><?php echo $type; ?></p>
              <h3 class="headline headline--h3 headline--underline"><?php echo $title; ?></h3>
              <?php echo $content; ?>
            </div>
            <div class="row__large-6 row--center-content"><img srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" /></div>
          </div>
        </div>
      </div>
      <div class="row__large-6 row--center-content"><a href="#" class="open-modal showCaseStudy"><img srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" /></a></div>
    </div>
  </div>
<?php
} else {
?>
  <div class="case-studies__study case-study-item content-area" data-case-study-categories="<?php echo $categories; ?>">
    <div class="case-studies__image">
      <a href="#" class="open-modal showCaseStudy"><img srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" /></a>
    </div>
    <div class="case-studies__details">
      <h3 class="case-studies__title"><?php echo $title; ?></h3>
      <p><?php echo $extract; ?></p>
      <a class="btn btn--default open-modal showCaseStudy" data-case-study-id="1" href="#">Read more</a>
      <div class="case-studies__details--popup-content glide__slide">
        <div class="row row--gutters">
          <div class="row__large-6 row--center-content-vertically content-area">
            <p class="headline headline--h4 headline--blue headline--uppercase headline--margin-b-mid"><?php echo $type; ?></p>
            <h3 class="headline headline--h3 headline--underline"><?php echo $title; ?></h3>
            <?php echo $content; ?>
          </div>
          <div class="row__large-6 row--center-content"><img srcset="<?php echo $imgURL; ?> 1x, <?php echo $imgURLx2; ?> 2x" alt="<?php echo $imgAlt; ?>" /></div>
        </div>
      </div>

    </div>
  </div>
<?php
}
?>