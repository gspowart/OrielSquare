<?php

//Injects CSS & js without affecting admin panel styles
function scripts()
{
  wp_enqueue_script('main', get_theme_file_uri('/dist/main.js'), '', '1.26', true);
  wp_enqueue_script('main', get_theme_file_uri('/build/index.js'), array('jquery'), '1.26', true);
  wp_enqueue_style('main_css', get_theme_file_uri('/dist/style.css'), '', '0.24');
  wp_enqueue_style('google-font', '//fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
}
add_action('wp_enqueue_scripts', 'scripts');

/**
 * Registers an editor stylesheet for the current theme.
 *
 * @global WP_Post $post Global post object.
 */
function wpdocs_theme_add_editor_styles()
{
  global $post;

  $my_post_type = 'post';

  // New post (init hook).
  if (
    false !== stristr($_SERVER['REQUEST_URI'], 'post-new.php')
    && (isset($_GET['post_type']) === true && $my_post_type == $_GET['post_type'])
  ) {
    add_editor_style(get_stylesheet_directory_uri() . '/dist/editor-style-' . $my_post_type . '.css');
  }

  // Edit post (pre_get_posts hook).
  if (
    stristr($_SERVER['REQUEST_URI'], 'post.php') !== false
    && is_object($post)
    && $my_post_type == get_post_type($post->ID)
  ) {
    add_editor_style(get_stylesheet_directory_uri() . '/dist/editor-style-' . $my_post_type . '.css');
  }
}
add_action('init',          'wpdocs_theme_add_editor_styles');
add_action('pre_get_posts', 'wpdocs_theme_add_editor_styles');


function features()
{
  add_theme_support('menus');
  add_theme_support('post-thumbnails');
  add_theme_support('editor-styles');
  add_editor_style(array('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i', 'dist/style.css', 'dist/editor-style.css'));

  // Image resizing
  add_image_size('homepage_banner_1x', 1200, 650, true);
  add_image_size('homepage_banner_2x', 2400, 1300, true);
  add_image_size('team_director_1x', 220, 220, true);
  add_image_size('team_director_2x', 440, 440, true);
  add_image_size('team_member_1x', 190, 190, true);
  add_image_size('team_member_2x', 380, 380, true);
  add_image_size('card_image_1x', 140, 140, true);
  add_image_size('card_image_2x', 280, 280, true);
  add_image_size('logo_1x', 210, 80, false);
  add_image_size('logo_2x', 420, 160, false);
  add_image_size('large_logo_1x', 250, 90, false);
  add_image_size('large_logo_2x', 500, 180, false);
  add_image_size('backgroundImage', 1172, 640, false);
  add_image_size('backgroundImage_2x', 2344, 1280, false);
  add_image_size('caseStudyImage', 590, 394, false);
  add_image_size('caseStudyImage_2x', 1180, 788, false);
}
add_action('after_setup_theme', 'features');

function slug_post_type_template()
{
  $page_type_object = get_post_type_object('case-studies');
  $page_type_object->template = [
    ['blocktheme/casestudy'],
  ];
}
add_action('init', 'slug_post_type_template');

function wpdocs_allowed_post_type_blocks($allowed_block_types, $editor_context)
{
  if ('case-studies' === $editor_context->post->post_type) {
    return array(
      'blocktheme/casestudy',
    );
  }

  return $allowed_block_types;
}

add_filter('allowed_block_types_all', 'wpdocs_allowed_post_type_blocks', 10, 2);



add_filter('gform_pre_render', 'add_input_type_gravity_forms');

function add_input_type_gravity_forms($form)
{
  foreach ($form['fields'] as $f => $field)
    $form['fields'][$f]['cssClass'] .= 'input-type-' . $field['type'];

  return $form;
}

/* ******************************************************************************************** 
Block Theme Functions
******************************************************************************************** */

class JSXBlock
{
  function __construct($name, $renderCallback = null, $data = null, $subdir = '')
  {
    $this->name = $name;
    $this->data = $data;
    $this->subdir = $subdir;
    $this->renderCallback = $renderCallback;
    add_action('init', [$this, 'onInit']);
  }

  function ourRenderCallback($attributes, $content)
  {
    ob_start();
    require get_theme_file_path("/blocks/{$this->subdir}{$this->name}.php");
    return ob_get_clean();
  }

  function onInit()
  {
    wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

    if ($this->data) {
      wp_localize_script($this->name, $this->name, $this->data);
    }

    $ourArgs = array(
      'editor_script' => $this->name
    );

    if ($this->renderCallback) {
      $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
    }

    register_block_type("blocktheme/{$this->name}", $ourArgs);
  }
}

new JSXBlock('banner', true, ['logoURL' => get_theme_file_uri('/dist/assets/images/logos/oriel-square-logo.svg')]);
new JSXBlock('homepagebanner', true, ['logoURL' => get_theme_file_uri('/dist/assets/images/logos/oriel-square-logo.svg')]);
new JSXBlock('columns', true, null, "columns/");
new JSXBlock('columns6040', true, null, "columns/");
new JSXBlock('columns5050', true, null, "columns/");
new JSXBlock('columns4060', true, null, "columns/");
new JSXBlock('columns3', true, null, "columns/");
new JSXBlock('columnsfull', true, null, "columns/");
new JSXBlock('columncontent', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/oxford-bg-image@2x.jpg')], "columns/");
new JSXBlock('heading', true);
new JSXBlock('button', true);
new JSXBlock('team', true, null, "team/");
new JSXBlock('teamdirectors', true, null, "team/");
new JSXBlock('teamdirector', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')], "team/");
new JSXBlock('teammembers', true, null, "team/");
new JSXBlock('teammember', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')], "team/");
new JSXBlock('cta', true);
new JSXBlock('strapline', true);
new JSXBlock('card', true, null, "cards/");
new JSXBlock('cards', true, null, "cards/");
new JSXBlock('cardimage', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')], "cards/");
new JSXBlock('cardcontent', true, null, "cards/");
new JSXBlock('imagerow', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')]);
new JSXBlock('image', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')]);
new JSXBlock('header', true, ['themeURL' => get_theme_file_uri('/dist/assets/images/')]);
new JSXBlock('submenu', true);
new JSXBlock('casestudies', true, null, "casestudies/");
new JSXBlock('casestudychooser', true, null, "casestudies/");
new JSXBlock('casestudygroup', true, null, "casestudies/");
new JSXBlock('casestudycarousel', true, null, "casestudies/");
new JSXBlock('casestudy', true, ['defaultImage' => get_theme_file_uri('/dist/assets/images/case-study-images/case-study-image-1.jpg')], "casestudies/");
new JSXBlock('testimonials', true);
new JSXBlock('testimonial', true);
new JSXBlock('job', true);
new JSXBlock('sitefooter', true);
new JSXBlock('sitefootercontent', true);
new JSXBlock('genericimage', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/icons/blank-circle.svg')]);
new JSXBlock('generictext', true);
new JSXBlock('genericpicture', true, ['fallbackImage' => get_theme_file_uri('/dist/assets/images/header-images/banner-1.jpg')]);
