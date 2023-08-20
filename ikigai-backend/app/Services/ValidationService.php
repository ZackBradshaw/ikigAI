<?php


namespace App\Services;


use App\Trait\Singleton;

class ValidationService
{
    use Singleton;

    private $success;
    private $errors=[];
    private $validatedItems = [];

    public function __construct()
    {
        $this->success = true;
    }

    public function errorEncountered($errors)
    {
        $this->success = false;
        $this->errors = $errors;
        return $this;
    }

    public function successfulCheck()
    {
        $this->success = true;
        return $this;
    }

    public function isSuccessfulCheck()
    {
        return $this->success;
    }

    public function getErrors()
    {
        return $this->errors;
    }

    public function addValidatedItems(array $items)
    {
        $this->validatedItems = array_merge($this->validatedItems, $items);
        return $this;
    }

    public function getArrayOfValidatedItems($keys){
        $foundItems=[];
        foreach ($keys as $key){
            foreach ( $this->validatedItems as $k=>$validatedItem){
                if($key===$k){
                    $foundItems[]=$validatedItem;

                }
            }
        }
        return $foundItems;
    }
    public function getAllValidatedItems(){
        return $this->validatedItems;
    }
    public function getValidatedItem($keys){
        if(is_array($keys)){
            $this->checkIfValidKeys($keys);
            return $this->getArrayOfValidatedItems($keys);
        }else {
            if (!isset($this->validatedItems[$keys])) {
                throw new \Exception('Invalid key in ValidationService. Keys passed:'.json_encode($keys));
            }
            return $this->validatedItems[$keys];
        }
    }


    private function checkIfValidKeys($keys){
        if (  array_diff_key(array_flip($keys), $this->validatedItems)) {
            throw new \Exception('Invalid key in ValidationService. Keys passed:'.json_encode($keys));
        }
    }
}
