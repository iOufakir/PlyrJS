function init() {
  document.querySelectorAll(".plyr__video-embed").forEach(function (player) {
    player.style.display = "none";

    var e = player.getAttribute("video-details");
    if (e && player) {
      var css = `.plyr__menu__container .plyr__control>span{color:#000 !important}
        button.plyr__control.plyr__control--overlaid.plyr__control--pressed{
          visibility: hidden;
        }
        `;

      var style = document.createElement("style");

      style.appendChild(document.createTextNode(css));

      document.head.appendChild(style);

      const t = JSON.parse(window.atob(e.split("=")[1]));
      let html = `<iframe src="${
        t.link
      }?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;title=false&amp;enablejsapi=1&mute=1&autoplay=${
        t.autoplay ? 1 : 0
      }" allowfullscreen allowtransparency allowautoplay allow="autoplay; fullscreen" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>`;
      player.insertAdjacentHTML("afterbegin", html);

      const o = new Plyr(player, t);
      void 0 !== t.poster && (o.poster = t.poster),
        o.once("pause", (e) => {
          void 0 !== t.muted &&
            1 == t.muted &&
            ((t.muted = !1),
            document.querySelectorAll("[data-plyr]").forEach((e) => {
              "mute" == e.getAttribute("data-plyr") && e.click();
            }),
            document.querySelector(".video-sound-overlay").remove(),
            setTimeout(() => {
              t.volume = 1;

              o.play(), o.restart();
            }, 1e3));
        }),
        o.on("ready", (e) => {
          if (t.autoplay) {
            o.muted = true;
            o.play();
          }

          setTimeout(() => {
            for (
              var e = document.querySelectorAll(
                  ".plyr__control, .plyr--full-ui input[type=range], .plyr__control--overlaid"
                ),
                o = 0;
              o < e.length;
              o++
            )
              e[o].style.color = t.progressBarColor;

            const r = document.querySelectorAll(
              ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
            );

            for (let e = 0; e < r.length; e++)
              r[e].style.setProperty(
                "--plyr-range-thumb-background",
                t.controlBarColor
              );

            var n = `.plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${t.controlBarColor}))) !important}`,
              l = document.createElement("style");

            if (
              (l.styleSheet
                ? (l.styleSheet.cssText = n)
                : l.appendChild(document.createTextNode(n)),
              document.head.appendChild(l))
            ) {
              let e = '<div class="video-sound-overlay">';

              (e += '<div class="unmute-button">'),
                void 0 !== t.mutedImageUrl &&
                  t.mutedImageUrl &&
                  (e += `<img src="${t.mutedImageUrl}" style="width:30%" alt="Click To Turn On Sound">`),
                (e += "</div>"),
                (e += "</div>"),
                document
                  .querySelector(".plyr__video-embed")
                  .insertAdjacentHTML("beforeend", e);

              if (t.playIcon) {
                const styles = `<style>.video-sound-overlay {\n            width: 100%;\n            height: 100%;\n            background-image: url('${t.playIcon}');\n            background-repeat: no-repeat;\n            position: absolute;\n            left: 0%;\n            right: 0%;\n            top: 0%;\n            bottom: 0%;\n            margin: auto;\n            background-size: 20%;\n            background-position: center;\n        }\n\n        .video-sound-overlay .play-button {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin-left: -100px;\n            margin-top: -100px;\n        }\n        .plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n\n        iframe {\n            pointer-events: none;\n        }\n        </style>`;

                document.head.insertAdjacentHTML("beforeend", styles);
              }
            }

            player.style.display = "block";
          }, 1e3);
        });
    } else Plyr.setup(".plyr__video-embed");
  });
}

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
        setTimeout(() => {
          init();
        }, 1e3);
    })();
  },
};

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
    
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
