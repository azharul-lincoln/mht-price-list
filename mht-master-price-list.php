<?php
/**
 * Plugin Name: MHT Master Price List
 * Author: Azharul Lincoln
 * Author URI: https://woonative.com
 * Version: 1.0.1
 * Description: MHT Master Price List.
 * Text-Domain: wp-react-kickoff
 */

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define ( 'MHT_PLIS_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'MHT_PLIST_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

require_once MHT_PLIS_PATH . 'classes/class-mht-master-price-list.php';
require_once MHT_PLIS_PATH . 'classes/class-create-admin-menu.php';
require_once MHT_PLIS_PATH . 'classes/class-create-settings-routes.php';

/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts', 99 );
function load_scripts() {
	$AZ_MHT_Create_Admin_Page = new AZ_MHT_Create_Admin_Page();

    wp_enqueue_script( 'mht-master-price-list-js', MHT_PLIST_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'mht-master-price-list-js', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
		'products' => $AZ_MHT_Create_Admin_Page->all_products_body_arr(),
        'products_json' => json_encode($AZ_MHT_Create_Admin_Page->all_products_body_arr()),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}