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
        "https://cdn.plyr.io/3.7.3/plyr.js",
        "https://code.jquery.com/jquery-3.6.0.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js",
      ]);

      ["https://cdn.plyr.io/3.7.3/plyr.css"].forEach((e) => {
        const t = document.createElement("link");

        (t.href = e), (t.rel = "stylesheet"), document.head.appendChild(t);
      }),
        init();
    })();
  },
};

function init() {
  document.querySelectorAll(".plyr__video-embed").forEach(function (player) {
    player.style.display = "none";

    var e = player.getAttribute("video-details");
    if (e && player) {
      var css = `.plyr__menu__container .plyr__control>span{color:#000 !important}
       
        `;
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      const t = JSON.parse(window.atob(e.split("=")[1]));

      const styles = `<style>.video-sound-overlay {\n            width: 100%; z-index:4; \n            height: 100%;\n            \n            background-repeat: no-repeat;\n            position: absolute;\n            left: 0%;\n            right: 0%;\n            top: 0%;\n            bottom: 0%;\n            margin: auto;\n            background-size: 20%;\n            background-position: center;\n        }\n\n        
      .video-sound-overlay .play-button {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin-left: -100px;\n            margin-top: -100px;\n        }\n        .plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n\n        iframe {\n            pointer-events: none;\n        }\n        </style>`;
      document.head.insertAdjacentHTML("beforeend", styles);

      let html = `<iframe src="${
        t.link
      }?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;title=false&amp;enablejsapi=1&mute=1&background=1&autoplay=${
        t.autoplay ? 1 : 0
      }" allowfullscreen allowtransparency allowautoplay allow="autoplay; fullscreen" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>`;
      player.insertAdjacentHTML("afterbegin", html);

      const o = new Plyr(player, t);
      console.log(t);

      void 0 !== t.poster && (o.poster = t.poster),
        o.once("pause", (e) => {
          const videoSoundOverlay = player.querySelector(
            ".video-sound-overlay"
          );
          void 0 !== t.muted &&
            1 == t.muted &&
            ((t.muted = !1),
            player.querySelectorAll("[data-plyr]").forEach((e) => {
              "mute" == e.getAttribute("data-plyr") && e.click();
            }),
            videoSoundOverlay ? videoSoundOverlay.remove() : "",
            setTimeout(() => {
              t.volume = 1;

              if (o.autoplay) {
                o.play(), o.restart();
              }
            }, 100));
        }),
        o.on("timeupdate", (e) => {
          if (
            o.playing &&
            t.ctaTimeTarget &&
            parseInt(o.currentTime) === t.ctaTimeTarget
          ) {

            if (t.ctaEnabled) {
              renderCtaModal(
                player,
                t.ctaHeadline,
                t.ctaHeadlineColor,
                t.ctaInputTitle,
                t.ctaInputUrl,
                t.ctaBtnBackgroundColor,
                t.ctaBtnTextColor,
                o
              );
            } else {
              renderPasswordModal(
                player,
                t.ctaHeadline,
                t.ctaHeadlineColor,
                t.ctaInputTitle,
                t.ctaBtnBackgroundColor,
                t.ctaBtnTextColor,
                t.password,
                o
              );
            }

            o.pause();
            t.ctaTimeTarget = null;
          }
        }),
        o.on("ready", (e) => {
          if (!o.isVimeo && t.autoplay) {
            try {
              o.play();
            } catch (error) {
              console.error(error);
            }
          }

          for (
            var e = player.querySelectorAll(
                ".plyr__control, .plyr--full-ui input[type=range], .plyr__control--overlaid"
              ),
              i = 0;
            i < e.length;
            i++
          ) {
            e[i].style.color = t.progressBarColor;
            if (i === 0 || i === e.length - 1) {
              e[i].style.backgroundColor = t.controlBarColor;
            }
          }

          const r = player.querySelectorAll(
            ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
          );

          for (let e = 0; e < r.length; e++)
            r[e].style.setProperty(
              "--plyr-range-thumb-background",
              t.controlBarColor
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
                  background:${t.controlBarColor}" 
                  type="button" class="play-icon-default plyr__control plyr__control--overlaid"><svg focusable="false"><use xlink:href="#plyr-play"></use></svg></button>`
              : ""),
            (divBlock += "<div>");

          player
            .querySelector(".plyr__video-embed")
            .insertAdjacentHTML("beforeend", divBlock);

          const videoSoundOverlay = player.querySelector(
            ".video-sound-overlay"
          );
          videoSoundOverlay.style.backgroundImage = `url(${t.playIcon})`;

          videoSoundOverlay.addEventListener("click", () => {
            videoSoundOverlay.remove();
            if (o.autoplay && o.muted) {
              o.volume = 1;
              o.autoplay = false;
              o.restart();
            } else if (!o.playing) {
              o.play();
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
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${decodeURIComponent(headline)}</span></p>
</div>

<input type="password" placeholder="Enter Password" class="video-input-password" style="background: white;width: 17rem;text-align: center;color: black;border-radius: 0;height: 2.5rem;border-color: rgb(204, 204, 204);border-width: 1px;margin-bottom: 2rem;">
</div>

<div style="position: relative;cursor: pointer;width: 16rem;text-align: center;margin: auto;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="password-protect-submit"><span style="font-size: 1.2rem;text-align: center;display: block;">${decodeURIComponent(inputTitle)}</span></a>
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

      button.plyr__control.plyr__control--overlaid.plyr__control--pressed{
        visibility: visible;
      }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
