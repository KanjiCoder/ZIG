//:----------------------------------------------------------://
//:													         ://
//:  ZIG.JS ( ZIG == Zero_IDE_GAME )                         ://
//:                                                          ://
//:  Convention For This File :                              ://
//:                                                          ://
//:  	ALL_UPPERCASE_IS_A_FUNCTION                          ://
//:  	ALL_UPPERCASE_ALSO_CONSTANT                          ://
//:  	all_lowercase_is_a_variable                          ://
//:															 ://
//:----------------------------------------------------------://

	console.log( "[HELLO_WORLD_FROM:J_S/Z_I_G.JS]" );

	ZIG_DOM();

//:DOMAIN_OBJECT_MODEL_SETUP:================================://

const ZIG_DOM = function PRIVATE_ZIG_DOM(){

	console.log( "[BEG:ZIG_DOM]" );

    var bod_htm =( document.body );
    if(!bod_htm){
        bod_htm = document.createElement("BODY");
        document.body=( bod_htm );  
    };;

    var htm_htm =( document.documentElement );
    if(!htm_htm){
        alert( "ohfuckthen" );
    };;

    if( bod_htm === htm_htm ){ alert("[THEY_ARE_SAME]"); };

    $( document ).prop( "title" , "[Don't Sue Me KyootBot]" );
    
    var htm_j_q =$( htm_htm );
    var bod_j_q =$( bod_htm );


	console.log( "[END:ZIG_DOM]" );
};;
//:================================:DOMAIN_OBJECT_MODEL_SETUP://