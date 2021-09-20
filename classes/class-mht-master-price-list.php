<?php

class MHT_MasterPriceList {


    var $currency_symbol;

	// 	Array
	// (
	//     [americus] => Americus
	//     [bf-goodrich] => BF Goodrich
	//     [boto] => Boto
	//     [bridgestone] => Bridgestone
	//     [continental] => Continental
	//     [dayton] => Dayton
	//     [firestone] => Firestone
	//     [general] => General
	//     [goodride] => Goodride
	//     [goodyear] => Goodyear
	//     [hankook] => Hankook
	//     [hercules] => Hercules
	//     [ironhead] => Ironhead
	//     [ironman] => Ironman
	//     [long-march] => Long March
	//     [michelin] => Michelin
	//     [roadlux] => Roadlux
	//     [roadmaster] => Roadmaster
	//     [samson] => Samson
	//     [sumitomo] => Sumitomo
	//     [supercargo] => Supercargo
	//     [toyo] => Toyo
	//     [uniroyal] => UniRoyal
	//     [vitour] => Vitour
	//     [wanli] => Wanli
	//     [yokohama] => Yokohama
	// )
	var $brands_arr;

    function __construct()
    {
        $this->currency_symbol = '$';
    }

    public function register_actions(){
        add_filter( 'woocommerce_product_data_store_cpt_get_products_query', [$this, 'handle_custom_query_var'], 10, 2 );
		//add_action('init', [$this, 'set_brands_array'], 99);
        //add_action('template_redirect', [$this, 'test']);
    }

	function set_brands_array(){
		$brnds_array = [];
		$brands = get_terms('yith_product_brand');

		if(!empty($brands)){
			foreach($brands as $brand ){
				$brnds_array[$brand->slug] = $brand->name;
			}
		}
		$this->brands_arr = $brnds_array;
	}

    function test(){
        //255 75 22.5 shuld not reurn any item
        echo '<pre>';
        $mht_mpl_products = get_option( 'mht_mpl_products');
        $mht_mpl_products = json_decode($mht_mpl_products, true);
        var_dump($mht_mpl_products);
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


            if(strpos($query_vars['mht_custom_query_price_list']['width'], 'r') !== false){
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
            }else{

                $tax_query_arr = array(
                    'relation' => 'AND',
                    array(
                        'taxonomy'        => 'pa_width',
                        'field'           => 'slug',
                        'terms'           =>  $query_vars['mht_custom_query_price_list']['width'],
                        'operator'        => 'IN',
                    ),
                    array(
                        'taxonomy'        => 'pa_size',
                        'field'           => 'slug',
                        'terms'           =>  $query_vars['mht_custom_query_price_list']['ratio'],
                        'operator'        => 'IN',
                    ),
                    array(
                        'taxonomy'        => 'pa_ratio',
                        'field'           => 'slug',
                        'terms'           =>  $query_vars['mht_custom_query_price_list']['rim'],
                        'operator'        => 'IN',
                    ),
                );

            }

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


    function is_excluded_item($tire_size){
		$items_to_exclude = [
			'235/75R22.5',
			'245/80R22.5',
			'255/75R22.5',
			'265/70R22.5',
			'265/80R22.5',
			'255/75R22.5',
		];

		foreach($items_to_exclude as $item){
			if($item == $tire_size){
				return true;
			}
		}

		return false;
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

        $tire_size_str = str_replace("-",".", $tire_size_str);
		$tire_size_str = str_replace("r/","/", $tire_size_str);
		$tire_size_str = strtoupper($tire_size_str);

		if($this->is_excluded_item($tire_size_str)){
			return;
		}

        $tire_size_item_arr = [
            'tire_size' => $tire_size_str
        ];

        $products = $this->get_producs_by_size($width, $ratio, $rim);

        if(empty($products)) {
            $tire_size_item_arr['manufacturers'] = [];

            return $tire_size_item_arr;
        }


        $tire_size_item_arr['manufacturers'] = $this->get_manufacturers_arr($products, $tire_size_str);

        return $tire_size_item_arr;

    }

	function get_menufacturars_by_product_id($product_id){
		$menufacturars_arr = [];
		$menufacturars = get_the_terms( $product_id, 'yith_product_brand');

		if(!empty($menufacturars)){
			foreach($menufacturars as $menufacturar){
				$menufacturars_arr[$menufacturar->slug] = $menufacturar->name;
			}
		}

		return $menufacturars_arr;
	}


    public function get_manufacturers_arr($products, $tire_size_str){
        //echo count($products);
        $manufacturers = [];

        foreach($products as $product){
            $manufacturer_id = get_post_meta($product->get_id(), 'tyerBrand', true);
            $tire_set_number = get_post_meta($product->get_id(), 'number_selling_tires', true); // 2, 4, 6 or 8

			$product_edit_link = get_edit_post_link($product->get_id());
			$product_title = $product->get_title();
			$product_name = '<a href="'.$product_edit_link.'" target="_blank">'.$product_title.'</a>';

			// Array
			// (
			// 	[firestone] => Firestone
			//  [americus] => Americus
			// )
			$product_menufacturars = $this->get_menufacturars_by_product_id( $product->get_id() );

            $globalCosting = $this->getGlobalCostingByTireSet($tire_set_number);

            $product_item_arr = [
                'produt_name' => $product_name,
                'price' => !empty($product->get_price()) ? $product->get_price() : '',
                'if'   => $globalCosting->ic + $globalCosting->fc,
            ];

			if(!empty($product_menufacturars)){
				foreach($product_menufacturars  as $key => $product_menufacturar ){
					if( empty($manufacturers[$key]['name'] )) {
						//$manufacturers[$manufacturer_id]['name'] =  $this->get_manufacturer_name_by_index($manufacturer_id);
						$manufacturers[$key]['name'] =  $product_menufacturar;
					}

                    $manufacturers[$key]['base_cost'] = $this->get_base_cost_for_manufect_by_size($tire_size_str, $key);

					if( empty($manufacturers[$key][ $tire_set_number . '_tire_set' ]) ) {
						$manufacturers[$key][ $tire_set_number . '_tire_set' ] = [];
					}

                    $product_item_arr['cost'] = $manufacturers[$key]['base_cost'] * $tire_set_number;
                    // $product_item_arr['cc'] = ($product_item_arr['cost'] != 0) ? ( $globalCosting->cc / 100 ) * ($product_item_arr['cost'] + $product_item_arr['if'] ) : 0; 
                    $product_item_arr['cc'] = ($product_item_arr['cost'] != 0) ? ( $globalCosting->cc / 100 ) * ($product_item_arr['price'] ) : 0; 
                    $product_item_arr['total_cost'] = ($product_item_arr['cost'] != 0) ? $product_item_arr['cost'] + $product_item_arr['cc'] + $product_item_arr['if'] : 0;
                    $product_item_arr['profit'] = ($product_item_arr['cost'] != 0) ? $product->get_price() - $product_item_arr['total_cost'] : 0;
					array_push($manufacturers[$key][ $tire_set_number . '_tire_set' ], $product_item_arr);
				}
			}
        }

        // echo '<pre>';
        // print_r($manufacturers);
        // die();

        return $manufacturers;
    }

    function getGlobalCostingByTireSet($tire_set_number){
        $global_costing = get_option( 'mht_mpl_global_costing_asumption' );
        if(empty($global_costing)){
            return false;
        }

        $global_costing =  json_decode($global_costing);

        if($tire_set_number == '2' && !empty($global_costing->twoTireSet) ){
            return $global_costing->twoTireSet;
        }
        if($tire_set_number == '4' && !empty($global_costing->fourTireSet)){
            return $global_costing->fourTireSet;
        }
        if($tire_set_number == '6' && !empty($global_costing->sixTireSet)){
            return $global_costing->sixTireSet;
        }
        if($tire_set_number == '8' && !empty($global_costing->eightTireSet)){
            return $global_costing->eightTireSet;
        }

        return false;
    }

    function get_base_cost_for_manufect_by_size($tire_size_str, $manufacturer_key){
        $mht_mpl_products = get_option( 'mht_mpl_products');
        if(!$mht_mpl_products){
            return 0;
        }

        $mht_mpl_products = json_decode($mht_mpl_products, true);

        foreach($mht_mpl_products as $tire_sizes ){
            if($tire_sizes['tire_size'] == $tire_size_str){
                $manufacturers = $tire_sizes['manufacturers'];
                if(!empty($manufacturers[$manufacturer_key]['base_cost'])){
                    return $manufacturers[$manufacturer_key]['base_cost'];
                }
            }
        }

        return 0;
    }

}

 $MHT_MasterPriceList = new MHT_MasterPriceList();

 $MHT_MasterPriceList->register_actions();