<?php

class Connection {

    public function getConnection($cfg) {

        $dsn = $cfg['adapter'] . ":host=" . $cfg['hostname'] . "; dbname=" . $cfg['dbname'];

        try
        {
            return new PDO($dsn, $cfg['user'], $cfg['password']);
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }
    }

}