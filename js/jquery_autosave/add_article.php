<?php
//include DB configuration file
include('db_config.php');

//Connect to database
mysql_connect($db_host, $db_user, $db_password);
mysql_select_db($db_table);

//create new article on database
mysql_query("INSERT INTO `articles`(title, content) VALUES('', '')");
$article_id = mysql_insert_id();


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>JQuery Tutorial Demo: Auto-saving</title>
	<script type="text/javascript" src="jquery1.2.js"></script>
	<style type="text/css">
			body{font-family:Verdana, Arial, Helvetica, sans-serif; font-size:11px}
			h1, h2{font-size:20px;}
	</style>
</head>

<body>
	<script type="text/javascript">
	$(document).ready(function(){			
		autosave();
	});
	
	function autosave()
	{
		var t = setTimeout("autosave()", 20000);
						
		var title = $("#txt_title").val();
		var content = $("#txt_content").val();
			
		if (title.length > 0 || content.length > 0)
		{
			$.ajax(
			{
				type: "POST",
				url: "autosave.php",
				data: "article_id=" + <?php echo $article_id ?> + "&title=" + title + "&content=" + content,
				cache: false,
				success: function(message)
				{	
					$("#timestamp").empty().append(message);
				}
			});
		}
	} 
	</script>	
	<a href="http://jetlogs.org/2007/11/11/auto-saving-with-jquery/">&laquo; Code Explanation</a> | <a href="jquery_autosave.zip">Download Source</a>
	<h2>JQuery Tutorial Demo: Auto-saving with jQuery</h2>
	<p>Here is the demo on how to perform auto-save with jQuery</p>
	
	
	<form id="article_form" method="post" action="save.php">
		Title:<br />
		<input type="text" name="title" id="txt_title" size="50" maxlength="50"/><br />
		Content <i>(char limit is 255 for this demo)</i>:<br />
		<textarea name="content" id="txt_content" cols="50" rows="5"></textarea><br />
		<input type="hidden" name="article_id" value="<?php echo $article_id ?>" />
		<input type="submit" value="Save"/><br />
	</form>
	<div id="timestamp"></div>

</body>
</html>
