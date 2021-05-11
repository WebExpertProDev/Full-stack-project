import Particles from "react-particles-js"

export const Particle = () => {
  return (
    <Particles
      params={{
        background: {
          color: {
            value: "white"
          }
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push"
            },
            onHover: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 10,
              duration: 2,
              opacity: 0.8,
              size: 400
            },
            push: {
              quantity: 6
            },
            repulse: {
              distance: 50,
              duration: 0.7
            }
          }
        },
        particles: {
          color: {
            value: "#ffffff"
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: "circle"
          },
          size: {
            random: true,
            value: 5
          }
        },
        detectRetina: true
      }}
      style={{
        position: "absolute",
        width: "100vw",
        heigth: "50vh",
        minHeigth: "900px"
      }}
    />
  )
}
