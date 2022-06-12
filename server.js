
const PORT     = process.env.PORT || 5000 ; 
const LIB_HTTP = require('http');  

LIB_HTTP.createServer(function( i_ask , i_giv ){

	i_giv.writeHead( 200 );
	i_giv.write( "hello world" );
	i_giv.end( );

}).listen( PORT );