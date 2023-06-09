<?php
/**
 * Plugin Name: RankMath Dashboard Widget ( Coding Challenge )
 * Plugin URI: https://github.com/arunchaitanyajami/rank-math-coding-challenge-aj
 * Description: A custom WordPress dashboard Widget that displays Recharts line chart with filters of last 7 days, 15 days, and 1 month.
 * Author: arunchaitanyajami
 * Author URI: https://github.com/arunchaitanyajami
 * Text Domain: rankmath-dashboard-widget
 * Version: 1.0.0
 *
 * @package WordPress
 */

namespace RankMath\Graph\Widget;

define( 'RMGW_DIR', plugin_dir_path( __FILE__ ) );
define( 'RMGW_URL', plugin_dir_url( __FILE__ ) );
define( 'RMGW_PLUGIN_VERSION', '1.0.0' );

require RMGW_DIR . 'vendor/autoload.php';

use RankMath\Graph\Widget\RestApi\GraphWidgetApi;
use RankMath\Graph\Widget\Widgets\Dashboard;

/**
 * Load Dashboard Widget.
 */
( new Dashboard() )->init();
( new GraphWidgetApi() )->register_rest_endpoint();

/**
 * Setup static data when activating this plugin.
 */
register_activation_hook(
	__FILE__,
	function () {
		if ( ! get_option( 'rmgw_graph_widget_data' ) ) {
			$options = array();
			for ( $i = 1; $i <= 30; $i ++ ) {
				$options[] = array(
					'day'   => "Day {$i}",
					'value' => rand( 0, 100 ),
				);
			}

			add_option( 'rmgw_graph_widget_data', $options );
		}
	}
);

/**
 * Enqueue dashboard widget component scripts.
 *
 * @param string $hook_suffix The current admin page.
 *
 * @return void
 */
function rmgw_dashboard_widget_enqueue_scripts( string $hook_suffix ) : void {
	if ( 'index.php' !== $hook_suffix ) {
		return;
	}

	$widget_setting = array(
		'siteUrl' => esc_url( get_rest_url() ),
		'nonce'   => wp_create_nonce( 'wp_rest' ),
	);

	wp_enqueue_script( 'rmgw_rechart_component_js', RMGW_URL . 'dist/index.js', array(), RMGW_PLUGIN_VERSION, true );
	wp_localize_script( 'rmgw_rechart_component_js', 'graphWidgetSettings', $widget_setting );
	wp_enqueue_script( 'rmgw_rechart_component_js' );

	wp_enqueue_style( 'rmgw_rechart_component_css', RMGW_URL . 'dist/styles.min.css', );
}

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\rmgw_dashboard_widget_enqueue_scripts' );

/**
 * Load language files for Text translation.
 *
 * Create translation files with a .mo extension for each language you want to support. The translation files should be
 * named using the following format: {text-domain}-{locale}.mo. For example, rmgw-textdomain-en_US.mo for English (United States)
 * translations.
 *
 * @return void
 */
function rmgw_load_textdomain(): void {
	load_plugin_textdomain( 'rmgw-textdomain', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}

add_action( 'plugins_loaded', __NAMESPACE__ . '\\rmgw_load_textdomain' );
