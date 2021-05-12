<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    $app->get('/hello', function (
        ServerRequestInterface $request,
        ResponseInterface $response
    ) {
        $response->getBody()->write('Hello, World!');

        return $response;
    });

    $app->get('/categorias', \App\Action\BajarDatos::class);
    $app->get('/juegos', \App\Action\SacarJuegos::class);
    $app->get('/preguntas', \App\Action\SacarPreguntas::class);
    $app->get('/respuestas', \App\Action\SacarRespuestas::class);

};