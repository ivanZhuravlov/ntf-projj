import anime from 'animejs'

export function upCount({element, initialValue, finalValue}) {
  anime({
    targets: element,
    innerHTML: [initialValue, finalValue],
    easing: "linear",
    round: 1,
  });
}
