var config = {
	type: Phaser.CANVAS,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			useDamping: true,
			debug: false
		}
	},
	scale: {
		mode: Phaser.Scale.FIT,
		width: 720,
		height: 1280,
		autocenter: Phaser.Scale.CENTER_HORIZONTALLY,
		orientation: Phaser.Scale.Orientation.PORTRAIT
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

var cursors;
var pointer;

var player;
var scoreText;
var timerText;
var initialTimerText;
var tic;

var car;
var car2;
var cat;
var dog;

var score = 0;
var timer = 120.0;

var pressingLeft = false;
var pressingRight = false;
var pressingUp = false;
var pressingDown = false;
var buttonDown;
var buttonLeft;
var buttonRight;
var	buttonUp;

var loaded = false;

var canGoUp = false;
var goingUp = false;
var canDrop = false;

var frameCounter = 0;

var lastTime = 0;

var carTimer = 0;
var car2Timer = 0;
var dogTimer = 0;
var carMX = -600;
var carPX = 350;
var car2MX = -170;
var car2PX = 600;
var dogMX = -150;
var dogPX = 350;
var carNext = carMX;
var car2Next = car2MX;
var carInit = 3610;
var car2Init = 10;
var dogNext = dogPX;
var dogInit = 4350;

var lives = 6;

var hearts = [];
var half_hearts = [];

var hitTimer = 2;

var x5ammount = 3;
var x2ammount = 5;

var initialTimer = 3;

var idleAnim;
var grabAnim;

var end = false;

var vticket = '';
var vname = '';
var vlastname = '';
var vphone = '';
var vemail = '';

function preload ()
{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	if(urlParams.has('name') && urlParams.has('lastname') && urlParams.has('phone') && urlParams.has('email') && urlParams.has('ticket')){
		vticket = urlParams.get('ticket');
		vname = urlParams.get('name');
		vlastname = urlParams.get('lastname');
		vphone = urlParams.get('phone');
		vemail = urlParams.get('email');
		console.log(location.origin);
		$.ajax({
			url: '../../requests.php/',
			data: {
				action: 'readexisting',
				cache: false,
				ticket: vticket,
				name: vname,
				lastname: vlastname,
				phone: vphone,
				email: vemail,
			},
			type: 'post',
			success: function(output) {
				console.log('okay');
				var val = output;
				console.log(val);
				if (val.includes('ok')){
				}
				else{
					window.location.replace("/index.php");
				}
			}
		});
	}
	else {
		window.location.replace("/index.php");
	}
	if(window.innerHeight > window.innerWidth) //portrait
	{
		this.scale.lockOrientation(Phaser.Scale.Orientation.PORTRAIT);
		this.scale.setGameSize(720, 1280);
	}
	if(window.innerWidth > window.innerHeight) //landscape
	{
		this.scale.lockOrientation(Phaser.Scale.Orientation.LANDSCAPE);
		this.scale.setGameSize(1920, 1080);
	}
	if(!loaded)
	{
		this.load.image('background', '../../Assets/Game/stage/bg-lowres.jpg');
		this.load.image('city', '../../Assets/Game/stage/city-lowres.png')
		this.load.image('p1', '../../Assets/Game/stage/platforms/piso-1-base.png');
		this.load.image('p2', '../../Assets/Game/stage/platforms/piso-2-base.png');
		this.load.image('p3', '../../Assets/Game/stage/platforms/piso-3.png');
		this.load.image('p4', '../../Assets/Game/stage/platforms/piso-4.png');
		this.load.image('p5', '../../Assets/Game/stage/platforms/piso-5-base-fin.png');
		this.load.image('p6', '../../Assets/Game/stage/platforms/piso-6-fin.png');
		this.load.image('p7', '../../Assets/Game/stage/platforms/piso-7-fin.png');
		this.load.image('p8', '../../Assets/Game/stage/platforms/piso-8-fin.png');
		this.load.image('edif1', '../../Assets/Game/stage/platforms/edif-1.png');
		this.load.image('edif2', '../../Assets/Game/stage/platforms/edif-2.png');
		this.load.image('edif3', '../../Assets/Game/stage/platforms/edif-3.png');
		this.load.image('edif4', '../../Assets/Game/stage/platforms/edif-4.png');
		this.load.image('edif5', '../../Assets/Game/stage/platforms/edif-5.png');
		this.load.image('edif6', '../../Assets/Game/stage/platforms/edif-6.png');
		this.load.image('arbol1', '../../Assets/Game/stage/platforms/arbol-1.png');
		this.load.image('arbol2', '../../Assets/Game/stage/platforms/arbol-2.png');
		this.load.image('arbol3', '../../Assets/Game/stage/platforms/arbol-3.png');
		this.load.image('arbusto', '../../Assets/Game/stage/platforms/arbusto.png');
		this.load.image('banca', '../../Assets/Game/stage/platforms/banca.png');
		this.load.image('banner1', '../../Assets/Game/stage/platforms/banner-1.png');
		this.load.image('banner2', '../../Assets/Game/stage/platforms/banner-2.png');
		this.load.image('chest', '../../Assets/Game/stage/platforms/cofre.png');
		this.load.image('escalera1', '../../Assets/Game/stage/platforms/escalera-1.png');
		this.load.image('escalera2', '../../Assets/Game/stage/platforms/escalera-2.png');
		this.load.image('escalera3', '../../Assets/Game/stage/platforms/escalera-3.png');
		this.load.image('escalera4', '../../Assets/Game/stage/platforms/escalera-4.png');
		this.load.spritesheet('player', '../../Assets/Game/personaje/spritesheet.png', {frameWidth: 256, frameHeight: 256});
		this.load.image('pblanca', '../../Assets/Game/items/pastilla-white.png');
		this.load.image('pnaranja', '../../Assets/Game/items/pastilla-orange.png');
		this.load.image('proja', '../../Assets/Game/items/pastilla-red.png');
		this.load.image('pverde', '../../Assets/Game/items/pastilla-green.png');
		this.load.image('gato', '../../Assets/Game/items/gato.png');
		this.load.image('perro', '../../Assets/Game/items/perro.png');
		this.load.image('tictactCaja', '../../Assets/Game/items/cajaTicTac.png');
		this.load.image('autoNegro', '../../Assets/Game/items/auto-negro.png');
		this.load.image('autoAzul', '../../Assets/Game/items/auto-azul.png');
		this.load.image('tictac', '../../Assets/Game/items/etiquetaTicTac.png');
		this.load.image('corazon', '../../Assets/Game/items/heart.png');
		this.load.image('mcorazon', '../../Assets/Game/items/heart-half.png');
		this.load.image('x2', '../../Assets/Game/items/x2.png');
		this.load.image('x5', '../../Assets/Game/items/x5.png');
		this.load.image('flechaArriba', '../../Assets/Game/flecha-jump.png');
		this.load.image('flechaIzq', '../../Assets/Game/flecha-izq.png');
		this.load.image('flechaDer', '../../Assets/Game/flecha-der.png');
		this.load.image('nube1', '../../Assets/Game/stage/cloud-medium.png');
		this.load.image('nube2', '../../Assets/Game/stage/cloud-small.png');
		this.load.image('nube3', '../../Assets/Game/stage/cloud-fresh.png', {frameWidth: 256, frameHeight: 96});
		this.load.spritesheet('still', '../../Assets/Game/personaje/still/spritesheet.png', {frameWidth: 256, frameHeight: 256});
		this.load.spritesheet('grab', '../../Assets/Game/personaje/aliento/spritesheet.png', {frameWidth: 256, frameHeight: 96});
		this.physics.world.setBounds(0,0,5520,this.scale.height+100);
		loaded = true;
	}
}

function create ()
{
	this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(2.75).setDisplaySize(5520,this.scale.height);
	for(let i = 0; i <= 6; ++i)
	{
		if(i == 3)
			continue;
		this.add.image(400 + (i * 900), this.scale.height - 700, 'nube1');
		this.add.image(650 + (i * 900), this.scale.height - 650, 'nube2');
		this.add.image(900 + (i * 900), this.scale.height - 600, 'nube3');
	}
	this.anims.create({
		key: 'idleDefault',
		frames: this.anims.generateFrameNumbers('still', {start: 0, end: 4}),
		frameRate: 2,
		repeat: -1
	});

	this.anims.create({
		key: 'grabDefault',
		frames: this.anims.generateFrameNumbers('grab', {start: 0, end: 2}),
		frameRate: 6,
	});

	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'move',
		frames: this.anims.generateFrameNumbers('player', { start: 2, end: 5 }),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'jump',
		frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
		frameRate: 5
	});

	this.anims.create({
		key: 'climb',
		frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
		frameRate: 5,
		repeat: -1
	});


	platforms = this.physics.add.staticGroup();
	///////////////////////////1
	platform1 = platforms.create(0,this.scale.height - 90, 'p1').setOrigin(0,0).setScale(.8,.7);
	platform1.body.setSize(1280, 80, true);
	platform1.refreshBody();
	platform1.body.checkCollision.down = false;
	platform1.body.checkCollision.left = false;
	platform1.body.checkCollision.right = false;
	this.add.image(200, this.scale.height - 750, 'edif1').setOrigin(0, 0).setScale(.7,.7);
	this.add.image(100, this.scale.height - 275, 'arbol1').setOrigin(0, 0).setScale(.6,.6);
	this.add.image(700, this.scale.height - 275, 'arbol1').setOrigin(0, 0).setScale(.6,.6);
	this.add.image(800, this.scale.height - 130, 'banca').setOrigin(0, 0).setScale(.6,.6);
	///////////////////////////2
	platform2 = platforms.create(1125,this.scale.height - 90, 'p2').setOrigin(0,0).setScale(1,.72);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	this.add.image(1150, this.scale.height - 350, 'edif2').setOrigin(0, 0).setScale(.8,.8);
	this.add.image(1170, this.scale.height - 515, 'banner1').setOrigin(0, 0).setScale(.7,.7);
	///////////////////////////3
	platform2 = platforms.create(1730,this.scale.height - 90, 'p2').setOrigin(0,0).setScale(.9,.72);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	platform3 = platforms.create(1800,this.scale.height - 144, 'p3').setOrigin(0,0).setScale(.7,.68);
	platform3.body.setSize(512, 80, true);
	platform3.refreshBody();
	platform3.body.checkCollision.down = false;
	platform3.body.checkCollision.left = false;
	platform3.body.checkCollision.right = false;
	platform4 = platforms.create(1850,this.scale.height - 194, 'p4').setOrigin(0,0).setScale(.9,.9);
	platform4.body.setSize(512, 80, true);
	platform4.refreshBody();
	platform4.body.checkCollision.down = false;
	platform4.body.checkCollision.left = false;
	platform4.body.checkCollision.right = false;
	this.add.image(1870, this.scale.height - 437, 'arbol2').setOrigin(0, 0).setScale(.9,.9);
	///////////////////////////4
	platform2 = platforms.create(2300,this.scale.height - 90, 'p2').setOrigin(0,0).setScale(1.1,.72);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	this.add.image(2680, this.scale.height - 367, 'arbol3').setOrigin(0, 0).setScale(.7,.7);
	platform2 = platforms.create(2400, this.scale.height - 230, 'edif3').setOrigin(0, 0).setScale(.6,.6);
	platform2.refreshBody();
	platform2.flipX = true;
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	///////////////////////////5
	this.add.image(3690, this.scale.height - 745, 'banner2').setOrigin(0, 0).setScale(.7,.7);
	platform1 = platforms.create(3035, this.scale.height - 635, 'edif4').setOrigin(0, 0).setScale(.7,.7);
	platform1.refreshBody();
	platform1.body.setSize(350, 50, false);
	platform1.body.checkCollision.down = false;
	platform1.body.checkCollision.left = false;
	platform1.body.checkCollision.right = false;
	platform1 = platforms.create(3310, this.scale.height - 655, 'edif1').setOrigin(0, 0).setScale(.7,.6);
	platform1.flipX = true;
	platform1.refreshBody();
	platform1.body.setSize(350, 50, false);
	platform1.body.checkCollision.down = false;
	platform1.body.checkCollision.left = false;
	platform1.body.checkCollision.right = false;
	platform1 = platforms.create(3610, this.scale.height - 525, 'edif5').setOrigin(0, 0).setScale(.7,.7);
	platform1.refreshBody();
	platform1.body.setSize(350, 50, false);
	platform1.body.checkCollision.down = false;
	platform1.body.checkCollision.left = false;
	platform1.body.checkCollision.right = false;
	platform1 = platforms.create(2950,this.scale.height - 90, 'p1').setOrigin(0,0).setScale(.9,.7);
	platform1.body.setSize(1280, 80, true);
	platform1.refreshBody();
	platform1.body.checkCollision.down = false;
	platform1.body.checkCollision.left = false;
	platform1.body.checkCollision.right = false;
	this.add.image(3260, this.scale.height - 275, 'arbol1').setOrigin(0, 0).setScale(.6,.6);
	this.add.image(3680, this.scale.height - 305, 'arbol1').setOrigin(0, 0).setScale(.7,.7);
	///////////////////////////6
	platform2 = platforms.create(4200,this.scale.height - 90, 'p2').setOrigin(0,0).setScale(.9,.72);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	platform4 = platforms.create(4320,this.scale.height - 190, 'p4').setOrigin(0,0).setScale(.9,.9);
	platform4.body.setSize(512, 80, true);
	platform4.refreshBody();
	platform4.body.checkCollision.down = false;
	platform4.body.checkCollision.left = false;
	platform4.body.checkCollision.right = false;
	platform3 = platforms.create(4270,this.scale.height - 144, 'p3').setOrigin(0,0).setScale(.7,.68);
	platform3.body.setSize(512, 80, true);
	platform3.refreshBody();
	platform3.body.checkCollision.down = false;
	platform3.body.checkCollision.left = false;
	platform3.body.checkCollision.right = false;
	platform3.flipX = true;
	this.add.image(4340, this.scale.height - 434, 'arbol2').setOrigin(0, 0).setScale(.9,.9);
	///////////////////////////7
	this.add.image(4780, this.scale.height - 310, 'p8').setOrigin(0, 0).setScale(1.8,1.5);
	this.add.image(4860, this.scale.height - 670, 'edif6').setOrigin(0, 0).setScale(2,2);
	platform2 = platforms.create(4850,this.scale.height - 450, 'p2').setOrigin(0,0).setScale(1.2,1.1);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	platform4 = platforms.create(4775,this.scale.height - 360, 'p7').setOrigin(0,0).setScale(1.95,.7);
	platform4.body.setSize(512, 80, true);
	platform4.refreshBody();
	platform4.body.checkCollision.down = false;
	platform4.body.checkCollision.left = false;
	platform4.body.checkCollision.right = false;
	platform4 = platforms.create(5130,this.scale.height - 203, 'p7').setOrigin(0,0).setScale(.7,.7);
	platform4.body.setSize(512, 80, true);
	platform4.refreshBody();
	platform4.body.checkCollision.down = false;
	platform4.body.checkCollision.left = false;
	platform4.body.checkCollision.right = false;
	platform3 = platforms.create(5070,this.scale.height - 143, 'p6').setOrigin(0,0).setScale(.7,.7);
	platform3.body.setSize(512, 80, true);
	platform3.refreshBody();
	platform3.body.checkCollision.down = false;
	platform3.body.checkCollision.left = false;
	platform3.body.checkCollision.right = false;
	platform2 = platforms.create(4770,this.scale.height - 90, 'p2').setOrigin(0,0).setScale(1.5,.72);
	platform2.body.setSize(512, 80, true);
	platform2.refreshBody();
	platform2.body.checkCollision.down = false;
	platform2.body.checkCollision.left = false;
	platform2.body.checkCollision.right = false;
	this.add.image(4820, this.scale.height - 415, 'arbol2').setOrigin(0, 0).setScale(1.2,1.2);
	this.add.image(5300, this.scale.height - 160, 'arbusto').setOrigin(0, 0).setScale(1.2,1.2);
	///////////////////////////
	floor = this.physics.add.sprite(0,this.scale.height, 'p1').setScale(100,.3).setVisible(false);
	floor.body.allowGravity = false;

	pills = this.physics.add.group();
	for(let i = 0; i < 33; i++)
	{
		let sprite;
		let randVal = Math.floor(Math.random() * 5);
		switch(randVal)
		{
			case 0:
			default:
				sprite = 'pblanca';
				break;
			case 1:
				sprite = 'pverde';
				break;
			case 2:
				sprite = 'proja';
				break;
			case 3:
				sprite = 'pnaranja';
				break;
		}
		pill = pills.create(560 + (100 * i), this.scale.height - (200 + Math.random() * 1000), sprite);
		pill.body.setSize(130, 60, true);
		pill.body.setOffset(0,80);
		pill.body.gravity = new Phaser.Math.Vector2(0,200);
		pill.setVelocityY(550);
		pill.state = 1;

	}

	heals = this.physics.add.group();
	heals.create(2500,300, 'tictac');
	heals.create(3400,300, 'tictac');
	chest = this.physics.add.image(5060,this.scale.height - 500, 'chest');
	chest.body.setImmovable(true);
	chest.body.allowGravity = false;
	chest.body.setSize(60, 20, true);
	chest.body.setOffset(0,75);
	chest.refreshBody();
	ladders = this.physics.add.group();
	ladder = ladders.create(3190, this.scale.height - 370, 'escalera1').setScale(.6,.72);
	ladder.body.allowGravity = false;
	ladder.setImmovable();
	ladder = ladders.create(3930, this.scale.height - 317, 'escalera2').setScale(.6,.72);
	ladder.body.allowGravity = false;
	ladder.setImmovable();
	ladder = ladders.create(5220, this.scale.height - 290, 'escalera3').setScale(.6,.42);
	ladder.body.allowGravity = false;
	ladder.setImmovable();
	ladder = ladders.create(5300, this.scale.height - 415, 'escalera4').setScale(.6,.45);
	ladder.body.allowGravity = false;
	ladder.setImmovable();

	player = this.physics.add.sprite(300,this.scale.height - 300, 'player').setScale(.4,.4);
	idleAnim = this.add.sprite(300, this.scale.height - 300, 'still').setScale(.4,.4);
	grabAnim = this.add.sprite(350,this.scale.height - 300, 'grab').setScale(.4,.4);
	player.body.setSize(160,256, false);
	player.body.setOffset(40,0);


	player.anims.play('idle');
	idleAnim.anims.play('idleDefault');
	grabAnim.anims.play('grabDefault');
	idleAnim.setVisible(false);
	grabAnim.setVisible(false);

	player.setCollideWorldBounds(true);
	player.body.setDragX(180);

	enemies = this.physics.add.group();
	cat = enemies.create(1900, this.scale.height - 390, 'gato').setScale(.4,.4);
	cat.body.allowGravity = false;
	car = enemies.create(3610, this.scale.height - 390, 'autoAzul').setScale(.5,.5);
	dog = enemies.create(4350, this.scale.height - 200, 'perro').setScale(.5,.5);
	car2 = enemies.create(50, this.scale.height - 160, 'autoNegro').setOrigin(0, 0).setScale(.4,.4);
	car2.flipX = true;
	catTrigger = this.physics.add.image(1670, this.scale.height - 150, 'gato');
	catTrigger.setVisible(false);
	catTrigger.body.allowGravity = false;

	this.physics.add.collider(enemies, platforms);
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(pills, platforms);
	this.physics.add.collider(heals, platforms);
	this.physics.add.collider(chest, platforms);
	this.physics.add.collider(player, chest, endgame, null, this);
	this.physics.add.overlap(player, heals, heal, null, this);
	this.physics.add.overlap(player, enemies, damage, null, this);
	this.physics.add.overlap(player, ladders, goUpLadder, null, this);
	this.physics.add.overlap(player, pills, collectPill, null, this);
	this.physics.add.overlap(player, catTrigger, dropCat, null, this);
	this.physics.add.overlap(player, floor, floorHit, null, this);

	initialTimerText = this.add.text(this.scale.width/2, this.scale.height/2 +100, '3', { fontFamily: '"8-BIT WONDER.TTF"', fontSize: '72px', fill: '#FFF' });
	cursors = this.input.keyboard.createCursorKeys();

	this.cameras.main.setBounds(0,0,5520,this.scale.height + 500);
	this.cameras.main.useBounds = true;
	this.cameras.main.startFollow(player, false, 1, 0);
	this.cameras.main.scrollY = 300;
	if(this.game.device.os.iOS)
		this.cameras.main.scrollY = 380;
	if(this.game.device.os.desktop)
		this.cameras.main.scrollY = 0;
	console.log(this.game.device);
	let value = 0;
	if(this.game.device.os.iOS)
	{
		buttonUp = this.add.image(120, this.scale.height + 100, 'flechaArriba').setInteractive().on('pointerdown', () => { pressingUp = true;}).on('pointerup', () => { pressingUp = false; }).on('pointerout', () => { pressingUp = false; }).setDisplaySize(150,150);
		buttonDown = this.add.image(220, this.scale.height + 100, 'flechaArriba').setInteractive().on('pointerdown', () => { pressingDown = true;}).on('pointerup', () => { pressingDown = false; }).on('pointerout', () => { pressingDown = false; }).setDisplaySize(150,150);
		buttonDown.angle = 180;
		buttonLeft = this.add.image(this.scale.width - 200, this.scale.height + 100, 'flechaIzq').setInteractive().on('pointerdown', () => { pressingLeft = true; }).on('pointerup', () => { pressingLeft = false; }).on('pointerout', () => { pressingLeft = false; }).setDisplaySize(150,150);
		buttonRight = this.add.image(this.scale.width - 100, this.scale.height + 100, 'flechaDer').setInteractive().on('pointerdown', () => { pressingRight = true; }).on('pointerup', () => { pressingRight = false; }).on('pointerout', () => { pressingRight = false; }).setDisplaySize(150,150);
		value = 90;
		half_hearts.push(this.add.image(this.scale.width - 100, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1,1));
		half_hearts.push(this.add.image(this.scale.width - 140, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1,1));
		half_hearts.push(this.add.image(this.scale.width - 180, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1,1));
		hearts.push(this.add.image(this.scale.width - 100, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1,1));
		hearts.push(this.add.image(this.scale.width - 180, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1,1));
		hearts.push(this.add.image(this.scale.width - 260, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1,1));
	}
	else {
		buttonUp = this.add.image(120, this.scale.height + 100, 'flechaArriba').setInteractive().on('pointerdown', () => { pressingUp = true;}).on('pointerup', () => { pressingUp = false; }).on('pointerout', () => { pressingUp = false; }).setDisplaySize(150,150);
		buttonDown = this.add.image(220, this.scale.height + 100, 'flechaArriba').setInteractive().on('pointerdown', () => { pressingDown = true;}).on('pointerup', () => { pressingDown = false; }).on('pointerout', () => { pressingDown = false; }).setDisplaySize(150,150);
		buttonDown.angle = 180;
		buttonLeft = this.add.image(this.scale.width - 200, this.scale.height + 100, 'flechaIzq').setInteractive().on('pointerdown', () => { pressingLeft = true; }).on('pointerup', () => { pressingLeft = false; }).on('pointerout', () => { pressingLeft = false; }).setDisplaySize(150,150);
		buttonRight = this.add.image(this.scale.width - 100, this.scale.height + 100, 'flechaDer').setInteractive().on('pointerdown', () => { pressingRight = true; }).on('pointerup', () => { pressingRight = false; }).on('pointerout', () => { pressingRight = false; }).setDisplaySize(150,150);
		half_hearts.push(this.add.image(this.scale.width - 100, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1.6,1.6));
		half_hearts.push(this.add.image(this.scale.width - 180, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1.6,1.6));
		half_hearts.push(this.add.image(this.scale.width - 260, this.cameras.main.scrollY + 80 + value, 'mcorazon').setScale(1.6,1.6));
		hearts.push(this.add.image(this.scale.width - 100, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1.6,1.6));
		hearts.push(this.add.image(this.scale.width - 180, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1.6,1.6));
		hearts.push(this.add.image(this.scale.width - 260, this.cameras.main.scrollY + 80 + value, 'corazon').setScale(1.6,1.6));
	}
	if(!this.game.device.os.desktop)
	{
		timerText = this.add.text(16, this.cameras.main.scrollY + 50 + value, '90:00', { fontFamily: '"8-BIT WONDER.TTF"', fontSize: '58px', fill: '#FFF', align: 'left' });
	}
	else {
		timerText = this.add.text(16, this.cameras.main.scrollY + 50 + value, '90:00', { fontFamily: '"8-BIT WONDER.TTF"', fontSize: '72px', fill: '#FFF', align: 'left' });
	}
	scoreText = this.add.text(this.scale.width-250, this.cameras.main.scrollY + 200 + value, '0', { fontFamily: '"8-BIT WONDER.TTF"', fontSize: '44px', fill: '#FFF' });
	tic = this.add.image(this.scale.width-150, this.cameras.main.scrollY + 220 + value, 'tictactCaja').setScale(1.3,1.3);
	timerText.setText('90:00');

	lives = 6;
}

var blink = false;

function update()
{
	pointer = this.input.pointer1;
	if(initialTimer > 0 && !end)
	{
		initialTimer = 4 - (this.time.now / 1000);
		initialTimerText.setText(initialTimer.toString().substring(0,1).replace('.',':'));
	}
	else if(timer > 0 && !end)
	{
		initialTimerText.setVisible(false);
		if((cursors.left.isDown || pressingLeft))
		{
			if(!goingUp)
			{
				if(player.body.onFloor())
					player.setVelocityX(-200);
				else
					player.setVelocityX(-120);
			}
			else
			{

			}
		}
		else if((cursors.right.isDown || pressingRight))
		{
			if(!goingUp)
			{
				if(player.body.onFloor())
					player.setVelocityX(200);
				else
					player.setVelocityX(120);
			}
			else
			{

			}
		}
		if ((cursors.up.isDown || pressingUp))
		{
			if(!canGoUp)
			{
				if(player.body.onFloor())
				{
					player.setVelocityY(-200);
					player.anims.play('jump');
				}
			}
			else
			{
				if(!goingUp && player.ladder != undefined && (player.y + player.displayHeight / 2)> (player.ladder.y - player.ladder.displayHeight / 2))
				{
					goingUp = true;
					player.y -= 5;
				}
			}
			if(goingUp && player.ladder != undefined && (player.y + player.displayHeight / 2) > (player.ladder.y - player.ladder.displayHeight / 2))
			{
				player.y -= 2;
				canDrop = true;
			}
		}
		if((cursors.down.isDown || pressingDown))
		{
			if(canGoUp && !goingUp && (player.ladder != undefined && (player.y + player.displayHeight / 2) < (player.ladder.y + player.ladder.displayHeight / 2)))
			{
				goingUp = true;
				if(player.y < (this.scale.height - 142))
					player.y += 5;
			}
			if(goingUp && (player.ladder != undefined && (player.y + player.displayHeight / 2) < (player.ladder.y + player.ladder.displayHeight / 2)))
			{
				if(player.y < (this.scale.height - 142))
					player.y += 2;
				canDrop = true;
			}
		}
		if(player.ladder != undefined){
			console.log(player.y )
			console.log((player.ladder.y - player.ladder.displayHeight / 2))
			console.log(player.y < (player.ladder.y - player.ladder.displayHeight / 2));
		}
		if((player.body.onFloor() && canDrop) ||
			(player.ladder != undefined && player.y <= (player.ladder.y - player.ladder.displayHeight / 2)) || (player.ladder != undefined && (player.y + player.displayHeight / 2) >= (player.ladder.y + player.ladder.displayHeight / 2)))
		{
			player.ladder = undefined;
			goingUp = false;
			canDrop = false;
		}
		if(player.body.velocity.x > 0)
		{
			if(player.body.onFloor() && player.anims.currentAnim.key != 'move')
				player.anims.play('move')
			player.flipX = false;
			idleAnim.setVisible(false);
		}
		else if(player.body.velocity.x < 0)
		{
			if(player.body.onFloor() && player.anims.currentAnim.key != 'move')
				player.anims.play('move')
			player.flipX = true;
			idleAnim.setVisible(false);
		}
		else if(player.body.velocity.x == 0 && player.body.onFloor() && player.anims.currentAnim.key != 'idle')
		{
			player.anims.play('idle');
			idleAnim.setVisible(true);
		}
		else if(goingUp && player.anims.currentAnim.key != 'climb')
		{
			player.anims.play('climb');
			idleAnim.setVisible(false);
		}
		carTimer += this.time.now - lastTime;
		car.x = Phaser.Math.Interpolation.SmoothStep(((carTimer / 1000) % 5) / 4, carInit, 3610 + carNext);
		if(car.x <= (3610 + carMX) + 50)
		{
			car.flipX = true;
			carInit = 3610 + carMX + 51;
			carNext = carPX;
			car.x = 3610 + carMX + 51;
			carTimer = 0;
		}
		else if(car.x >= (3610 + carPX) - 50)
		{
			car.flipX = false;
			carInit = 3610 + carPX - 51;
			carNext = carMX;
			car.x = 3610 + carPX - 51;
			carTimer = 0;
		}
		car2Timer += this.time.now - lastTime;
		car2.x = Phaser.Math.Interpolation.SmoothStep(((car2Timer / 1000) % 10) / 9, car2Init, 170 + car2Next);
		if(car2.x <= (170 + car2MX) + 60)
		{
			car2.flipX = false;
			car2Init = 170 + car2MX + 61;
			car2Next = car2PX;
			car2.x = 170 + car2MX + 61;
			car2Timer = 0;
		}
		else if(car2.x >= (170 + car2PX) - 50)
		{
			car2.flipX = true;
			car2Init = 170 + car2PX - 51;
			car2Next = car2MX;
			car2.x = 170 + car2PX - 51;
			car2Timer = 0;
		}

		dogTimer += this.time.now - lastTime;
		dog.x = Phaser.Math.Interpolation.SmoothStep(((dogTimer / 1000) % 5) / 5, dogInit, 4350 + dogNext);
		if(dog.x <= (4350 + dogMX) + 50)
		{
			dog.flipX = false;
			dogInit = 4350 + dogMX + 51;
			dogNext = dogPX;
			dog.x = 4350 + dogMX + 51;
			dogTimer = 0;
		}
		else if(dog.x >= (4350 + dogPX) - 50)
		{
			dog.flipX = true;
			dogInit = 4350 + dogPX - 51;
			dogNext = dogMX;
			dog.x = 4350 + dogPX - 51;
			dogTimer = 0;
		}
		if(cat.y >= this.scale.height)
			cat.setVisible(false);
		canGoUp = false;
		hitTimer -= (this.time.now - lastTime) / 1000;
		if(hitTimer > 0)
		{
			player.setVisible(blink);
			blink = !blink;
		}
		else
			player.setVisible(true);
		lastTime = this.time.now;
		timer = 94 - (this.time.now / 1000);
		if(timer >= 0)
			timerText.setText(timer.toString().substring(0,timer.toString().indexOf('.')));
	}
	else{
		endgame();
	}
	scoreText.x = this.scale.width - 130 + this.cameras.main.scrollX;
	tic.x = this.scale.width - 170 + this.cameras.main.scrollX;
	timerText.x = 50 + this.cameras.main.scrollX;
	buttonLeft.x = this.scale.width - 270 + this.cameras.main.scrollX;
	buttonRight.x = this.scale.width - 100 + this.cameras.main.scrollX;
	buttonUp.x = 100 + this.cameras.main.scrollX;
	buttonDown.x = 270 + this.cameras.main.scrollX;
	if(this.game.device.os.iOS)
	{
		half_hearts[0].x = this.scale.width - 100 + this.cameras.main.scrollX;
		half_hearts[1].x = this.scale.width - 180 + this.cameras.main.scrollX;
		half_hearts[2].x = this.scale.width - 260 + this.cameras.main.scrollX;
		hearts[0].x = this.scale.width - 100 + this.cameras.main.scrollX;
		hearts[1].x = this.scale.width - 180 + this.cameras.main.scrollX;
		hearts[2].x = this.scale.width - 260 + this.cameras.main.scrollX;
	}
	else {
		half_hearts[0].x = this.scale.width - 100 + this.cameras.main.scrollX;
		half_hearts[1].x = this.scale.width - 210 + this.cameras.main.scrollX;
		half_hearts[2].x = this.scale.width - 320 + this.cameras.main.scrollX;
		hearts[0].x = this.scale.width - 100 + this.cameras.main.scrollX;
		hearts[1].x = this.scale.width - 210 + this.cameras.main.scrollX;
		hearts[2].x = this.scale.width - 320 + this.cameras.main.scrollX;
	}
	idleAnim.x = player.x + 40;
	idleAnim.y = player.y - 60;
	grabAnim.x = player.x + 70;
	grabAnim.y = player.y - 10;

	if(grabAnim.anims.currentAnim.key != 'grabDefault' || !grabAnim.anims.isPlaying)
		grabAnim.setVisible(false);

}

function collectPill(player, pill)
{
	pill.disableBody(true, true);
	if(pill.data !== null)
		pill.getData('title').setVisible(false);
	score += pill.state;
	scoreText.setText(score.toString());
	grabAnim.setVisible(true);
	grabAnim.anims.play('grabDefault');
}

var notMoved = false;

function goUpLadder(player, ladder)
{
	canGoUp = true;
	player.ladder = ladder;
	if(goingUp)
	{
		player.x = ladder.body.center.x;
		player.body.stop();
		if(!notMoved)
		{
			if(player.y > ladder.y)
				player.y -= 7;
			else
				player.y += 7;
			notMoved = true;
		}
	}
	else
		notMoved = false;
}

function damage(player, enemy)
{
	if(hitTimer <= 0)
	{
		lives--;
		switch(lives)
		{
			case 5:
				hearts[0].setVisible(false);
				break;
			case 4:
				half_hearts[0].setVisible(false);
				break;
			case 3:
				hearts[1].setVisible(false);
				break;
			case 2:
				half_hearts[1].setVisible(false);
				break;
			case 1:
				hearts[2].setVisible(false);
				break;
			case 0:
				half_hearts[2].setVisible(false);
				endgame();
				break;
		}
		hitTimer = 1;
	}
}

function heal(player, healLogo)
{
	healLogo.disableBody(true,true);
	lives++;
	if(lives > 6)
		lives = 6;
	switch(lives)
	{
		case 6:
			hearts[0].setVisible(true);
			half_hearts[0].setVisible(true);
			break;
		case 5:
			hearts[0].setVisible(false);
			half_hearts[0].setVisible(true);
			break;
		case 4:
			half_hearts[0].setVisible(false);
			hearts[1].setVisible(true);
			break;
		case 3:
			hearts[1].setVisible(false);
			half_hearts[1].setVisible(true);
			break;
		case 2:
			half_hearts[1].setVisible(false);
			hearts[2].setVisible(true);
			break;
		case 1:
			hearts[2].setVisible(false);
			half_hearts[2].setVisible(true);
			break;
		case 0:
			half_hearts[2].setVisible(false);
			break;
	}
}

var firstTimeDrop = false;

function dropCat(player, catTrigger)
{
	if(!firstTimeDrop)
	{
		firstTimeDrop = true;
		window.setTimeout(catto, 1400);
	}
}

function catto()
{
	cat.body.allowGravity = true;
	cat.setVelocityX(-50);
}

function floorHit(player, floor)
{
	player.x = 300;
	player.y = this.scale.height - 300;
	damage();
}

function endgame()
{
	if(!end)
	{
		end = true;
		let t = 90.0 - timer;
		datet = new Date().toLocaleDateString();
		$.ajax({
			url: '../../requests.php',
			data: {
				action: 'addranking',
				name: vname,
				lastname: vlastname,
				date: datet,
				time: t.toString().slice(0,4),
				ticket: vticket,
				pills: score.toString(),
				phone: vphone,
				email: vemail
			},
			type: 'post',
			success: function(output) {
				console.log(output);
				window.location.replace("/?playerID=" + vname + "&time=" + t.toString().slice(0,4) + "&points=" + score.toString() + "&d=" + (lives <= 0).toString());
			}
		});
	}
}
