<?php
/*
Plugin Name: MyPixs
Plugin URI: http://bertramakers.com/mypixs/wordpress/
Description:
Version: 0.3
Author: Bert Ramakers
Author URI: http://bertramakers.com
License: GNU General Public License (GPL) version 3
*/

/* LICENSE :
    Copyright (C) 2007 Bert Ramakers

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

 /*
 // add the mypixs data in every head-tag
 */
 
 function mypixs_header() {
  $path = get_bloginfo("wpurl");
  $fullpath = $path . "/wp-content/plugins";
  ?>
  
  
   <!-- start mypixs, wp plugin -->
   <!-- get this @ bertramakers.com/mypixs/ -->
   <link href="<?php echo $fullpath; ?>/mypixs/mypixs.css" rel="stylesheet" type="text/css" />
   <script type="text/javascript" src="<?php echo $fullpath; ?>/mypixs/mypixs.js"></script>
   <!--[if gte IE 5.5]><![if lt IE 7]><style type="text/css">
    @import '<?php echo $fullpath; ?>/mypixs/iepng.css';
   </style><![endif]><![endif]-->  
   <script type="text/javascript">
    pathToCreateThumbFile = '<?php echo $fullpath; ?>/mypixs/createthumb.php'; // url to the createthumb file
    closeButtonUrl = '<?php echo $fullpath; ?>/mypixs/img/closebutton.png'; // url to the close button image
    loadImageUrl = '<?php echo $fullpath; ?>/mypixs/img/loader.gif'; // url to the load image
    prevButtonImage = '<?php echo $fullpath; ?>/mypixs/img/previousbutton.png'; // url to previous button
    nextButtonImage = '<?php echo $fullpath; ?>/mypixs/img/nextbutton.png'; // url to next button   
    mypixsAdminLoader = '<?php echo $fullpath; ?>/mypixs/admin_img/loader.gif';
    mypixsAdminDownloadPage = '<?php echo $fullpath; ?>/mypixs/downloadpage.php?url=';
   </script>
   <!-- end mypixs -->
   
   
  <?php
 }
 
 add_action("wp_head", "mypixs_header");
 
 
 /*
 // add quicktag to editor
 */
 
 function mypixs_quicktag() {
  
  $url = false;
  $urls = array("post.php", "post-new.php", "page-new.php", "bookmarklet.php");
  for ($u_index = 0; $u_index < count($urls); $u_index++) {
   $this_url = $urls[$u_index];
   if (strstr($_SERVER["REQUEST_URI"], $this_url) == true) {
    $url = true;
   }
  }
  
  if ($url == true) {
   mypixs_header();
   ?>
   
    <link href="<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/mypixs/admin.css" rel="stylesheet" type="text/css" />
    <!--[if gte IE 5.5]><![if lt IE 7]><style type="text/css">
     @import '<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/mypixs/ieadmin.css';
    </style><![endif]><![endif]--> 
    <script type="text/javascript" src="<?php echo get_bloginfo('wpurl'); ?>/wp-content/plugins/mypixs/admin.js"></script>
    <script type="text/javascript">
     
     var editor_toolbar = document.getElementById("ed_toolbar");
     
     if (editor_toolbar) {
      var newButton = document.createElement("input");
      newButton.type = 'button';
      newButton.value = 'MyPixs';
      newButton.onclick = addMyPixs;
      newButton.className = 'ed_button';
      newButton.title = 'MyPixs';
      newButton.setAttribute("id", "ed_mypixs");
      newButton.style.color = '#143650';
      editor_toolbar.appendChild(newButton);
     }
     
    </script>
    
   <?php
  }     
 }
 
 add_filter("admin_footer", "mypixs_quicktag");
 
?>