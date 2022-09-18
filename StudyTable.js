


Status = "";
stab_img = "";
objects = [];

function preload(){
    tab_img = loadImage("wooden-study-table-500x500.jpg");
}

function setup(){
    canvas = createCanvas(800,800);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(tab_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(tab_img,0,0,800,800);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("obj_num").innerHTML = "There is "+objects.length+"object in the image from which cocossd model has detected "+objects.length+" object.";


            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x +70, objects[i].y +80);
            noFill();
            console.log(objects[i].x +","+ objects[i].y)
            console.log(objects[i].width +","+ objects[i].height)
            stroke("#fc0303");
            rect(objects[i].x +70, objects[i].y +80, objects[i].width, objects[i].height);
        }
    }
}