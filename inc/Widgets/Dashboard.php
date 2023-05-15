<?php
/**
 * Graph Widget.
 *
 * @package WordPress.
 */

namespace RankMath\Graph\Widget\Widgets;

/**
 * Class Dashboard.
 */
class Dashboard {

	/**
	 * Initiate WordPress widget.
	 *
	 * @return void
	 */
	public function init(): void {
		add_action( 'wp_dashboard_setup', array( $this, 'add_dashboard_widget' ) );

	}

	/**
	 * Add Dashboard widget to the WordPress Instances.
	 *
	 * @return void
	 */
	public function add_dashboard_widget(): void {
		wp_add_dashboard_widget( 'rankmath_dashboard_widget', 'Graph Widget', array( $this, 'render' ) );

	}

	/**
	 * Dashboard widget html render.
	 *
	 * @return void
	 */
	public function render(): void {
		echo '<div id="rmgw_dashboard-widget"></div>';

	}


}
