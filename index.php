<php?

$rfc = 'VISM050511HGRNLRA6';
$dato = str_split($rfc);

//var_dump($dato);

//for($x=4; $x<=5; $x++){
  //echo $dato[$x];
//}

if($dato[10]=='H'){
    echo 'Hombre';
}
else{
    echo 'MUjer';
}
?>