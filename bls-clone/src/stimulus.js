import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import PropTypes from 'prop-types';

function Stimulus({ color, direction, speed }) {
  const containerRef = useRef(null);

  // Estado para guardar el tamaño del contenedor (ancho y alto)
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  // Motion values: x e y permiten animaciones fluidas
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ballSize = 50; // tamaño del círculo

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setBounds({ width, height });

      // Posición inicial en el centro del contenedor
      x.set((width - ballSize) / 2);
      y.set((height - ballSize) / 2);
    }
  }, []);

  useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) return;

    // Dirección inicial según la prop "direction"
    let dx = 0;
    let dy = 0;

    switch (direction) {
      case 'horizontal':
        dx = 1; dy = 0;
        break;
      case 'vertical':
        dx = 0; dy = 1;
        break;
      case 'diagonal':
        dx = 1; dy = 1;
        break;
      case 'infinito':
        dx = 1; dy = -1;
        break;
      default:
        dx = 1; dy = 0;
    }

    let animationId;

    const animate = () => {
      // Movimiento con velocidad multiplicada
      let newX = x.get() + dx * speed;
      let newY = y.get() + dy * speed;

      // Rebote horizontal
      if (newX <= 0 || newX >= bounds.width - ballSize) {
        dx *= -1;
        newX = Math.max(0, Math.min(newX, bounds.width - ballSize));
      }

      // Rebote vertical
      if (newY <= 0 || newY >= bounds.height - ballSize) {
        dy *= -1;
        newY = Math.max(0, Math.min(newY, bounds.height - ballSize));
      }

      x.set(newX);
      y.set(newY);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [direction, speed, bounds]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '200px',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          x,
          y,
          width: `${ballSize}px`,
          height: `${ballSize}px`,
          borderRadius: '50%',
          backgroundColor: color,
          position: 'absolute',
        }}
      />
    </div>
  );
}

Stimulus.propTypes = {
  color: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

export default Stimulus;
