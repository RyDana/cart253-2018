/*****************

Spiritual me
Dana Ryashy, 6 September 2018

Draws a character spiritually resembling the author of the code.

******************/

// setup()
//
// Sets a canvas and the different coloured shapes (ellipses, rectangles
//triangles and quads) necessary to form the image of a character.

function setup() {
    // Canvas and its colour setup
    createCanvas(500,500);
    background(181, 230, 29);
    background(161, 210, 09);

    // All the shapes are without strokes for esthetic purposes
    noStroke();

    //Easier to draw with shapes aligned on their center
    rectMode(CENTER);
    ellipseMode(CENTER);

    //Background colour gradient
    fill(255,255,255,15);//Translucent white
    //concentric circles
    ellipse(250,250,500);
    ellipse(250,250,450);
    ellipse(250,250,400);
    ellipse(250,250,350);
    ellipse(250,250,300);

    //Neck of character
    fill(235,190,120);//Dark skin colour
    rect(250, 310, 80, 30);

    //Shirt
    fill(0);//Dark shirt colour (black)
    ellipse(250, 415, 230, 180);//Shoulders
    rect(250, 325, 80, 15);//Turtle neck
    rect(250, 460, 130, 80);//Torso

    //Arms
    fill(235,200,120);//Dark skin color
    rect(160, 460, 50, 90);//Left arm
    rect(340, 460, 50, 90);//Right arm

    //Hair (1st layer)
    fill(100, 55, 40);//Dark hair colour (brown)
    ellipse(330,190,40,60); //Hair on right side of head
    rect(200,300,20,30);//Hair on left of neck
    rect(300,300,20,30);//Hair on right of neck

    //Hair highlights (1st layer)
    fill(134,78,52);//Light hair colour
    rect(194,300,8,30);//Left of neck
    rect(306,300,8,30);//Right of neck

    //Light skin colour
    fill(238,210,150);

    //Highlight on arms
    rect(165, 460, 30, 90);//left arm
    rect(345, 460, 40, 90);//right arm

    //Head
    ellipse(250,225,172);

    //Dark hair colour
    fill(100, 55, 40);

    //Hair (2nd layer)
    ellipse(265,140,140,85); //Hair on top of head
    ellipse(180,170,60); //Hair top-left
    ellipse(160,210,35,60); //Hair left

    //Eyebrows
    rect(220,201,45,10);//Left
    rect(290,201,45,10);//Right

    //Eyelashes
    ellipse(220,230,40);//Left
    ellipse(290,230,38);//Right

    //Mouth
    fill(217,08,16);
    ellipse(255,272,50,48);

    //Hiding half of the eyelash ellipses and half of the mouth ellipse
    fill(238,210,150); //Light skin colour
    rect(260,252,120,45);//Hiding block

    //Eyes
    fill(0); //Eye colour (black)
    ellipse(220,230,30);//Left eye
    ellipse(290,230,28);//Right eye

    //White colour
    fill(255);

    //Left eye reflections
    ellipse(225,225,10);//top
    ellipse(220,230,5);//bottom

    //Right eye reflections
    ellipse(295,225,10);//top
    ellipse(290,230,5);//bottom

    //Teeth
    rect(255,280,45,6);

    //Shirt stripes
    rect(160, 407, 50, 6);//Left arm
    rect(340, 407, 50, 6);//Right arm

    //Nose
    fill(235,190,120);//Dark skin colour
    ellipse(265,255,20);//tip
    ellipse(255,258,15);//nosdril
    triangle(252,258,252,220,265,258);//shaft

    //Hair highlights (2nd layer)
    fill(134,78,52);//Light hair colour
    ellipse(267,133,130,70); //Hair on top of head
    ellipse(183,163,45); //Hair top-left
    ellipse(165,205,25,40); //Hair left

    //Eyebrow highlights
    rect(220,198,45,5);//Left
    rect(290,198,45,5);//Right

    //Light shirt colour
    fill(20);

    //Turtle Neck highlight
    rect(260, 325, 60, 8);

    //Torso highlight
    ellipse(255,405,100,110);
    rect(255,460,100,110);

    //Left sleeve highlight
    ellipse(175,382,20,36);
    triangle(171,365,150,400,175,400);

    //right sleeve highlight
    ellipse(336,380,24);
    quad(324,380,324,400,358,400,347,376);

    //Cloth fold on Torso
    fill(0);//Dark shirt colour
    ellipse(245,415,105,50);//Fold shade
    fill(20);//Light shirt colour
    ellipse(252,410,95,45);//blocking out of excess fold shade
    quad(205,410,225,410,225,370,205,400);//blocking out of excess fold shade

}


// draw()
//
// Does nothing.

function draw() {

}
