<?php

require_once 'Db/Base.php';

class ToDos extends Base {

    protected $value = null;
    protected $data = null;
    protected $table = "todos";

    public function insert() {

        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $dbo = $db->prepare(
            'INSERT INTO ' . $this->getTableName() .
            ' (
                  title,
                  deadline_datetime
              )
              VALUES
              (
                  :title,
                  :deadline_datetime
              )'
        );

        $dbo->bindValue(':title', $data->title);
        $dbo->bindValue(':deadline_datetime', $data->deadline_datetime);

        $dbo->execute();

        $dbo->fetch(PDO::FETCH_ASSOC);
        $result = $db->lastInsertId();

        $msg = $result ? 'Dodano wpis' : 'Błąd przy dodawaniu nowego wpisu';

        $insert = $data;
        $insert->id = $result;

        echo json_encode(
            array(
                "success" => $result,
                "message" => $msg,
                "data" => $insert
            )
        );
    }

    public function update() {

        $data = json_decode($_POST['data']);

        $db = $this->getDb();
        $obj = $db->prepare('UPDATE ' . $this->getTableName() . ' SET title=:title, deadline_datetime=:deadline_datetime WHERE id=:id');
        $obj->bindValue(':id', $data->id);
        $obj->bindValue(':title', $data->title);
        $obj->bindValue(':deadline_datetime', $data->deadline_datetime);
        $result = $obj->execute();

        $msg = $result ? 'Dokonano edycji wpisu' : 'Błąd przy edycji wpisu';

        echo json_encode(
            array(
                "success" => $result,
                "message" => $msg,
                "data" => $data
            )
        );
    }
}

new ToDos();
