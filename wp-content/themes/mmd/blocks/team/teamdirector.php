<?php
$imgURL = get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg');
if (isset($attributes['imgURL'])) {
  $imgURL = $attributes['imgURL'];
}
$imgURLx2 = get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg');
if (isset($attributes['imgURLx2'])) {
  $imgURLx2 = $attributes['imgURLx2'];
}
$name = 'Name';
if (isset($attributes['name'])) {
  $name = $attributes['name'];
}
$position = 'Position';
if (isset($attributes['position'])) {
  $position = $attributes['position'];
}
$bio = 'Biography';
if (isset($attributes['bio'])) {
  $bio = $attributes['bio'];
}
$linkedin = '<a href="https://www.linkedin.com">#LinkedIn</a>';
if (isset($attributes['linkedin'])) {
  $linkedin = $attributes['linkedin'];
}

?>

<div class="team__profile">
  <div class="team__photo"><img srcset="<?php echo $imgURL; ?> 2x, <?php echo $imgURLx2; ?> 1x" alt="#" /></div>
  <div class="team__details content-area">
    <div class="team__name"><?php echo $name; ?></div>
    <div class="team__position"><?php echo $position; ?></div>
    <?php if ($linkedin) { ?>
      <div class="team__contact">
        <span class="linkedin"><?php echo $linkedin; ?></span>
      </div>
    <?php } ?>
  </div>
  <div class="team__bio">
    <p><?php echo $bio; ?></p>
  </div>
</div>