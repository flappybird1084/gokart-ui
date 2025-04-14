document.addEventListener('DOMContentLoaded', function() {

    var eStopped = false;

    var enableButton = document.getElementById('enable');
    var disableButton = document.getElementById('disable');
    var forwardButton = document.getElementById('forward');
    var backwardButton = document.getElementById('backward');

    enableButton.addEventListener('click', function () {
        if (!eStopped){
        createGhost(); // Show ghost animation: disable → enable
        enableButton.style.border = '2px solid black';
        disableButton.style.border = '2px solid white';
        disableButton.style.opacity = '0.5';
        enableButton.style.opacity = '1';
        setStatusEnabled();
        console.log('Feature enabled');
        }
    });

    disableButton.addEventListener('click', function() {
        createGhost('backward'); // Show ghost animation: enable → disable
        disableButton.style.border = '2px solid black';
        enableButton.style.border = '2px solid white';
        disableButton.style.opacity = '1';
        enableButton.style.opacity = '0.5';
        setStatusEnabled();
        console.log('Feature disabled');
    });

    forwardButton.addEventListener('click', function() {
        createGhost('forward');
        forwardButton.style.border = '2px solid black';
        backwardButton.style.border = '2px solid white';
        forwardButton.style.opacity = '1';
        backwardButton.style.opacity = '0.5';
    });

    backwardButton.addEventListener('click', function() {
        createGhost('rewind');
        backwardButton.style.border = '2px solid black';
        forwardButton.style.border = '2px solid white';
        backwardButton.style.opacity = '1';
        forwardButton.style.opacity = '0.5';
    });

    function isEnabled(){
        return document.getElementById('enable').style.border === '2px solid black';
    }

    function isFoward(){
        return document.getElementById('forward').style.border === '2px solid black';
    }

    function setStatusEnabled(){
        const status = isEnabled();
        document.getElementById('status-enabled').innerText = status ? 'Status: Enabled' : 'Status: Disabled';
    }


    function createGhost(direction) {
        const ghost = document.createElement('div');
        switch (direction) {
            case 'backward':
                ghost.classList.add('ghost-backward');
                break;
            case 'forward':
                ghost.classList.add('ghost-forward');
                break;
            case 'rewind':
                ghost.classList.add('ghost-rewind');
                break;
            default:
                ghost.classList.add('ghost-transition');
        }
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 500);
    }

    document.querySelector('.emergency-stop-button').addEventListener('click', function () {
        const button = this;
        const body = document.body;

        eStopped = true;
      
        // Add the strobe class
        disableButton.dispatchEvent(new Event('click')); // Trigger the disable button click event
        forwardButton.dispatchEvent(new Event('click')); // Trigger the forward button click event

        body.classList.add('strobe-effect');
        document.getElementById('status-enabled').innerText = status ? 'Status: Enabled' : 'Status: Emergency Stop';

      
        // Remove it after 4 seconds
        setTimeout(() => {
          body.classList.remove('strobe-effect');
        }, 1500);
      });

      const resetButton = document.getElementById("reset");
  const resetFill = document.getElementById("resetFill");
  let holdTimeout;
  let isHeldLongEnough = false;

  resetButton.addEventListener("mousedown", () => {
    resetFill.style.transition = "height 2s linear";
    resetFill.style.height = "100%";

    holdTimeout = setTimeout(() => {
      isHeldLongEnough = true;
        // Call your reenabling code here
        console.log("Re-enabling system...");
        eStopped=false;

        disableButton.dispatchEvent(new Event('click')); // Trigger the disable button click event
        document.body.style.backgroundColor = "lightgreen"; // Reset background color

        setTimeout(() => {
          document.body.style.backgroundColor = ""; // Reset background color after 2 seconds
        }, 2000);

      // Example: reenablingFunction();
    }, 2000);
  });

  resetButton.addEventListener("mouseup", () => {
    clearTimeout(holdTimeout);
    if (!isHeldLongEnough) {
      // Reset fill
      resetFill.style.transition = "height 0.2s ease-out";
      resetFill.style.height = "0%";
    }
    isHeldLongEnough = false;
  });

  resetButton.addEventListener("mouseleave", () => {
    clearTimeout(holdTimeout);
    resetFill.style.transition = "height 0.2s ease-out";
    resetFill.style.height = "0%";
    isHeldLongEnough = false;
  });
});