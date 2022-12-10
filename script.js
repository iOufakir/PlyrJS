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
  const ctaCheckbox = document.querySelector("#cta");
  const ctaInputTitle = document.querySelector("#cta-input-title");
  const ctaInputUrl = document.querySelector("#cta-input-url");
  const ctaTimeTarget = document.querySelector("#cta-time-target");
  const ctaHeadline = document.querySelector("#cta-headline");
  const ctaHeadlineColor = document.querySelector("#cta-headline-color");
  const ctaBtnBackgroundColor = document.querySelector(
    "#cta-btn-background-color"
  );
  const ctaBtnTextColor = document.querySelector("#cta-btn-text-color");

  var css = `.plyr__menu__container .plyr__control>span{color:#000 !important}
  
  button.plyr__control--overlaid {
    padding: calc(var(--plyr-control-spacing,15px)*1.5);
    border-radius: 10%;
    padding-left: 45px;
    padding-right: 45px;
    }
    
    button.plyr__control--overlaid svg {
    left: 2px;
    position: relative;
    height: 30px;
    width: 30px;
    }
    `;

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

  ctaCheckbox.addEventListener("change", (e) => {
    if (ctaCheckbox.checked) {
      ctaInputTitle.closest("li").style.display = "block";
      ctaInputUrl.closest("li").style.display = "block";
      ctaTimeTarget.closest("li").style.display = "block";
      ctaHeadline.closest("li").style.display = "block";
      ctaHeadlineColor.closest("li").style.display = "block";
      ctaBtnBackgroundColor.closest("li").style.display = "block";
      ctaBtnTextColor.closest("li").style.display = "block";
    } else {
      ctaInputTitle.value = "";
      ctaInputUrl.value = "";
      ctaTimeTarget.value = "";
      ctaHeadline.value = "";
      ctaInputTitle.closest("li").style.display = "none";
      ctaInputUrl.closest("li").style.display = "none";
      ctaTimeTarget.closest("li").style.display = "none";
      ctaHeadline.closest("li").style.display = "none";
      ctaHeadlineColor.closest("li").style.display = "none";
      ctaBtnBackgroundColor.closest("li").style.display = "none";
      ctaBtnTextColor.closest("li").style.display = "none";
    }
    createNewIframe();
  });

  ctaInputTitle.addEventListener("input", (e) => {
    createNewIframe();
  });

  ctaHeadlineColor.addEventListener("change", (e) => {
    createNewIframe();
  });
  ctaBtnBackgroundColor.addEventListener("change", (e) => {
    createNewIframe();
  });
  ctaBtnTextColor.addEventListener("change", (e) => {
    createNewIframe();
  });

  ctaHeadline.addEventListener("input", (e) => {
    createNewIframe();
  });

  ctaInputUrl.addEventListener("input", (e) => {
    createNewIframe();
  });

  ctaTimeTarget.addEventListener("input", (e) => {
    const ctaModal = document.querySelector(".cta-modal");
    if (ctaModal) {
      ctaModal.remove();
    }
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
    let link = document.getElementById("videoLink").value;

    if (!link) {
      return;
    }

    Player.showLoader();
    const progressBarColor = document.getElementById("progress-bar-color");
    const controlBarColor = document.getElementById("control-bar-color");
    const height = document.getElementById("height");
    const width = document.getElementById("width");
    const ctaModal = document.querySelector(".cta-modal");
    if (ctaModal) {
      ctaModal.remove();
    }

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

      var css = `.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]:before {background: var(--plyr-control-toggle-checked-background,var(--plyr-color-main,var(--plyr-color-main,${controlBarColor.value})))} .plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${controlBarColor.value}))) !important} 

      button.plyr__control--overlaid{
        background-color:  ${controlBarColor.value}; 
      }
      
           `;
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

    let html = `<div data-plyr-provider="${
      link.includes("vimeo") ? "vimeo" : "youtube"
    }" class="plyr__video-embed" id="player" playsinline autoplay muted loop>
     <iframe src="${link}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&background=1&mute=1&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>
     </div>\n`;

    frame.innerHTML = html;
    settings.autoplay = autoplay.checked;

    settings.muted = muted.checked;
    if (!autoplay.checked) {
      settings.autoplay = muted.checked;
    }
    if (thumbnail.value) {
      settings.poster = thumbnail.value;
    }

    if (controlBar.checked) {
      settings.controls = ["play", "play-large"];
    } else {
      delete settings.controls;
    }

    const w = width.value ? width.value : "16";
    const h = height.value ? height.value : "9";

    settings.ratio = w + ":" + h;

    settings.storage = { enabled: false };
    const p = new Plyr("#player", settings);

    if (p.isVimeo && settings.autoplay && settings.muted) {
      settings.volume = 0;
    }

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
      settings.ctaEnabled = ctaCheckbox.checked;
      settings.ctaInputUrl = ctaInputUrl.value;
      settings.ctaInputTitle = ctaInputTitle.value;
      settings.ctaTimeTarget = parseInt(ctaTimeTarget.value);
      settings.ctaHeadline = ctaHeadline.value;
      settings.ctaHeadlineColor = ctaHeadlineColor.value;
      settings.ctaBtnBackgroundColor = ctaBtnBackgroundColor.value;
      settings.ctaBtnTextColor = ctaBtnTextColor.value;

      const dynamicScript = `<div data-plyr-provider="${
        link.includes("vimeo") ? "vimeo" : "youtube"
      }" class="plyr__video-embed" playsinline autoplay muted loop video-details="s=${window.btoa(
        JSON.stringify(settings)
      )}"></div>
        \n<!-- ADD THE CODE BELOW ONLY ONCE IN YOUR WEBSITE. (IF YOU HAVE IT ALREADY, THEN DON'T INCLUDE IT!) !-->
        <script id="player-script" src="https://app.vidflows.com/player/main.min.js"></script>\n
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

        const videoSoundOverlay = player.querySelector(".video-sound-overlay");
        videoSoundOverlay.addEventListener("click", () => {
          document.querySelector("#play-icon-default").style.display = "none";
          if (p.autoplay && p.muted) {
            p.volume = 1;
          }
        });

        if (!settings.play) {
          const playBlock = `<button style="
          opacity: 1;
          visibility: visible;
          z-index:0;" 
          type="button" id="play-icon-default" class="plyr__control plyr__control--overlaid"><svg focusable="false"><use xlink:href="#plyr-play"></use></svg></button>`;
          videoSoundOverlay.insertAdjacentHTML("beforeend", playBlock);
        }
      }

      Player.hideLoader();
    });

    p.on("timeupdate", (e) => {
      if (
        p.playing &&
        ctaCheckbox.checked &&
        ctaTimeTarget.value &&
        p.currentTime >= parseInt(ctaTimeTarget.value).toFixed(2) &&
        p.currentTime < parseFloat(ctaTimeTarget.value + ".1").toFixed(2)
      ) {
        renderCtaModal(
          frame,
          ctaHeadline.value,
          ctaHeadlineColor.value,
          ctaInputTitle.value,
          ctaInputUrl.value,
          ctaBtnBackgroundColor.value,
          ctaBtnTextColor.value,
          p
        );
        p.pause();
      }
    });

    if (ctaCheckbox.checked) {
      renderCtaModal(
        frame,
        ctaHeadline.value,
        ctaHeadlineColor.value,
        ctaInputTitle.value,
        ctaInputUrl.value,
        ctaBtnBackgroundColor.value,
        ctaBtnTextColor.value,
        p
      );
    }
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

function renderCtaModal(
  frame,
  ctaHeadline,
  headlineColor,
  ctaInputTitle,
  ctaInputUrl,
  btnBackgroundColor,
  btnTextColor,
  player
) {
  const ctaModal = `<div class="cta-modal" style="background-color: rgba(0, 0, 0, 6);height: 100%;width: 100%;z-index: 10;position: absolute;top: 0;left: 0;display: flex;flex-direction: column;">

  <div style="
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
">

<div style="
display: flex;
flex-direction: column;
align-items: center;
">

<div style="position: relative;text-align: center;">
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${ctaHeadline}</span></p>
</div></div>

<div style="position: relative;cursor: pointer;width: 20rem;text-align: center;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="cta-resume" href="${ctaInputUrl}" target="_blank"><span style="font-size: 2rem;text-align: center;display: block;">${ctaInputTitle}</span></a>
</div>

</div>
</div>
  
 </div>

 <div style="
 width: 100%;
 position: relative;
 bottom: 2rem;
"><p style="color: #fff;margin-right: 3rem;text-align: right;font-size: 1.4rem; margin-bottom: 0;"><span class="cta-resume" style="padding:0.3rem;cursor:pointer;">Skip</span></p></div>
 
 </div>`;

  frame.querySelector(".plyr").insertAdjacentHTML("beforeend", ctaModal);

  frame.querySelectorAll(".cta-resume").forEach((action) => {
    action.addEventListener("click", (e) => {
      resumeVideo(e, player);
    });
  });
}

function resumeVideo(event, player) {
  event.target.closest(".cta-modal").style.display = "none";
  player.play();
}

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
