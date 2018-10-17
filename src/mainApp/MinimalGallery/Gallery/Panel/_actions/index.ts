export const SHOW_IN_VIEWER = "SHOW_IN_VIEWER";
export const SHOW_FULLSCREEN = "SHOW_FULLSCREEN";
export const MOUSE_OVER = "MOUSE_OVER";
export const MOUSE_OUT = "MOUSE_OUT";
export const VIEWER_CHANGE = "VIEWER_CHANGE";

export const showInViewer = () => ({
    type: SHOW_IN_VIEWER
});

export const showFullscreen = () => ({
    type: SHOW_FULLSCREEN
});

export const mouseOver = () => ({
    type: MOUSE_OVER
});

export const mouseOut = () => ({
    type: MOUSE_OUT
});
