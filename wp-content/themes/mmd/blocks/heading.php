<?php
$size = 'h1';
if (isset($attributes['size'])) {
  $size = $attributes['size'];
}
$tagName = 'h1';
if (isset($attributes['tagName'])) {
  $tagName = $attributes['tagName'];
}
$uppercase = '';
if (isset($attributes['uppercase'])) {
  $uppercase = $attributes['uppercase'];
}
$margin = '';
if (isset($attributes['margin'])) {
  $margin = $attributes['margin'];
}
$textColor = '';
if (isset($attributes['textColor'])) {
  $textColor = $attributes['textColor'];
}
$underline = '';
if (isset($attributes['underline'])) {
  $underline = $attributes['underline'];
}
$text = '';
if (isset($attributes['text'])) {
  $text = $attributes['text'];
}
echo '<' . $tagName . ' class="headline headline--' . $size . ' ' . $uppercase . ' ' . $textColor . ' ' . $underline . ' ' . $margin . '">' . $text . '</' . $tagName . '>';
