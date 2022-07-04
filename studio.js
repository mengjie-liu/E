let about = document.getElementById("about");
let aboutText = document.getElementById("aboutText");
let toggleAbout = false;
let aboutClose = document.getElementById("aboutClose");
let cap = document.querySelector("#cap");
about.onclick = function (e) {
  e.preventDefault();
  if (toggleAbout == false) {
    aboutText.style.display = "block";
    toggleAbout = true;
    cap.classList.add("deactive");
    aboutClose.onclick = function (e) {
      e.preventDefault();
      aboutText.style.display = "none";
      toggleAbout = false;
      cap.classList.remove("deactive");
    };
  } else {
    aboutText.style.display = "none";
    toggleAbout = false;
    cap.classList.remove("deactive");
  }
};

let pause = document.getElementById("pause");
let togglePause = false;
let vd = document.getElementById("bgVideo");
pause.onclick = function (e) {
  e.preventDefault();
  if (togglePause == false) {
    vd.pause();
    pause.innerHTML = "Play";
    togglePause = true;
  } else {
    vd.play();
    pause.innerHTML = "Pause";
    togglePause = false;
  }
};

// let sp1 = document.getElementById("sp1");
// let sp05 = document.getElementById("sp05");
// let sp2 = document.getElementById("sp2");
let sps = document.querySelectorAll(".spds");
let speed;
let spdN = [0.5, 1, 2];
for (let i = 0; i < sps.length; i++) {
  sps[i].addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      vd.playbackRate = spdN[i];
      speed = vd.playbackRate;
      sps.forEach(function (ele) {
        ele.classList.remove("active");
      });
      this.classList.add("active");
    },
    false
  );
}

let works = document.getElementById("work");
let work = document.querySelectorAll(".work");
let list = document.querySelector("#workList");
let toggleWork = false;
let caption = document.getElementById("cap");
let captions = [
  "cast aluminum, cast bondo, ceramic bushings, machined&nbsp;plexiglass",
  "found car part, fan blade, electrical tape, found cable and&nbsp;wires",
  "found sassafras branch, 9 speaker drivers, various adhesives, found wood and bark",
  "cast aluminum, found plastic, cast bondo, ceramic bushings, found hardware, cable clamp, machined&nbsp;plexiglass",
  "drift log with rusted steel inclusions, found wood, fiberglass, total boat epoxy resin, 18’ sunfish parts, rusted crankshaft (unknown origin), aluminum composite panel, dried citrus fruits, caltrops, barnacles, plant matter, hoses from abandoned building",
  "oak branch, neon tube, transformer, plant matter, various viscous substances",
  "pine, steel, various adhesives, wires, amplifier, speakers, modified AM radio static (10:02), MP3 player",
  "plastic basin, chain hoist, contact microphone, amplifier and effect pedal, crushed wheel from a car, dead birds, sediment, extension cords, found aluminum, gas can, noise",
];
let startTime = [16.2, 35.27, 58, 95, 116.5, 240, 280, 295];
let finTime = [33, 53.5, 76, 115, 147.5, 270.5, 293, 318.5];

works.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    // if (toggleWork == false) {
    //   list.style.display = "block";
    //   toggleWork = true;
    // } else {
    //   list.style.display = "none";
    //   toggleWork = false;
    // }
    caption.innerHTML = "";
    // vd.play();
    vd.pause();
    vd.currentTime = 0;
    vd.play();
    // console.log(toggleWork);
  },
  false
);

for (let i = 0; i < work.length; i++) {
  work[i].addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      vd.pause();
      vd.currentTime = startTime[i];
      vd.play();
    },
    false
  );
}

let approxTime = 0;
vd.ontimeupdate = function () {
  let curTime = vd.currentTime;
  if (curTime !== approxTime) {
    approxTime = curTime;
    if (approxTime >= startTime[0] && approxTime < finTime[0]) {
      caption.innerHTML = captions[0];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[0].classList.add("active");
    } else if (approxTime >= startTime[1] && approxTime < finTime[1]) {
      caption.innerHTML = captions[1];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[1].classList.add("active");
    } else if (approxTime >= startTime[2] && approxTime < finTime[2]) {
      caption.innerHTML = captions[2];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[2].classList.add("active");
    } else if (approxTime >= startTime[3] && approxTime < finTime[3]) {
      caption.innerHTML = captions[3];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[3].classList.add("active");
    } else if (
      (approxTime >= startTime[4] && approxTime < finTime[4]) ||
      (approxTime >= 167 && approxTime <= 222.5)
    ) {
      caption.innerHTML = captions[4];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[4].classList.add("active");
    } else if (approxTime >= startTime[5] && approxTime < finTime[5]) {
      caption.innerHTML = captions[5];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[5].classList.add("active");
    } else if (approxTime >= startTime[6] && approxTime < finTime[6]) {
      caption.innerHTML = captions[6];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[6].classList.add("active");
    } else if (approxTime >= startTime[7] && approxTime < finTime[7]) {
      caption.innerHTML = captions[7];
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
      work[7].classList.add("active");
    } else {
      caption.innerHTML = "";
      work.forEach(function (ele) {
        ele.classList.remove("active");
      });
    }
  }
};
