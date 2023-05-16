<?php
use PHPUnit\Framework\TestCase;

use \RankMath\Graph\Widget\Widgets\Dashboard;

class GraphWidgetTests extends TestCase {

	/**
	 * Dashboard Widget instance.
	 *
	 * @var Dashboard
	 */
	public Dashboard $widget_instance;

	/**
	 * Setup before test execution.
	 *
	 * @return void
	 */
	public function setUp(): void {
		WP_Mock::setUp();

		$this->widget_instance = new Dashboard();

		WP_Mock::userFunction(
			'has_action',
			array(
				'args'   => array(
					'wp_dashboard_setup',
					array( ( $this->widget_instance ), 'add_dashboard_widget' ),
				),
				'return' => true,
			)
		);
	}

	/**
	 * Tear down after test finished completing.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		WP_Mock::tearDown();
	}

	/**
	 * Test if dashboard in registered in WP.
	 *
	 * @return void
	 */
	public function test_register_dashboard_widget(): void {
		WP_Mock::expectActionAdded( 'wp_dashboard_setup', array( $this->widget_instance, 'add_dashboard_widget' ) );

		$this->widget_instance->init();

		WP_Mock::bootstrap();

		$this->assertTrue( has_action( 'wp_dashboard_setup', array( $this->widget_instance, 'add_dashboard_widget' ) ) );
	}

	/**
	 * Test if UI rendered correctly in the widget area.
	 *
	 * @return void
	 */
	public function test_render_UI(): void {
		ob_start();

		$this->widget_instance->render();

		$output = ob_get_clean();

		$this->assertEquals( '<div id="rmgw_dashboard-widget"></div>', $output );
	}
}
