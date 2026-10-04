import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function horizontalLoop(items: gsap.DOMTarget[], config: any = {}) {
  items = gsap.utils.toArray(items);
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  const length = items.length;
  const startX = (items[0] as HTMLElement).offsetLeft;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const times: number[] = [];

  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  let totalWidth = 0;

  gsap.set(items, {
    xPercent: (i, el) => {
      const element = el as HTMLElement;

      const w = (widths[i] = parseFloat(
        gsap.getProperty(element, "width", "px").toString()
      ));

      const x = parseFloat(gsap.getProperty(element, "x", "px").toString());
      const xPercentRaw = parseFloat(
        gsap.getProperty(element, "xPercent").toString()
      );

      xPercents[i] = snap((x / w) * 100 + xPercentRaw);

      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const lastItem = items[length - 1] as HTMLElement;

  const scaleX = parseFloat(gsap.getProperty(lastItem, "scaleX").toString());

  totalWidth =
    lastItem.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    lastItem.offsetWidth * scaleX +
    parseFloat(config.paddingRight?.toString() || "0");

  items.forEach((item, i) => {
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = (item as HTMLElement).offsetLeft + curX - startX;
    const scaleX = parseFloat(gsap.getProperty(item, "scaleX").toString());
    const distanceToLoop = distanceToStart + widths[i] * scaleX;

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    );

    tl.fromTo(
      item,
      {
        xPercent: snap(
          ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
        ),
      },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );

    tl.add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  });

  function toIndex(index: number, vars?: gsap.TweenVars) {
    vars = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }

    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: gsap.TweenVars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}
