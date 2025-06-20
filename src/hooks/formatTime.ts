export function formatTime(seconds: number, isLive = false): string {
    if (isLive) {
        return '--:--:--';
    }

    if (!Number.isFinite(seconds)) {
        return '00:00';
    }

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hDisplay = hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : '';
    const mDisplay = mins.toString().padStart(2, '0');
    const sDisplay = secs.toString().padStart(2, '0');

    return `${hDisplay}${mDisplay}:${sDisplay}`;
}
