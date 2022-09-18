Status = "";
sofa_img = "";
objects = [];

function preload(){
    sofa_img = loadImage("sofa.jpg");
}

function setup(){
    canvas = createCanvas(840,850);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(sofa_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    
    image(sofa_img,0,0,840,850);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x - 14, objects[i].y - 450);
            noFill();
            console.log(objects[i].x +","+ objects[i].y)
            console.log(objects[i].width +","+ objects[i].height)

            stroke("#fc0303");
            rect(objects[i].x - 14, objects[i].y - 450, objects[i].width  , objects[i].height );
        }
    }
}