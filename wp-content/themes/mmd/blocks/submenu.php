<?php
$menuTitle = '';
if (isset($attributes['menuTitle'])) {
  $menuTitle = $attributes['menuTitle'];
}
?>
<ul class="page-sub-menu">
  <li class="page-sub-menu__title"><?php echo $menuTitle; ?></li>
  <?php

  $pages = wp_list_pages(array(
    'child_of' => wp_get_post_parent_id(),
    'sort_column' => 'menu_order',
    'title_li' => '',
    'exclude' => get_the_ID()
  ));
  ?>
</ul>