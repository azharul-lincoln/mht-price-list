<?php
/**
 * This file will create admin menu page.
 */

class AZ_MHT_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'create_admin_menu' ] );
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'wprk-settings';

        $mht_plist_menu_page = add_menu_page(
            __( 'Master Price List', 'wp-react-kickoff' ),
            __( 'Master Price List', 'wp-react-kickoff' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-screenoptions'
        );

        add_action( 'load-' . $mht_plist_menu_page, [$this, 'load_admin_css'] );

    }

    public function load_admin_css(){
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_css' ] );
    }

    public function enqueue_admin_css(){
        // Isn't it nice to use dependencies and the already registered core js files?
        wp_enqueue_style( 'mht-plist-css', MHT_PLIST_URL . '/assets/mht-plist.css', array(), wp_rand() );
    }

    public function menu_page_template() {
       // echo '<div class="wrap"><div id="wprk-admin-app"></div></div>';
       ?>

<style>

</style>

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
                    <div class="product-name"> <a href="#">Product nameProduct nameProduct nameProduct nameProduct
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
                <div class="product-detail-container">
                    <div class="product-name">Product name</div>
                    <div class="product-price">$20</div>
                    <div class="product-quentatty">5</div>
                </div>
            </div>

        </div> <!-- .tire-detail-container end -->
    </div><!-- .mht-plist-row end -->




    <div class="mht-plist-row">
        <div class="tire-size plist-row-item">
            <h3>245/75R22.5</h3>

        </div>


        <div class="tire-detail-container plist-row-item">

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
                    <div class="product-name">Product nameProduct nameProduct nameProduct nameProduct name</div>
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
                <div class="product-detail-container">
                    <div class="product-name">Product name</div>
                    <div class="product-price">$20</div>
                    <div class="product-quentatty">5</div>
                </div>
            </div>

        </div> <!-- .tire-detail-container end -->
    </div><!-- .mht-plist-row end -->



</div><!-- .mht-price-list end -->

<?php
    }

}
new AZ_MHT_Create_Admin_Page();