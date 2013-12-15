/**
 *	FStepper Example
 *	The Debate
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	A unending philosophical debate amongst the heavyweights
 *
 */


// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
include('../../distribution/scriptographer.folio.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// load folio
var f = folio;

// load FTime
var ftime = f.FTime;

var background;
var speakers = new Array(2);
var size;

var colors = [
	'#000000', // black
	'#FFFFFF', // white
	'#E94125', // red
	'#00BFF2', // blue
	'#FFDD00'  // yellow
];

// our speakers
var Kant;
var husserl;

// kant left[0]		kant right[1]
// husserl right[2]	husserl left[3]
var rasters = [];

// pre generated kant-ent (har har)
// http://www.diveintopython.net/xml_processing/index.html
// http://scriptographer.org/scripts/general-scripts/lorem-ipsum-generator/
var kantText = 'Therefore our experience and I assert that this is true stands in need of the never-ending regress in the series of empirical conditions. In view of these considerations the objects in space and time so regarded abstract from all content of a posteriori knowledge. Our understanding and we can deduce that this is true is just as necessary as the noumena by virtue of practical reason. The Ideal of human reason proves the validity of in particular the never-ending regress in the series of empirical conditions. As will easily be shown in the next section the Ideal is what first gives rise to our faculties and the Transcendental Deduction can not take account of in all theoretical sciences the never-ending regress in the series of empirical conditions. The discipline of natural reason may not contradict itself but it is still possible that it may be in contradictions with our analytic judgements but our sense perceptions in the case of philosophy exist in the never-ending regress in the series of empirical conditions. For these reasons there can be no doubt that the thing in itself in view of these considerations can be treated like the things in themselves as is evident upon close examination. As is proven in the ontological manuals it must not be supposed that the transcendental unity of apperception occupies part of the sphere of the Ideal of pure reason concerning the existence of the objects in space and time in general in all theoretical sciences necessity constitutes the whole content for general logic. By virtue of pure reason the Ideal exists in the transcendental unity of apperception on the other hand philosophy and Aristotle tells us that this is true can not take account of time. There can be no doubt that the Ideal is a body of demonstrated science and none of it must be known a posteriori in the case of our knowledge the phenomena thus are just as necessary as the objects in space and time. Whence comes the discipline of natural reason the solution of which involves the relation between the Ideal and natural causes? By means of analytic unity it is obvious that the Antinomies are just as necessary as the architectonic of pure reason. In all theoretical sciences the manifold abstracts from all content of a posteriori knowledge. It is not at all certain that the architectonic of natural reason has lying before it our ideas by means of analytic unity. As will easily be shown in the next section the reader should be careful to observe that the Categories stand in need to the paralogisms of natural reason. It remains a mystery why the Categories should only be used as a canon for the things in themselves. Our a priori knowledge insomuch as the pure employment of the Ideal relies on our faculties is the mere result of the power of the architectonic of natural reason a blind but indispensable function of the soul because of our necessary ignorance of the conditions. In natural theology the Antinomies with the sole exception of the transcendental unity of apperception are by their very nature contradictory. It is not at all certain that the Categories have nothing to do with in the case of our understanding the Transcendental Deduction still our faculties can not take account of the thing in itself.';
var husserlText = 'The whole of conscious life perchance stands in contrast to the accidental being for me of noetic acts. Yet it must not be overlooked that the cogitatum is a clarification of the striving for cogitationes. I have the reflection that the phenomenon is given continuously as an objective unity in a multi-form and changeable multiplicity of cogitationes which belong determinately to it. We see in advance that we have not simply lost philosophy for phenomenology we retain it by orienting noetic acts according to accrued insights. We now shift the weight of transcendental evidence of multiplicities of pure evidence from the ego to multiplicities of transcendental subjectivity. By virtue of my free epoche with respect to the being of the experienced world the momentous fact is that we now shift the weight of transcendental evidence of the epoche since the form belonging to a systematic order of scientific evidence is part of this idea from the ego to the phenomenological epoche. Yet it must not be overlooked that the repeatable act of grounding of multiplicities of the whole of conscious life becomes modalized also in correlation with multiplicities of an object. The fact is evident even apodictically evident that noematic descriptions stand in contrast to the accident being for me of by a freely actualizable return to noetic acts transcendental subjectivity. Multiplicities of the phenomenological epoche in the natural attitude are unified synthetically by conscious conversion into the corresponding modes of consciousness. We can be sure that modes of consciousness are unified synthetically. By immersing ourselves meditatively in the general intentions of what is itself given we discover that we now shift the weight of transcendental evidence of cogitationes from the reflecting ego to an infinite horizon of approximations. The fact is that the phenomenon mediately becomes modalized also in correlation with scientific evidence. I now shift the weight of transcendental evidence of separated modes of consciousness owing to the instability and ambiguity of noetic acts from the ego to separated modes of consciousness. Noematic descriptions stand in contrast to the accident being for me of experiences. The fundamental form of this universal synthesis becomes adjusted to the whole of conscious life. Cogitationes become adjusted to by conscious conversion into the corresponding multiplicities of transcendental phenomenology experiences. The stream of modes of consciousness becomes modalized also in correlation with noematic descriptions. It becomes evident that by a freely actualizable return to the cogitatum we must not let ourselves be frightened by considerations of the Objective world and experiences. We can be sure that multiplicities of cognition are precisely what make critical decisions about immanent time at all possible by reconciling with transcendental phenomenology.';

var hitOptions = {
	fill: true,
	tolerance: 5
};
var swapColors = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	var typeSize = 45;
	size = 300;

	// Setup background
	background = new Path.Rectangle( artboard.bounds.topLeft, artboard.bounds.bottomRight );
	background.strokeColor = null;
	background.fillColor = new HexColor(colors[4]);

	// Get our images (left & right)
	rasters[0] = new PlacedFile( new java.io.File(script.directory+'/images/FStepperExample_Kant_left.png') );
	rasters[1] = new PlacedFile( new java.io.File(script.directory+'/images/FStepperExample_Kant_right.png') );
	rasters[2] = new PlacedFile( new java.io.File(script.directory+'/images/FStepperExample_Husserl_right.png') );
	rasters[3] = new PlacedFile( new java.io.File(script.directory+'/images/FStepperExample_Husserl_left.png') );

	for(var i=0; i<rasters.length; i++) {
		rasters[i].position.y = artboard.bounds.height;
	}


	/**
	 *
	 *	Kant
	 *
	 */
	Kant = new Speaker('Kant');
	Kant.image = rasters[0];

	var th = Math.abs(((artboard.bounds.rightCenter.y+(size*0.25))+size/2)-(artboard.bounds.height-95));
	Kant.bubble = new Path.FBubble(
		new Point(artboard.bounds.rightCenter.x,artboard.bounds.rightCenter.y+(size*0.25)),
		new Size(f.randomInt(size*0.75,size*1.25),size),
		new Size(size*0.13, th),
		'RIGHT'
	);
 	Kant.bubble.fillColor = new HexColor(colors[0]);
	Kant.bubble.strokeColor = new HexColor(colors[0]);

	// content
	Kant.text = new PointText( Kant.bubble.position );
	Kant.text.paragraphStyle = {
		justification: 'center'
	};
	Kant.text.characterStyle = {
		font: app.fonts['Century Schoolbook'],
		fontSize: typeSize,
		fillColor: new HexColor(colors[1])
	};
	Kant.textIndex = 0;

	// text
	Kant.paragraph = kantText.match( /[^\.!\?]+[\.!\?]+/g );
	Kant.content = Kant.paragraph[ f.randomInt(0,Kant.paragraph.length) ];

	// FStepper
	// based on sentence length
	Kant.move = new ftime.FStepper();
	Kant.move.setSeconds( Kant.content.split(' ').length*0.61 );

	Kant.fade = new ftime.FStepper();
	Kant.fade.setSeconds( 1 );

	Kant.color = new ftime.FStepper();
	Kant.color.setSeconds( 1 );

	// push to array
	speakers[0] = Kant;


	/**
	 *
	 *	Husserl
	 *
	 */
	Husserl = new Speaker('Husserl');
	Husserl.image = rasters[3];

	// bubble shape
	var th = Math.abs(((artboard.bounds.leftCenter.y-(size*0.45))+size/2)-(artboard.bounds.height-95));
	Husserl.bubble = new Path.FBubble(
		new Point(artboard.bounds.leftCenter.x,artboard.bounds.leftCenter.y-size*0.45),
		new Size(f.randomInt(size*0.75,size*1.25),size),
		new Size(size*0.13, th),
		'LEFT'
	);
	Husserl.bubble.fillColor = new HexColor(colors[1]);
	Husserl.bubble.strokeColor = new HexColor(colors[1]);

	// content
	Husserl.text = new PointText( Husserl.bubble.position );
	Husserl.text.position.y -= typeSize*2.5;
	Husserl.text.paragraphStyle = {
		justification: 'center'
	};
	Husserl.text.characterStyle = {
		font: app.fonts['Century Schoolbook'],
		fontSize: typeSize,
		fillColor: new HexColor(colors[0])
	};
	Husserl.textIndex = 0;

	// text
	Husserl.paragraph = husserlText.match( /[^\.!\?]+[\.!\?]+/g );
	Husserl.content = Husserl.paragraph[ f.randomInt(0,Husserl.paragraph.length) ];

	// FStepper
	// based on sentence length
	Husserl.move = new ftime.FStepper();
	Husserl.move.setSeconds( Husserl.content.split(' ').length*0.61 );

	Husserl.fade = new ftime.FStepper();
	Husserl.fade.setSeconds( 1 );

	Husserl.color = new ftime.FStepper();
	Husserl.color.setSeconds( 1 );

	// push to array
	speakers[1] = Husserl;
	// console.log( 'Husserl' );
	// console.log( Husserl );



	// Let's see who starts the 'debate'
	if( f.randomInt(0,2) == 1 ) {
		Kant.move.toggle();
		Kant.bubble.moveAbove( Husserl.bubble );
		Kant.text.moveAbove( Kant.bubble );
	}
	else {
		Husserl.move.toggle();
		Husserl.bubble.moveAbove( Kant.bubble );
		Husserl.text.moveAbove( Husserl.bubble );
	}

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	var sway   = Math.sin(event.time * 8);
	var bounce = Math.cos(event.time * 5) * 0.33;

	for(var i=0; i<speakers.length; i++) {
		var s = speakers[i];
		s.move.update( event.time );
		s.fade.update( event.time );
		s.color.update( event.time );

		var j = ((i-1) < 0) ? speakers.length-1 : 0;
		if(s.move.isDone()) {
			s.move.toggle();
			s.content = s.paragraph[ f.randomInt(0,s.paragraph.length) ];

			var index = (i == 0) ? 0 : 2;
			if(s.move.isOut()) {
				s.image = rasters[ index ];
				rasters[ index ].visible = true;
				rasters[ index+1 ].visible = false;
			}
			else {
				s.image = rasters[ index+1 ];
				rasters[ index ].visible = false;
				rasters[ index+1 ].visible = true;
			}

			var sj = speakers[j];
			sj.bubble.moveAbove(s.bubble);
			sj.text.moveAbove(sj.bubble);
			sj.image.moveAbove(sj.bubble);
		}

		s.image.position.x = s.bubble.segments[4].point.x;
		if(!s.move.isDone()) {
			s.image.position.y += bounce;
			s.image.position.x += sway;
		}

	}


	Draw();
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	for(var i=0; i<speakers.length; i++) {
		var s = speakers[i];

		s.textPindex = s.textIndex;

		// text
		var str = s.content;
		var word = str.split(' ');
		var d = s.move.delta;

		if( s.move.isOut ) s.textIndex = parseInt( Math.abs((d-1)*(word.length)) );
		else s.textIndex = parseInt(d*word.length);

		s.text.position.x = s.bubble.position.x;
		s.text.content = word[ s.textIndex ];

		// bubble
		var x;
		if(i % 2 == 0) {
			x = f.lerp(
				artboard.bounds.leftCenter.x + s.bubble.bounds.width*0.66,
				artboard.bounds.rightCenter.x - s.bubble.bounds.width*0.66,
				s.move.delta
			);
		}
		else {
			x = f.lerp(
				artboard.bounds.rightCenter.x - s.bubble.bounds.width*0.66,
				artboard.bounds.leftCenter.x + s.bubble.bounds.width*0.66,
				s.move.delta
			);
		}
		s.bubble.position.x = x;

	}

	//c.position = Kant.bubble.segments[4].point;


};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function reset() {

	Kant.bubble.position = artboard.bounds.rightCenter;
	Kant.bubble.position.y += Kant.bubble.bounds.height*0.25;
	Kant.text.position = Kant.bubble.position;

	Husserl.bubble.position = artboard.bounds.leftCenter;
	Husserl.bubble.position.y += -(Husserl.bubble.bounds.height*0.25)+((size*0.83)/2);
	Husserl.text.position = Husserl.bubble.position;
	Husserl.text.position.y -= (180/2);

	for(var i=0; i<rasters.length; i++) {
		rasters[i].position.y = artboard.bounds.height;
	}

};


// ------------------------------------------------------------------------
var Speaker = function(_name) {
	this.name = _name;

	// face
	this.image = null;

	// FSteppers
	this.move = null;
	this.fade = null;
	this.color = null;

	// bubble shape
	this.bubble = null;

	// content
	this.paragraph = '';
	this.content = '';
	this.text = null;

	this.textIndex = 0;
	this.textPindex = -1;
};



// ------------------------------------------------------------------------
// Invocation
// ------------------------------------------------------------------------
Setup();
Animate(true);
Draw();





