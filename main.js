async function load_scripts(e) {
  function t(e) {
    return new Promise(function (t, o) {
      if (load_scripts.loaded.has(e)) t();
      else {
        var r = document.createElement("script");
        (r.onload = t), (r.src = e), document.head.appendChild(r);
      }
    });
  }

  var o = [];

  for (const r of e) o.push(t(r));

  await Promise.all(o);

  for (const t of e) load_scripts.loaded.add(t);
}

load_scripts.loaded = new Set();

const Player = {
  run: () => {
    (async () => {
      await load_scripts([
        "https://cdn.plyr.io/3.7.8/plyr.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js",
      ]);

      ["https://cdn.plyr.io/3.7.8/plyr.css"].forEach((e) => {
        const t = document.createElement("link");

        (t.href = e), (t.rel = "stylesheet"), document.head.appendChild(t);
      }),
        init();
    })();
  },
};

function init() {
  document.querySelectorAll(".plyr__video-embed").forEach(function (player) {
    var videoDetailsEncoded = player.getAttribute("video-details");
    if (videoDetailsEncoded && player) {
      const t = JSON.parse(window.atob(videoDetailsEncoded.split("=")[1]));
      const playerName = getOnlinePlayer(t.link);

      if (playerName) {
        player.style.display = "none";
      }

      var css = `.plyr__menu__container .plyr__control>span{color:#000000 !important}
       
        `;
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      const styles = `<style>.video-sound-overlay {\n            width: 100%; z-index:4; \n            height: 100%;\n            \n            background-repeat: no-repeat;\n            position: absolute;\n            left: 0%;\n            right: 0%;\n            top: 0%;\n            bottom: 0%;\n            margin: auto;\n            background-size: 20%;\n            background-position: center;\n        }\n\n        
      .video-sound-overlay .play-button {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin-left: -100px;\n            margin-top: -100px;\n        }\n        .plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n\n        iframe {\n            pointer-events: none;\n        }\n        </style>`;
      document.head.insertAdjacentHTML("beforeend", styles);

      let html = !playerName
        ? `<video playsinline controls>
     <source src="${t.link}" type="video/mp4" />
    </video>`
        : `<iframe loading="lazy" 
    src="${t.link
        }?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;title=false&amp;enablejsapi=1&mute=1&background=1&autoplay=${t.autoplay ? 1 : 0
        }" allowfullscreen allowtransparency allowautoplay allow="autoplay; fullscreen" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>`;

      player.insertAdjacentHTML("afterbegin", html);

      const plyr = new Plyr(
        playerName ? player : player.querySelector("video"),
        t
      );

      void 0 !== t.poster && (plyr.poster = t.poster),
        plyr.once("pause", (e) => {
          if (document.visibilityState === 'visible') {
            const videoSoundOverlay = player.querySelector(
              ".video-sound-overlay"
            );
            void 0 !== t.muted &&
              1 == t.muted &&
              ((t.muted = !1),
                player.querySelectorAll("[data-plyr]").forEach((e) => {
                  "mute" == e.getAttribute("data-plyr") && e.getAttribute("aria-pressed") === false && e.click();
                }),
                videoSoundOverlay ? videoSoundOverlay.remove() : "",
                setTimeout(() => {
                  plyr.volume = 1;

                  if (plyr.autoplay) {
                    plyr.play(), plyr.restart();
                  }
                }, 100));
          }
        }),
        plyr.on("timeupdate", (e) => {
          if (plyr.muted) {
            return;
          }
          if (plyr.playing) {
            if (
              t.ctaEnabled &&
              t.ctaTimeTarget &&
              parseInt(plyr.currentTime) === t.ctaTimeTarget
            ) {
              renderCtaModal(
                player,
                t.ctaHeadline,
                t.ctaHeadlineColor,
                t.ctaInputTitle,
                t.ctaInputUrl,
                t.ctaBtnBackgroundColor,
                t.ctaBtnTextColor,
                plyr
              );

              plyr.pause();
              t.ctaTimeTarget = null;
            } else if (
              t.passwordEnabled &&
              t.passwordTimeTarget &&
              parseInt(plyr.currentTime) === t.passwordTimeTarget
            ) {
              renderPasswordModal(
                player,
                t.passwordHeadline,
                t.passwordHeadlineColor,
                t.passwordInputTitle,
                t.passwordBtnBackgroundColor,
                t.passwordBtnTextColor,
                t.password,
                plyr
              );
              plyr.pause();
              t.passwordTimeTarget = null;
            }
          }
        }),
        plyr.on("ready", (event) => {
          if (!plyr.isVimeo && t.autoplay) {
            try {
              plyr.togglePlay();
            } catch (error) {
              console.error(error);
            }
          }

          for (
            let plyrControlsElements = player.querySelectorAll(
              ".plyr--full-ui input[type=range], .plyr__control--overlaid, .plyr__controls__item"
            ),
            i = 0;
            i < plyrControlsElements.length;
            i++
          ) {
            plyrControlsElements[i].style.color = t.controlElementsColor;
            plyrControlsElements[i].querySelectorAll("button").forEach(element => {
              element.style.color = t.controlElementsColor;
            });

            if (i === 0 || i === plyrControlsElements.length - 1) {
              plyrControlsElements[i].style.backgroundColor = t.controlBackgroundColor;
            }
          }


          // Display background color for the plyr.js control 
          let plyrControls = player.querySelectorAll(".plyr--video .plyr__controls");
          plyrControls.forEach(plyrControl => {
            plyrControl.style.background = t.controlBackgroundColor;
          });



          const r = player.querySelectorAll(
            ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
          );

          for (let e = 0; e < r.length; e++)
            r[e].style.setProperty(
              "--plyr-range-thumb-background",
              t.controlBackgroundColor
            );

          let divBlock = '<div class="video-sound-overlay">';
          (divBlock += '<div class="unmute-button">'),
            void 0 !== t.mutedImageUrl &&
            t.mutedImageUrl &&
            (divBlock += `<img src="${t.mutedImageUrl}" style="width:30%" alt="Click To Turn On Sound">`),
            (divBlock += "</div>"),
            (divBlock += !t.playIcon
              ? `<button style="
                  opacity: 1;
                  visibility: visible;
                  z-index:0;
                  background:${t.controlBackgroundColor};
                  color:${t.controlElementsColor};"
                  type="button" class="play-icon-default plyr__control plyr__control--overlaid"><svg focusable="false"><use xlink:href="#plyr-play"></use></svg></button>`
              : ""),
            (divBlock += "<div>");

          if (playerName) {
            player
              .querySelector(".plyr__video-embed")
              .insertAdjacentHTML("beforeend", divBlock);
          } else {
            player.querySelector(".plyr__video-wrapper").insertAdjacentHTML("beforeend", divBlock);
          }

          const videoSoundOverlay = player.querySelector(
            ".video-sound-overlay"
          );
          videoSoundOverlay.style.backgroundImage = `url(${t.playIcon})`;

          videoSoundOverlay.addEventListener("click", () => {
            videoSoundOverlay.remove();
            if (plyr.autoplay && plyr.muted) {
              plyr.volume = 1;
              plyr.autoplay = false;
              plyr.restart();
            } else if (!plyr.playing) {
              plyr.play();
            }
          });

          player.style.display = "block";
        });
    } else Plyr.setup(".plyr__video-embed");
  });
}

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
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${decodeURIComponent(
    ctaHeadline
  )}</span></p>
</div></div>

<div style="position: relative;cursor: pointer;width: 20rem;text-align: center;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="cta-resume" href="${ctaInputUrl}" target="_blank"><span style="font-size: 2rem;text-align: center;display: block;">${decodeURIComponent(
    ctaInputTitle
  )}</span></a>
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

  frame.insertAdjacentHTML("beforeend", ctaModal);

  frame.querySelectorAll(".cta-resume").forEach((action) => {
    action.addEventListener("click", (e) => {
      resumeVideo(e, player, ".cta-modal");
    });
  });
}

function renderPasswordModal(
  frame,
  headline,
  headlineColor,
  inputTitle,
  btnBackgroundColor,
  btnTextColor,
  password,
  player
) {
  const ctaModal = `<div class="password-protect-modal" style="background-color: rgba(0, 0, 0, 6);height: 100%;width: 100%;z-index: 10;position: absolute;top: 0;left: 0;display: flex;flex-direction: column;">

  <div style="
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
">

<div>

<div style="position: relative;text-align: center;">
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${decodeURIComponent(
    headline
  )}</span></p>
</div>

<input type="password" placeholder="Enter Password" class="video-input-password" style="background: white;width: 17rem;text-align: center;color: black;border-radius: 0;height: 2.5rem;border-color: rgb(204, 204, 204);border-width: 1px;margin-bottom: 2rem;">
</div>

<div style="position: relative;cursor: pointer;width: 16rem;text-align: center;margin: auto;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="password-protect-submit"><span style="font-size: 1.2rem;text-align: center;display: block;">${decodeURIComponent(
    inputTitle
  )}</span></a>
</div>

</div>
</div>
  
 </div>
 
 </div>`;

  frame.insertAdjacentHTML("beforeend", ctaModal);

  const videoPasswordInput = frame.querySelector(".video-input-password");

  frame.querySelectorAll(".password-protect-submit").forEach((action) => {
    action.addEventListener("click", (e) => {
      if (videoPasswordInput.value === decodeURIComponent(password)) {
        resumeVideo(e, player, ".password-protect-modal");
      }
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

function resumeVideo(event, player, targetClass) {
  event.target.closest(targetClass).style.display = "none";
  player.play();
}

var styles = `
.unmute-button {
    padding: 15px;
    margin-left: 15px;
    animation: pulse 2s infinite;
    animation-timing-function: ease-out;
    transition-timing-function: ease-in-out;
    animation-name: pulse;
    width: 50%;
    position: absolute;
    }
    
    
    
    @keyframes pulse {
    0% {
    transform: scale(1);
    }
    50% {
    transform: scale(1.05);
    }
    100% {
    transform: scale(1);
    }
    }
    
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

      button.plyr__control.plyr__control--overlaid.plyr__control--pressed{
        visibility: visible;
      }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
