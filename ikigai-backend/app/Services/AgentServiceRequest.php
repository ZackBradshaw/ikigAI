<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class AgentServiceRequest
{
    public function __construct(private  $validation=new ValidationService)
    {
    }
        public function request($url,array $request_data): ValidationService
        {

            try {

                $response = Http::timeout(60)->asForm()->post($url,$request_data);

                return $this->processResponse($response);
            }catch (\Exception $e){
                fullLog("Error in TerminalInterfaceRequestService. Error: ".$e->getMessage());
                return $this->validation->errorEncountered('Request error. Error: '.$e->getMessage());
            }
        }
    private function processResponse($response): ValidationService
    {
        if($response->status() != Response::HTTP_OK){
            $this->logErrorResponse($response->body(),$response->status());
            return $this->errorResponse($response);
        }
        $response_data= $response->json();
        return $this->validation->addValidatedItems(compact('response_data'));
    }

    private function errorResponse(\Illuminate\Http\Client\Response $response): ValidationService
    {
        return $this->validation->errorEncountered('Request error. Response: '.$response->body().' Status: '.$response->status());
    }

    private function logErrorResponse(string $response,int $status): void
    {
        info("Response error from ".config('terminal_interface.base_url')." Response: ".$response.' Status'.$status);

    }
}
