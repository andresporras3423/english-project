<?php
$method = $_POST["postmethod"];
$params= $_POST["postparams"];

$servername = '<here_your_server>';
$username = '<here_your_username>';
$password = '<here_your_password>';
$dbName = '<here_your_database_name>';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbName);

function login() {
    $listParams =  json_decode($GLOBALS['params'], true);
    $mail = $listParams['mail'];
    $pass = $listParams['pass'];
    $sql = 'SELECT name, pass FROM users where mail="'.$mail.'"';
    $result = $GLOBALS['conn']->query($sql);
    if ($result->num_rows > 0) { 
    // output data of each row
    while($row = $result->fetch_assoc()) {
        if(password_verify($pass, $row['pass'])){
            echo '1';
        }
        else{
            echo '00';
        }
    }
    } else {
        echo '0';
    }
}

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} 
//
//
//
if ($method == 'method1'){

$sql = 'SELECT name, mail, pass FROM users';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $arr = array("name" => $row['name'], "mail" => $row['mail'], "pass" => $row['pass']);
        echo json_encode($arr);
    }
} else {
    echo '0 results';
}
}
//
//
//
else if($method == 'doLogin'){
    login();
}
//
//
//
else if($method == 'doSignUp'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $name = $listParams['name'];
    $pass = password_hash($listParams['pass'], PASSWORD_BCRYPT);
    $sql = 'insert into users (name, mail, pass) values ("'.$name.'", "'.$mail.'", "'.$pass.'")';
    $result = $conn->query($sql);
    if($result=='1'){
        $sql2 = 'insert into userVideo (user_mail, current_video) values ("'.$mail.'", 1)';
        $result2 = $conn->query($sql2);
        if($result2=='1'){
            login();
        }
    }
}
//
//
//
else if($method=='createWord'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $word = $listParams['word'];
    $translation = $listParams['translation'];
    $sql = 'INSERT into words (user_mail, word, translation) VALUES ("'.$mail.'","'.$word.'","'.$translation.'")';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='updateWord'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $word = $listParams['word'];
    $translation = $listParams['translation'];
    $sql = 'update words set translation="'.$translation.'" WHERE user_mail="'.$mail.'" and word="'.$word.'"';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='getWords'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $checked = $listParams['checked'];
$sql = 'SELECT word_id, word, translation FROM words where user_mail="'.$mail.'" ORDER BY word_id';
if($checked ==1){
    $sql = 'SELECT word_id, word, translation FROM words where user_mail="'.$mail.'" ORDER BY word';
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("word_id" => $row['word_id'], "word" => $row['word'], "translation" => $row['translation']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='searchWords'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $word = $listParams['word'];
    $translation = $listParams['translation'];
    $tSearch = $listParams['tSearch'];
$sql = 'SELECT word_id, word, translation FROM words WHERE ((word LIKE "'.$word.'%" and "'.$word.'"!="") or "'.$word.'"="") and ((translation LIKE "'.$translation.'%" and "'.$translation.'"!="") or "'.$translation.'"="") and user_mail="'.$mail.'"';
if($tSearch==1){
   $sql = 'SELECT word_id, word, translation FROM words WHERE ((word LIKE "%'.$word.'" and "'.$word.'"!="") or "'.$word.'"="") and ((translation LIKE "%'.$translation.'" and "'.$translation.'"!="") or "'.$translation.'"="") and user_mail="'.$mail.'"'; 
}
else if($tSearch==2){
   $sql = 'SELECT word_id, word, translation FROM words WHERE ((word LIKE "%'.$word.'%" and "'.$word.'"!="") or "'.$word.'"="") and ((translation LIKE "%'.$translation.'%" and "'.$translation.'"!="") or "'.$translation.'"="") and user_mail="'.$mail.'"'; 
}
else if($tSearch==3){
   $sql = 'SELECT word_id, word, translation FROM words WHERE ((word = "'.$word.'" and "'.$word.'"!="") or "'.$word.'"="") and ((translation = "'.$translation.'" and "'.$translation.'"!="") or "'.$translation.'"="") and user_mail="'.$mail.'"'; 
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("word_id" => $row['word_id'], "word" => $row['word'], "translation" => $row['translation']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='deleteWord'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $word = $listParams['word'];
    $sql = 'DELETE from words where user_mail="'.$mail.'" and word="'.$word.'"';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='nextWord'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
$sql = 'SELECT word, translation FROM words where user_mail="'.$mail.'" group by translation ORDER BY RAND() limit 4';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("word" => $row['word'], "translation" => $row['translation']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='saveTest'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $correct = $listParams['correct'];
    $total = $listParams['total'];
    $sql = 'INSERT into tests (user_mail, correct_questions, total_questions, date_test) VALUES ("'.$mail.'","'.$correct.'","'.$total.'", CURDATE())';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='getTests'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
$sql = 'SELECT date_test, correct_questions, total_questions FROM tests where user_mail="'.$mail.'" ORDER BY id_test DESC';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("date_test" => $row['date_test'], "correct_questions" => $row['correct_questions'], "total_questions" => $row['total_questions']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}

//
//
//
else if($method=='getCurrentVideo'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
$sql = 'select v.number_video, v.url_video from videos as v inner join userVideo as uv on v.number_video=uv.current_video where uv.user_mail="'.$mail.'"';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("number_video" => $row['number_video'], "url_video" => $row['url_video']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='changeVideo'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $sum = $listParams['sum'];
    
$sql0 = 'UPDATE userVideo as uv SET uv.current_video = CASE WHEN exists (select * from videos as v where number_video=(uv.current_video+('.$sum.'))) THEN (uv.current_video+('.$sum.')) ELSE uv.current_video END WHERE uv.user_mail="'.$mail.'"';

$result0 = $conn->query($sql0);
    
$sql = 'select v.number_video, v.url_video from videos as v inner join userVideo as uv on v.number_video=uv.current_video where uv.user_mail="'.$mail.'"';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("number_video" => $row['number_video'], "url_video" => $row['url_video']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='getList'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
$sql = 'SELECT words FROM listWords where userMail="'.$mail.'"';

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row['words'];
    }
} else {
    echo '0';
}
}
//
//
//
else if($method=='saveList'){
    $listParams =  json_decode($params, true);
    $mail = $listParams['mail'];
    $completeList = $listParams['completeList'];
$sql = 'INSERT INTO listWords ( userMail, words ) VALUES ("'.$mail.'", "'.$completeList.'") ON DUPLICATE KEY UPDATE words = "'.$completeList.'"';
$conn->query($sql);
}
//
//
//
else if($method=='getRepeated'){
    $listParams =  json_decode($params, true);
    $listWords = $listParams['listWords'];
    $mail = $listParams['mail'];
    $super_arr=array();
    foreach ($listWords as $word) {
        $sql = 'SELECT EXISTS ( select * from words where user_mail="'.$mail.'" and word="'.$word.'" limit 1) as repeated';
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
           while($row = $result->fetch_assoc()) {
               $arr = array("word" => $word, "repeated" => $row['repeated']);
               array_push($super_arr,$arr);
           }
       }
    }
    echo json_encode($super_arr);
}
//
//
//
else if($method=='createTopic'){
    $listParams =  json_decode($params, true);
    $topic = $listParams['topic'];
    $link = $listParams['link'];
    $topicLevel = $listParams['topicLevel'];
    $sql = 'INSERT into topics (topic, link, topicLevel) VALUES ("'.$topic.'","'.$link.'","'.$topicLevel.'")';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='updateTopic'){
    $listParams =  json_decode($params, true);
    $topic = $listParams['topic'];
    $link = $listParams['link'];
    $topicLevel = $listParams['topicLevel'];
    $sql = 'update topics set link="'.$link.'", topicLevel="'.$topicLevel.'" WHERE topic="'.$topic.'"';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
else if($method=='getTopics'){
    $listParams =  json_decode($params, true);
    $checked = $listParams['checked'];
$sql = 'SELECT topic_id, topic, link, topicLevel FROM topics ORDER BY topic_id';
if($checked ==1){
    $sql = 'SELECT topic_id, topic, link, topicLevel FROM topics ORDER BY topic';
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("topic_id" => $row['topic_id'], "topic" => $row['topic'], "link" => $row['link'], "topicLevel" => $row['topicLevel']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='searchTopics'){
    $listParams =  json_decode($params, true);
    $topic = $listParams['topic'];
    $link = $listParams['link'];
    $tSearch = $listParams['tSearch'];
    $topicLevel = $listParams['topicLevel'];
$sql = 'SELECT topic_id, topic, link, topicLevel FROM topics WHERE ((topic LIKE "'.$topic.'%" and "'.$topic.'"!="") or "'.$topic.'"="") and ((link LIKE "'.$link.'%" and "'.$link.'"!="") or "'.$link.'"="") and ((topicLevel LIKE "'.$topicLevel.'%" and "'.$topicLevel.'"!="") or "'.$topicLevel.'"="")';
if($tSearch==1){
   $sql = 'SELECT topic_id, topic, link, topicLevel FROM topics WHERE ((topic LIKE "%'.$topic.'" and "'.$topic.'"!="") or "'.$topic.'"="") and ((link LIKE "%'.$link.'" and "'.$link.'"!="") or "'.$link.'"="") and ((topicLevel LIKE "%'.$topicLevel.'" and "'.$topicLevel.'"!="") or "'.$topicLevel.'"="")'; 
}
else if($tSearch==2){
   $sql = 'SELECT topic_id, topic, link, topicLevel FROM topics WHERE ((topic LIKE "%'.$topic.'%" and "'.$topic.'"!="") or "'.$topic.'"="") and ((link LIKE "%'.$link.'%" and "'.$link.'"!="") or "'.$link.'"="") and ((topicLevel LIKE "%'.$topicLevel.'%" and "'.$topicLevel.'"!="") or "'.$topicLevel.'"="")'; 
}
else if($tSearch==3){
   $sql = 'SELECT topic_id, topic, link, topicLevel FROM topics WHERE ((topic = "'.$topic.'" and "'.$topic.'"!="") or "'.$topic.'"="") and ((link = "'.$link.'" and "'.$link.'"!="") or "'.$link.'"="") and ((topicLevel = "'.$topicLevel.'" and "'.$topicLevel.'"!="") or "'.$topicLevel.'"="")'; 
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     $super_arr=array();
    while($row = $result->fetch_assoc()) {
        $arr = array("topic_id" => $row['topic_id'], "topic" => $row['topic'], "link" => $row['link'], "topicLevel" => $row['topicLevel']);
        array_push($super_arr,$arr);
    }
    echo json_encode($super_arr);
} else {
    echo '0';
}
}
//
//
//
else if($method=='randomTopics'){
    $listParams = json_decode($params, true);
$quantity = $listParams['quantity'];
$listLevel = json_decode($listParams['listLevel']);
$filter='where ';
for ($i = 0; $i < count($listLevel); $i++) {
    //echo $listLevel[$i]->clicked;
    if($listLevel[$i]->clicked==1){
    $filter.='topicLevel = "'.$listLevel[$i]->index.'"  or  '; //please keep two spaces before and after or
    }
    }
    $filter = substr($filter,0,strlen($filter)-6); //if not element selected as true then remove where and choose from all the available options
$sql = 'SELECT topic_id, topic, link, topicLevel FROM topics '.$filter.' ORDER BY RAND() LIMIT '.$quantity;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
$super_arr=array();
while($row = $result->fetch_assoc()) {
$arr = array("topic_id" => $row['topic_id'], "topic" => $row['topic'], "link" => $row['link'], "topicLevel" => $row['topicLevel']);
array_push($super_arr,$arr);
}
echo json_encode($super_arr);
} else {
echo '0';
}
}
//
//
//
else if($method=='deleteTopic'){
    $listParams =  json_decode($params, true);
    $topic = $listParams['topic'];
    $sql = 'DELETE from topics where topic="'.$topic.'"';
    $result = $conn->query($sql);
    echo $result;
}
//
//
//
$conn->close();
?>