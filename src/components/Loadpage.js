import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loadingAnimation from '../animations/loading.json';

export default function Loading() {
    const animation = useRef(null);

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: animation.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
        });
        return () => instance.destroy();
    }, []);

    return (
        <div className="absolute w-1440px h-1024px flex items-center justify-center">
            <img className="bkground-icon" alt="" src="/bk_homepage@2x.png" style={{opacity:0.5}} />
            <div className="" ref={animation}></div>
        </div>
    );
}