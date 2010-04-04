<?php
//include DB configuration file
include('db_config.php');

//Connect to database
mysql_connect($db_host, $db_user, $db_password);
mysql_select_db($db_table);


$title = mysql_real_escape_string($_POST['title']);
$content = mysql_real_escape_string($_POST['content']);
$id = (int)$_POST['article_id'];

//save contents to database
mysql_query("UPDATE `articles` SET title = '$title', content = '$content' WHERE id = '$id'");

//get timestamp
$result = mysql_query("SELECT timestamp FROM `articles` WHERE id = $id");
$timestamp = mysql_result($result, 0);

//output timestamp
echo 'Last Saved: ', $timestamp;
?>