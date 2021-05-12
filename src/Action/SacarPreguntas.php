<?php

namespace App\Action;

use App\Domain\User\Repository\UserCreatorRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SacarPreguntas
{
    private $UserCreatorRepository ;

    public function __construct(UserCreatorRepository  $UserCreatorRepository )
    {
        $this->UserCreatorRepository  = $UserCreatorRepository ;
    }

    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        // $data = (array)$request->getParsedBody();

        // // Invoke the Domain with inputs and retain the result
        // $userId = $this->userCreator->createUser($data);

        // // Transform the result into the JSON representation
        // $result = [
        //     'user_id' => $userId
        // ];

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($this->UserCreatorRepository->sacarPreguntas()));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }
}