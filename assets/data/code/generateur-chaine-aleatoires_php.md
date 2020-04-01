# Générateur chaines uniques

```php
function gen_cle() {
    $jeu_caracteres = '0123456789abcdefghijklmnopqrstuvwxyz';
    $nb_caracteres = strlen($jeu_caracteres);
    $rand_string = '';
    for ($i = 0; $i < 20 - 3; $i++) {
        $rand_string .= $jeu_caracteres[rand(0, $nb_caracteres - 1)];
    }
    
    $timestamp = time();
    // récup' de trois caractères à partir du troisème en partant de la fin
    $fin_timstamp = substr($timestamp, -3, 3);

    return $rand_string . $fin_timstamp;
}
```