<?php
/**
 * Graph Widget custom endpoint to server data from WordPress.
 * This is a static data that comes from database.
 *
 * @package WordPress.
 */

namespace RankMath\Graph\Widget\RestApi;

/**
 * Class GraphWidgetApi
 */
class GraphWidgetApi {

	/**
	 * Register custom rest endpoint.
	 *
	 * @return void
	 */
	public function register_rest_endpoint(): void {
		add_action( 'rest_api_init', array( $this, 'add_endpoint' ) );
	}

	/**
	 * Register a custom endpoint to fetch graph data.
	 *
	 * @return bool
	 */
	public function add_endpoint() : bool {
		return register_rest_route(
			'rankmath/v1/widget',
			'/dashboard',
			array(
				'METHOD'   => 'GET',
				'callback' => array( $this, 'endpoint_callback' ),
			)
		);
	}

	/**
	 * Handle response for the request submitted.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function endpoint_callback(): \WP_Error|\WP_HTTP_Response|\WP_REST_Response {
		$graph_data = get_option( 'rmgw_graph_widget_data', array() );

		return rest_ensure_response( $graph_data );
	}
}
