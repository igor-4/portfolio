<?php
  
  $file = $_POST['project-file'];
  $name = $_POST['project-name'];
  $url = $_POST['project-url'];
  $about = $_POST['about-newProject'];
  $data = array();

  if(!$name || !$url || !$about){
    $data['text']='Заполните выделенные поля';
  }else{
    $data['status']='ok';
    $data['text']='Данные переданы!';
  }

  header ('Content-Type: applcation/json');
  echo json_encode($data);
  exit;
  
?>