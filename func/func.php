<?php
    function getJson($linkJson){
        $json = file_get_contents($linkJson);

        return $obj = json_decode($json, true);
    }
    function minMaxPrice($tariff){
        $arrPrice = array();
        foreach ($tariff as $tariffOptions){
            array_push($arrPrice, $tariffOptions['price']/$tariffOptions['pay_period']);
        }
        $minPrice = min($arrPrice);
        $maxPrice = max($arrPrice);
        return array('min' => $minPrice, 'max' => $maxPrice);
    }
    function colorSpeed($speed){
        switch ($speed){
            case 50:
                echo 'card__speed_color-brown';
                break;
            case 100:
                echo 'card__speed_color-blue';
                break;
            case 200:
                echo 'card__speed_color-orange';
                break;
    }
}
