<?php

class MHT_MasterPriceList {


    var $currency_symbol;

    function __construct()
    {
        $this->currency_symbol = '$';
    }

    public function register_actions(){
        add_filter( 'woocommerce_product_data_store_cpt_get_products_query', [$this, 'handle_custom_query_var'], 10, 2 );
        //add_action('template_redirect', [$this, 'test']);
    }

    function test(){
        //255 75 22.5 shuld not reurn any item
        echo '<pre>';
        print_r(count($this->get_producs_by_size( '12r', '', '22-5' )));
        die();
    }

    /**
     * Handle a custom 'customvar' query var to get products with the 'customvar' meta.
     * @param array $query - Args for WP_Query.
     * @param array $query_vars - Query vars from WC_Product_Query.
     * @return array modified $query
     */
    function handle_custom_query_var( $query, $query_vars ) {

        if ( ! empty( $query_vars['mht_custom_query_price_list'] ) ) {

            // $query['meta_query'][] = array(
            //     'relation' => 'AND',
            //     array(
            //         'key' => 'width',
            //         'value' => $query_vars['mht_custom_query_price_list']['width'],
            //         'compare' => '=',
            //     ),
            //     array(
            //         'key' => 'ratio',
            //         'value' => $query_vars['mht_custom_query_price_list']['ratio'],
            //         'compare' => '=',
            //     ),
            //     array(
            //         'key' => 'rim',
            //         'value' => $query_vars['mht_custom_query_price_list']['rim'],
            //         'compare' => '=',
            //     )
            //     );


			//print_r($query_vars['mht_custom_query_price_list']);

			$tax_query_arr = array(
				'relation' => 'AND'
			);

			if(!empty($query_vars['mht_custom_query_price_list']['width'])){
				$tax_query_arr[] =    array(
					'taxonomy'        => 'pa_width',
					'field'           => 'slug',
					'terms'           =>  $query_vars['mht_custom_query_price_list']['width'],
					'operator'        => 'IN',
				);
			}

			if(!empty($query_vars['mht_custom_query_price_list']['ratio'])){
				$tax_query_arr[] =    array(
					'taxonomy'        => 'pa_size',
					'field'           => 'slug',
					'terms'           =>  $query_vars['mht_custom_query_price_list']['ratio'],
					'operator'        => 'IN',
				);
			}

			if(!empty($query_vars['mht_custom_query_price_list']['rim'])){
				$tax_query_arr[] =    array(
					'taxonomy'        => 'pa_ratio',
					'field'           => 'slug',
					'terms'           =>  $query_vars['mht_custom_query_price_list']['rim'],
					'operator'        => 'IN',
				);
			}


			// $query['tax_query'] = array(
			// 	'relation' => 'AND',
			// 	array(
			// 		'taxonomy'        => 'pa_width',
			// 		'field'           => 'slug',
			// 		'terms'           =>  $query_vars['mht_custom_query_price_list']['width'],
			// 		'operator'        => 'IN',
			// 	),
			// 	array(
			// 		'taxonomy'        => 'pa_size',
			// 		'field'           => 'slug',
			// 		'terms'           =>  $query_vars['mht_custom_query_price_list']['ratio'],
			// 		'operator'        => 'IN',
			// 	),
			// 	array(
			// 		'taxonomy'        => 'pa_ratio',
			// 		'field'           => 'slug',
			// 		'terms'           =>  $query_vars['mht_custom_query_price_list']['rim'],
			// 		 'operator'        => 'IN',
			// 	),
			// );

			$query['tax_query'] = $tax_query_arr;

        }

        //print_r($query_vars);

        return $query;
    }


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

		if(!isset( $options_arr[$index] )){
			return false;
		}

        return $options_arr[$index];
    }


    public static function get_producs_by_size($width, $ratio, $rim ){

        $products = wc_get_products( array(
            'limit' => -1,
			'status' => 'publish',
            'mht_custom_query_price_list' => array(
            'width' => $width,
            'ratio' => $ratio,
            'rim' =>  $rim
        ) ) );

        return $products;
    }


    /**
     * Return a array item for a particular tire size
     *
     * @param [type] $width
     * @param [type] $ratio
     * @param [type] $rim
     * @return void
     */
    public function tire_size_item_arr( $width, $ratio, $rim ){

        $tire_size_str = $width .'/'.$ratio . 'R' . $rim;

        $tire_size_item_arr = [
            'tire_size' => $tire_size_str
        ];

        $products = $this->get_producs_by_size($width, $ratio, $rim);

        if(empty($products)) {
            $tire_size_item_arr['manufacturers'] = [];

            return $tire_size_item_arr;
        }


        $tire_size_item_arr['manufacturers'] = $this->get_manufacturers_arr($products);

        return $tire_size_item_arr;

    }


    public function get_manufacturers_arr($products){
        //echo count($products);
        $manufacturers = [];

        foreach($products as $product){
            $manufacturer_id = get_post_meta($product->get_id(), 'tyerBrand', true);
            $tire_set_number = get_post_meta($product->get_id(), 'number_selling_tires', true);

			$product_edit_link = get_edit_post_link($product->get_id());
			$product_title = $product->get_title();
			$product_name = '<a href="'.$product_edit_link.'" target="_blank">'.$product_title.'</a>';
            $product_item_arr = [
                'produt_name' => $product_name,
                'price' => $this->currency_symbol. $product->get_price(),
                'qty'   => $product->get_stock_quantity()
            ];

            if( empty($manufacturers[$manufacturer_id]['name'] )) {
                $manufacturers[$manufacturer_id]['name'] =  $this->get_manufacturer_name_by_index($manufacturer_id);
            }

           if( empty($manufacturers[$manufacturer_id][ $tire_set_number . '_tire_set' ]) ) {
            $manufacturers[$manufacturer_id][ $tire_set_number . '_tire_set' ] = [];
           }

            array_push($manufacturers[$manufacturer_id][ $tire_set_number . '_tire_set' ], $product_item_arr);

        }

        return $manufacturers;
    }

}

 $MHT_MasterPriceList = new MHT_MasterPriceList();

 $MHT_MasterPriceList->register_actions();