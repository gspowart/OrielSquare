<?php

/**
 * @package WordPress
 * @subpackage Default_Theme
 */
get_header();
?>

<?php get_template_part('partials/content', 'inner-header', array(
    'title_field' => '404_page_title',
    'header_image_field' => '404_header_image',
    'mobile_header_image_field' => '404_mobile_header_image',
    'global' => 'option'
)); ?>

<div class="page-section">
    <div class="wrapper wrapper--narrow">
        <div class="row row--gutters content-container content-container--text">
            <div class="row__large-1 row__b-margin-until-medium">
                <p>Sorry we couldn't find that page</p>
                <a href="<?php echo site_url(); ?>" class="mmd-btn">return to homepage</a>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>