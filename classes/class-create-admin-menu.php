<?php

/**
 * This file will create admin menu page.
 */

class AZ_MHT_Create_Admin_Page
{

	public $widths = [];

	public $ratios = [];

	public $sizes = [];

	public function print_all_items_body(){
		foreach($this->widths as $width ){
			foreach($this->ratios as $ratio ){
				foreach($this->sizes as $size ){
					$this->print_product_list_row($width, $ratio, $size); //loop
				}
			}
		}
	}


	public function all_products_body_arr(){
		$MHT_MasterPriceList = new MHT_MasterPriceList();
		$tire_size_item_arrayes = [];

        $widths = $this->get_terms('pa_width');
		$sizes = $this->get_terms('pa_ratio');
		$ratios = $this->get_terms('pa_size');
		$ratios[]= '';

		foreach($widths as $key_width => $width ){
			foreach($ratios as $key_ration => $ratio ){
				foreach($sizes as $key_size => $size ){
					//$this->print_product_list_row($width, $ratio, $size); //loop
					$tire_size_item_arr = $MHT_MasterPriceList->tire_size_item_arr($width, $ratio, $size);

					if(!empty($tire_size_item_arr['manufacturers'])){
						$tire_size_item_arrayes[] = $tire_size_item_arr;
					}
				}
			}
		}

        //return $this->get_terms('pa_width');

		return $tire_size_item_arrayes;
	}


	public function __construct()
	{
		add_action('admin_menu', [$this, 'create_admin_menu']);
		add_action('init', [$this, 'set_attributes'], 99);
		//add_action('init', [$this, 'test'], 99);
	}

	function set_attributes(){
		$this->widths = $this->get_terms('pa_width');
		$this->sizes = $this->get_terms('pa_ratio');
		$this->ratios = $this->get_terms('pa_size');
		$this->ratios[]= '';
	}

	function get_terms($texenomy){
		$tex_arr = [];
		$terms = get_terms(
			[
				'taxonomy' => $texenomy,
				'hide_empty' => true,
			]
			);

			if(!empty($terms)){
				foreach($terms as $term) {
					$tex_arr[] = $term->slug;
				}
			}

			return $tex_arr;
	}

	function test() {
		// $width_arr = [];
		// $widths = get_terms(
		// 	[
		// 		//'taxonomy' => 'pa_width',
		// 		//'taxonomy' => 'pa_ratio',
		// 		'taxonomy' => 'pa_size',
		// 		'hide_empty' => true,
		// 	]
		// 	);

		// if(!empty($widths)){
		// 	foreach($widths as $width) {
		// 		$width_arr[] = $width->slug;
		// 	}
		// }

		 	echo '<pre>';
		// 	print_r($width_arr);

		print_r([$this->widths, $this->sizes, $this->ratios]);

		die();
	}

	public function create_admin_menu()
	{
		$capability = 'manage_options';
		$slug = 'wprk-settings';

		$mht_plist_menu_page = add_menu_page(
			__('Master Price List', 'wp-react-kickoff'),
			__('Master Price List', 'wp-react-kickoff'),
			$capability,
			$slug,
			[$this, 'mht_master_plist_html'],
			'dashicons-screenoptions'
		);

		add_action('load-' . $mht_plist_menu_page, [$this, 'load_admin_css']);

		//react menu section
		$mht_plist_menu_page_react = add_menu_page(
			__('React Master Price', 'wp-react-kickoff'),
			__('React Master Price', 'wp-react-kickoff'),
			$capability,
			$slug.'-react',
			[$this, 'react_menu'],
			'dashicons-screenoptions'
		);

		add_action('load-' . $mht_plist_menu_page_react, [$this, 'load_admin_css']);

	}

	public function load_admin_css()
	{
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_css']);
	}

	public function enqueue_admin_css()
	{
		// Isn't it nice to use dependencies and the already registered core js files?
		wp_enqueue_style('mht-plist-css', MHT_PLIST_URL . '/assets/mht-plist.css', array(), wp_rand());
	}


	public function mht_master_plist_html()
	{
		$this->print_pricelist_header();
		// $this->print_product_list_row('245', '75', '22.5'); //loop
		// $this->print_product_list_row('265', '75', '22.5'); //loop
		// $this->print_product_list_row('275', '80', '22.5'); //loop
		$this->print_all_items_body();
		$this->print_pricelist_footer();
	}


	public function react_menu(){
		 echo '<div class="wrap"><div id="wprk-admin-app"></div></div>';
	}


	public function menu_page_template()
	{
		// echo '<div class="wrap"><div id="wprk-admin-app"></div></div>';
?>

<h1>Price list of MHT Pricing</h1>

<div class="mht-price-list">

    <div class="mht-plist-row plist-header">
        <div class="tire-size plist-row-item">
            <h3>Tire Size</h3>
        </div>
        <div class="tire-detail-container plist-row-item">
            <div class="tire-manufacturer tire-set-item">
                <h3>Manufacturer</h3>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>2 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>4 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>6 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>8 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

        </div> <!-- .tire-detail-container end -->
    </div><!-- .mht-plist-row end -->


    <div class="mht-plist-row">
        <div class="tire-size plist-row-item">
            <h3>245/75R22.5</h3>
        </div>


        <div class="tire-detail-container plist-row-item">

            <div class="brand-items">
                <div class="brand-item">
                    <div class="tire-manufacturer tire-set-item">
                        <h3>Toyo</h3>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product nameProduct nameProduct</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>

                        <div class="product-detail-container">
                            <div class="product-name"> <a href="#">Product nameProduct nameProduct nameProduct
                                    nameProduct
                                    name</a> </div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>

                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>
                </div>
                <!-- .brand-item end -->

                <div class="brand-item">
                    <div class="tire-manufacturer tire-set-item">
                        <h3>Goodyear</h3>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product nameProduct nameProduct</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>

                        <div class="product-detail-container">
                            <div class="product-name"> <a href="#">Product nameProduct nameProduct nameProduct
                                    nameProduct
                                    name</a> </div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>

                        <div class="product-detail-container">
                            <div class="product-name">Product nameProduct nameProduct nameProduct nameProduct name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>

                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>

                    <div class="tire-set-item">
                        <div class="product-detail-container">
                            <div class="product-name">Product name</div>
                            <div class="product-price">$20</div>
                            <div class="product-quentatty">5</div>
                        </div>
                    </div>
                </div> <!-- .brand-item end -->
            </div><!-- .brand-items end -->

        </div> <!-- .tire-detail-container end -->
    </div><!-- .mht-plist-row end -->
</div><!-- .mht-price-list end -->

<?php
	}


	// function is_excluded_item($tire_size){
	// 	$items_to_exclude = [
	// 		'235/75R22.5',
	// 		'245/80R22.5',
	// 		'255/75R22.5',
	// 		'265/70R22.5',
	// 		'265/80R22.5',
	// 		'255/75R22.5',
	// 	];

	// 	foreach($items_to_exclude as $item){
	// 		if($item == $tire_size){
	// 			return true;
	// 		}
	// 	}

	// 	return false;
	// }


	function print_product_list_row($width, $ratio, $rim)
	{
		$MHT_MasterPriceList = new MHT_MasterPriceList();
		$tire_size_item_arr = $MHT_MasterPriceList->tire_size_item_arr($width, $ratio, $rim);

        if(empty($tire_size_item_arr['manufacturers'])){
            return;
        }

		$tire_size = $tire_size_item_arr['tire_size'];
		// $tire_size = str_replace("-",".", $tire_size);
		// $tire_size = str_replace("r/","/", $tire_size);
		// $tire_size = strtoupper($tire_size);

		// if($this->is_excluded_item($tire_size)){
		// 	return;
		// }

	?>

<div class="mht-plist-row">
    <div class="tire-size plist-row-item">
        <h3><?php echo $tire_size; ?></h3>
    </div>

    <div class="tire-detail-container plist-row-item">

        <div class="brand-items">
            <?php
					if (!empty($tire_size_item_arr['manufacturers'])) {
						$manufacturers = $tire_size_item_arr['manufacturers'];

						foreach ($manufacturers as $key => $manufacturer) {
					?>
            <div class="brand-item">
                <div class="tire-manufacturer tire-set-item">
                    <h3><?php echo  $manufacturer['name'] ?></h3>
                </div>

                <?php
				$two_tire_set_items = !empty($tire_size_item_arr['manufacturers'][$key]['2_tire_set'])
					? $tire_size_item_arr['manufacturers'][$key]['2_tire_set'] : [];
				$this->print_tire_set_items(2, $two_tire_set_items);


				$four_tire_set_items = !empty($tire_size_item_arr['manufacturers'][$key]['4_tire_set'])
					? $tire_size_item_arr['manufacturers'][$key]['4_tire_set'] : [];
				$this->print_tire_set_items(4, $four_tire_set_items);


				$six_tire_set_items = !empty($tire_size_item_arr['manufacturers'][$key]['6_tire_set'])
					? $tire_size_item_arr['manufacturers'][$key]['6_tire_set'] : [];
				$this->print_tire_set_items(6, $six_tire_set_items);

				$eight_tire_set_items = !empty($tire_size_item_arr['manufacturers'][$key]['8_tire_set'])
					? $tire_size_item_arr['manufacturers'][$key]['8_tire_set'] : [];
				$this->print_tire_set_items(8, $eight_tire_set_items);

				?>

            </div>
            <!-- .brand-item end -->

            <?php

						}
					}

					?>

        </div><!-- .brand-items end -->

    </div> <!-- .tire-detail-container end -->
</div><!-- .mht-plist-row end -->
<?php

	}



	function print_tire_set_items($tire_set_numbar, $tire_set_items)
	{
	?>

<div class="tire-set-item <?= $tire_set_numbar . '_tire_set' ?>">
    <?php
			if (!empty($tire_set_items)) {
				foreach ($tire_set_items as $tire_set_item) {
			?>
    <div class="product-detail-container">
        <div class="product-name">
            <?= $tire_set_item['produt_name'] ?>
        </div>
        <div class="product-price">
            <?= $tire_set_item['price'] ?>
        </div>
        <div class="product-quentatty">
            <?= $tire_set_item['qty'] ?>
        </div>
    </div>
    <?php

				}
			}

			?>
</div>

<?php

	}


	function print_pricelist_header()
	{
	?>
<h1>Price list of MHT Pricing</h1>
<div class="mht-price-list">

    <div class="mht-plist-row plist-header">
        <div class="tire-size plist-row-item">
            <h3>Tire Size</h3>
        </div>
        <div class="tire-detail-container plist-row-item">
            <div class="tire-manufacturer tire-set-item">
                <h3>Manufacturer</h3>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>2 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>4 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>6 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

            <div class="tire-set-item">
                <div class="titel">
                    <h3>8 tire set</h3>
                </div>
                <div class="pdetail-headings">
                    <div class="product-name">Product name</div>
                    <div class="product-price">Price</div>
                    <div class="product-quentatty">Qty</div>
                </div>
            </div>

        </div> <!-- .tire-detail-container end -->
    </div><!-- .mht-plist-row end -->
    <?php
	}


	function print_pricelist_footer()
	{
		?>
</div><!-- .mht-price-list end -->
<?php
	}
}
new AZ_MHT_Create_Admin_Page();
