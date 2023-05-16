<?php

use \PHPUnit\Framework\TestCase;
use RankMath\Graph\Widget\RestApi\GraphWidgetApi;

class GraphChartRestApiTest extends TestCase {

	public $rest_api_instance;
	/**
	 * Setup before test execution.
	 *
	 * @return void
	 */
	public function setUp(): void {
		WP_Mock::setUp();

		$this->rest_api_instance = new GraphWidgetApi();

		WP_Mock::userFunction(
			'has_action',
			array(
				'args'   => array(
					'rest_api_init',
					array( ( $this->rest_api_instance ), 'add_endpoint' ),
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
	 * Check if rest_api_init actions is triggered and is registered.
	 * @return void
	 */
	public function test_register_rest_endpoints_adds_action (): void {
		WP_Mock::expectActionAdded('rest_api_init', array( ( $this->rest_api_instance ), 'add_endpoint' ) );

		$this->rest_api_instance->register_rest_endpoint();

		WP_Mock::bootstrap();

		$this->assertTrue( has_action( 'rest_api_init', array( $this->rest_api_instance, 'add_endpoint' ) ) );
	}
}
