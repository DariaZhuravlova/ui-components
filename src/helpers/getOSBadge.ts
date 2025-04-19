export const getOSBadge = () => {
    const isMac = navigator.userAgent.toUpperCase().includes("MAC");
    const isWindows = navigator.userAgent.toUpperCase().includes("WIN");

    if (isMac) return "⌘K";
    if (isWindows) return "Ctrl+K";

    return null;
};
