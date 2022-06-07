<?php
$showFilter = false;
if (isset($attributes['showFilter'])) {
  $showFilter = $attributes['showFilter'];
}
?>

<div class="page-section page-section--aqua--large page-section--padding-medium">
  <div class="wrapper">
    <div class="case-studies">
      <?php if ($showFilter) { ?>
        <div class="blog__filter">
          Filter by Category
          <select id="caseStudyFilter">
            <option value="-1">-- Show all --</option>
            <?php
            $taxonomies = get_terms('case_study_category');
            foreach ($taxonomies as $category) {
              echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
            }
            ?>
          </select>
        </div>
      <?php }
      echo $content; ?>

    </div>
  </div>
</div>

<div class="modal">
  <div class="modal__inner">
    <div class="wrapper wrapper--modal">
      <div class="glide-case-studies glide--border glide--border glide--white-bg glide__modal">
        <div class="modal__close">X</div>
        <div class="glide" data-transition-speed="-1">
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left glide__arrow--green" data-glide-dir="&lt;">prev</button>
            <button class="glide__arrow glide__arrow--right glide__arrow--green" data-glide-dir="&gt;">next</button>
          </div>
          <div class="glide__track" data-glide-el="track">
            <div class="glide__slides" id="popupcontentCS"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>