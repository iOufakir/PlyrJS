let displayCode = false;
const loader = document.getElementById("loader");
let mutedImageUrl = "";
const settings = {};

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};
function init() {
  const autoplay = document.getElementById("autoplay");
  const controlBar = document.getElementById("control-bar");
  const muted = document.getElementById("muted");
  const thumbnail = document.getElementById("thumbnail-url");
  const mutedImage = document.getElementById("muted-image");
  const icon = document.querySelectorAll(".playIcon");
  var css = ".plyr__menu__container .plyr__control>span{color:#000 !important}";
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  icon.forEach((icon) => {
    icon.addEventListener("change", function () {
      settings.playIcon = icon.value;
      createNewIframe();
    });
  });

  let link = document.getElementById("videoLink");
  link.addEventListener("input", () => {
    createNewIframe();
  });

  autoplay.addEventListener("change", (event) => {
    if (autoplay.checked) {
      muted.closest("li").style.display = "block";
    } else {
      muted.checked = false;
      muted.closest("li").style.display = "none";
    }
    createNewIframe();
  });

  muted.addEventListener("change", (event) => {
    if (muted.checked) {
      mutedImage.closest("li").style.display = "block";
    } else {
      mutedImage.checked = false;
      mutedImage.closest("li").style.display = "none";
    }
    createNewIframe();
  });

  controlBar.addEventListener("change", () => {
    createNewIframe();
  });

  mutedImage.addEventListener("input", (event) => {
    // console.log(event.target.value)
    mutedImageUrl = event.target.value;
    createNewIframe();
  });

  Plyr.setup("#player");

  const frame = document.getElementById("w");

  document.querySelector(".createNewIframe").addEventListener("click", () => {
    displayCode = true;
    createNewIframe();
  });

  function createNewIframe() {
    Player.showLoader();
    const progressBarColor = document.getElementById("progress-bar-color");
    const controlBarColor = document.getElementById("control-bar-color");
    const height = document.getElementById("height");
    const width = document.getElementById("width");

    let link = document.getElementById("videoLink").value;

    settings.link = link;

    progressBarColor.addEventListener("input", (event) => {
      var progressBar = document.querySelectorAll(
        ".plyr--full-ui input[type=range], .plyr__control--overlaid"
      );
      for (var i = 0; i < progressBar.length; i++) {
        progressBar[i].style.color = progressBarColor.value;
      }
    });

    controlBarColor.addEventListener("input", () => {
      const controls = document.querySelectorAll(
        ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
      );

      document
        .querySelector(".plyr__control--overlaid")
        .style.setProperty("--plyr-color-main", controlBarColor.value);

      for (let i = 0; i < controls.length; i++) {
        controls[i].style.setProperty(
          "--plyr-range-thumb-background",
          controlBarColor.value
        );
      }

      var css = `.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]:before {background: var(--plyr-control-toggle-checked-background,var(--plyr-color-main,var(--plyr-color-main,${controlBarColor.value})))} .plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${controlBarColor.value}))) !important}`;
      document.getElementById("hover_color")?.remove();
      var style = document.createElement("style");
      style.id = "hover_color";
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      document.head.appendChild(style);
    });

    if (!link) {
      return;
    }

    // document.getElementById('videoLink').value = '';
    let html = `<div class="plyr__video-embed" id="player">
     <iframe src="${link}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>
     </div>\n`;

    frame.innerHTML = html;
    settings.autoplay = autoplay.checked;
    if (controlBar.checked) {
      settings.controls = [];
    } else {
      delete settings.controls;
    }
    settings.muted = muted.checked;
    if (!autoplay.checked) {
      settings.autoplay = muted.checked;
    }

    if (thumbnail.value) {
      settings.poster = thumbnail.value;
    }

    const w = width.value ? width.value : "16";
    const h = height.value ? height.value : "9";

    settings.ratio = w + ":" + h;

    const p = Plyr.setup("#player", settings)[0];

    if (thumbnail.value) {
      p.poster = thumbnail.value;
    }

    p.once("pause", (event) => {
      if (typeof settings.muted != "undefined") {
        if (settings.muted == true) {
          settings.muted = false;
          document.querySelectorAll("[data-plyr]").forEach((ele) => {
            if (ele.getAttribute("data-plyr") == "mute") {
              settings.volume = 1;
              ele.click();
            }
          });
          document.querySelector(".video-sound-overlay").remove();
          setTimeout(() => {
            settings.volume = 1;
            p.play();
            p.restart();
          }, 1000);
        }
      }
    });

    p.on("ready", (event) => {
      setTimeout(() => {
        var progressBar = document.querySelectorAll(
          ".plyr__control, .plyr--full-ui input[type=range], .plyr__control--overlaid"
        );
        for (var i = 0; i < progressBar.length; i++) {
          progressBar[i].style.color = progressBarColor.value;
        }

        const controls = document.querySelectorAll(
          ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
        );

        for (let i = 0; i < controls.length; i++) {
          controls[i].style.setProperty(
            "--plyr-range-thumb-background",
            controlBarColor.value
          );
        }
        settings.mutedImageUrl = mutedImageUrl;
        settings.progressBarColor = progressBarColor.value;
        settings.controlBarColor = controlBarColor.value;
        const dynamicScript = `<div class="plyr__video-embed" id="player"></div>
        \n<script id="player-script" src="https://ioufakir.github.io/PlyrJS/main.js?s=${window.btoa(
          JSON.stringify(settings)
        )}"></script>\n
        <script>
        document.addEventListener('DOMContentLoaded', function () {
            Player.run();
        });
        </script>`;
        if (displayCode) {
          const codeSnippet = document.createElement("pre");
          document.getElementById("codeSnippet").appendChild(codeSnippet);
          document.querySelector("pre").innerHTML =
            dynamicScript.toHtmlEntities();
        }
        if (settings.muted) {
          let overlay = `<div class="video-sound-overlay">`;
          overlay += `<div class="unmute-button">`;
          if (mutedImageUrl) {
            overlay += `<img src="${mutedImageUrl}" style="width:30%" alt="Click To Turn On Sound">`;
          }
          overlay += `</div>`;
          overlay += `</div>`;
          frame.firstChild.insertAdjacentHTML("beforeend", overlay);

          const style = `<style>.video-sound-overlay {
            width: 100%;
            height: 100%;
            background-image: url('${settings.playIcon}');
            background-repeat: no-repeat;
            position: absolute;
            left: 0%;
            right: 0%;
            top: 0%;
            bottom: 0%;
            margin: auto;
            background-size: 20%;
            background-position: center;
        }

        .video-sound-overlay .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -100px;
            margin-top: -100px;
        }
		
        .plyr iframe[id^='youtube'] {
            top: -50%;
            height: 200%;
        }

        iframe {
            pointer-events: none;
        }
        </style>`;
          document.head.insertAdjacentHTML("beforeend", style);
        }
        Player.hideLoader();
      }, 1000);
    });
  }
}

const Player = {
  showLoader: () => {
    loader.style.display = "flex";
  },
  hideLoader: () => {
    loader.style.display = "none";
  },
  run: () => {
    (async () => {
      await load_scripts([
        "https://cdn.plyr.io/3.7.3/plyr.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js",
      ]);

      const style = ["https://cdn.plyr.io/3.7.3/plyr.css"];
      style.forEach((s) => {
        const _s = document.createElement("link");
        _s.href = s;
        _s.rel = "stylesheet";
        document.head.appendChild(_s);
      });
      init();
    })();
  },
};

async function load_scripts(script_urls) {
  function load(script_url) {
    return new Promise(function (resolve, reject) {
      if (load_scripts.loaded.has(script_url)) {
        resolve();
      } else {
        var script = document.createElement("script");
        script.onload = resolve;
        script.src = script_url;
        document.head.appendChild(script);
      }
    });
  }
  var promises = [];
  for (const script_url of script_urls) {
    promises.push(load(script_url));
  }
  await Promise.all(promises);
  for (const script_url of script_urls) {
    load_scripts.loaded.add(script_url);
  }
}
load_scripts.loaded = new Set();
