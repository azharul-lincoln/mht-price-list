<?php
/**
 * Plugin Name: MHT Master Price List
 * Author: Azharul Lincoln
 * Author URI: https://woonative.com
 * Version: 1.0.0
 * Description: MHT Master Price List.
 * Text-Domain: wp-react-kickoff
 */

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define ( 'MHT_PLIS_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'MHT_PLIST_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts' );
function load_scripts() {
    wp_enqueue_script( 'wp-react-kickoff', MHT_PLIST_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'wp-react-kickoff', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}

require_once MHT_PLIS_PATH . 'classes/class-create-admin-menu.php';
require_once MHT_PLIS_PATH . 'classes/class-create-settings-routes.php';


function get_manufacturer_name_by_index( $index ) {
    $options_arr = array(
        '0'  => __('--none--', 'woocommerce'),
        '1'  => __('BF Goodrich', 'woocommerce'),
        '2'  => __('Boto', 'woocommerce'),
        '3'  => __('Bridgestone', 'woocommerce'),
        '4'  => __('Continental', 'woocommerce'),
        '5'  => __('Double Coin', 'woocommerce'),
        '6'  => __('Duraturn', 'woocommerce'),
        '7'  => __('DynaTrac', 'woocommerce'),
        '8'  => __('Firestone', 'woocommerce'),
        '9'  => __('General', 'woocommerce'),
        '10' => __('Goodyear', 'woocommerce'),
        '11' => __('Hankook', 'woocommerce'),
        '12' => __('Hercules', 'woocommerce'),
        '13' => __('Ironman', 'woocommerce'),
        '14' => __('Leao', 'woocommerce'),
        '15' => __('Michelin', 'woocommerce'),
        '16' => __('Roadlux', 'woocommerce'),
        '17' => __('Roadmaster', 'woocommerce'),
        '18' => __('Sailun', 'woocommerce'),
        '19' => __('Samson', 'woocommerce'),
        '20' => __('Sierra', 'woocommerce'),
        '21' => __('Sumitomo', 'woocommerce'),
        '22' => __('Super Cargo', 'woocommerce'),
        '23' => __('Toyo', 'woocommerce'),
        '24' => __('Westlake', 'woocommerce'),
        '25' => __('Yokohama', 'woocommerce')
    );

    return $options_arr[$index];
}



function az_custom_product_search($width='', $ratio='', $rim='') {
    $width='245';
    $ratio='75';
    $rim='22.5';
    $args = array(
		'post_type' => 'product',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'meta_query' => array(
			'relation' => 'AND',
			array(
				'key' => 'width',
				'value' => $width,
				'compare' => '=',
			),
			array(
				'key' => 'ratio',
				'value' => $ratio,
				'compare' => '=',
            ),
            array(
				'key' => 'rim',
				'value' => $rim,
				'compare' => '=',
			)
		), 
	);
	
	//$the_query = new WP_Query( $args );

    echo '<pre>';
	// echo $count = $the_query->post_count;

    // print_r($the_query->get_posts());

    $searced_products = wc_get_products($args);
    echo count( $searced_products);

    print_r($searced_products);

	// if ( $the_query->have_posts() ) :
	// 	while ( $the_query->have_posts() ) : $the_query->the_post();
	// 		echo '<li>' . get_the_title() . '</li>'; 
	// 	endwhile;
	// endif;


	wp_reset_postdata();

    die();
}



/**
 * Handle a custom 'customvar' query var to get products with the 'customvar' meta.
 * @param array $query - Args for WP_Query.
 * @param array $query_vars - Query vars from WC_Product_Query.
 * @return array modified $query
 */
function az_handle_custom_query_var( $query, $query_vars ) {
    // echo '<pre>';
    // print_r($query_vars);
	if ( ! empty( $query_vars['mht_custom_query_price_list'] ) ) {

        $query['meta_query'][] = array(
            'relation' => 'AND',
            array(
                'key' => 'width',
                'value' => $query_vars['mht_custom_query_price_list']['width'],
                'compare' => '=',
            ),
            array(
                'key' => 'ratio',
                'value' => $query_vars['mht_custom_query_price_list']['ratio'],
                'compare' => '=',
            ),
            array(
                'key' => 'rim',
                'value' => $query_vars['mht_custom_query_price_list']['rim'],
                'compare' => '=',
            )
            );

	}

    //print_r($query_vars);

	return $query;
}
add_filter( 'woocommerce_product_data_store_cpt_get_products_query', 'az_handle_custom_query_var', 10, 2 );

//$products = wc_get_products( array( 'customvar' => 'somevalue' ) );


//test section

// add_action('template_redirect', 'az_custom_product_search');
add_action('template_redirect', 'az_test');

function az_test(){
    echo '<pre>';

    $products = wc_get_products( array( 
        'limit' => -1,
        'mht_custom_query_price_list' => array(
        'width' => '245',
        'ratio' => '75',
        'rim' => '22.5'
    ) ) );

    echo count($products);
    foreach($products as $product){
        print_r($product->get_name());
        var_dump(get_manufacturer_name_by_index(get_post_meta($product->get_id(), 'tyerBrand', true)));
        echo '<br>';
    }

    die();
}