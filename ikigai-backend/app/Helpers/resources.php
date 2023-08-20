<?php


function convert_boolean($value): bool
{
   if(is_numeric($value) && (int)$value===1){
       return true;
   }
   if($value===true || $value==='true'){
       return true;
   }
   return false;
}


function valid_boolean($value): bool
{
    if(is_numeric($value) ){
        return in_array((int)$value,[0,1]);
    }
    return in_array($value,[true,'true',false,'false']);
}

function percentOfTotal($part, $total): float|int
{
    return $total ? round(($part / $total) * 100, 2) : 0;
}
