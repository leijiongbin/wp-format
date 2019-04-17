<?php
/*
Plugin Name: 一键排版
Plugin URI: 
Description: One key to format article in editor
Version: 1.0.0
Author: Ryan

*/


if (is_admin()){

	function add_plugin($plugin_array) {
		$plugin_array['wpformat'] = plugins_url('res/js/wp-format.js', __FILE__);
		return $plugin_array;
	}
	add_filter('mce_external_plugins', 'add_plugin');

	function register_buttons($buttons) {
		array_push($buttons, 'separator', 'wpformat');
		return $buttons;
	}
	add_filter('mce_buttons', 'register_buttons');
}