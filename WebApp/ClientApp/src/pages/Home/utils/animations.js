import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animate(element) {
  function comingUp() {
    gsap.fromTo(
      element,
      { bottom: "-3.25rem" },
      { bottom: "1rem", duration: 0.3 }
    );
  }

  function fadingIn() {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1 });
  }

  function fadingOut() {
    gsap.fromTo(element, { opacity: 1 }, { opacity: 0 });
  }

  function scalingUp() {
    gsap.fromTo(
      element,
      {
        color: "#eee",
        scale: 1.1,
        duration: 0.2,
      },
      {
        duration: 0.2,
        color: "#222",
        scale: 1,
      }
    );
  }

  function errorShaking() {
    const tl = gsap.timeline({ repeat: 2 });
    tl.to(element, { x: -5, duration: 0.1 });
    tl.to(element, { x: 5, duration: 0.1 });
    gsap.to(element, { x: 0, duration: 0.1 });
  }

  function bringFixedBagToScreen() {
    gsap.fromTo(
      element,
      {
        position: "absolute",
        top: "2.75rem",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "400px center",
          end: "400px center",
          markers: false,
          toggleActions: "play none none reset",
        },
        position: "fixed",
        top: "calc(100% - 4.25rem)",
        opacity: 1,
      }
    );
  }

  return {
    comingUp,
    fadingIn,
    fadingOut,
    scalingUp,
    errorShaking,
    bringFixedBagToScreen,
  };
}
