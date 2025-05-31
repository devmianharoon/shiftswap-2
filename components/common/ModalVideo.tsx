'use client';

import React from 'react';

interface ModalVideoProps {
    videoId?: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    src?: string;
}

const ModalVideo: React.FC<ModalVideoProps> = ({ videoId, isOpen, setIsOpen, src }) => {
    const closeModal = () => setIsOpen(false);

    return (
        <div
            style={{
                ...overlayStyle,
                visibility: isOpen ? 'visible' : 'hidden',
                opacity: isOpen ? 1 : 0,
            }}
            onClick={closeModal}
        >
            <div style={modalStyle} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <button onClick={closeModal} style={closeButtonStyle}>
                    ×
                </button>
                <div style={responsiveIframeContainerStyle}>
                    <iframe
                        src={src ? src : `https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={iframeStyle}
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

// Styles
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1008,
    transition: '0.4s',
};

const modalStyle: React.CSSProperties = {
    position: 'relative',
    width: '90%',
    maxWidth: '1100px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-5px',
    right: '10px',
    fontSize: '30px',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 1001,
};

const responsiveIframeContainerStyle: React.CSSProperties = {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
};

const iframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
};

export default ModalVideo;
