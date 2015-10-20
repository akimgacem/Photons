/**
* @author Mark Kellogg
*/

var Particles = Particles || {};

//=======================================
// Base Modifier
//=======================================

Particles.Modifier = function () {

	this.runOnce = true;

}


//=======================================
// Random Modifier
//=======================================

Particles.RandomModifier = function ( params ) {

	Particles.Modifier.call( this );

	if( ! params ) params = {};

	if( params.isScalar === null || params.isScalar === undefined ) {

		params.isScalar = true;

	}

	this.isScalar = params.isScalar;

	if ( this.isScalar ) {

		this.offset = params.offset !== undefined && params.offset !== null ?  params.offset : 0 ;
		this.range = params.range !== undefined && params.range !== null ?  params.range : 0 ;
		this.runOnce = params.runOnce !== undefined && params.runOnce !== null ?  params.runOnce : true ;
		this.rangeType = undefined;
		this.rangeEdgeClamp = params.rangeEdgeClamp !== undefined && params.rangeEdgeClamp !== null ?  params.rangeEdgeClamp : false ;

	} else {

		this.offset = params.offset !== undefined && params.offset !== null ?  params.offset : new THREE.Vector3 (0, 0, 0 );
		this.range = params.range !== undefined && params.range !== null ?  params.range : new THREE.Vector3 (0, 0, 0 );
		this.runOnce = params.runOnce !== undefined && params.runOnce !== null ?  params.runOnce : true ;
		this.rangeType = params.rangeType || Particles.RangeType.Cube;
		this.rangeEdgeClamp = params.rangeEdgeClamp !== undefined && params.rangeEdgeClamp !== null ?  params.rangeEdgeClamp : false ;

	}

}

Particles.RandomModifier.prototype = Object.create( Particles.Modifier.prototype );

Particles.RandomModifier.prototype.initialize = function( target ) {

	return this.getValue( target );

}

Particles.RandomModifier.prototype.getValue = function( target ) {

	var val =  undefined;	

	if( this.isScalar ) {

		val =  Particles.Random.getRandomScalar( this.offset, this.range );

	}  else {

		if( this.rangeType == Particles.RangeType.Cube ) {

			val =  Particles.Random.getRandomVectorCube( target, this.offset, this.range, this.rangeEdgeClamp );

		} else if( this.rangeType == Particles.RangeType.Sphere ) {

			val =  Particles.Random.getRandomVectorSphere( target, this.offset, this.range, this.rangeEdgeClamp );

		}
		
	}

	return val;

}


//=======================================
// FrameSet Modifier
//=======================================

Particles.FrameSetModifier = function ( frameset ) {

	Particles.Modifier.call( this );

	this.frameset = frameset;
	this.runOnce = false;

}

Particles.FrameSetModifier.prototype = Object.create( Particles.Modifier.prototype );


Particles.FrameSetModifier.prototype.initialize = function( target ) {

	return this.frameset.interpolateFrameValues( 0, target );

}

Particles.FrameSetModifier.prototype.getValue = function( delta, target ) {

	return this.frameset.interpolateFrameValues( delta, target );

}

