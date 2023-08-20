<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;

class ApiResponse
{
    public static function errorResponse($errors,$status_code=Response::HTTP_BAD_REQUEST): \Illuminate\Http\JsonResponse
    {
        if(!is_array($errors)){
            $errors=[$errors];
        }
        return response()->json(['success' => false, 'errors' =>$errors], $status_code);
    }

    public static function successResponse($message,array $additional_data=[],$status_code=Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        $response_data=['success' => true, 'message' =>$message];
        foreach ($additional_data as $k=>$data){
            $response_data[$k]=$data;
        }
        return response()->json($response_data, $status_code);
    }
}
