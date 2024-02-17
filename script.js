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
  const passwordProtectCheckbox = document.querySelector(
    "#checkbox-password-protect"
  );
  const inputPassword = document.querySelector("#input-password");
  const passwordHeadline = document.querySelector("#password-headline");
  const passwordHeadlineColor = document.querySelector(
    "#password-headline-color"
  );
  const passwordInputTitle = document.querySelector("#password-input-title");
  const passwordBtnBackgroundColor = document.querySelector(
    "#password-btn-background-color"
  );
  const passwordBtnTextColor = document.querySelector(
    "#password-btn-text-color"
  );
  const passwordTimeTarget = document.querySelector("#password-time-target");

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

    .plyr__control--overlaid, .plyr--video div.plyr__controls{
      padding-top: 0.8rem;
    }
    `;

  const style = document.createElement("style");
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

  passwordProtectCheckbox.addEventListener("change", (e) => {
    if (passwordProtectCheckbox.checked) {
      passwordInputTitle.closest("li").style.display = "block";
      passwordTimeTarget.closest("li").style.display = "block";
      passwordHeadline.closest("li").style.display = "block";
      passwordHeadlineColor.closest("li").style.display = "block";
      passwordBtnBackgroundColor.closest("li").style.display = "block";
      passwordBtnTextColor.closest("li").style.display = "block";
      inputPassword.closest("li").style.display = "block";
    } else {
      passwordInputTitle.value = "";
      passwordTimeTarget.value = "";
      passwordHeadline.value = "";
      inputPassword.value = "";

      passwordInputTitle.closest("li").style.display = "none";
      passwordTimeTarget.closest("li").style.display = "none";
      passwordHeadline.closest("li").style.display = "none";
      passwordHeadlineColor.closest("li").style.display = "none";
      passwordBtnBackgroundColor.closest("li").style.display = "none";
      passwordBtnTextColor.closest("li").style.display = "none";
      inputPassword.closest("li").style.display = "none";
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
    let modal = document.querySelector(".cta-modal");
    modal?.remove();
  });

  passwordInputTitle.addEventListener("input", (e) => {
    createNewIframe();
  });

  passwordHeadlineColor.addEventListener("change", (e) => {
    createNewIframe();
  });
  passwordBtnBackgroundColor.addEventListener("change", (e) => {
    createNewIframe();
  });
  passwordBtnTextColor.addEventListener("change", (e) => {
    createNewIframe();
  });

  passwordHeadline.addEventListener("input", (e) => {
    createNewIframe();
  });

  passwordTimeTarget.addEventListener("input", (e) => {
    modal = document.querySelector(".password-protect-modal");
    modal?.remove();
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
    const controlElementsColor = document.getElementById("control-elements-color");
    const controlBackgroundColor = document.getElementById("control-background-color");
    const height = document.getElementById("height");
    const width = document.getElementById("width");
    const ctaModal = document.querySelector(".cta-modal");
    if (ctaModal) {
      ctaModal.remove();
    }

    settings.link = link;

    controlElementsColor.addEventListener("input", (event) => {
      settings.controlElementsColor = controlElementsColor.value;
      updateControlElementsColor(controlElementsColor);
    });

    controlBackgroundColor.addEventListener("input", () => {
      settings.controlBackgroundColor = controlBackgroundColor.value;
      const plyrControl = document
        .querySelector(".plyr__control--overlaid,.plyr--video .plyr__controls");
      plyrControl.style.setProperty("--plyr-color-main", controlBackgroundColor.value);

      const inputRange = document.querySelectorAll(
        ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
      );
      for (let i = 0; i < inputRange.length; i++) {
        inputRange[i].style.setProperty(
          "--plyr-range-thumb-background",
          controlBackgroundColor.value
        );
      }

      updateControlBackgroundColor(controlBackgroundColor);
    });

    const playerName = getOnlinePlayer(link);

    let html = !playerName
      ? `<video class="plyr__video-embed" id="player" playsinline controls>
     <source src="${link}" type="video/mp4" />
      </video>`
      : `<div data-plyr-provider="${playerName}" class="plyr__video-embed" id="player" playsinline autoplay muted loop>
     <iframe src="${link}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&background=1&mute=1&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>
     </div>\n`;

    frame.innerHTML = html;
    settings.autoplay = autoplay.checked;

    settings.muted = muted.checked;
    settings.isControlBarHidden = controlBar.checked;

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

    const plyr = new Plyr("#player", settings);

    if (plyr.isVimeo && settings.autoplay && settings.muted) {
      settings.volume = 0;
    }

    if (thumbnail.value) {
      plyr.poster = thumbnail.value;
    }

    plyr.on("ready", (event) => {
      updateControlElementsColor(controlElementsColor);
      updateControlBackgroundColor(controlBackgroundColor);

      const controls = document.querySelectorAll(
        ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
      );

      for (let i = 0; i < controls.length; i++) {
        controls[i].style.setProperty(
          "--plyr-range-thumb-background",
          controlBackgroundColor.value
        );
      }
      settings.mutedImageUrl = mutedImageUrl;
      settings.controlElementsColor = controlElementsColor.value;
      settings.controlBackgroundColor = controlBackgroundColor.value;
      settings.ctaEnabled = ctaCheckbox.checked;
      if (settings.ctaEnabled) {
        settings.ctaInputUrl = ctaInputUrl.value;
        settings.ctaInputTitle = encodeURIComponent(ctaInputTitle.value);
        settings.ctaTimeTarget = parseInt(ctaTimeTarget.value);
        settings.ctaHeadline = encodeURIComponent(ctaHeadline.value);
        settings.ctaHeadlineColor = ctaHeadlineColor.value;
        settings.ctaBtnBackgroundColor = ctaBtnBackgroundColor.value;
        settings.ctaBtnTextColor = ctaBtnTextColor.value;
      }

      settings.passwordEnabled = passwordProtectCheckbox.checked;
      if (settings.passwordEnabled) {
        settings.passwordTimeTarget = parseInt(passwordTimeTarget.value);
        settings.passwordHeadline = encodeURIComponent(passwordHeadline.value);
        settings.passwordInputTitle = encodeURIComponent(
          passwordInputTitle.value
        );
        settings.passwordHeadlineColor = passwordHeadlineColor.value;
        settings.passwordBtnBackgroundColor = passwordBtnBackgroundColor.value;
        settings.passwordBtnTextColor = passwordBtnTextColor.value;
        settings.password = encodeURIComponent(inputPassword.value);
      }

      const dynamicScript = `<div ${playerName ? "data-plyr-provider=\"" + playerName + "\"" : ""} class="plyr__video-embed" playsinline autoplay muted loop video-details="s=${window.btoa(
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
        if (playerName) {
          frame.firstChild.insertAdjacentHTML("beforeend", overlay);
        } else {
          frame
            .querySelector(".plyr__video-wrapper")
            .insertAdjacentHTML("beforeend", overlay);
        }

        const style = `<style>.video-sound-overlay {
            width: 100%;
            height: 100%;
            background-image: url('${settings.playIcon}');
            background-repeat: no-repeat;
            position: absolute;
            left: 0%;
            z-index:4;
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

        const videoSoundOverlay = frame.querySelector(".video-sound-overlay");
        if (!settings.play && !settings.playIcon) {
          const playBlock = `<button style="
          opacity: 1;
          visibility: visible;
          z-index: 0;
          color: ${settings.controlElementsColor};"
          type="button" id="play-icon-default" class="plyr__control plyr__control--overlaid"><svg focusable="false"><use xlink:href="#plyr-play"></use></svg></button>`;
          videoSoundOverlay.insertAdjacentHTML("beforeend", playBlock);
        }

        videoSoundOverlay.addEventListener("click", () => {
          videoSoundOverlay.remove();
          if (plyr.autoplay && plyr.muted) {
            plyr.volume = 1;
            plyr.autoplay = false;
            plyr.play();
            plyr.restart();
          }
        });
      }

      Player.hideLoader();
    });

    plyr.once("pause", (event) => {
      if (playerName) {
        const videoSoundOverlay = player.querySelector(".video-sound-overlay");
        if (document.visibilityState === 'visible' && typeof settings.muted !== undefined) {
          if (settings.muted) {
            settings.muted = false;
            document.querySelectorAll("[data-plyr]").forEach((ele) => {
              if (ele.getAttribute("data-plyr") === "mute" && ele.getAttribute("aria-pressed") === false) {
                settings.volume = 1;
                ele.click();
              }
            });

            videoSoundOverlay ? videoSoundOverlay.remove() : "";
            setTimeout(() => {
              settings.volume = 1;
              if (plyr.autoplay) {
                plyr.play();
                plyr.restart();
              }
            }, 100);
          }
        }
      }
    });

    plyr.on("timeupdate", (e) => {
      if (plyr.playing) {
        if (
          ctaCheckbox.checked &&
          ctaTimeTarget.value &&
          parseInt(plyr.currentTime) === parseInt(ctaTimeTarget.value)
        ) {
          renderCtaModal(
            frame,
            ctaHeadline.value,
            ctaHeadlineColor.value,
            ctaInputTitle.value,
            ctaInputUrl.value,
            ctaBtnBackgroundColor.value,
            ctaBtnTextColor.value,
            plyr
          );
          plyr.pause();
          ctaTimeTarget.value = null;
        } else if (
          passwordProtectCheckbox.checked &&
          passwordTimeTarget.value &&
          parseInt(plyr.currentTime) === parseInt(passwordTimeTarget.value)
        ) {
          renderPasswordModal(
            frame,
            passwordHeadline.value,
            passwordHeadlineColor.value,
            passwordInputTitle.value,
            passwordBtnBackgroundColor.value,
            passwordBtnTextColor.value,
            plyr
          );
          plyr.pause();
          passwordTimeTarget.value = null;
        }
      }
    });

    if (ctaCheckbox.checked && !ctaTimeTarget.value) {
      renderCtaModal(
        frame,
        ctaHeadline.value,
        ctaHeadlineColor.value,
        ctaInputTitle.value,
        ctaInputUrl.value,
        ctaBtnBackgroundColor.value,
        ctaBtnTextColor.value,
        plyr
      );
    } else if (passwordProtectCheckbox.checked && !passwordTimeTarget.value) {
      renderPasswordModal(
        frame,
        passwordHeadline.value,
        passwordHeadlineColor.value,
        passwordInputTitle.value,
        passwordBtnBackgroundColor.value,
        passwordBtnTextColor.value,
        plyr
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
        "https://cdn.plyr.io/3.7.8/plyr.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js",
      ]);

      const style = ["https://cdn.plyr.io/3.7.8/plyr.css"];
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
<div style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;    margin-bottom: 1rem;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${ctaHeadline}</span></p>
</div></div>

<div style="position: relative;cursor: pointer;width: 20rem;text-align: center;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="cta-resume" href="${ctaInputUrl}" target="_blank"><span style="font-size: 1.7rem;text-align: center;display: block;">${ctaInputTitle}</span></a>
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
      resumeVideo(e, player, ".cta-modal");
    });
  });
}

function getOnlinePlayer(link) {
  if (link.includes("vimeo")) {
    return "vimeo";
  } else if (link.includes("youtube")) {
    return "youtube";
  }
  return null;
}

function renderPasswordModal(
  frame,
  headline,
  headlineColor,
  inputTitle,
  btnBackgroundColor,
  btnTextColor,
  player
) {
  const modal = `<div class="password-protect-modal" style="background-color: rgba(0, 0, 0, 6);height: 100%;width: 100%;z-index: 10;position: absolute;top: 0;left: 0;display: flex;flex-direction: column;">

  <div style="
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
">

<div>

<div style="position: relative;text-align: center;">
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;margin-bottom:1rem;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${headline}</span></p>
</div>

<input type="password" placeholder="Enter Password" class="video-input-password" style="background: white;width: 17rem;text-align: center;color: black;border-radius: 0;height: 2.5rem;border-color: rgb(204, 204, 204);border-width: 1px;margin-bottom: 2rem;">
</div>

<div style="position: relative;cursor: pointer;width: 16rem;text-align: center;margin: auto;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="password-protect-submit"><span style="font-size: 1.2rem;text-align: center;display: block;">${inputTitle}</span></a>
</div>

</div>
</div>
  
 </div>
 
 </div>`;

  frame.querySelector(".plyr").insertAdjacentHTML("beforeend", modal);

  const videoPasswordInput = frame.querySelector(".video-input-password");

  frame.querySelectorAll(".password-protect-submit").forEach((action) => {
    action.addEventListener("click", (e) => {
      if (videoPasswordInput.value === decodeURIComponent(settings.password)) {
        resumeVideo(e, player, ".password-protect-modal");
      }
    });
  });
}

function resumeVideo(event, player, targetClass) {
  event.target.closest(targetClass).style.display = "none";
  player.play();
}


function updateControlElementsColor(controlElementsColor) {
  const plyrControls = document.querySelectorAll(
    ".plyr--full-ui input[type=range], .plyr__control--overlaid,.plyr--video .plyr__controls"
  );
  for (let i = 0; i < plyrControls.length; i++) {
    plyrControls[i].style.color = controlElementsColor.value;

    plyrControls[i].querySelectorAll("button").forEach(element => {
      element.style.color = controlElementsColor.value;
    });
  }
}


function updateControlBackgroundColor(controlBackgroundColor) {
  var css = `.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]:before {background: var(--plyr-control-toggle-checked-background,var(--plyr-color-main,var(--plyr-color-main,${controlBackgroundColor.value})))} .plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${controlBackgroundColor.value}))) !important} 

  button.plyr__control--overlaid {
    background-color:  ${controlBackgroundColor.value}; 
  }
    .plyr--video .plyr__controls {
    background: ${controlBackgroundColor.value}; 
  }
           `;

  document.getElementById("hover_color")?.remove();
  let style = document.createElement("style");
  style.id = "hover_color";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.head.appendChild(style);
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
