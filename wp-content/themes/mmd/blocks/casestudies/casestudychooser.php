<?php
$title = '';
if (isset($attributes['title'])) {
  $title = $attributes['title'];
}
$postID = 0;
if (isset($attributes['postID'])) {
  $postID = $attributes['postID'];
}
$csLayoutType = "list";
if (isset($attributes['csLayoutType'])) {
  $csLayoutType = $attributes['csLayoutType'];
}

//echo $postID . ' : ' . $title . '<br />';
if ($postID > 0) {
  $post = get_post($postID);

  setup_postdata($post);
  $blocks = parse_blocks($post->post_content);
  $categories = wp_get_post_terms($postID, 'case_study_category');
  $output = array_map(function ($object) {
    return $object->slug;
  }, $categories);
  $caseStudyCategories = implode('|', $output);

  foreach ($blocks as $block) {
    $block['attrs']['layoutType'] = $csLayoutType;
    $block['attrs']['categories'] = $caseStudyCategories;

    //echo '## block ##' . $csLayoutType;
    //print_r($block);

    echo render_block($block);
  }

  //  echo apply_filters('the_content', render_block($blocks));
  // print_r($blocks);
  //the_content();
  /*

  foreach ($blocks as $block) {
    print_r($block);
    echo render_block($block);
  }*/
}
