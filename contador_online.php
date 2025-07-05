<?php
$arquivo = "online.txt";
$tempo_online = 300; // 5 minutos (300 segundos)

// Lê os IPs salvos
$usuarios = file_exists($arquivo) ? unserialize(file_get_contents($arquivo)) : [];

$ip = $_SERVER['REMOTE_ADDR'];
$agora = time();

// Remove IPs inativos
foreach ($usuarios as $user_ip => $ultimo_acesso) {
    if ($ultimo_acesso + $tempo_online < $agora) {
        unset($usuarios[$user_ip]);
    }
}

// Atualiza o IP atual
$usuarios[$ip] = $agora;

// Salva no arquivo
file_put_contents($arquivo, serialize($usuarios));

// Exibe o total online
echo "🟢 <strong>" . count($usuarios) . "</strong> usuário(s) online";
?>
