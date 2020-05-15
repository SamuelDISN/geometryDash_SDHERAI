/*Global var************************************************************************** */

var canvas = document.getElementById('geometryDashCanvas');
var ctx = canvas.getContext('2d');

var inputStart = document.getElementById('isContainerStartGame');
var isContainerAnimationCube = document.getElementById('isContainerAnimationCube');

const jumpGDTarget = document.getElementById('isContainer2dGD');

const ROS = document.getElementById('isRectObstacleSmall');
const ROM = document.getElementById('isRectObstacleMedium');

let heightRectSmallObstacle = ROS.offsetHeight; 
let widthRectSmallObstacle = ROS.offsetWidth;  
let yPosRectSmallObstacle=ROS.offsetTop; 
let xPosRectSmallObstacle = ROS.offsetLeft;

let heightRectMediumObstacle = ROM.offsetHeight; 
let widthRectMediumObstacle = ROM.offsetWidth;
let yPosRectMediumObstacle=ROM.offsetTop; 
let xPosRectMediumObstacle = ROM.offsetLeft;

const cubeTarget = document.getElementsByClassName('cubeFace');
var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
let changeColor = document.getElementById('isTextChangeColor');

var finalScoreValue = 100;
var cpt = 0; 
var duree = 120; 
var delta = Math.ceil((duree * 1000) / finalScoreValue);
var textScoreValue = document.getElementById("isScoreValue"); 

let textLoosing = document.getElementById('isTextLoosing')
let colision=false

/*Function doesn't call yet ******************************************************************** */
/********************************************************************************************** */
function countScoreValue() {
  textScoreValue.innerHTML = ++cpt;
  if( cpt < finalScoreValue ) { 
     setTimeout(countScoreValue, delta);
  }
}

function HideStart()
{
inputStart.style.display="none";
isContainerAnimationCube.remove();

ROS.style.animationPlayState = "running";
ROS.style.animationIterationCount="infinite";

ROM.style.animationPlayState = "running";
ROM.style.animationIterationCount="infinite";

document.getElementById('isTextInfArrow').style.display="inline-block";

}

function jumpGD()
{

document.addEventListener("keyup", function (event) 
  {
    if (event.keyCode == 38 ) 
    { 
      var audio = new Audio('song/songjump.mp3');
      audio.play();
      jumpGDTarget.classList.add('jump')
      setTimeout(() => {
        jumpGDTarget.classList.remove('jump')
      }, 550);
    }
  }
)
}


// Function to set small RandomObstacle*********************************************************************************
/********************************************************************************************** ***********************/
function SetPosSizeRectObstacleSmall()

{
  /*Parameters small obstacle*/
  let newHeightRectSmallObstacle = Math.random()*(45-30)+30; 
  let newWidthSmallRectObstacle = Math.random()*(25-5)+5; 
  let newYposRectSmallObstacle = ((-1)*newHeightRectSmallObstacle)-((-1)*heightRectSmallObstacle)
  let newXposRectSmallObstacle = (newWidthSmallRectObstacle-heightRectSmallObstacle)

/**Affecting its news Values ***************************/
  ROS.style.height= newHeightRectSmallObstacle+"px"; 
  ROS.style.width=newWidthSmallRectObstacle+"px";
  ROS.style.marginTop = newYposRectSmallObstacle +"px";
  ROS.style.marginLeft =newXposRectSmallObstacle

  ROS.style.animationPlayState ="running"

}

// Function to set Medium RandomObstacle*********************************************************************************
/********************************************************************************************** ***********************/
function SetPosSizeRectObstacleMedium()

{
  /*Parameters Medium obstacle*/
  let newHeightRectMediumObstacle = Math.random()*(45-30)+30; 
  let newWidthMediumRectObstacle = Math.random()*(25-5)+5; 
  let newYposRectMediumObstacle = ((-1)*newHeightRectMediumObstacle)-((-1)*heightRectMediumObstacle)
  let newXposRectMediumObstacle = (newWidthMediumRectObstacle-heightRectMediumObstacle)

/**Affecting news Values **************************** */
  ROM.style.height= newHeightRectMediumObstacle+"px"; 
  ROM.style.width=newWidthMediumRectObstacle+"px";
  ROM.style.marginTop = newYposRectMediumObstacle +"px";
  ROM.style.marginLeft =newXposRectMediumObstacle

  ROM.style.animationPlayState ="running"


}


// Detection of  Small obstacle colision***********************************************************************************************/
/********************************************************************************************** ***************************************/
setInterval(() => {
  let RosSizing = ROS.getBoundingClientRect();
  let isCube2d = document.getElementById('isCubeFaceGd2D')
  let colision=false;

      let GdTarget = isCube2d.getBoundingClientRect()

      if (GdTarget.x < RosSizing.x + RosSizing.width &&
          GdTarget.x + GdTarget.width > RosSizing.x &&
          GdTarget.y < RosSizing.y + RosSizing.height &&
          GdTarget.height + GdTarget.y > RosSizing.y) 
          {
          colision=true
          var audioLoosing = new Audio('song/loosingsong.mp3');
          audioLoosing.play();
          countScoreValue=0;
          
          ROS.style.display ="none";
          ROM.style.display ="none";
          textLoosing.style.display = "block";

        }
}, 50)

// Detection of  Medium obstacle colision***********************************************************************************************/
/********************************************************************************************** ***********************/
setInterval(() => {
  let RomSizing = ROM.getBoundingClientRect();
  let isCube2d = document.getElementById('isCubeFaceGd2D')
  let colision=false;


      let GdTarget = isCube2d.getBoundingClientRect()

      if (GdTarget.x < RomSizing.x + RomSizing.width &&
          GdTarget.x + GdTarget.width > RomSizing.x &&
          GdTarget.y < RomSizing.y + RomSizing.height &&
          GdTarget.height + GdTarget.y > RomSizing.y) 
          {
          colision=true
          var audioLoosing = new Audio('song/loosingsong.mp3');
          audioLoosing.play();
          countScoreValue=0;
          
          ROS.style.display ="none";
          ROM.style.display ="none";
          textLoosing.style.display = "block";


        }
}, 50)

// Set random color for each click on text***********************************************************************************************/
/********************************************************************************************** ***********************/
function randomColor()
{
  
  let newColor='#';

  /**Set randomColor */
  for ( var i = 0; i < 6; i++ ) {
    var x = Math.round( Math.random() * 14 );
    var y = hexValues[x];
    newColor +=y;
  }

  /**Affecting a random Color Value to target*************************** */
  document.getElementById('isTextChangeColor').style.color = newColor ;
  document.getElementById('isTextChangeColor').style.boxShadow = "0 0 10px" + newColor;

  document.getElementById('isCubeFaceGd2D').style.backgroundColor = newColor;
  document.getElementById('isCubeFaceGd2D').style.boxShadow = "0 0 50px" + newColor;

  document.querySelector('.frontL').style.background = newColor;
  document.querySelector('.topL').style.background = newColor;
  document.querySelector('.rightL').style.background = newColor;
  document.querySelector('.bottomL').style.background = newColor;
  document.querySelector('.leftL').style.background = newColor;
  document.querySelector('.backL').style.background = newColor;

  document.querySelector('.frontL').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.topL').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.rightL').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.bottomL').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.leftL').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.backL').style.boxShadow = "0 0 10px" + newColor,

  document.querySelector('.frontR').style.background = newColor;
  document.querySelector('.topR').style.background = newColor;
  document.querySelector('.rightR').style.background = newColor;
  document.querySelector('.bottomR').style.background = newColor;
  document.querySelector('.leftR').style.background = newColor;
  document.querySelector('.backR').style.background = newColor;

  document.querySelector('.frontR').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.topR').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.rightR').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.bottomR').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.leftR').style.boxShadow = "0 0 10px" + newColor;
  document.querySelector('.backR').style.boxShadow = "0 0 10px" + newColor;



}


/************************************************************************************ */
/**CALL FUNCTION****************************************************************************** */
/************************************************************************************ */

  /**Only true****************************************************** */
  changeColor.addEventListener('click', randomColor);
  /******************************************************** */


/*Function which call all event game after click on button Play*/
function PlayGame()
{
  var audioGame = new Audio('song/songofgame.mp3');
  audioGame.play();

  HideStart();
  setInterval(SetPosSizeRectObstacleSmall, 2000);
  setInterval(SetPosSizeRectObstacleMedium, 3500);
  setTimeout(countScoreValue, delta);
  jumpGD();

}

