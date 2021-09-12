<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
       // add_action('template_redirect', [$this, 'test']);
    }

    public function test(){
        //delete_option( 'mht_mpl_global_costing_asumption' );
        // $cost_by_manufacs_tire_size = get_option( 'cost_by_manufacs_tire_size' );
        // $mht_mpl_products = get_option( 'mht_mpl_products');
        echo '<pre>';
        // print_r($cost_by_manufacs_tire_size);

        // print_r(json_decode($cost_by_manufacs_tire_size, true));

        // print_r($mht_mpl_products);
        // print_r(json_decode($mht_mpl_products, true));

        $global_costing = get_option( 'mht_mpl_global_costing_asumption' );
        $global_costing = json_decode($global_costing);
        print_r($global_costing);
        print_r($global_costing->eightTireSet->ic);

        die();
    }

    
    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );



		register_rest_route( 'mpl/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_mpl_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'mpl/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_mpl_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );

    }


	public function get_mpl_settings(){
		$cost_by_manufacs_tire_size = get_option( 'mht_mpl_cost_by_manufacs_tire_size' );
		$global_costing = get_option( 'mht_mpl_global_costing_asumption' );
		$response = [
            'global_costing' => $global_costing,
            'cost_by_manufacs_tire_size' => $cost_by_manufacs_tire_size
        ];

        return rest_ensure_response( $response );
	}

    public function get_settings() {
        $firstname = get_option( 'wprk_settings_firstname' );
        $lastname  = get_option( 'wprk_settings_lastname' );
        $email     = get_option( 'wprk_settings_email' );
        $response = [
            'firstname' => $firstname,
            'lastname'  => $lastname,
            'email'     => $email
        ];

        return rest_ensure_response( $response );
    }

    public function get_settings_permission() {
        return true;
    }



	public function save_mpl_settings( $req ){

        if(isset($req['cost_by_manufacs_tire_size'])){
		$cost_by_manufacs_tire_size = sanitize_text_field( $req['cost_by_manufacs_tire_size'] );
		update_option( 'mht_mpl_cost_by_manufacs_tire_size', $cost_by_manufacs_tire_size );
		return rest_ensure_response( 'success' );
        }

        if(isset($req['mht_mpl_products'])){
            $mht_mpl_products = sanitize_text_field( $req['mht_mpl_products'] );
            update_option( 'mht_mpl_products', $mht_mpl_products );
            return rest_ensure_response( 'success' );
        }

        if(isset($req['global_costing_asumption'])){
            $global_costing_asumption = sanitize_text_field( $req['global_costing_asumption'] );
            update_option( 'mht_mpl_global_costing_asumption', $global_costing_asumption );
            return rest_ensure_response( 'success' );
        }


	}

    public function save_settings( $req ) {
        $firstname = sanitize_text_field( $req['firstname'] );
        $lastname  = sanitize_text_field( $req['lastname'] );
        $email     = sanitize_text_field( $req['email'] );
        update_option( 'wprk_settings_firstname', $firstname );
        update_option( 'wprk_settings_lastname', $lastname );
        update_option( 'wprk_settings_email', $email );
        return rest_ensure_response( 'success' );
    }

    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }
}
new WP_React_Settings_Rest_Route();