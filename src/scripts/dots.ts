/**
 * Noktalı zemindeki halenin imleci takip etmesi.
 *
 * Hale imlece anında yapışmıyor: her karede aradaki mesafenin bir
 * kısmı kapanıyor (lerp). Anında takip eden bir leke fareyle birlikte
 * zıplıyor ve dikkat çekiyor; geriden gelen bir hale sayfanın
 * kendisinin bir dokusu gibi duruyor.
 *
 * Kare döngüsü yalnızca hale hedefe yetişene kadar dönüyor — imleç
 * durduğunda iş de duruyor, boşta sayfa CPU harcamıyor.
 */
const field = document.querySelector<HTMLElement>("[data-dot-field]");

if (field) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(pointer: fine)");

  /** Hedefe kalan mesafenin her karede kapanan oranı. */
  const follow = 0.14;
  /** Bu mesafenin altında göz farkı görmüyor; döngü duruyor. */
  const settled = 0.4;

  let targetX = innerWidth / 2;
  let targetY = innerHeight * 0.22;
  let x = targetX;
  let y = targetY;
  let frame = 0;

  function write() {
    field!.style.setProperty("--dot-x", `${x.toFixed(1)}px`);
    field!.style.setProperty("--dot-y", `${y.toFixed(1)}px`);
  }

  function step() {
    x += (targetX - x) * follow;
    y += (targetY - y) * follow;
    write();

    if (Math.abs(targetX - x) < settled && Math.abs(targetY - y) < settled) {
      x = targetX;
      y = targetY;
      write();
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(step);
  }

  function onMove(event: PointerEvent) {
    targetX = event.clientX;
    targetY = event.clientY;
    field!.classList.add("is-live");

    // Hareketi azalt: hale yine imleci gösteriyor ama yumuşatma yok,
    // yani ekranda süzülen bir şey kalmıyor.
    if (reduceMotion.matches) {
      x = targetX;
      y = targetY;
      write();
      return;
    }
    if (!frame) frame = requestAnimationFrame(step);
  }

  function enable() {
    if (!finePointer.matches) return;
    addEventListener("pointermove", onMove, { passive: true });
    // İmleç pencereden çıkınca hale sönüyor; köşede unutulmuş bir leke
    // kalmıyor.
    addEventListener("pointerleave", () => field!.classList.remove("is-live"), { passive: true });
  }

  enable();
  // Fare sonradan takılabilir (tablet + fare), ya da kullanıcı hareket
  // tercihini işletim sisteminden değiştirebilir.
  finePointer.addEventListener("change", enable);
}
