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
