<?php
$facebookURL = '#';
if (isset($attributes['facebookURL'])) {
  $facebookURL = $attributes['facebookURL'];
}
$twitterURL = '#';
if (isset($attributes['twitterURL'])) {
  $twitterURL = $attributes['twitterURL'];
}
$linkedInURL = '#';
if (isset($attributes['linkedInURL'])) {
  $linkedInURL = $attributes['linkedInURL'];
}
?>

<header class="site-header">
  <div class="wrapper">
    <div class="site-header__menu-icon">
      <div class="site-header__menu-icon__middle"></div>
    </div>
    <div class="site-header__menu-content site-header__menu-content--fixed">
      <?php
      wp_nav_menu(array(
        'menu' => 'main-menu',
        'container' => 'nav',
        'container_class' => 'primary-nav'
      ));
      ?>

      <div class="site-header__social-links">
        <a href="<?php echo $linkedInURL; ?>" class="social-link"><img src="<?php echo get_theme_file_uri('/dist/assets/images/icons/LinkedIn.svg'); ?>" alt="LinkedIn" /></a><a href="<?php echo $twitterURL; ?>" class="social-link"><img src="<?php echo get_theme_file_uri('/dist/assets/images/icons/Twitter.svg'); ?>" alt="Twitter" /></a><a href="<?php echo $facebookURL; ?>" class="social-link"><img src="<?php echo get_theme_file_uri('/dist/assets/images/icons/Facebook.svg'); ?>" alt="Facebook" /></a>
      </div>
    </div>
  </div>
</header>