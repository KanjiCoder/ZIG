
//:DATA_SECTION:=============================================://

const PORT     = process.env.PORT || 5000 ;         
const LIB_HTTP = require('http'); //:HyperTextTransferProto..://
const LIB_URL  = require('url' ); //:UniversalResourceLocator://
const LIB_FS   = require('fs'  ); //:File System ://
const LIB_QS   = require('node:querystring' );

const TXT = { "Content-Type": "text/javascript"          } ;
const PNG = { "Content-Type": "image/png"                } ;
const HTM = { "Content-Type": "text/html"                } ;
const J_S = { "Content-Type": "text/javascript"          } ;
const EXE = { "Content-Type": "application/x-msdownload" } ;
const CSS = { "Content-Type": "text/css"                 } ;

//:=============================================:DATA_SECTION://
//:FUNC_SECTION:=============================================://
          
LIB_HTTP.createServer(function ( i_ask, i_giv ) { 
    console.log('ask ', i_ask.url);    

    var sob ={
        ask : i_ask //: Request  ://
    ,   giv : i_giv //: Response ://
    ,   url : LIB_URL.parse( i_ask.url , true ).pathname
              .toUpperCase()
    ,   pam : LIB_QS.parse( i_ask.url , true ).query  

	,   url_seg : [ "[URL_PATH_SEGMENTS_NOT_LOADED]" ]
    };;

	//:-------------------------------------------://
    //: Create Parameter Dictionary If Not Exists ://
	//:-------------------------------------------://

    sob.pam = sob.pam ? sob.pam : { };
    sob.pam[ "default_key" ]=( "default_value" );

    console.log( "[LOG:sob.url]:" , sob.url );
    console.log( "[LOG:sob.pam]:" , sob.pam );

	var url_seg = [ ];
	url_seg = sob.url.split( "/" ).filter( n => n );
	sob.url_seg = url_seg ;
	
	if( "J_S" == sob.url_seg[ 0 ] ){

		var rfp = "." ;  
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;

		OKB_ServeFile_J_S( sob , rfp );

	}else
	if( "IMG" == sob.url_seg[ 0 ] ){

		//:----------------------------------------------://
		//: All Images Will Go Into The "IMG" Folder     ://
		//: ZERO ACCEPTIONS. KEEP SHIT SIMPLE STUPID!    ://
		//:----------------------------------------------://

		var rfp = "." ;  
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;

		OKB_ServeFile_PNG( sob , rfp );

	}else
	if( "HTM" == sob.url_seg[ 0 ] ){

		var rfp = "." ; //:@rfp@:RelativeFilePath://
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;

		OKB_ServeFile_HTM( sob , rfp );
	}else
    if( "CSS" == sob.url_seg[ 0 ] ){

		var rfp = "." ; //:@rfp@:RelativeFilePath://
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;

		OKB_ServeFile_CSS( sob , rfp );
    }else
    if( "EXE" == sob.url_seg[ 0 ] ){

		var rfp = "." ; 
		var m_i =( sob.url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			rfp += ( "/" + sob.url_seg[ s_i ] );
		};;

		OKB_ServeFile_EXE( sob , rfp );
    }else
	if( "/URL_SEG"   == sob.url ){

		sob.giv.writeHead( 200 );
		sob.giv.write( "[url_seg]..." );
		var m_i =( url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			sob.giv.write( sob.url_seg[ s_i ] );
		};;

		sob.giv.end( );
	}else
    if( "/SERVEFILE" == sob.url ){

        //:Serve Ourselves://
        OKB_ServeFile_TXT( sob , "./server.js" );

    }else
	if( "/ORIGINAL_DEFAULT" == sob.url ){
        sob.giv.writeHead( 200 , TXT );

        sob.giv.write( "[sob.url]:" +         sob.url   );
		sob.giv.write( "\n" );

        sob.giv.write( "[sob.pam]:" + 
            OKB_DictionaryToString( sob.pam ) );
		sob.giv.write( "\n" );

		//:ADDING THIS == ERROR, why?://
		sob.giv.write( "[sob.url_seg.length]:"
	            +String( sob.url_seg.length ) );;
		sob.giv.write( "[sob.url_seg]:..." );
		var m_i =( url_seg.length - 1 );
		for( var s_i = 0 ; s_i <=( m_i ) ; s_i ++ ){

			sob.giv.write( sob.url_seg[ s_i ] );
		};;
		
        sob.giv.end( );
    }else{
		//:----------------------------------------------://
		//: Default Behavior is to serve up the          ://
		//: kyootbot application page.                   ://
		//:----------------------------------------------://
		OKB_ServeFile_HTM( sob , "./HTM/K_B.HTM" );
	};;
   
}).listen(PORT);                                 

function OKB_DictionaryToString( pam ){

    var pam_str="[pam_str]:" ;
    
    if( pam ){
        var arr_k_v=( Object.entries( pam ) );
            
        for( var k_v of arr_k_v ){
        
            pam_str +=( "[k_v[0]]:" + k_v[ 0 ] );
            pam_str +=( "[k_v[1]]:" + k_v[ 1 ] );
        };;
    }else{
        pam_str += "[ITS_NULL]" ;
    };;
    
    return( pam_str );
}

function OKB_ServeFile_IMG( sob , rfp_img ){

	//:---------------------------------------://
	//:We are only going to support .PNG files://
	//:---------------------------------------://

	sob.giv.writeHead( 200 , TXT );
	sob.giv.write( "[ERR:USE:OKB_ServeFile_PNG]" );
	sob.giv.end( );
}

function OKB_ServeFile_PNG( sob , rfp_png , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_png,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[WE_DONE_FUCKED_UP_2022_05_25]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try To Serve Our 404 Image       ://
				//:----------------------------------://
				o_depth++;
				OKB_ServeFile_PNG(
					sob 
				,   "./IMG/404_512.PNG" 
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , PNG );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , PNG );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function OKB_ServeFile_J_S( sob , rfp_j_s , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_j_s,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[WE_DONE_FUCKED_UP_2022:J_S]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try To Serve Our 404 .J_S        ://
				//:----------------------------------://
				o_depth++;
				OKB_ServeFile_J_S(
					sob 
				,   "./J_S/404.J_S"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , J_S );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , J_S );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function OKB_ServeFile_HTM( sob , rfp_htm , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_htm,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[WE_DONE_FUCKED_UP_2022_05_25:346AM]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try To Serve Our 404 .HTM        ://
				//:----------------------------------://
				o_depth++;
				OKB_ServeFile_HTM(
					sob 
				,   "./HTM/404.HTM"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , HTM );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , HTM );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function OKB_ServeFile_CSS( sob , rfp_css , o_depth ){

	o_depth = ( o_depth ? o_depth : 1 );

    LIB_FS.readFile( rfp_css,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[YOU_FUCKED_UP_2022_CSS]" ;
			if( 1 == o_depth ){

				//:----------------------------------://
				//: Try To Serve Our 404 .CSS        ://
				//:----------------------------------://
				o_depth++;
				OKB_ServeFile_CSS(
					sob 
				,   "./CSS/404.CSS"
				,   o_depth
				);;
			}else{
				sob.giv.writeHead( 200 , CSS );
				sob.giv.end( cof , "utf-8"   );
			};;
        }else{
            sob.giv.writeHead( 200 , CSS );
			sob.giv.end( cof , "utf-8"   );
        };;
    });;
}

function OKB_ServeFile_EXE( sob , rfp_exe  ){

    var r_s = LIB_FS.createReadStream( rfp_exe );
    r_s.pipe( sob.giv );
}

function OKB_ServeFile_TXT( sob , rfp_txt ){

    LIB_FS.readFile( rfp_txt,function( obj_err , cof ){
    "use strict"

        if(obj_err){
            cof = "[WE_DONE_FUCKED_UP_2022_05_18]" ;
        }else{
            sob.giv.writeHead( 200 , TXT );
        };;

		sob.giv.end( cof , "utf-8"   );
    });;
}

//:=============================================:FUNC_SECTION://
//: COMMENTS_ARE_READ_LAST_OR_NEVER ************************ ://
/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ************************ ***
*** COMMENTS_ARE_READ_LAST_OR_NEVER ************************ ***

	@ask@ : My unconventional variable for ( request /req )
	@giv@ : My unconventional variable for ( response/res )
    
    @sob@ : State_Object_Bundle
    @mit@ : MimeType
    @cof@ : Contents_Of_File
    @rfp@ : Relative_File_Path
    @rfp_txt@ : RelativeFilePath_TXT ( text  file )
	@rfp_img@ : RelativeFilePath_IMG ( image file )
	@rfp_png@ : RelativeFilePath_PNG ( .PNG  file )

    @obj_err@ : Object_Error
	@o_depth@ : Optional Depth Value


*** ************************ COMMENTS_ARE_READ_LAST_OR_NEVER ***
*** ************************ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **/
//: ************************ COMMENTS_ARE_READ_LAST_OR_NEVER ://