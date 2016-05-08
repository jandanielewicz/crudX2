<?php
//error_reporting(0);

require_once 'Connection.php';

abstract class Base {

    protected $value = null;
    protected $data = null;
    protected $id = null;
    protected $database = null;
    protected $table = null;

    public function __construct(array $options = null, PDO $database = null) {

        if (count($options)) {
            $this->setOptions($options);
        }

        $this->config['adapter'] = "mysql";
        $this->config['hostname'] = "localhost";
        $this->config['dbname'] = "crudx";
        $this->config['user'] = "root";
        $this->config['password'] = "";

        $connection = new Connection();
        $this->database = $connection->getConnection($this->config);

        if (method_exists($this, $_GET['action'])) {
            call_user_func(array($this, $_GET['action']));
        }
    }

    public function setOptions(array $options) {
        $methods = get_class_methods($this);

        foreach ($options as $key => $val) {
            $method = 'set' . ucfirst($key);

            if (in_array($method, $methods)) {
                $this->$method($val);
            }
        }
        return $this;
    }

    public function save() {
        if ($this->id) {
            return $this->_update();
        } else {
            return $this->_insert();
        }
    }

    public function find($id) {
        $db = $this->getDb();
        
        $obj = $db->prepare("SELECT * FROM " . $this->getTableName() . ' WHERE id=:id');
        $obj->bindValue(':id', $id);
        $obj->execute();

        return $obj->fetch(PDO::FETCH_ASSOC);
    }

    public function getDb() {
        return $this->database;
    }

    public function getTableName() {
        return $this->table;
    }

    public function fetchAll() {

        $limit = $_POST['limit'];
        $start = $_POST['start'];

        $dir = isset($_POST['dir']) ? $_POST['dir'] : 'ASC';
        $sort = isset($_POST['sort']) ? $_POST['sort'] : 'deadline_datetime';
        $order = $sort . ' ' . $dir;

        $db = $this->getDb();
        $sql = "SELECT * FROM " . $this->getTableName() . " ORDER BY :order";

        if ($start !== null AND $start !== '' AND $limit !== null AND $limit !== '') {
            $sql .= " LIMIT " . $start . " , " . $limit;
        }

        $obj = $db->prepare($sql);
        $obj->bindValue(":order", $order);
        $obj->execute();

        $sql = "SELECT COUNT(*) AS total FROM " . $this->getTableName();
        $total = $db->query($sql)->fetch();

        echo json_encode(
            array(
                "data" => $obj->fetchAll(PDO::FETCH_ASSOC),
                "success" => true,
                "total" => $total['total']
            )
        );
    }

    public function delete() {

        $arrayToDos = json_decode($_POST['data']);

        if (is_array($arrayToDos)) {

            foreach ($arrayToDos as $todo) {

                $id = $todo->id;

                $db = $this->getDb();
                $obj = $db->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
                $obj->bindValue(":id", $id);

                $todoExclude = $obj->execute();
                if (!$todoExclude) {
                    break;
                }
            }

        } else {

            $id = $arrayToDos->id;

            $db = $this->getDb();
            $obj = $db->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
            $obj->bindValue(":id", $id);
            $todoExclude = $obj->execute();
        }

        $msg = $todoExclude ? 'Usunięto wpis' : 'Nie można usunąć wpisu';

        echo json_encode(
            array(
                "message" => $msg,
                "success" => $todoExclude
            )
        );
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        if (!is_null($this->id)) {
            throw new Exception('Nie można zmienić id');
        }

        $this->id = (int)$id;
    }

}