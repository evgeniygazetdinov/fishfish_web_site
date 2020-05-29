<?php
//to js from php
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



// =============style-connect================================================
add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );
// add_action('wp_print_styles', 'theme_name_scripts'); // можно использовать этот хук он более поздний
function theme_name_scripts() {

      wp_enqueue_script( 'fflanding-js', get_template_directory_uri() . '/assets/build/js/script.js');
      wp_enqueue_style('second-child-theme', get_stylesheet_directory_uri() .'/assets/build/css/styles.css');

};
// =============================================================

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&& menu-staff &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function register_my_menus() {
    register_nav_menus(
      array(
        'new-menu' => __( 'FFlanding_menu' ),

      )
    );
  }
  add_action( 'init', 'register_my_menus' );


  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
 //REGISTER PORTFILIOTYPE

 add_action( 'init', 'register_portfolio_type_init' ); // Использовать функцию только внутри хука init

 function register_portfolio_type_init() {
   $labels = array(
     'name' => 'Портфолио',
     'singular_name' => 'Портфолио', // админ панель Добавить->Функцию
     'add_new' => 'Добавить Портфолио',
     'add_new_item' => 'Добавить новое Портфолио', // заголовок тега <title>
     'edit_item' => 'Редактировать Портфолио',
     'new_item' => 'Новое Портфолио',
     'all_items' => 'Все Портфолио',
     'view_item' => 'Просмотр Портфолио на сайте',
     'search_items' => 'Искать Портфолио',
     'not_found' =>  'Портфолио не найдено.',
     'not_found_in_trash' => 'В корзине нет Портфолио.',
     'menu_name' => 'Портфолио' // ссылка в меню в админке
   );
   $args = array(
     'labels' => $labels,
     'public' => true,
     'show_ui' => true, // показывать интерфейс в админке
     'has_archive' => true,
     'menu_icon' => get_stylesheet_directory_uri() .'/assets/img/portfolio.svg', // иконка в меню
     'menu_position' => 20, // порядок в меню
     'supports' => array( 'title', 'editor', 'thumbnail')
   );
   register_post_type('portfolio', $args);
 }

//hook into the init action and call create_topics_nonhierarchical_taxonomy when it fires

add_action( 'init', 'register_proposal_type_init' ); // Использовать функцию только внутри хука init

function register_proposal_type_init() {
  $labels = array(
    'name' => 'proposal',
    'singular_name' => 'proposal', // админ панель Добавить->Функцию
    'add_new' => 'add proposal',
    'add_new_item' => 'add new proposal', // заголовок тега <title>
    'edit_item' => 'edit proposal',
    'new_item' => 'new proposal',
    'all_items' => 'all proposal',
    'view_item' => 'view proposal on site',
    'search_items' => 'search proposal',
    'not_found' =>  'proposal not found.',
    'not_found_in_trash' => 'in trash doesnt proposal.',
    'menu_name' => 'proposal' // ссылка в меню в админке
  );
  $args = array(
    'labels' => $labels,
    'public' => true,
    'show_ui' => true, // показывать интерфейс в админке
    'has_archive' => true,
    'menu_icon' => get_stylesheet_directory_uri() .'/assets/img/proposal.svg', // иконка в меню
    'menu_position' => 20, // порядок в меню
    'supports' => array( 'title', 'editor', 'thumbnail')
  );
  register_post_type('proposal', $args);
}






  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// ajax shit
//
// word from js
/*
  wp_ajax_send_[proposal_ajax_send]
  wp_ajax_nopriv_send_[proposal_ajax_send]

*/
function ff_landing_js_vars()
{
  $VARS = array(
      'ajax_url' =>admin_url('admin-ajax.php') ,
  );
    echo "<script>window.wp= ".json_encode($VARS)."</script>";
}

add_action('wp_ajax_proposal_ajax_send',"fflanding_send_ajax_from_proposal" );
add_action('wp_ajax_nopriv_proposal_ajax_send','fflanding_send_ajax_from_proposal');
// validate phone
function validating($phone){
  if(preg_match('/^[0-9]{11}+$/', $phone)) {
        return true;
  }
  return false;
 }
function fflanding_send_ajax_from_proposal(){
  #check_phone
  $phone = htmlspecialchars($_POST['phone']) ;
  if(validating($phone)){
    $data = [
      'post_type'=>'proposal',
      'post_title'=> $phone,
    ];
     wp_insert_post($data);
     var_dump("Ok");
    die();

   }
   var_dump('None');
   die();

 }






add_action( 'init', 'create_topics_nonhierarchical_taxonomy', 0 );

function create_topics_nonhierarchical_taxonomy() {

// Labels part for the GUI

  $labels = array(
    'name' => _x( 'Design', 'taxonomy general name' ),
    'singular_name' => _x( 'Design', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Design' ),
    'popular_items' => __( 'Popular Design' ),
    'all_items' => __( 'All Design' ),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __( 'Edit Design' ),
    'update_item' => __( 'Update Design' ),
    'add_new_item' => __( 'Add New Design' ),
    'new_item_name' => __( 'New Design Name' ),
    'separate_items_with_commas' => __( 'Separate Design with commas' ),
    'add_or_remove_items' => __( 'Add or remove Design' ),
    'choose_from_most_used' => __( 'Choose from the most used Design' ),
    'menu_name' => __( 'Design' ),
  );

// Now register the non-hierarchical taxonomy like tag

  register_taxonomy('Design','portfolio',array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
  ));
}


	function get_all_portfolio(){
		$args = array(
			'orderby'     => 'date',
			'order'       => 'DESC',
        'post_type'   => 'portfolio'
		);

		return get_posts($args);
  }
   function display_port(){
    $args = array(
        'post_type' => 'portfolio',
        'posts_per_page' => 5
        // Several more arguments could go here. Last one without a comma.
    );

    // Query the posts:
    $obituary_query = new WP_Query($args);

    // Loop through the obituaries:
    while ($obituary_query->have_posts()) : $obituary_query->the_post();
        // Echo some markup
        echo '<div class="swiper-slide">';
        // As with regular posts, you can use all normal display functions, such as
        the_title();
        // Within the loop, you can access custom fields like so:
        echo '</div>'; // Markup closing tags.
    endwhile;

    // Reset Post Data
    wp_reset_postdata();


  }

?>
