<?php


function fullLog($log_message): void
{

    $log_message .= ' method invoked:' . debug_backtrace()[1]['function'] . ' on route: ' . \Route::currentRouteAction();
    info($log_message);
}
