<?php
$wrapperClassName = '';
if (isset($attributes['wrapperClassName'])) {
  $wrapperClassName = $attributes['wrapperClassName'];
}
$wrapperTag = 'div';
if (isset($attributes['wrapperTag'])) {
  $wrapperTag = $attributes['wrapperTag'];
}

echo '<' . $wrapperTag . ' class="' . $wrapperClassName . '">';
echo $content;
echo '</' . $wrapperTag . '>';
