<?php
	$servername = "localhost";
	$username = "root";
	$password = "";

	if(isset($_POST['day']) && !empty($_POST['day'])){
		echo $_POST['day'] . " " . $_POST['month'] . " " . $_POST['year'];
	}
	if(isset($_POST['action']) && !empty($_POST['action'])){
		switch($_POST['action']){
			case 'seeranking':
				$conn = mysqli_connect($servername, $username, $password);
				if (!$conn) {
					die("Connection failed: " . mysqli_connect_error());
				}
				$sql = "USE tictac";
				$conn->query($sql);
				$sql = "SELECT name, date, time FROM rankingsTable ORDER BY time desc, pills asc";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$rows = array();
					while($row = $result->fetch_assoc()) {
						$rows['rows'][] = $row;
					}
					echo json_encode($rows);
				} else {
				  	echo "0 results";
				}
				$conn->close();
				break;
			case 'addranking':
				$conn = mysqli_connect($servername, $username, $password);
				if (!$conn) {
					die("Connection failed: " . mysqli_connect_error());
				}
				$sql = "CREATE DATABASE IF NOT EXISTS tictac";
				if ($conn->query($sql) === TRUE) {
					$sql = "USE tictac";
					$conn->query($sql);
				  	$sql = "CREATE TABLE IF NOT EXISTS rankingsTable (
						id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
						name VARCHAR(30) NOT NULL,
						lastname varchar(30) NOT NULL,
						date VARCHAR(30) NOT NULL,
						time VARCHAR(10) NOT NULL,
						ticket varchar(30) NOT NULL,
						pills varchar(10) NOT NULL,
						phone varchar(15) NOT NULL,
						email varchar(30) NOT NULL
						)";
					if ($conn->query($sql) === TRUE) {
					  	$sql = "INSERT INTO rankingsTable
						(name, lastname, date, time, ticket, pills, phone, email)
						VALUES ('" .
							$_POST['name'] .
							"' ,'" .
							$_POST['lastname'] .
							"' ,'" .
							$_POST['date'] .
							"' ,'" .
							$_POST['time'] .
							"' ,'" .
							$_POST['ticket'] .
							"' ,'" .
							$_POST['pills'] .
							"' ,'" .
							$_POST['phone'] .
							"' ,'" .
							$_POST['email'] .
							"')";
						echo $sql;
						if ($conn->query($sql) === TRUE) {
							echo "Page added";
						} else {
						  	echo "Error adding to table: " . $conn->error;
						}
					} else {
					  	echo "Error creating table: " . $conn->error;
					}
				} else {
				  	echo "Error creating database: " . $conn->error;
				}
				echo "Connected successfully";
				$conn->close();
				break;
			case 'tryregister':
				$conn = mysqli_connect($servername, $username, $password);
				if (!$conn) {
					die("Connection failed: " . mysqli_connect_error());
				}
				$sql = "USE tictac";
				$conn->query($sql);
				$sql = "SELECT name FROM tickets WHERE tickets='" . $_POST['ticket'] . "'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						if($row['name'] != '')
						{
							$conn->close();
							die("ticket used");
						}
					}
					$sql = "UPDATE tickets SET
					name='" . $_POST['name'] .
					"' , lastname='" . $_POST['lastname'] .
					"' , phone='" .	$_POST['phone'] .
					"' , email='" .	$_POST['email'] .
					"' , dateofbirth='" .	$_POST['dateofbirth'] .
					"' WHERE tickets='" . $_POST['ticket'] . "'";
					if ($conn->query($sql) === TRUE) {
						echo "ok";
					} else {
						echo "Error adding to table: " . $conn->error;
					}
				} else {
					$conn->close();
					die("wrong ticket");
				}
				$conn->close();
				break;
			case 'readexisting':
				$conn = mysqli_connect($servername, $username, $password);
				if (!$conn) {
					die("Connection failed: " . mysqli_connect_error());
				}
				$sql = "USE tictac";
				$conn->query($sql);
				$sql = "CREATE TABLE IF NOT EXISTS rankingsTable (
					id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					name VARCHAR(30) NOT NULL,
					lastname varchar(30) NOT NULL,
					date VARCHAR(30) NOT NULL,
					time VARCHAR(10) NOT NULL,
					ticket varchar(30) NOT NULL,
					pills varchar(10) NOT NULL,
					phone varchar(15) NOT NULL,
					email varchar(30) NOT NULL,
					)";
				$conn->query($sql);
				$sql = "SELECT name,lastname,phone,email FROM tickets WHERE tickets='" . $_POST['ticket'] . "'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					$exists = FALSE;
					while($row = $result->fetch_assoc()) {
						if($row['name'] == '')
						{
							$conn->close();
							die("not registered");
						}
						if($row['name'] == $_POST['name'] && $row['lastname'] == $_POST['lastname'] && $row['phone'] == $_POST['phone'] &&
						$row['email'] == $_POST['email'])
						{
							$exists = TRUE;
						}
					}
					if ($exists === TRUE) {
						$sql = "SELECT name FROM rankingsTable WHERE ticket='" . $_POST['ticket'] . "'";
						$result = $conn->query($sql);
						if ($result->num_rows > 0) {
							die("already played");
						}
						echo "ok";
					} else {
						die("not registered");
					}
				} else {
					$conn->close();
					die("wrong ticket");
				}
				$conn->close();
				break;
			case 'default':
				echo("huh?");
				break;
		}
	}

?>
