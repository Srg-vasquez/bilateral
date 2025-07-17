import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import PropTypes from 'prop-types';

function Stimulus({ color, direction, speed, isRunning, onSeriesIncrement, horizontalPosition }) {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dxRef = useRef(0);
  const dyRef = useRef(0);
  const tRef = useRef(0);
  const infinitoHalfRef = useRef(false);
  const lastDirectionRef = useRef(null);

  const ballSize = 50;
  const globalSpeed = speed * 1.5;

  // 🟡 Medir contenedor y centrar
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setBounds({ width, height });

      const centerX = (width - ballSize) / 2;
      const centerY = (height - ballSize) / 2;

      x.set(centerX);
      y.set(centerY);
    }
  }, []);

  // 🟡 Inicializar dirección
  useEffect(() => {
    if (!bounds.width || !bounds.height) return;

    const centerX = (bounds.width - ballSize) / 2;
    const centerY = (bounds.height - ballSize) / 2;

    switch (direction) {
      case 'horizontal':
        dxRef.current = -1;
        dyRef.current = 0;

        let targetY = centerY;
        if (horizontalPosition === 'top') {
          targetY = 0;
        } else if (horizontalPosition === 'bottom') {
          targetY = bounds.height - ballSize;
        }

        animate(y, targetY, { duration: 0.3 });
        break;

      case 'vertical':
        dxRef.current = 0;
        dyRef.current = -1;
        animate(x, centerX, { duration: 0.3 });
        break;

      case 'diagonal-down':
        dxRef.current = -1;
        dyRef.current = -1;
        animate(x, centerX, { duration: 0.3 });
        animate(y, centerY, { duration: 0.3 });
        break;

      case 'diagonal-up':
        dxRef.current = 1;
        dyRef.current = -1;
        animate(x, centerX, { duration: 0.3 });
        animate(y, centerY, { duration: 0.3 });
        break;

      case 'infinito':
        dxRef.current = 0;
        dyRef.current = 0;
        break;

      default:
        dxRef.current = -1;
        dyRef.current = 0;
        animate(y, centerY, { duration: 0.3 });
    }
  }, [direction, bounds, horizontalPosition]);

  // ✅ Nuevo efecto: actualizar Y si cambia la posición horizontal mientras corre
  useEffect(() => {
    if (!isRunning || direction !== 'horizontal' || !bounds.height) return;

    let targetY = (bounds.height - ballSize) / 2;
    if (horizontalPosition === 'top') {
      targetY = 0;
    } else if (horizontalPosition === 'bottom') {
      targetY = bounds.height - ballSize;
    }

    animate(y, targetY, { duration: 0.3 });
  }, [horizontalPosition, isRunning, direction, bounds]);

  // 🔄 Movimiento continuo
  useEffect(() => {
    if (!isRunning || !bounds.width || !bounds.height) return;

    let animationId;

    const loop = () => {
      let newX, newY;
      const maxX = bounds.width - ballSize;
      const maxY = bounds.height - ballSize;
      const centerX = (bounds.width - ballSize) / 2;
      const centerY = (bounds.height - ballSize) / 2;

      if (direction === 'infinito') {
        tRef.current += 0.015 * speed;
        const t = tRef.current;

        newX = centerX + (bounds.width / 4) * Math.sin(t);
        newY = centerY + (bounds.height / 4) * Math.sin(t) * Math.cos(t);

        const cyclePosition = t % (2 * Math.PI);
        if (cyclePosition < 0.1 && !infinitoHalfRef.current) {
          onSeriesIncrement?.();
          infinitoHalfRef.current = true;
        } else if (cyclePosition > Math.PI && infinitoHalfRef.current) {
          infinitoHalfRef.current = false;
        }
      } else {
        newX = x.get() + dxRef.current * globalSpeed;

        if (direction === 'horizontal') {
          if (horizontalPosition === 'top') {
            newY = 0;
          } else if (horizontalPosition === 'bottom') {
            newY = bounds.height - ballSize;
          } else {
            newY = centerY;
          }
        } else {
          newY = y.get() + dyRef.current * globalSpeed;
        }

        if (direction === 'horizontal') {
          if (newX >= maxX && lastDirectionRef.current !== 'right') {
            onSeriesIncrement?.();
            lastDirectionRef.current = 'right';
          } else if (newX <= 0) {
            lastDirectionRef.current = 'left';
          }
        }

        if (direction === 'vertical') {
          if (newY >= maxY && lastDirectionRef.current !== 'down') {
            onSeriesIncrement?.();
            lastDirectionRef.current = 'down';
          } else if (newY <= 0) {
            lastDirectionRef.current = 'up';
          }
        }

        if (direction === 'diagonal-down' || direction === 'diagonal-up') {
          if (newY >= maxY && lastDirectionRef.current !== 'bottom') {
            onSeriesIncrement?.();
            lastDirectionRef.current = 'bottom';
          } else if (newY <= 0) {
            lastDirectionRef.current = 'top';
          }
        }

        if (direction === 'diagonal-down' || direction === 'diagonal-up') {
          if (newX <= 0 || newX >= maxX || newY <= 0 || newY >= maxY) {
            dxRef.current *= -1;
            dyRef.current *= -1;
          }
        } else {
          if (newX <= 0 || newX >= maxX) {
            dxRef.current *= -1;
            newX = Math.max(0, Math.min(newX, maxX));
          }
          if (newY <= 0 || newY >= maxY) {
            dyRef.current *= -1;
            newY = Math.max(0, Math.min(newY, maxY));
          }
        }
      }

      x.set(newX);
      y.set(newY);
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [bounds, speed, direction, isRunning, onSeriesIncrement, horizontalPosition]);

  // ⏹️ Reposicionar cuando se detiene
  useEffect(() => {
    if (!isRunning && bounds.width && bounds.height) {
      const centerX = (bounds.width - ballSize) / 2;
      const centerY = (bounds.height - ballSize) / 2;

      if (direction === 'horizontal') {
        let targetY = centerY;
        if (horizontalPosition === 'top') {
          targetY = 0;
        } else if (horizontalPosition === 'bottom') {
          targetY = bounds.height - ballSize;
        }
        animate(x, centerX, { duration: 0.4 });
        animate(y, targetY, { duration: 0.4 });
      } else {
        animate(x, centerX, { duration: 0.4 });
        animate(y, centerY, { duration: 0.4 });
      }
    }
  }, [isRunning, bounds, direction, horizontalPosition]);

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
  isRunning: PropTypes.bool.isRequired,
  onSeriesIncrement: PropTypes.func,
  horizontalPosition: PropTypes.string,
};

export default Stimulus;
