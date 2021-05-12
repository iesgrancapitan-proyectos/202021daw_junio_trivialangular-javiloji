<?php

namespace App\Domain\User\Repository;

use PDO;

/**
 * Repository.
 */
class UserCreatorRepository
{
    /**
     * @var PDO The database connection
     */
    private $connection;

    /**
     * Constructor.
     *
     * @param PDO $connection The database connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Insert user row.
     *
     * @param array $user The user
     *
     * @return int The new ID
     */
    public function insertUser(array $user): int
    {
        $row = [
            'username' => $user['username'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
        ];

        $sql = "INSERT INTO users SET 
                username=:username, 
                first_name=:first_name, 
                last_name=:last_name, 
                email=:email;";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }

    public function sacarDatos(){

        $sql = 'SELECT categoria FROM categorias';

        // return $this->connection->prepare($sql)->execute()->fetchAll();

        $consulta = $this->connection->prepare($sql);
        $consulta->execute();
        return $consulta->fetchAll();

    }

    public function sacarJuegos(){

        $sql = 'SELECT * FROM juego';

        // return $this->connection->prepare($sql)->execute()->fetchAll();

        $consulta = $this->connection->prepare($sql);
        $consulta->execute();
        return $consulta->fetchAll();

    }

    public function sacarPreguntas(){

        $sql = 'SELECT * FROM preguntas';

        // return $this->connection->prepare($sql)->execute()->fetchAll();

        $consulta = $this->connection->prepare($sql);
        $consulta->execute();
        return $consulta->fetchAll();

    }

    public function sacarRespuestas(){

        $sql = 'SELECT * FROM respuestas';

        // return $this->connection->prepare($sql)->execute()->fetchAll();

        $consulta = $this->connection->prepare($sql);
        $consulta->execute();
        return $consulta->fetchAll();

    }
}