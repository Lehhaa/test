<?php
    include_once ('head.php');
    include_once ('func/func.php');


    $obj = getJson('https://www.sknt.ru/job/frontend/data.json');
    $tariffs = $obj['tarifs'];
    $array2Str = array();


    echo '<div id="section-one" class="card-container">';
    foreach($tariffs as $key => $tariff) {
        $speed = $tariff['tarifs'][0]['speed'];
        $minMaxPrice = minMaxPrice($tariff['tarifs']);

        echo '<div class="card">';
        echo '<div class="card__title">Тариф "'.$tariff['title'].'"</div>';
        echo '<div data-card="'.$key.'" class="card__content card__second-page">';
        echo '<div class="card__speed ';colorSpeed($speed);echo ' ">'.$speed.' Мбит/с</div>';
        echo '<div class="card__price">'.$minMaxPrice['min'] . ' &ndash; ' . $minMaxPrice['max'] . ' &#8381;/мес'.'</div>';
        if (isset($tariff['free_options'])) {
            foreach ($tariff['free_options'] as $tariffOption) {
                echo '<div class="card__options">'.$tariffOption.'</div>';
            }
        }
        echo '</div>';
        echo '<div class="card__arrow"><img src="img/arrow.svg" alt=""></div>';
        echo '<div class="card__footer"><a href="'.$tariff['link'].'">Узнать подробнее на сайте www.sknt.ru</a></div>';
        echo '</div>';
        $array2Str[$key] = $tariff['tarifs'];
    }
    echo '</div>';
    echo '<div class="card-container section-two"></div>';


include_once 'footer.php';









