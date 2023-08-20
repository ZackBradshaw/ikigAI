<?php


#[Pure] function getAuthCredentials($token, $user): stdClass
{
    $credentials = new stdClass();
    $credentials->access_token = $token;
    $credentials->token_type = 'Bearer';
    $credentials->email = $user->email;
    $credentials->phone = $user->phone;
    $credentials->name = $user->name;
    $credentials->id = $user->id;
    $credentials->survey_done = isset($user->Survey);

    return $credentials;
}

 function isApiRoute(): bool
{
    $prefix=request()->route()->getPrefix();
    if(!str_contains($prefix, '/')){
        return $prefix==='api';
    }
    $prefix_array=explode('/',$prefix);
    if(isset($prefix_array[0])){
        return $prefix_array[0]==='api';
    }
    return $prefix==='api';
}


function authUser(): ?\Illuminate\Contracts\Auth\Authenticatable
{
    return auth('sanctum')->user();
}
